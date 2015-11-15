/**
 * Created by sabir on 29.12.14.
 */

var StudentVideoChatManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.phone = undefined;
    this.session = undefined;
    this.displayDiv = 'display-div';
    this.callerId = undefined;
    this.caller = undefined;
    this.pubnubPlayerManager = undefined;

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.preparePhone();
            self.initPlayer();
            self.phone.ready(function(){
                self.initCaller(function(){
                    self.call();
                });
            });
        });
    }

    this.initPlayer = function(){
        self.pubnubPlayerManager = new PubnubVimeoPlayerManager();
        self.pubnubPlayerManager.mode = 'slave';
        self.pubnubPlayerManager.init();
    }

    this.initCaller = function(callback){
        var callerId = gup('callerId');
        if (callerId == undefined){
            return;
        }
        var q = new Parse.Query(Parse.User);
        enablePreloader();
        q.get(callerId, {
            success: function(u){
                self.caller = u;
                disablePreloader();
                callback();
            }
        });
    }

    this.preparePhone = function(){
        self.phone = PHONE({
            number        : self.currentUserManager.currentUser.id,
            publish_key   : 'pub-c-752971b2-4d97-4f7e-8a5f-9b053e93a55a',
            subscribe_key : 'sub-c-ef6fde7a-8ea5-11e4-9852-02ee2ddab7fe'
            //ssl           : true
        });
        self.phone.receive(function(session){
            self.session = session;
            session.connected(function(session){
                // Append Live Video Feed
                PUBNUB.$('' + self.displayDiv).appendChild(session.video);

                //self.hangup();

            });
        });
        console.log('phone prepared: phone = ', self.phone);
    }

    this.call = function(){
        console.log('calling to ', self.caller.id);
        self.session = self.phone.dial(self.caller.id);
        self.currentUserManager.onlineManager.callTo(self.caller.id);
    }

    this.hangup = function(){
        self.phone.hangup();
    }




}