/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var CompletionTextarea = require("./../inputs/textarea-with-completions.jsx");
var ShareWith = require("./../inputs/share-with.jsx");
var SubmitButton = require("./../inputs/submit-button.jsx");

module.exports = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        if (!this._hasRequiredFields()) {
            return false;
        }

        this.props.onLoading();

        var options = {
            "type": "submitPost",
            "message": this.refs.textarea.getValue(),
            "to": this.refs.shareWith.getValue()
        };

        chrome.runtime.sendMessage(options, function(response) {
            this.props.onAfterSubmit(response);
        }.bind(this));
    },
    getInitialState: function() {
        return {value: ""};
    },
    handleChange: function() {
        this.setState({value: this.refs.textarea.getValue()});
    },
    _hasRequiredFields: function() {
        return this.state.value !== "";
    },
    render: function() {
        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Post Text</label>
                    <CompletionTextarea
                        ref="textarea"
                        rows="20"
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    />
                </div>
                <ShareWith ref="shareWith"/>
                <SubmitButton hasRequiredFields={this._hasRequiredFields()} text="Share Post"/>
            </form>
        );
    }
});
