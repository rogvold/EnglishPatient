/**
 * Created by sabir on 31.12.14.
 */

var MosesPlayingManager = function(){
    var self = this;
    this.vimeoId = undefined;
    this.iframeId = 'player';
    this.defaultVimeoId = '115569512';
    this.player = undefined;
    this.currentT = 0;
    this.intervalId = undefined;
    this.dt = 50;
    this.labels = [];
    this.labelsListId = 'labelsList';
    this.textMode = false;

    this.currentPlayingLabel = undefined;

    this.minPlayingSeconds = 0;
    this.maxPlayingSeconds = 1000000000;
    this.replayMode = false;
    this.moses = undefined;

    this.init = function(){
        initParse();
        self.currentUser = Parse.User.current();
        console.log('parse ready');
        self.initPlayer();
        self.initVimeoId();
        self.initMosesLabelItems();
        if (self.vimeoId !=undefined){
            self.loadMoses(function(){
                self.prepareLoadedMoses();
            });
        }
    }



    this.initCurrentTimer = function(){
        if (self.intervalId == undefined){
            self.intervalId = setInterval(function(){
                self.player.api("getCurrentTime", function (value, player_id) {
                    self.currentT = value;
                    //console.log(value);
                });
            }, self.dt);
        }
    }

    this.setPlayingBounds = function(from, to){
        self.minPlayingSeconds = from;
        self.maxPlayingSeconds = to;
    }

    this.forcePlayingBounds = function(){
        if (self.currentT < self.minPlayingSeconds){
            self.seekTo(self.minPlayingSeconds);
            self.pause();
            setTimeout(function(){self.play()}, 1000);
        }
        if (self.currentT >= self.maxPlayingSeconds){
            self.seekTo(self.minPlayingSeconds);
            self.pause();
            setTimeout(function(){self.play()}, 1000);
        }
    }

    this.checkIfLabelExists = function(from, to){
        var list = self.labels;
        for (var i in list){
            if (from == list[i].from && to == list[i].to){
                return true;
            }
        }
        return false;
    }


    this.pointIsInside = function(p, from, to){
        return (p >= from && p <= to);
    }

    this.isInnerLabel = function(from, to){
        var f = false;
        var list = self.labels;
        for (var i in list){
            if (list[i].from == from && list[i].to == to){
                continue;
            }
            if (self.pointIsInside(from, list[i].from, list[i].to) == false){
                continue;
            }
            if (self.pointIsInside(to, list[i].from, list[i].to) == false){
                continue;
            }
            f = true;
        }
        return f;
    }

    this.initMosesLabelItems = function(){
        $('body').on('click', '.mosesLabelItem', function(){
            $('.mosesLabelItem').removeClass('active');
            var from = parseFloat($(this).attr('data-from'));
            var to = parseFloat($(this).attr('data-to'));
            var comment = $(this).attr('data-comment');
            $(this).addClass('active');
            var cl = self.currentPlayingLabel;
            if (cl != undefined){
                if ( cl.from == from && cl.to == to){
                    $(this).removeClass('active');
                    self.deletePlayingBounds();
                    self.currentPlayingLabel = undefined;
                    return;
                }
            }
            self.currentPlayingLabel = {
                from: from,
                to: to,
                comment: comment
            }
            self.prepareLabelPlaying();
        });
    }

    this.prepareLabelPlaying = function(){
        var l = self.currentPlayingLabel;
        self.minPlayingSeconds = l.from;
        self.maxPlayingSeconds = l.to;
        self.seekTo(l.from);
        self.play();
    }

    this.deletePlayingBounds = function(){
        self.minPlayingSeconds = 0;
        self.maxPlayingSeconds = 100000000;
    }


    this.drawLabels = function(){
        var s = '';
        var list = self.labels;
        for (var i in list){

            var comment = (list[i].comment == undefined ? '' : ('<b>' + list[i].comment + '</b>'));
            s+='<li class="firstLabelItem mosesLabelItem ' + list[i].labelType +'" ' +
            'data-comment=' + list[i].comment + ' data-from="' + list[i].from + '" ' +
            'data-to="' + list[i].to + '" >' + (self.textMode == true ? comment: '') + '' +
            '<i class="ti-trash deleteItemButton pull-right"></i>' +
            '</li>';
        }
        $('#' + self.labelsListId).html(s);
    }


    this.onPlayProgress = function(data, id){
        //console.log('onPlayProgress: data = ', data);
        self.currentT = data.seconds;
        //console.log(self.currentT);
        $('.currentTime').val(self.currentT);
        self.forcePlayingBounds();
        //console.log(self.getCurrentTime());
    }

    this.onReady = function(){
        //self.initCurrentTimer();
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
        self.currentT = data.seconds;
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

    this.initVimeoId = function(){
        var vimeoId = gup('vimeoId');
        var tm = gup('text');
        if (tm != undefined){
            self.textMode = true;
        }
        if (vimeoId == undefined){
            toastr.erro('vimeo id is not specified');
            return;
        }
        self.vimeoId = vimeoId;
        console.log(vimeoId);
        self.changeVimeoId(vimeoId);
    }

    this.loadMoses = function(callback){
        var vimeoId = self.vimeoId;
        var q = new Parse.Query(Parse.Object.extend('Moses'));
        q.equalTo('vimeoId', vimeoId);
        //if (self.currentUser != null && self.currentUser != undefined){
        //    q.equalTo('creatorId', self.currentUser.id);
        //}
        enablePreloader();
        q.find(function(results){
            console.log('results = ', results);
            disablePreloader();
            if (results.length == 0){
                var Moses = Parse.Object.extend('Moses');
                self.moses = new Moses();
                self.moses.set('vimeoId', vimeoId);
                self.moses.set('data', JSON.stringify([]));
                if (self.currentUser != undefined && self.currentUser != null){
                    self.moses.set('creatorId', self.currentUser.id);
                }
                callback();
            }else{
                self.moses = results[0];
                callback();
            }
        });
    }


    this.prepareLoadedMoses = function(){
        var m = self.moses;
        console.log('moses = ', m);
        self.labels = JSON.parse(m.get('data'));
        console.log('labels = ', self.labels);
        self.drawLabels();
    }


    this.changeVimeoId = function(vimeoId){
        self.vimeoId = vimeoId;
        $('#' + self.iframeId).attr('src', 'http://player.vimeo.com/video/' + vimeoId + '?api=1&player_id=' + self.iframeId);
    }

}