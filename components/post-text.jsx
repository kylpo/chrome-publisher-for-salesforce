/** @jsx React.DOM */

'use strict';

var React = require("react");
//var ReactForms = require('react-forms');
//var Schema = ReactForms.schema.Schema;
//var Property = ReactForms.schema.Property;
//var Form = ReactForms.Form;

//var schema = (
//    <Schema>
//        <Property name="firstName" />
//        <Property name="lastName" />
//        <Property name="age" type="number" />
//    </Schema>
//    );

//var schema = (
//    <Schema>
//        <Property
//        name="description"
//        required
//        label="Message"
//        input={<textarea placeholder="Give us details here..." />}
//        />
//        <Property
//        name="email"
//        label="Email"
//        required
//        input={<input type="email" />}
//        validate={function(v) { return /.+\@.+\..+/.test(v) }}
//        />
//    </Schema>
//    )

module.exports = React.createClass({
    getInitialState: function() {
        return {value: ''};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    handleSubmit: function() {
        var options = {
            "type": "submitPost",
            "message": this.state.value
        };

        this.props.port.postMessage(options);
//        chrome.runtime.sendMessage(options, function(response) {
//            if (response === null) {
//                console.error("Error getting submitting Post");
//            } else {
//                console.log(response);
//            }
//        });
    },
    render: function() {
        var value = this.state.value;
//        <Form schema={schema} />
//        <textarea name="post-text" rows="4" />
        return (
            <form className="post-text" onSubmit={this.handleSubmit}>
                <div className="action-form-group">
                    <label>Post Text</label>
                    <input type="textarea" value={value} onChange={this.handleChange} />

                </div>
                <div className="action-form-group">
                    <button type="submit">Share Link</button>
                </div>
            </form>
        );
    }
});
