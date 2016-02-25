/**
 * Created by sabir on 17.02.16.
 */


var React = require('react');
var assign = require('object-assign');

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var CourseMixin = require('../../mixins/CourseMixin');

var CoursesActions = {

    loadCourse: function(courseId){
        if (courseId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_COURSE, {courseId: courseId});
        CourseMixin.loadCourse(courseId, function(course){
            console.log('course loaded: course = ', course);
            this.dispatch(constants.LOAD_COURSE_SUCCESS, {course: course});
        }.bind(this));
    },

    loadTeacherCourses: function(teacherId){
        if (teacherId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_TEACHER_COURSES, {teacherId: teacherId});
        CourseMixin.loadTeacherCourses(teacherId, function(courses){
            console.log('teacher courses loaded: courses = ', courses);
            this.dispatch(constants.LOAD_TEACHER_COURSES_SUCCESS, {courses: courses});
        }.bind(this));
    },

    loadCommunityCourses: function(teacherId){
        if (teacherId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_COMMUNITY_COURSES, {teacherId: teacherId});
        CourseMixin.loadCommunityCourses(teacherId, function(courses){
            console.log('community courses loaded: courses = ', courses);
            this.dispatch(constants.LOAD_COMMUNITY_COURSES_SUCCESS, {courses: courses});
        }.bind(this));
    }

}

module.exports = CoursesActions;