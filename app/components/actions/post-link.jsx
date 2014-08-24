/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var CompletionTextarea = require("./../inputs/textarea-with-completions.jsx");
var ShareWith = require("./../inputs/share-with.jsx");
var SubmitButton = require("./../inputs/submit-button.jsx");

module.exports = React.createClass({
    getInitialState: function() {
        var title = window.document.title;
        var url = window.location.toString();

        if ( this.props.data ) {
            if ( this.props.data.title ) {
                title = this.props.data.title;
            }

            if ( this.props.data.url ) {
                url = this.props.data.url;
            }
        }

        return {
            title: title,
            url: url,
            message: ''
        };
    },
    componentWillReceiveProps: function( nextProps ) {
        if ( nextProps.data ) {
            var title = this.state.title;
            var url = this.state.url;

            if ( nextProps.data.title ) {
                title = nextProps.data.title;
            }

            if ( nextProps.data.url ) {
                url = nextProps.data.url;
            }

            this.setState({
                title: title,
                url: url
            });
        }
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
                    rows="10"
                    handleChange={this.handleMessageChange}
                    handleSubmit={this.handleSubmit}
                    />
				</div>
                <ShareWith ref="shareWith"/>
                <SubmitButton hasRequiredFields={this._hasRequiredFields()} text="Share Link"/>
			</form>
        );
    }
});
