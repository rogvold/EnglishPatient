/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotificationMixin = require('../../mixins/NotificationMixin');

var NotificationsNumberSpan = React.createClass({
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


    load: function(callback){
        var userId = this.props.userId;
        if (userId == undefined){
            return;
        }
        NotificationMixin.loadUserNotifications(userId, 'new', function(list){
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