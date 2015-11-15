/**
 * Created by sabir on 26.08.15.
 */

var Parse = require('parse').Parse;
var Fluxxor = require('fluxxor');
var constants = require('../../../js/Constants');


var ParseMixin = require('../../mixins/commonMixins/ParseMixin');

var AuditorExercisesStore = Fluxxor.createStore({
    exercises: [],
    selectedExercise: {name: 'выберите упражнение из списка слева'},
    selectedCards: [],

    initialize: function(){
        ParseMixin.initParse();
        this.bindActions(
            constants.ADMIN_LOAD_ALL_AUDITOR_EXERCISES, this.loadAllExercises,
            constants.ADMIN_AUDITOR_EXERCISE_CLICKED, this.loadExercise
        );
    },

    loadAllExercises: function(payload){
        console.log(payload);
        var self = this;
        var userId = payload.userId;
        var q = new Parse.Query('Exercise');
        q.addDescending('createdAt');
        q.limit(1000);
        q.find(function(results){
            self.exercises = results;
            self.emitChange();
        });
    },

    loadExercise: function(payload){
        var self = this;
        console.log('loadExercise occured: ', payload);
        self.selectedCards = [];
        self.selectedExercise = {name: 'загрузка...', description: '', imgSrc: ''};
        self.emitChange();
        var exerciseId = payload.exerciseId;
        var q = new Parse.Query('Exercise');
        q.get(exerciseId, {
            success: function(ex){
                self.selectedExercise = {name: ex.get('name'), description: ex.get('description'), imgSrc: ex.get('imageUrl')};
                self.loadExerciseCards(exerciseId, function(cards){
                    self.selectedCards = cards;
                    self.emitChange();
                });
            }
        });
    },

    loadExerciseCards: function(exId, callback){
        var q = new Parse.Query(Parse.Object.extend('ExerciseCard'));
        q.equalTo('exerciseId', exId);
        q.addAscending('number');
        q.find(function(results){
            callback(results);
        });
    },

    getState: function(){
        return {
            exercises: this.exercises,
            selectedExercise: this.selectedExercise,
            selectedCards: this.selectedCards
        }
    },

    emitChange: function(){
        this.emit('change');
    }

});

module.exports = AuditorExercisesStore;