/** @jsx React.DOM */

'use strict';

var React = require("react");
var PostText = require("./actions/post-text.jsx");
var PostLink = require("./actions/post-link.jsx");
var PostFile = require("./actions/post-file.jsx");
var PostPoll = require("./actions/post-poll.jsx");
var PersonalTIL = require("./actions/personal-til.jsx");
var PersonalMyDay = require("./actions/personal-myday.jsx");
var AfterSubmit = require("./after-submit.jsx");
var LoadingIndicator = require("./loading-indicator.jsx");

module.exports = React.createClass({
	TEXT_POST: "FeedItem.TextPost",
	LINK_POST: "FeedItem.LinkPost",
    FILE_POST: "FeedItem.ContentPost",
    POLL_POST: "FeedItem.PollPost",
    // HACK
    PERSONAL_TIL: "Personal.TIL",
    PERSONAL_MYDAY: "Personal.MyDay",
    // End HACK
	propTypes: {
		action: React.PropTypes.object
	},
    getInitialState: function() {
        return {
            "isLoading": false,
            "response": null
        };
    },
    onLoading: function() {
        this.setState({"isLoading": true});
    },
    onAfterSubmit: function(response) {
        this.setState({"isLoading": false, "response": response});
    },
    resetActionForm: function() {
        this.setState({"isLoading": false, "response": null});
    },
	getActionForm: function() {
		var name = this.props.action && this.props.action.name;
		switch(name) {
		case this.TEXT_POST:
			return <PostText onLoading={this.onLoading} onAfterSubmit={this.onAfterSubmit}/>;
		case this.LINK_POST:
			return <PostLink onLoading={this.onLoading} onAfterSubmit={this.onAfterSubmit}/>;
        case this.FILE_POST:
            return <PostFile onLoading={this.onLoading} onAfterSubmit={this.onAfterSubmit}/>;
        case this.POLL_POST:
            return <PostPoll onLoading={this.onLoading} onAfterSubmit={this.onAfterSubmit}/>;
        case this.PERSONAL_TIL:
            return <PersonalTIL onLoading={this.onLoading} onAfterSubmit={this.onAfterSubmit}/>;
        case this.PERSONAL_MYDAY:
            return <PersonalMyDay onLoading={this.onLoading} onAfterSubmit={this.onAfterSubmit}/>;
		default:
			return <div className="not-supported"><div className="wrapper"><div>Quick Action</div><div className="emphasize">{ this.props.action && this.props.action.label }</div><div>Not Supported Yet</div></div></div>;
		}
	},
    render: function() {
		var display = "";
        var label = this.props.action != null ? this.props.action.label : "";

        if (this.state.isLoading) {
            display = <LoadingIndicator/>;
        } else if (this.state.response != null) {
            display = <AfterSubmit response={this.state.response} label={label} resetActionForm={this.resetActionForm} backToGrid={this.props.backToGrid}/>
        } else {
            display = this.getActionForm();
        }

        return (
			<div className="action-form">
				{ display }
			</div>
        );
    }
});
