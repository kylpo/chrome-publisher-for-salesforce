/** @jsx React.DOM */

'use strict';

var React = require("react");
var Grid = require("./grid.jsx");
var DAO = require("../js/DAO.js");

var App = React.createClass({
    render: function() {
        return (
            <Grid/>
            );
    }
})



React.renderComponent(<App actions={DAO.getActions}/>, document.body);