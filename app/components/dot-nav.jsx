/** @jsx React.DOM */

'use strict';

var React = require("react");
var ActionsMenu = require("./actions-menu.jsx");

module.exports = React.createClass({
	propTypes: {
		dots: React.PropTypes.number.isRequired
	},
	getDefaultProps: function() {
		return {
			dots: 0,
			maxDots: 6
		};
	},
	getInitialState: function() {
		return {
			page: 0
		}
	},
	onDotClicked: function(dot) {
		this.setState({ page: dot });
		this.props.onPageSelected(dot);
	},

    render: function() {
    	var pages = Math.min(this.props.dots, this.props.maxDots);
		var dots = [];
		
		for( var i = 0; i < Math.min(this.props.maxDots, this.props.dots); ++i ) {
			dots.push(<li key={"page_" + i} className={ i == this.state.page ? "active" : "" }><a href="#" onClick={this.onDotClicked.bind(this, i)}></a></li>);
		}

        return (
        	<div className="page-nav">
        		<ul>
        			{ dots }
        		</ul>
                <ActionsMenu/>
        	</div>
        );
    }
});
