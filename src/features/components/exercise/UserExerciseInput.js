/**
 * Created by sabir on 30.09.15.
 */
var React = require('react');

var PatientRecordComponent = require('../record/PatientRecordComponent');
var PatientExerciseInput = require('../input/PatientExerciseInput');
var SpeechRecognitionArea = require('../recognition/SpeechRecognitionArea');

var RightTextAnswerDiff = require('./diff/RightTextAnswerDiff');

var UserExerciseInput = React.createClass({
    getDefaultProps: function () {
        return {
            type: 'speaking',
            onAnswer: function(type, ans){
                console.log('onAnswer occured', type, ans);
            },

            transcript: undefined,
            correctAnswer: undefined,

            userAnswer: undefined,
            number: undefined,
            canAnswer: true,
            showDiff: false
        }
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

        diffPlaceholder: {
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid #EFF0F1'
        }
    },

    onRecordingSave: function(url){
        if (this.props.canAnswer == false){
            return;
        }
        this.props.onAnswer('url', url);
    },

    onRecognitionAnswer: function(text){
        if (this.props.canAnswer == false){
            return;
        }
        this.props.onAnswer('text', text);
    },

    onInputAnswer: function(text){
        if (this.props.canAnswer == false){
            return;
        }
        this.props.onAnswer('text', text);
    },

    render: function () {
        var ans = undefined;
        var uA = this.props.userAnswer;
        if (uA != undefined){
            if (uA.text != undefined){
                ans = uA.text;
            }else{
                if (uA.url != undefined){
                    ans = uA.url;
                }
            }
        }

        var inputIsDisabled = (ans != undefined);
        console.log('rendering UserExerciseInput: ans = ', ans);

        return (
            <div style={this.componentStyle.placeholder}>
                {this.props.type == 'speaking' ?
                    <PatientRecordComponent number={this.props.number}
                                            userAnswer={ans} onSave={this.onRecordingSave} />
                    : null
                }

                {this.props.type == 'typing' ?
                    <div>
                        <PatientExerciseInput  number={this.props.number}
                                           disabled={inputIsDisabled}
                                           userAnswer={ans} onSubmit={this.onInputAnswer} />

                        {( ( (ans == undefined) || (this.props.correctAnswer == undefined)) || (this.props.showDiff == false) )  ? null :
                            <div style={this.componentStyle.diffPlaceholder}>
                                <RightTextAnswerDiff userAnswer={ans} correctAnswer={this.props.correctAnswer} />
                            </div>
                        }

                    </div>
                    : null
                }

                {this.props.type == 'recognition' ?
                    <SpeechRecognitionArea  number={this.props.number}  userAnswer={ans} onSubmit={this.onRecognitionAnswer} />
                    : null
                }

            </div>
        );
    }

});

module.exports = UserExerciseInput;