/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired
	},
	getDefaultProps: function() {
		return {
			title: "Back"
		};
	},
	onBackClicked: function() {
		this.props.onBackClicked();
	},
    render: function() {	
        return (
        	<div className="back-nav">
				<div className="icon icon-utility-back">
				</div>
				<div className="title">
					{ this.props.title }
				</div>
        	</div>
        );
    }
});
