/**
 * Created by sabir on 10.02.16.
 */

var assign = require('object-assign');
var Notifications = require('react-notifications');

var constants = require('../constants');


var AlertActions = {

    showAlertNotification: function(title, message, notificationType){
        this.dispatch(constants.SHOW_ALERT_NOTIFICATION, {
            title: title,
            message: message,
            notificationType: notificationType
        });
    },

    hideAlertNotification: function(id){
        this.dispatch(constants.HIDE_ALERT_NOTIFICATION, {id: id});
    }

}

module.exports = AlertActions;