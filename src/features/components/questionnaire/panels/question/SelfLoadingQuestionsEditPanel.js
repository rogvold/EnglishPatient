/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var NumbersBlock = require('../../../numbers/NumbersBlock');

var SelfLoadingUpdateQuestionPanel = require('./SelfLoadingUpdateQuestionPanel');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var SelfLoadingQuestionsEditPanel = React.createClass({
    getDefaultProps: function () {
        return {
            questionnaireId: undefined
        }
    },

    getInitialState: function () {
        return {
            selectedNumber: 0,
            questions: [],
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var questionnaireId = nextProps.questionnaireId;
        this.load(questionnaireId);
    },

    componentDidMount: function () {
        var questionnaireId = this.props.questionnaireId;
        this.load(questionnaireId);
    },

    componentStyle: {
        placeholder: {
            width: 830
        },

        topPlaceholder: {

        },

        leftTop: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 5,
            width: 650
        },

        rightTop: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 5,
            width: 180,
            textAlign: 'right'
        },

        numbersBlockPlaceholder: {

        },

        questionPlaceholder: {

        }
    },

    load: function(questionnaireId){
        if (questionnaireId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        QuestionnaireMixin.loadQuestionnaireQuestions(questionnaireId, function(questions){
            this.setState({
                loading: false,
                questions: questions
            });
        }.bind(this))
    },

    onUpdated: function(q){
        var list = this.state.questions;
        var arr = [];
        for (var i in list){
            var question = list[i];
            if (i == question.number){
                arr.push(q);
            }else{
                arr.push(question);
            }
        }
        this.setState({
            questions: arr
        });
    },

    canAddQuestion: function(){
        var questions = this.state.questions;
        if (questions.length == 0){
            return true;
        }
        var lastQ = questions[questions.length - 1];
        if (lastQ.id == undefined || lastQ.question == undefined){
            return false;
        }
        return true;
    },

    addQuestion: function(){
        var questions = this.state.questions;
        var number = questions.length;
        questions.push({
            questionnaireId: this.props.questionnaireId,
            number: number
        });
        this.setState({
            questions: questions,
            selectedNumber: number
        });
    },

    onNumberClick: function(n){
        this.setState({
            selectedNumber: n
        });
    },

    onDeleted: function(number){
        var list = this.state.questions;
        var arr = [];
        for (var i in list){
            if (i == number){
                continue;
            }
            arr.push(list[i]);
        }
        var newNum = 0;
        if (arr.length > 0){
            newNum = arr.length - 1;
        }
        this.setState({
            questions: arr,
            selectedNumber: newNum
        });
    },

    canDeleteQuestion: function(){
        var questions = this.state.questions;
        if (questions.length == 0){
            return false;
        }
        if (this.state.selectedNumber == questions.length - 1){
            return true;
        }
        return false;
    },

    render: function () {
        var questions = this.state.questions;
        var canAddQuestion = this.canAddQuestion();
        var canDelete = this.canDeleteQuestion();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topPlaceholder}>

                    <div style={this.componentStyle.leftTop}>
                        <div style={this.componentStyle.numbersBlockPlaceholder}>
                            <NumbersBlock
                                onItemClick={this.onNumberClick}
                                amount={questions.length} selectedNumber={this.state.selectedNumber} />
                        </div>
                    </div>

                    <div style={this.componentStyle.rightTop}>
                        <button className={'ui basic mini button'} onClick={this.addQuestion} disabled={!canAddQuestion} >
                            <i className={'icon plus'} ></i> добавить вопрос #{+questions.length + 1}
                        </button>
                    </div>

                </div>


                {questions.length == 0 ? null :
                    <div style={this.componentStyle.questionPlaceholder}>
                        <SelfLoadingUpdateQuestionPanel
                            questionnaireId={this.props.questionnaireId}
                            onUpdated={this.onUpdated}
                            onDeleted={this.onDeleted}
                            canDelete={canDelete}
                            number={this.state.selectedNumber}  />
                    </div>
                }


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingQuestionsEditPanel;