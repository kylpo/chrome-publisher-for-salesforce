/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var MessageAfter = require("./message-after-submit.jsx");
var PostInput = require("./inputs/post.jsx");

module.exports = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        this.setState({"isLoading" : true});

        var options = {
            "type": "submitPost",
            "message": this.state.value
        };

        chrome.runtime.sendMessage(options, function(response) {
            if (response === null) {
                console.error("Error getting submitting Post");
            } else {
                this.setState({"isLoading" : false, "response" : response});
            }
        }.bind(this));

        return false;
    },
    getInitialState: function() {
        return {value: ""};
    },
//    componentDidMount: function() {
//        this.refs.textarea.getDOMNode().focus();
//    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    handleClickSubmit: function() {
        if (this.state.value === "") return false;
    },
    render: function() {
        var cx = React.addons.classSet;
        var submitClasses = cx({
            "Form-submitButton": true,
            'is-clickable': this.state.value !== ""
        });

        var display = "";

        if (this.state.isLoading) {
            display = (
                <div>
                    <img className="LoadingIndicator" src="../icons/ajax-loader.gif"/>
                </div>
                )
        } else if (this.state.response) {
            display = <MessageAfter response={this.state.response}/>;
        } else {
            display = (
                <form className="post-text" onSubmit={this.handleSubmit}>
                    <div className="action-form-group">
                        <label>Post Text</label>
                        <PostInput
                        value={this.state.value}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        />
                    </div>
                    <div className="action-form-group">
                        <button className={submitClasses} type="submit" onClick={this.handleClickSubmit}>Submit Post</button>
                    </div>
                </form>
                );
        }

        return (
            <div>
            {display}
            </div>
        );
    }
});
