/**
 * Created by sabir on 29.12.14.
 */

var OnlineManager = function(){
    var self = this;
    //this.currentUserManager = new CurrentUserManager();
    this.pubnub = undefined;
    this.allUsers = [];
    this.onlineUsers = [];
    this.channelName = 'patientOnline';
    this.phoneChannelName = 'patientPhone';
    this.currentUser = undefined;
    this.checkingTimerId = undefined;
    this.dt = 10  * 1000;
    this.callingTimerId = undefined;
    this.callingDt = 6 * 1000;
    this.callingToUserId = undefined;

    this.init = function(callback){
        initParse();
        self.currentUser = Parse.User.current();
        self.loadAllUsers(function(){
            self.initPubNub();
            self.initPhoneItem();
            self.startTimer();
            callback();
        });
    }

    this.initPubNub = function(){
        self.pubnub = PUBNUB.init({
            publish_key   : 'pub-c-752971b2-4d97-4f7e-8a5f-9b053e93a55a',
            subscribe_key : 'sub-c-ef6fde7a-8ea5-11e4-9852-02ee2ddab7fe',
            uuid: self.currentUser.id
        });
        self.pubnub.here_now({
            channel : '' + self.channelName,
            callback : function(m){self.onChangeHere(m)}
        });
        self.pubnub.subscribe({
            channel: "" + self.channelName,
            message: function(message) {
                console.log('message', message);
            },
            state: {
                full: '' + self.currentUser.get('firstName') + ' ' + self.currentUser.get('lastName'),
                userId: self.currentUser.id,
                userRole: self.currentUser.get('userRole')
            }
        });
        self.initCalling();
        console.log('PUBNUB initialized');
    }

    this.loadAllUsers = function(callback){
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.allUsers = results;
            disablePreloader();
            callback();
        });
    }

    this.getUserById = function(id){
        var list = self.allUsers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.onChangeHere = function(m){
        //console.log('onChangeHere', m);
        var list = m['uuids'].map(function(id){return self.getUserById(id)});
        self.onlineUsers = list;
        //console.log('online users = ', list);
        self.drawOnlineUsers();
    }


    this.getUserItemHtml = function(u){
        var s = '';
        s+='<li class="onlineItem" data-id="' + u.id + '"  >' +
        '' + u.get('firstName') + ' ' + u.get('lastName') + '' +
        '<i class="pull-right phoneItem ti-mobile" data-id="' + u.id + '" ></i>' +
        '</li>'
        return s;
    }

    this.drawOnlineUsers = function(){
        var list = self.onlineUsers;
        self.logOnlineUsers();
        var s = '';
        for (var i in list){
            s+=self.getUserItemHtml(list[i]);
        }
        $('#onlineUsersList').html(s);
    }

    self.initPhoneItem = function(){
        $('body').on('click', '#onlineUsersList .phoneItem', function(){
            var id = $(this).attr('data-id');
            window.location.href = 'videochat.html?callerId=' + id;
        });
    }

    this.logOnlineUsers = function(){
        //var list = self.onlineUsers;
        //var arr = list.map(function(u){return (u.get('firstName') + ' ' + u.get('lastName'))});
        //var s = '---->>> ONLINE: ' + arr.join(', ');
        //console.log(s);
    }

    this.startTimer = function(){
        self.checkingTimerId = setInterval(function(){
            self.pubnub.here_now({
                channel : '' + self.channelName,
                callback : function(m){self.onChangeHere(m)}
            });
        }, self.dt);
    }

    this.initCalling = function(){
        self.pubnub.subscribe({
            channel: "" + self.phoneChannelName,
            message: function(message) {
                var from = message.from;
                var to = message.to;
                if (to == self.currentUser.id){
                    self.onCallingToMe(from);
                }
            }
        });
    }

    this.callTo = function(userId){
        if (self.callingTimerId != undefined){
            clearInterval(self.callingTimerId);
        }
        self.callingToUserId = userId;
        self.oneCall(self.callingToUserId);
        self.callingTimerId = setInterval(function(){
            self.oneCall(self.callingToUserId);
        }, self.callingDt);
    }

    this.oneCall = function(userId){
        self.pubnub.publish({
            channel: self.phoneChannelName,
            message: {
                from: self.currentUser.id,
                to: userId
            }
        });
    }

    this.onCallingToMe = function(cId){
        if (window.location.href.indexOf('videochat') > -1){
            return;
        }
        var user = self.getUserById(cId);
        toastr.options = {
            "progressBar": true
        }
        toastr.info('<b><a href="videochat.html">' + user.get('firstName') + ' '  + user.get('lastName') + '</a></b>' + ' is calling');
        var sound = new Howl({
            urls: ['http://beta.englishpatient.org/home/sounds/ring.mp3']
        });
        sound.play();
    }

}