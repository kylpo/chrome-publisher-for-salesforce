/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            "rows": "8",
            "placeholder": "",
            "shouldFocus": true
        }
    },
    getInitialState: function() {
        return {
            "showCompletions": false,
            "completionValues": null
        }
    },
    componentDidMount: function() {
        if (this.props.shouldFocus) {
            this.refs.textarea.getDOMNode().focus();
        }

        $(this.refs.textarea.getDOMNode()).atwho({
            at: "@",
            callbacks: {
                remote_filter: function(query, callback) {
                    if (query === "") {
                        return callback(null);
                    }

                    chrome.runtime.sendMessage({type: "getMentions", query: query}, function(response) {
                        if (response === null) {
                            console.error("Error refreshing actions to client");
                        } else {
                            callback(response.mentionCompletions);
                        }
                    });
                },

                matcher: sharedMatcher,
                tpl_eval: function(tpl, map) {
                    var dataValue = map['atwho-at'] + '[' + map['name'] + ']';
                    var displayValue = map['name'] + (map['description'] === null ? '' : '<small>- ' + map['description'] + '</small>');

                    return "<li data-value='" + dataValue + "'>" + displayValue + "</li>";
                }
            }
        }).atwho({
            at: "#",
            callbacks: {
                remote_filter: function(query, callback) {
                    if (query === "") {
                        return callback(null);
                    }

//                    console.log(query);

                    chrome.runtime.sendMessage({type: "getTopics", query: query}, function(response) {
                        if (response === null) {
                            console.error("Topics response was null");
                        } else if (response.topics.length > 0) {
                            var exactMatch = response.topics.filter(function (topic) {
                                return query === topic.name;
                            });

                            if (exactMatch.length > 0) {
                                callback(response.topics);
                            } else {
                                callback(response.topics.concat({name: query, talkingAbout: null}));
                            }
                        } else {
                            callback([{name: query, talkingAbout: null}]);
                        }
                    });
                },

                matcher: sharedMatcher,
                tpl_eval: function(tpl, map) {
                    var dataValue = map['atwho-at'] + '[' + map['name'] + ']';
                    var displayValue = map['name'] + (map['talkingAbout'] === null ?
                        '<small>- Press ENTER to add</small>' :
                        '<small>- ' + map['talkingAbout'] + ' talking about</small>');

                    return "<li data-value='" + dataValue + "'>" + displayValue + "</li>";
                }
            }
        });

        /*
         Default implementation, but added Space (\\s) to matching regex for full names
         */
        function sharedMatcher(flag, subtext, should_start_with_space) {
            // escape RegExp
            flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            if (should_start_with_space) flag = '(?:^|\\s)' + flag;
            // no space as first char, then space allowed after
            var regexp = new RegExp(flag+'([A-Za-z0-9_\+\-][A-Za-z0-9_\+\-\\s]*)$|'+flag+'([^\\x00-\\xff]*)$','gi');
            var match = regexp.exec(subtext);

//            console.log(match);
            if (match) {
                return match[2] || match[1];
            } else {
                return null;
            }
        }
    },
    handleKeyDown: function(e) {
        // Shift + Enter
        if (e.keyCode === 13 && e.shiftKey) {
            // Stop enter from a creating a new line
            e.preventDefault();
            this.props.handleSubmit(e);
            return false;
        }
    },
    getValue: function() {
      return this.refs.textarea.getDOMNode().value;
    },

    render: function() {
        return (
            <textarea
            onChange={this.props.handleChange}
            ref="textarea"
            autosize
            placeholder={this.props.placeholder}
            rows={this.props.rows}
            onKeyDown={this.handleKeyDown}
            />
        );
    }
});
