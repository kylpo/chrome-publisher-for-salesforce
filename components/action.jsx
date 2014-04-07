/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired
	},
    render: function() {
        return (
        	<div className="action" onClick={this.props.onClick}><img className="icon" src={this.props.icon} /><div className="title">{this.props.title}</div></div>
            );
    }
});