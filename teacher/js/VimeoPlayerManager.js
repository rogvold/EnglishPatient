/**
 * Created by sabir on 29.12.14.
 */

var VimeoPlayerManager = function(){
    var self = this;
    this.vimeoId = undefined;
    this.iframeId = 'player';
    this.defaultVimeoId = '115569512';
    this.player = undefined;

    this.init = function(){
        self.initPlayer();
    }


    this.onPlayProgress = function(data, id){
        console.log('onPlayProgress: data = ', data);
    }

    this.onReady = function(){
        console.log('---->>> ready');
    }

    this.onFinish = function(id){
        console.log('--->>> finish');
    }

    this.onPause = function(id){
        console.log('---->>> pause');
    }

    this.onLoadProgress = function(data, id){
        console.log('onLoadProgress', data);
    }

    this.onSeek = function(data, id){
        console.log('onSeek', data);
    }

    this.onPlay = function(id){
        console.log('onPlay', id);

    }

    this.play = function(){
        self.player.api('play');
    }

    this.pause = function(){
        self.player.api('pause');
    }

    this.seekTo = function(seconds){
        self.player.api('seekTo', seconds);
    }

    this.getCurrentTime = function(){
        var t = self.player.api('getCurrentTime');
        //var t = self.player.getCurrentTime();
        console.log('currentTime = ', t);
        return t;
    }



    this.initPlayer = function(){
        var iframe = $('#' + self.iframeId)[0];
        self.player = $f(iframe);
        self.player.addEvent('ready', function() {
            self.onReady();
            self.player.addEvent('pause', self.onPause);
            self.player.addEvent('play', self.onPlay);
            self.player.addEvent('finish', self.onFinish);
            self.player.addEvent('playProgress', self.onPlayProgress);
            self.player.addEvent('loadProgress', self.onLoadProgress);
            self.player.addEvent('seek', self.onSeek);
        });
        console.log('player = ', self.player);
    }



    this.changeVimeoId = function(vimeoId){
        //enablePreloader();
        if (self.vimeoId == vimeoId){
            return;
        }
        self.vimeoId = vimeoId;
        $('#' + self.iframeId).attr('src', 'http://player.vimeo.com/video/' + vimeoId + '?api=1&player_id=' + self.iframeId);
    }

}