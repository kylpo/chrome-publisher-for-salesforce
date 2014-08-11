/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var CompletionTextarea = require("./../inputs/textarea-with-completions.jsx");
var ShareWith = require("./../inputs/share-with.jsx");
var cx = React.addons.classSet;

module.exports = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        if (!this._hasRequiredFields()) {
            return false;
        }

        this.props.onLoading();

        var options = {
            "type": "submitPost",
            "message": "Today I learned: " + this.refs.textarea.getValue() + "\n\n #[TIL]",
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
    handleClickSubmit: function() {
        if (this.state.value === "") return false;
    },
    _hasRequiredFields: function() {
        return this.state.value !== "";
    },
    render: function() {
        var submitClasses = cx({
            "Form-submitButton": true,
            "skin-Button": true,
            "is-active": true,
            'is-clickable': this._hasRequiredFields()
        });
        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Today I learned...</label>
                    <CompletionTextarea
                    ref="textarea"
                    rows="20"
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    />
                </div>
                <ShareWith ref="shareWith" minimumInputLength="2" groupOnly={true}/>
                <button className={submitClasses} type="submit">Share Post</button>
            </form>
            );
    }
});
