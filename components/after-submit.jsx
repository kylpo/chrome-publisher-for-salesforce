/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    getDefaultProps: function() {

    },
    onClickNewTab: function() {
        var options = {
            "type": "launchNewTab",
            "id": this.props.response.id
        };

        chrome.runtime.sendMessage(options);
    },
    render: function() {
        var message = "Failed creating";

        if (this.props.response) {
            message = <p className="AfterSubmit-title">Successfully created!</p>;
            var newTab = <button className="AfterSubmit-button skin-Button is-active" onClick={this.onClickNewTab}>Open in new tab</button>;
        }

        return (
            <div className="AfterSubmit">
            {message}
            {newTab}
            </div>
            );
    }
});
