/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
    getInitialState: function() {
        return { active : false };
    },
    launchPanel: function() {
        chrome.windows.create({
            "url": "popup.html",
//            "type": "panel",
            "type": "popup",
            "width": 320,
            "height": 500
        });
        window.close();
    },
    refreshActions: function() {
        chrome.runtime.sendMessage({type: "refreshActions"}, function(response) {
            if (response === null) {
                console.error("Error refreshing actions to client");
            } else {
                window.location.reload();
            }
        });
    },
    clearAuth: function() {
        chrome.runtime.sendMessage({type: "reAuthorize"}, function(response) {
            if (response === null) {
                console.error("Error re-authorizing");
            } else {
                window.location.reload();
            }
        });
    },
    render: function() {
        return (
            <div className="ActionsMenu">
                <span className="fa fa-vertical-dots"/>
                <div className="ActionsMenu-dropdown">
                    <button onClick={this.launchPanel}>Pop</button>
                    <button onClick={this.refreshActions}>Refresh Actions</button>
                    <button onClick={this.clearAuth}>Re-Authorize</button>
                </div>
            </div>
            );
    }
});
