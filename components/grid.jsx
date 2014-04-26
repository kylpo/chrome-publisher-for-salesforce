/** @jsx React.DOM */

'use strict';

var React = require("react");
var Action = require("./action.jsx");

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
	onActionClicked: function(action) {
		console.log("Action selected: " + action.label);
		this.setState({ selectedAction: action });
	},
    render: function() {
    	var startIndex = this.state.page * this.state.pageSize;
    	var endIndex = startIndex + this.state.pageSize;
    	var pageActions = this.props.actions.slice(startIndex, endIndex).map(function pageActions(action, index) {
            		return <Action key={action.name} title={action.label} icon={action.icon} onClick={this.onActionClicked.bind(this, action)} />
            	}, this);
        var classNames = "grid"
        if (this.state.selectedAction != null) { classNames = "grid flipped" };
        return (
            <div className={classNames}>
            	<div className="action-wrapper">
            		{ pageActions }
            		<div className="clearfix" />
            	</div>
            	<div className="backside"><span /></div>
            </div>
            );
    }
});