/**
 * Created by sabir on 26.01.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var UsersStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.usersMap = {};

        this.bindActions(
            constants.LOAD_USER, this.loadUser,
            constants.LOAD_USER_SUCCESS, this.loadedUser,
            constants.LOAD_USERS_BY_IDS, this.loadUsersByIds,
            constants.LOAD_USERS_BY_IDS_SUCCESS, this.loadedUsersByIds,

            constants.UPDATE_USER, this.updateUser,
            constants.UPDATE_USER_SUCCESS, this.updateUserSuccess
        );
    },

    onActionMethod: function(payload){
        console.log(payload);
    },

    getState: function(){
        return {

        }
    },

    getUserById: function(userId){
        if (userId == undefined){
            return undefined;
        }
        return this.usersMap[userId];
    },

    loadUser: function(payload){
        var userId = payload.userId;
        if (userId == undefined){
            return;
        }
        if (this.usersMap[userId] != undefined){
            return;
        }
        this.loading = true;
        this.emit('change');
    },

    getNotLoadedIdsList: function(ids){
        var map = this.usersMap;
        var arr = [];
        for (var i in ids){
            if (map[ids[i]] == undefined){
                arr.push(ids[i]);
            }
        }
        return arr;
    },

    loadedUser: function(payload){
        var user = payload.user;
        if (user == undefined){
            return;
        }
        this.usersMap[user.id] = user;
        this.loading = false;
        this.emit('change');
    },

    loadUsersByIds: function(payload){
        var ids = (payload == undefined) ? [] : payload.ids;
        if (ids == undefined){
            ids = [];
        }
        var notLoadedIds = this.getNotLoadedIdsList(ids);
        if (notLoadedIds.length == 0){
            return;
        }
        this.loading = true;
        this.emit('change');
    },

    loadedUsersByIds: function(payload){
        console.log('UsersStore: loadedUsersByIds: payload = ', payload);
        var users = payload.users;
        if (users == undefined){
            users = [];
        }
        for (var i in users){
            this.usersMap[users[i].id] = users[i];
        }
        console.log('this.usersMap = ', this.usersMap);

        this.loading = false;
        this.emit('change');
    },

    getCurrentUser: function(){
        var id = LoginMixin.getCurrentUserId();
        return this.usersMap[id];
    },

    updateUser: function(payload){
        this.loading = true;
        this.emit('change');
    },

    updateUserSuccess: function(payload){
        this.usersMap[payload.user.id] = payload.user;
        this.loading = false;
        this.emit('change');
    }

});


module.exports = UsersStore;