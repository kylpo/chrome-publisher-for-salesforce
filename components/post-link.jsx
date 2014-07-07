/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./inputs/post.jsx");
var ShareWith = require("./share-with.jsx");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            url: "",
            message: ''
        }
    },
	tabQueryResponse: function(arrayOfTabs) {
		var activeTab = arrayOfTabs[0];
		this.setState({
			title: activeTab.title,
			url: activeTab.url
		});
	},
    handleTitleChange: function(event) {
        this.setState({title: event.target.value});
    },
    handleUrlChange: function(event) {
        this.setState({url: event.target.value});
    },
    handleMessageChange: function(event) {
        this.setState({message: event.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onLoading();

        var options = {
            "type": "submitLink",
            "message": this.state.message,
            "attachment": {
                "attachmentType" : "Link",
                "url" : this.state.url,
                "urlName" : this.state.title
            }
        };

        chrome.runtime.sendMessage(options, function(response) {
            this.props.onAfterSubmit(response);
//            if (response === null) {
//                console.error("Error getting submitting Post");
//            } else {
//                console.log(response);
//            }
        }.bind(this));
    },
    render: function() {
        chrome.tabs.query({
			active: true
//			currentWindow: true
		}, this.tabQueryResponse);

        var cx = React.addons.classSet;
        var submitClasses = cx({
            "Form-submitButton": true,
            'is-clickable': this.state.url !== "" && this.state.title !== ""
        });

//        <ShareWith shareTitle="Share Link" />
        return (
			<form className="post-link" onSubmit={this.handleSubmit}>
				<div className="action-form-group">
					<label>Link Url</label>
					<input type="text" required name="link-url" value={this.state.url} onChange={this.handleTitleChange}/>
				</div>
				<div className="action-form-group">
					<label>Link Name</label>
					<input type="text" required name="link-name" value={this.state.title} onChange={this.handleUrlChange}/>
				</div>
				<div className="action-form-group">
					<label>Link Description</label>
                    <PostInput
                    value={this.state.message}
                    handleChange={this.handleMessageChange}
                    handleSubmit={this.handleSubmit}
                    />
				</div>
                <div className="action-form-group">
                    <button className={submitClasses} type="submit">Share Link</button>
                </div>
			</form>
        );
    }
});
