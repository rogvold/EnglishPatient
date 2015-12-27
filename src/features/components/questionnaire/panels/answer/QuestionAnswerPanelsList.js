/**
 * Created by sabir on 21.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionAnswerPanel = require('./QuestionAnswerPanel');

var QuestionAnswerPanelsList = React.createClass({
    getDefaultProps: function () {
        return {
            answers: [],
            //answers: [],
            onChange: function(answers){
                console.log('default: QuestionAnswerPanelsList: onChange: ', answers);
            }
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
            width: 830,
            padding: 4,
            margin: '0 auto',
            backgroundColor: 'white'
        },

        itemPlaceholder: {
            marginTop: 5
        }
    },

    onChange: function(number, answer, ruAnswer, audioUrl){
        var list = this.props.answers;
        var arr = [];
        for (var i in list){
            var q = list[i];
            if (i == number){
                q.answer = answer;
                q.ruAnswer = ruAnswer;
                q.audioUrl = audioUrl;
            }
            arr.push(q);
        }
        this.props.onChange(arr);
    },

    render: function () {
        var list = this.props.answers;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(q, k){
                    var key = 'panel_answer' + k + '';
                    return (
                        <div key={key} style={this.componentStyle.itemPlaceholder} >
                            <div style={{color: 'rgba(0, 0, 0, 0.6)'}} >{+k+1})</div>
                            <QuestionAnswerPanel number={k}
                                                 audioUrl={q.audioUrl} onChange={this.onChange}
                                                 answer={q.answer} ruAnswer={q.ruAnswer} />
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = QuestionAnswerPanelsList;