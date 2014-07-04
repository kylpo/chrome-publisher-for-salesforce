'use strict';

var Storage = require("./storage.js"),
    Api = require("./api.js"),
    clientId = require("../secret.js").clientId,
    clientSecret = require("../secret.js").clientSecret,
    Auth = require("./salesforceChromeOAuth.js")(clientId, clientSecret),
    localStateActions = null,
    localStateConnection = null,
    enabledActionsWhitelist = ["FeedItem.LinkPost", "FeedItem.ContentPost", "FeedItem.TextPost"];


//TODO: watch for storage changes, and store changes in app state
//chrome.storage.onChanged.addListener(function(object, areaName) {
//
//});

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

        case "reAuthorize":
            getAndStoreConnection(function(err, connection) {
                if (err) {
                    console.error(err.description);
                    sendResponse(null);
                } else {
                    sendResponse(connection);
                }
            });
            return true; // necessary to use sendResponse asynchronously


        case "submitPost":
            createMessageObject(request.message, function(err, data) {
                if (err) {
                    console.error(err.description);
                    return sendResponse(null);
                }

                submitPost(data, false, function (err, data) {
                    if (err) {
                        console.error(err.description);
                        return;
//                        return sendResponse(null);
                    }

                    launchNewTab(localStateConnection.host + "/" + data.id);
                });
            });
            return true; // necessary to use sendResponse asynchronously

        case "submitLink":
            createMessageObject(request.message, function(err, data) {
                if (err) {
                    console.error(err.description);
                    return sendResponse(null);
                }

                data.attachment = request.attachment
                submitPost(data, false, function (err, data) {
                    if (err) {
                        console.error(err.description);
                        return;
//                        return sendResponse(null);
                    }

                    launchNewTab(localStateConnection.host + "/" + data.id);
                });
            });
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
function createMessageObject(message, callback) {
    var messageObject = {
        "body": {
            "messageSegments": []
        }
    };

    messageObject.body.messageSegments.push({
            "type": "text",
            "text": message
    });
    callback(null, messageObject);
}


function submitPost(message, isRetry, callback) {
    getConnection( function(err, connection) {
        if (err) {
            return callback(err);
        }

        Api.submitPost(connection, message, function (status, data) {
            switch (status) {
                case null:
                case undefined:
                    // success
                    callback(null, data);
                    break;
                case 401:
                    if (isRetry) {
                        return callback(new Error("Invalid refresh token on retry"));
                    }

                    getAndStoreRefreshedConnection(connection, function (err, data) {
                        if (err) {
                            return callback(err);
                        }

                        return submitPost(message, true, callback);
                    });
                    break;
                default:
                    return callback(new Error("getActions errored with: " + status));
            }
        });
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
        if (err) {
            getAndStoreActionsFromServer(function(err, actions) {
                if (err) {
                    return callback(err);
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
        if (err) {
            getAndStoreConnection(function(err, data) {
                if (err) {
                    return callback(err);
                } else {
                    localStateConnection = data;
                    return callback(null, data);
                }
            });
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
        if (enabledActionsWhitelist.indexOf(action.name) >= 0) { // try action.name in enabledActionsWhitelist
            enabledActions.push(action);
        } else if (action.name === "FeedItem.MobileSmartActions") {
            // skip this action
        } else {
            action["isDisabled"] = true;
            disabledActions.push(action);
        }
    });

    console.log(enabledActions);

    console.log(disabledActions);

    var filteredActions = enabledActions.concat(disabledActions);


//    var filteredActions = actions.filter(function(action) {
////        return action.type === "Post" && action.name !== "FeedItem.MobileSmartActions";
//        return action.type === "Post" && action.name !== "FeedItem.MobileSmartActions";
//    });

    if (!filteredActions) {
        return callback(new Error("Filtering action list resulted in empty list"));
    }

    return callback(null, filteredActions);
//    return callback(null, enabledActions);
//    return callback(null, actions);
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

        getActionsFromServer(connection, false, function (err, actions) {
            if (err) {
                return callback(err);
            }

            Storage.setActions(actions);

            filterInitialActions(actions, function (err, filteredActions) {
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
 * Needed when the oauth token expires. This will ask for another.
 * 1. request new token
 * 2. store it in local storage
 * 3. callback with updated connection or error
 *
 * @param connection
 * @param {function(Object, Object=)} callback
 */
function getAndStoreRefreshedConnection(connection, callback) {
    Auth.refreshToken(connection, function(err, data) {
        if (err) {
            return callback(err);
        }

        Storage.upsertConnection(data, function(err, data) {
            if (err) {
                return callback(err);
            }

            localStateConnection = data;
            return callback(null, data);
        });
    });
}

/**
 * 1. use api to get actions
 *   if token has exired, refresh it and run method again with isRetry set to true
 * 2. callback with actions or error
 *
 * @param {Object} connection
 * @param {boolean} isRetry - used to make sure this is only called a maximum of 2 times
 * @param {function(Object, Object=)} callback
 */
function getActionsFromServer(connection, isRetry, callback) {
    Api.getActions(connection, function (status, data) {
        switch (status) {
            case null:
            case undefined:
                // Success
                populateActionsWithDescribeData(data, 0, connection, callback);
                break;
            case 401:
                if (isRetry) {
                    return callback(new Error("Invalid refresh token on retry"));
                }

                getAndStoreRefreshedConnection(connection, function (err, data) {
                    if (err) {
                        return callback(err);
                    }

                    getActionsFromServer(data, true, callback);
                });
                break;
            default:
                return callback(new Error("getActions errored with: " + err));
        }
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
