/** @jsx React.DOM */

'use strict';

var React = require("react");
var Grid = require("./grid.jsx");

var App = React.createClass({
	getDefaultProps: function() {
		return {
			items: [{
				title : "Action 1",
				icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png"
			}, {
				title : "Action 2",
				icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Baidu-icon.png"
			}, {
				title : "Action 3",
				icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Dzone-icon.png"
			}, {
				title : "Action 4",
				icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Formspring-icon.png"
			}, {
				title : "Action 5",
				icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Foursquare-icon.png"
			}, {
				title : "Action 6",
				icon : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Evernote-icon.png"
			}]
		};
	},
    render: function() {
        return (
            <Grid actions={this.props.items}/>
            );
    }
})

React.renderComponent(<App />, document.body);