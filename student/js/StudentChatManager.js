/**
 * Created by sabir on 05.01.15.
 */

var StudentChatManager = function(){
    var self = this;
    this.user = undefined;
    this.userChatManager = new UserChatManager();
    this.userLinks = [];
    this.classes = [];
    this.friends = [];
    this.teachers = [];
    this.currentUserManager = new CurrentUserManager();
    this.selectedFriend = undefined;

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.initChartUserItem();
            self.userChatManager.init();
            self.user = Parse.User.current();
            self.loadFriends(function(){
                console.log('friends: ', self.friends);
                self.drawFriends();
                self.loadTeachers(function(){
                    self.drawTeachers();
                });
            });
        });
    }

    this.loadFriends = function(callback){
        var q = new Parse.Query(Parse.Object.extend('StudentClassLink'));
        q.equalTo('studentId', self.user.id);
        enablePreloader();
        q.find(function(links){
            var q2 = new Parse.Query(Parse.Object.extend('StudentClassLink'));
            q2.containedIn('classId', links.map(function(www){return www.get('classId')}));
            q2.limit(1000);
            q2.find(function(links){
                self.userLinks = links;
                var q3 = new Parse.Query(Parse.User);
                q3.limit(1000);
                q3.containedIn('objectId', links.map(function(ttt){return ttt.get('studentId')}));
                q3.notEqualTo('objectId', self.user.id);
                q3.find(function(users){
                    self.friends = users;
                    disablePreloader();
                    callback();
                });
            });
        });
    }

    this.loadTeachers = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientClass'));
        q.containedIn('objectId', self.userLinks.map(function(l){return l.get('classId')}));
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.userClasses = results;
            var q2 = new Parse.Query(Parse.User);
            q2.containedIn('objectId', results.map(function(r){return r.get('ownerId');}));
            q2.find(function(res){
                self.teachers = res;
                disablePreloader();
                callback();
            });
        });
    }

    this.drawFriends = function(){
        var list = self.friends;
        var s = '';
        for (var i in list){
            s+=self.getChatUserItemHtml(list[i]);
        }
        $('#usersList').html(s);
    }

    this.drawTeachers = function(){
        var s = '';
        var list = self.teachers;
        for (var i in list){
            s+= self.getChatTeacherItemHtml(list[i]);
        }
        $('#teachersList').html(s);
    }

    this.getChatTeacherItemHtml = function(u){
        var s = '';
        s+='<div class="chat-user chatUserItem" data-id="' + u.id + '"  >' +
        '<a href="javascript:;" class="user-avatar">' +
        '<img src="' + u.get('avatar') + '" class="avatar avatar-sm img-circle" alt="">' +
            //'<div class="status bg-success"></div>' +
        '</a>' +
        '<div class="user-details">' +
        '<p>' + u.get('firstName') + ' ' + u.get('lastName') + '</p>' +
            //'<small class="user-department">Human Resources</small>' +
        '</div>' +
        '</div>';
        return s;
    }

    this.getChatUserItemHtml = function(u){
        var s = '';
        s+='<div class="chat-user chatUserItem" data-id="' + u.id + '"  >' +
        '<a href="javascript:;" class="user-avatar">' +
        '<img src="' + u.get('avatar') + '" class="avatar avatar-sm img-circle" alt="">' +
        //'<div class="status bg-success"></div>' +
        '</a>' +
        '<div class="user-details">' +
        '<p>' + u.get('firstName') + ' ' + u.get('lastName') + '</p>' +
        //'<small class="user-department">Human Resources</small>' +
        '</div>' +
        '</div>';
        return s;
    }

    this.initChartUserItem = function(){
        $('body').on('click', '.chatUserItem', function(){
            $('.chatUserItem').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            self.selectedFriend = self.getFriendById(id);
            self.userChatManager.prepare(self.selectedFriend.id);
        });
    }

    this.getFriendById = function(id){
        var list = self.friends;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
        list = self.teachers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

}