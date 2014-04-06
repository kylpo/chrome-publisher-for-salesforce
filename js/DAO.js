'use strict';

var clientId = require("../secret.js").clientId;
var clientSecret = require("../secret.js").clientSecret;
var Auth = require("./SalesforceChromeOAuth.js");

exports.getActions = function() {
//    var redirectUri = "https://" + chrome.runtime.id + ".chromiumapp.org/provider_cb";
//    var host = "https://na15.salesforce.com"
//
//    var options = {
//        "interactive": true,
//        "url": host + "/services/oauth2/authorize?client_id=" + clientId +
//            "&response_type=code" +
//            "&display=touch" +
//            "&redirect_uri=" + encodeURIComponent(redirectUri)
//    };
//
//    console.log(options.url);
//
//    chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
//        console.log(chrome.runtime.lastError);
//        debugger;
//    });

    var auth = new Auth(clientId, clientSecret);
    auth.authenticate(function(err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    });

    var items = [{
        title : "Action 1",
        icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png"
    }, {
        title : "Action 2",
        icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Baidu-icon.png"
    }, {
        title : "Action 3",
        icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Dzone-icon.png"
    }, {
        title : "Action 4",
        icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Formspring-icon.png"
    }, {
        title : "Action 5",
        icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Foursquare-icon.png"
    }, {
        title : "Action 6",
        icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Evernote-icon.png"
    }];

    return items;

}