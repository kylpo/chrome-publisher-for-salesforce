/** @jsx React.DOM */

'use strict';

var React = require("react");
var PostText = require("./post-text.jsx");
var PostLink = require("./post-link.jsx");

module.exports = React.createClass({
	TEXT_POST: "FeedItem.TextPost",
	LINK_POST: "FeedItem.LinkPost",
	propTypes: {
		action: React.PropTypes.object
	},
	getActionForm: function() {
		var name = this.props.action && this.props.action.name;
		switch(name) {
		case this.TEXT_POST:
			return <PostText />;
		case this.LINK_POST:
			return <PostLink />;
		default:
			return <div className="not-supported"><div className="wrapper"><div>Quick Action</div><div className="emphasize">{ this.props.action && this.props.action.label }</div><div>Not Supported Yet</div></div></div>;
		}
	},
    render: function() {
		var actionForm = this.getActionForm();
        return (
			<div className="action-form">
				{ actionForm }
			</div>
        );
    }
});