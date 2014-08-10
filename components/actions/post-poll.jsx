/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./../inputs/post.jsx");
var Input = require("./../inputs/input.jsx");
var ShareWith = require("./../inputs/share-with.jsx");
var cx = React.addons.classSet;

module.exports = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onLoading();

        var pollChoices = this.getPollChoices();

        var options = {
            "type": "submitPostWithAttachment",
            "message": this.refs.postInput.getValue(),
            "to": this.refs.shareWith.getVal(),
            "attachment": {
                "attachmentType" : "Poll",
                "pollChoices" : pollChoices
            }
        };

        chrome.runtime.sendMessage(options, function(response) {
            this.props.onAfterSubmit(response);
//            if (response === null) {
//                console.error("Error getting submitting Post");
//            } else {
//            }
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
        this.setState({message: this.refs.postInput.getValue()});
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
    handleClickSubmit: function() {
        if (this.state.message === "") return false;
    },
    render: function() {
        var submitClasses = cx({
            "Form-submitButton": true,
            'is-clickable': this.state.message !== "" && this.getPollChoices().length >= 2
        });

        return (
            <form className="post-text">
                <div className="action-form-group">
                    <label>Post Text</label>
                    <PostInput
                    ref="postInput"
                    rows="4"
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
                <ShareWith ref="shareWith"/>
                <div className="action-form-group">
                    <button className={submitClasses} type="submit" onClick={this.handleClickSubmit}>Submit Post</button>
                </div>
            </form>
            );
    }
});
