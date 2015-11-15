/**
 * Created by sabir on 17.12.14.
 */


var TeacherProfileManager = function(){
    var self = this;
    self.currentUserManager = new CurrentUserManager();

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.prepareForm();
            self.initUpdateProfileButton();
        });
    }

    this.initUpdateProfileButton = function(){
        $('#updateButton').bind('click', function(){
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();
            var avatar = $('#avatar').val();
            var blogName = $('#blogName').val().trim();
            var blogDescription = $('#blogDescription').val().trim();
            var blogAvatar = $('#blogAvatar').val().trim();
            if (validateUrl(avatar) == false){
                toastr.error('invalid avatar url');
                return;
            }
            var u = self.currentUserManager.currentUser;
            u.set('firstName', firstName);
            u.set('lastName', lastName);
            u.set('avatar', avatar);
            u.set('blogName', blogName);
            u.set('blogDescription', blogDescription);
            u.set('blogAvatar', blogAvatar);
            enablePreloader();
            self.currentUserManager.currentUser.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }

    this.prepareForm = function(){
        var u = self.currentUserManager.currentUser;
        $('#firstName').val(u.get('firstName'));
        $('#lastName').val(u.get('lastName'));
        $('#avatar').val(u.get('avatar'));
        $('#blogName').val((u.get('blogName') == undefined) ? '' : u.get('blogName'));
        $('#blogAvatar').val((u.get('blogAvatar') == undefined) ? '' : u.get('blogAvatar'));
        $('#blogDescription').val((u.get('blogDescription') == undefined) ? '' : u.get('blogDescription'));
    }

}