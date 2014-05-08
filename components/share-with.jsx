/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			shareWith: "My Followers",
			shareTitle: "Share"
		}
	},
    render: function() {
        return (
			<div className="share-with">
				<div className="action-form-group">
					<label>Share with</label>
					<select>
						<option value="My Followers">My Followers</option>
						<option value="Group">Group</option>
						<option value="Individual">Individual</option>
					</select>
					<button id="share">{ this.props.shareTitle }</button>
				</div>
			</div>
        );
    }
});
