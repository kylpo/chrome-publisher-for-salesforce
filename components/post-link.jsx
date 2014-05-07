/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			title: "",
			url: ""
		}
	},
	tabQueryResponse: function(arrayOfTabs) {
		var activeTab = arrayOfTabs[0];
		this.setState({
			title: activeTab.title,
			url: activeTab.url
		});
	},
    render: function() {
        chrome.tabs.query({
			active: true,
			currentWindow: true
		}, this.tabQueryResponse);
        return (
			<div className="post-link">
				<div className="action-form-group">
					<label>Link Url</label>
					<input type="text" name="link-url" value={this.state.url} />
				</div>
				<div className="action-form-group">
					<label>Link Name</label>
					<input type="text" name="link-name" value={this.state.title} />
				</div>
				<div className="action-form-group">
					<label>Link Description</label>
					<input type="text" name="link-description" />
				</div>
				<div className="action-form-group">
					<button>Share Link</button>
				</div>
			</div>
        );
    }
});
