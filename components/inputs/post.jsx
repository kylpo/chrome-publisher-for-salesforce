/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            "rows": "8"
        }
    },
//    getInitialState: function() {
//        return {value: ""};
//    },
//////    componentDidMount: function() {
//////        this.refs.textarea.getDOMNode().focus();
//////    },
//    handleChange: function(event) {
//        console.log('change');
//        this.setState({value: event.target.value});
//    },
    handleKeyDown: function(e) {
        // Shift + Enter
        if (e.keyCode === 13 && e.shiftKey) {
            // Stop enter from a creating a new line
            e.preventDefault();
            this.props.handleSubmit();
            return false;
        }
    },

    render: function() {
        return (
            <textarea
            onChange={this.props.handleChange}
            ref="textarea"
            autosize
            rows={this.props.rows}
            onKeyDown={this.handleKeyDown}
            />
        );
    }
});
