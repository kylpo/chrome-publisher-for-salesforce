/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	getInitialState: function() {
		return {
		}
	},
    render: function() {
        return (
			<div className="post-text">
				<div className="action-form-group">
					<label>Post Text</label>
					<textarea name="post-text" rows="4" />
				</div>
				<div className="action-form-group">
					<button>Share Link</button>
				</div>
			</div>
        );
    }
});
