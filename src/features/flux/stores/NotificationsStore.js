/**
 * Created by sabir on 11.02.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../constants');

var NotificationsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.notifications = [];

        this.bindActions(
            constants.LOAD_NOTIFICATIONS, this.loadNotifications,
            constants.LOAD_NOTIFICATIONS_SUCCESS, this.loadedNotifications,
            constants.VIEW_NOTIFICATION, this.viewNotification,
            constants.VIEW_NOTIFICATION_SUCCESS, this.viewNotificationSuccess
        );
    },

    loadNotifications: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedNotifications: function(payload){
        this.notifications = payload.notifications;
        this.loading = false;
        this.emit('change');
    },

    viewNotification: function(payload){
        this.loading = true;
        this.emit('change');
    },

    viewNotificationSuccess: function(payload){
        this.loading = false;
        var arr = [];
        var list = this.notifications;
        for (var i in list){
            if (list[i].id == payload.notificationId){
                continue;
            }
            arr.push(list[i]);
        }
        this.notifications = arr;
        this.emit('change');
    }

});

module.exports = NotificationsStore;