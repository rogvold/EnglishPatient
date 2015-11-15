/**
 * Created by sabir on 17.07.15.
 */

var PatientKaraokeManager = function(){
    var self = this;
    this.videos = [];
    this.selectedVideo = undefined;
    this.playerSelector = '#player';
    this.player = undefined;
    this.selectedSubtitles = [];
    this.intervalId = undefined;
    this.dt = 400;
    this.time = 0;
    this.translateManager = new TranslateManager();


    this.init = function(){
        initParse();
        console.log('loading videos');
        self.initPlayer();
        self.initTimer();
        self.initMaterialItem();

        self.translateManager.init();
        self.loadVideos(function(){
            console.log('videos loaded: ', self.videos);
            self.loadForceVideo();
            self.drawMaterials();
        });
    }

    this.loadVideos = function(callback){
        var q = new Parse.Query(Parse.Object.extend('YoutubeVideoMaterial'));
        q.limit(1000);
        q.find(function(results){
            self.videos = results;
            callback();
        });
    }


    this.loadForceVideo = function(callback){ //async
        var materialId = gup('id');
        if (materialId == undefined){
            return;
        }
        var q = new Parse.Query(Parse.Object.extend('YoutubeVideoMaterial'));
        q.get(materialId, function(m){
            self.selectedVideo = m;
            setTimeout(function(){
                self.initPlayer();
                self.prepareSelectedVideo();
            }, 200);
        });
    }

    this.initPlayer = function(){
        self.player = $(self.playerSelector).pPlayer({
            youtubeVideoId: (self.selectedVideo == undefined) ? '3s-0QZjebjc' : self.selectedVideo.get('youtubeId')
        });
        $('#youtubeLink').attr('href', 'http://www.youtube.com/watch?v=3s-0QZjebjc');
    }


    this.drawMaterials = function(){
        var s = '';
        var list = self.videos;
        for (var i in list){
            s+= self.getMaterialItem(list[i]);
        }
        $('#materialsPlaceholder').html(s);
    }

    this.getMaterialItem = function(m){
        var s = '';
        s+='<div class="ui card materialItem" data-id="' + m.id + '" >' +
                    '<div class="image">' +
                        '<img src="' + m.get('thumbnail') + '">' +
                        '</div>' +
                        '<div class="content">' +
                        '<a class="header">' + m.get('title') + '</a>' +
                        '</div>' +
                        '<div class="extra content">' +
                        '<a>' +
                        '<i class="grid layout icon"></i>' +
                        '' + m.get('category') +
                            '</a>' +
                            '</div>' +
                    '</div>';
        return s;
    }


    this.getVideoById = function(id){
        var list = self.videos;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.getVideoByYoutubeId = function(youtubeId){
        var list = self.videos;
        for (var i in list){
            if (list[i].get('youtubeId') == youtubeId){
                return list[i];
            }
        }
    }

    this.initMaterialItem = function(){
        $('body').on('click', '.materialItem', function(){
            var id = $(this).attr('data-id');
            $('.materialItem').removeClass('active');
            $(this).addClass('active');
            self.selectedVideo = self.getVideoById(id);
            self.prepareSelectedVideo();
        });
    }


    this.prepareSelectedVideo = function(){
        var v = self.selectedVideo;
        try{
            self.player.loadVideoById(v.get('youtubeId'));
        }catch(e){
        }


        self.selectedSubtitles = v.get('subtitles');
        console.log('selected subtitles: ', self.selectedSubtitles);
        $("html, body").animate({ scrollTop: 0 }, "slow");

        $('#youtubeLink').attr('href', 'http://www.youtube.com/watch?v=' + v.get('youtubeId'));
        history.pushState(null, null, '?id=' + self.selectedVideo.id);
    }


    this.onTick = function(){
        if (self.selectedVideo == undefined || self.selectedSubtitles == undefined || self.selectedSubtitles.length == 0){
            return;
        }
        console.log('trying to find subtitle');
        try{
            self.time = self.player.getCurrentTime();
            console.log(self.time);

            var mainSubtitle = self.getMainSubtitle();
            self.setHtmlSafely('#mainSubtitle', mainSubtitle);
            //$('#mainSubtitle').html(mainSubtitle);
        }catch(e){

        }
    }

    this.initTimer = function(){
        self.intervalId = setInterval(function(){
            self.onTick();
        }, self.dt);
    }

    this.getMainSubtitle = function(){
        var t = self.time;
        if (t == undefined){
            return '';
        }
        var list = self.selectedSubtitles;
        for (var i in list){
            var sub = list[i];
            if (t >= +sub.start && t < (+sub.start + +sub.dur)){
                console.log('returning main subtitle: ', sub.text);
                return sub.text;
            }
        }
        return '';
    }

    this.setHtmlSafely = function(selector, html){
        if (html == undefined){
            return;
        }
        var old = $(selector).html().trim();
        var newH = html.trim();
        if (old == newH){
            return;
        }
        console.log('setting new html: ', html);
        $(selector).html(newH);
    }


}