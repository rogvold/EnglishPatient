/**
 * Created by sabir on 15.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');
var ExerciseUpdatableCards = require('./ExerciseUpdatableCards');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');

var SelfLoadingExerciseUpdatableCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            //exerciseId: undefined
            //exerciseId: '5c4dk92L9Y'
            teacherId: undefined,
            exerciseId: undefined
            //exerciseId: 'hF4kQpdIPc'
            //exerciseId: 'JhQTQQmHeP'

            //exerciseId: 'eTTesLiK2w'
            //exerciseId: 'Xg4BMhsrwE'
        }
    },

    getInitialState: function () {
        return {
            cards: [],
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        this.loadCards(this.props.exerciseId, function(obj){
            console.log(obj);
        });
    },

    componentStyle: {
        placeholder: {

        },

        noCardsPlaceholder: {

        }

    },

    loadCards: function(exerciseId, callback){
        console.log('loading exercise: exerciseId = ' + exerciseId);
        this.setState({
            loading: true
        });
        ExerciseMixin.loadExercise(exerciseId, function(obj){
            console.log('exercise loaded: ', obj);
            var exercise = obj.exercise;
            var cards = obj.cards;
            this.setState({
                loading: false,
                cards: cards
            });
            callback(obj);

        }.bind(this));
    },

    onCardsUpdated: function(cards){
        console.log('SelfLoadingExerciseUpdatableCardsList: onCardsUpdated occured: cards = ', cards);

        this.setState({
            cards: cards
        });
    },

    onDelete: function(){
        console.log('onDelete occured');
        this.loadCards(this.props.exerciseId, function(){
            console.log('successfully deleted');
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                    <ExerciseUpdatableCards onDelete={this.onDelete}
                                            teacherId={this.props.teacherId}
                                            exerciseId={this.props.exerciseId}
                                            cards={this.state.cards} onUpdate={this.onCardsUpdated} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingExerciseUpdatableCardsList;