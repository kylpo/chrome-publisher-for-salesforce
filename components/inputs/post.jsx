/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            "rows": "8"
        }
    },
//////    componentDidMount: function() {
//////        this.refs.textarea.getDOMNode().focus();
//////    },
    handleKeyDown: function(e) {
        // Shift + Enter
        if (e.keyCode === 13 && e.shiftKey) {
            this.props.handleSubmit(e);
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
