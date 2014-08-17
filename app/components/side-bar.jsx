/** @jsx React.DOM */

'use strict';

var React = require("react");
var App = require("./app.jsx");

module.exports = React.createClass({
	propTypes: {
		open: React.PropTypes.bool.isRequired
	},
    render: function() {
        var closeStyle = {
            position: 'absolute',
            top: '5px',
            right: '5px'
        };

        return (
        	<div className="sidebar" data-open={this.props.open}>
                <div className="inner">
                    <div className="icon icon-utility-back" style={ closeStyle }></div>
					<App items={this.props.items} prefill={this.props.prefill} />
				</div>
            </div>
        );
    }
});