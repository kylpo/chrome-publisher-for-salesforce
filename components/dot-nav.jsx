/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	propTypes: {
		dots: React.PropTypes.number.isRequired
	},
	getDefaultProps: function() {
		return {
			dots: 4,
			maxDots: 6
		};
	},
	getInitialState: function() {
		return {
			page: 0
		}
	},
    render: function() {
    	var pages = Math.min(this.props.dots, this.props.maxDots);
		var dots = [];
		
		for( var i = 0; i < this.props.dots; ++i ) {
			dots.push(<li className={ i == this.state.page ? "active" : "" }><a href="#"></a></li>);
		}
		
        return (
        	<div className="page-nav">
        		<ul>
        			{ dots }
        		</ul>
        	</div>
        );
    }
});
