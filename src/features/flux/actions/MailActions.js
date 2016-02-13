/**
 * Created by sabir on 10.02.16.
 */

var assign = require('object-assign');
var constants = require('../constants');
var MailAPI = require('../../api/MailAPI');

var MailActions = {

    showSendMailDialog: function(data){
        console.log('showSendMailDialog: data = ', data);
        this.dispatch(constants.SHOW_MAIL_DIALOG, data);
    },

    closeSendMailDialog: function(toUsersIds, subject, message){
        this.dispatch(constants.CLOSE_MAIL_DIALOG, {});
    },

    mailDataChanged: function(data){
        this.dispatch(constants.MAIL_DATA_CHANGE, data);
    },

    sendMail: function(){
        var store = this.flux.store('MailStore');
        var toUsersIds = store.toUsersIds;
        if (toUsersIds == undefined || toUsersIds.length == 0){
            return;
        }
        this.dispatch(constants.SEND_MAIL, {});
        var toEmail = this.flux.store('UsersStore').usersMap[toUsersIds[0]].email;
        var fromEmail = this.flux.store('UsersStore').getCurrentUser().email;
        MailAPI.sendEmail(toEmail, fromEmail, store.subject, store.message, function(){
            this.dispatch(constants.SEND_MAIL_SUCCESS);
            this.flux.actions.showAlertNotification('Сообщение отправлено', ' на почту пользователю ');
        }.bind(this), function(){
            this.flux.actions.showAlertNotification('Ошибка', ' при отправке сообщения');
        }.bind(this));
    }


}

module.exports = MailActions;