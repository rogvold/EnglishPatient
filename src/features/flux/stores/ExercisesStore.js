/**
 * Created by sabir on 28.01.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var ExerciseMixin = require('../../mixins/ExerciseMixin');

var ExercisesStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.exercisesMap = {};
        this.groupsMap = {};

        this.bindActions(

            constants.LOAD_EXERCISE, this.loadExercise,
            constants.LOAD_EXERCISE_SUCCESS, this.loadedExercise,
            constants.DELETE_EXERCISE, this.deleteExercise,

            constants.LOAD_EXERCISES_BY_IDS, this.loadExercisesByIds,
            constants.LOAD_EXERCISES_BY_IDS_SUCCESS, this.loadedExercisesByIds,

            constants.LOAD_TEACHER_EXERCISES, this.loadTeacherExercises,
            constants.LOAD_TEACHER_EXERCISES_SUCCESS, this.loadedTeacherExercises,

            constants.LOAD_COMMUMITY_EXERCISES, this.loadCommunityExercises,
            constants.LOAD_COMMUMITY_EXERCISES_SUCCESS, this.loadedCommunityExercises,


            constants.LOAD_EXERCISES_GROUP, this.loadExerciseGroup,
            constants.LOAD_EXERCISES_GROUP_SUCCESS, this.loadedExerciseGroup,

            constants.LOAD_EXERCISES_GROUPS_BY_IDS, this.loadExercisesGroupsByIds,
            constants.LOAD_EXERCISES_GROUPS_BY_IDS_SUCCESS, this.loadedExercisesGroupsByIds

        );
    },

    consumeExercises: function(exercises){
        console.log('consumeExercises occured: exercises = ', exercises);
        for (var i in exercises){
            this.exercisesMap[exercises[i].id] = exercises[i];
        }
        console.log('exercisesMap after consumptions: this.exercisesMap = ', this.exercisesMap);
    },

    consumeGroups: function(groups){
        if (groups == undefined || groups.length == 0){
            return;
        }
        for (var i in groups){
            this.groupsMap[groups[i].id] = groups[i];
        }
    },

    loadExercise: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedExercise: function(payload){
        var exercise = payload.exercise;
        if (exercise == undefined){
            return;
        }
        this.consumeExercises([exercise]);
        this.loading = false;
        this.emit('change');
    },

    loadExercisesByIds: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedExercisesByIds: function(payload){
        var exercises = payload.exercises;
        this.consumeExercises(exercises);
        this.loading = false;
        this.emit('change');
    },

    loadTeacherExercises: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedTeacherExercises: function(payload){
        var exercises = payload.exercises;
        this.consumeExercises(exercises);
        this.loading = false;
        this.emit('change');
    },

    loadCommunityExercises: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedCommunityExercises: function(payload){
        var exercises = payload.exercises;
        this.consumeExercises(exercises);
        this.loading = false;
        this.emit('change');
    },

    deleteExercise: function(payload){
        var exerciseId = payload.exerciseId;
        this.exercisesMap[exerciseId] = undefined;
        this.emit('change');
    },

    loadExerciseGroup: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadedExerciseGroup: function(payload){
        var group = payload.group;
        if (group == undefined){
            return;
        }
        this.consumeGroups([group])
        this.loading = false;
        this.emit('change');
    },

    loadExercisesGroupsByIds: function(payload){
        console.log('loadExercisesGroupsByIds occured: payload = ', payload);
        this.loadExerciseGroup(payload);
    },

    loadedExercisesGroupsByIds: function(payload){
        console.log('loadedExercisesGroupsByIds occured: payload = ', payload);
        var groups = payload.groups;
        this.consumeGroups(groups);
        this.loading = false;
        this.emit('change');
    },

    getTeacherGroups: function(teacherId){
        var arr = [];
        var map = this.groupsMap;
        for (var key in map){
            if (map[key].creatorId != teacherId){
                continue;
            }
            arr.push(map[key]);
        }
        return arr;
    },

    getTeacherExercises: function(teacherId){
        var arr = [];
        var map = this.exercisesMap;
        for (var key in map){
            if (map[key].creatorId != teacherId){
                continue;
            }
            arr.push(map[key]);
        }
        return arr;
    },

    filterExercisesWithSearchQuery: function(exercises, text){
        if (exercises == undefined){
            return [];
        }
        if (text == undefined || text.trim() == ''){
            return exercises;
        }
        var arr = [];
        for (var i in exercises){
            var ex = exercises[i];
            if (ExerciseMixin.isExerciseInSearch(ex, text) == true){
                arr.push(ex);
            }
        }
        return arr;
    },

    getTeacherGroupsWithExercises: function(teacherId, seachQuery){
        console.log('ExercisesStore: getTeacherGroupsWithExercises: teacherId = ', teacherId);
        var exercises = this.getTeacherExercises(teacherId);
        exercises = this.filterExercisesWithSearchQuery(exercises, seachQuery);
        var groups = this.getTeacherGroups(teacherId);
        var arr = ExerciseMixin.getGroupsWithExercises(groups, exercises);
        console.log('returning ', arr);
        return arr;
    },

    getCommunityUsersIds: function(teacherId){
        var usersMap = {};
        var map = this.exercisesMap;
        var arr = [];
        for (var key in map){
            var ex = map[key];
            if (ex.creatorId == teacherId){
                continue;
            }
            var ex = map[key];
            usersMap[ex.creatorId] = 1;
        }
        for (var key in usersMap){
            arr.push(key);
        }
        return arr;
    },

    getState: function(){
        return {
            loading: this.loading,
            exercisesMap: this.exercisesMap,
            groupsMap: this.groupsMap
        }
    },

    getSearchTeachersGroupsFactoryList: function(searchQuery){
        var usersIds = this.getCommunityUsersIds();
        var arr = [];
        for (var i in usersIds){
            var userId = usersIds[i];
            var grs = this.getTeacherGroupsWithExercises(userId, searchQuery);
            if (grs.length == 0){
                continue;
            }
            arr.push({
                userId: userId,
                groups: grs
            });
        }
        return arr;
    }
    
});

module.exports = ExercisesStore;