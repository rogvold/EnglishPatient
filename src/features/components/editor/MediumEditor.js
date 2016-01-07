/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Editor = require('react-medium-editor');


var MediumEditor = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            text: 'no text'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    handleChange: function(text, medium){
        console.log(text);
        this.setState({
            text: text
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div className="app">
                    <h1>react-medium-editor</h1>
                    <h3>Html content</h3>
                    <div>{this.state.text}</div>

                    <h3>Editor #1 (&lt;pre&gt; tag)</h3>
                    <Editor
                        tag="pre"
                        text={this.state.text}
                        onChange={this.handleChange}
                        options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
                        />
                    <h3>Editor #2</h3>
                    <Editor
                        text={this.state.text}
                        onChange={this.handleChange}
                        />
                </div>

            </div>
        );
    }

});

module.exports = MediumEditor;