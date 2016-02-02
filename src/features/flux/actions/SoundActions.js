/**
 * Created by sabir on 26.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var constants = require('../constants');

var SoundActions = {

    playSound: function(url){
        if (url == undefined){
            url = 'http://loudlinks.rocks/sounds/mp3/magic.mp3';
        }
        this.dispatch(constants.PLAY_SOUND, {url: url});
    },

    soundFinished: function(){
        this.dispatch(constants.SOUND_FINISHED);
    }
}

module.exports = SoundActions;