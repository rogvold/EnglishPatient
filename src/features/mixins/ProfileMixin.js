/**
 * Created by sabir on 26.10.15.
 */

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

//profile:
/*
userId

music
video
politics
moreInfo

 */

var ProfileMixin = {

    transformProfile: function(p){
        return {
            id: p.id,
            profileId: p.id,
            userId: p.get('userId'),

            music: p.get('music'),
            video: p.get('video'),
            politics: p.get('politics'),

            moreInfo: p.get('moreInfo')
        }
    },

    loadUserProfileById: function(userId, callback){
        var q = new Parse.Query('UserProfile');
        q.equalTo('userId', userId);
        var self = this;
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
                return;
            }
            callback(results[0]);
        });
    },

    loadUserProfile: function(userId, callback){
        var self = this;
        this.loadUserProfileById(userId, function(p){
            if (p == undefined){
                self.createProfile({userId: userId}, function(data){
                    callback(data);
                });
                return;
            }
            callback(self.transformProfile(p));
        });
    },

    createProfile: function(data, callback){
        var userId = data.userId;
        if (userId == undefined){
            return;
        }
        var self = this;
        var UserProfile = Parse.Object.extend('UserProfile');
        var p = new UserProfile();
        p = ParseMixin.safeSet(p, [
            {name: 'userId', value: userId},

            {name: 'music', value: data.music},
            {name: 'video', value: data.video},
            {name: 'politics', value: data.politics},
            {name: 'moreInfo', value: data.moreInfo}

        ]);
        p.save(null, {
            success: function(pr){
                callback(self.transformProfile(pr));
            }
        });
    },

    updateProfile: function(data, callback){
        var userId = data.userId;
        if (userId == undefined){
            console.log('--->>>> profileId is not defined');
            return;
        }
        var self = this;
        if (data.id == undefined){
            self.createProfile(data, function(pro){
                callback(pro);
            });
            return;
        }
        self.loadUserProfileById(userId, function(profile){
            profile = ParseMixin.safeSet(profile, [
                {name: 'music', value: data.music},
                {name: 'video', value: data.video},
                {name: 'politics', value: data.politics},
                {name: 'moreInfo', value: data.moreInfo}
            ]);
            profile.save().then(function(p){
                callback(self.transformProfile(p));
            });
        });
    }

}

module.exports = ProfileMixin;