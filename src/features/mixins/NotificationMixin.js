/**
 * Created by sabir on 16.11.15.
 */

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var ClassMixin = require('./ClassMixin');
var UserMixin = require('./UserMixin');

var NotificationMixin = {

    transformNotification: function(n){
        if (n == undefined){
            return undefined;
        }
        return {
            notificationId: n.id,
            id: n.id,
            userId: n.get('userId'),
            timestamp: (new Date(n.createdAt)).getTime(),
            content: n.get('content'),
            name: (n.get('name') == undefined ) ? undefined : n.get('name'),
            attachment: (n.get('attachment') == undefined ) ? undefined : JSON.parse(n.get('attachment')),
            status: n.get('status'),
            forRole: n.get('forRole')
        }
    },

    loadNotificationById: function(notificationId, callback){
        console.log('loadNotificationById occured: notificationId = ' + notificationId);
        if (notificationId == undefined){
            callback(undefined);
            return;
        }
        var q = new Parse.Query('Notification');
        var self = this;
        q.get(notificationId, {
            success: function(n){
                callback(n);
            }
        });
    },


    loadNotification: function(notificationId, callback){
        var self = this;
        this.loadNotificationById(notificationId, function(n){
            callback(self.transformNotification(n));
        });
    },


    loadUserNotifications: function(userId, status, callback){
         var self = this;
         var q = new Parse.Query('Notification');
         q.equalTo('userId', userId);
         if (status != undefined){
             q.equalTo('status', status);
         }
         ParseMixin.loadAllDataFromParse(q, function(list){
             var arr = list.map(function(m){
                 return self.transformNotification(m);
             });
             callback(arr);
         });
     },


     makeNotificationViewed: function(notificationId, callback){
         var self = this;
         this.loadNotificationById(notificationId, function(n){
             n.set('status', 'viewed');
             n.save().then(function(no){
                 callback(self.transformNotification(no));
             });
         });
     },

    createNotification: function(userId, forRole, name, content, attachment, callback){
        console.log('createNotification occured: userId, forRole, content, attachment = ', userId, forRole, content, attachment);
        if (userId == undefined){
            callback(undefined);
            return;
        }
        var self = this;
        var Notification = Parse.Object.extend('Notification');
        var n = new Notification();
        var attach = (attachment == undefined) ? undefined : JSON.stringify(attachment);
        n = ParseMixin.safeSet(n, [{name: 'userId', value: userId},
                                   {name: 'forRole', value: forRole},
                                   {name: 'name', value: name},
                                   {name: 'status', value: 'new'},
                                   {name: 'content', value: content},
                                   {name: 'attachment', value: attach}]);
        n.save().then(function(no){
            callback(self.transformNotification(no));
        });
    },


    //specific notifications go there
    //from student to teacher

    createStudentFinishedExerciseNotification: function(userId, exerciseId, classId, callback){
        console.log('createStudentFinishedExerciseNotification occured: ' +
            'userId, exerciseId, classId = ', userId, exerciseId, classId);

        var forRole = 'teacher';
        var name = 'Пользователь выполнил упражнение';
        var self = this;
        console.log('loading user: userId = ', userId);
        UserMixin.loadUser(userId, function(u){
            console.log('user loaded: ', u);
            var userName = u.name;
            console.log('loading class: classId = ', classId);
            ClassMixin.loadClass(classId, function(cl){
                console.log('class loaded: ', cl);
                var patientClassName = cl.name;
                var content = 'Пользователь <b>' + userName + '</b>' +
                    ' выполнил упражнение в классе ' +
                    '<a target="_blank" href="/#/class/' + cl.id + '" >' + patientClassName + '</a>';
                var attachment = {
                    type: 'exercise',
                    exerciseId: exerciseId,
                    userId: userId
                };
                self.createNotification(cl.ownerId, forRole, name, content, attachment, function(no){
                    callback(no);
                });
            });
        })
    }

}



module.exports = NotificationMixin;