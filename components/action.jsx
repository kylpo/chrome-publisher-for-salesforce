/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	propTypes: {
//		title: React.PropTypes.string.isRequired,
//		icon: React.PropTypes.string.isRequired,
//		iconColor: React.PropTypes.string.isRequired
	},
//    getDefaultProps: function() {
//        return {
//            defaultIcon: "icons/default_120.png",
//            defaultIconColor: "#849cb1"
//        };
//    },
    render: function() {
        var iconObj = null;
        var iconColorObj = null;

        if (this.props.action.icons) {
            iconObj = this.props.action.icons.filter(function (icon) {
                return icon.height === 120;
            })[0];
        }

        if (this.props.action.colors) {
            iconColorObj = this.props.action.colors.filter(function (color) {
                return color.theme === "theme4";
            })[0];
        }



        var inlineStyle = {
            "background-color": "#".concat(iconColorObj ? iconColorObj.color : "849cb1")
        };

        return (
        	<div className="action" onClick={this.props.onClick}>
                <img className="icon" src={iconObj ? iconObj.url : "icons/default_120.png"} style={inlineStyle} />
                <div className="title">{this.props.action.label}</div>
            </div>
            );
    }
});