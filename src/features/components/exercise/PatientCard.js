/**
 * Created by sabir on 30.09.15.
 */
var React = require('react');
var assign = require('object-assign');
var PatientTask = require('../task/PatientTask');
var UserExerciseInput = require('./UserExerciseInput');
var ToggledText = require('../text/ToggledText');

var TranslatableText = require('../../components/text/translatable/TranslatableText');

var PatientCard = React.createClass({
    getDefaultProps: function () {
        return {
            exercise: {},
            materials: [],
            answerType: undefined,
            userAnswer: undefined,
            onAnswer: function(type, ans){

            },
            number: undefined,
            comment: undefined,
            hint: undefined,

            transcript: undefined,
            correctAnswer: undefined,

            showAnswerBlock: true,
            teacherMode: false,
            canAnswer: true
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
        taskPlaceholder: {

        },
        inputPlaceholder: {

        },

        transcriptPlaceholder: {
            textAlign: 'center',
            fontSize: '20px',
            marginTop: 20,
            marginBottom: 20,
            lineHeight: '22px'
        },

        customBottomBlock: {

        }
    },

    onAnswer: function(type, ans){
        this.props.onAnswer(type, ans);
    },

    render: function () {
        var showTranscript = (this.props.transcript != undefined);
        if (this.props.answerType == 'typing'){
            showTranscript = false;
        }
        //var showDiff = (this.props.teacherMode == true);
        var showDiff = true;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.taskPlaceholder} >
                    <PatientTask items={this.props.materials} />
                </div>

                {showTranscript == false ? null :
                    <div style={this.componentStyle.transcriptPlaceholder} className={'disable-select'} >

                        <TranslatableText text={this.props.transcript} />

                    </div>
                }

                {this.props.hint == undefined ? null :
                    <div>
                        <ToggledText text={this.props.hint} showText={'показать подсказку'} hideText={'скрыть подсказку'} />
                    </div>
                }

                {this.props.comment == undefined ? null :
                    <div>
                        <ToggledText text={this.props.comment} showText={'показать коментарий'} hideText={'скрыть коментарий'} />
                    </div>
                }

                {this.props.showAnswerBlock ?
                    <div style={this.componentStyle.inputPlaceholder}>
                        <UserExerciseInput canAnswer={this.props.canAnswer} number={this.props.number}
                                           userAnswer={this.props.userAnswer}
                                           type={this.props.answerType}
                                           showDiff={showDiff}

                                           transcript={this.props.transcript}
                                           correctAnswer={this.props.correctAnswer}

                                           onAnswer={this.onAnswer}  />
                    </div>
                    : null
                }

            </div>
        );
    }

});

module.exports = PatientCard;