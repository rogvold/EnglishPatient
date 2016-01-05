/**
 * Created by sabir on 27.10.15.
 */
var Parse = require('parse').Parse;
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');

var FeedMixin = {

    loadFeedByClassId: function(classId, callback){
        var q = new Parse.Query('Feed');
        q.equalTo('classId', classId);
        q.find(function(results){
            if (results == undefined || results.length == 0 ){
                var Feed = Parse.Object.extend('Feed');
                var f = new Feed();
                f.set('classId', classId);
                f.save().then(function(feed){
                    callback(feed);
                });
                return;
            }
            callback(results[0]);
        });
    },

    loadFeedByCourseLessonId: function(lessonId, callback){
        if (lessonId == undefined){
            return;
        }
        var q = new Parse.Query('Feed');
        q.equalTo('lessonId', lessonId);
        q.find(function(results){
            if (results == undefined || results.length == 0 ){
                var Feed = Parse.Object.extend('Feed');
                var f = new Feed();
                f.set('lessonId', lessonId);
                f.save().then(function(feed){
                    callback(feed);
                });
                return;
            }
            callback(results[0]);
        });
    },



    loadFeedItemById: function(feedItemId, callback){
        ParseMixin.loadClassItemById('FeedItem', feedItemId, function(item){
            callback(item);
        }, function(err){})
    },

    transformFeedItem: function(f){
        return {
            id: f.id,
            feedItemId: f.id,
            itemId: f.id,
            feedId: f.get('feedId'),
            information: f.get('information'),
            timestamp: (new Date(f.createdAt)).getTime(),
            exerciseId: f.get('exerciseId'),
            dialogId: f.get('dialogId'),
            noteId: f.get('noteId'),
            questionnaireId: f.get('questionnaireId'),
            materialIds: (f.get('materialIds') == undefined) ? [] : f.get('materialIds')
        };
    },

    loadFeedItem: function(itemId, callback){
        var self = this;
        this.loadFeedItemById(itemId, function(item){
            callback(self.transformFeedItem(item));
        });
    },

    deleteFeedItem: function(itemId, callback){
        var self = this;
        if (itemId == undefined){
            return;
        }
        this.loadFeedItemById(itemId, function(item){
            if (item == undefined){
                return;
            }
            item.destroy({
                success: function(){
                    callback();
                }
            });
        });
    },

    loadAllClassFeed: function(classId, callback){
        var self = this;
        console.log('loadAllClassFeed occured: classId = ', classId);
        this.loadFeedByClassId(classId, function(feed){
            var feedId = feed.id;
            console.log('loading items with feedId = ', feedId);
            var q = new Parse.Query('FeedItem');
            q.limit(1000);
            q.addDescending('createdAt');
            q.equalTo('feedId', feedId);
            q.find(function(items){

                var arr = items.map(function(it){
                    return self.transformFeedItem(it);
                });
                console.log('items found: ', arr);
                callback(arr);
            });
        });
    },


    loadAllFeed: function(feedId, order, callback){
        console.log('loadAllFeed occured: feedId = ' + feedId + ' , order = ' + order);
        if (feedId == undefined){
            return;
        }
        var self = this;
        if (order == undefined){
            order = 'asc';
        }
        var q = new Parse.Query('FeedItem');
        q.limit(1000);
        q.equalTo('feedId', feedId);
        if (order == 'asc'){
            q.addAscending('createdAt');
        }else {
            q.addDescending('createdAt');
        }
        q.find(function(results){
            var arr = results.map(function(r){return self.transformFeedItem(r)});
            callback(arr);
        });
    },


    updateFeedItem: function(feedItemId, information, exerciseId, noteId, materialIds,
                             dialogId, questionnaireId, callback){
        var self = this;
        if (feedItemId == undefined){
            return;
        }
        this.loadFeedItemById(feedItemId, function(item){
            item = ParseMixin.safeSet(item, [
                {name: 'information', value: information},
                {name: 'exerciseId', value: exerciseId},
                {name: 'noteId', value: noteId},
                {name: 'dialogId', value: dialogId},
                {name: 'questionnaireId', value: questionnaireId},
                {name: 'materialIds', value: materialIds}
            ]);
            item.save().then(function(updatedItem){
                callback(self.transformFeedItem(updatedItem));
            });
        });
    },

    createFeedItem: function(feedId, information, exerciseId, noteId, materialIds, dialogId, questionnaireId, callback){
        if (feedId == undefined){
            return;
        }
        var self = this;
        var FeedItem = Parse.Object.extend('FeedItem');
        var f = new FeedItem();
        f = ParseMixin.safeSet(f, [{name: 'information', value: information},
            {name: 'exerciseId', value: exerciseId},
            {name: 'noteId', value: noteId},
            {name: 'dialogId', value: dialogId},
            {name: 'questionnaireId', value: questionnaireId},
            {name: 'materialIds', value: materialIds},
            {name: 'feedId', value: feedId}
        ]);
        f.save().then(function(item){
            callback(self.transformFeedItem(item));
        });
    }


}

module.exports = FeedMixin;