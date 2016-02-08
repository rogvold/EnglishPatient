/**
 * Created by sabir on 08.02.16.
 */

var assign = require('object-assign');
var $ = require('jquery');
var _ = require("underscore");

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');
var Parse = require('parse').Parse;

var VideoMixin = require('../../mixins/VideoMixin');

var YoutubeSubtitlesHelper = {

    lang: 'de',

    loadVideo: function(youtubeId, callback){
        var self = this;
        var url = 'http://www.englishpatient.org/php/subtitles.php?v=' + youtubeId + '&lang=de';
        VideoMixin.loadYoutubeInfo(youtubeId, function(info){
            $.ajax({
                url: url,
                success: function(data){
                    var d = JSON.parse(data);
                    var youtubeId = d.youtubeId;
                    var subtitles = d.subtitles;
                    d.words = self.extractWordsFromSubtitles(subtitles);
                    d.title = info.name;
                    d.viewCount = info.viewCount;
                    d.likeCount = info.likeCount + '';
                    d.commentCount = info.commentCount;
                    //d.avatar = info.avatar;
                    d.thumbnail = info.avatar;
                    d.description = info.description;
                    d.duration = info.duration;
                    d.category = info.category;
                    d.lang = self.lang;
                    d.status = 'active';
                    callback(d);
                }
            });
        });

    },

    extractWordsFromSubtitles: function (titles, lang){
        if (titles == undefined){
            return [];
        }
        if (lang == undefined){
            lang = 'de';
        }
        var o = {};
        var res = [];
        for (var i in titles){
            var text = titles[i].text;
            var words = text.split(/\b/);
            words = words.map(function(item){return  item.toLowerCase()});
            var stopWords = ["a", "amp", "xml", "utf", "doesn", "didn", "gt", "ll", "ve", "lt", "re", "ii", "don", "mr", "mrs", "hasn", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your","ain't","aren't","can't","could've","couldn't","didn't","doesn't","don't","hasn't","he'd","he'll","he's","how'd","how'll","how's","i'd","i'll","i'm","i've","isn't","it's","might've","mightn't","must've","mustn't","shan't","she'd","she'll","she's","should've","shouldn't","that'll","that's","there's","they'd","they'll","they're","they've","wasn't","we'd","we'll","we're","weren't","what'd","what's","when'd","when'll","when's","where'd","where'll","where's","who'd","who'll","who's","why'd","why'll","why's","won't","would've","wouldn't","you'd","you'll","you're","you've"];
            var germanStopWords = ['aber' ,'als' ,'am' ,'an' ,'auch' ,'auf' ,'aus' ,'bei' ,'bin' ,'bis' ,'bist' ,'da' ,'dadurch' ,'daher' ,'darum' ,'das' ,'daß' ,'dass' ,'dein' ,'deine' ,'dem' ,'den' ,'der' ,'des' ,'dessen' ,'deshalb' ,'die' ,'dies' ,'dieser' ,'dieses' ,'doch' ,'dort' ,'du' ,'durch' ,'ein' ,'eine' ,'einem' ,'einen' ,'einer' ,'eines' ,'er' ,'es' ,'euer' ,'eure' ,'für' ,'hatte' ,'hatten' ,'hattest' ,'hattet' ,'hier' ,'hinter' ,'ich' ,'ihr' ,'ihre' ,'im' ,'in' ,'ist' ,'ja' ,'jede' ,'jedem' ,'jeden' ,'jeder' ,'jedes' ,'jener' ,'jenes' ,'jetzt' ,'kann' ,'kannst' ,'können' ,'könnt' ,'machen' ,'mein' ,'meine' ,'mit' ,'muß' ,'mußt' ,'musst' ,'müssen' ,'müßt' ,'nach' ,'nachdem' ,'nein' ,'nicht' ,'nun' ,'oder' ,'seid' ,'sein' ,'seine' ,'sich' ,'sie' ,'sind' ,'soll' ,'sollen' ,'sollst' ,'sollt' ,'sonst' ,'soweit' ,'sowie' ,'und' ,'unser' ,'unsere' ,'unter' ,'vom' ,'von' ,'vor' ,'wann' ,'warum' ,'was' ,'weiter' ,'weitere' ,'wenn' ,'wer' ,'werde' ,'werden' ,'werdet' ,'weshalb' ,'wie' ,'wieder' ,'wieso' ,'wir' ,'wird' ,'wirst' ,'wo' ,'woher' ,'wohin' ,'zu' ,'zum' ,'zur' ,'über'];
            if (lang == 'de'){
                stopWords = germanStopWords;
            }

            words = _.filter(words, function(w) { return w.match(/^\w+$/) && ! _.contains(stopWords, w) && ! w.match(/\d+/g); });
            _.each(words, function(w){o[w] = w});
        }
        _.each(o, function(w){ if (w.length > 2) {res.push(w)}});
        return res;
    },

    saveMaterial: function(youtubeId, data, callback){
        console.log('saveMaterial: youtubeId, data = ', youtubeId, data);
        if (youtubeId == undefined || data == undefined){
            return;
        }
        if (data.words == undefined || data.words.length == 0 ){
            console.log('NO WORDS! youtubeId = ' + youtubeId);
            callback({youtubeId: youtubeId});
            return;
        }
        var YoutubeVideo = Parse.Object.extend('YoutubeVideo');
        var q = new Parse.Query('YoutubeVideo');
        q.equalTo('youtubeId', youtubeId);
        var video = undefined;
        q.find(function(results){
            console.log('found results for youtubeId = ', youtubeId, ' : results = ', results);
            if (results == undefined || results.length == 0){
                video = new YoutubeVideo();
            }else{
                video = results[0];
            }
            for (var key in data){
                var na = key + '';
                console.log('setting params: name/val = ', na, data[key]);
                video.set(na, data[key]);
            }
            video.save().then(function(){
                callback({youtubeId: youtubeId});
            });
        });
    },


    processVideo: function(youtubeId, callback){
        var self = this;
        this.loadVideo(youtubeId, function(data){
            console.log('video loaded: data = ', data);
            self.saveMaterial(youtubeId, data, function(){
                callback({youtubeId: youtubeId});
            });
        });
    }

}

module.exports = YoutubeSubtitlesHelper;