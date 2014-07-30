'use strict';

var Api = require("salesforce-api-using-access-token");

module.exports = function(refreshToken, upsertConnection) {
    var module = {};

    function apiCallWithRetryAndRefreshToken(action, args, responseCallback) {
        var getAndStoreRefreshedConnection = function getAndStoreRefreshedConnection(callback) {
            refreshToken(args[0], function(err, data) {
                if (err) {
                    return callback(null);
                }

                // args[0] == connection
                args[0] = data;
                upsertConnection(data, function(err, data) {
                    if (err) {
                        return callback(null);
                    }

                    return callback(args);
                });
            });
        };

        Api.apiCallWithRetry(action, args, getAndStoreRefreshedConnection, responseCallback);
    }

    module.getMentions = function getMentions(connection, mention, callback) {
        apiCallWithRetryAndRefreshToken(Api.getMentions, [connection, mention], callback);
    };

    module.submitPost = function submitPost(connection, message, callback) {
        apiCallWithRetryAndRefreshToken(Api.submitPost, [connection, message], callback);
    };

    module.getActions = function getActions(connection, callback) {
        apiCallWithRetryAndRefreshToken(Api.getActions, [connection], callback);
    };

    module.getDescribeAction = function getDescribeAction(connection, url, callback) {
        apiCallWithRetryAndRefreshToken(Api.getDescribeAction, [connection, url], callback);
    };

    module.deletePost = function deletePost(connection, id, callback) {
        apiCallWithRetryAndRefreshToken(Api.deletePost, [connection, id], callback);
    };

    return module;
};