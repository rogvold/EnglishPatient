/**
 * Created by sabir on 08.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var UserMixin = require('./UserMixin');

var SocialMixin = {

    transformPost: function(p){
        return {
            creatorId: p.get('creatorId'),
            id: p.id,
            postId: undefined,
            imageUrl: p.get('imageUrl'),
            text: p.get('text'),
            vimeoId: p.get('vimeoId'),
            timestamp: (new Date(p.createdAt)).getTime()
        }
    },

    loadPostById: function(postId, callback){
        if (postId == undefined){
            return;
        }
        var q = new Parse.Query('SocialPost');
        q.get(postId, {
            success: function(p){
                callback(p);
            }
        });
    },

    loadPost: function(postId, callback){
        var self = this;
        this.loadPostById(postId, function(p){
            var post = self.transformPost(p);
            callback(post);
        });
    },

    updatePost: function(postId, data, callback){
        var self = this;
        this.loadPostById(postId, function(p){
            p = ParseMixin.safeSet(p, [
                {name: 'text', value: data.text},
                {name: 'imageUrl', value: data.imageUrl},
                {name: 'vimeoId', value: data.vimeoId}
            ]);
            p.save().then(function(savedPost){
                var post = self.transformPost(savedPost);
                callback(post);
            });
        });
    },

    createPost: function(creatorId, data, callback){
        var self = this;
        var SocialPost = Parse.Object.extend('SocialPost');
        var p = new SocialPost();
        p.set('creatorId', creatorId);
        p = ParseMixin.safeSet(p, [
            {name: 'text', value: data.text},
            {name: 'imageUrl', value: data.imageUrl},
            {name: 'vimeoId', value: data.vimeoId}
        ]);
        p.save().then(function(savedPost){
            var post = self.transformPost(savedPost);
            callback(post);
        });
    },

    deletePost: function(postId, callback){
        var self = this;
        this.loadPostById(postId, function(p){
            p.destroy({
                success: function(){
                    callback();
                }
            });
        });
    },

    loadUsers: function(posts, callback){
        var ids = posts.map(function(p){
            var creatorId = p.get('creatorId');
            if (creatorId == undefined){
                creatorId = p.creatorId;
            }
            return creatorId;
        });
    },

    loadTeacherPosts: function(teacherId, callback){
        if (teacherId == undefined){
            return;
        }
        var q = new Parse.Query('SocialPost');
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('creatorId', teacherId);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                callback([]);
                return;
            }
            var arr = results.map(function(p){
                return self.transformPost(p);
            });
            callback(arr);
        });
    }

};

module.exports = SocialMixin;