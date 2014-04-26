/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired,
		iconColor: React.PropTypes.string.isRequired
	},
    render: function() {
		var inlineStyle = {
			"background-color": this.props.iconColor
		};
        return (
        	<div className="action" onClick={this.props.onClick}><img className="icon" src={this.props.icon} style={inlineStyle} /><div className="title">{this.props.title}</div></div>
            );
    }
});