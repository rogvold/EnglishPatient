/**
 * Created by sabir on 05.01.15.
 */

var UserChatManager = function(){
    var self = this;
    this.friendId = undefined;
    this.messages = [];
    this.me = undefined;
    this.friend = undefined;

    this.init = function(){
        initParse();
        self.initSubmitButton();
        moment.lang('ru');
    }

    this.initSubmitButton = function(){
        $('#submitButton').bind('click', function(){
            var message = $('#messageInput').val();
            self.sendMessage(message);
        });
    }

    this.sendMessage = function(message){
        var Message = Parse.Object.extend('PatientMessage');
        var m = new Message();
        m.set('fromId', self.me.id);
        m.set('toId', self.friend.id);
        m.set('content', message);
        enablePreloader();
        m.save().then(function(){
            disablePreloader();
            self.prepareMessages(function(){
                toastr.success('Отправлено');
            });
        });
    }

    this.prepareMessages = function(callback){
        self.loadMessages(function(){
            console.log('messages = ', self.messages);
            self.drawMessages();
            callback();
        });
    }

    this.prepare = function(friendId){ // use this method from the outside
        if (friendId == undefined){
            toastr.error('friend id is not defined');
            return;
        }
        self.friendId = friendId;
        self.loadMeAndFriend(function(){
            self.prepareMessages(function(){

            });
        });

    }


    this.loadMeAndFriend = function(callback){
        self.me = Parse.User.current();
        var q = new Parse.Query(Parse.User);
        enablePreloader();
        q.get(self.friendId, {
            success: function(u){
                self.friend = u;
                console.log('friend = ', u);
                disablePreloader();
                callback();
            }
        });
    }



    this.loadMessages = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientMessage'));
        q.limit(1000);
        q.containedIn('fromId', [self.friendId, self.me.id]);
        q.containedIn('toId', [self.friendId, self.me.id]);
        q.addDescending('createdAt');
        enablePreloader('loadin messages ...');
        q.find(function(results){
            disablePreloader();
            self.messages = results.reverse();
            callback();
        });
    }



    this.drawMessages = function(){
        var list = self.messages;
        var s = '';
        for (var i in list){
            s+=self.getMessageHtml(list[i]);
        }
        $('#messagesPlaceholder').html(s);
    }


    this.getMessageHtml = function(m){
        var s = '';
        if (m.get('fromId') == self.me.id){
            s+=''; // this is message from me
            s+='<div class="chatbox-user">' +
            '<a href="javascript:;" class="chat-avatar pull-left">' +
            '<img src="' + self.me.get('avatar') + '" class="img-circle" title="user name" alt="">' +
            '</a>' +
            '<div class="message">' +
            '<div class="panel">' +
            '<div class="panel-body">' +
            '<p>' + m.get('content') + '</p>' +
            '</div>' +
            '</div>' +
            '<small class="chat-time">' +
            '<i class="ti-time mr5"></i>' +
            '<b>' + moment(m.createdAt).fromNow() + '</b>' +
            //'<i class="ti-check text-success"></i>' +
            '</small>' +
            '</div>' +
            '</div>';
        }else{
            s+=''; // this is message to me
            s+='<div class="chatbox-user right">' +
            '<a href="javascript:;" class="chat-avatar pull-right">' +
            '<img src="' + self.friend.get('avatar') + '" class="img-circle" title="user name" alt="">' +
            '</a>' +
            '<div class="message">' +
            '<div class="panel">' +
            '<div class="panel-body">' +
            '<p>' + m.get('content') + '</p>' +
            '</div>' +
            '</div>' +
            '<small class="chat-time">' +
            '<i class="ti-time mr5"></i>' +
            '<b>'  + moment(m.createdAt).fromNow() +  '</b>' +
            //'<i class="ti-check text-success"></i>' +
            '</small>' +
            '</div>' +
            '</div>';
        }
        return s;
    }

}

