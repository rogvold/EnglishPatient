/**
 * Created by sabir on 07.02.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');
var ClassMixin = require('../../mixins/ClassMixin');
var LoginMixin = require('../../mixins/LoginMixin');

var ClassesStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.classesMap = {};
        this.loading = false;

        this.bindActions(
            constants.LOAD_PATIENT_CLASS, this.loadPatientClass,
            constants.LOAD_PATIENT_CLASS_SUCCESS, this.loadedPatientClass,

            constants.LOAD_TEACHER_CLASSES, this.loadTeacherClasses,
            constants.LOAD_TEACHER_CLASSES_SUCCESS, this.loadedTeacherClasses

        );
    },

    consumeClasses: function(classes){
        if (classes == undefined || classes.length == 0){
            return;
        }
        for (var i in classes){
            var cl = classes[i];
            this.classesMap[cl.id] = cl;
        }
    },


    loadPatientClass: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedPatientClass: function(payload){
        var cl = payload.patientClass;
        this.loading = false;
        this.consumeClasses([cl]);
        this.emit('change');
    },

    loadTeacherClasses: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedTeacherClasses: function(payload){
        var classes = payload.classes;
        this.loading = false;
        this.consumeClasses(classes);
        this.emit('change');
    },

    getClasses: function(){
        var arr = [];
        var map = this.classesMap;
        for (var key in map){
            arr.push(map[key]);
        }
        arr.sort(function(a, b){
            var d1 = (a.status == 'archived') ? 0 : 86400 * 1000 * 10000;
            var d2 = (b.status == 'archived') ? 0 : 86400 * 1000 * 10000;
            var t1 = a.timestamp + d1;
            var t2 = b.timestamp + d2;
            return t2 - t1;
        });
        return arr;
    }


});

module.exports = ClassesStore;