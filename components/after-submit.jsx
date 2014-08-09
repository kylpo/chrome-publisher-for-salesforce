/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    onClickNewTab: function() {
        var options = {
            "type": "launchNewTab",
            "id": this.props.response.id
        };

        this.sendMessage(options);
    },
    handleUndo: function() {
        var options = {
            "type": "delete",
            "id": this.props.response.id
        };

        this.sendMessage(options);
    },
    sendMessage: function(options) {
        chrome.runtime.sendMessage(options);

        // Necessary to reset to action form for popout mode
        this.props.backToGrid();
    },
    render: function() {
        var message = "Failed creating";

        if (this.props.response) {
            message = <p className="AfterSubmit-title">Successfully created!</p>;
            var undo = <button className="AfterSubmit-button skin-Button" onClick={this.handleUndo}>Undo</button>;
            var newTab = <button className="AfterSubmit-button skin-Button is-active" onClick={this.onClickNewTab}>Open in new tab</button>;
        }

        return (
            <div className="AfterSubmit">
            {message}
            {undo}
            {newTab}
            </div>
            );
    }
});
