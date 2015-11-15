/**
 * Created by sabir on 10.12.14.
 */

var AdminUsersReport = function(){
    var self = this;
    this.users = [];
    this.userQuestionaryAnswers = [];

    this.init = function(){
        initParse();
        self.loadAllList(function(){
            self.drawUsers();
        })
    }

    this.loadAllList = function(callback){
        enablePreloader();
        self.loadUsers( function(){
            self.loadUsersQuestions(function(){
                disablePreloader();
                callback();
            });
        });
    }

    this.loadUsers = function(callback){
        var q = new Parse.Query(Parse.User);
        q.addAscending('lastName');
        q.addAscending('firstName');
        q.limit(1000);
        q.find(function(list){
            self.users = list;
            callback();
        });
    }

    this.loadUsersQuestions = function(callback){
        var q = new Parse.Query(Parse.Object.extend('UserQuestionaryAnswer'));
        q.limit(1000);
        q.find(function(list){
            self.userQuestionaryAnswers = list;
            callback();
        });
    }

    this.getUserCardItem = function(u){
        var s = '';
        var ans = self.getUserAnswers(u.id);
        s+='<li class="list-group-item userItem" data-id="' + u.id + '" >'
        +'<a href="javascript: void(0);">'
        +'<span class="show">'
        +'<small class="pull-right hide"></small>'
        +'<strong class="text-uppercase "> ' + u.get('firstName') + ' ' + u.get('lastName') + '</strong>'
        +'</span>'
        +'<p> questionnaire answers: ' + ans.length + '</p>'
        +'</a>'
        +'</li>';
        return s;
    }

    this.drawUsers = function(){
        var list = self.users;
        var s = '';
        for (var i in list){
            s+= self.getUserCardItem(list[i]);
        }
        $('#usersList').html(s);
        $('body').on('click', '#usersList li.userItem', function(){
            var id = $(this).attr('data-id');
            window.location.href = 'user.html?id=' + id;
        });
    }


    this.getUserAnswers = function(uId){
        var list = self.userQuestionaryAnswers;
        var arr = [];
        for (var i in list){
            if (list[i].get('userId') == uId){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.getUserById = function(id){
        var list = self.users;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

}