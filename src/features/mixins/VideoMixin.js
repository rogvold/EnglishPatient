/**
 * Created by sabir on 26.11.15.
 */
var $ = require('jquery');

var moment = require('moment');

var assign = require('object-assign');

var YOUTUBE_CATEGORIES_MAP = require('../data/DataFactory').YOUTUBE_CATEGORIES_MAP;

var VideoMixin = {

    loadVimeoInfo: function(vimeoId, callback, errorCallback){
        if (vimeoId == undefined){
            callback(undefined);
            return;
        }
        console.log('loading info for vimeoId = ' + vimeoId);
        $.ajax('https://vimeo.com/api/v2/video/' + vimeoId + '.json', {
            success: function(data){
                console.log('http://vimeo.com/api/v2/video/' + vimeoId + '.json', data);
                if (data == undefined || data.length == 0){
                    callback(undefined);
                    return;
                }
                data = data[0];
                callback({
                    vimeoId: vimeoId,
                    imgSrc: data.thumbnail_medium,
                    avatar: data.thumbnail_medium,
                    duration: data.duration,
                    title: data.title
                });
            },
            error: function(err){
                console.log('error: ', err);
                if (errorCallback != undefined){
                    errorCallback(err);
                }
            }
        });
    },

    loadYoutubeInfo: function(youtubeId, callback, errorCallback){
        if (youtubeId == undefined || youtubeId.length != 11){
            callback(undefined);
            return;
        }
        var apiKey = 'AIzaSyBRzUeiUkAi5cmi6SQh3I5xpZcEZj2lGt0';
        $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + youtubeId + '&key=' + apiKey + '&part=snippet,contentDetails,statistics',
            function(data,status,xhr){
                console.log('loadYoutubeInfo: data loaded: ', data);
                if (data == undefined || data.items == undefined || data.items[0] == undefined){
                    if (errorCallback != undefined){
                        errorCallback();
                    }
                    return;
                }

            //moment.duration('PT15M33S').asMilliseconds();
            //data = data.items[0].contentDetails;
            var duration = moment.duration(data.items[0].contentDetails.duration).asMilliseconds();
            var name = data.items[0].snippet.localized.title;
            var description = data.items[0].snippet.localized.description;
            var thumbnails = data.items[0].snippet.thumbnails;
            var categoryId = data.items[0].snippet.categoryId;
            var statistics = data.items[0].statistics;
            var viewCount = undefined, likeCount = undefined, commentCount = undefined;
            var category = YOUTUBE_CATEGORIES_MAP[categoryId];

            var contentDetails = data.items[0].contentDetails;

            if (statistics != undefined){
                viewCount = (statistics.viewCount == undefined) ? undefined : +statistics.viewCount;
                likeCount = (statistics.likeCount == undefined) ? undefined : +statistics.likeCount;
                commentCount = (statistics.commentCount == undefined) ? undefined : +statistics.commentCount;
            }

            var d = {name: name, description: description, title: name, duration: duration,
                avatar: 'https://i.ytimg.com/vi/' + youtubeId + '/default.jpg',
                youtubeId: youtubeId, thumbnails: thumbnails,
                imgSrc: 'https://i.ytimg.com/vi/' + youtubeId + '/default.jpg',
                viewCount: viewCount,
                likeCount: likeCount,
                commentCount: commentCount,
                category: category
            };


            console.log(d);
            callback(d);
        });
    },

    loadVideoInfo: function(videoId, videoType, callback, errorCallback){
        if (videoType == 'youtube'){
            this.loadYoutubeInfo(videoId, function(data){
                callback(data);
            }, errorCallback)
            return;
        }
        if (videoType == 'vimeo'){
            this.loadVimeoInfo(videoId, function(data){
                callback(data);
            }, errorCallback)
            return;
        }

    },

    loadCaptions: function(youtubeId, callback){
        var apiKey = 'AIzaSyBRzUeiUkAi5cmi6SQh3I5xpZcEZj2lGt0';
        $.getJSON('https://www.googleapis.com/youtube/v3/captions/' + youtubeId + '?key=' + apiKey + '', function(data,status,xhr){
            console.log('captions loaded: ', data);
        });
    }

}

module.exports = VideoMixin;