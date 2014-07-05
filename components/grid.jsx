/** @jsx React.DOM */

'use strict';

var React = require("react");
var Toolbar = require("./toolbar.jsx");
var Action = require("./action.jsx");
var DotNav = require("./dot-nav.jsx");


module.exports = React.createClass({
	propTypes: {
		actions: React.PropTypes.array
	},
	getDefaultProps: function() {
		return {
			actions: [],
			pageSize: 6,
			onActionSelected: function(action) {
				console.log("Action selected but no listener provided");
			}
		};
	},
	getInitialState: function() {
		return {
			page: 0
		}
	},
	getPageCount: function() {
		return Math.ceil(this.props.actions.length / this.state.pageSize);
	},
	onActionClicked: function(action) {
		console.log("Action selected: " + action.label);
		this.props.onActionSelected(action);
	},
	onPageChanged: function(page) {
		console.log("Page changed to: " + page);
		this.setState({ page: page });
	},
    render: function() {
		var dotsNeeded = Math.ceil(this.props.actions.length / this.props.pageSize);
    	var startIndex = this.state.page * this.props.pageSize;
    	var endIndex = startIndex + this.props.pageSize;
    	var pageActions = this.props.actions.slice(startIndex, endIndex).map(function pageActions(action) {
    		return <Action key={action.name} action={action} onClick={this.onActionClicked.bind(this, action)} />
        }, this);

//        <Toolbar />
        return (
            <div className="grid">
            	<div className="action-wrapper">
					<div className="actions">
						{ pageActions }
						<div className="clearfix" />
					</div>
                    <DotNav dots={ dotsNeeded } onPageSelected={this.onPageChanged} />
            	</div>
            </div>
        );
    }
});