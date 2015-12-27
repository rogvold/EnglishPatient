/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var NumbersBlock = require('../../../numbers/NumbersBlock');



var QuestionnaireSinglePanel = require('./QuestionnaireSinglePanel');

var QuestionnairePanel = React.createClass({
    getDefaultProps: function () {
        return {
            questionnaire: {},
            questions: [],
            answersMap: {},
            userId: undefined,

            onAnswerSelect: function(questionId, answerNumber){

            },

            onForward: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            selectedNumber: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {
        //this.setState({
        //    //selectedNumber: nextProps.selectedNumber
        //});
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            width: 620,
            margin: '0 auto',
            padding: 5
        },

        numbersPlaceholder: {
        },

        content: {
            borderTop: '1px dotted #EFF0F1',
            paddingTop: 2,
            marginTop: 5
        },

        forwardPlaceholder: {
            padding: 5,
            textAlign: 'center'
        },

        task: {
            padding: 10,
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.870588)'
        }

    },

    onItemClick: function(n){
        this.setState({
            selectedNumber: n
        });
    },

    getSelectedQuestion: function(){
        var n = this.state.selectedNumber;
        var list = this.props.questions;
        if (n == undefined || list == undefined || list.length == 0){
            return undefined;
        }
        return list[n];
    },

    getUserAnswer: function(){
        var map = this.props.answersMap;
        var q = this.getSelectedQuestion();
        if (q == undefined){
            return undefined;
        }
        return map[q.id];
    },

    onAnswerSelect: function(answerNumber){
        var question = this.getSelectedQuestion();
        if (question == undefined){
            return;
        }
        var questionId = question.id;
        this.props.onAnswerSelect(questionId, answerNumber);
    },

    getPassedNumbers: function(){
        var arr = [];
        var map = this.props.answersMap;
        var list = this.props.questions;
        for (var i in list){
            if (map[list[i].id] != undefined){
                arr.push(i);
            }
        }
        return arr;
    },

    onForward: function(){
        this.props.onForward();
    },

    render: function () {
        var questions = this.props.questions;
        var selectedQuestion = this.getSelectedQuestion();
        var userAnswer = this.getUserAnswer();
        var passedNumbers = this.getPassedNumbers();
        var questionnaire = this.props.questionnaire;
        var task = (questionnaire == undefined) ? undefined : questionnaire.task;
        if (task != undefined){
            task = task.replace(/\n/g, '<br/>')
        }

        return (
            <div style={this.componentStyle.placeholder}>

                {task == undefined ? null :
                    <div style={this.componentStyle.task} className={'questionnaireTaskPlaceholder'} >
                        <div dangerouslySetInnerHTML={{__html: task}} ></div>
                    </div>
                }

                <div style={this.componentStyle.numbersPlaceholder}>
                    <NumbersBlock amount={questions.length} passedNumbers={passedNumbers}
                                  selectedNumber={this.state.selectedNumber} onItemClick={this.onItemClick} />
                </div>


                <div style={this.componentStyle.content}>

                    {selectedQuestion == undefined ? null :
                        <QuestionnaireSinglePanel question={selectedQuestion} userAnswer={userAnswer}
                                                  userId={this.props.userId}
                                                  answers={selectedQuestion.answers} onSelect={this.onAnswerSelect} />
                    }

                </div>

                <div style={this.componentStyle.forwardPlaceholder}>

                    <button onClick={this.onForward} className={'ui button basic'} >
                        <i className={'icon forward mail'} ></i> Перейти к подготовке
                    </button>

                </div>



            </div>
        );
    }

});

module.exports = QuestionnairePanel;