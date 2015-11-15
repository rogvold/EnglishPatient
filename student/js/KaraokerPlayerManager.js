/**
 * Created by sabir on 13.04.15.
 */

var KaraokePlayerManager = function(){
    var self = this;
    this.state = 'notStarted';
    this.player = undefined;
    this.youtubeId = undefined;
    this.time = 0;
    this.subtitles = [];
    this.currentSubtitle = undefined;
    this.intervalId = undefined;
    this.dt = 100;
    this.prevTime = 0;


    this.init = function(){
        self.preparePlayer();
        self.initSubtitleItem();
        self.initTimer();
    }

    this.preparePlayer = function(){
        self.player = new YT.Player('videoPlayerId', {
            height: '270',
            width: '443',
            videoId: 'YPdHRiIWpoM',
            playerVars: {
                showinfo: 0,
                autoplay: 0,
                rel: 0,
                disablekb: 1,
                border: 0
            },
            events: {
                'onReady': self.onPlayerReady,
                'onStateChange': self.onPlayerStateChange
            }
        });
    }

    this.onPlayerReady = function(){

    }

    this.onPlayerStateChange = function(evt){
        console.log(evt.data);
    }

    this.updateVideo = function(youtubeId, subtitles){
        if (youtubeId == undefined || subtitles == undefined){
            return;
        }
        self.subtitles = subtitles;
        self.time = 0;
        self.youtubeId = youtubeId;
        //self.player.loadVideoById(youtubeId);

        if (self.player == undefined){
            self.player = new YT.Player('videoPlayerId', {
                height: '270',
                width: '443',
                videoId: youtubeId,
                playerVars: {
                    showinfo: 0,
                    autoplay: 0,
                    rel: 0,
                    disablekb: 1,
                    border: 0
                },
                events: {
                    'onReady': self.onPlayerReady,
                    'onStateChange': self.onPlayerStateChange
                }
            });
        }else{
            self.player.loadVideoById(youtubeId);
        }


        self.drawSibtitles();
    }


    this.initTimer = function(){
        self.intervalId = setInterval(function(){
            try{
                self.prevTime = self.time;
                self.time = self.player.getCurrentTime();
                console.log('self.time = ' + self.time);
                if (self.time != self.prevTime){
                    self.onTick();
                }
            }catch(e){
            }
        }, self.dt);
    }

    this.onTick = function(){
        console.log(self.time);
        self.updateSubtitlesActiveElement();
    }

    this.drawSibtitles = function(){
        var list = self.subtitles;
        var s = '';
        for (var i in list){
            var sub = list[i];
            s+= self.getSubtitleItem(sub);
        }
        $('#subtitlesList').html(s);
    }

    this.getSubtitleItem = function(sub){
        var s = '';
        s+= '<li class="subtitleItem" data-start="' + sub.start + '" data-text="' + sub.text + '" data-duration="' + sub.dur + '" >' +
        '' + sub.text +
        '</li>';
        return s;
    }

    this.updateSubtitlesActiveElement = function(){
        console.log('updateSubtitlesActiveElement occured');
        $('.subtitleItem').removeClass('active');
        var list = self.subtitles;
        console.log('subtitles = ', list);
        var t = self.time;
        var selectedSubtitle = undefined;
        for (var i in list){
            var start = parseFloat(list[i].start);
            var end = start + parseFloat(list[i].dur);
            if (start <= t && t <= end ){
                selectedSubtitle = list[i];
                break;
            }
        }
        console.log('selected subtitle = ', selectedSubtitle);
        if (selectedSubtitle != undefined){
            $('.subtitleItem[data-start="' + selectedSubtitle.start +'"]').addClass('active');
            $('#currentSubtitleBlock').html(selectedSubtitle.text);
            $('#subtitlesList').scrollTop($('#subtitlesList').scrollTop() + $('.subtitleItem.active').position().top - 60);
        }
    }

    this.initSubtitleItem = function(){
        $('body').on('click', '.subtitleItem', function(){
            var start = parseFloat($(this).attr('data-start'));
            var dur = parseFloat($(this).attr('data-duration'));
            var list = self.subtitles;
            for (var i in list){
                if (list[i].start == start){
                    self.currentSubtitle = list[i];
                    break;
                }
            }
            try{
                self.player.seekTo(start, true);
                //self.player.playVideo();
                $('.subtitleItem').removeClass('active');
                $(this).addClass('active');
            }catch(e){

            }
        });
    }

}