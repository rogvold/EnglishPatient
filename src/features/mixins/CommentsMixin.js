/**
 * Created by sabir on 13.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var UserMixin = require('./UserMixin');
var LoginMixin = require('./LoginMixin');

var moment = require('moment');

var CommentsMixin ={

    transformComment: function(c){
        return {
            id: c.id,
            content: c.get('content'),
            attachments: (c.get('attachments') == undefined) ? [] : c.get('attachments'),
            timestamp: (new Date(c.createdAt)).getTime(),
            relatedId: c.get('relatedId'),
            userId: c.get('userId')
        }
    },

    loadComment: function(commentId, callback){
        if (commentId == undefined){
            return;
        }
        var self = this;
        var q = new Parse.Query('PatientComment');
        q.get(commentId, {
            success: function(c){
                var comment = self.transformComment(c);
                callback(comment);
            }
        });
    },

    loadCommentsForRelatedObjectsList: function(objectIdsList, callback){
        if (objectIdsList == undefined || objectIdsList.length == 0){
            return;
        }
        var q = new Parse.Query('PatientComment');
        q.containedIn('relatedId', objectIdsList);
        q.limit(1000);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(c){
                return self.transformComment(c);
            });
            callback(arr);
        });
    },

    makeComment: function(relatedObjectId, content, attachments, callback){
        var PatientComment = Parse.Object.extend('PatientComment');
        var c = new PatientComment();
        var user = LoginMixin.getCurrentUser();
        if (user == undefined){
            callback();
            return;
        }
        if (relatedObjectId == undefined){
            callback();
            return;
        }
        c.set('userId', user.id);
        attachments = (attachments == undefined) ? [] : attachments;
        c = ParseMixin.safeSet(c, [
            {name: 'relatedId', value: relatedObjectId},
            {name: 'content', value: content},
            {name: 'attachments', value: attachments}
        ]);
        var self = this;
        c.save().then(function(com){
            var comment = self.transformComment(com);
            callback(comment);
        });
    },

    commentsForObjectAreLoaded: function(relatedId){
        return (this.commentsMap[relatedId] != undefined);
    }


}

module.exports = CommentsMixin;