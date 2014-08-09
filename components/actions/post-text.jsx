/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./../inputs/post.jsx");

module.exports = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onLoading();

        var options = {
            "type": "submitPost",
            "message": this.refs.postInput.getValue()
//            "message": this.state.value
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
        return {value: ""};
    },
    handleChange: function() {
        this.setState({value: this.refs.postInput.getValue()});
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

        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Post Text</label>
                    <PostInput
                        ref="postInput"
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
