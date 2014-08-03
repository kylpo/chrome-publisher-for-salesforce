/** @jsx React.DOM */

'use strict';

var React = require("react");
var ActionsMenu = require("./actions-menu.jsx");

module.exports = React.createClass({
    render: function() {
        return (
            <div className="sfqa-Toolbar">
                <ActionsMenu/>
            </div>
            );
    }
});
