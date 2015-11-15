/**
 * Created by sabir on 17.12.14.
 */

var TeacherClassManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.class = undefined;
    this.studentClassLinks = [];
    this.allStudents = [];
    this.students = [];
    this.assignmentManager = new TeacherAssignmentManager();

    this.init = function(){
        initParse();
        self.initPhoneLink();
        self.currentUserManager.init(function(){
            self.loadCurrentClass(function(){
                self.loadAllStudents(function(){
                    self.loadStudentClassLinks(function(){
                        self.prepareCurrentClass();
                        self.assignmentManager.init(function(){
                            console.log('assignment loaded');
                        });
                    });
                });
            });
        });
    }

    this.loadCurrentClass = function(callback){
        var id = gup('id');
        if (id == undefined){
            window.location.href = 'index.html';
            return;
        }
        var q = new Parse.Query(Parse.Object.extend('PatientClass'));
        q.limit(1000);
        q.get(id, {
            success: function(c){
                self.class = c;
                callback();
            },
            error: function(err){
                window.location.href = 'index.html';
            }
        })
    }

    this.loadStudentClassLinks = function(callback){
        var StudentClassLink = Parse.Object.extend('StudentClassLink');
        var q = new Parse.Query(StudentClassLink);
        q.limit(1000);
        q.equalTo('classId', self.class.id);
        q.addAscending('createdAt');
        enablePreloader();
        q.find(function(results){
            self.studentClassLinks = results;
            var alls = self.allStudents;
            for (var i in results){
                for (var j in alls){
                    if (results[i].get('studentId') == alls[j].id){
                        self.students.push(alls[j]);
                    }
                }
            }
            disablePreloader();
            callback();
        });
    }

    this.loadAllStudents = function(callback){
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        q.equalTo('userRole', 'student');
        enablePreloader();
        q.find(function(list){
            self.allStudents = list;
            disablePreloader();
            callback();
        });
    }

    this.getStudentById = function(id){
        var list = self.students;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.drawStudents = function(){
        var list = self.students;
        var s = '';
        for (var i in list){
            s+=self.getStudentItemHtml(list[i]);
        }
        $('#studentsList').html(s);
    }

    this.getStudentItemHtml = function(u){
        var s = '';
        s+='<li class="studentItem" data-id="' + u.id + '" >' +
        '<span class="panel" >' +
        '<i class="ti-mobile phoneLink pull-right" data-id="' + u.id +'" ></i>' +
        '<img class="avatar avatar-sm img-circle" src="' + u.get('avatar') + '" />' +
        '<b>' + u.get('firstName') + ' ' + u.get('lastName') + '</b>' +
        '</span>' +
        '</li>'
        return s;
    }

    this.prepareCurrentClass = function(){
        self.drawStudents();
        $('.className').html(self.class.get('name'));
        $('.classDescription').html(self.class.get('description'));
        $('.classCode').html(self.class.get('invitationCode'));
        $('#checkerLink').attr('href', 'checker.html?classId=' + self.class.id);
    }

    this.initPhoneLink = function(){
        $('body').on('click', '.phoneLink', function(){
            var id = $(this).attr('data-id');
            window.location.href = 'videochat.html?callerId=' + id;
        });
    }

}