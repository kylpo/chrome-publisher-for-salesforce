//module.exports = function storage() {
    'use strict';
    var ACTIONS_KEY = "actions";

//    return (
        exports.getActions = function(callback) {
            console.log("getActions");
            console.log(ACTIONS_KEY);

            chrome.storage.local.get(ACTIONS_KEY, function (items) {
//            if (chrome.runtime.lastError) {
//                callback(new Error(chrome.runtime.lastError));
//                return;
//            }

                if (items && items.hasOwnProperty("actions")) {
                    callback(null, items);
                } else {
                    callback("actions not found in chrome.storage.sync")
                }
            });
        };

        exports.setActions = function(actions, callback) {
            var actionsObj = {};
            actionsObj[ACTIONS_KEY] = actions;

            chrome.storage.local.set(actionsObj, function() {
                callback();
            });
        };
//};