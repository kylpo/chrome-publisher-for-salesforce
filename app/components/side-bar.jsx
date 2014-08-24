/** @jsx React.DOM */

'use strict';

var React = require("react");
var App = require("./app.jsx");

module.exports = React.createClass({
	propTypes: {
		open: React.PropTypes.bool.isRequired
	},
    render: function() {
        return (
        	<div className="sidebar" data-open={this.props.open}>

                    { this.props.children }
            </div>
        );
    }
});