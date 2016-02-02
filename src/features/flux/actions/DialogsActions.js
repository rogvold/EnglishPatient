/**
 * Created by sabir on 02.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var DialogMixin = require('../../mixins/DialogMixin');

var ExercisesActions = {

    loadDialog: function(dialogId){
        if (dialogId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_DIALOG, {dialogId: dialogId});
        DialogMixin.loadDialog(dialogId, function(dialog){
            this.dispatch(constants.LOAD_DIALOG_SUCCESS, {dialog: dialog});
        }.bind(this))
    },

    loadDialogsByIds: function(dialogsIds){
        if (dialogsIds == undefined || dialogsIds.length == 0){
            return;
        }
        this.dispatch(constants.LOAD_DIALOGS_BY_IDS, {dialogsIds: dialogsIds});
        DialogMixin.loadDialogsByIds(dialogsIds, function(dialogs){
            this.dispatch(constants.LOAD_DIALOGS_BY_IDS_SUCCESS, {
                dialogs: dialogs
            });
        }.bind(this));
    },

    loadTeacherDialogs: function(teacherId, callback){
        if (teacherId == undefined){
            var user = LoginMixin.getCurrentUser();
            if (user != undefined){
                teacherId = user.id;
            }
        }
        if (teacherId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_TEACHER_DIALOGS, {teacherId: teacherId});
        DialogMixin.loadTeacherDialogs(teacherId, function(dialogs){
            this.dispatch(constants.LOAD_TEACHER_DIALOGS_SUCCESS, {dialogs: dialogs});
            if (callback != undefined){
                callback(dialogs);
            }
        }.bind(this));
    },

    loadCommunityDialogs: function(teacherId, callback){
        if (teacherId == undefined){
            var user = LoginMixin.getCurrentUser();
            if (user != undefined){
                teacherId = user.id;
            }
        }
        if (teacherId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_COMMUMITY_DIALOGS, {teacherId: teacherId});
        DialogMixin.loadCommunityDialogs(teacherId, function(dialogs){
            this.dispatch(constants.LOAD_COMMUMITY_DIALOGS_SUCCESS, {dialogs: dialogs});
            if (callback != undefined){
                callback(dialogs);
            }
        }.bind(this));
    },

    loadAllDialogs: function(teacherId){
        var arr = [];
        var self = this;
        this.flux.actions.loadTeacherDialogs(teacherId, function(dlgs){
            if (dlgs == undefined){
                dlgs = [];
            }
            arr = arr.concat(dlgs);
            self.flux.actions.loadCommunityDialogs(teacherId, function(dialogs){
                arr = arr.concat(dialogs);
                var userIds = arr.map(function(d){return d.creatorId});
                self.flux.actions.loadUsersByIds(userIds);
            });
        });
    }


}

module.exports = ExercisesActions;