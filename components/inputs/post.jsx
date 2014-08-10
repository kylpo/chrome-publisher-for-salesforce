/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            "rows": "8"
        }
    },
    componentDidMount: function() {
		console.log("Component mounted");
        this.refs.postField.getDOMNode().focus();
    },
    handleKeyDown: function(e) {
        // Shift + Enter
        if (e.keyCode === 13 && e.shiftKey) {
            // Stop enter from a creating a new line
            e.preventDefault();
            this.props.handleSubmit(e);
            return false;
        }
    },

    render: function() {
        return (
            <textarea
            onChange={this.props.handleChange}
            ref="postField"
            autosize
            rows={this.props.rows}
            onKeyDown={this.handleKeyDown}
            />
        );
    }
});
