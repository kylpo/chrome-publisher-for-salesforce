/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var PostInput = require("./../inputs/post.jsx");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            done: "",
//            notDone: "",
            tomorrow: "",
            mood: ""
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onLoading();

        var options = {
            "type": "submitPost",
            "message": this.getMessage()
        };

        chrome.runtime.sendMessage(options, function(response) {
            this.props.onAfterSubmit(response);
        }.bind(this));
    },
    getMessage: function() {
        var message = "";

        if (this.state.done !== "") {
            message = message.concat("\n\n--What I accomplished today--\n" + this.state.done);
        }
//        if (this.state.notDone !== "") {
//            message = message.concat("\n\nNot done:\n" + this.state.notDone);
//        }
        if (this.state.tomorrow !== "") {
            message = message.concat("\n\n--What I hope to do tomorrow--\n" + this.state.tomorrow);
        }
        if (this.state.mood !== "") {
            message = message.concat("\n\n--Overall mood for the day--\n" + this.state.mood);
        }

        return "#[MyDay]" + message;
    },

//    componentDidMount: function() {
//        this.refs.textarea.getDOMNode().focus();
//    },
    handleChangeDone: function(event) {
        this.setState({done: event.target.value});
    },
//    handleChangeNotDone: function(event) {
//        this.setState({notDone: event.target.value});
//    },
    handleChangeTomorrow: function(event) {
        this.setState({tomorrow: event.target.value});
    },
    handleChangeMood: function(event) {
        this.setState({mood: (this.state.mood === event.target.value ? "" : event.target.value)});
    },
    handleClickSubmit: function() {
        if (this.state.done === "" && this.state.tomorrow === "" && this.state.mood === "") {
            return false;
        }
    },
    render: function() {
        var cx = React.addons.classSet;
        var happyButtonClasses = cx({
            "ButtonGroup-button": true,
            "skin-Button": true,
            'is-active': this.state.mood === ":)"
        });
        var neutralButtonClasses = cx({
            "ButtonGroup-button": true,
            "skin-Button": true,
            'is-active': this.state.mood === ":|"
        });
        var unhappyButtonClasses = cx({
            "ButtonGroup-button": true,
            "skin-Button": true,
            'is-active': this.state.mood === ":("
        });
        var submitClasses = cx({
            "sfqa-Form-submitButton": true,
            'is-clickable': this.state.done !== "" || this.state.tomorrow !== "" || this.state.mood !== ""
        });

//        <div className="action-form-group">
//            <label>What did not get done?</label>
//            <PostInput
//            value={this.state.notDone}
//            rows="4"
//            handleChange={this.handleChangeNotDone}
//            handleSubmit={this.handleSubmit}
//            />
//        </div>
        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>What did you accomplish today?</label>
                    <PostInput
                    value={this.state.done}
                    rows="4"
                    handleChange={this.handleChangeDone}
                    handleSubmit={this.handleSubmit}
                    />
                </div>

                <div className="action-form-group">
                    <label>What do you hope to do tomorrow?</label>
                    <PostInput
                    value={this.state.tomorrow}
                    rows="4"
                    handleChange={this.handleChangeTomorrow}
                    handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="action-form-group">
                    <label>Overall mood for the day</label>
                    <div className="ButtonGroup">
                        <button type="button" className={happyButtonClasses} value=":)" onClick={this.handleChangeMood}>:)</button>
                        <button type="button" className={neutralButtonClasses} value=":|" onClick={this.handleChangeMood}>:|</button>
                        <button type="button" className={unhappyButtonClasses} value=":(" onClick={this.handleChangeMood}>:(</button>
                    </div>
                </div>
                <div className="action-form-group">
                    <button className={submitClasses} type="submit" onClick={this.handleClickSubmit}>Submit Post</button>
                </div>
            </form>
            );
    }
});
