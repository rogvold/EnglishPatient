/**
 * Created by sabir on 04.01.15.
 */

var TeacherToolsListManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            if (self.currentUserManager.currentUser.get('userRole') != 'teacher'){
                window.location.href = '/index.html';
            }
        });
    }
}