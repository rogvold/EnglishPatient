/**
 * Created by sabir on 10.02.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');

var MailStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.sending = false;
        this.dialogVisible = false;
        this.message = undefined;
        this.subject = undefined;
        this.toUsersIds = [];

        this.bindActions(
            constants.SHOW_MAIL_DIALOG, this.showMailDialog,
            constants.CLOSE_MAIL_DIALOG, this.closeMailDialog,
            constants.SEND_MAIL, this.sendMail,
            constants.SEND_MAIL_SUCCESS, this.sendMailSuccess,
            constants.MAIL_DATA_CHANGE, this.mailDataChanged
        );
    },


    showMailDialog: function(payload){
        console.log('MailStore: showMailDialog: payload = ', payload);
        this.dialogVisible = true;
        for (var key in payload){
            console.log('payload[key] = ', payload[key], ' key = ', key);
            this[key] = payload[key];
        }
        this.emit('change');
    },

    closeMailDialog: function(payload){
        this.dialogVisible = false;
        this.message = undefined;
        this.subject = undefined;
        this.toUsersIds = [];
        this.emit('change');
    },

    sendMail: function(payload){
        this.dialogVisible = true;
        this.sending = true;
        this.emit('change');
    },

    sendMailSuccess: function(payload){
        this.sending = false;
        this.dialogVisible = false;
        this.emit('change');
    },

    mailDataChanged: function(payload){
        //this.message = payload.message;
        //this.subject = payload.subject;
        //this.toUsersIds = payload.toUsersIds;
        for (var key in payload){
            this[key] = payload[key];
        }
        this.emit('change');
    }


});

module.exports = MailStore;