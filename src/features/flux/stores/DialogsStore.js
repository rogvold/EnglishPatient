/**
 * Created by sabir on 02.02.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');
var DialogMixin = require('../../mixins/DialogMixin');
var LoginMixin = require('../../mixins/LoginMixin');

var DialogsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.dialogsMap = {};
        this.loading = false;

        this.bindActions(
            constants.LOAD_DIALOG, this.loadDialog,
            constants.LOAD_DIALOG_SUCCESS, this.loadedDialog,

            constants.LOAD_DIALOGS_BY_IDS, this.loadDialogsByIds,
            constants.LOAD_DIALOGS_BY_IDS_SUCCESS, this.loadedDialogsByIds,

            constants.LOAD_TEACHER_DIALOGS, this.loadTeacherDialogs,
            constants.LOAD_TEACHER_DIALOGS_SUCCESS, this.loadedTeacherDialogs,

            constants.LOAD_COMMUMITY_DIALOGS, this.loadCommunityDialogs,
            constants.LOAD_COMMUMITY_DIALOGS_SUCCESS, this.loadedCommunityDialogs

        );
    },

    consumeDialogs: function(dialogs){
        if (dialogs == undefined || dialogs.length == 0){
            return;
        }
        for (var i in dialogs){
            var d = dialogs[i];
            this.dialogsMap[d.id] = d;
        }
    },

    loadDialog: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedDialog: function(payload){
        var dialog = payload.dialog;
        this.consumeDialogs([dialog]);
        this.loading = false;
        this.emit('change');
    },

    loadDialogsByIds: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedDialogsByIds: function(payload){
        var dialogs = payload.dialogs;
        this.consumeDialogs(dialogs);
        this.loading = false;
        console.log('loadedDialogsByIds: dialogs = ', dialogs);
        this.emit('change');
    },

    loadTeacherDialogs: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedTeacherDialogs: function(payload){
        var dialogs = payload.dialogs;
        this.consumeDialogs(dialogs);
        this.loading = false;
        console.log('loadedTeacherDialogs: dialogs = ', dialogs);
        this.emit('change');
    },

    loadCommunityDialogs: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedCommunityDialogs: function(payload){
        var dialogs = payload.dialogs;
        this.consumeDialogs(dialogs);
        this.loading = false;
        console.log('loadedCommunityDialogs: dialogs = ', dialogs);
        this.emit('change');
    },

    getCurrentUserId: function(){
        var user = LoginMixin.getCurrentUser();
        if (user == undefined){
            return undefined;
        }
        return user.id;
    },

    getCommunityTeachersDialogsList: function(teacherId){
        var arr = [];
        var map = this.dialogsMap;
        var usersMap = {};
        var currentUserId = this.getCurrentUserId();

        for (var key in map){
            var dialog = map[key];
            if (dialog.creatorId == teacherId){
                continue;
            }
            if (usersMap[dialog.creatorId] == undefined){
                usersMap[dialog.creatorId] = [];
            }
            usersMap[dialog.creatorId].push(dialog);
        }

        if (teacherId == undefined){
            if (usersMap[currentUserId] != undefined){
                arr.push({
                    userId: currentUserId,
                    dialogs: usersMap[currentUserId]
                });
            }
        }

        for (var key in usersMap){
            if ((key == currentUserId) && (teacherId == undefined)){
                continue;
            }
            arr.push({
                userId: key,
                dialogs: usersMap[key]
            });
        }
        return arr;
    }

});

module.exports = DialogsStore;