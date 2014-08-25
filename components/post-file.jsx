/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./inputs/post.jsx");
var ShareWith = require("./share-with.jsx");

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
        
        var reader = new FileReader();
        reader.onload = (function(msg) {
        	return function(e) {
        		var options = {
        			"type": "postFile",
        			"message": msg,
        			"file": e.target.result
        		};
        		
        		chrome.runtime.sendMessage(options, function(response) {
		            this.props.onAfterSubmit(response);
		        }.bind(this));
        	};
        })(this.state.message);
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
});
