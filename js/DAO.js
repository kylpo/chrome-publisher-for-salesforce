'use strict';


var clientId = require("../secret.js").clientId;
var clientSecret = require("../secret.js").clientSecret;
var Auth = require("./SalesforceChromeOAuth.js");
var Api = require("./Api.js");

module.exports.getActions = function() {

    function getActionsFromServer(callback, connection) {

        function handleGetActions(actions) {
            var api = new Api();
            callback(null, actions.map(function (quickAction) {
//                console.log("quickaction:");
//                console.log(quickAction);
                if (quickAction.urls && quickAction.urls.hasOwnProperty("describe")) {
                    api.getDescribeAction(function (err, data) {
                        return data;
                    }, connection, quickAction.urls.describe);
                } else {
                    return quickAction;
                }
            }));
        }

        var api = new Api();
        api.getActions(function(err, data) {
            switch(err) {
                // success
                case null:
                case undefined:
//                    console.log("success");
//                    console.log(data);
                    handleGetActions(data);
//                    callback(null, data);
                    break;
                case 401:
                    console.log("refreshToken");
                    var auth = new Auth(clientId, clientSecret);
                    auth.refreshToken(function(err, data) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(data);
                            upsertConnection(data);
                        }
                    }, connection);
                    break;
                default:
                    console.log("no");
                    break;
            }
        }, connection);
    }

    function getConnection(callback) {
        chrome.storage.sync.get("connection", function (items) {
//            if (chrome.runtime.lastError) {
//                callback(new Error(chrome.runtime.lastError));
//                return;
//            }
//            console.log("items");
//            console.log(items);
            if (items && items.hasOwnProperty("connection")) {
                callback(null, items.connection);
            } else {
                callback("connection not found in chrome.storage.sync")
            }
        });
    }

    function upsertConnection(newConnection) {
        getConnection(function(err, data) {
            if (err) {
                console.log(err);
                console.log("inserting connection")
                console.log(newConnection);
                chrome.storage.sync.set({"connection": newConnection});
            } else if (data && data.hasOwnProperty("refresh_token") && data.hasOwnProperty("host")) {
                // Update the access_token field only
                var updatedConnection = {
                    "access_token": newConnection.access_token,
                    "host": data.host,
                    "refresh_token": data.refresh_token
                }

                chrome.storage.sync.set({"connection": updatedConnection});
//                    console.log("new data");
//                    newConnection.access_token = data.access_token;
            } else {
                console.error("error upserting");
                console.log(newConnection);
                console.log(data);
//                console.log("upsert");

//                console.log("newConnection");
//                console.log(newConnection);

//                console.log(data);


//                console.log("upserting");
//                console.log(newConnection);
//                console.log("vs");
//                console.log(connection);

            }
        })
    }

    getConnection(function(err, data) {
        if (err) {
            var auth = new Auth(clientId, clientSecret);
            console.log(err);
            auth.authenticate(function(err, connection) {
                if (err) {
                    console.error(err);
                } else {
//                    console.log(connection);
                    getActionsFromServer(function(err, data) {
                        console.log(data);
                        return data;
                    }, connection);
                    upsertConnection(connection);
                }
            });
        } else {
//            console.log("got it");
            getActionsFromServer(function(err, data) {
                console.log(data);
                return data;
            }, data);
        }
    });

    var items = [{
		"name" : "FeedItem.TextPost",
		"type" : "Post",
		"label" : "Post",
		"icon" : "icons/post_120.png",
		"iconColor" : "#4eb1cb",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.LinkPost",
		"type" : "Post",
		"label" : "Link",
		"icon" : "icons/link_120.png",
		"iconColor" : "#6078c2",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.ContentPost",
		"type" : "Post",
		"label" : "File",
		"icon" : "icons/file_120.png",
		"iconColor" : "#b19f7e",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.PollPost",
		"type" : "Post",
		"label" : "Poll",
		"icon" : "icons/poll_120.png",
		"iconColor" : "#5181c4",
		"urls" : {
		}
	}, {
		"name" : "NewAccount",
		"type" : "Create",
		"label" : "New Account",
		"icon" : "icons/account_120.png",
		"iconColor" : "#717ecd",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewAccount/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewAccount",
			"defaultValues" : "/services/data/v29.0/quickActions/NewAccount/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewAccount/describe"
		}
	}, {
		"name" : "NewCase",
		"type" : "Create",
		"label" : "New Case",
		"icon" : "icons/case_comment_120.png",
		"iconColor" : "#eac95a",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewCase/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewCase",
			"defaultValues" : "/services/data/v29.0/quickActions/NewCase/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewCase/describe"
		}
	}, {
		"name" : "NewContact",
		"type" : "Create",
		"label" : "New Contact",
		"icon" : "icons/contact_120.png",
		"iconColor" : "#8b7fd5",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewContact/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewContact",
			"defaultValues" : "/services/data/v29.0/quickActions/NewContact/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewContact/describe"
		}
	}, {
		"name" : "NewEvent",
		"type" : "Create",
		"label" : "New Event",
		"icon" : "icons/event_120.png",
		"iconColor" : "#d96383",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewEvent/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewEvent",
			"defaultValues" : "/services/data/v29.0/quickActions/NewEvent/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewEvent/describe"
		}
	}, {
		"name" : "NewLead",
		"type" : "Create",
		"label" : "New Lead",
		"icon" : "icons/lead_120.png",
		"iconColor" : "#ed7e58",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewLead/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewLead",
			"defaultValues" : "/services/data/v29.0/quickActions/NewLead/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewLead/describe"
		}
	}, {
		"name" : "NewNote",
		"type" : "Create",
		"label" : "New Note",
		"icon" : "icons/note_120.png",
		"iconColor" : "#dcd861",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewNote/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewNote",
			"defaultValues" : "/services/data/v29.0/quickActions/NewNote/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewNote/describe"
		}
	}, {
		"name" : "NewOpportunity",
		"type" : "Create",
		"label" : "New Opportunity",
		"icon" : "icons/opportunity_120.png",
		"iconColor" : "#f3ae4e",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewOpportunity/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewOpportunity",
			"defaultValues" : "/services/data/v29.0/quickActions/NewOpportunity/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewOpportunity/describe"
		}
	}, {
		"name" : "NewTask",
		"type" : "Create",
		"label" : "New Task",
		"icon" : "icons/task_120.png",
		"iconColor" : "#4ab471",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewTask/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewTask",
			"defaultValues" : "/services/data/v29.0/quickActions/NewTask/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewTask/describe"
		}
	}, {
		"name" : "LogACall",
		"type" : "LogACall",
		"label" : "Log a Call",
		"icon" : "icons/case_log_a_call_120.png",
		"iconColor" : "#eac95a",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/LogACall/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/LogACall",
			"defaultValues" : "/services/data/v29.0/quickActions/LogACall/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/LogACall/describe"
		}
	}, {
		"name" : "FeedItem.MobileSmartActions",
		"type" : "Post",
		"label" : "Mobile Smart Actions",
		"icon" : "icons/default_120.png",
		"iconColor" : "#849cb1",
		"urls" : {
		}
	}];
    return items;
}
