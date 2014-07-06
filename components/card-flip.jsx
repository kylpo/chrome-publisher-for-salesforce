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
    handleEscapeKey: function(e) {
        if (e.keyCode === 27) {
            debugger;
            if (this.state.flipped === true) {
                e.preventDefault();
                this.onBackClicked()
                return false;
            }
        }
    },
    render: function() {
        return (
            <div className="card" data-flipped={this.props.flipped} data-unflipped={this.props.unflipped} onKeyDown={this.handleEscapeKey}>
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