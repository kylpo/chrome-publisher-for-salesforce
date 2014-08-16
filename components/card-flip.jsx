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
            <div className="sfqa-card" data-flipped={this.props.flipped} data-unflipped={this.props.unflipped} onKeyDown={this.handleEscapeKey}>
            	<div className="frontface">
            		{ this.props.frontface }
            	</div>
            	<div className="backface">
            		{ this.props.backface }
				</div>
            </div>
        );
    }
});