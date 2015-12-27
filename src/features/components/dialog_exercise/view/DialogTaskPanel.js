/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var SelectedUserRolePanel = require('./SelectedUserRolePanel');

var DialogMixin = require('../../../mixins/DialogMixin');

var DialogTaskCard = require('./DialogTaskCard');

var NumbersBlock = require('../../numbers/NumbersBlock');

var DialogTaskPanel = React.createClass({
    getDefaultProps: function () {
        return {
            //0 or 1
            dialog: {},
            cards: [],
            answersMap: {},
            roleNumber: 0,
            onAnswer: function(cardId, url){

            },

            onGoBack: function(){

            },

            teacherMode: false
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
            width: 610,
            padding: 5,
            backgroundColor: 'white',
            margin: '0 auto'
        },

        topPlaceholder: {

        },

        numbersPlaceholder: {
            padding: 5,
            textAlign: 'center'
        },


        backPlaceholder: {
            textAlign: 'center',
            marginTop: -30
        }

    },

    onCardItemClick: function(n){
        this.setState({
            selectedNumber: n
        });
    },

    getPassedNumbers: function(){
        var pairedCards = this.getPairedCards();
        var arr = [];
        var aMap = this.props.answersMap;
        for (var i in pairedCards){
            var aCard = pairedCards[i].answerCard;
            if (aCard.id == undefined){
                continue;
            }
            if (aMap[aCard.id] == undefined){
                continue;
            }
            arr.push(i);
        }
        return arr;
    },

    onGoBack: function(){
        this.props.onGoBack();
    },

    onAnswer: function(url){
        var pairedCards = this.getPairedCards();
        var k = this.state.selectedNumber;
        var pc = (pairedCards.length > 0) ? pairedCards[k] : undefined;
        var answerCard = (pc == undefined) ? undefined : pc.answerCard;
        var cardId = answerCard.id;

        console.log('onAnswer: cardId, url = ', cardId, url);

        this.props.onAnswer(cardId, url);

        var selectedNumber = this.state.selectedNumber;
        if (selectedNumber < pairedCards.length - 1){
            selectedNumber++;
        }
        this.setState({
            selectedNumber: selectedNumber
        });

    },

    getPairedCards: function(){
        var pairedCards = [];
        var cards = this.props.cards;
        if (this.props.teacherMode == false){
            pairedCards = DialogMixin.getDialogPairedCards(this.props.cards, this.props.roleNumber);
        }else {
            pairedCards = cards.map(function(card){
                return {
                    questionCard: card,
                    answerCard: card
                }
            });
        }
        return pairedCards;
    },

    render: function () {
        var pairedCards = this.getPairedCards();

        var k = this.state.selectedNumber;

        var pc = (pairedCards.length > 0) ? pairedCards[k] : undefined;
        var isStart = (k == 0);
        var card = (pc == undefined) ? undefined : pc.questionCard;
        var answerCard = (pc == undefined) ? undefined : pc.answerCard;

        var aMap = this.props.answersMap;
        var userAnswer = (answerCard == undefined) ? undefined : aMap[answerCard.id];
        var userAnswerAudioUrl = (userAnswer == undefined) ? undefined : userAnswer.answerUrl;

        var passedNumbers = this.getPassedNumbers();

        console.log('rendering DialogTaskPanel: userAnswer = ', userAnswer);
        console.log('rendering DialogTaskPanel: userAnswerAudioUrl = ', userAnswerAudioUrl);



        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.teacherMode == true ? null :
                    <div>

                        <div style={this.componentStyle.topPlaceholder}>
                            <SelectedUserRolePanel
                                         roleNumber={this.props.roleNumber} dialog={this.props.dialog} />
                        </div>
                        <div style={this.componentStyle.backPlaceholder}>
                            <button className={'ui basic mini button grey'} onClick={this.onGoBack} >
                                <i className={'icon reply'}></i> повторить
                            </button>
                        </div>

                    </div>
                }




                <div style={this.componentStyle.numbersPlaceholder}>
                    <NumbersBlock amount={pairedCards.length}
                                  passedNumbers={passedNumbers}
                                  selectedNumber={this.state.selectedNumber}
                                  onItemClick={this.onCardItemClick} />
                </div>

                <div  >
                    <DialogTaskCard dialog={this.props.dialog}
                                            card={card} answerCard={answerCard}
                                            cardNumber={k} isStart={isStart}
                                            userAnswerAudioUrl={userAnswerAudioUrl}
                                            onAnswer={this.onAnswer}
                                            teacherMode={this.props.teacherMode}
                                            roleNumber={this.props.roleNumber} />
                </div>


            </div>
        );
    }

});

module.exports = DialogTaskPanel;