/** @jsx React.DOM */

'use strict';

var React = require("react");
var Grid = require("./grid.jsx");
var DAO = require("../js/DAO.js");

var App = React.createClass({
	handleActionSelected: function(action) {
		console.log("handling action: " + action.label);
	},
    render: function() {
        return (
            <Grid actions={this.props.items} callback={this.handleActionSelected}/>
            );
    }
})

React.renderComponent(<App items={DAO.getActions()}/>, document.body);
