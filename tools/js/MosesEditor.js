/**
 * Created by sabir on 30.12.14.
 */

var MosesEditor = function(){
    var self = this;
    this.vimeoId = undefined;
    this.iframeId = 'player';
    this.defaultVimeoId = '115569512';
    this.player = undefined;
    this.currentT = 0;
    this.intervalId = undefined;
    this.dt = 50;
    this.labels = [];
    this.scalpDt = 0.025;

    this.currentPlayingLabel = undefined;

    this.minPlayingSeconds = 0;
    this.maxPlayingSeconds = 1000000000;
    this.replayMode = false;
    this.moses = undefined;
    this.currentUser = undefined;

    this.init = function(){
        initParse();
        self.currentUser = Parse.User.current();
        console.log('parse ready');
        self.initPlayButton();
        self.initSeekToButon();
        self.initAddButtons();
        self.initPlayer();
        self.initVimeoId();
        self.initDeleteLabelButton();
        self.initMosesLabelItems();
        self.initSaveButton();
        self.initForwardBackward();
        if (self.vimeoId !=undefined){
            self.loadMoses(function(){
                self.prepareLoadedMoses();
            });
        }
    }

    this.initPlayButton = function(){
        $('.playButton').bind('click', function(){
            var from = parseFloat($(this).parent().find('.fromInput').val().trim());
            var to = parseFloat($(this).parent().find('.toInput').val().trim());
            var f = self.checkFromAndTo(from, to);
            if (f == false){
                return;
            }
            if ($(this).hasClass('active') == true){
                $(this).removeClass('active');
                self.deletePlayingBounds();
            }else{
                $(this).addClass('active');
                self.setPlayingBounds(from, to);
                self.seekTo(from);
                self.play();
            }
        });
    }

    self.checkFromAndTo = function(from, to){
        if (isNaN(from) || isNaN(to)){
            toastr.error('Error!');
            return false;
        }
        if (from >= to){
            toastr.error('From must be less then To');
            return false;
        }
        return true;
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
        }
        if (self.currentT >= self.maxPlayingSeconds){
            self.seekTo(self.minPlayingSeconds);
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

    this.initDeleteLabelButton = function(){
        $('body').on('click', '.deleteItemButton', function(){
            var from = $(this).parent().attr('data-from');
            var to = $(this).parent().attr('data-to');
            var arr = [];
            var list = self.labels;
            for (var i in list){
                if (list[i].from == from && list[i].to == to){
                    continue;
                }
                arr.push(list[i]);
            }
            self.labels = arr;
            self.drawFirstLabels();
            self.deletePlayingBounds();
        });
    }

    this.initAddButtons = function(){
        $('#addNewFirstMosesLabelButton').bind('click', function(){
            var from = parseFloat($('#firstFrom').val().trim());
            var to = parseFloat($('#firstTo').val().trim());


            console.log(from, to);

            if (isNaN(from) || isNaN(to)){
                toastr.error('Error!');
                return;
            }

            if (self.checkIfLabelExists(from, to) == true){
                toastr.error('This label (' + from +' - ' + to + ') already exists');
                return;
            }

            var comment = $('#firstComment').val().trim();
            comment = comment == '' ? undefined : comment;
            var lab = {
                from: from,
                to: to,
                comment: comment
            };
            if (self.isInnerLabel(from, to)){
                lab.labelType = 'second';
            }else{
                lab.labelType = 'first';
            }
            self.labels.push(lab);

            self.labels.sort(function(a,b){
                if (a.from == b.from){
                    return 0;
                }
                return a.from > b.from ? 1 : -1;
            });
            self.drawFirstLabels();
            $('#firstFrom').val('');
            $('#firstTo').val('');
            $('#firstComment').val('');
        });
    }

    this.initSeekToButon = function(){
        $('#seekToLabel').bind('click', function(){
            var t = parseFloat($('#currentTime').val().trim());
            self.seekTo(t);
        });
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


    this.drawFirstLabels = function(){
        var s = '';
        var list = self.labels;
        for (var i in list){
            var comment = (list[i].comment == undefined ? '' : ('<b>' + list[i].comment + '</b>'));
            s+='<li class="firstLabelItem mosesLabelItem ' + list[i].labelType +'" ' +
            'data-comment=' + list[i].comment + ' data-from="' + list[i].from + '" ' +
            'data-to="' + list[i].to + '" >' + list[i].from +' - ' + list[i].to +' ' + comment + '' +
            '<i class="ti-trash deleteItemButton pull-right"></i>' +
            '</li>';
        }
        $('#firstComments').html(s);
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

    this.getCurrentTime = function(callback){
        self.player.api("getCurrentTime", function (value, player_id) {
            console.log('val t = ', value);
            //$("#output").html($("#output").html() + "<BR>" + "get current time callback");
            //$("#output").html($("#output").html() + "<BR>" + value);
        });
        var t = self.player.api('currentTime');
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

    this.initVimeoId = function(){
        var vimeoId = gup('vimeoId');
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
        if (self.currentUser != null && self.currentUser != undefined){
            q.equalTo('creatorId', self.currentUser.id);
        }
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
        self.drawFirstLabels();
    }



    this.changeVimeoId = function(vimeoId){
        self.vimeoId = vimeoId;
        $('#' + self.iframeId).attr('src', 'http://player.vimeo.com/video/' + vimeoId + '?api=1&player_id=' + self.iframeId);
    }

    this.initSaveButton = function(){
        console.log('initSaveButton occured');
        $('#saveButton').bind('click', function(){
            if (self.moses == undefined){
                toastr.error('Moses is not defined');
                return;
            }
            if (self.labels.length == 0){
                toastr.error('Nothing to save!');
                return;
            }
            enablePreloader();
            self.moses.set('data', JSON.stringify(self.labels));
            self.moses.save().then(function(){
                disablePreloader();
                self.loadMoses(function(){
                    self.prepareLoadedMoses();
                    toastr.success('saved');
                    self.deletePlayingBounds();
                });
                window.location.hewf = 'mosesEditor.html?vimeoId=' + self.vimeoId;
            });
        });
    }

    this.initForwardBackward = function(){
        $('#fromBackwardButton').bind('click', function(){
            var to = parseFloat(($('#firstTo').val().trim() == '') ? 0 : $('#firstTo').val().trim());
            var from = parseFloat(($('#firstFrom').val().trim() == '') ? 0 : $('#firstFrom').val().trim());
            from = Math.floor(from * 1000) / 1000.0;
            to = Math.floor(to * 1000) / 1000.0;
            self.setPlayingBounds(from, to);
            from = from - self.scalpDt;
            from = Math.max(from, 0);
            to = Math.max(from + 0.25, to);
            $('#firstFrom').val(from);
            $('#firstTo').val(to);
            self.seekTo(from);
            self.play();
        });
        $('#fromForwardButton').bind('click', function(){
            var to = parseFloat(($('#firstTo').val().trim() == '') ? 0 : $('#firstTo').val().trim());
            var from = parseFloat(($('#firstFrom').val().trim() == '') ? 0 : $('#firstFrom').val().trim());
            from = Math.floor(from * 1000) / 1000.0;
            to = Math.floor(to * 1000) / 1000.0;

            self.setPlayingBounds(from, to);
            from = from + self.scalpDt;
            from = Math.max(from, 0);
            to = Math.max(from + 0.25, to);
            $('#firstFrom').val(from);
            $('#firstTo').val(to);
            self.seekTo(from);
            self.play();
        });
        $('#toBackwardButton').bind('click', function(){
            var to = parseFloat(($('#firstTo').val().trim() == '') ? 0 : $('#firstTo').val().trim());
            var from = parseFloat(($('#firstFrom').val().trim() == '') ? 0 : $('#firstFrom').val().trim());
            from = Math.floor(from * 1000) / 1000.0;
            to = Math.floor(to * 1000) / 1000.0;

            self.setPlayingBounds(from, to);
            to = to - self.scalpDt;
            to = Math.max(from + 0.25, to);
            $('#firstTo').val(to);
            $('#firstFrom').val(from);
            self.setPlayingBounds(from, to);
            self.seekTo(to - 0.500);
            self.play();
        });
        $('#toForwardButton').bind('click', function(){
            var to = parseFloat(($('#firstTo').val().trim() == '') ? 0 : $('#firstTo').val().trim());
            var from = parseFloat(($('#firstFrom').val().trim() == '') ? 0 : $('#firstFrom').val().trim());
            from = Math.floor(from * 1000) / 1000.0;
            to = Math.floor(to * 1000) / 1000.0;
            self.setPlayingBounds(from, to);
            to = to + self.scalpDt;
            to = Math.max(from + 0.25, to);
            $('#firstTo').val(to);
            $('#firstFrom').val(from);
            self.setPlayingBounds(from, to);
            self.seekTo(to - 0.500);
            self.play();
        });
    }

}