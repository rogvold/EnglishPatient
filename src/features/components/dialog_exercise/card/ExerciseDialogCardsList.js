/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseDialogCard = require('./ExerciseDialogCard');

var ExerciseDialogCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            firstRoleName: undefined,
            secondRoleName: undefined,

            cards: [],
            onChange: function(cards){
                console.log(cards);
            }
        }
    },

    getInitialState: function () {
        return {
            cards: this.props.cards
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var cards = nextProps.cards;
        this.setState({
            cards: cards
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },
        labelPlaceholder: {
            fontWeight: 'bold',
            opacity: 0.6,
            fontSize: 12
        }
    },

    onChange: function(k, text, audioUrl){
        //console.log('ExerciseDialogCardsList: onChange: k, text, audioUrl = ', k, text, audioUrl);
        var list = this.state.cards;
        list[k].text = text;
        list[k].audioUrl = audioUrl;

        //console.log('cards changes: ', list);

        this.setState({
            cards: list
        });

        this.props.onChange(list);
    },

    render: function () {
        var list = this.props.cards;
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(card, k){
                    var key = 'd_card_' + k;
                    var num = +k + 1;
                    var sNum = num + ') '
                    var onChange = this.onChange.bind(this, k);
                    var label = (k % 2 == 0) ? this.props.firstRoleName : this.props.secondRoleName;
                    return (
                        <div key={key} style={{marginTop: 10}} >
                            <div style={this.componentStyle.labelPlaceholder}>
                                {sNum} {label}
                            </div>
                            <ExerciseDialogCard
                                onChange={onChange}
                                text={card.text} audioUrl={card.audioUrl} />
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = ExerciseDialogCardsList;