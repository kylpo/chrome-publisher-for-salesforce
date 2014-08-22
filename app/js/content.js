/** @jsx React.DOM */

'use strict';

var React = require("react");
var SideBar = require("../components/side-bar.jsx");
var show = false;
var items = undefined;
var container = undefined;
var prefillData = undefined;

function render() {
	React.renderComponent(<SideBar open={show} items={items} />, container);
}

function refreshActions() {
	console.log("Refreshing actions");
	chrome.runtime.sendMessage({ type: "getActions" }, function( response ) {
		if ( response === null ) {
			console.error("Error getting actions to client");
		} else {
			items = response;
		}
		
		render();
	});
}

chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
	console.log('Message received on content js: ', request);
	if ( request.type === 'browserAction' ) {
		// Check if extra data is sent with this request
		if ( request.action ) {
			show = true;
			prefillData = {
				action: request.action,
				data: request.data
			};
		} else {
			show = !show;
			if ( items == undefined ) {
				refreshActions();
				return;
			}
		}
		
		render();
	} else if ( request.type === 'authorized' ) {
		refreshActions();
	} else if ( request.type === 'loggedout' ) {
		show = false;
		items = [];
		render();
		items = undefined;
	}
});

container = document.createElement("section");
container.id = "chrome-publisher";
container.className = "container";
document.body.appendChild(container);

React.renderComponent(<SideBar open={show} items={items} prefill={prefillData} />, container);
console.log("Content script loaded");