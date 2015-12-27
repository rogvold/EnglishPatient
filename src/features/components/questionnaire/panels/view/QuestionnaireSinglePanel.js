/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../../player/VimeoPlayer');

var AnswersList = require('./AnswersList');
var SelfLoadingAnswersList = require('./SelfLoadingAnswersList');

var TranslatableText = require('../../../text/translatable/TranslatableText');

var QuestionnaireSinglePanel = React.createClass({
    getDefaultProps: function () {
        return {
            question: {},
            answers: [],
            userAnswer: undefined,
            userId: undefined,

            onSelect: function(number){
                console.log('QuestionnaireSinglePanel: default: number = ', number);
            }
        }

    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        content: {

        },

        topBlock: {

        },

        playerPlaceholder: {
            width: 600,
            height: 350,
            margin: '0 auto'
        },

        namePlaceholder: {
            padding: 5,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 7
        },

        answersBlock: {

        }
    },

    onSelect: function(number){
        this.props.onSelect(number);
    },

    render: function () {
        var q = this.props.question;
        var userVariant = (this.props.userAnswer == undefined) ? undefined : this.props.userAnswer.variant;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topBlock}>

                    <div style={this.componentStyle.namePlaceholder}>
                        <TranslatableText text={q.name} />
                    </div>

                    <div style={this.componentStyle.playerPlaceholder}>
                        <VimeoPlayer vimeoId={q.vimeoId} />
                    </div>

                </div>

                <div style={this.componentStyle.answersBlock}>

                    <SelfLoadingAnswersList questionId={q.id}
                                            onSelect={this.onSelect}
                                            userId={this.props.userId} />

                </div>

            </div>
        );
    }

});

module.exports = QuestionnaireSinglePanel;