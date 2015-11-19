/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotificationItem = require('./NotificationItem');

var NotificationsList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,

            notifications: [],

            notificationViewed: function(no){

            }

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
            maxWidth: 660,
            margin: '0 auto'
        },

        notificationsPlaceholder: {

        }
    },

    notificationViewed: function(no){
        this.props.notificationViewed(no);
    },

    render: function () {
        var list = this.props.notifications;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.notificationsPlaceholder}>

                    {list.map(function(n, k){
                        var key = 'notification_' + k + '_' + n.id;
                        return (
                            <NotificationItem key={key}
                                              notificationViewed={this.notificationViewed}
                                              notificationId={n.id}
                                              userId={this.props.userId}
                                              status={n.status}
                                              name={n.name}
                                              timestamp={n.timestamp}
                                              attachment={n.attachment}
                                              forRole={n.forRole}
                                              content={n.content}
                                />
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = NotificationsList;