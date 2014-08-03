/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired
	},
	getDefaultProps: function() {
		return {
			title: "Back",
			onBackClicked: function() { }
		};
	},
	onBackClicked: function() {
		console.log("Back clicked");
		this.props.onBackClicked();
	},
    render: function() {	
        return (
        	<div className="sfqa-back-nav">
				<div className="icon icon-utility-back" onClick={this.onBackClicked.bind(this)}>
				</div>
				<div className="title">
					{ this.props.title }
				</div>
        	</div>
        );
    }
});
