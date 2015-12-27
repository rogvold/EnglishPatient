/**
 * Created by sabir on 24.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingTestPanel = require('./SelfLoadingTestPanel');

var NumbersBlock = require('../../../../numbers/NumbersBlock');

var QuestionnaireTestPanel = React.createClass({
    getDefaultProps: function () {
        return {
            questions: [],
            userId: undefined,
            answersMap: {},

            onBack: function(){

            },

            onAnswer: function(a){

            }
        }
    },

    getInitialState: function () {
        return {
            selectedNumber: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white'
        },

        numbersPlaceholder: {
            padding: 5,
            borderBottom: '1px dotted #EFF0F1',
            marginBottom: 5
        },

        backPlaceholder: {
            padding: 5,
            textAlign: 'center'
        },

        content: {

        }
    },

    getQuestions: function(){
        console.log('QuestionnaireTestPanel: getQuestions occured');
        var map = this.props.answersMap;
        var arr = [];
        var list = this.props.questions;
        for (var i in list){
            var q = list[i];
            var ans = map[q.id];
            console.log(q.id, ' - ', ans);
            if (ans == undefined){
                continue;
            }
            if (ans.variant == -1){
                continue;
            }
            arr.push(q);
        }
        console.log('returning: ', arr);
        return arr;
    },

    getSelectedQuestion: function(){
        var map = this.props.answersMap;
        var list = this.getQuestions();
        var q = (list.length > 0) ? list[this.state.selectedNumber] : undefined;
        return q;
    },

    getSelectedAnswer: function(){
        var map = this.props.answersMap;
        var list = this.getQuestions();
        var q = (list.length > 0) ? list[this.state.selectedNumber] : {};
        var a = map[q.id];
        if (a == undefined){
            return undefined;
        }
        return a;
    },

    onItemClick: function(number){
        this.setState({
            selectedNumber: number
        });
    },

    onAnswer: function(answer){
        var a = this.getSelectedAnswer();
        a = answer;
        this.props.onAnswer(a);
    },

    onBack: function(){
        this.props.onBack();
    },

    getPassedNumbers: function(){
        var arr = [];
        var list = this.getQuestions();
        var map = this.props.answersMap;
        for (var i in list){
            var q = list[i];
            var a = map[q.id];
            if (a == undefined || a.audioUrl == undefined){
                continue;
            }
            arr.push(i);
        }

        return arr;
    },

    render: function () {
        var questions = this.getQuestions();
        var selectedQuestion = this.getSelectedQuestion();
        var selectedAnswer = this.getSelectedAnswer();
        var passedNumbers = this.getPassedNumbers();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.backPlaceholder}>
                    <button className={'ui basic button mini'} onClick={this.onBack} >
                        <i className={'icon reply'} ></i> Вернуться к подготовке
                    </button>
                </div>

                <div style={this.componentStyle.numbersPlaceholder}>
                    <NumbersBlock amount={questions.length} onItemClick={this.onItemClick}
                                  passedNumbers={passedNumbers}
                                          selectedNumber={this.state.selectedNumber} />
                </div>

                {selectedQuestion == undefined ? null :
                    <div style={this.componentStyle.content}>
                        <SelfLoadingTestPanel onAnswer={this.onAnswer}
                            questionId={selectedQuestion.id} userId={this.props.userId} />
                    </div>
                }
            </div>
        );
    }

});

module.exports = QuestionnaireTestPanel;