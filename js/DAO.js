'use strict';

var clientId = require("../secret.js").clientId;
var clientSecret = require("../secret.js").clientSecret;
var Auth = require("./SalesforceChromeOAuth.js");
var Api = require("./Api.js");

module.exports.getActions = function() {

    function getActionsFromServer(connection) {
        var api = new Api();
        api.getActions(function(err, data) {
            switch(err) {
                // success
                case null:
                case undefined:
                    console.log("success")
                    console.log(data);
                    return data;
                    break;
                case 401:
                    console.log("refreshToken");
                    var auth = new Auth(clientId, clientSecret);
                    auth.refreshToken(function(err, data) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(data)
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

//    function getDescribeQuickActionFromServer(connection) {
//        var api = new Api();
//        api.getActions(function(err, data) {
//            switch(err) {
//                // success
//                case null:
//                case undefined:
//                    console.log("success")
//                    console.log(data);
//                    return data;
//                    break;
//                case 401:
//                    console.log("refreshToken");
//                    var auth = new Auth(clientId, clientSecret);
//                    auth.refreshToken(function(err, data) {
//                        if (err) {
//                            console.error(err);
//                        } else {
//                            console.log(data)
//                            upsertConnection(data);
//                        }
//                    }, connection);
//                    break;
//                default:
//                    console.log("no");
//                    break;
//            }
//        }, connection);
//    }

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

    function upsertConnection(connection) {
        getConnection(function(err, data) {
            if (err) {
                console.log(err);
                console.log("inserting connection")
                console.log(connection);
                chrome.storage.sync.set({"connection": connection});
            } else {
//                console.log("upsert");
                var newConnection = {
                    "access_token": connection.access_token,
                    "host": connection.host,
                    "refresh_token": connection.refresh_token
                }
//                console.log("newConnection");
//                console.log(newConnection);

//                console.log(data);
                if (data && data.hasOwnProperty("access_token")) {
//                    console.log("new data");
                    newConnection.access_token = data.access_token;
                }

//                console.log("upserting");
//                console.log(newConnection);
//                console.log("vs");
//                console.log(connection);
                chrome.storage.sync.set({"connection": newConnection});
            }
        })
    }

    getConnection(function(err, data) {
        if (err) {
            var auth = new Auth(clientId, clientSecret);
            console.error(err);
            auth.authenticate(function(err, connection) {
                if (err) {
                    console.error(err);
                } else {
//                    console.log(connection);
                    getActionsFromServer(connection);
                    upsertConnection(connection);
                }
            });
        } else {
//            console.log("got it");
            getActionsFromServer(data);
        }
    });

//                var items = [
//                    {
//                        title: "Action 1",
//                        icon: "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png"
//                    },
//                    {
//                        title: "Action 2",
//                        icon: "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Baidu-icon.png"
//                    },
//                    {
//                        title: "Action 3",
//                        icon: "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Dzone-icon.png"
//                    },
//                    {
//                        title: "Action 4",
//                        icon: "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Formspring-icon.png"
//                    },
//                    {
//                        title: "Action 5",
//                        icon: "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Foursquare-icon.png"
//                    },
//                    {
//                        title: "Action 6",
//                        icon: "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Evernote-icon.png"
//                    }
//                ];
//
//                return items;

}
