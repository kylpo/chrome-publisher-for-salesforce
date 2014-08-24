/** @jsx React.DOM */

'use strict';

var React = require("react");
var CardFlip = require("./card-flip.jsx");
var TitleBar = require("./title-bar.jsx");
var Grid = require("./grid.jsx");
var BackNav = require("./back-nav.jsx");
var ActionForm = require("./action-form.jsx");
var AuthorizePage = require("./authorize-page.jsx");

module.exports = React.createClass({
    propTypes: {
        context: React.PropTypes.shape({
            action: React.PropTypes.shape({
                label: React.PropTypes.string,
                name: React.PropTypes.string
            }),
            data: React.PropTypes.object
        })
    },
	getInitialState: function() {
		return {
			flipped: false,
			unflipped: false,
			selectedAction: null
		};
	},
    componentWillMount: function() {
        if ( this.props.items && this.props.context ) {
            this.setState({
                selectedAction: this.props.context.action,
                flipped: true
            });
        }
    },
    componentWillReceiveProps: function( nextProps ) {
        if ( nextProps.items && nextProps.context ) {
            this.handleActionSelected(nextProps.context.action, nextProps.context.data);
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
                } else {
                    this.onCloseClicked();
                }
            } else {
                e.preventDefault();
                e.target.blur();
                return false;
            }
        }
    },
	handleActionSelected: function(action, data) {
		this.setState({
			flipped: true,
			unflipped: false,
			selectedAction: action,
            contextData: data
		});
	},
	onBackClicked: function() {
		this.setState({
			flipped: false,
			unflipped: true
		});
		// Create a timeout to remove the selectedAction
		// Required because card flip takes 0.4s to execute
		// but state updates immediately. Therefore UI update is visible.
		setTimeout(function() {
			this.setState({
				selectedAction: null,
                contextData: null
			});

            this.refs.actionForm.resetActionForm();

		}.bind(this), 400);
	},
	onCloseClicked: function() {
	    if ( this.props.onClose ) {
	        this.props.onClose();
	    }

	    setTimeout(function() {
	        this.setState({
	            selectedAction: null,
	            flipped: false,
	            unflipped: false
	        });

	        this.refs.actionForm.resetActionForm();
	    }.bind(this), 400);
	},

    render: function() {
		var backTitle = this.state.selectedAction == null ? "" : this.state.selectedAction.label;
    	var frontface = [
    	    <TitleBar title="Chrome Publisher" onCloseClicked={this.onCloseClicked} />,
    	    <Grid actions={this.props.items} onActionSelected={this.handleActionSelected}/>
    	];
    	var backface = [
    		<BackNav title={backTitle} onBackClicked={this.onBackClicked} />,
    		<ActionForm ref="actionForm" action={this.state.selectedAction} data={this.state.contextData} backToGrid={this.onBackClicked}/>
    	];
		
		var component = <CardFlip frontface={frontface} backface={backface} flipped={this.state.flipped} unflipped={this.state.unflipped}/>;
		if ( this.props.items == null ) {
			component = <AuthorizePage />;
		}
        return (
        	component
        );
    }
});
