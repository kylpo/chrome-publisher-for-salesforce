'use strict';

var ACTIONS_KEY = "actions";
var CONNECTION_KEY = "connection";

exports.getConnection = function getConnection(callback) {
    chrome.storage.sync.get("connection", function (items) {
        if (chrome.runtime.lastError) {
            callback(new Error(chrome.runtime.lastError));
        } else if (items && items[CONNECTION_KEY] !== null) {
            callback(null, items[CONNECTION_KEY]);
        } else {
            callback(new Error("Connection not found in chrome.storage.sync"));
        }
    });
};

exports.upsertConnection = function(newConnection, callback) {
    exports.getConnection(function(err, data) {
        if (err) {
            var connectionObj = {};
            connectionObj[CONNECTION_KEY] = newConnection;

            chrome.storage.sync.set(connectionObj, function() {
                return callback(null, newConnection);
            });
        } else if (data != null && data.hasOwnProperty("refresh_token")) {
            // Add refresh_token to new connection
            newConnection.refresh_token = data.refresh_token;

            var updatedConnectionObj = {};
            updatedConnectionObj[CONNECTION_KEY] = newConnection;

            chrome.storage.sync.set(updatedConnectionObj, function() {
                return callback(null, newConnection);
            });
        } else {
            return callback(new Error("Error upserting new connecton: " + newConnection));
        }
    })
};

exports.clearConnection = function(callback) {
    var connectionObj = {};
    connectionObj[CONNECTION_KEY] = null;

    chrome.storage.sync.set(connectionObj, function() {
        return callback();
    });
};

exports.getActions = function(callback) {
    chrome.storage.local.get(ACTIONS_KEY, function (items) {
        if (chrome.runtime.lastError) {
            return callback(new Error(chrome.runtime.lastError));
        } else if (items && items.hasOwnProperty(ACTIONS_KEY)) {
            return callback(null, items[ACTIONS_KEY]);
        }

        return callback(new Error("actions not found in chrome.storage.sync"));
    });
};

exports.setActions = function(actions) {
    var actionsObj = {};
    actionsObj[ACTIONS_KEY] = actions;

    chrome.storage.local.set(actionsObj);
};

exports.clearActions = function(callback) {
    var actionsObj = {};
    actionsObj[ACTIONS_KEY] = null;

    chrome.storage.local.set(actionsObj, function() {
        return callback();
    });
};

