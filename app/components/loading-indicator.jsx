/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <img className="LoadingIndicator" src="../icons/ajax-loader.gif"/>
            </div>
            );
    }
});
