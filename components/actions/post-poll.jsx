 /** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var CompletionTextarea = require("./../inputs/textarea-with-completions.jsx");
var Input = require("./../inputs/input.jsx");
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
            "type": "submitPostWithAttachment",
            "message": this.refs.textarea.getValue(),
            "to": this.refs.shareWith.getValue(),
            "attachment": {
                "attachmentType" : "Poll",
                "pollChoices" : this.getPollChoices()
            }
        };

        chrome.runtime.sendMessage(options, function(response) {
            this.props.onAfterSubmit(response);
        }.bind(this));
    },
    getInitialState: function() {
        return {
            message: "",
            value1: "",
            value2: "",
            value3: "",
            value4: ""
        };
    },
    getPollChoices: function() {
        return [this.state.value1, this.state.value2, this.state.value3, this.state.value4].filter(function (val) {
                return val !== "";
            })
    },
    handleChange: function() {
        this.setState({message: this.refs.textarea.getValue()});
    },
    handleInput1Change: function(event) {
        this.setState({value1: event.target.value});
    },
    handleInput2Change: function(event) {
        this.setState({value2: event.target.value});
    },
    handleInput3Change: function(event) {
        this.setState({value3: event.target.value});
    },
    handleInput4Change: function(event) {
        this.setState({value4: event.target.value});
    },
    _hasRequiredFields: function() {
        return this.state.message !== "" && this.getPollChoices().length >= 2;
    },
    render: function() {
        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Question</label>
                    <CompletionTextarea
                    ref="textarea"
                    rows="4"
                    placeholder="What would you like to ask?"
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="action-form-group">
                    <label>Choice 1</label>
                    <Input value={this.state.value1} handleChange={this.handleInput1Change} handleSubmit={this.handleSubmit}/>
                </div>
                <div className="action-form-group">
                    <label>Choice 2</label>
                    <Input value={this.state.value2} handleChange={this.handleInput2Change} handleSubmit={this.handleSubmit}/>
                </div>
                <div className="action-form-group">
                    <label>Choice 3</label>
                    <Input value={this.state.value3} handleChange={this.handleInput3Change} handleSubmit={this.handleSubmit}/>
                </div>
                <div className="action-form-group">
                    <label>Choice 4</label>
                    <Input value={this.state.value4} handleChange={this.handleInput4Change} handleSubmit={this.handleSubmit}/>
                </div>
                <ShareWith ref="shareWith" minimumInputLength="2" groupOnly={true}/>
                <SubmitButton hasRequiredFields={this._hasRequiredFields()} text="Share Poll"/>
            </form>
            );
    }
});
