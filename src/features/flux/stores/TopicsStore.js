/**
 * Created by sabir on 25.01.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');
var LoginMixin = require('../../mixins/LoginMixin');

var TopicsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.topicsMap = {};
        this.loading = false;
        this.communityTopicsLoaded = false;
        this.teacherTopicsLoaded = false;

        this.bindActions(
            constants.LOAD_ALL_COMMUNITY_TOPICS, this.onLoadAllCommunityTopics,
            constants.LOAD_ALL_COMMUNITY_TOPICS_SUCCESS, this.onLoadedAllCommunityTopics,

            constants.LOAD_ALL_TEACHER_TOPICS, this.onLoadAllTeacherTopics,
            constants.LOAD_ALL_TEACHER_TOPICS_SUCCESS, this.onLoadedAllTeacherTopics,

            constants.REFRESH_TOPIC_INFO, this.onRefreshTopicInfo,
            constants.REFRESH_TOPIC_INFO_SUCCESS, this.onRefreshedTopicInfo,

            constants.DELETE_TOPIC, this.deleteTopic,
            constants.DELETE_TOPIC_SUCCESS, this.deleteTopicSuccess,

            constants.UPDATE_TOPIC, this.updateTopic,
            constants.CREATE_TOPIC, this.createTopic,
            constants.CREATE_TOPIC_SUCCESS, this.createTopicSuccess



        );
    },

    onLoadAllCommunityTopics: function(payload){
        if (this.communityTopicsLoaded == true){
            return;
        }
        this.loading = true;
        this.emit('change');
    },

    onLoadAllTeacherTopics: function(payload){
        if (this.teacherTopicsLoaded == true){
            return;
        }
        this.loading = true;
        this.emit('change');
    },

    onLoadedAllTeacherTopics: function(payload){
        var topics = payload.topics;
        if (topics == undefined){
            topics = [];
        }
        for (var i in topics){
            var topic = topics[i];
            this.topicsMap[topic.id] = topic;
        }
        this.loading = false;
        this.teacherTopicsLoaded = true;
        this.emit('change');
    },

    onLoadedAllCommunityTopics: function(payload){
        console.log(payload);
        var topics = payload.topics;
        if (topics == undefined){
            topics = [];
        }
        for (var i in topics){
            var topic = topics[i];
            this.topicsMap[topic.id] = topic;
        }
        this.loading = false;
        console.log('community topics loaded: topicsMap = ', this.topicsMap);
        this.emit('change');
    },

    onRefreshTopicInfo: function(payload){
        this.loading = true;
        this.emit('change');
    },

    onRefreshedTopicInfo: function(payload){
        var topic = payload.topic;
        if (topic == undefined){
            return;
        }
        this.topicsMap[topic.id] = topic;
        this.loading = false;
        this.emit('change');
    },

    deleteTopic: function(){
        this.loading = true;
        this.emit('change');
    },

    deleteTopicSuccess: function(payload){
        this.loading = false;
        var topicId = payload.topicId;
        this.topicsMap[topicId] = undefined;
        this.emit('change');
    },

    updateTopic: function(){
        this.loading = true;
        this.emit('change');
    },

    createTopic: function(){
        this.loading = true;
        this.emit('change');
    },

    createTopicSuccess: function(paylad){
        var topic = payload.topic;
        if (topic == undefined){
            return;
        }
        this.loading = false;
        this.topicsMap[topic.id] = topic;
        this.emit('change');
    },

    getTopicsByUserIdAndTopicType: function(userId, topicType){
        console.log('getTopicsByUserIdAndTopicType occured: userId, topicType = ', userId, topicType);
        console.log('topicsMap = ', this.topicsMap);
        var arr = [];
        var map = this.topicsMap;
        for (var key in map){
            var topic = map[key];
            if (topic == undefined){
                continue;
            }
            if (topicType != undefined && topic.topicType != topicType){
                continue;
            }
            if (topic.creatorId == userId){
                arr.push(topic);
            }
        }
        return arr;
    },

    getCommunityTopics: function(userId, topicType){
        if (topicType == undefined){
            topicType = 'basic';
        }
        var arr = [];
        var map = this.topicsMap;
        for (var key in map){
            var topic = map[key];
            if (topic == undefined){
                continue;
            }
            if (topic.topicType != topicType){
                continue;
            }
            if (topic.creatorId != userId){
                arr.push(topic);
            }
        }
        return arr;
    },

    getTopic: function(topicId){
        if (topicId == undefined){
            return undefined;
        }
        var map = this.topicsMap;
        return map[topicId];
    },

    getState: function(){
        return {
            topicsLoading: this.loading,
            topicsMap: this.topicsMap
        }
    }

});

module.exports = TopicsStore;