'use strict';

var Api = require("salesforce-api-using-access-token");
var API_PATH_PREFIX = "/services/data/v29.0/";

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

    module.postFile = function(connection, file, callback) {
        console.log(file);
        var xhr = new XMLHttpRequest();
        xhr.onload = requestComplete;
        xhr.open("POST", connection.instance_url + API_PATH_PREFIX.concat("chatter/feeds/news/me/feed-items"), true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + connection.access_token);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=abc123def456');
        var msg = {
            "body": {
                "messageSegments": [{
                    "type": "Text",
                    "text": "Testing file submission. "
                }, {
                    "type": "Hashtag",
                    "tag": "winning"
                }, {
                    "type": "Text",
                    "text": " Fingers crossed"
                }]
            },
            "attachment": {
                "attachmentType": "NewFile",
                "description": "Sample image",
                "title": "Sample"
            }
        };
        var body = '';
        body += '--abc123def456\r\n';
        body += 'Content-Disposition: form-data; name="json"\r\n';
        body += 'Content-Type: application/json; charset=UTF-8\r\n\r\n';
        body += JSON.stringify(msg);
        body += '\r\n--abc123def456\r\n';
        body += 'Content-Disposition: form-data; name="feedItemFileUpload"; filename="foo.png"\r\n';
        body += 'Content-Type: application/octet-stream; charset=ISO-8859-1\r\n\r\n';
//        body += 'Content-Transfer-Encoding: binary\r\n\r\n';

        body += file;
        /*
         var reader = new FileReader();
         reader.onload = (function(body, xhr) {
         return function(e) {
         body += e.target.result;
         body += '\r\n--abc123def456--';
         xhr.send(body);
         }
         })(body, xhr);
         reader.readAsText(file);
         */
        //body += 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABvCAYAAADhXlINAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ3QTlFQUZEREUxQTExRTNCOEI1OTA4NjJGRTIxMTA2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ3QTlFQUZFREUxQTExRTNCOEI1OTA4NjJGRTIxMTA2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDdBOUVBRkJERTFBMTFFM0I4QjU5MDg2MkZFMjExMDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDdBOUVBRkNERTFBMTFFM0I4QjU5MDg2MkZFMjExMDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ULFnvAAAZPklEQVR42uxdB7wU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';
        body += '\r\n--abc123def456--';
        xhr.send(body);

        function requestComplete() {
            // did not succeed
            if (this.status < 200 || this.status >= 300) {
                callback(this.status);
            } else {
                // did succeed
                if (this.response.length > 0) {
                    callback(null, JSON.parse(this.response));
                } else {
                    callback(null);
                }
            }
        }
    };

    return module;
};