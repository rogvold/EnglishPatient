/**
 * Created by sabir on 07.07.15.
 */

var TeacherAllDialogsManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.dialogs = [];
    this.selectedDialog = undefined;
    this.remarkable = new Remarkable();


    this.init = function(){
        initParse();
        self.initButtons();
        self.currentUserManager.init(function(){
            self.loadDialogs(function(){
                self.drawDialogs();
            });
        });
    }


    this.loadDialogs = function(callback){
        var userId = self.currentUserManager.currentUser.id;
        var q = new Parse.Query(Parse.Object.extend('PatientDialog'));
        q.equalTo('creatorId', userId);
        q.addDescending('createdAt');
        q.find(function(results){
            self.dialogs = results;
            callback();
        });
    }


    this.drawDialogs = function(){
        var s = '';
        var list = self.dialogs;
        for (var i in list){
            var d = list[i];
            s+= self.getDialogItemHtml(d);
        }
        $('#dialogsList').html(s);
    }

    this.getDialogItemHtml = function(d){
        var s = '';
        if (d == undefined){
            return '';
        }
        s+= '<div class="switch-item hr legal mt5 exercisePanel " style="">'
            + '<section class="panel">'
            + '<div class="thumb">'
            + '<img class="img-responsive" alt="Responsive image" src="' + d.get('avatar') +'">'
            + '</div>'
            + '<div class="panel-body">'
            + '<div class="switcher-content">'
            + '<p>'
            + '<b>Name:</b><b style="color: firebrick;" >' + d.get('name') + '</b>'
            + '</p>'

            + '<div>'
            + '<b>Description:</b>' + self.remarkable.render(d.get('description'))
            + '</div>'

            + '<p>'
            + '<b>Персонажи: </b>' + d.get('firstRoleName') + ', ' + d.get('secondRoleName')
            + '</p>'

            + '<a href="dialog.html?id=' + d.id + '" class="show small"><i class="ti-eye" ></i> перейти к наполнению</a>'
            + '<a href="javascript:void(0);" data-id="' + d.id +'" class="show small editButton"><i class="ti-pencil" ></i> редактировать</a>'
            + '</div>'
            + '</div>'
            + '</section>'
            + '</div>';
        return s;
    }


    this.initButtons = function(){
        $('body').on('click','.editButton', function(){
            var dId = $(this).attr('data-id');
            self.selectedDialog = self.getDialogById(dId);
            var d = self.selectedDialog;
            $('#editName').val(d.get('name'));
            $('#editDescription').val(d.get('description'));
            $('#editFirstRoleName').val(d.get('firstRoleName'));
            $('#editSecondRoleName').val(d.get('secondRoleName'));
            $('#editFirstRoleImg').val(d.get('firstRoleImg'));
            $('#editSecondRoleImg').val(d.get('secondRoleImg'));
            $('#editAvatar').val(d.get('avatar'));
            $('#editVimeoId').val(d.get('vimeoId'));

            $('#editModal').modal();
        });
        $('#updateButton').bind('click', function(){
            var d = self.selectedDialog;
            d.set('name', $('#editName').val().trim());
            d.set('description', $('#editDescription').val().trim());
            d.set('avatar', $('#editAvatar').val().trim());
            d.set('firstRoleName', $('#editFirstRoleName').val().trim());
            d.set('secondRoleName', $('#editSecondRoleName').val().trim());
            d.set('firstRoleImg', $('#editFirstRoleImg').val().trim());
            d.set('secondRoleImg', $('#editSecondRoleImg').val().trim());
            d.set('vimeoId', $('#editVimeoId').val().trim());

            enablePreloader('saving...');
            d.save().then(function(){
                disablePreloader();
                $('#editModal').modal('hide');
                toastr.success('saved');
                window.location.href = window.location.href;
            });
        });

        $('#createButton').bind('click', function(){
            var PatientDialog = Parse.Object.extend('PatientDialog');
            var d = new PatientDialog();
            d.set('creatorId', self.currentUserManager.currentUser.id);
            var name = $('#name').val().trim();
            if (name == undefined || name == ''){
                toastr.error('Empty field!');
                return;
            }
            d.set('name', name);
            d.set('description', $('#description').val().trim());
            d.set('avatar', $('#avatar').val().trim());

            d.set('firstRoleName', $('#firstRoleName').val().trim());
            d.set('secondRoleName', $('#secondRoleName').val().trim());
            d.set('firstRoleImg', $('#firstRoleImg').val().trim());
            d.set('secondRoleImg', $('#secondRoleImg').val().trim());

            d.set('vimeoId', $('#vimeoId').val().trim());

            d.save().then(function(){
                toastr.success('saved');
                window.location.href = window.location.href;
                return;
            });
        });

        $('#deleteButton').bind('click', function(){
            if (confirm('Are you sure?') == false){
                return;
            }
            self.selectedDialog.destroy({
                success: function(){
                    window.location.href = window.location.href;
                }
            });
        });

    }

    this.getDialogById = function(id){
        var list = self.dialogs;
        for (var i in list){
            var d = list[i];
            if (d.id == id){
                return d;
            }
        }
    }

}