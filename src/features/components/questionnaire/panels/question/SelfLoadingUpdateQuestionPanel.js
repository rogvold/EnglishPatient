/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireQuestionPanel = require('./QuestionnaireQuestionPanel');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var SelfLoadingUpdateQuestionPanel = React.createClass({
    getDefaultProps: function () {
        return {
            questionnaireId: undefined,
            number: undefined,
            canDelete: false,

            onUpdated: function(updatedQuestion){

            },

            onDeleted: function(number) {

            }

        }
    },

    getInitialState: function () {
        return {
            question: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.load(nextProps.questionnaireId, nextProps.number);
    },

    componentDidMount: function () {
        this.load(this.props.questionnaireId, this.props.number);
    },

    componentStyle: {
        placeholder: {

        }
    },

    load: function(qId, number){
        var questionnaireId = qId;
        var number = number;
        if (questionnaireId == undefined || number == undefined){
            return;
        }
        this.setState({
            loading: true,
            question: {}
        });
        QuestionnaireMixin.loadTransformedQuestionByQuestionnaireIdAndNumber(questionnaireId, number, function(question){
            this.setState({
                loading: false,
                question: question
            });
        }.bind(this));
    },

    onChange: function(data){
        this.setState({
            question: data
        });
    },

    onSave: function(data){
        this.onUpdate(data);
    },

    onUpdate: function(data){
        console.log('SelfLoadingUpdateQuestionPanel: onUpdate: data = ', data);
        this.setState({
            loading: true
        });
        var q = data;
        QuestionnaireMixin.updateQuestionnaireQuestion(this.props.questionnaireId, this.props.number, q.name,
                                                       q.vimeoId, q.question, q.ruQuestion, q.answers, function(uQ){
                this.setState({
                    question: uQ,
                    loading: false
                });
                this.props.onUpdated(uQ);
            }.bind(this))
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        var question = this.state.question;
        QuestionnaireMixin.deleteQuestionnaireQuestion(question.id, function(){
            this.setState({
                loading: false
            });
            this.props.onDeleted(this.props.number);
        }.bind(this))
    },




    render: function () {
        var question = this.state.question;
        var answers = (question.answers == undefined) ? [] : question.answers;

        return (
            <div style={this.componentStyle.placeholder}>

                <QuestionnaireQuestionPanel canDelete={this.props.canDelete}
                    question={question.question} ruQuestion={question.ruQuestion}
                    vimeoId={question.vimeoId} name={question.name} onSave={this.onSave} onDelete={this.onDelete}
                    number={this.props.number} answers={answers} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdateQuestionPanel;