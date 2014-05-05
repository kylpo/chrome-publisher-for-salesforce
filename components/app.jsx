/** @jsx React.DOM */

'use strict';

var React = require("react");
var CardFlip = require("./card-flip.jsx");
var Grid = require("./grid.jsx");
var BackNav = require("./back-nav.jsx");
var ActionForm = require("./action-form.jsx");
var DAO = require("../js/DAO.js");

var App = React.createClass({
	getInitialState: function() {
		return {
			flipped: false
		}
	},
	handleActionSelected: function(action) {
		console.log("handling action: " + action.label);
		this.setState({
			flipped: true
		});
	},
	onBackClicked: function() {
		console.log("handling back pressed");
		this.setState({
			flipped: false
		});
	},
    render: function() {
    	var frontface = <Grid actions={this.props.items} onActionSelected={this.handleActionSelected}/>;
    	var backface = [
    		<BackNav title={"Back"} onBackClicked={this.onBackClicked} />,
    		<ActionForm />
    	];
        return (
        	<CardFlip frontface={frontface} backface={backface} flipped={this.state.flipped} />
        );
    }
})

React.renderComponent(<App items={DAO.getActions()}/>, document.body);
