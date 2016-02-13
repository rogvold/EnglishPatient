/**
 * Created by sabir on 11.02.16.
 */

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var NotificationMixin = require('../../mixins/NotificationMixin');

var NotificationsActions = {

    loadTeacherNotifications: function(){
        var userId = LoginMixin.getCurrentUserId();
        this.dispatch(constants.LOAD_NOTIFICATIONS, {userId: userId});
        NotificationMixin.loadUserNotifications(userId, 'new', function(notifications){
            this.dispatch(constants.LOAD_NOTIFICATIONS_SUCCESS, {notifications: notifications});
        }.bind(this));
    },

    viewNotification: function(notificationId){
        this.dispatch(constants.VIEW_NOTIFICATION, {notificationId: notificationId});
        NotificationMixin.makeNotificationViewed(notificationId, function(){
            this.dispatch(constants.VIEW_NOTIFICATION_SUCCESS, {notificationId: notificationId});
        }.bind(this));
    }

}

module.exports = NotificationsActions;