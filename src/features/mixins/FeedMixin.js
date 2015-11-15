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
            noteId: f.get('noteId'),
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
                console.log('items found: ', items);
                var arr = items.map(function(it){
                    return self.transformFeedItem(it);
                });
                callback(arr);
            });
        });
    },

    updateFeedItem: function(feedItemId, information, exerciseId, noteId, materialIds, callback){
        var self = this;
        if (feedItemId == undefined){
            return;
        }
        this.loadFeedItemById(feedItemId, function(item){
            item = ParseMixin.safeSet(item, [
                {name: 'information', value: information},
                {name: 'exerciseId', value: exerciseId},
                {name: 'noteId', value: noteId},
                {name: 'materialIds', value: materialIds}
            ]);
            item.save().then(function(updatedItem){
                callback(self.transformFeedItem(updatedItem));
            });
        });
    },

    createFeedItem: function(feedId, information, exerciseId, noteId, materialIds, callback){
        if (feedId == undefined){
            return;
        }
        var self = this;
        var FeedItem = Parse.Object.extend('FeedItem');
        var f = new FeedItem();
        f = ParseMixin.safeSet(f, [{name: 'information', value: information},
            {name: 'exerciseId', value: exerciseId},
            {name: 'noteId', value: noteId},
            {name: 'materialIds', value: materialIds},
            {name: 'feedId', value: feedId}
        ]);
        f.save().then(function(item){
            callback(self.transformFeedItem(item));
        });
    }


}

module.exports = FeedMixin;

function migrateFeedItems(){

    var q = new Parse.Query('PatientAssignment');
    q.limit(1000);
    q.exists('exerciseId');
    q.addAscending('createdAt');
    q.find(function(assignments){
            //console.log(assignments);
            var map = {};
            for (var i in assignments){
                var ass = assignments[i];
                if (map[ass.get('classId')] == undefined){
                    map[ass.get('classId')] = [];
                }
                map[ass.get('classId')].push({
                    name: ass.get('name'),
                    exerciseId: ass.get('exerciseId'),
                    description: ass.get('description'),
                    timestamp: (new Date(ass.createdAt)).getTime()
                });
            }
            console.log(map);

            var q2 = new Parse.Query('Feed');
            q2.limit(1000);
            q2.find(function(feeds){
                for (var i in feeds){
                    var f = feeds[i];
                    var li = map[f.get('classId')];
                    for (var j in li){
                        li[j].feedId = f.id;
                    }
                    map[f.get('classId')] = li;
                }
                console.log(map);

                var feedItemsJList = [];
                for (var key in map){
                    var li = map[key];
                    for (var j in li){
                        var fItem = li[j];
                        feedItemsJList.push(fItem);
                    }
                }
                console.log(feedItemsJList);
                var FeedItem = Parse.Object.extend('FeedItem');
                var list = feedItemsJList.map(function(fItem){
                    var fed = new FeedItem();
                    fed.set('feedId', fItem.feedId);
                    fed.set('exerciseId', fItem.exerciseId);
                    fed.set('information', fItem.description);
                    return fed;
                });
                console.log(list);
                Parse.Object.saveAll(list);

            });

        }
    );
}

function migrateFeeds(){
    var q = new Parse.Query('PatientClass');
    q.limit(1000);

    var Feed = Parse.Object.extend('Feed');
    var arr = [];

    q.find(function(results){

        console.log(results);

        for (var i in results){
            var c = results[i];

            var f = new Feed();
            f.set('classId', c.id);

            arr.push(f);
        }

        console.log(arr);

        Parse.Object.saveAll(arr, {
            success: function(){
                console.log('feed saved');
            }
        });

    });
}