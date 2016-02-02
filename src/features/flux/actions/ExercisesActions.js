/**
 * Created by sabir on 28.01.16.
 */


var React = require('react');
var assign = require('object-assign');

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var ExerciseMixin = require('../../mixins/ExerciseMixin');

var ExercisesActions = {

    loadExercise: function(exerciseId){
        if (exerciseId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_EXERCISE, {exerciseId: exerciseId});
        ExerciseMixin.loadPureExercise(exerciseId, function(exercise){
            //setTimeout(function(){

            //}.bind(this), 300);
            this.dispatch(constants.LOAD_EXERCISE_SUCCESS, {exercise: exercise});

            this.flux.actions.loadGroupsOfExercises([exercise]);
        }.bind(this))
    },

    loadExercisesByIds: function(exercisesIds){
        if (exercisesIds == undefined || exercisesIds.length == 0){
            return;
        }
        var ids = [];
        var map = this.flux.store('ExercisesStore').exercisesMap;
        for (var i in exercisesIds){
            var id = exercisesIds[i];
            if (map[id] == undefined){
                ids.push(id);
            }
        }
        if (ids.length == 0){
            return;
        }
        this.dispatch(constants.LOAD_EXERCISES_BY_IDS, {ids: ids});
        ExerciseMixin.loadExercisesByIds(ids, function(exercises){
            //setTimeout(function(){
                this.flux.actions.loadGroupsOfExercises(exercises);
            //}.bind(this), 300);
            this.dispatch(constants.LOAD_EXERCISES_BY_IDS_SUCCESS, {exercises: exercises});
        }.bind(this));
    },

    loadTeacherExercises: function(teacherId, callback){
        if (teacherId == undefined){
            var user = LoginMixin.getCurrentUser();
            if (user != undefined){
                teacherId = user.id;
            }
        }
        if (teacherId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_TEACHER_EXERCISES, {teacherId: teacherId});
        ExerciseMixin.loadTeacherExercises(teacherId, function(exercises){
            this.dispatch(constants.LOAD_TEACHER_EXERCISES_SUCCESS, {exercises: exercises});
            //setTimeout(function(){
                this.flux.actions.loadGroupsOfExercises(exercises);
            //}.bind(this), 300);
            if (callback != undefined){
                callback();
            }
        }.bind(this));
    },

    loadCommunityExercises: function(teacherId, callback){
        if (teacherId == undefined){
            var user = LoginMixin.getCurrentUser();
            if (user != undefined){
                teacherId = user.id;
            }
        }
        if (teacherId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_COMMUMITY_EXERCISES, {teacherId: teacherId});
        ExerciseMixin.loadCommunityExercises(teacherId, function(exercises){
            this.dispatch(constants.LOAD_COMMUMITY_EXERCISES_SUCCESS, {exercises: exercises});
            //setTimeout(function(){
                this.flux.actions.loadGroupsOfExercises(exercises);
            //}.bind(this), 300);

            if (callback != undefined){
                callback();
            }
        }.bind(this));
    },

    loadGroupsOfExercises: function(exercises){
        if (exercises == undefined){
            exercises = [];
        }
        var groupsIds = [];
        var map = {};
        for (var i in exercises){
            var ex = exercises[i];
            var groups = ex.groups;
            for (var j in groups){
                var g = groups[j];
                map[g] = g;
            }
        }
        for (var key in map){
            groupsIds.push(key);
        }
        this.flux.actions.loadExercisesGroupsByIds(groupsIds);
    },

    loadAllAvailableExercises: function(teacherId){
        if (teacherId == undefined){
            var user = LoginMixin.getCurrentUser();
            if (user != undefined){
                teacherId = user.id;
            }
        }
        if (teacherId == undefined){
            return;
        }
        this.flux.actions.loadTeacherExercises(teacherId, function(){
            this.flux.actions.loadCommunityExercises(teacherId);
        }.bind(this));
    },

    loadExercisesGroupsByIds: function(groupsIds){
        if (groupsIds == undefined){
            return;
        }
        var map = this.flux.store('ExercisesStore').groupsMap;
        var ids = [];
        for (var i in groupsIds){
            var id = groupsIds[i];
            if (map[id] == undefined){
                ids.push(id);
            }
        }
        if (ids.length == 0){
            return;
        }
        var arr = ids;
        var m = {};
        for (var i in arr){
            m[arr[i]] = arr[i];
        }
        var ids = [];
        for (var key in m){
            ids.push(key);
        }
        this.dispatch(constants.LOAD_EXERCISES_GROUPS_BY_IDS, {groupsIds: ids});
        ExerciseMixin.loadExercisesGroupsByIds(groupsIds, function(groups){
            this.dispatch(constants.LOAD_EXERCISES_GROUPS_BY_IDS_SUCCESS, {groups: groups});
        }.bind(this));
    }

}

module.exports = ExercisesActions;