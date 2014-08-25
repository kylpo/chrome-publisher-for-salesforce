/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("../inputs/textarea-with-completions.jsx");
var ShareWith = require("../inputs/share-with.jsx");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            message: '',
            file: null
        }
    },
    handleFileChange: function(event) {
        console.log("File changed: ", event.target.files[0]);
        this.setState({file: event.target.files[0]});
    },
    handleMessageChange: function(event) {
        this.setState({message: event.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onLoading();

        var message = this.state.message;
        var onAfterSubmit = this.props.onAfterSubmit;
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log(reader.result);
            var options = {
                "type": "postFile",
                "message": message,
                "file": reader.result
            };

            chrome.runtime.sendMessage(options, function(response) {
                onAfterSubmit(response);
            });
        };

        reader.readAsBinaryString(this.state.file);
        /*
         var options = {
         "type": "postFile",
         "message": this.state.message,
         "file": this.state.file
         };

         chrome.runtime.sendMessage(options, function(response) {
         this.props.onAfterSubmit(response);
         }.bind(this));
         */
    },
    render: function() {
        var cx = React.addons.classSet;
        var submitClasses = cx({
            "Form-submitButton": true,
            'is-clickable': this.state.file
        });

        return (
            <form className="post-link" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Upload a File</label>
                    <input type="file" required name="file" onChange={this.handleFileChange}/>
                </div>
                <div className="action-form-group">
                    <label>File Description</label>
                    <PostInput
                    value={this.state.message}
                    handleChange={this.handleMessageChange}
                    handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="action-form-group">
                    <button className={submitClasses} type="submit">Share File</button>
                </div>
            </form>
            );
    }
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
//    getInitialState: function() {
//        return {value: ""};
//    },
//    componentDidMount: function() {
//        this.refs.textarea.getDOMNode().focus();
//    },
//    handleChange: function(event) {
//        this.setState({value: event.target.value});
//    },
//    handleClickSubmit: function() {
//        if (this.state.value === "") return false;
//    },
//    render: function() {
////        var cx = React.addons.classSet;
////        var submitClasses = cx({
////            "Form-submitButton": true
////            'is-clickable': this.state.value !== ""
////        });
//
//        return (
//            <form className="post-text" onSubmit={this.handleSubmit}>
//                <div className="action-form-group">
//                    <label>Post Text</label>
//                    <input type="file" onChange={null}/>
//                </div>
//            </form>
//            );
//    }
});
