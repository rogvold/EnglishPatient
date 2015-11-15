/**
 * Created by sabir on 10.09.15.
 */
var constants = require('../Constants');
//var commontConstants = require('../../react/c');
var React = require('react');
var Parse = require('parse').Parse;
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');

var NoteActions = {
    loadNote: function(noteId){
        ParseMixin.loadClassItem('PatientNote', noteId, function(note){
            this.dispatch(constants.NOTE_LOADED, {note: note});
        }.bind(this), function(error){});
    },

    loadTeacherNotes: function(teacherId){
        var q = new Parse.Query(Parse.Object.extend('PatientNote'));
        q.limit(1000);
        q.equalTo('userId', teacherId);
        q.find(function(results){
            this.dispatch(constants.TEACHER_NOTES_LOADED, {notes: results});
        }.bind(this));
    },

    createNote: function(userId, html, name, description, tags){
        var fields = [{name: 'userId', val: userId}, {name: 'html', val: html},
            {name: 'name', val: name}, {name: 'description', val: description},
            {name: 'tags', val: tags}];
        ParseMixin.createParseObject('PatientNote', fields, function(note){
            this.dispatch(constants.NOTE_CREATED, {note: note});
        }.bind(this));
    },

    updateNote: function(note){
        if (note == undefined){
            return;
        }
        note.save().then(function(updatedNote){
            this.dispatch(constants.NOTE_UPDATED, {note: updatedNote});
        }.bind(this));
    }



}

module.exports = NoteActions;