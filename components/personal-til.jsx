/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./inputs/post.jsx");

module.exports = React.createClass({
    handleSubmit: function() {
        var options = {
            "type": "submitPost",
            "message": this.state.value
        };

        chrome.runtime.sendMessage(options, function(response) {
//            if (response === null) {
//                console.error("Error getting submitting Post");
//            } else {
//                console.log(response);
//            }
        });
    },
    getInitialState: function() {
        return {value: ""};
    },
//    componentDidMount: function() {
//        this.refs.textarea.getDOMNode().focus();
//    },
    handleChange: function(event) {
        console.log('change');
        this.setState({value: event.target.value});
    },
    handleClickSubmit: function(event) {
        if (this.state.value === "") return false;
    },
    render: function() {
        var cx = React.addons.classSet;
        var submitClasses = cx({
            "Form-submitButton": true,
            'is-clickable': this.state.value !== ""
        });
        return (
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
});
