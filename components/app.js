/** @jsx React.DOM */

//'use strict';

var App = React.createClass({
    render: function() {
        return (
            <div> HELLO </div>
            );
    }
});

React.renderComponent(<App/>, document.body);