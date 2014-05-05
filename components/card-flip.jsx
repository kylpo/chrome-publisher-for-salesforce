/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	propTypes: {
		flipped: React.PropTypes.bool.isRequired
	},
	getDefaultProps: function() {
		flipped: false
	},
    render: function() {
        return (
            <div className="card" data-flipped={this.props.flipped}>
            	<div className="frontside">
            		{ this.props.frontface }
            	</div>
            	<div className="backside">
            		{ this.props.backface }
				</div>
            </div>
        );
    }
});