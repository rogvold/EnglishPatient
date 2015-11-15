/**
 * Created by sabir on 15.01.15.
 */

var AdminYoutubeSearchManager = function(){
    var self = this;
    this.videos = [];
    this.selectedVideos = [];
    this.wordsMap = {};
    this.wordsList = [];
    this.commonWords = [];
    this.observingList = [];

    this.init = function(){
        initParse();
        self.initResultsItem();
        self.loadCommonWords(function(){
            self.loadAllYoutubeVideos(function(){
                self.drawVideos();
                self.makeObservingList();
            });
        });

    }

    this.loadAllYoutubeVideos = function(callback){
        var q = new Parse.Query(Parse.Object.extend('YoutubeVideoMaterial'));
        q.addDescending('viewCount');
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.videos = results;
            self.selectedVideos =self.videos;
            self.processWords();
            console.log(results);
            disablePreloader();
            callback();
        });
    }

    this.drawVideos = function(){
        var list = self.selectedVideos;
        var s = '';
        for (var i in list){
            s+= self.getVideoItemHtml(list[i]);
        }
        $('#videosList').html(s);
    }

    this.getVideoItemHtml = function(m){
        var s = '';
        s+='<div class="panel panel-default resultsItem" data-id="' + m.id + '" data-youtubeId="' + m.get('youtubeId') +'">' +
        '<div class="panel-body headBlock" >' +
        '<img src="' + m.get('thumbnail') + '" class="img-thumbnail pull-left" >' +
        '<h5 >' + m.get('title') + '</h5>' +
        '<div class="bottomInfo" >' +
        '<span class="categoryLabel label label-info" >' + m.get('category') + '</span>' +
        '<span class="viewCountLabel ml10" >' + m.get('viewCount') + '</span>' +
        '</div>' +
        '</div>' +
            //'<div class="panel-body displaynone" data-reactid=".0.6.0.$EPs9DY3uvrA.1">' +
            //'   <div class="list-group " data-reactid=".0.6.0.$EPs9DY3uvrA.1.0">' +
            //'   <a href="javascript: void(0);" class="list-group-item " data-reactid=".0.6.0.$EPs9DY3uvrA.1.0.$662=109">' +
            //'   <span data-reactid=".0.6.0.$EPs9DY3uvrA.1.0.$662=109.0"> white <b>table</b> take all wonderful out and then</span>' +
            //'</a>' +
            //'</div>' +
            //'</div>' +
        '</div>';
        return s;
    }

    this.initResultsItem = function(){
        $('body').on('click', '.resultsItem', function(){
            var id = $(this).attr('data-id');
            var m = self.getMaterialById(id);
            var youtubeId = m.get('youtubeId');
            $('#playerIframe').attr('src', 'http://www.youtube.com/embed/' + youtubeId + '?autoplay=1');
            $('#selectedVideoName').html(m.get('title'));
            var words = m.get('words');
            console.log('words = ', words);
            var hWords = words.join('\n');
            $('#selectedVideoWords').val(hWords);
        });
    }

    this.getMaterialById = function(id){
        var list = self.videos;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.processWords = function(){
        var map = {};
        var list = self.videos;
        for (var i in list){
            var words = list[i].get('words');
            for (var j in words){
                var w = words[j];
                if (map[w] == undefined){
                    map[w] = 1;
                }else{
                    map[w]++;
                }
            }
        }
        self.wordsMap = map;
        var arr = [];
        for (var key in map){
            arr.push({
                word: key,
                num: map[key]
            });
        }
        arr.sort(function(a, b){
            return (b.num - a.num);
        });
        self.wordsList = arr;
        console.log('words', arr);
    }

    this.loadCommonWords = function(callback){
        enablePreloader('loading common words');
        $.ajax({
            url: 'json/common_words.json',
            success: function(res){
                self.commonWords = res;
                disablePreloader();
                console.log(res);
                callback();
            }
        });
    }

    this.makeObservingList = function(){
        var list = self.commonWords;
        var map = self.wordsMap;
        var arr = [];
        for (var i in list){
            var w = list[i];
            if (map[w] != undefined){
                arr.push(w);
            }
        }
        self.observingList = arr;
        console.log(arr);
        $('#observingList').val(arr.join('\n'));
    }



}