/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotificationMixin = require('../../mixins/NotificationMixin');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var NotificationsNumberSpan = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            spanClassName: '',
            userId: undefined,
            spanStyle: {

            },

            interval: 30 * 1000

        }
    },

    getInitialState: function () {
        return {
            notifications: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentWillUnmount: function(){
        this.destroyTimer();
    },

    initTimer: function(){

        this.intervalId = setInterval(function(){
            this.load(function(map){});
        }.bind(this), this.props.interval);
    },

    destroyTimer: function(){
        clearInterval(this.intervalId);
    },

    componentDidMount: function () {
        this.load(function(list){
            console.log('notifications loaded', list);
        });
        this.initTimer();
    },

    playSound: function(){
        this.getFlux().actions.playSound('https://www.englishpatient.org/app/assets/sounds/all_eyes_sound.mp3');
    },

    load: function(callback){
        var userId = this.props.userId;
        if (userId == undefined){
            return;
        }
        var isFirstLoading = (this.intervalId == undefined);
        NotificationMixin.loadUserNotifications(userId, 'new', function(list){
            var oldList = (this.state.notifications == undefined) ? [] : this.state.notifications;
            var newList = (list == undefined) ? [] : list;
            if (oldList.length < newList.length){
                if (isFirstLoading == false){
                    this.playSound();
                }
            }
            this.setState({
                notifications: list
            });
            if (callback != undefined){
                callback(list);
            }
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.spanStyle);
        var list = this.state.notifications;
        if (list == undefined || list.length == 0){
            st = assign(st, {display: 'none'});
        }

        return (
            <div style={st} className={this.props.spanClassName} >
                +{list.length}
            </div>
        );
    }

});

module.exports = NotificationsNumberSpan;