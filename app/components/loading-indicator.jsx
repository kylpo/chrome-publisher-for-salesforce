/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
    render: function() {
        var ajaxUrl = chrome.extension.getURL('build/icons/ajax-loader.gif');
        return (
            <div>
                <img className="LoadingIndicator" src={ajaxUrl} />
            </div>
        );
    }
});
