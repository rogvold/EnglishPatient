/**
 * Created by sabir on 24.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireMixin = require('../../../../../mixins/QuestionnaireMixin');

var TestPanel = require('./TestPanel');

var SelfLoadingTestPanel = React.createClass({
    getDefaultProps: function () {
        return {
            questionId: undefined,
            userId: undefined,

            onAnswer: function(a){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            question: undefined,
            answer: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var questionId = nextProps.questionId;
        this.load(questionId);
    },

    componentDidMount: function () {
        var questionId = this.props.questionId;
        this.load(questionId);
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            width: 620,
            margin: '0 auto'
        },

        content: {

        }
    },

    load: function(questionId){
        var userId = this.props.userId;
        if (questionId == undefined || userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        QuestionnaireMixin.loadQuestionnaireQuestion(questionId, function(question){
            QuestionnaireMixin.loadTransformedUserAnswer(userId, questionId, function(answer){
                self.setState({
                    question: question,
                    answer: answer,
                    loading: false
                });
            })
        })

    },

    onAnswer: function(url){
        var userId = this.props.userId;
        var questionId = this.props.questionId;
        var answer = this.state.answer;
        if (answer == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        QuestionnaireMixin.saveUserAnswer(userId, questionId, answer.variant, url, function(a){
            this.setState({
                loading: false,
                answer: a
            });
            this.props.onAnswer(a);
        }.bind(this))
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.content}>

                    <TestPanel question={this.state.question} answer={this.state.answer} onAnswer={this.onAnswer} />

                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingTestPanel;