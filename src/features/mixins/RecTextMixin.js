/**
 * Created by sabir on 21.01.16.
 */


var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var RecTextMixin = {

    transformRecText: function(recText){
        return ({
            id: recText.id,
            recTextId: recText.id,
            feedItemId: recText.get('feedItemId'),
            description: recText.get('description'),
            inputType: recText.get('inputType') //text or voice
        });
    },

    transformUserAnswer: function(ua){
        return {
            id: ua.id,
            recTextUserAnswerId: ua.id,
            text: ua.get('text'),
            url: ua.get('url')
        };
    },

    loadRecTextById: function(id, callback){
        var q = new Parse.Query('RecTextTask');
        if (id == undefined){
            return;
        }
        q.get(id, {
            success: function(recText){
                callback(recText);
            }
        });
    },

    loadRecText: function(id, callback){
        var self = this;
        this.loadRecTextById(id, function(recText){
            var c = self.transformRecText(recText);
            callback(c);
        }.bind(this))
    },

    loadRecTextByFeedItemId: function(feedItemId, callback){
        if (feedItemId == undefined){
            return;
        }
        var self = this;
        var q = new Parse.Query('RecTextTask');
        q.equalTo('feedItemId', feedItemId);
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            if (results.length == 0){
                callback(undefined);
                return;
            }
            var recText = results[0];
            var c = self.transformRecText(recText);
            callback(c);
        });
    },

    createRecTextTask: function(feedItemId, data, callback){
        if (feedItemId == undefined || data == undefined){
            return;
        }
        var self = this;
        var RecTextTask = Parse.Object.extend('RecTextTask');
        var task = new RecTextTask();
        task.set('feedItemId', feedItemId);
        task.set('inputType', data.inputType);
        task.set('description', data.description);
        task.save().then(function(savedTask){
            var c = self.transformRecText(savedTask);
            callback(c);
        });
    },

    deleteRecTextTask: function(id, callback){
        console.log('deleteRecTextTask occured: id = ' + id);
        if (id == undefined){
            return;
        }
        var q = new Parse.Query('RecTextTask');
        q.get(id, {
            success: function(recText){
                recText.destroy({
                    success: function(){
                        callback();
                    }
                });
            }
        });
    },

    updateRecText: function(id, data, callback){
        var self = this;
        this.loadRecTextById(id, function(recText){
            recText = ParseMixin.safeSet(recText, [
                {name: 'inputType', value: data.inputType},
                {name: 'description', value: data.description}
            ]);
            recText.save().then(function(updatedRecText){
                var c = self.transformRecText(updatedRecText);
                callback(c);
            });
        });
    },

    loadUserAnswer: function(recTextId, userId, callback, transformMode){
        console.log('RecTextMixin: loadUserAnswer: recTextId, userId = ', recTextId, userId);
        if (transformMode == undefined){
            transformMode = true;
        }
        if (userId == undefined || recTextId == undefined){
            return;
        }
        var self = this;
        var q = new Parse.Query('RecTextUserAnswer');
        q.equalTo('userId', userId);
        q.equalTo('recTextId', recTextId);
        q.find(function(results){
            console.log('RecTextMixin: loadUserAnswer: find result: ', results);
            if (results == undefined){
                results = [];
            }
            if (results.length == 0){
                callback();
                return;
            }
            var r = results[0];
            console.log('answer loaded: ', r);
            var a = self.transformUserAnswer(r);
            console.log('transformed answer: ', a);
            if (transformMode == false){
                callback(r);
            }else{
                callback(a);
            }
        });
    },

    answerOnRecText: function(recTextId, userId, data, callback){
        var self = this;
        var RecTextUserAnswer = Parse.Object.extend('RecTextUserAnswer');
        this.loadUserAnswer(recTextId, userId, function(parseAnswer){
            if (parseAnswer == undefined){
                parseAnswer = new RecTextUserAnswer();
                parseAnswer.set('userId', userId);
                parseAnswer.set('recTextId', recTextId);
            }
            parseAnswer = ParseMixin.safeSet(parseAnswer, [
                {name: 'url', value: data.url},
                {name: 'text', value: data.text}
            ]);
            parseAnswer.save().then(function(savedAnswer){
                var a = self.transformUserAnswer(savedAnswer);
                callback(a);
            });

        }, false)
    }


};

module.exports = RecTextMixin;