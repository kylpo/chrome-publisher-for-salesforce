'use strict';

var clientId = require("../config.js").clientId;
var clientSecret = require("../config.js").clientSecret;
var host = require("../config.js").host;
var Auth = require("salesforce-chrome-oauth")(clientId, clientSecret, host);

var Storage = require("./storage.js");
var Api = require("./api.js")(Auth.refreshToken, Storage.upsertConnection);
var localStateActions = null;
var localStateConnection = null;
var actionsWhitelist = ["FeedItem.LinkPost", "FeedItem.ContentPost", "FeedItem.TextPost", "FeedItem.PollPost"];
var actionsBlacklist = ["FeedItem.MobileSmartActions"];
var personalActions = [
        {
            "name" : "Personal.TIL",
            "label" : "#TIL"
        },
        {
            "name" : "Personal.MyDay",
            "label" : "#MyDay"
        }
    ];

//TODO: watch for storage changes, and store changes in app state
//chrome.storage.onChanged.addListener(function(object, areaName) {
//
//});

function init() {
    chrome.runtime.getPlatformInfo(function(info) {
        if (info.os === "mac") {
            // Feed item ContentPost is not available because of a bug in Chrome when launching file chooser
            // see https://code.google.com/p/chromium/issues/detail?id=61632
            actionsWhitelist = ["FeedItem.LinkPost", "FeedItem.TextPost", "FeedItem.PollPost"];
            actionsBlacklist.push("FeedItem.ContentPost");
        }
    });
}

init();

// This essentially acts as a router for what function to call
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.type) {

        case "getActions":
            getActions(function(err, actions) {
                if (err) {
                    console.error(err.description);
                    sendResponse(null);
                } else {
                    sendResponse(actions);
                }
            });
            return true; // necessary to use sendResponse asynchronously

        case "refreshActions":
            getAndStoreActionsFromServer(function(err, actions) {
                if (err) {
                    console.error(err.description);
                    sendResponse(null);
                } else {
                    sendResponse(actions);
                }
            });
            return true; // necessary to use sendResponse asynchronously

        case "authorize":
            getAndStoreConnection(function(err, connection) {
                if (err) {
                    console.error(err.description);
                }

                sendResponse();

                getAndStoreActionsFromServer(function(err, actions) {
                    if (err) {
                        console.error(err.description);
//                        sendResponse(null);
                    } else {
//                        sendResponse(actions);
                    }
                });
            });
            return true; // necessary to use sendResponse asynchronously

//        case "getMentions":
//            getMentions(null, function(err, data) {
//                sendResponse(data);
//            });
//
//            return true; // necessary to use sendResponse asynchronously
        case "logout":
            Storage.clearConnection(function() {
                localStateConnection = null;
                Storage.clearActions(function() {
                    localStateActions = null;
                    sendResponse();
                })
            });
            return true; // necessary to use sendResponse asynchronously

        case "submitPost":
            createMessageObject(request.message, function(err, data) {
                if (err) {
                    console.error(err.description);
                    return sendResponse(null);
                }

                submitPost(data, function (err, data) {
                    if (err) {
                        console.error(err.description);
                        return sendResponse(null);
                    }
                    return sendResponse(data);
                });
            });
            return true; // necessary to use sendResponse asynchronously

        case "submitLink":
            createMessageObject(request.message, function(err, data) {
                if (err) {
                    console.error(err.description);
                    return sendResponse(null);
                }

                data.attachment = request.attachment;
                submitPost(data, function (err, data) {
                    if (err) {
                        console.error(err.description);
                        return sendResponse(null);
                    }
                    return sendResponse(data);
                });
            });
            return true; // necessary to use sendResponse asynchronously

        case "launchNewTab":
            launchNewTab(localStateConnection.instance_url + "/" + request.id);
            return true; // necessary to use sendResponse asynchronously

        case "delete":
            deletePost(request.id, function(){});
            return true; // necessary to use sendResponse asynchronously

        default:
            break;
    }
});

function launchNewTab(url) {
    // would like to use chrome.tabs.getCurrent, but this doesn't work in the background script
    chrome.tabs.query({active: true}, function(tabs) {
        var currentTab = tabs[0];
        //TODO , '"index": currentTab.index + 1' isn't consistently working. Sometimes it opens in position 1
        chrome.tabs.create({"url": url, "openerTabId": currentTab.id});
    })
}

//function getMentions(startingString, callback) {
//    var placeholderMentions = [
//        {
//            additionalLabel: null,
//            description: null,
//            name: "luigi",
//            photoUrl: "https://c.na15.content.force.com/profilephoto/005/T",
//            recordId: "005i00000049lwbAAA"
//        },
//        {
//            additionalLabel: null,
//            description: null,
//            name: "mario",
//            photoUrl: "https://c.na15.content.force.com/profilephoto/005/T",
//            recordId: "005i00000049lwqAAA"
//        },
//        {
//            additionalLabel: null,
//            description: null,
//            name: "mmario",
//            photoUrl: "https://c.na15.content.force.com/profilephoto/005/T",
//            recordId: "005i00000049lwvAAA"
//        }
//        ];
//
//    callback(null, placeholderMentions);
//}

function createMessageObject(message, callback) {
    var mentionRegex = new RegExp(/(@\[(.+?)\])/); //@[mention] anywhere

    getConnection( function(err, connection) {
        if (err) {
            return callback(err);
        }

        var messageObject = {
            "body": {
                "messageSegments": []
            }
        };

        if (mentionRegex.test(message)) {
            var segments = message.split(mentionRegex);
            recursivelyBuildMessageWithMentions(segments, messageObject, connection, false, callback);
        } else {
            messageObject.body.messageSegments.push({
                "type": "text",
                "text": message
            });
            callback(null, messageObject);
        }
    });

    /**
     * @param {Array} segments looks like "@[mention], mention, ..."
     * @param messageObject
     * @param connection
     * @param {boolean} isMention
     * @param callback
     */
    function recursivelyBuildMessageWithMentions(segments, messageObject, connection, isMention, callback) {
        var mentionRegex = new RegExp(/(@\[(.+?)\])/); //@[mention] anywhere
        var segment = segments.shift();

        if (segment === undefined) {
            callback(null, messageObject);
        } else if (segment === "") {
            recursivelyBuildMessageWithMentions(segments, messageObject, connection, false, callback);
        } else if (isMention) {
            Api.getMentions(connection, segment, function (status, response) {
                if (status === null || status === undefined) {
                    console.log(response.mentionCompletions);
                    if (response.mentionCompletions.length > 0) {
                        var recordId = response.mentionCompletions[0].recordId;
                        // add mention messageSegment instead of text placeholder
                        messageObject.body.messageSegments.push({
                            "type": "mention",
                            "id": recordId
                        });
                    } else {
                        // lookup failed, so add @[mention] text instead of mention object
                        messageObject.body.messageSegments.push({
                            "type": "text",
                            "text": "@[" + segment + "]"
                        });
                    }
                }

                recursivelyBuildMessageWithMentions(segments, messageObject, connection, false, callback);
            }.bind(this));
        } else if (mentionRegex.test(segment)) {
            recursivelyBuildMessageWithMentions(segments, messageObject, connection, true, callback);
        } else if (segment === "") {
            recursivelyBuildMessageWithMentions(segments, messageObject, connection, false, callback);
        } else {
            messageObject.body.messageSegments.push({
                "type": "text",
                "text": segment
            });
            recursivelyBuildMessageWithMentions(segments, messageObject, connection, false, callback);
        }
    }
}

function submitPost(message, callback) {
    getConnection( function(err, connection) {
        if (err) {
            return callback(err);
        }

        Api.submitPost(connection, message, callback);
    });
}

function deletePost(id, callback) {
    getConnection( function(err, connection) {
        if (err) {
            return callback(err);
        }

        Api.deletePost(connection, id, callback);
    });
}

/**
 * First check if actions exist in state
 * Then check if actions exist in storage
 * - if taken from storage, filter actions
 * Then finally try to get (and store) actions from server
 *
 * @param {function(Object, Object=)} callback
 * @returns actions in callback or an error callback
 */
function getActions(callback) {
    if (localStateActions) {
        return callback(null, localStateActions);
    }

    Storage.getActions(function(err, actions) {
        if (err || actions === null) {
            getAndStoreActionsFromServer(function(err, actions) {
                if (err) {
//                    return callback(err);
                    return callback(null, null);
                } else {
                    return callback(null, actions);
                }
            });
        } else {
            filterInitialActions(actions, function(err, filteredActions) {
                if (err) {
                    return callback(err);
                }

                localStateActions = filteredActions;
                return callback(null, filteredActions);
            });
        }
    });
}

/**
 * First check if connection exist in state
 * Then check if connection exist in storage
 * Then finally authorize with server to establish connection
 *
 * @param {function(Object, Object=)} callback
 * @returns connection in callback or an error callback
 */
function getConnection(callback) {
    if (localStateConnection) {
        return callback(null, localStateConnection);
    }

    Storage.getConnection(function(err, connection) {
        if (err || connection === null) {
//            getAndStoreConnection(function(err, data) {
//                if (err) {
                    return callback(err);
//                } else {
//                    localStateConnection = data;
//                    return callback(null, data);
//                }
//            });
        } else {
            localStateConnection = connection;
            return callback(null, connection);
        }
    });
}

/**
 * This essentially acts as a white-list for what actions are supported
 *
 * @param {Object[]} actions
 * @param {function(Object, Object=)} callback
 */
function filterInitialActions(actions, callback) {
    var enabledActions = [];
    var disabledActions = [];

    actions.forEach(function(action) {
        if (actionsWhitelist.indexOf(action.name) >= 0) { // try action.name in actionsWhitelist
            enabledActions.push(action);
        } else if (actionsBlacklist.indexOf(action.name) >= 0) {
            // skip this action
        } else {
            action["isDisabled"] = true;
            disabledActions.push(action);
        }
    });

    var filteredActions = enabledActions.concat(personalActions).concat(disabledActions);
//    var filteredActions = enabledActions.concat(disabledActions);

    if (!filteredActions) {
        return callback(new Error("Filtering action list resulted in empty list"));
    }

    return callback(null, filteredActions);
}

/**
 * 1) get connection info
 *    if fail, re-auth
 * 2) use connection info to hit api for actions
 *    if fail, error
 * 3) store unfiltered actions in storage
 * 4) store filtered actions in local state
 * 5) callback with filtered actions or error
 *
 * @param {function(Object, Object=)} callback
  */
function getAndStoreActionsFromServer(callback) {
    getConnection( function(err, connection) {
        if (err) {
            return callback(err);
        }

        getDescribedActionsFromServer(connection, function(err, actions) {
            if (err) {
                return callback(err);
            }

            Storage.setActions(actions);

            filterInitialActions(actions, function(err, filteredActions) {
                if (err) {
                    return callback(err);
                }

                localStateActions = filteredActions;
                callback(null, filteredActions);
            });
        });
    });
}

/**
 * 1. launch auth flow
 * 2. store the connection
 * 3. callback with connection or error
 *
 * @param {function(Object, Object=)} callback
 */
function getAndStoreConnection(callback) {
    Auth.authenticate(function(err, connection) {
        if (err) {
            return callback(err);
        }

        Storage.upsertConnection(connection, function() {
            localStateConnection = connection;
            callback(null, connection);
        });
    });
}

/**
 * 1. use api to get actions
 * 2. populate actions with describe data
 * 3. callback with actions or error
 *
 * @param {Object} connection
 * @param {function(Object, Object=)} callback
 */
function getDescribedActionsFromServer(connection, callback) {
    Api.getActions(connection, function (err, data) {
        if (err) {
            return callback(err);
        }

        populateActionsWithDescribeData(data, 0, connection, callback);
    });
}

/**
 * This is a recursive function because it needs to loop callbacks.
 * 1. if it has a Describe url, use it to hit the API for more metadata
 * 2. Recurse until at end of actions array
 * 3. callback with fully described actions (unless they had no Describe) or error
 *
 * @param {Object[]} actions
 * @param {int} position
 * @param {Object} connection
 * @param {function(Object, Object=)} callback
 */
function populateActionsWithDescribeData(actions, position, connection, callback) {
    if (position === actions.length) {
        return callback(null, actions);
    }

    var action = actions[position];
    if (action && action.urls.hasOwnProperty("describe")) {
        Api.getDescribeAction(connection, action.urls.describe, function (err, data) {
            if (err) {
                return callback(err);
            }

            actions[position] = data;
            populateActionsWithDescribeData(actions, position + 1, connection, callback)
        });
    } else {
        populateActionsWithDescribeData(actions, position + 1, connection, callback)
    }
}