/**
 * Created by sabir on 12.04.15.
 */

var KaraokeManager = function(){
    var self = this;
    this.videos = [];
    this.currentUserManager = new CurrentUserManager();
    this.selectedVideos = [];
    this.selectedCategory = undefined;
    this.selectedVideo = undefined;
    this.playerManager = new KaraokePlayerManager();

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.initCategoryItem();
            self.initVideoItem();

            self.playerManager.init();

            //self.loadMaterials(function(){
            //    console.log('YoutubeVideoMaterial', self.videos);
            //    disablePreloader();
            //    self.drawCategories();
            //});
        });
    }

    this.initCategoryItem = function(){
        $('body').on('click', '.categoryItem', function(){
            var name = $(this).attr('data-name');
            self.selectedCategory = name;
            $('.categoryItem').removeClass('active');
            $(this).addClass('active');
            enablePreloader('loading videos');
            self.loadMaterialsByCategory(name, function(){
                console.log(self.selectedVideos);
                disablePreloader();
                self.drawSelectedVideos();
            });
        });
    }

    this.drawSelectedVideos = function(){
        var list = self.selectedVideos;
        var s = '';
        for (var i in list){
            var video = list[i];
            var desc = video.get('description');
            if (desc != undefined){
                desc = desc.substring(0, 450) + ' ...';
            }
            s+='<div class="youtubeVideo videoItem" data-id="' + video.id + '" >' +
                '<figure >' +
                    '<a href="javascript: void(0);" >' +
                        '<img src="http://i.ytimg.com/vi/' + video.get('youtubeId') + '/0.jpg" />' +
                    '</a>' +
                    '<div class="infoBlock">' +
                        '<h3>' + video.get('title') + '</h3>' +
                        '<p>' + desc + '</p>' +
                    '</div>'+
                    '<div class="viewCountNumber" >' + video.get('viewCount') + '</div>' +
                '</figure>' +
            '</div>';
        }
        $('#selectedVideos').html(s);
    }

    this.loadMaterials = function(callback){
        loadAllDataFromParse('YoutubeVideoMaterial', function(list){
            self.videos = list;
            self.prepareCategories();
            callback();
        });
    }

    //this.prepareCategories = function(){
    //    var list = self.videos;
    //    var arr = [];
    //    var map = {};
    //    for (var i in list){
    //        map[list[i].get('category')] = '1';
    //    }
    //    for (var key in map){
    //        arr.push(key);
    //    }
    //    self.categories = arr;
    //}

    //this.drawCategories = function(){
    //    var s = '';
    //    var list = self.categories;
    //    for (var i in list){
    //        var cat = list[i];
    //        s+='<span class="categoryItem" data-name="' + cat + '" >' + cat + '</span>';
    //    }
    //    $('#categories').html(s);
    //}


    this.loadMaterialsByCategory = function(categoryName, callback){
        var q = new Parse.Query(Parse.Object.extend('YoutubeVideoMaterial'));
        q.equalTo('category', categoryName);
        q.limit(1000);
        q.find(function(results){
            self.selectedVideos = results;
            callback();
        });
    }


    this.initVideoItem = function(){
        $('body').on('click', '.videoItem', function(){
            var id = $(this).attr('data-id');
            self.selectedVideo = self.getVideoById(id);
            $('.videoItem').removeClass('active');
            $(this).addClass('active');
            self.prepareSelectedVideo();
        });
    }

    self.prepareSelectedVideo = function(){
        var v = self.selectedVideo;
        $('#selectedVideoName').html(v.get('title'));
        $('#karaokeBlock').show();
        window.scrollTo(0, document.body.scrollHeight);
        self.playerManager.updateVideo(self.selectedVideo.get('youtubeId'), self.selectedVideo.get('subtitles'));
    }

    this.getVideoById = function(id){
        var list = self.selectedVideos;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }


}