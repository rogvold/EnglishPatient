/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotificationsList = require('./NotificationsList');
var PagedNotificationsList = require('./PagedNotificationsList');

var NotificationMixin = require('../../mixins/NotificationMixin');

var SelfLoadingNotificationsList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            notifications: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(function(list){
            console.log('notifications loaded: ', list);
        });
    },

    load: function(callback){
        var userId = this.props.userId;
        if (userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        NotificationMixin.loadUserNotifications(userId, 'new', function(list){
            this.setState({
                loading: false,
                notifications: list
            });
            if (callback != undefined){
                callback(list);
            }
        }.bind(this));
    },

    notificationViewed: function(no){
        console.log('SelfLoadingNotificationsList: notificationViewed occured: no = ', no);
        var list = this.state.notifications;
        var arr = [];
        for (var i in list){
            if (list[i].id == no.id){
                //arr.push(no);
                continue;
            }else{
                arr.push(list[i]);
            }
        }
        console.log('updated notifications: ', arr);
        this.setState({
            notifications: arr
        });
    },

    componentStyle: {
        placeholder: {

        },

        notificationsPlaceholder: {

        },

        notificationsHeaderPanel: {
            width: 652,
            margin: '0 auto',
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1'
        }
    },

    render: function () {
        var list = (this.state.notifications == undefined) ? [] : this.state.notifications;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.notificationsHeaderPanel}>
                    <div style={{fontSize: '16px', fontWeight: 'bold'}} >
                        Мои уведомления
                    </div>
                    <div>
                        {list.length == 0 ?
                            <div>
                                У вас нет непрочитанных уведомлений
                            </div> :
                            <div>
                                Количество непросмотренных уведомлений: <b>{list.length}</b>
                            </div>
                        }
                    </div>
                </div>

                <div style={this.componentStyle.notificationsPlaceholder}>
                    <PagedNotificationsList
                        pageSize={5}
                        notificationViewed={this.notificationViewed}
                        notifications={this.state.notifications}
                        userId={this.props.userId} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingNotificationsList;