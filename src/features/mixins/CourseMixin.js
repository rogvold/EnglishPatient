/**
 * Created by sabir on 30.12.15.
 */

var assign = require('object-assign');

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var TopicsMixin = require('./TopicsMixin');
var UserMixin = require('./UserMixin');

var moment = require('moment');

var FeedMixin = require('./FeedMixin');

var MixpanelHelper = require('../helpers/analytics/MixpanelHelper');

var CourseMixin = {

    transformCourse: function(c){
        return {
            id: c.id,
            courseId: c.id,
            name: c.get('name'),
            avatar: c.get('avatar'),
            creatorId: c.get('creatorId'),
            description: c.get('description'),
            duration: c.get('duration'),
            access: c.get('access'),
            timestamp: (new Date(c.createdAt)).getTime()
        }
    },

    transformLesson: function(l){
          return {
              id: l.id,
              lessonId: l.id,
              name: l.get('name'),
              description: l.get('description'),
              number: l.get('number'),
              duration: l.get('duration'),
              avatar: l.get('avatar'),
              timestamp: (new Date(l.createdAt)).getTime()
          }
    },

    loadCourseById: function(id, callback){
        if (id == undefined){
            return;
        }
        var q = new Parse.Query('PatientCourse');
        q.get(id, {
            success: function(c){
                callback(c);
            }
        });
    },

    loadCourse: function(id, callback){
        var self = this;
        this.loadCourseById(id, function(c){
            callback(self.transformCourse(c));
        });
    },

    loadTeacherCourses: function(teacherId, callback){
        var q = new Parse.Query('PatientCourse');
        q.limit(1000);
        var self = this;
        q.equalTo('creatorId', teacherId);
        q.find(function(results){
            var arr = results.map(function(c){return self.transformCourse(c)});
            callback(arr);
        }.bind(this));
    },

    loadCommunityCourses: function(teacherId, callback){
        var q = new Parse.Query('PatientCourse');
        q.limit(1000);
        var self = this;
        q.notEqualTo('creatorId', teacherId);
        q.equalTo('access', 'public');
        q.find(function(results){
            var arr = results.map(function(c){return self.transformCourse(c)});
            callback(arr);
        }.bind(this));
    },


    loadTeacherCoursesCount: function(teacherId, callback){
        var q = new Parse.Query('PatientCourse');
        var self = this;
        q.equalTo('creatorId', teacherId);
        q.count({
            success: function(n){
                callback(n);
            }
        });
    },

    createCourse: function(userId, data, callback){
        console.log('CourseMixin: createCourse: userId, data = ', userId, data);
        if (userId == undefined){
            return;
        }
        var access = (data.access == undefined) ? 'private' : data.access;
        var PatientCourse = Parse.Object.extend('PatientCourse');
        var p = new PatientCourse();
        p.set('creatorId', userId);
        p = ParseMixin.safeSet(p, [
            {name: 'name', value: data.name},
            {name: 'description', value: data.description},
            {name: 'duration', value: data.duration},
            {name: 'access', value: access},
            {name: 'avatar', value: data.avatar}
        ]);
        var self = this;
        p.save().then(function(savedP){
            var l = self.transformCourse(savedP);
            MixpanelHelper.track('courseCreated', l);
            callback(l);
        });
    },

    updateCourse: function(courseId, data, callback){
        console.log('updateCourse occured: data = ', data);
        var self = this;
        var access = (data.access == undefined) ? 'private' : data.access;
        this.loadCourseById(courseId, function(p){
            p = ParseMixin.safeSet(p, [
                {name: 'name', value: data.name},
                {name: 'access', value: access},
                {name: 'description', value: data.description},
                {name: 'duration', value: data.duration},
                {name: 'avatar', value: data.avatar}
            ]);
            p.save().then(function(savedP){
                callback(self.transformCourse(savedP));
            });
        });
    },

    deleteCourse: function(courseId, callback){
        if (courseId == undefined){
            return;
        }
        this.loadCourseById(courseId, function(c){
            c.destroy({
                success: function(){
                    callback();
                }
            });
        });
    },

    loadCourseLessons: function(courseId, callback){
        console.log('loadCourseLessons occured: courseId = ', courseId);
        if (courseId == undefined){
            return;
        }
        var q = new Parse.Query('CourseLesson');
        q.limit(1000);
        q.addAscending('number');
        q.equalTo('courseId', courseId);
        q.limit(1000);
        var self = this;
        q.find(function(results){
            console.log('lessons loaded: results = ', results);
            if (results == undefined || results.length == 0){
                callback([]);
                return;
            }
            var arr = results.map(function(l){
                return self.transformLesson(l);
            });
            console.log('lessons loaded: ', arr);
            callback(arr);
        });
    },

    loadLessonById: function(lessonId, callback){
        if (lessonId == undefined){
            return;
        }
        var q = new Parse.Query('CourseLesson');
        q.get(lessonId, {
            success: function(l){
                callback(l);
            }
        });
    },

    loadLesson: function(lessonId, callback){
        var self = this;
        this.loadLessonById(lessonId, function(l){
            FeedMixin.loadFeedByCourseLessonId(l.id, function(feed){
                var le = self.transformLesson(l);
                le.feedId = feed.id;
                callback(le);
            });
        });
    },

    createLesson: function(courseId, data, callback){
        if (courseId == undefined){
            return;
        }
        var self = this;
        var CourseLesson = Parse.Object.extend('CourseLesson');
        var l = new CourseLesson();
        l.set('courseId', courseId);
        l = ParseMixin.safeSet(l, [
            {name: 'name', value: data.name},
            {name: 'duration', value: data.duration},
            {name: 'avatar', value: data.avatar},
            {name: 'description', value: data.description}
        ]);
        this.loadCourseLessons(courseId, function(results){
            var number = results.length;
            l.set('number', number);
            l.save().then(function(savedLesson){
                FeedMixin.loadFeedByCourseLessonId(savedLesson.id, function(feed){
                    var le = self.transformLesson(savedLesson);
                    le.feedId = feed.id;
                    MixpanelHelper.track('lessonCreated', le);
                    callback(le);
                });
            });
        });
    },

    updateLesson: function(lessonId, data, callback){
        var self = this;
        this.loadLessonById(lessonId, function(l){
            l = ParseMixin.safeSet(l, [
                {name: 'name', value: data.name},
                {name: 'duration', value: data.duration},
                {name: 'description', value: data.description},
                {name: 'avatar', value: data.avatar}
            ]);
            l.save().then(function(savedLesson){
                callback(self.transformLesson(savedLesson));
            });
        });
    },


    deleteLesson: function(lessonId, callback){
        var self = this;
        console.log('deleteLesson occured: lessonId = ', lessonId);
        FeedMixin.loadFeedByCourseLessonId(lessonId, function(feed){
            console.log('feed loaded: ', feed);
            if (feed == undefined){
                return;
            }
            feed.destroy({
                success: function(){
                    console.log('feed destroyed');
                    self.loadLessonById(lessonId, function(lesson){
                        console.log('lesson loaded: lesson = ', lesson);
                        lesson.destroy({
                            success: function(){
                                console.log('lesson destroyed');
                                callback();
                            }
                        });
                    })
                }
            });
        });
    },

    loadOtherCourseCreators: function(userId, callback){
        var q = new Parse.Query('PatientCourse');
        if (userId != undefined){
            q.notEqualTo('creatorId', userId);
        }
        q.equalTo('access', 'public');
        q.limit(1000);
        q.find(function(results){
            var map = {};
            for (var i in results){
                map[results[i].get('creatorId')] = 1;
            }
            var arr = [];
            for (var key in map){
                arr.push(key);
            }
            callback(arr);
        });
    }


};

module.exports = CourseMixin;