/**
 * Created by sabir on 16.12.15.
 */

var assign = require('object-assign');
var Parse = require('parse').Parse;
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../react/mixins/commonMixins/CommonMixin');
var UserMixin = require('./UserMixin');
var ClassMixin = require('./ClassMixin');

var ChatMixin = {

    // usersMap - map of transformed users, m - parse obj
    transformMessage: function(m, usersMap){
        if (m == undefined || usersMap == undefined ){
            return undefined;
        }
        var fromUser = (usersMap[m.get('fromId')] == undefined) ? {} : usersMap[m.get('fromId')];
        var toUser = (usersMap[m.get('toId')] == undefined) ? {} : usersMap[m.get('toId')];
        return {
            timestamp: (new Date(m.createdAt)).getTime(),
            content: m.get('content'),
            attachments: m.get('attachments'),
            fromId: m.get('fromId'),
            toId: m.get('toId'),
            fromUserName: fromUser.name,
            fromUserAvatar: fromUser.avatar,
            avatar: fromUser.avatar,
            name: fromUser.name,
            toUserName: toUser.name,
            toUserAvatar: toUser.avatar,
            id: m.id,
            status: m.get('status'),
            messageId: m.id
        }
    },

    loadUsersMapByMessagesList: function(messages, callback){
        var map = {};
        var arr = [];
        for (var i in messages){
            map[messages[i].get('fromId')] = messages[i];
            map[messages[i].get('toId')] = messages[i];
        }
        for (var key in map){
            arr.push(key);
        }
        UserMixin.loadUsersByIdsList(arr, function(users){
            var uMap = {};
            for (var i in users){
                uMap[users[i].id] = users[i];
            }
            callback(uMap);
        });
    },

    loadUsersMap: function(ids, callback){
        UserMixin.loadUsersByIdsList(ids, function(users){
            var uMap = {};
            for (var i in users){
                uMap[users[i].id] = users[i];
            }
            callback(uMap);
        });
    },

    loadMessages: function(userId, friendId, fromTimestamp, callback){
        console.log('loadMessages: ', userId, friendId, fromTimestamp);
        if (userId == undefined || friendId == undefined){
            return;
        }
        if (fromTimestamp == undefined){
            fromTimestamp = 0;
        }
        var date = new Date(+fromTimestamp);
        //console.log('=---->>>> loading messages fromTimestamp: ', fromTimestamp);
        //console.log('=---->>>> loading messages date: ', date);


        var q = new Parse.Query('PatientMessage');
        q.limit(1000);
        q.greaterThan('createdAt', new Date(fromTimestamp));
        q.containedIn('fromId', [friendId, userId]);
        q.containedIn('toId', [friendId, userId]);
        var self = this;

        if (fromTimestamp == 0){
            ParseMixin.loadAllDataFromParse(q, function(list){
                console.log('loaded messages: ', list);
                self.loadUsersMap([userId, friendId], function(uMap){
                    var arr = list.map(function(m){
                        return self.transformMessage(m, uMap);
                    });

                    console.log('transformed messsages = ', arr);
                    callback(arr, uMap);
                });
            });
        }else {
            q.find(function(list){
                self.loadUsersMap([userId, friendId], function(uMap){
                    var arr = list.map(function(m){
                        return self.transformMessage(m, uMap);
                    });
                    console.log('transformed messsages = ', arr);
                    callback(arr, uMap);
                });
            }.bind(this));
        }

    },

    //map: userId - notReadNumber
    loadNotReadMessagesUsersMap: function(userId, callback){
        var q = new Parse.Query('PatientMessage');
        q.limit(1000);
        q.containedIn('toId', [userId]);
        q.equalTo('status', 'new');
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var map = {};
            for (var i in list){
                if (map[list[i].get('fromId')] == undefined){
                    map[list[i].get('fromId')] = {
                        messagesNumber: 0,
                        lastTimestamp: 0
                    };
                }
                map[list[i].get('fromId')].messagesNumber++;
                if (map[list[i].get('fromId')].lastTimestamp < (new Date(list[i].createdAt)).getTime()){
                    map[list[i].get('fromId')].lastTimestamp = (new Date(list[i].createdAt)).getTime();
                }

            }
            console.log('loaded not read map: ', map);
            callback(map);
        });
    },

    sendMessage: function(fromId, toId, content, attachments, callback){
        var PatientMessage = Parse.Object.extend('PatientMessage');
        var m = new PatientMessage();
        m = ParseMixin.safeSet(m, [{name: 'fromId', value: fromId},
            {name: 'toId', value: toId},
            {name: 'content', value: content},
            {name: 'attachments', value: attachments},
            {name: 'status', value: 'new'}
        ]);
        var self = this;
        m.save().then(function(savedM){
            callback(self.transformMessage(savedM, {}));
        });
    },

    loadTeacherStudents: function(userId, callback){
        ClassMixin.loadTeacherStudents(userId, function(students){
            callback(students);
        })
    },

    makeMessagesRead: function(messages, callback){
        console.log('makeMessagesRead occured: ', messages);
        if (messages == undefined){
            return;
        }
        var messagesIds = messages.map(function(m){return m.id});
        var q = new Parse.Query('PatientMessage');
        q.limit(1000);
        q.containedIn('objectId', messagesIds);
        q.find(function(results){
            var arr = [];
            for (var i in results){
                var r = results[i];
                r.set('status', 'read');
                arr.push(r);
            }
            Parse.Object.saveAll(arr, {
                success: function(){
                    var list = [];
                    for (var i in messages){
                        var mm = messages[i];
                        mm.status = 'read';
                        list.push(mm);
                    }
                    callback(list);
                }
            });
        });
    }

}

module.exports = ChatMixin;