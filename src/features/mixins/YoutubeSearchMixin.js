/**
 * Created by sabir on 29.11.15.
 */

var React = require('react');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var MaterialsMixin = require('./MaterialsMixin');


var YoutubeSearchMixin = {

    search: function(text, lang, callback){
        Parse.Cloud.run('searchPhrase', {query: text, lang: lang}, {
            success: function(result){
                callback(result);
            }
        });
    }

}

module.exports = YoutubeSearchMixin;