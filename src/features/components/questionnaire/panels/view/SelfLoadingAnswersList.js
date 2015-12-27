/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var AnswersList = require('./AnswersList');

var SelfLoadingAnswersList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            questionId: undefined,

            onSelect: function(number){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            selectedVariant: undefined,
            answers: []
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            selectedVariant: undefined,
            answers: []
        });
        var questionId = nextProps.questionId;
        this.load(questionId);
    },

    componentDidMount: function () {
        var questionId = this.props.questionId;
        this.load(questionId);
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        listPlaceholder: {

        }
    },

    load: function(questionId){
        var userId = this.props.userId;
        //var questionId = this.props.questionId;
        if (userId == undefined || questionId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        QuestionnaireMixin.loadQuestionnaireQuestion(questionId, function(question){
            this.setState({
                answers: question.answers
            });
            QuestionnaireMixin.loadTransformedUserAnswer(userId, questionId, function(answer){
                if (answer == undefined){
                    self.setState({loading: false});
                }else {
                    self.setState({
                        loading: false,
                        selectedVariant: answer.variant
                    });
                }
            });
        }.bind(this))
    },

    onSelect: function(number){
        console.log('saving user answer: number = ', number);
        var userId = this.props.userId;
        var questionId = this.props.questionId;
        this.setState({
            loading: true
        });
        QuestionnaireMixin.saveUserAnswer(userId, questionId, number, undefined, function(a){
            this.setState({
                loading: false,
                selectedVariant: number
            });
            this.props.onSelect(number);
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>
                    <AnswersList answers={this.state.answers}
                                 onSelect={this.onSelect}
                                 selectedVariant={this.state.selectedVariant} />
                </div>

                <div className={'SelfLoadingAnswersList ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingAnswersList;