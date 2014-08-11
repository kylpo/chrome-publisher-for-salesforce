/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./../inputs/post.jsx");
var ShareWith = require("./../inputs/share-with.jsx");
var cx = React.addons.classSet;

module.exports = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onLoading();

        var options = {
            "type": "submitPost",
            "message": this.refs.postInput.getValue(),
            "to": this.refs.shareWith.getVal()
        };

        chrome.runtime.sendMessage(options, function(response) {
            if (response === null) {
                console.error("Error getting submitting Post");
            } else {
                this.props.onAfterSubmit(response);
            }
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
        var submitClasses = cx({
            "Form-submitButton": true,
            "skin-Button": true,
            "is-active": true,
            'is-clickable': this.state.value !== ""
        });

        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Post Text</label>
                    <PostInput
                        ref="postInput"
                        rows="20"
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    />
                </div>
                <ShareWith ref="shareWith"/>
                <button className={submitClasses} type="submit" onClick={this.handleClickSubmit}>Share Post</button>
            </form>
        );
    }
});
