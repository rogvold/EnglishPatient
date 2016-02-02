/**
 * Created by sabir on 26.01.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');

var SoundStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.url = undefined;
        this.playing = false;
        this.bindActions(
            constants.PLAY_SOUND, this.playSound,
            constants.SOUND_FINISHED, this.soundFinished
        );
    },

    playSound: function(payload){
        console.log(payload);
        this.url = payload.url;
        this.playing = true;
        this.emit('change');
    },

    soundFinished: function(){
        console.log('SoundActions: soundFinished occured');
        this.playing = false;
        this.emit('change');
    },

    getState: function(){
        return {
            playing: this.playing,
            url: this.url
        }
    }

});

module.exports = SoundStore;