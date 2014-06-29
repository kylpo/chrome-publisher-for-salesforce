/** @jsx React.DOM */

'use strict';

var React = require("react");
var ShareWith = require("./share-with.jsx");

module.exports = React.createClass({
    getInitialState: function() {
    	chrome.tabs.query({
			active: true
//			currentWindow: true
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
    handleMessageChange: function(event) {
        this.setState({message: event.target.value});
    },
    handleSubmit: function() {
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
//            if (response === null) {
//                console.error("Error getting submitting Post");
//            } else {
//                console.log(response);
//            }
        });
    },
    render: function() {

//        <ShareWith shareTitle="Share Link" />
		var url = this.state.url;
		var title = this.state.title;

        return (
			<form className="post-link" onSubmit={this.handleSubmit}>
				<div className="action-form-group">
					<label>Link Url</label>
					<input type="text" name="link-url" value={url} onChange={this.handleUrlChange}/>
				</div>
				<div className="action-form-group">
					<label>Link Name</label>
					<input type="text" name="link-name" value={title} onChange={this.handleTitleChange}/>
				</div>
				<div className="action-form-group">
					<label>Link Description</label>
					<input
                    type="textarea"
                    name="link-description"
                    value={this.state.message}
                    onChange={this.handleMessageChange}
                    />
				</div>
                <div className="action-form-group">
                    <button type="submit">Share Link</button>
                </div>
			</form>
        );
    }
});
