/** @jsx React.DOM */

'use strict';

var App = React.createClass({
    render: function() {
        return (
            <Grid />
            );
    }
});

React.renderComponent(<App />, document.body);