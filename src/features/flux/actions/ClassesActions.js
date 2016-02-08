/**
 * Created by sabir on 06.02.16.
 */

var Fluxxor = require('fluxxor');

var React = require('react');
var assign = require('object-assign');

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var ClassMixin = require('../../mixins/ClassMixin');

var ClassesActions = {

    loadClass: function(classId){
        this.dispatch(constants.LOAD_PATIENT_CLASS, {classId: classId});
        var self = this;
        ClassMixin.loadClass(classId, function(cl){
            ClassMixin.loadStudentsIdsMapByClasses([{id: classId}], function(map){
                cl.students = map[classId];
                self.dispatch(constants.LOAD_PATIENT_CLASS_SUCCESS, {patientClass: cl});
            });
        }.bind(this));
    },

    loadTeacherClasses: function(teacherId){
        console.log('ClassesActions: loadTeacherClasses occured: teacherId = ', teacherId);
        if (teacherId == undefined){
            teacherId = LoginMixin.getCurrentUserId();
        }
        var self = this;
        this.dispatch(constants.LOAD_TEACHER_CLASSES, {teacherId: teacherId});
        ClassMixin.loadTeacherClasses(teacherId, function(classes){
            ClassMixin.loadStudentsIdsMapByClasses(classes, function(map){
                for (var i in classes){
                    classes[i].students = (map[classes[i].id] == undefined) ? [] : map[classes[i].id];
                }
                console.log('classes loaded: ', classes);
                self.dispatch(constants.LOAD_TEACHER_CLASSES_SUCCESS, {classes: classes});
            }.bind(this));
        }.bind(this));
    }

};

module.exports = ClassesActions;