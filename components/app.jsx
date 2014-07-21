/** @jsx React.DOM */

'use strict';

var React = require("react");
var CardFlip = require("./card-flip.jsx");
var Grid = require("./grid.jsx");
var BackNav = require("./back-nav.jsx");
var ActionForm = require("./action-form.jsx");
var AuthorizePage = require("./authorize-page.jsx");

var App = React.createClass({
	getInitialState: function() {
		return {
			flipped: false,
			unflipped: false,
			selectedAction: null
		}
	},
    componentDidMount: function() {
        document.addEventListener('keydown', this.handleEscapeKey, true);
    },
    componentWillUnmount: function() {
        document.removeEventListener('keydown', this.handleEscapeKey, true);
    },
    handleEscapeKey: function(e) {
        if (e.keyCode === 27) {
            if (e.target.nodeName === "BODY") {
                if (this.state.flipped === true) {
                    e.preventDefault();
                    this.onBackClicked();
                    return false;
                }
            } else {
                e.preventDefault();
                e.target.blur();
                return false;
            }
        }
    },
	handleActionSelected: function(action) {
		this.setState({
			flipped: true,
			unflipped: false,
			selectedAction: action
		});
	},
	onBackClicked: function(callback) {
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

            if (callback) {
                callback();
            }
		}.bind(this), 400);
	},

    render: function() {
		var backTitle = this.state.selectedAction == null ? "" : this.state.selectedAction.label;
    	var frontface = <Grid actions={this.props.items} onActionSelected={this.handleActionSelected}/>;
    	var backface = [
    		<BackNav title={backTitle} onBackClicked={this.onBackClicked} />,
    		<ActionForm action={this.state.selectedAction} backToGrid={this.onBackClicked}/>
    	];
        return (
        	<CardFlip frontface={frontface} backface={backface} flipped={this.state.flipped} unflipped={this.state.unflipped}/>
        );
    }
});

chrome.runtime.sendMessage({type: "getActions"}, function(response) {
    if (response === null) {
        React.renderComponent(<AuthorizePage/>, document.body);
//        console.error("Error getting actions to client");
    } else {
        console.log(response);
        React.renderComponent(<App items={response}/>, document.body);
    }
});

