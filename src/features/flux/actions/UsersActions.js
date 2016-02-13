/**
 * Created by sabir on 26.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var constants = require('../constants');

var UserMixin = require('../../mixins/UserMixin');

var UsersActions = {

    loadUser: function(userId){
        console.log('UsersActions: loadUser occured: userId = ', userId);
        if (userId == undefined || userId == 'undefined'){
            return;
        }
        this.dispatch(constants.LOAD_USER, {userId: userId});
        UserMixin.loadUser(userId, function(user){
            this.dispatch(constants.LOAD_USER_SUCCESS, {user: user});
        }.bind(this))
    },

    loadUsersByIds: function(ids){
        console.log('UsersActions: loadUsersByIds occured: ids = ', ids);
        if (ids == undefined || ids.length == 0){
            return;
        }
        var map = {};
        for (var i in ids){
            map[ids[i]] = 1;
        }
        var arrIds = [];
        for (var key in map){
            arrIds.push(key);
        }
        this.dispatch(constants.LOAD_USERS_BY_IDS, {ids: arrIds});
        UserMixin.loadUsersByIdsList(arrIds, function(users){
            this.dispatch(constants.LOAD_USERS_BY_IDS_SUCCESS, {users: users});
        }.bind(this));
    },

    updateUser: function(data){
        this.dispatch(constants.UPDATE_USER, {data: data});
        UserMixin.updateUserWithData(data, function(user){
            this.dispatch(constants.UPDATE_USER_SUCCESS, {user: user});
        }.bind(this));
    }

}

module.exports = UsersActions;