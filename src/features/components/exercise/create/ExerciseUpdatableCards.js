/**
 * Created by sabir on 15.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var UpdatableCardBlock = require('./UpdatableCardBlock');

var NumbersBlock = require('../../numbers/NumbersBlock');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

//var

var ExerciseUpdatableCards = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            exerciseId: undefined,
            cards: [],
            onUpdate: function(cardsList){

            },
            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            selectedNumber: 0,
            loading: false,
            addingNewMode: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var newCards = nextProps.cards == undefined ? [] : nextProps.cards;
        var oldCards = this.props.cards == undefined ? [] : this.props.cards;

        if (CommonMixin.arraysAreEqual(oldCards, newCards, function(c1, c2){return (c1.cardId == c2.cardId)}) == false){
            console.log('setting page to 0');
            this.setState({
                selectedNumber: 0,
                addingNewMode: false
            });
        }
    },

    componentDidMount: function () {
        if (this.props.cards != undefined && this.props.cards.length > 0){
            this.setState({
                selectedNumber: 0,
                addingNewMode: false
            });
        }
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            height: '100%',
            width: 932,
            margin: '0 auto',
            borderRight: '1px solid #EFF0F1',
            borderLeft: '1px solid #EFF0F1',
            position: 'relative'
        },

        numbersPlaceholder: {
            //marginBottom: 5
        },

        cardPlaceholder: {
            borderTop: '1px solid #EFF0F1'
        },

        numbersBlockStyle: {
            display: 'inline-block',
            textAlign: 'left',
            maxWidth: 736,
            padding: 4
        },

        topRightBlock: {
            position: 'absolute',
            top: 2,
            right: 0
        },

        noCardsPlaceholder: {
            marginTop: 50,
            width: '100%',
            textAlign: 'center'
        },

        addFirstImg: {
            height: 120,
            display: 'block',
            margin: '0 auto',
            marginTop: 15
        }
    },

    onItemUpdate: function(card){
        console.log('ExerciseUpdatableCards: onItemUpdate: ', card);
        var list = this.props.cards;
        var arr = [];
        for (var i in list){
            var c = list[i];
            if (c.cardId == card.id){
                arr.push(card);
            }else{
                arr.push(c);
            }
        }
        this.props.onUpdate(arr);
    },

    createNewCard: function(card){
        //alert('create new card occured');
        console.log('createNewCard: ', card);
        var arr = this.props.cards == undefined ? [] : this.props.cards;
        arr.push(card);
        this.props.onUpdate(arr);
        this.setState({
            selectedNumber: arr.length - 1,
            loading: false,
            addingNewMode: false
        });
    },

    getSelectedCard: function(){


        console.log('getSelectedCard occured: ', this.props.cards, this.state.selectedNumber);



        if (this.state.addingNewMode == true){
            var num = (this.props.cards == undefined) ? 0 : this.props.cards.length;
            return (<UpdatableCardBlock number={num} teacherId={this.props.teacherId}
                                        exerciseId={this.props.exerciseId} onUpdate={this.createNewCard} />);
        }

        if (this.props.cards == undefined || this.props.cards.length == 0){
            return (
                <div className={'no cards placeholder'} style={this.componentStyle.noCardsPlaceholder}>
                    Ура! Вы только что создали упражнение, но в нем еще нет заданий. <br/>
                    Нажмите на кнопку <b>"+ Добавить #1"</b>

                    <img src={'http://beta.englishpatient.org/img/add1.gif'} style={this.componentStyle.addFirstImg} />

                </div>
            );
        }

        var list = this.props.cards;
        var car = undefined;
        for (var i in list){
            var c = list[i];
            if (c.number == this.state.selectedNumber){
                car = c;
            }
        }
        if (car == undefined){
            return null;
        }
        var deletable = (this.state.selectedNumber == list.length - 1);




        return (
            <UpdatableCardBlock onUpdate={this.onItemUpdate} onDelete={this.onDelete}
                                number={car.number} exerciseId={this.props.exerciseId} cardId={car.cardId}
                                comment={car.comment} hint={car.hint} transcript={car.transcript}
                                answerType={car.answerType}
                                level={car.level}
                                teacherId={this.props.teacherId}
                                correctAnswer={car.correctAnswer}
                                materials={car.materials} deletable={deletable} />
        );
    },

    onItemClick: function(n){
        console.log('onItemClick occured: n = ' + n);
        this.setState({
            selectedNumber: n,
            addingNewMode: false
        });
    },

    onDelete: function(cardId){
        if (cardId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ExerciseMixin.deleteCard(cardId, function(){
            this.setState({
                loading: false
            });
            this.props.onDelete();
        }.bind(this));
    },

    onAdd: function(){
        this.setState({
            addingNewMode: true,
            selectedNumber: undefined
        });
    },

    render: function () {
        var list = this.props.cards;
        console.log('ExerciseUpdatableCards: rendering cards: ', list);
        var card = this.getSelectedCard();



        return (
            <div style={this.componentStyle.placeholder}>

                {(list == undefined || list.length == 0) ? null :
                    <div style={this.componentStyle.numbersPlaceholder} className={'numbersPlaceholder'} >
                        <NumbersBlock style={this.componentStyle.numbersBlockStyle} onItemClick={this.onItemClick} selectedNumber={this.state.selectedNumber} amount={list.length} />
                    </div>
                }

                <div style={this.componentStyle.topRightBlock}>
                    {this.state.addingNewMode == true ? null :
                        <button className={'ui small button'} onClick={this.onAdd} >
                            <i className={'plus icon'} ></i> Добавить <b>#{(list == undefined || list.length == 0) ? '1' : (list.length + 1) }</b>
                        </button>
                    }

                </div>


                <div style={this.componentStyle.cardPlaceholder}>
                    {card}
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>


            </div>
        );
    }

});

module.exports = ExerciseUpdatableCards;