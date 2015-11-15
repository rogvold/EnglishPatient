/**
 * Created by sabir on 10.09.15.
 */
var constants = require('../Constants');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var AttachmentActions = {
    createAttachment: function(hostId, name, url){
        var fields = [{
            name: 'hostId',
            val: hostId
        }, {
            name: 'name',
            val: name
        }, {
            name: 'url',
            val: url
        }];
        ParseMixin.createParseObject('PatientAttachment', fields, function(a){
            this.dispatch(constants.ATTACHMENT_CREATED, {attachment: a});
        })
    },

    deleteAttachment: function(a){
        if (a == undefined){
            return;
        }
        var attachmentId = a.id;
        a.destroy({
            success: function(){
                this.dispatch(constants.ATTACHMENT_DELETED, {attachmentId: attachmentId});
            }.bind(this)
        });
    },

    loadAttachments: function(hostId){
        var q = new Parse.Query(Parse.Object.Extend('PatientAttachment'));
        q.limit(1000);
        q.addAscending('createdAt');
        q.find(function(results){
            this.dispatch(constants.ATTACHMENTS_LOADED, {attachments: results});
        }.bind(this));
    }


}