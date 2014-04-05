/** @jsx React.DOM */

'use strict';

var Action = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired
	},
	handleClick: function(e) {
		console.log("Clicked: {this.props.title}");
	},
    render: function() {
        return (
        	<div className="action" onClick={this.handleClick}><img className="icon" src={this.props.icon} /><div className="title">{this.props.title}</div></div>
            );
    }
});