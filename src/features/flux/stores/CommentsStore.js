/**
 * Created by sabir on 13.02.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');

var CommentsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.commentsMap = {}; //relatedObjectId - comments list

        this.bindActions(
            constants.LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST, this.loadCommentsForRelatedObjectsList,
            constants.LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST_SUCCESS, this.loadCommentsForRelatedObjectsListSuccess,
            constants.MAKE_COMMENT, this.makeComment,
            constants.MAKE_COMMENT_SUCCESS, this.makeCommentSuccess
        );
    },

    consumeComments: function(comments){
        if (comments == undefined || comments.length == 0){
            return;
        }
        var map = this.commentsMap;
        for (var i in comments){
            var c = comments[i];
            var relId = c.relatedId;
            if (map[relId] == undefined){
                map[relId] = [];
            }
            map[relId].push(c);
        }
        this.commentsMap = map;
    },


    loadCommentsForRelatedObjectsList: function(payload){
        this.loading = true;
        this.emit('change');
    },

    loadCommentsForRelatedObjectsListSuccess: function(payload){
        this.loading = false;
        this.consumeComments(payload.comments);
        this.emit('change');
    },

    makeComment: function(payload){
        this.loading = true;
        this.emit('change');
    },

    makeCommentSuccess: function(payload){
        this.loading = false;
        this.consumeComments([payload.comment]);
        this.emit('change');
    },

    shouldLoadComments: function(relId){
        return (this.commentsMap[relId] == undefined);
    },

    getObjectComments: function(relId){
        var map = this.commentsMap;
        var arr = (map[relId] == undefined) ? [] : map[relId];
        arr.sort(function(c1, c2){
            return c1.timestamp - c2.timestamp;
        });
        return arr;
    }

});


module.exports = CommentsStore;