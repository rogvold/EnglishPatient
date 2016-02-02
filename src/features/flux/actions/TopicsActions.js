/**
 * Created by sabir on 25.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var TopicsMixin = require('../../mixins/TopicsMixin');
var LoginMixin = require('../../mixins/LoginMixin');

var constants = require('../constants');

var TopicsActions = {

    loadTeacherTopics: function(teacherId, topicType, callback){
        if (teacherId == undefined){
            teacherId = LoginMixin.getCurrentUser().id;
        }
        this.dispatch(constants.LOAD_ALL_TEACHER_TOPICS, {teacherId: teacherId});
        TopicsMixin.loadTeacherTopics(teacherId, topicType, function(topics){
            this.dispatch(constants.LOAD_ALL_TEACHER_TOPICS_SUCCESS, {topics: topics, teacherId: teacherId});
            if (callback != undefined){
                callback();
            }
        }.bind(this));
    },

    loadCommunityTopics: function(teacherId, topicId, callback){
        if (teacherId == undefined){
            teacherId = LoginMixin.getCurrentUser().id;
        }
        this.dispatch(constants.LOAD_ALL_COMMUNITY_TOPICS, {teacherId: teacherId});
        TopicsMixin.loadCommunityTopics(teacherId, topicType, function(topics){
            this.dispatch(constants.LOAD_ALL_COMMUNITY_TOPICS_SUCCESS, {teacherId: teacherId, topics: topics});
            if (callback != undefined){
                callback();
            }
        }.bind(this));
    },

    loadAllTopics: function(teacherId, topicType){
        console.log('TopicsActions: loadAllTopics occured');
        var self = this;
        var user = LoginMixin.getCurrentUser();
        if (teacherId == undefined){
            if (user == undefined){
                return;
            }
            teacherId = user.id;
        }
        self.dispatch(constants.LOAD_ALL_TEACHER_TOPICS, {teacherId: teacherId});
        TopicsMixin.loadTeacherTopics(teacherId, topicType, function(teacherTopics){
            console.log('TopicsActions: teacher topics loaded: ', teacherTopics);
            self.dispatch(constants.LOAD_ALL_TEACHER_TOPICS_SUCCESS, {topics: teacherTopics, teacherId: teacherId});
            self.dispatch(constants.LOAD_ALL_COMMUNITY_TOPICS, {teacherId: teacherId});
            TopicsMixin.loadCommunityTopics(teacherId, topicType, function(topics){
                console.log('TopicsActions: community topics loaded: ', topics);
                self.dispatch(constants.LOAD_ALL_COMMUNITY_TOPICS_SUCCESS, {teacherId: teacherId, topics: topics});
                var allTopics = teacherTopics.concat(topics);
                var userIds = allTopics.map(function(t){return t.creatorId});

                console.log('!!!---!!! TopicsActions: loading users for topics');
                this.flux.actions.loadUsersByIds(userIds);

                var topicsIds = allTopics.map(function(top){return top.id});
                self.flux.actions.loadGroupsByTopicsIds(topicsIds);

            }.bind(this));
        }.bind(this));
    },

    refreshTopic: function(topicId){
        if (topicId == undefined){
            return;
        }
        this.dispatch(constants.REFRESH_TOPIC_INFO, {topicId: topicId});
        TopicsMixin.loadTopic(topicId, function(topic){
            this.dispatch(constants.REFRESH_TOPIC_INFO_SUCCESS, {topic: topic});
        }.bind(this));
    }

};

module.exports = TopicsActions;