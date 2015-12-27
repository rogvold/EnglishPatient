/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var TranslatableText = require('../../../text/translatable/TranslatableText');

var AnswersList = React.createClass({
    getDefaultProps: function () {
        return {
            answers: [],
            selectedVariant: undefined,

            audioMode: false,

            onSelect: function(number){

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
            position: 'relative',
            width: 610,
            margin: '0 auto'
        },

        itemStyle: {
            borderRadius: 4,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            padding: 5,
            width: 600,
            margin: 5
        },

        active: {
            //backgroundColor: 'whitesmoke',
            backgroundColor: '#D7D9DD',
            border: '1px solid #2E3C54'
        },

        answersPlaceholder: {
            width: 450,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        controlsPlaceholder: {
            width: 134,
            paddingTop: 5,
            textAlign: 'right',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        answerPlaceholder: {
            fontWeight: 'bold'
        },

        ruAnswerPlaceholder: {
            marginTop: 5,
            padding: 5,
            opacity: 0.7
        },

        audioPlaceholder: {

        }
    },

    onSelect: function(number){
        console.log('onSelect: number = ' + number);
        this.props.onSelect(number);
    },

    getAnswers: function(){
        var list = this.props.answers;
        var arr = [];
        for (var i in list){
            var a = list[i];
            a.number = i;
            arr.push(a);
        }
        arr.push({
            answer: "I have my personal opinion on that.",
            ruAnswer: 'У меня есть собственное мнение.',
            number: -2
        });

        arr.push({
            answer: "I'm not interested in that.",
            ruAnswer: 'Мне это неинтересно.',
            number: -1
        });
        return arr;
    },

    render: function () {
        var list = this.getAnswers();
        var selectedNumber = this.props.selectedVariant;

        console.log('AnswersList: render: answers = ', list);
        console.log('selectedNumber = ', selectedNumber);

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(a, k){
                    var key = 'answer_' + k;
                    var isSelected = (selectedNumber == a.number);
                    var st = assign({}, this.componentStyle.itemStyle);
                    if (isSelected == true){
                        st = assign({}, st, this.componentStyle.active);
                    }
                    var onSel = this.onSelect.bind(this, a.number);
                    return (
                        <div key={key} style={st} >

                            <div style={this.componentStyle.answersPlaceholder}>

                                <div style={this.componentStyle.answerPlaceholder}>
                                    <TranslatableText fonSize={'14px'} text={a.answer} />
                                </div>

                                {a.ruAnswer == undefined ? null :
                                    <div style={this.componentStyle.ruAnswerPlaceholder}>
                                        {a.ruAnswer}
                                    </div>
                                }


                                {this.props.audioMode == false ? null :
                                    <div style={this.componentStyle.audioPlaceholder}>
                                        <audio controls src={a.audioUrl}></audio>
                                    </div>
                                }

                            </div>

                            <div style={this.componentStyle.controlsPlaceholder}>

                                <button className={'ui button basic'} onClick={onSel} >
                                    <i className={'icon checkmark'} ></i> Выбрать
                                </button>

                            </div>

                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = AnswersList;