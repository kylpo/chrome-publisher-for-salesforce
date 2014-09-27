/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    handleKeyDown: function(e) {
        // Shift + Enter
        if (e.keyCode === 13 && e.shiftKey) {
            // Stop enter from a creating a new line
            e.preventDefault();
            this.props.handleSubmit(e);
            return false;
        }
        if (e.keyCode === 13) {
            // Stop enter from a creating a new line
            e.preventDefault();
            return false;
        }
    },

    render: function() {
        return (
                <input type="text"
                value={this.props.value}
                onChange={this.props.handleChange}
                onKeyDown={this.handleKeyDown}
                />
            );
    }
});
