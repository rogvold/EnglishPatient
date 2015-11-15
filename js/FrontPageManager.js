/**
 * Created by sabir on 17.12.14.
 */

var FrontPageManager = function(){
    var self = this;
    this.user = undefined;

    this.init = function(){
        initParse();
        self.initButtons();
        //todo: uncomment the line below
        self.initCurrentUser(function(){});
    }

    this.initButtons = function(){
        self.initSignUpStudentButton();
        self.initSignUpTeacherButton();
        self.initSignInButton();
    }

    this.initSignUpStudentButton = function(){
        $('#studentSignupButton').bind('click', function(){
            var email = $('#studentEmail').val().trim();
            var password = $('#studentPassword').val().trim();
            var firstName = $('#studentFirstName').val().trim();
            var lastName = $('#studentLastName').val().trim();
            if (self.checkRegInfo(email, password, firstName, lastName) == false){
                return;
            }
            var userRole = 'student';
            email = email.toLowerCase();
            self.signUpUser(email, password, userRole, firstName, lastName, function(){
                window.location.href = 'student/index.html';
            });
        });

        $('#studentPassword').keyup(function(event){
            if(event.keyCode == 13){
                $("#studentSignupButton").click();
            }
        });
    }

    this.initSignUpTeacherButton = function(){
        $('#teacherSignupButton').bind('click', function(){
            var email = $('#teacherEmail').val().trim();
            var password = $('#teacherPassword').val().trim();
            var firstName = $('#teacherFirstName').val().trim();
            var lastName = $('#teacherLastName').val().trim();
            if (self.checkRegInfo(email, password, firstName, lastName) == false){
                return;
            }
            email = email.toLowerCase();
            var userRole = 'teacher';
            self.signUpUser(email, password, userRole, firstName, lastName, function(){
                window.location.href = 'teacher/index.html';
            });
        });

        $('#teacherPassword').keyup(function(event){
            if(event.keyCode == 13){
                $("#teacherSignupButton").click();
            }
        });

    }

    this.initSignInButton = function(){
        $('#signinButton').bind('click', function(){
            var email = $('#email').val().trim();
            var password = $('#password').val().trim();
            if (self.checkLoginInfo(email, password) == false){
                return;
            }
            email = email.toLowerCase();
            $(this).html('подождите...');
            $(this).attr('disabled', true);
            Parse.User.logIn(email, password, {
                success: function(u){
                    if (u.get('userRole') == 'student'){
                        window.location.href = 'student/index.html';
                        return
                    }else{
                        window.location.href = 'teacher/index.html';
                        return;
                    }
                },
                error: function(u, err){
                    toastr.error(err.message);
                    $('#signinButton').html('Sign in');
                    $('#signinButton').removeAttr('disabled');
                }
            });
        });

        $("#password").keyup(function(event){
            if(event.keyCode == 13){
                $("#signinButton").click();
            }
        });

    }

    this.signUpUser = function(email, password, userRole, firstName, lastName, callback){
        Parse.User.signUp(email, password,{
            email: email,
            userPassword: password,
            firstName: firstName,
            lastName: lastName,
            userRole: userRole,
            avatar: 'http://beta.englishpatient.org/img/profile.png'
        },{
            success: function(){
                callback();
            },
            error: function(u, err){
                toastr.error(err.message);
            }
        });
    }

    this.initCurrentUser = function(callback){
        self.user = Parse.User.current();
        if (self.user == undefined || self.user == null){
            callback();
            return;
        }
        if (self.user.get('userRole') == 'student'){
            window.location.href = 'student/index.html';
        }
        if (self.user.get('userRole') == 'teacher'){
            window.location.href = 'teacher/index.html';
        }

    }

    this.checkRegInfo = function(email, password, firstName, lastName){
        if (validateEmail(email) == false){
            toastr.error('Email is not correct');
            return false;
        }
        if (password == undefined || password == ''){
            toastr.error('Password is empty');
            return false;
        }
        if (password.length < 4){
            toastr.error('password is too short');
            return false;
        }
        if (firstName == '' || firstName == undefined){
            toastr.error('First name is not specified');
            return false;
        }
        if (lastName == '' || lastName == undefined){
            toastr.error('Last name is not specified');
            return false;
        }
        return true;
    }

    this.checkLoginInfo = function(email, password){
        if (validateEmail(email) == false){
            toastr.error('Email is not correct');
            return false;
        }
        if (password == undefined || password == ''){
            toastr.error('Password is empty');
            return false;
        }
        return true;
    }



}