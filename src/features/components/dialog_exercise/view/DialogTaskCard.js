/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../card/DialogCard');

var UserExerciseInput = require('../../exercise/UserExerciseInput');

var DialogMixin = require('../../../mixins/DialogMixin');

var DialogTaskCard = React.createClass({
    getDefaultProps: function () {
        return {
            dialog: {},
            roleNumber: 0,
            cardNumber: 0,
            isStart: false,

            userId: undefined,

            userAnswerAudioUrl: undefined,

            card: {},

            answerCard: {},

            teacherMode: false,

            onAnswer: function(url){

            }


        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.ensureVisible();
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white'

        },

        questionPlaceholder: {

        },

        imagePlaceholder: {
            textAlign: 'center',
            width: 250,
            height: 250,
            margin: '0 auto'
        },

        audioPlaceholder: {
            margin: '0 auto',
            width: 250
        },
        
        answerPlaceholder: {
            
        }


    },

    ensureVisible() {
        var domNode = React.findDOMNode(this);
        console.log('ensureVisible: domNode = ', domNode);
        domNode.scrollIntoView(true);
    },

    onRecordingSave: function(tp, url){
        this.props.onAnswer(url);
    },

    render: function () {
        var defaultLirmakCard = DialogMixin.getLirmakDefaultCard();
        var card = ((this.props.isStart == true) && (roleNumber == 0)) ? defaultLirmakCard : this.props.card;

        var cardNumber = this.props.cardNumber;

        var roleNumber = this.props.roleNumber;
        var dialog = this.props.dialog;

        var friendAvatar = (roleNumber == 0) ? dialog.secondRoleImg : dialog.firstRoleImg;
        var friendName = (roleNumber == 0) ? dialog.secondRoleName : dialog.firstRoleName;
        var audioUrl = this.props.card.audioUrl;

        if ((this.props.isStart == true) && (roleNumber == 0)){
            friendAvatar = defaultLirmakCard.img;
        }

        if (this.props.teacherMode == true){
            if (cardNumber % 2 == 0){
                friendAvatar = dialog.firstRoleImg;
            }else{
                friendAvatar = dialog.secondRoleImg;
            }
        }

        var needToAnswer = (this.props.answerCard.id != undefined);

        var uA = {url: this.props.userAnswerAudioUrl};

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.questionPlaceholder}>

                    <div style={this.componentStyle.imagePlaceholder}>
                        <DialogCard avatar={friendAvatar} opacity={0.2} />
                    </div>

                    <div style={this.componentStyle.audioPlaceholder}>
                        <audio style={{width: '100%'}} autoPlay={true} controls src={audioUrl} ></audio>
                    </div>

                </div>

                {needToAnswer == false ? null :
                    <div style={this.componentStyle.answerPlaceholder}>
                        <UserExerciseInput onAnswer={this.onRecordingSave}
                                           number={this.props.cardNumber}
                                           userAnswer={uA} />
                    </div>
                }

            </div>
        );
    }

});

module.exports = DialogTaskCard;