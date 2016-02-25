/**
 * Created by sabir on 17.02.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var CourseMixin = require('../../mixins/CourseMixin');
var LoginMixin = require('../../mixins/LoginMixin');

var CoursesStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.coursesMap = {};

        this.bindActions(
            constants.LOAD_COURSE, this.loadCourse,
            constants.LOAD_COURSE_SUCCESS, this.loadedCourse,

            constants.LOAD_TEACHER_COURSES, this.loadTeacherCourses,
            constants.LOAD_TEACHER_COURSES_SUCCESS, this.loadedTeacherCourses,

            constants.LOAD_COMMUNITY_COURSES, this.loadCommunityCourses,
            constants.LOAD_COMMUNITY_COURSES_SUCCESS, this.loadedCommunityCourses
        );
    },

    consumeCourses: function(courses){
        var list = (courses == undefined) ? [] : courses;
        for (var i in list){
            this.coursesMap[list[i].id] = list[i];
        }
    },

    loadCourse: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedCourse: function(payload){
        this.loading = false;
        this.consumeCourses([payload.course]);
        this.emit('change');
    },

    loadTeacherCourses: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedTeacherCourses: function(payload){
        this.loading = false;
        this.consumeCourses(payload.courses);
        this.emit('change');
    },

    loadCommunityCourses: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedCommunityCourses: function(payload){
        this.loading = false;
        this.consumeCourses(payload.courses);
        this.emit('change');
    },

    getTeacherCourses: function(teacherId){
        var map = this.coursesMap;
        var arr = [];
        for (var key in map){
            var c = map[key];
            if (c.creatorId == teacherId){
                arr.push(c);
            }
        }
        return arr;
    }


});

module.exports = CoursesStore;