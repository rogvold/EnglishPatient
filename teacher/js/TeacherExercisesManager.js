/**
 * Created by sabir on 24.12.14.
 */

var TeacherExercisesManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){

        });
    }

}