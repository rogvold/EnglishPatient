/**
 * Created by sabir on 30.09.15.
 */
var React = require('react');
var NumbersBlock = require('../numbers/NumbersBlock');
var PatientCard = require('./PatientCard');

var PatientExercise = React.createClass({
    getDefaultProps: function () {
        return {
            exercise: {

            },
            cards: [],
            passedNumbers: [],
            userAnswers: [],
            onNumberClick: function(n){
                console.log('onNumberClick occured');
            },
            onAnswer: function(cardId, type, ans){
                console.log('onAnswer: ', cardId, type, ans);
            },
            showDescription: false,
            showTask: true,
            showAnswerBlock: true,
            customBottomBlock: undefined,
            autoNext: true,
            canAnswer: true,
            teacherMode: false,
            noCardsImg: 'https://d3ki9tyy5l5ruj.cloudfront.net/obj/c06fded71d4261a939460e0f0e02d4385c2ffe1d/empty_inbox.svg'
        }
    },

    getInitialState: function () {
        return {
            currentCardNumber: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 600
        },
        numbersPlaceholder: {
            marginBottom: 15
        },
        cardsPlaceholder: {

        },

        selectedCardPlaceholder: {

        },
        namePlaceholder: {
            paddingBottom: 7,
            display: 'block',
            fontSize: '20px'
        },

        descriptionPlaceholder: {
            paddingBottom: 7,
            display: 'block',
            borderBottom: '1px solid lightgrey',
            marginBottom: 10
        },

        taskPlaceholder: {
            paddingBottom: 7,
            display: 'block',
            borderBottom: '1px solid lightgrey',
            marginBottom: 10
        },

        noCardsPlaceholder: {
            height: 300
        },

        noCardsImg: {
            height: 180,
            marginTop: 20,
            display: 'block',
            margin: '0 auto'
        },

        noCardsPlaceholder: {
            textAlign: 'center'
        }

    },

    onNumberClick: function(n){
        this.props.onNumberClick(n);
        this.setState({
            currentCardNumber: n
        });
    },

    getSelectedCard: function(){
        var list = this.props.cards;
        var n = this.state.currentCardNumber;
        for (var i in list){
            if (i == n){
                return list[i];
            }
        }
        return undefined;
    },

    getSelectedUserAnswer: function(){
        var list = this.props.userAnswers;
        var c = this.getSelectedCard();
        if (c == undefined){
            return undefined;
        }
        for (var i in list){
            var ans = list[i];
            if (ans.cardId == c.cardId){
                return ans;
            }
        }
        return undefined;
    },

    getPassedNumbers: function(){
        var arr = [];
        var list = this.props.userAnswers;
        for (var i in list){
            var a = list[i];
            for (var j in this.props.cards){
                var card = this.props.cards[j];
                if (card.cardId == a.cardId){
                    arr.push(j);
                }
            }
        }
        return arr;
    },

    onAnswer: function(type, ans){
        this.props.onAnswer(this.props.cards[this.state.currentCardNumber].cardId, type, ans);
        if (this.props.autoNext == false){
            return;
        }
        var list = this.getPassedNumbers();
        var nPrev, nNext;
        var map = {};
        for (var i in list){
            map[list[i]] = 1;
        }
        if (this.props.passedNumbers.length >= this.props.cards.length - 1){
            return;
        }

        var currentNum = this.state.currentCardNumber;
        for (var i = this.props.cards.length - 1; i>= 0; i--){
            if (i > currentNum){
                if (map[i] == undefined){
                    nNext = i;
                }
            }
            if (i < currentNum){
                if (map[i] == undefined){
                    nPrev = i;
                }
            }
        }
        var next = (nNext == undefined) ? nPrev : nNext;
        if (next != undefined){
            this.setState({
                currentCardNumber: next
            });
        }
    },

    render: function () {
        var card = this.getSelectedCard();
        var userAnswer = this.getSelectedUserAnswer();
        var passedNumbers = this.getPassedNumbers();
        var name = (this.props.exercise == undefined) ? undefined : this.props.exercise.name;
        var description = (this.props.exercise == undefined) ? undefined : this.props.exercise.description;
        var task = (this.props.exercise == undefined) ? undefined : this.props.exercise.task;

        var cardsNotVisible = (this.props.cards == undefined) || (this.props.cards.length == 0);

        return (
            <div style={this.componentStyle.placeholder} >

                {name == undefined ? null :
                    <div style={this.componentStyle.namePlaceholder}>
                        {name}
                    </div>
                }

                {((description == undefined) || (this.props.showDescription == false)) ? null :
                    <div style={this.componentStyle.descriptionPlaceholder}>
                        {description}
                    </div>
                }

                {(this.props.showTask == false || task == undefined) ? null :
                    <div style={this.componentStyle.taskPlaceholder}>
                        {task}
                    </div>
                }



                {cardsNotVisible ?
                    <div style={this.componentStyle.noCardsPlaceholder} >
                        <img src={this.props.noCardsImg} style={this.componentStyle.noCardsImg} />
                        <div>
                            В этом упражнении еще нет заданий.
                        </div>

                    </div>
                    :
                    <div>
                        <div style={this.componentStyle.numbersPlaceholder} >
                            <NumbersBlock onItemClick={this.onNumberClick} amount={this.props.cards.length} passedNumbers={passedNumbers} selectedNumber={this.state.currentCardNumber}  />
                        </div>

                        <div style={this.componentStyle.cardsPlaceholder} >
                            <div style={this.componentStyle.selectedCardPlaceholder}>
                                {card == undefined ? null :
                                    <PatientCard number={this.state.currentCardNumber}
                                                 onAnswer={this.onAnswer} userAnswer={userAnswer}
                                                 comment={card.comment}

                                                 transcript={card.transcript}
                                                 correctAnswer={card.correctAnswer}

                                                 hint={card.hint} materials={card.materials}
                                                 canAnswer={this.props.canAnswer}
                                                 showAnswerBlock={this.props.showAnswerBlock}
                                                 answerType={card.answerType}
                                                 teacherMode={this.props.teacherMode}

                                        />
                                }
                            </div>
                        </div>
                    </div>
                }


                {this.props.customBottomBlock == undefined ? null :
                    <div style={this.componentStyle.customBottomBlock} >
                        {this.props.customBottomBlock}
                    </div>
                }

            </div>
        );
    }

});

module.exports = PatientExercise;