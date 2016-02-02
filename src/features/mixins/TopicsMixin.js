/**
 * Created by sabir on 12.11.15.
 */

var Parse = require('parse').Parse;
var FeedMixin = require('./FeedMixin');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../react/mixins/commonMixins/CommonMixin');

var MaterialsMixin = require('./MaterialsMixin');

var TopicsMixin = {

    transformTopic: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            topicId: p.id,
            name: p.get('name'),
            creatorId: p.get('creatorId'),
            description: p.get('description'),
            avatar: p.get('avatar'),
            access: p.get('access'),
            topicType: p.get('topicType')
        }
    },

    loadTeacherTopics: function(teacherId, topicType, callback){
        if (teacherId == undefined){
            callback([]);
            return;
        }

        //if (topicType == undefined){
        //    topicType = 'basic';
        //}

        var q = new Parse.Query('PatientTopic');
        q.limit(1000);
        q.addDescending('createdAt');

        if (topicType != undefined){
            q.equalTo('topicType', topicType);
        }

        q.equalTo('creatorId', teacherId);
        var self = this;
        q.find(function(results){
            var arr = results.map(function(p){
                return self.transformTopic(p);
            });
            callback(arr);
        });
    },

    loadCommunityTopics: function(teacherId, topicType, callback){
        if (teacherId == undefined){
            callback([]);
            return;
        }
        if (topicType == undefined){
            topicType = 'basic';
        }
        var q = new Parse.Query('PatientTopic');
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('topicType', topicType);
        q.equalTo('access', 'public');
        q.notEqualTo('creatorId', teacherId);
        var self = this;
        q.find(function(results){
            var arr = results.map(function(p){
                return self.transformTopic(p);
            });
            callback(arr);
        });
    },


    loadGrammarTopics: function(teacherId, callback){
        var q = new Parse.Query('PatientTopic');
        q.limit(1000);
        q.equalTo('creatorId', teacherId);
        q.equalTo('topicType', 'grammar');
        var self = this;
        q.find(function(results){
            var arr = results.map(function(p){
                return self.transformTopic(p)
            });
            callback(arr);
        });
    },

    loadTopicById: function(topicId, callback){
        if (topicId == undefined){
            return undefined;
        }
        var q = new Parse.Query('PatientTopic');
        var self = this;
        q.get(topicId, {
            success: function(topic){
                callback(topic);
            }
        });
    },

    loadTopic: function(topicId, callback){
        var self = this;
        this.loadTopicById(topicId, function(p){
            callback(self.transformTopic(p));
        });
    },

    createTopic: function(teacherId, name, description, avatar, access, topicType, callback){
        console.log('createTopic occured', teacherId, name, description, avatar, access);
        if (teacherId == undefined){
            callback(undefined);
            return;
        }
        var PatientTopic = Parse.Object.extend('PatientTopic');
        var p = new PatientTopic();
        p.set('creatorId', teacherId);
        p = ParseMixin.safeSet(p,
            [{name: 'name', value: name},
            {name: 'description', value: description},
            {name: 'avatar', value: avatar},
            {name: 'topicType', value: topicType},
            {name: 'access', value: access}]
        );
        var self = this;
        p.save().then(function(t){
            callback(self.transformTopic(t));
        });
    },

    updateTopic: function(topicId, name, description, avatar, access, callback){
        if (topicId == undefined){
            callback(undefined);
            return;
        }
        var self = this;
        this.loadTopicById(topicId, function(p){
            if (p == undefined){
                callback(undefined);
                return;
            }
            p = ParseMixin.safeSet(p, [{name: 'name', value: name},
                {name: 'description', value: description},
                {name: 'avatar', value: avatar},
                {name: 'access', value: access}]
            );
            p.save().then(function(up){
                callback(self.transformTopic(up));
            });
        });
    },

    deleteTopic: function(topicId, callback){
        console.log('deleteTopic occured: topicId = ', topicId);
        if (topicId == undefined){
            callback();
            return;
        }
        var self = this;
        this.loadTopicById(topicId, function(p){
            if (p == undefined){
                callback();
                return;
            }
            console.log('destroying topic ', p);
            p.destroy({
                success: function(){
                    console.log('firing the callback');
                    callback();
                }
            });
        });
    },

    loadTopicMaterialGroups: function(topicId, callback){
        var q = new Parse.Query('MaterialGroup');
        if (topicId != undefined){
            q.equalTo('topicId', topicId);
        }
        q.limit(1000);
        q.find(function(results){
            var arr = (results == undefined) ? [] : results.map(function(r){
                return MaterialsMixin.transformGroup(r);
            });
            callback(arr);
        });
    },

    loadTopicGroupsAndMaterials: function(topicId, callback){
        var self = this;
        var MM = MaterialsMixin;
        this.loadTopicMaterialGroups(topicId, function(groups){
            console.log('--->>>> GROUPS LOADED: ', groups);
            var ids = groups.map(function(g){return g.id});
            //var q = new Parse.Query('PatientMaterial');
            //q.limit(1000);
            //q.containedIn('groups', ids);
            //var self = this;
            //ParseMixin.loadAllDataFromParse(q, function(list){
            //    var materials = list.map(function(m){
            //        return MM.transformMaterialFromParseObject(m);
            //    });
            //    var res = MaterialsMixin.getGroupsFactoryList(groups, materials, false);
            //    callback(res);
            //});

            MM.loadMaterialsInGroupsList(ids, function(materials){
                var res = MaterialsMixin.getGroupsFactoryList(groups, materials, false);
                callback(res);
            });
        });
    }

}

module.exports = TopicsMixin;
