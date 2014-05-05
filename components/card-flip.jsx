/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	getDefaultProps: function() {
		return {
			flipped: false,
			unflipped: false
		}
	},
    render: function() {
        return (
            <div className="card" data-flipped={this.props.flipped} data-unflipped={this.props.unflipped}>
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