/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    handleClickAuthorize: function() {
        var options = {
            "type": "authorize"
        };

        chrome.runtime.sendMessage(options, function() {
            window.close();
        });
    },

    render: function() {
        return (
            <div className="Authorize">
                <button className="AfterSubmit-button skin-Button is-active" onClick={this.handleClickAuthorize}>Authorize</button>
                <p>(In popup window)</p>
            </div>
            );
    }
});
