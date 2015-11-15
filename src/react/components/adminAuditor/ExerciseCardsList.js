/**
 * Created by sabir on 26.08.15.
 */

var React = require('react');
var ExerciseCard = require('./ExerciseCard');

var ExerciseCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            cards: []
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

        },
        cardsPlaceholder: {

        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={this.componentStyle.cardsPlaceholder} className={'ui segments'}>
                    {this.props.cards.map(function(card, i){
                        var key = 'card_' + i;
                        return (
                            <div key={key} className={'ui segment yellow'} >
                                <b>{card.number + 1}</b>

                                <b>
                                    <ExerciseCard  text={card.text} imgSrc={card.imgSrc} vimeoId={card.vimeoId} />
                                </b>

                                <ExerciseCard  text={(card.comment == undefined || card.comment == '') ? undefined : ('Comment: ' + card.comment)} />
                                <ExerciseCard  text={(card.transcript == undefined || card.transcript == '')  ? undefined : ('Transcript: ' + card.transcript)} />
                            </div>

                        );
                    }, this)}
                </div>
            </div>
        );
    }

});

module.exports = ExerciseCardsList;