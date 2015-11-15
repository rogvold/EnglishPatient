/**
 * Created by sabir on 25.11.14.
 */

var UsersWidgetManager = function(){
    var self = this;
    this.users = [];
    this.selectUserCallback = function(m){ console.log(m);}
    this.filteredUsers = [];
    this.selecButtonName = 'Select';

    this.init = function(){
        initParse();
        self.loadUsers(function(){
            self.drawUsers();
        })
        self.initSearch();
    }

    this.loadUsers = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        q.ascending('lastName');
        q.find(function(results){
            self.users = results;
            self.filteredUsers = results;
            callback();
        });
    }

    this.getUserCardHtml = function(m){
        var s = '';
        var imgSrc = (m.get('avatarSrc') == undefined) ? '../img/user.png' : m.get('avatarSrc');
        s+='<li class="userItem" data-id="' + m.id + '" >'
            +'<section class="widget bordered">'
                +'<div class="panel-body">'
                    +'<a href="javascript:;" class="pull-left mr15">'
                    +'<img src="' + imgSrc + '" class="avatar avatar-md img-circle" alt="">'
                    +'</a>'
                    +'<div class="overflow-hidden">'
                    +'<b>' + m.get('firstName') + ' ' + m.get('lastName') + '</b>'
                    +'<small class="show">' + m.get('email') + '</small>'
                    +'<div class="show"></div>'
                    +'<a href="javascript:;"  class="btn btn-info btn-xs mt5 usersWidgetSelect" data-id="' + m.id + '"  >' + self.selecButtonName + '</a>'
                    +'</div>'
                +'</div>'
            +'</section>'
        +'</li>';
        return s;
    }

    this.drawUsers = function(){
        var list = self.filteredUsers;
        var s = '';
        for (var i in list){
            s+=self.getUserCardHtml(list[i]);
        }
        $('#widgetUsersList').html(s);
        $('body').on('click', '.usersWidgetSelect', function(){
            var id = $(this).attr('data-id');
            var u = self.getUserById(id);
            self.selectUserCallback(u);
        });
    }

    this.getUserById = function(id){
        var list = self.users;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.filter = function(t){
        var arr = [];
        var a = {};
        if (t == undefined || t == ''){
            return self.users;
        }
        var q = t.toLowerCase();
        q = q.trim();
        var list = self.users;
        for (var i in list){
            var m = list[i];
            if (m.get('firstName').toLowerCase().indexOf(q) > -1 || m.get('lastName').toLowerCase().indexOf(q) > -1 || m.get('email').toLowerCase().indexOf(q) > -1){
                arr.push(list[i]);
            }
        }
        return arr;
    }


    this.initSearch = function(){
        $('#widgetUsersSearch').bind('keyup',function(){
            var text = $(this).val();
            console.log(text);
            self.filteredUsers = self.filter(text);
            self.drawUsers();
        });
    }

}