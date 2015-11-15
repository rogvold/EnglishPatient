/**
 * Created by sabir on 27.12.14.
 */

var TeacherUserAnswersManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.heShephrases = [];
    this.auditorExercises = [];
    this.questionaryQuestions = [];
    this.user = undefined;
    this.userHeSheAnswers = [];


    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.loadUser(function(){

            });
        });
    }

    this.loadUser = function(callback){
        var userId = gup('userId');
        if (userId == undefined){
            window.location.href = 'index.html';
            return;
        }
        var q = new Parse.Query(Parse.User);
        enablePreloader();
        q.find(userId, {
            success: function(u){
                self.user = u;
                disablePreloader();
                callback();
            }
        });
    }

    this.loadHeShePhrases = function(callback){
        var q = new Parse.Query(Parse.Object.extend('HeShePhrase'));
        q.equalTo('userId', self.user.id);
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.heShephrases = results;
            disablePreloader();
            callback();
        });
    }

    this.loadUserHeSheAnswers = function(callback){
        var q = new Parse.Query(Parse.Object.extend('UserHeSheAnswer'));
        q.limit(1000);
        q.equalTo('userId', self.user.id);
        enablePreloader();
        q.find(function(results){
            disablePreloader();
            self.userHeSheAnswers = results;
            callback();
        });
    }


}