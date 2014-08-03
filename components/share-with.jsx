/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	MY_FOLLOWERS: "My Followers",
	GROUP: "Group",
	INDIVIDUAL: "Individual",
	getInitialState: function() {
		return {
			shareWith: this.MY_FOLLOWERS,
			shareTitle: "Share"
		}
	},
	getPlaceholderFor: function(shareWithWho) {
		switch(shareWithWho) {
		case this.GROUP:
			return "Search for group";
		case this.INDIVIDUAL:
			return "Search for individual";
		}
		
		return "";
	},
	onShareWithChange: function(event) {
		this.setState({
			shareWith: event.target.value
		});
	},
    render: function() {
		var disableShareEntity = this.state.shareWith === this.MY_FOLLOWERS;
		var placeholder = this.getPlaceholderFor(this.state.shareWith);
        return (
			<div className="sfqa-share-with">
				<div className="action-form-group">
					<div className="share-with-group">
						<label className="sfqa-share">Share with</label>
						<select id="share-with-who" onChange={ this.onShareWithChange }>
							<option value={ this.MY_FOLLOWERS }>{ this.MY_FOLLOWERS }</option>
							<option value={ this.GROUP }>{ this.GROUP }</option>
							<option value={ this.INDIVIDUAL }>{ this.INDIVIDUAL }</option>
						</select>
					</div>
					<div className="share-with-group">
						<input type="text" name="share-with-entity" disabled={ disableShareEntity } placeholder={ placeholder } />
						<button id="share">{ this.props.shareTitle }</button>
					</div>
				</div>
			</div>
        );
    }
});
