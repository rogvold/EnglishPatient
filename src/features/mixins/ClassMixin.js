/**
 * Created by sabir on 05.10.15.
 */
var Parse = require('parse').Parse;
var FeedMixin = require('./FeedMixin');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../react/mixins/commonMixins/CommonMixin');

var ClassMixin = {

    transformClass: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            name: p.get('name'),
            status: p.get('status'),
            description: p.get('description'),
            code: p.get('invitationCode'),
            invitationCode: p.get('invitationCode'),
            id: p.id,
            ownerId: p.get('ownerId'),
            classId: p.classId
        }
    },

    loadClassById: function(classId, callback){
        if (classId == undefined){
            return;
        }
        var q = new Parse.Query('PatientClass');
        q.get(classId, function(c){
            callback(c);
        });
    },

    loadClass: function(classId, callback){
        console.log('loadClass occured: classId = ', classId);
        var self = this;
        this.loadClassById(classId, function(p){
            if (p == undefined){
                callback(undefined);
                return;
            }
           callback(self.transformClass(p));
        });
    },

    loadTeacherClasses: function(teacherId, callback){
        if (teacherId == undefined){
            callback([]);
        }
        var self = this;
        var q = new Parse.Query('PatientClass');
        q.equalTo('ownerId', teacherId);
        q.limit(1000);
        q.addAscending('status');
        q.addDescending('createdAt');
        q.find(function(results){
            var list = results.map(function(c){
                return self.transformClass(c)
            });
            callback(list);
        });
    },

    loadUserClasses: function(userId, callback){
        console.log('loadUserClasses occured: userId = ', userId);
        var q = new Parse.Query('StudentClassLink');
        q.limit(1000);
        q.equalTo('studentId', userId);
        var self = this;
        q.find(function(links){
            console.log('links loaded: ', links);
            var ids = links.map(function(l){return l.get('classId')});
            var q2 = new Parse.Query('PatientClass');
            q2.containedIn('objectId', ids);
            q2.addDescending('createdAt');
            q2.limit(1000);
            q2.find(function(classes){
                var list = classes.map(function(cl){
                    return self.transformClass(cl);
                });
                console.log('classes loaded: ', list);
                callback(list);
            });
        });
    },

    loadAllSystemClasses: function(callback){
        var q = new Parse.Query('PatientClass');
        q.limit(1000);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(cl){
                return self.transformClass(cl);
            });
            callback(arr);
        });
    },

    generateUniqueCode: function(classesList){
        var map = {};
        for (var i in classesList){
            var cl = classesList[i];
            map[cl.code] = cl;
        }
        var code = CommonMixin.getRandomString(4);
        while (map[code] != undefined){
            code = CommonMixin.getRandomString(4);
        }
        return code;
    },


    createClass: function(teacherId, name, description, callback){
        var self = this;
        var PatientClass = Parse.Object.extend('PatientClass');
        this.loadAllSystemClasses(function(classes){
            console.log('all system classes loaded: ', classes);
            var code = self.generateUniqueCode(classes);
            var cl = new PatientClass();

            cl = ParseMixin.safeSet(cl, [
                {name: 'invitationCode', value: code},
                {name: 'description', value: description},
                {name: 'name', value: name},
                {name: 'status', value: 'active'},
                {name: 'ownerId', value: teacherId}
            ]);
            cl.save().then(function(updatedClass){
                callback({
                    classId: updatedClass.id,
                    id: updatedClass.id,
                    name: updatedClass.get('name'),
                    status: updatedClass.get('status'),
                    description: updatedClass.get('description'),
                    code: updatedClass.get('invitationCode'),
                    invitationCode: updatedClass.get('invitationCode')
                });
            });

        });
    },

    updateClass: function(classId, name, description, status, callback){
        var self = this;
        this.loadClassById(classId, function(c){
            if (c == undefined){
                callback(undefined);
                return;
            }
            c = ParseMixin.safeSet(c, [
                {name: 'name', value: name},
                {name: 'description', value: description},
                {name: 'status', value: status}
            ]);
            c.save().then(function(cl){
                callback({
                    id: cl.id,
                    classId: cl.id,
                    name: name,
                    status: status,
                    description: description,
                    code: cl.get('invitationCode')
                });
            });
        });
        //this.loadClass
    },


    addUserToClassByInvitationCode: function(code, userId, callback){
        if (code == undefined || code.trim() == '' || (code.trim().length != 4)){
            callback(undefined);
            return;
        }
        code = code.toUpperCase();
        var self = this;
        var q = new Parse.Query('PatientClass');
        q.equalTo('invitationCode', code);

        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
                return;
            }
            var pClass = results[0];
            var patientClass = {
                id: pClass.id,
                classId: pClass.id,
                name: pClass.get('name'),
                status: pClass.get('status'),
                description: pClass.get('description'),
                code: code
            };

            self.loadStudentClassLink(patientClass.id, userId, function(lnk){
                if (lnk == undefined){
                    var StudentClassLink = Parse.Object.extend('StudentClassLink');
                    var link = new StudentClassLink();
                    link.set('studentId', userId);
                    link.set('classId', pClass.id);
                    link.save().then(function(){
                        callback(patientClass);
                    });
                }else{
                    callback(patientClass);
                }
            });
        });
    },

    addUserToClass: function(classId, userId, callback){
        var self = this;
        this.loadClassById(classId, function(pClass){
            if (pClass == undefined){
                callback(undefined);
                return;
            }
            self.loadStudentClassLink(classId, userId, function(lnk){
                if (lnk == undefined){
                    var StudentClassLink = Parse.Object.extend('StudentClassLink');
                    var link = new StudentClassLink();
                    link.set('studentId', userId);
                    link.set('classId', pClass.id);
                    link.save().then(function(){
                        callback(self.transformClass(pClass));
                    });
                }else{
                    callback(self.transformClass(pClass));
                }
            });
        });
    },

    loadStudentClassLink: function(classId, studentId, callback){
        var q = new Parse.Query('StudentClassLink');
        q.equalTo('classId', classId);
        q.equalTo('studentId', studentId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
                return;
            }
            callback(results[0]);
        });
    },

    loadClassByInvitationCode: function(code, callback){
        var q = new Parse.Query('PatientClass');
        q.equalTo('invitationCode', code);
        var self = this;
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
                return;
            }
            var c = results[0];
            callback(self.transformClass(c));
        });
    },


    deleteClass: function(classId, callback){
        this.loadClassById(classId, function(c){
            c.destroy({
                success: function(){
                    callback();
                }
            });
        });
    },

    deleteUserFromClass: function(userId, classId, callback){
        var q = new Parse.Query('StudentClassLink');
        q.equalTo('studentId', userId);
        q.equalTo('classId', classId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback();
                return;
            }else{
                var link = results[0];
                link.destroy({
                    success: function(){
                        callback();
                    },
                    error: function(){
                        callback();
                    }
                });
            }
        });
    },

    getUserName: function(u){
        var firstName = (u.get('firstName') == undefined) ? '' : u.get('firstName');
        var lastName = (u.get('lastName') == undefined) ? '' : u.get('lastName');
        var name = firstName + ' ' + lastName;
        if (name == ' '){
            name = u.get('email')
        }
        return name;
    },

    loadUsersFromClass: function(classId, callback){
        var self = this;
        var q = new Parse.Query('StudentClassLink');
        q.limit(1000);
        q.equalTo('classId', classId);
        q.find(function(links){
            var ids = [];
            var linksMap = {};
            for (var i in links){
                var l = links[i];
                ids.push(l.get('studentId'));
                linksMap[l.get('studentId')] = l;
            }
            var q2 = new Parse.Query(Parse.User);
            q2.containedIn('objectId', ids);
            q2.find(function(users){
                var list = users.map(function(u){
                    var name = self.getUserName(u);
                    return {
                        id: u.id,
                        userId: u.id,
                        name: name,
                        email: u.get('email'),
                        avatar: u.get('avatar'),
                        timestamp: (new Date(linksMap[u.id].createdAt)).getTime()
                    }
                });
                callback(list);
            }.bind(this));
        }.bind(this));
    },

    loadPatientClass: function(classId, callback){
        var self = this;
        var result = {};
        this.loadUsersFromClass(classId, function(users){
            result.users = users;
            var q = new Parse.Query('PatientClass');
            q.get(classId, {
                success: function(cl){

                    FeedMixin.loadFeedByClassId(classId, function(feed){
                        result.patientClass = {
                            feedId: feed.id,
                            name: cl.get('name'),
                            id: cl.id,
                            classId: cl.id,
                            description: cl.get('description'),
                            status: cl.get('status'),
                            ownerId: cl.get('ownerId'),
                            code: cl.get('invitationCode'),
                            timestamp: (new Date(cl.createdAt)).getTime()
                        }
                        callback(result);
                    });

                }, error: function(){

                }
            });
        });
    },

    loadTeacherStudents: function(teacherId, callback){
        console.log('loading teacher students');
        var self = this;
        this.loadTeacherClasses(teacherId, function(classes){
            console.log('teacher classes: ', classes);
            var ids = classes.map(function(c){return c.id});
            var q = new Parse.Query('StudentClassLink');
            q.containedIn('classId', ids);
            q.limit(1000);
            q.find(function(links){
                console.log('class links: ', links);
                var q2 = new Parse.Query(Parse.User);
                q2.limit(1000);
                q2.containedIn('objectId', links.map(function(l){return l.get('studentId');}));
                q2.find(function(users){
                    console.log('users: ', users);
                    var list = users.map(function(u){
                        return {
                            id: u.id,
                            name: self.getUserName(u),
                            avatar: u.get('avatar')
                        }
                    });
                    callback(list);
                });
            });
        });
    }


}

module.exports = ClassMixin;