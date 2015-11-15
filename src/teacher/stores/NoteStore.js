/**
 * Created by sabir on 10.09.15.
 */
var Fluxxor = require('fluxxor');
var constants = require('../Constants');

var NoteStore = Fluxxor.createStore({
    self: this,
    note: undefined,
    notes: [],

    initialize: function(){
        this.bindActions(
            constants.NOTE_LOADED, this.noteLoaded,
            constants.NOTE_UPDATED, this.noteUpdated
        );
    },

    noteLoaded: function(payload){
        this.note = payload.note;
        this.emit('change');
    },

    noteUpdated: function(payload){
        this.note = payload.note;
        this.emit('change');
    },

    getState: function(){
        return {
            note: this.note
        }
    }
    
});

module.exports = NoteStore;