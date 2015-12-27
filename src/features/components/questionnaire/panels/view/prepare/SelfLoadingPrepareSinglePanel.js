/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var PrepareSinglePanel = require('./PrepareSinglePanel');

var QuestionnaireMixin = require('../../../../../mixins/QuestionnaireMixin');

var PrepareSinglePanel = require('./PrepareSinglePanel');

var SelfLoadingPrepareSinglePanel = React.createClass({
    getDefaultProps: function () {
        return {
            questionId: undefined,
            answerNumber: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            question: undefined
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.load(nextProps.questionId);
    },

    componentDidMount: function() {
        this.load(this.props.questionId);
    },

    load: function(questionId){
        //var questionId = this.props.questionId;
        if (questionId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        QuestionnaireMixin.loadQuestionnaireQuestion(questionId, function(question){
            this.setState({
                loading: false,
                question: question
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white'
        },

        content: {

        }
    },

    getAnswer: function(){
        console.log('getAnswer');
        var q = this.state.question;

        if (q == undefined){
            return undefined;
        }

        var n = this.props.answerNumber;
        var answers = q.answers;
        console.log('answers = ', answers, 'n = ', n);

        if (n == -1){
            return undefined;
        }
        if (n == -2){
            return {
                answerNumber: -2
            }
        }
        var a = answers[n];

        a = assign({}, a, {answerNumber: n});

        console.log('a = ', a);

        return a;
    },

    render: function () {
        var q = this.state.question;
        var a = this.getAnswer();

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.question == undefined ? null :
                    <div style={this.componentStyle.content}>
                        <PrepareSinglePanel
                            vimeoId={q.vimeoId}
                            audioUrl={a.audioUrl} answer={a.answer} ruAnswer={a.ruAnswer} questionName={q.name}
                            answerNumber={this.props.answerNumber} />
                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingPrepareSinglePanel;