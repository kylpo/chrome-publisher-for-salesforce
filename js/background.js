//var DAO = require("./DAO.js");
var Storage = require("./storage.js");

'use strict';

//TODO: watch for storage changes, and store changes in app state
//chrome.storage.onChanged.addListener(function(object, areaName) {
//
//});


// This essentially acts as a router for what function to call
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.type) {
        case "getActions":
            getActions(sendResponse);
            break;
        default:
            break;
    }

});

function getActions(callback) {
    console.log("getActions");
    Storage.getActions(function(err, actions) {
        console.log(actions);
        if (err != null) {
            console.log("error" + err);
            callback(err);
        }

        callback(actions);
    });
//    sendResponse(DAO.getActions());
}

function storeActions(callback) {
    //TODO
}