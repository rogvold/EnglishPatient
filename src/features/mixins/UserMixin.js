/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var LoginMixin = require('./LoginMixin');

var UserMixin = {

    transformUser: function(u){
        if (u == undefined){
            return undefined;
        }
        var firstName = ( u.get('firstName') == undefined ) ? '' : u.get('firstName');
        var lastName = ( u.get('lastName') == undefined ) ? '' : u.get('lastName');
        var name = firstName + ' ' + lastName;
        if (name == ' '){
            name = u.get('email');
        }

        return {
            name: name,
            firstName: firstName,
            lastName: lastName,
            role: u.get('userRole'),
            email: u.get('email'),
            avatar: u.get('avatar'),
            timestamp: (new Date(u.createdAt)).getTime(),
            id: u.id,
            lang: (u.get('lang') == undefined) ? 'en' : u.get('lang')
        }
    },

    loadUserById: function(userId, callback){
        var q = new Parse.Query(Parse.User);
        var self = this;
        q.get(userId, function(u){
            callback(u);
        });
    },

    loadUser: function(userId, callback){
        console.log('loadUser occured: userId = ', userId);
        var self = this;
        this.loadUserById(userId, function(u){
            var tU = self.transformUser(u);
            console.log('user loaded: ', tU);
            callback(tU);
        });
    },

    updateUser: function(userId, firstName, lastName, avatar, callback){
        console.log('updateUser occured: ', userId, firstName, lastName, avatar);
        if (userId == undefined){
            callback();
            return;
        }
        var self = this;
        this.loadUserById(userId, function(u){
            u = ParseMixin.safeSet(u, [{name: 'firstName', value: firstName}, {name: 'lastName', value: lastName},
                {name: 'avatar', value: avatar}
            ]);
            u.save().then(function(user){
                console.log('user updated: ', user);
                callback(self.transformUser(user));
            });
        });
    },

    updateUserWithData: function(data, callback){
        if (data == undefined){
            return;
        }
        var user = Parse.User.current();
        if (user == undefined){
            return;
        }
        for (var key in data){
            user = ParseMixin.safeSet(user, [{name: key, value: data[key]}]);
        }
        var self = this;
        user.save().then(function(u){
            var us = self.transformUser(u);
            callback(us);
        }.bind(this));
    },

    loadUsersByIdsList: function(ids, callback){
        if (ids == undefined || ids.length == 0){
            callback([]);
        }
        var self = this;
        var q = new Parse.Query(Parse.User);
        q.containedIn('objectId', ids);
        q.limit(1000);

        ParseMixin.loadAllDataFromParse(q, function(results){
            var arr = results.map(function(r){
                return self.transformUser(r)
            });
            callback(arr);
        });

    }





}

module.exports = UserMixin;