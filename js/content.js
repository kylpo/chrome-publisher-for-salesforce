/** @jsx React.DOM */

'use strict';

var React = require("react");
var SideBar = require("../components/side-bar.jsx");
var show = false;
var items = undefined;
var created = false;

function render() {
	React.renderComponent(<SideBar open={show} items={items} />, container);
}

chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
	console.log('Message received on content js');
	show = !show;
	
	if ( !created ) {
		var container = document.createElement("section");
		container.id = "sfqa-container";
		container.className = "sfqa-container";
		document.body.appendChild(container);
		
		created = true;
		React.renderComponent(<SideBar open=false items={items} />, container);
	}
	
	render();
	
	if ( items === undefined ) {
		chrome.runtime.sendMessage({ type: "getActions" }, function( response ) {
			if ( response === null ) {
				console.error("Error getting actions to client");
			} else {
				items = response;
				render();
			}
		});
	}
});

console.log("Content script loaded");