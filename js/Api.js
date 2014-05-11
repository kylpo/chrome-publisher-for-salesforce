'use strict'

/**
 * Given an accessToken, this will perform xhr requests to salesforce
 * @param accessToken
 */
module.exports = function() {
    function xhrWithAuth(callback, method, connection, url) {
//        console.log(connection);
        var xhr = new XMLHttpRequest();
        xhr.onload = requestComplete;
        xhr.open(method, connection.host + url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + connection.access_token);
        xhr.send();

        function requestComplete() {
//            console.log(this.status);
            // did not succeed
            if (this.status < 200 || this.status >= 300) {
                callback(this.status);
            } else {
                console.log(this.response);
                // did succeed
                if (this.response.length > 0) {
                    callback(null, JSON.parse(this.response));
                } else {
                    callback(null, null);
                }
            }
        }
    }

    this.getActions = function(callback, connection) {
        console.log("getActions");
        xhrWithAuth(callback, "GET", connection, "/services/data/v29.0/sobjects/Global/quickActions");
    }

    this.getDescribeAction = function(callback, connection, url) {
        console.log("getDescribeAction");
        xhrWithAuth(callback, "GET", connection, url);
    }
}