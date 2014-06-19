'use strict';

var API_PATH_PREFIX = "/services/data/v29.0/";

/**
 * Given an accessToken, this will perform xhr requests to salesforce
 *
 * @param {function(Object, Object=)} callback
 * @param {string} method
 * @param {Object} connection
 * @param {string} url
 */
function xhrWithAuth(callback, method, connection, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.onload = requestComplete;
    xhr.open(method, connection.host + url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + connection.access_token);
    if (data) {
        xhr.setRequestHeaders("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }

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
}

/**
 * Perform xhrWithAuth GET with params to retrieve actions
 *
 * @param {Object} connection
 * @param {function(Object, Object=)} callback
 */
exports.getActions = function(connection, callback) {
    xhrWithAuth(callback, "GET", connection, API_PATH_PREFIX.concat("sobjects/Global/quickActions"));
};

/**
 * Perform xhrWithAuth GET with params to retrieve the description of a specific action
 *
 * @param {Object} connection
 * @param {string} url - a specific action's Describe url
 * @param {function(Object, Object=)} callback
  */
exports.getDescribeAction = function(connection, url, callback) {
    xhrWithAuth(callback, "GET", connection, url);
};

/**
 * Perform xhrWithAuth POST with params to submit a Post
 *
 * @param {Object} connection
 * @param {function(Object, Object=)} callback
 */
exports.submitPost = function(connection, message, callback) {
    xhrWithAuth(callback, "POST", connection, API_PATH_PREFIX.concat("chatter/feeds/news/me/feed-items"), message);
};
