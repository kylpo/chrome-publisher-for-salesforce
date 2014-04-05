/** @jsx React.DOM */

//'use strict';

var App = React.createClass({displayName: 'App',
    render: function() {
        return (
            React.DOM.div(null,  " HELLO " )
            );
    }
});

React.renderComponent(App(null), document.body);