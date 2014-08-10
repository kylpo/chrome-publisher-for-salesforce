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

    module.getMentionCompletions = function getMentionCompletions(connection, query, callback) {
        apiCallWithRetryAndRefreshToken(Api.getMentionCompletions, [connection, query], callback);
    };

    module.getGroupMentionCompletions = function getGroupMentionCompletions(connection, query, callback) {
        apiCallWithRetryAndRefreshToken(Api.getGroupMentionCompletions, [connection, query], callback);
    };

    module.getTopicCompletions = function getTopicCompletions(connection, query, callback) {
        apiCallWithRetryAndRefreshToken(Api.getTopicCompletions, [connection, query], callback);
    };

    module.submitPost = function submitPost(connection, message, callback) {
        apiCallWithRetryAndRefreshToken(Api.submitPost, [connection, message], callback);
    };

    module.submitPostTo= function submitPostToRecord(connection, recordId, message, callback) {
        apiCallWithRetryAndRefreshToken(Api.submitPostToRecord, [connection, recordId, message], callback);
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