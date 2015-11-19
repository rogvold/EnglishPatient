/**
 * Created by sabir on 16.11.15.
 */

var React = require('react');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

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
            role: u.get('userRole'),
            email: u.get('email'),
            avatar: u.get('avatar'),
            id: u.id
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

    loadUsersByIdsList: function(ids, callback){
        if (ids == undefined || ids.length == 0){
            callback([]);
        }
        var self = this;
        var q = new Parse.Query(Parse.User);
        q.containedIn('objectId', ids);
        q.find(function(results){
            var arr = results.map(function(r){
                return self.transformUser(r)
            });
            callback(arr);
        });
    }





}

module.exports = UserMixin;