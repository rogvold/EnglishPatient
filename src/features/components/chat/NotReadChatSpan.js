/**
 * Created by sabir on 17.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var ChatMixin = require('../../mixins/ChatMixin');

var NotReadChatSpan = React.createClass({
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

    load: function(callback){
        ChatMixin.loadNotReadMessagesUsersMap(this.props.userId, function(map){
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

    getNotReadNumber: function(){
        var map = this.state.map;
        var k = 0;
        for (var key in map){
            k+= map[key].messagesNumber;
        }
        return k;
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