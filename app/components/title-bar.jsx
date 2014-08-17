/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
    render: function () {
        return (
            <div className="title-bar">
                <div className="title">
					{ this.props.title }
                </div>
                <div className="icon icon-utility-close" onClick={this.props.onCloseClicked}></div>
            </div>
        );
    }
});
