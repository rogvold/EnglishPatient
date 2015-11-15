/**
 * Created by sabir on 06.11.14.
 */

var UserManager = function(){
    var self = this;
    this.users = [];
    this.interfaceDisabled = false;
    this.userExerciseScores = [];


    this.init = function(){
        initParse();
        self.loadUsers(function(){
            self.loadUserExerciseScores(function(){
                self.generateUsersCards();
            });
        });
        self.initCreateButton();
    }

    this.loadUsers = function(callback){
        var q = new Parse.Query(Parse.User);
        q.addAscending('firstName');
        q.addAscending('lastName');
        q.limit(1000);
        q.find(function(users){
            console.log(users);
            self.users = users;
            callback();
        });
    }

    this.generateUsersCards = function(){
        var list = self.users;
        var s = '';
        for (var i in list){
            s += self.generateUserCardHtml(list[i]);
        }
        $('#usersCards').html(s);
    }


    this.generateUserCardHtml = function(u){
        if (u == undefined){
            return '';
        }
        var s = '';
        var scores = self.getUserScores(u.id);
        var startedNum = 0, finishedNum = 0;
        scores.forEach(function(a){if(a.get('status') == 'new'){startedNum++;} if (a.get('status') == 'finished') {finishedNum++;}});

        s+=('<div class="col-md-4">'
            +'<div class="panel overflow-hidden no-b profile p15">'
            +'<div class="row">'
            +'<div class="col-sm-12">'
            +'<div class="row">'
            +'<div class="col-xs-12 col-sm-9">'
            +'<h4 class="mb0 studentName">' + u.get('firstName')+ ' ' + u.get('lastName') +'</h4>'
            +'<ul class="user-meta">'
            +'<li>'
            +'<i class="ti-email mr5"></i>'
            +'<span class="studentEmail">' + u.get('email') +'</span>'
            +'</li>'
            +'<li>'
            +'<i class="ti-mobile mr5"></i>'
            +'<span" class="studentPhone" >' + u.get('phone') + '</span>'
            +'</li>'
            +'</ul>'
            +'</div>'
            +'<div class="col-sm-3 pr5" >' +
                '<div class="startedBlock" >started: <span class="startedVal bolder" >' + startedNum + '</span></div>' +
                '<div class="finishedBlock" >finished: <span class="finishedVal bolder" >' + finishedNum + '</span></div>' +
            '</div>'
            +'</div>'
            +'</div>'

            +'</div>'

            +'</div>'

            +'</div>');

        return s;
    }


    this.initCreateButton = function(){
        $('#createNewUserButton').bind('click', function(){
            var firstName = $('#newUserFirstName').val().trim();
            var lastName = $('#newUserLastName').val().trim();
            var email = $('#newUserEmail').val().trim();
            var password = $('#newUserPassword').val().trim();
            var phone = $('#newUserPhone').val().trim();
            var u = new Parse.User();
            u.set('firstName', firstName);
            u.set('lastName', lastName);
            u.set('phone', phone);
            u.set('userPassword', password);
            u.set('email', email);
            u.set('username', email);
            u.set('password', password);
            u.signUp(null, {
                success: function(user, error){
//                    Parse.User.become(self.currentUserManager.currentUser._sessionToken);
                    self.loadUsers(function(){self.generateUsersCards()});
                },
                error: function(user, error){
                    alert(error.message);
                }
            });
        });
    }

    this.getTraineeById = function(traineeId){
        var list = self.users;
        for (var i in list){
            if (list[i].id == traineeId){
                return list[i];
            }
        }
        return undefined;
    }

    this.loadUserExerciseScores = function(callback){
        var q = new Parse.Query(Parse.Object.extend('UserExerciseScore'));
        q.limit(1000);
        q.find(function(results){
            self.userExerciseScores = results;
            console.log('scores', results);
            callback();
        });
    }

    this.getUserScores = function(userId){
        var arr = [];
        var list = self.userExerciseScores;
        for (var i in list){
            if (list[i].get('userId') == userId){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.removeFromArray = function(arr, uId){
        var index = arr.indexOf(uId);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }



}
