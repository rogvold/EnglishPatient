/**
 * Created by sabir on 16.09.15.
 */
//var React = require('react/addons'); // it works with that
var React = require('react');

var Speech = require('react-speech');
var SpeechRecognitionArea = require('../components/recognition/SpeechRecognitionArea');

var SpeechApp = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },
        speechBlock: {
            width: 500,
            margin: '0 auto',
            marginTop: 50
        }
    },

    render: function () {
        return (
            <div style={this.componentStyle.placeholder}>

                    <div style={this.componentStyle.speechBlock}>
                        <SpeechRecognitionArea />
                    </div>

            </div>
        );
    }

});


React.render(
    <SpeechApp />,
    document.getElementById('main')
);