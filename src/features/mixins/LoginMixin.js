/**
 * Created by sabir on 02.10.15.
 */
var React = require('react');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;

var CommonMixin = require('../../react/mixins/commonMixins/CommonMixin');

var LoginMixin = {

    onChange: function(){

    },

    logIn: function(email, password, callback, errorCallback){
        ParseMixin.initParse();
        if (this.validateEmail(email) == false){
            errorCallback('Неправильно введен Email');
            return;
        }
        email = email.toLowerCase();
        Parse.User.logIn(email, password, {
            success: function(u){
                callback(u);
            },
            error: function(u, err){
                console.log(err);
                var code = err.code;
                if (code == 101){
                    errorCallback('Нет аккаунта с таким логином и паролем.');
                }else{
                    errorCallback(err.message);
                }

            }
        });
    },

    signUp: function(email, password, firstName, lastName, userRole, avatar, callback, errorCallback){
        if (avatar == undefined){
            //avatar = 'http://beta.englishpatient.org/img/profile.png';
            avatar = 'https://www.englishpatientdrive.pw/dropzone/uploads/kbJGdXWAVH64c7OSuM7M.png';
        }
        ParseMixin.initParse();
        if (this.validateEmail(email) == false){
            errorCallback('Неправильно введен Email');
            return;
        }

        if (email == undefined || password == undefined){
            errorCallback('Пустой логин или пароль');
            return;
        }
        email = email.toLowerCase();
        var user = new Parse.User();
        user.set("username", email);
        user.set("password", password);
        user.set("userPassword", password);
        user.set("email", email);
        user.set('firstName', firstName);
        user.set('lastName', lastName);
        user.set('userRole', userRole);
        user.set('avatar', avatar);
        user.signUp(null, {
            success: function(u) {
                if (callback != undefined){
                    callback(u);
                }
            },
            error: function(user, error) {
                console.log(error);
                errorCallback(error.message);
            }
        });
    },

    getCurrentUser: function(){
        ParseMixin.initParse();
        var u = Parse.User.current();
        if (u == undefined){
            return undefined;
        }
        var firstName = ( u.get('firstName') == undefined ) ? '' : u.get('firstName');
        var lastName = ( u.get('lastName') == undefined ) ? '' : u.get('lastName');
        var name = firstName + ' ' + lastName;
        if (name == ' '){
            name = u.get('email');
        }
        return {
            name: name,
            role: u.get('userRole'),
            email: u.get('email'),
            avatar: u.get('avatar'),
            id: u.id,
            lang: (u.get('lang') == undefined) ? 'en' : u.get('lang')
        }
    },

    getCurrentUserId: function(){
        var u = this.getCurrentUser();
        if (u == undefined){
            return undefined;
        }
        return u.id;
    },

    isLoggedIn: function(){
        return (Parse.User.current() != undefined);
    },

    logOut: function(callback){
        if (this.isLoggedIn() == false){
            callback();
        }else{
            Parse.User.logOut().then(function(){
                callback();
            });
        }
    },

    recoverPassword: function(email, successCallback, errorCallback){
        if (this.validateEmail(email) == false){
            return;
        }
        Parse.User.requestPasswordReset(email, {
            success: function(){
                successCallback();
            },
            error: function(err){
                errorCallback(err.message);
            }
        });
    },

    validateEmail: function(email){
        if (email == undefined){
            return false;
        }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}

module.exports = LoginMixin;