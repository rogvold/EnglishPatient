/**
 * Created by sabir on 06.01.16.
 */

var assign = require('object-assign');
var Parse = require('parse').Parse;
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../react/mixins/commonMixins/CommonMixin');
var UserMixin = require('./UserMixin');
var ClassMixin = require('./ClassMixin');

var $ = require('jquery');

var ArticleMixin = {

    transformArticle: function(a){
        return {
            id: a.id,
            articleId: a.id,
            timestamp: (new Date(a.createdAt)).getTime(),
            name: a.get('name'),
            description: a.get('description'),
            content: a.get('content'),
            vocabulary: (a.get('vocabulary') == undefined) ? [] : a.get('vocabulary'),
            avatar: a.get('imgSrc'),
            ownerId: a.get('ownerId'),
            albumId: a.get('albumId')
        }
    },

    loadArticleById: function(articleId, callback){
        if (articleId == undefined){
            return;
        }
        var q = new Parse.Query('PatientArticle');
        q.get(articleId, {
            success: function(a){
                callback(a);
            }
        });
    },

    loadArticle: function(articleId, callback){
        console.log('loading article: id = ', articleId);
        var self = this;
        this.loadArticleById(articleId, function(a){
            var art = self.transformArticle(a);
            callback(art);
        });
    },

    loadTeacherArticles: function(teacherId, callback){
        if (teacherId == undefined){
            return;
        }
        var q = new Parse.Query('PatientArticle');
        q.equalTo('ownerId', teacherId);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(a){
                return self.transformArticle(a);
            });
            arr.sort(function(a1, a2){return a2.timestamp - a1.timestamp});

            callback(arr);
        });
    },

    loadTeacherArticlesCount: function(teacherId, callback){
        var q = new Parse.Query('PatientArticle');
        q.equalTo('ownerId', teacherId);
        q.count({
            success: function(n){
                callback(n);
            }
        });
    },

    createArticle: function(ownerId, data, callback){
        if (ownerId == undefined){
            return;
        }
        var PatientArticle = Parse.Object.extend('PatientArticle');
        var a = new PatientArticle();
        var self = this;
        a.set('ownerId', ownerId);
        a = ParseMixin.safeSet(a, [
            {name: 'name', value: data.name},
            {name: 'description', value: data.description},
            {name: 'imgSrc', value: data.avatar},
            {name: 'vocabulary', value: data.vocabulary},
            {name: 'content', value: data.content},
            {name: 'albumId', value: data.albumId}
        ]);
        a.save().then(function(savedA){
            var art = self.transformArticle(savedA);
            callback(art);
        });
    },

    updateArticle: function(articleId, data, callback){
        var self = this;
        this.loadArticleById(articleId, function(a){
            a = ParseMixin.safeSet(a, [
                {name: 'name', value: data.name},
                {name: 'description', value: data.description},
                {name: 'imgSrc', value: data.avatar},
                {name: 'vocabulary', value: data.vocabulary},
                {name: 'content', value: data.content},
                {name: 'albumId', value: data.albumId}
            ]);
            a.save().then(function(savedA){
                var art = self.transformArticle(savedA);
                callback(art);
            });
        });
    },

    loadCommunityAuthors: function(userId, callback){ //loads authors except for userId
        var q = new Parse.Query('PatientArticle');
        q.limit(1000);
        if (userId != undefined){
            q.notEqualTo('ownerId', userId);
        }
        q.find(function(results){
            var map = {};
            for (var i in results){
                map[results[i].get('ownerId')] = 1;
            }
            var ids = [];
            for (var key in map){
                ids.push(key);
            }
            callback(ids);
        });
    },

    //todo: remove this
    loadMigrationData: function(callback){
        var self = this;
        var q = new Parse.Query('PatientArticle');
        q.limit(1000);
        q.addDescending('createdAt');
        console.log('starting loading');
        q.find(function(results){
            var k = 0;
            console.log('loaded');
            var list = [];
            var map = {};
            for (var j in results){
                var art = results[j];
                map[art.id] = {
                    id: art.id,
                    name: art.get('name'),
                    iframes: []
                };


                var content = results[j].get('content');
                var iframes = $(content).find('iframe');

                iframes.each(function(ifr, fff){

                    if ((fff.src.indexOf('vimeo') == -1) && (fff.src.indexOf('youtube') == -1)){
                        map[art.id].iframes.push(fff.src);
                        k = k + 1;
                    }

                });
            }

            console.log(map);
            console.log(k);
            callback(map);

        });
    }

}

module.exports = ArticleMixin;