/** @jsx React.DOM */

'use strict';

var React = require("react");
var Action = require("./action.jsx");
var DotNav = require("./dot-nav.jsx");

module.exports = React.createClass({
	propTypes: {
		actions: React.PropTypes.array
	},
	getDefaultProps: function() {
		return {
			actions: []
		};
	},
	getInitialState: function() {
		return {
			page: 0,
			pageSize: 6,
			selectedAction: null
		}
	},
	getPageCount: function() {
		return Math.ceil(this.props.actions.length / this.state.pageSize);
	},
	onActionClicked: function(action) {
		console.log("Action selected: " + action.label);
		this.setState({ selectedAction: action });
	},
	onPageChanged: function(page) {
		console.log("Page changed to: " + page);
		this.setState({ page: page });
	},
    render: function() {
		var dotsNeeded = Math.ceil(this.props.actions.length / this.state.pageSize);
    	var startIndex = this.state.page * this.state.pageSize;
    	var endIndex = startIndex + this.state.pageSize;
    	var pageActions = this.props.actions.slice(startIndex, endIndex).map(function(action, index) {
            		return <Action key={action.name} title={action.label} icon={action.icon} iconColor={action.iconColor} onClick={this.onActionClicked.bind(this, action)} />
            	}, this);
        var classNames = "grid"
        if (this.state.selectedAction != null) { classNames = "grid flipped" };
        return (
            <div className={classNames}>
            	<div className="action-wrapper">
					<div className="actions">
						{ pageActions }
						<div className="clearfix" />
					</div>
            		<DotNav dots={ dotsNeeded } onPageSelected={this.onPageChanged} />
            	</div>
            	<div className="backside"><span /></div>
            </div>
            );
    }
});