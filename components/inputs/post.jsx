/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            "rows": "8"
        }
    },
    getInitialState: function() {
        return {
            "showCompletions": false,
            "completionValues": null
        }
    },
//    componentDidMount: function() {
//        this.refs.textarea.getDOMNode().focus();
//    },
    handleKeyDown: function(e) {
        // Shift + Enter
        if (e.keyCode === 13 && e.shiftKey) {
            // Stop enter from a creating a new line
            e.preventDefault();
            this.props.handleSubmit(e);
            return false;
        }
        // @
        else if (e.keyCode === 16 && e.shiftKey) {

            return false;
        }
    },

    render: function() {
        var completions = null;

        if (this.state.showCompletions) {
            completions = <completions values={this.state.completionValues}/>;
        }

        return (
            <div>
                <textarea
                onChange={this.props.handleChange}
                ref="textarea"
                autosize
                rows={this.props.rows}
                onKeyDown={this.handleKeyDown}
                />
                {completions}
            </div>
        );
    }
});
