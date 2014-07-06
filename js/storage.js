'use strict';

var ACTIONS_KEY = "actions";
var CONNECTION_KEY = "connection";


exports.getConnection = function getConnection(callback) {
    chrome.storage.sync.get("connection", function (items) {
        if (chrome.runtime.lastError) {
            callback(new Error(chrome.runtime.lastError));
        } else if (items && items.hasOwnProperty(CONNECTION_KEY)) {
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
        } else if (data && data.hasOwnProperty("refresh_token") && data.hasOwnProperty("host")) {

            // Update the access_token field only
            var updatedConnection = {
                "access_token": newConnection.access_token,
                "host": data.host,
                "refresh_token": data.refresh_token
            };

            var updatedConnectionObj = {};
            updatedConnectionObj[CONNECTION_KEY] = updatedConnection;

            chrome.storage.sync.set(updatedConnectionObj, function() {
                return callback(null, updatedConnection);
            });
        } else {
            return callback(new Error("Error upserting new connecton: " + newConnection));
        }
    })
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
