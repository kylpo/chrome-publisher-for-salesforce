/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./../inputs/post.jsx");
var ShareWith = require("./../inputs/share-with.jsx");
var cx = React.addons.classSet;

module.exports = React.createClass({
    getInitialState: function() {
    	chrome.tabs.query({
			active: true,
			currentWindow: true
		}, this.tabQueryResponse);
		
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
    handleMessageChange: function() {
        this.setState({message: this.refs.postInput.getValue()});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onLoading();

        var options = {
            "type": "submitPostWithAttachment",
            "message": this.refs.postInput.getValue(),
            "to": this.refs.shareWith.getVal(),
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
    hasRequiredFields: function() {
        return this.state.url !== "" && this.state.title !== "";
    },
    render: function() {		
        var cx = React.addons.classSet;
        var submitClasses = cx({
            "Form-submitButton": true,
            "skin-Button": true,
            "is-active": true,
            'is-clickable': this.hasRequiredFields()
        });

        return (
			<form className="post-link" onSubmit={this.handleSubmit}>
				<div className="action-form-group">
					<label>Link Url</label>
					<input type="text" required name="link-url" value={this.state.url} onChange={this.handleUrlChange}/>
				</div>
				<div className="action-form-group">
					<label>Link Name</label>
					<input type="text" required name="link-name" value={this.state.title} onChange={this.handleTitleChange}/>
				</div>
				<div className="action-form-group">
					<label>Link Description</label>
                    <PostInput
                    ref="postInput"
                    rows="12"
                    handleChange={this.handleMessageChange}
                    handleSubmit={this.handleSubmit}
                    />
				</div>
                <ShareWith ref="shareWith"/>
                <div className="action-form-group">
                    <button className={submitClasses} type="submit" disabled={!this.hasRequiredFields()}>Share Link</button>
                </div>
			</form>
        );
    }
});
