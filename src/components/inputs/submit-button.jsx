/** @jsx React.DOM */

'use strict';

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            hasRequiredFields: false,
            text: "Share"
        };
    },

    render: function() {
        var submitClasses = cx({
            "Form-submitButton": true,
            "skin-Button": true,
            "is-active": true,
            'is-clickable': this.props.hasRequiredFields
        });

        return (
            <button className={submitClasses} type="submit">{this.props.text}</button>
            );
    }
});