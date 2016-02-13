/**
 * Created by sabir on 13.02.16.
 */

var assign = require('object-assign');
var CommentsMixin = require('../../mixins/CommentsMixin');

var constants = require('../constants');

var CommentsActions = {

    loadCommentsForObjects: function(objectsList){
        console.log('CommentsActions: objectsList = ', objectsList);
        var arr = [];
        var map = this.flux.store('CommentsStore').commentsMap;
        for (var i in objectsList){
            if (map[objectsList[i].id] == undefined){
                arr.push(objectsList[i]);
            }
        }
        if (arr.length == 0){
            return;
        }
        this.dispatch(constants.LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST, {objectsList: objectsList});
        CommentsMixin.loadCommentsForRelatedObjectsList(objectsList, function(comments){
            console.log('CommentsActions: loadCommentsForObjects: loaded:  comments = ', comments);
            this.dispatch(constants.LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST_SUCCESS, {comments: comments});
        }.bind(this));
    },

    makeComment: function(objectId, content, attachments){
        if (objectId == undefined){
            return;
        }
        this.dispatch(constants.MAKE_COMMENT, {objectId: objectId});
        CommentsMixin.makeComment(objectId, content, attachments, function(comment){
            this.dispatch(constants.MAKE_COMMENT_SUCCESS, {comment: comment});
        }.bind(this));
    }

};

module.exports = CommentsActions;