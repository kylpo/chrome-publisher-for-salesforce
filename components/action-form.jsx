/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
    render: function() {	
        return (
        	<div className="action-form">
				<div className="action-form-group">
					<label>Link Url</label>
					<input type="text" name="link-url" />
				</div>
				<div className="action-form-group">
					<label>Link Name</label>
					<input type="text" name="link-name" />
				</div>
				<div className="action-form-group">
					<label>Link Description</label>
					<input type="text" name="link-description" />
				</div>
        	</div>
        );
    }
});
