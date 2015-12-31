/**
 * Created by sabir on 29.12.15.
 */


var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var LikeMixin = {

    transformLike: function(m){
        return {
            id: m.id,
            className: m.get('relatedClassName'),
            userId: m.get('userId'),
            relatedObjectId: m.get('relatedObjectId')
        }
    },


    loadLikeById: function(id, callback){
        var q = new Parse.Query('PatientLike');
        q.get(id, {
            success: function(m){
                callback(m);
            }
        });
    },

    loadLike: function(id, callback){
        var self = this;
        this.loadLikeById(id, function(m){
            callback(self.transformLike(m));
        })
    },

    loadAllObjectLikes: function(objectId, className, callback){
        var q = new Parse.Query('PatientLike');
        var self = this;
        q.equalTo('relatedObjectId', objectId);
        q.equalTo('relatedClassName', className);
        q.limit(1000);
        q.find(function(results){
            var arr = results.map(function(r){
                return self.transformLike(r);
            });
            callback(arr);
        });
    },

    loadAllUserLikes: function(userId, className, callback){
        if (userId == undefined){
            return;
        }
        var self = this;
        var q = new Parse.Query('PatientLike');
        q.limit(1000);
        if (className != undefined){
            q.equalTo('relatedClassName', className);
        }
        q.equalTo('userId', userId);
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformLike(m);
            });
            callback(arr);
        });
    },

    loadUserLike: function(userId, objectId, className, callback){
        console.log('loadUserLike: userId, objectId, className = ', userId, objectId, className);
        if (userId == undefined || objectId == undefined || className == undefined){
            console.log('userId == undefined || objectId == undefined || className == undefined');
            return;
        }
        var q = new Parse.Query('PatientLike');
        q.equalTo('userId', userId);
        q.equalTo('relatedObjectId', objectId);
        q.equalTo('relatedClassName', className);
        var self = this;
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
                return;
            }
            var m = results[0];
            callback(self.transformLike(m));
        });
    },

    likeObject: function(userId, objectId, className, callback){
        console.log('likeObject: userId, objectId, className = ', userId, objectId, className);
        if (userId == undefined || objectId == undefined || className == undefined){
            return;
        }
        var self = this;
        var PatientLike = Parse.Object.extend('PatientLike');
        this.loadUserLike(userId, objectId, className, function(m){
            if (m != undefined){
                console.log('object is liked by this user');
                callback(m);
                return;
            }
            var like = new PatientLike();
            like.set('userId', userId);
            like.set('relatedClassName', className);
            like.set('relatedObjectId', objectId);
            like.save().then(function(savedLike){

                callback(self.transformLike(savedLike));
            });
        });
    },

    unLikeObject: function(userId, objectId, className, callback){
        console.log('unLikeObject: userId, objectId, className = ', userId, objectId, className);
        if (userId == undefined || objectId == undefined || className == undefined){
            return;
        }
        var q = new Parse.Query('PatientLike');
        q.equalTo('userId', userId);
        q.equalTo('relatedObjectId', objectId);
        q.equalTo('relatedClassName', className);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                console.log('this obj has already been unliked');
                callback();
                return;
            }
            var m = results[0];
            m.destroy({
                success: function(){
                    callback();
                }
            });
        });
    }

}

module.exports = LikeMixin;