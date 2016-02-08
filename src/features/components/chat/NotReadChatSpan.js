/**
 * Created by sabir on 17.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var ChatMixin = require('../../mixins/ChatMixin');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var NotReadChatSpan = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            userId: undefined,
            style: {

            },
            interval: 30 * 1000
        }
    },

    getInitialState: function () {
        return {
            map: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(function(map){});
        this.initTimer();
    },

    componentWillUnmount: function(){
        this.destroyTimer();
    },

    playSound: function(){
        this.getFlux().actions.playSound('https://www.englishpatient.org/app/assets/sounds/all_eyes_sound.mp3');
    },

    load: function(callback){
        var isFirstLoading = (this.intervalId == undefined);
        ChatMixin.loadNotReadMessagesUsersMap(this.props.userId, function(map){
            var oldK = this.getNotReadNumberByMap(this.state.map);
            var newK = this.getNotReadNumberByMap(map);
            if (newK > oldK){
                if (isFirstLoading == false){
                    this.playSound();
                }
            }

            this.setState({
                map: map
            });
            callback(map);
        }.bind(this));
    },

    initTimer: function(){
        this.intervalId = setInterval(function(){
            this.load(function(map){});
        }.bind(this), this.props.interval);
    },

    destroyTimer: function(){
        clearInterval(this.intervalId);
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block',
            padding: '3px 5px',
            color: 'white',
            marginLeft: 3,
            backgroundColor: 'rgb(252, 99, 107)',
            borderRadius: 4,
            lineHeight: '10px',
            fontSize: 12
        }
    },

    getNotReadNumberByMap: function(map){
        if (map == undefined){
            map = {};
        }
        var k = 0;
        for (var key in map){
            k+= map[key].messagesNumber;
        }
        return k;
    },

    getNotReadNumber: function(){
        var map = this.state.map;
        return this.getNotReadNumberByMap(map);
    },

    render: function () {
        var k = this.getNotReadNumber();
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        if (k == 0){
            st = assign({}, st, {display: 'none'});
        }

        return (
            <div style={st}>
                +{k}
            </div>
        );
    }

});

module.exports = NotReadChatSpan;