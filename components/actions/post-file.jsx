/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
//    handleSubmit: function(e) {
//        e.preventDefault();
//        this.props.onLoading();
//
//        var options = {
//            "type": "submitPost",
//            "message": this.state.value
//        };
//
//        chrome.runtime.sendMessage(options, function(response) {
//            this.props.onAfterSubmit(response);
////            if (response === null) {
////                console.error("Error getting submitting Post");
////            } else {
////            }
//        }.bind(this));
//    },
    getInitialState: function() {
        return {value: ""};
    },
//    componentDidMount: function() {
//        this.refs.textarea.getDOMNode().focus();
//    },
//    handleChange: function(event) {
//        this.setState({value: event.target.value});
//    },
    handleClickSubmit: function() {
        if (this.state.value === "") return false;
    },
    render: function() {
//        var cx = React.addons.classSet;
//        var submitClasses = cx({
//            "sfqa-Form-submitButton": true
//            'is-clickable': this.state.value !== ""
//        });

        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Post Text</label>
                    <input type="file" onChange={null}/>
                </div>
            </form>
            );
    }
});
