/** @jsx React.DOM */

'use strict';

var React = require("react");
var Action = require("./action.jsx");
var DotNav = require("./dot-nav.jsx");
var BackNav = require("./back-nav.jsx");
var ActionForm = require("./action-form.jsx");

module.exports = React.createClass({
	FLIPPED: "flipped",
	FLAPPED: "flapped",
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
			rotateClass: null,
			selectedAction: null
		}
	},
	getPageCount: function() {
		return Math.ceil(this.props.actions.length / this.state.pageSize);
	},
	onActionClicked: function(action) {
		console.log("Action selected: " + action.label);
		this.setState({
			selectedAction: action,
			rotateClass: this.FLIPPED
		});
	},
	onPageChanged: function(page) {
		console.log("Page changed to: " + page);
		this.setState({ page: page });
	},
	onBackClicked: function() {
		this.setState({
			selectedAction: null,
			rotateClass: this.FLAPPED
		});
	},
    render: function() {
		var dotsNeeded = Math.ceil(this.props.actions.length / this.state.pageSize);
    	var startIndex = this.state.page * this.state.pageSize;
    	var endIndex = startIndex + this.state.pageSize;
    	var pageActions = this.props.actions.slice(startIndex, endIndex).map(function(action, index) {
            		return <Action key={action.name} title={action.label} icon={action.icon} onClick={this.onActionClicked.bind(this, action)} />
            	}, this);
        var classNames = "grid";
		if (this.state.rotateClass != null) {
			classNames += (" " + this.state.rotateClass);
		}
		var title = "Back";
		if( this.state.selectedAction != null ) {
			title = this.state.selectedAction.label;
		}
        return (
            <div className={classNames}>
            	<div className="action-wrapper">
					<div className="actions">
						{ pageActions }
						<div className="clearfix" />
					</div>
            		<DotNav dots={ dotsNeeded } onPageSelected={this.onPageChanged} />
            	</div>
            	<div className="backside">
					<BackNav title={title} onBackClicked={this.onBackClicked} />
					<ActionForm action={this.state.selectedAction} />
				</div>
            </div>
            );
    }
});