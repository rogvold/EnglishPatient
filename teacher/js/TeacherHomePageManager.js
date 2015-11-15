/**
 * Created by sabir on 17.12.14.
 */

var TeacherHomePageManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.classes = [];
    this.allSystemClasses = [];
    this.selectedClass = undefined;


    this.init = function(){
        initParse();
        self.initClassItems();
        self.initAddNewClassButton();
        self.prepareUpdateClassModal();
        self.currentUserManager.init(function(){
            if (self.currentUserManager.currentUser.get('userRole') != 'teacher'){
                window.location.href = '/index.html';
                return;
            }
            self.loadClasses(function(){
                self.loadAllSystemClasses(function(){
                    self.drawClasses();
                });

            })
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
            console.log('classes loaded: ', self.classes);
            disablePreloader();
            callback();
        });
    }


    this.getClassItem = function(c){
        var s = '';
        s+='';
        s+='<div class="col-md-4 col-sm-12  " data-id="' + c.id + '" >'
        +'<section class="panel position-relative">'


        +'<div class="panel-body">' +
            '<i class="ti-pencil pull-right updateClassItem" data-id="' + c.id +'"  ></i>'
        +'<div class="overflow-hidden bb">'
        +'<p class="no-m classItem"  data-id="' + c.id + '"  >'
        +'<b>' + c.get('name') + '</b>'
        +'</p>'
        + '<small>Invitation code: <b>' + c.get('invitationCode') + '</b></small>'
        +'</div>'
        +'<p class="small">'
        +'' + (c.get('description') == undefined || c.get('description') == '' ? '&nbsp;' : c.get('description'))
        +'</p>'

        +'</div>'
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

        setTimeout(function(){ //bells and whistles
            //$('#classesPlaceholder .col-md-4').transition({
            //    debug     : true,
            //    animation : 'pulse',
            //    duration  : 200,
            //    interval  : 200
            //});
            $('.nav li').transition({
                debug     : true,
                animation : 'bounce',
                duration  : 500,
                interval  : 200
            });
            $('.navbar-brand').transition({
                debug     : true,
                animation : 'flash',
                duration  : 500,
                interval  : 200
            });
        }, 100);



    }

    this.initClassItems = function(){
        $('body').on('click', '.classItem', function(){
            var id = $(this).attr('data-id');
            window.location.href = 'class.html?id=' + id;
        });
    }

    this.initAddNewClassButton = function(){
        $('#createClassButton').bind('click', function(){
            var name = $('#className').val().trim();
            var description = $('#classDescription').val().trim();
            if (name == undefined || name == ''){
                toastr.error('name is empty!');
                return;
            }
            var PatientClass = Parse.Object.extend('PatientClass');
            var p = new PatientClass();
            p.set('ownerId', self.currentUserManager.currentUser.id);
            p.set('name', name);
            p.set('description', description);
            p.set('invitationCode', self.getUniqueCode());
            enablePreloader();
            p.save().then(function(){
                disablePreloader();
                toastr.success('New class created');
                self.loadClasses(function(){
                    self.drawClasses();
                    $('#newClassModal').modal('hide');
                })
            });
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

    this.codeIsUsed = function(code){
        var list = self.allSystemClasses;
        for (var i in list){
            if (list[i].get('invitationCode') == code){
                return true;
            }
        }
        return false;
    }

    this.getUniqueCode = function(){
        var code = randomString(4);
        while (self.codeIsUsed(code) == true){
            code = randomString(4);
        }
        return code;
    }


    this.prepareUpdateClassModal = function(){
        $('body').on('click', '.updateClassItem', function(){
            var id = $(this).attr('data-id');
            var c = self.getClassById(id);
            $("#updateClassName").val(c.get('name'));
            $("#updateClassDescription").val(c.get('description'));
            self.selectedClass = c;

            $('#updateClassModal').modal();
        });

        $('#updateClassButton').bind('click', function(){
            self.selectedClass.set('name', $("#updateClassName").val());
            self.selectedClass.set('description', $("#updateClassDescription").val());
            enablePreloader();
            self.selectedClass.save().then(function(){
                disablePreloader();
                toastr.success('Updated');
                window.location.href = window.location.href;
            });
        });

        $('#deleteClassButton').bind('click', function(){
            var c = self.selectedClass;
            console.log('deleting', c);
            if (confirm('Вы действительно хотите удалить этот класс? Процесс необратим!') == false){
                return;
            }
            self.destroyClassAssignments(c.id, function(){
               self.destroyClassLinks(c.id, function(){
                   enablePreloader();
                   self.selectedClass.destroy({
                       success: function(){
                           disablePreloader();
                           toastr.success('deleted');
                           window.location.href = window.location.href;
                       }
                   });

               });
            });
        });
    }

    this.destroyClassLinks = function(cId, callback){
        var q = new Parse.Query(Parse.Object.extend('StudentClassLink'));
        q.limit(1000);
        q.equalTo('classId', cId);
        enablePreloader();
        q.find(function(results){
            if (results.length == 0){
                disablePreloader();
                callback();
                return;
            }
            Parse.Object.destroyAll(results, {
               success: function(){
                   disablePreloader();
                   callback();
                   return;
               }
            });
        });
    }

    this.destroyClassAssignments = function(cId, callback){
        var q = new Parse.Query(Parse.Object.extend('PatientAssignment'));
        q.limit(1000);
        q.equalTo('classId', cId);
        enablePreloader();
        q.find(function(results){
            if (results.length == 0){
                disablePreloader();
                callback();
                return;
            }
            Parse.Object.destroyAll(results, {
                success: function(){
                    disablePreloader();
                    callback();
                    return;
                }
            });
        });
    }


    this.getClassById = function(id){
        var list = self.classes;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

}