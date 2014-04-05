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
			pageSize: 6
		}
	},
    render: function() {
    	var pageActions = this.props.actions.splice(this.state.page * this.state.pageSize, this.state.pageSize).map(function(action, index) {
            		return <Action title={action.title} icon={action.icon} />
            	}, this);
        return (
            <div className="grid">
            	{ pageActions }
            </div>
            );
    }
});