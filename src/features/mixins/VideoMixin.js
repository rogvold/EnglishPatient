/**
 * Created by sabir on 26.11.15.
 */
var $ = require('jquery');

var moment = require('moment');

var VideoMixin = {

    loadVimeoInfo: function(vimeoId, callback, errorCallback){
        if (vimeoId == undefined){
            callback(undefined);
            return;
        }
        console.log('loading info for vimeoId = ' + vimeoId);
        $.ajax('http://vimeo.com/api/v2/video/' + vimeoId + '.json', {
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

    loadYoutubeInfo: function(youtubeId, callback){
        if (youtubeId == undefined){
            callback(undefined);
            return;
        }
        var apiKey = 'AIzaSyBRzUeiUkAi5cmi6SQh3I5xpZcEZj2lGt0';
        $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + youtubeId + '&key=' + apiKey + '&part=snippet,contentDetails', function(data,status,xhr){
            //moment.duration('PT15M33S').asMilliseconds();
            //data = data.items[0].contentDetails;
            var duration = moment.duration(data.items[0].contentDetails.duration).asMilliseconds();
            var name = data.items[0].snippet.localized.title;
            var description = data.items[0].snippet.localized.description;
            var thumbnails = data.items[0].snippet.thumbnails;
            var d = {name: name, description: description, title: name, duration: duration,
                youtubeId: youtubeId, thumbnails: thumbnails, imgSrc: 'https://i.ytimg.com/vi/' + youtubeId + '/default.jpg'};
            console.log(data);
            console.log(d);
            callback(d);
        });
    },

    loadCaptions: function(youtubeId, callback){
        var apiKey = 'AIzaSyBRzUeiUkAi5cmi6SQh3I5xpZcEZj2lGt0';
        $.getJSON('https://www.googleapis.com/youtube/v3/captions/' + youtubeId + '?key=' + apiKey + '', function(data,status,xhr){
            console.log('captions loaded: ', data);
        });
    }

}

module.exports = VideoMixin;