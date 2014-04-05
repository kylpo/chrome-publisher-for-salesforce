/** @jsx React.DOM */

'use strict';

var React = require("react");
var Grid = require("./grid.jsx");

var App = React.createClass({
    render: function() {
        return (
            <Grid/>
            );
    }
})

React.renderComponent(<App />, document.body);