/**
 * Created by sabir on 29.12.14.
 */

var PubnubVimeoPlayerManager = function(){
    var self = this;
    this.playerManager = new VimeoPlayerManager();
    this.user = Parse.User.current();
    this.pubnub = undefined;
    this.channelName = 'pubnubPlayer';
    this.mode = 'master';
    this.friendId = undefined;

    this.init = function(callback){
        initParse();
        self.initPubNub();
        self.initPlayer();
        if (callback != undefined){
            callback();
        }
    }

    this.initPubNub = function(){
        self.pubnub = PUBNUB.init({
            publish_key   : 'pub-c-752971b2-4d97-4f7e-8a5f-9b053e93a55a',
            subscribe_key : 'sub-c-ef6fde7a-8ea5-11e4-9852-02ee2ddab7fe',
            uuid: self.user.id
        });
        self.pubnub.subscribe({
            channel: "" + self.channelName,
            message: function(message) {
                //console.log('message received: ', message);
                self.onMessageReceive(message);
            }
        });
    }

    this.initPlayer = function(){
        self.playerManager.onReady = self.onReady;
        self.playerManager.onFinish = self.onFinish;
        self.playerManager.onPlayProgress = self.onPlayProgress;
        self.playerManager.onPause = self.onPause;
        self.playerManager.onSeek = self.onSeek;
        self.playerManager.onPlay = self.onPlay;
        self.playerManager.onLoadProgress = self.onLoadProgress;
        self.playerManager.init();
    }


    this.onPlayProgress = function(data, id){
        //console.log('onPlayProgress: data = ', data);
        var m = {
            method: 'onPlayProgress',
            data: data
        }
        $('#videoProgress').html(data.seconds);
        self.postMessage(m);
        //self.play();
    }

    this.onReady = function(){
        console.log('---->>> ready');
        var m = {
            method: 'onReady'
        }
        self.postMessage(m);
    }

    this.onFinish = function(id){
        console.log('--->>> finish');
        var m = {
            method: 'onFinish'
        }
        self.postMessage(m);
    }

    this.onPause = function(id){
        console.log('---->>> pause');
        console.log(self.playerManager.getCurrentTime());
        var m = {
            method: 'onPause'
        }
        self.postMessage(m);
    }

    this.onSeek = function(data, id){
        console.log('onSeek', data, id);
        console.log('seek event');
        self.pause();
        var m = {
            method: 'onSeek',
            data: data
        }
        self.postMessage(m);
    }

    this.onPlay = function(id){
        console.log('onPlay', id);
        console.log('play event');
        var m = {
            method: 'onPlay'
        }
        self.postMessage(m);
    }

    this.onLoadProgress = function(data, id){
        //console.log('onLoadProgress', data, id);
        var m = {
            method: 'onLoadProgress'
        }
        self.postMessage(m);
    }




    this.pause = function(){
        console.log('pause occured');
        self.playerManager.pause();
    }

    this.play = function(){
        self.playerManager.play();
    }

    this.seekTo = function(seconds){
        self.playerManager.seekTo(seconds);
        self.playerManager.pause();
    }

    this.changeVimeoId = function(vimeoId){
        self.playerManager.changeVimeoId(vimeoId);
        var m = {
            method: 'onChangeVimeoId',
            data: vimeoId
        }
        self.postMessage(m);
    }

    this.publishMessage = function(message){
        self.pubnub.publish({
            channel: self.channelName,
            message: message
        });
    }

    this.onMessageReceive = function(message){
        //console.log(message);
        if (message.to != self.user.id){
            return;
        }
        if (self.mode == 'master'){
            if (message.masterId != self.user.id){
                return;
            }
            self.masterReceivesMessage(message);
        }else{
            if (message.slaveId != self.user.id){
                return;
            }
            self.friendId = message.masterId;
            self.slaveReceivesMessage(message);
        }
    }

    this.postMessage = function(m){
        if (self.mode == 'master'){
            self.masterPostsMessage(m);
        }else{
            self.slavePostsMessage(m);
        }
    }

    this.wrapMasterMessage = function(m){
        return {
            masterId: self.user.id,
            slaveId: self.friendId,
            from: self.user.id,
            to: self.friendId,
            vimeoId: self.playerManager.vimeoId,
            message: m
        }
    }

    this.wrapSlaveMessage = function(m){
        return {
            master: self.friendId,
            slaveId: self.user.id,
            message: m
        }
    }


    this.masterPostsMessage = function(m){
        self.publishMessage(self.wrapMasterMessage(m));
    }

    this.slavePostsMessage = function(m){
        self.publishMessage(self.wrapSlaveMessage(m));
    }

    this.masterReceivesMessage = function(m){
        if (m.vimeoId == self.vimeoId && m.message.method == 'onReady'){
            disablePreloader();
        }
        m = m.message;
        var method = m.method;
        var data = m.data;
    }

    this.slaveReceivesMessage = function(m){
        //console.log('slave receives message', m);
        m = m.message;
        var method = m.method;
        var data = m.data;
        if (method == 'onPause'){
            console.log('------>>>>>>RECEIVED ON PAUSE');
            self.pause();
            return;
        }
        if (method == 'onPlay'){
            console.log('onPlay');
            self.play();
            return;
        }
        if (method == 'onPlayProgress'){
            //self.play();
            return;
        }
        if (method == 'onChangeVimeoId'){
            self.changeVimeoId(m.data);
        }
        if (method == 'onSeek'){
            self.pause();
            self.seekTo(data.seconds);
            self.pause();
            console.log('---->>>> ON SEEK', data);
        }
    }


}