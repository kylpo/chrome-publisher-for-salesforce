/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
    actionsWithoutDescribableIcon: {
        "Post" : {
            "icon" : "icons/post_120.png",
            "iconColor" : "4eb1cb"
        },
        "Link" : {
            "icon" : "icons/link_120.png",
            "iconColor" : "6078c2"
        },
        "File" : {
            "icon" : "icons/file_120.png",
            "iconColor" : "b19f7e"
        },
        "Poll" : {
            "icon" : "icons/poll_120.png",
            "iconColor" : "5181c4"
        },
        "New Note" : {
            "icon" : "icons/note_120.png",
            "iconColor" : "dcd861"
        }
    },

	propTypes: {
		action: React.PropTypes.object.isRequired
	},

    render: function() {
        var icon = "icons/default_120.png";
        var iconColor = "849cb1";

        if (this.props.action.label in this.actionsWithoutDescribableIcon) {
            icon = this.actionsWithoutDescribableIcon[this.props.action.label].icon;
            iconColor = this.actionsWithoutDescribableIcon[this.props.action.label].iconColor;
        } else {
            if (this.props.action.icons) {
                var iconObj = this.props.action.icons.filter(function (icon) {
                    return icon.height === 120;
                })[0];

                icon = iconObj ? iconObj.url : icon;
            }

            if (this.props.action.colors) {
                var iconColorObj = this.props.action.colors.filter(function (color) {
                    return color.theme === "theme4";
                })[0];

                iconColor = iconColorObj ? iconColorObj.color : iconColor;
            }
        }

        var inlineStyle = {
            "background-color": "#".concat(iconColor)
        };

        return (
        	<div className="action" onClick={this.props.onClick}>
                <img className="icon" src={icon} style={inlineStyle} />
                <div className="title">{this.props.action.label}</div>
            </div>
            );
    }
});