/**
 * Created by sabir on 17.12.14.
 */

var StudentHomePageManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.classes = [];
    this.allSystemClasses = [];
    this.studentClassLinks = [];
    this.teachers = [];
    this.newClass = undefined;

    this.init = function(){
        initParse();
        self.initClassItems();
        self.initAddNewClassButton();
        self.currentUserManager.init(function(){
            if (self.currentUserManager.currentUser.get('userRole') != 'student'){
                window.location.href = '/index.html';
                return;
            }
            self.loadAllSystemClasses(function(){
                self.loadStudentClassLinks(function(){
                    self.loadTeachers(function(){
                        self.drawClasses();
                    });
                });
            });

        });
    }

    this.loadClasses = function(callback){
        var PatientClass = Parse.Object.extend('PatientClass');
        var q = new Parse.Query(PatientClass);
        q.equalTo('ownerId', self.currentUserManager.currentUser.id);
        q.addDescending('createdAt');
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.classes = results;
            console.log('classes loaded ', self.classes);
            disablePreloader();
            callback();
        });
    }

    this.loadAllSystemClasses = function(callback){
        var PatientClass = Parse.Object.extend('PatientClass');
        var q = new Parse.Query(PatientClass);
        q.addDescending('createdAt');
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.allSystemClasses = results;
            disablePreloader();
            callback();
        });
    }


    this.getClassItem = function(c){
        var t = self.getTeacherById(c.get('ownerId'));
        var s = '';
        s+='';
        s+='<div class="col-md-4 col-xs-12 classItem " data-id="' + c.id + '" >'
        +'<section class="panel position-relative">'
        +'<div class="panel-body">'
        +'<a href="javascript:;" class="pull-left mr15">'
        +'<img src="' + t.get('avatar') + '" class="avatar avatar-sm img-circle" alt="">'
        +'</a>'
        +'<div class="overflow-hidden bb">'
        +'<p class="no-m">'
        +'<b>' + c.get('name') + '</b>'
        +'</p>'
        + '<small>by <b>' + t.get('firstName') + ' ' + t.get('lastName') + '</b></small>'
        +'</div>'
        +'<p class="small">'
        +'' + c.get('description')
        +'</p>'
        +'</div>'
        + '</section>'
        +'</div>';

        return s;
    }

    this.drawClasses = function(){
        var s = '';
        var list = self.classes;
        for (var i in list){
            s+= self.getClassItem(list[i]);
        }
        $('#classesPlaceholder').html(s);
        //if (list.length == 1){
        //    $('.classItem:first').click();
        //}
    }

    this.initClassItems = function(){
        $('body').on('click', '.classItem', function(){
            var id = $(this).attr('data-id');
            window.location.href = 'class.html?id=' + id;
        });
    }

    this.loadStudentClassLinks = function(callback){
        var StudentClassLink = Parse.Object.extend('StudentClassLink');
        var q = new Parse.Query(StudentClassLink);
        q.limit(1000);
        q.equalTo('studentId', self.currentUserManager.currentUser.id);
        q.addAscending('createdAt');
        enablePreloader();
        q.find(function(results){
            self.studentClassLinks = results;
            disablePreloader();
            alls = self.allSystemClasses;
            for (var i in results){
                for (var j in alls){
                    if (results[i].get('classId') == alls[j].id){
                        self.classes.push(alls[j]);
                    }
                }
            }
            callback();
        });
    }

    this.loadTeachers = function(callback){
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        q.equalTo('userRole', 'teacher');
        enablePreloader();
        q.find(function(list){
            self.teachers = list;
            disablePreloader();
            callback();
        });
    }

    this.getTeacherById = function(id){
        var list = self.teachers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.checkCode = function(code){
        if (code == undefined || code == ''){
            toastr.error('Code is empty');
            return false;
        }
        if (self.getClassByCode(code) == undefined){
            toastr.error('Code is wrong');
            return false;
        }
        return true;
    }

    this.getClassByCode = function(code){
        if (code == undefined){
            return undefined;
        }
        code = code.toLowerCase();
        var list = self.allSystemClasses;
        for (var i in list){
            if (list[i].get('invitationCode').toLowerCase() == code){
                return list[i];
            }
        }
        return undefined;
    }

    this.initAddNewClassButton = function(){
        $('#addNewClassButton').bind('click', function(){
            var code = $('#invitationCode').val().trim();
            if (self.checkCode(code) == false){
                return;
            }
            self.newClass = self.getClassByCode(code);
            var StudentClassLink = Parse.Object.extend('StudentClassLink');
            var l = new StudentClassLink();
            l.set('studentId', self.currentUserManager.currentUser.id);
            l.set('classId', self.newClass.id);
            enablePreloader();
            l.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }



}