/** @jsx React.DOM */

'use strict';

var React = require("react"),
    CardFlip = require("./card-flip.jsx"),
    Grid = require("./grid.jsx"),
    BackNav = require("./back-nav.jsx"),
    ActionForm = require("./action-form.jsx");

var App = React.createClass({
	getInitialState: function() {
		return {
			flipped: false,
			unflipped: false,
			selectedAction: null
		}
	},
	handleActionSelected: function(action) {
		console.log("handling action: " + action.label);
		this.setState({
			flipped: true,
			unflipped: false,
			selectedAction: action
		});
	},
	onBackClicked: function() {
		console.log("handling back pressed");
		this.setState({
			flipped: false,
			unflipped: true
		});
		// Create a timeout to remove the selectedAction
		// Required because card flip takes 0.4s to execute
		// but state updates immediately. Therefore UI update is visible.
		setTimeout(function() {
			this.setState({
				selectedAction: null
			});
		}.bind(this), 400);
	},
    render: function() {
		var backTitle = this.state.selectedAction == null ? "" : this.state.selectedAction.label;
    	var frontface = <Grid actions={this.props.items} onActionSelected={this.handleActionSelected}/>;
    	var backface = [
    		<BackNav title={backTitle} onBackClicked={this.onBackClicked} />,
    		<ActionForm action={this.state.selectedAction} />
    	];
        return (
        	<CardFlip frontface={frontface} backface={backface} flipped={this.state.flipped} unflipped={this.state.unflipped} />
        );
    }
});

chrome.runtime.sendMessage({type: "getActions"}, function(response) {
    if (response === null) {
        console.error("Error getting actions to client");
    } else {
        console.log(response);
        React.renderComponent(<App items={response}/>, document.body);
    }
});

