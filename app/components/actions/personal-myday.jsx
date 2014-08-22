/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var CompletionTextarea = require("./../inputs/textarea-with-completions.jsx");
var SubmitButton = require("./../inputs/submit-button.jsx");
var cx = React.addons.classSet;

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

        if (!this._hasRequiredFields()) {
            return false;
        }

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
            message = message.concat("\n\n--What I accomplished today--\n" + this.refs.textareaDone.getValue());
        }
//        if (this.state.notDone !== "") {
//            message = message.concat("\n\nNot done:\n" + this.state.notDone);
//        }
        if (this.state.tomorrow !== "") {
            message = message.concat("\n\n--What I hope to do tomorrow--\n" + this.refs.textareaTomorrow.getValue());
        }
        if (this.state.mood !== "") {
            message = message.concat("\n\n--Overall mood for the day--\n" + this.state.mood);
        }

        return "#[MyDay]" + message;
    },

    handleChangeDone: function(event) {
        this.setState({done: this.refs.textareaDone.getValue()});
    },
//    handleChangeNotDone: function(event) {
//        this.setState({notDone: event.target.value});
//    },
    handleChangeTomorrow: function(event) {
        this.setState({tomorrow: this.refs.textareaTomorrow.getValue()});
    },
    handleChangeMood: function(event) {
        this.setState({mood: (this.state.mood === event.target.value ? "" : event.target.value)});
    },
    handleClickSubmit: function() {
        if (this.state.done === "" && this.state.tomorrow === "" && this.state.mood === "") {
            return false;
        }
    },
    _hasRequiredFields: function() {
        return this.state.done !== "" || this.state.tomorrow !== "" || this.state.mood !== "";
    },
    render: function() {
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
            "Form-submitButton": true,
            'is-clickable': this.state.done !== "" || this.state.tomorrow !== "" || this.state.mood !== ""
        });

//        <div className="action-form-group">
//            <label>What did not get done?</label>
//            <CompletionTextarea
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
                    <CompletionTextarea
                    ref="textareaDone"
                    handleChange={this.handleChangeDone}
                    handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="action-form-group">
                    <label>What do you hope to do tomorrow?</label>
                    <CompletionTextarea
                    ref="textareaTomorrow"
                    shouldFocus={false}
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
                <SubmitButton hasRequiredFields={this._hasRequiredFields()} text="Share Post"/>
            </form>
            );
    }
});
