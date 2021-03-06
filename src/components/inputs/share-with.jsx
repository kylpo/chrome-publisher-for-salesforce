/** @jsx React.DOM */

'use strict';

var React = require("react");

module.exports = React.createClass({
	MY_FOLLOWERS: "My Followers",
	LABEL: "To",

    getDefaultProps: function() {
        return {
            minimumInputLength: 1,
            groupOnly: false
        };
    },

    componentDidMount: function() {
        $(this.refs.shareWithWho.getDOMNode()).select2({
            minimumInputLength: this.props.minimumInputLength,
            query: function(options) {
                chrome.runtime.sendMessage({type: "getMentions", query: options.term, groupOnly: this.props.groupOnly}, function(response) {
                    if (response === null) {
                        console.error("Error refreshing actions to client");
                    } else {
                        options.callback({results: response.mentionCompletions});
                    }
                });f
            }.bind(this),
            id: function(object) {
                return object.recordId;
            },
            formatResult: function(object, container, query) {
                return object.name;
            },
            formatSelection: function(object, container) {
                return object.name;
            },
            formatSearching: function() {
                return "Searching...";
            },
            allowClear: true
        });
    },

    getValue: function() {
        return $(this.refs.shareWithWho.getDOMNode()).select2("val");
    },

    render: function() {
        return (
            <div className="action-form-group">
                <label className="share">{this.LABEL}</label>
                <input id="share-with-who" ref="shareWithWho" data-placeholder={this.MY_FOLLOWERS}/>
            </div>
        );
    }
});
