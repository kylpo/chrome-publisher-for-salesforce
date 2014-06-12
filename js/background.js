var DAO = require("./DAO.js");

'use strict';

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
    switch (request.type) {
        case "getActions":
            sendResponse(DAO.getActions());
            break;
        default:
            break;
    }

});

