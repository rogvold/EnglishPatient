/**
 * Created by sabir on 09.01.15.
 */

var TeacherChatManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.classes = [];
    this.students = [];
    this.userLinks = [];
    this.userChatManager = new UserChatManager();
    this.selectedFriend = undefined;

    this.init = function(){
        initParse();
        self.userChatManager.init();
        self.initChartUserItem();
        self.currentUserManager.init(function(){
            self.loadClasses(function(){
                self.loadStudents(function(){
                    self.drawStudents();
                });
            });
        });
    }

    this.loadClasses = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientClass'));
        q.limit(1000);
        q.equalTo('ownerId', self.currentUserManager.currentUser.id);
        enablePreloader('loading classes ...');
        q.find(function(results){
            self.classes = results;
            console.log('classes = ', results);
            disablePreloader();
            callback();
        });
    }


    this.loadStudents = function(callback){
        var q = new Parse.Query(Parse.Object.extend('StudentClassLink'));
        q.containedIn('classId', self.classes.map(function(c){return c.id}));
        q.limit(1000);
        enablePreloader('loading students ...');
        q.find(function(results){
            self.userLinks = results;
            console.log('links = ', results);
            if (results.length == 0){
                disablePreloader();
                callback();
                return;
            }
            var q2 = new Parse.Query(Parse.User);
            q2.limit(1000);
            q2.containedIn('objectId', results.map(function(e){return e.get('studentId')}));
            q2.find(function(res){
                self.students = res;
                console.log('students = ', res);
                disablePreloader();
                callback();
            });
        });
    }

    this.drawStudents = function(){
        var list = self.students;
        var s = '';
        for (var i in list){
            s+=self.getChatUserItemHtml(list[i]);
        }
        $('#usersList').html(s);
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
        var list = self.students;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

}