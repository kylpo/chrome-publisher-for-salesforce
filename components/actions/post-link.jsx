/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var CompletionTextarea = require("./../inputs/textarea-with-completions.jsx");
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
        this.setState({message: this.refs.textarea.getValue()});
    },
    handleSubmit: function(e) {
        e.preventDefault();

        if (!this._hasRequiredFields()) {
            return false;
        }

        this.props.onLoading();

        var options = {
            "type": "submitPostWithAttachment",
            "message": this.refs.textarea.getValue(),
            "to": this.refs.shareWith.getValue(),
            "attachment": {
                "attachmentType" : "Link",
                "url" : this.state.url,
                "urlName" : this.state.title
            }
        };

        chrome.runtime.sendMessage(options, function(response) {
            this.props.onAfterSubmit(response);
        }.bind(this));
    },
    _hasRequiredFields: function() {
        return this.state.url !== "";
    },
    render: function() {		
        var cx = React.addons.classSet;
        var submitClasses = cx({
            "Form-submitButton": true,
            "skin-Button": true,
            "is-active": true,
            'is-clickable': this._hasRequiredFields()
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
                    <CompletionTextarea
                    ref="textarea"
                    rows="12"
                    handleChange={this.handleMessageChange}
                    handleSubmit={this.handleSubmit}
                    />
				</div>
                <ShareWith ref="shareWith"/>
                <button className={submitClasses} type="submit">Share Link</button>
			</form>
        );
    }
});
