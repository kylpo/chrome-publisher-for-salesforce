/** @jsx React.DOM */

'use strict';

var React = require("react");
var App = require("./app.jsx");

module.exports = React.createClass({
	propTypes: {
		open: React.PropTypes.bool.isRequired
	},
    render: function() {
        return (
        	<div className="sidebar" data-open={this.props.open}>
                <div className="inner">
					<App items={this.props.items} prefill={this.props.prefill} onClose={this.props.onClose} />
				</div>
            </div>
        );
    }
});