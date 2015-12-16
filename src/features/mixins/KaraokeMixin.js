/**
 * Created by sabir on 01.12.15.
 */

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var $ = require('jquery');

var KaraokeMixin = {

    prettifySubtitles: function(subtitles){
        if (subtitles == undefined){
            return [];
        }
        var pattern = "&quot;";
        var re = new RegExp(pattern, "g");

        var arr = [];
        for (var i in subtitles){
            var sub = subtitles[i];
            sub.text = sub.text.replace(re, '"');
            arr.push(sub)
        }
        arr.sort(function(sub1, sub2){
            return sub1.start - sub2.start;
        });
        return arr;
    },

    transformMaterialToKaraoke: function(m){
        return {
            author: m.get('author'),
            category: m.get('category'),
            description: m.get('description'),
            duration: m.get('duration'),
            rating: m.get('rating'),
            subtitles: this.prettifySubtitles(m.get('subtitles')),
            avatar: m.get('thumbnail'),
            name: m.get('title'),
            viewCount: m.get('viewCount'),
            words: m.get('words'),
            youtubeId: m.get('youtubeId'),
            id: m.id,
            materialId: m.id
        }
    },

    loadKaraokeById: function(id, callback){
        var q = new Parse.Query('YoutubeVideoMaterial');
        var self = this;
        q.get(id, {
            success: function(res){
                callback(res);
            }
        })
    },

    loadGroupedKaraokes: function(callback){
        var q = new Parse.Query('YoutubeVideoMaterial');
        q.limit(1000);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformMaterialToKaraoke(m);
            });

            var res = self.getGroupedKaraokes(arr);

            console.log('loaded: ', res);
            console.log(JSON.stringify(res.map(function(r){return r.category})));

            callback(res);
        });
    },

    loadKaraoke: function(materialId, callback){
        this.loadKaraokeById(materialId, function(m){
            callback(this.transformMaterialToKaraoke(m));
        }.bind(this));
    },

    getGroupedKaraokes: function(karaokes){
        var list = karaokes;
        var arr = [];
        var map = {};
        for (var i in list){
            var kar =  list[i];
            if (map[kar.category] == undefined){
                map[kar.category] = {
                    category: kar.category,
                    materials: [],
                    avatar: this.getAvatarByCategory(kar.category)
                }
            }
            map[kar.category].materials.push(kar);
        }
        for (var key in map){
            arr.push(map[key]);
        }
        return arr;
    },

    loadGrouppedKaraokesByCategoryName: function(categoryName, callback){
        var q = new Parse.Query('YoutubeVideoMaterial');
        q.limit(1000);
        q.equalTo('category', categoryName);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformMaterialToKaraoke(m);
            });
            callback(arr);
        });
    },

    getCurrentSubtitles: function(subtitles, time){
        //console.log('getCurrentSubtitles occured: subtitles, time = ', subtitles, time);
        var list = subtitles;
        var res = {};
        var num = 0;
        for (var i in list){
            var sub = list[i];
            var start = sub.start;
            var end = +sub.start + +sub.dur;
            if (time >= start && time <= end){
                num = i;
                break;
            }
        }
        res.current = list[+num];
        if (num > 0){
            res.prev = list[+num - 1];
        }
        if (num < list.length - 1){
            res.next = list[+num + 1]
        }
        //console.log('current subtitles: ', res);
        return res;
    },

    getAvatarByCategory: function(category){
        return this.karaokeAvatarsMap[category];
    },



    karaokeAvatarsMap: {
        'Howto & Style': 'https://englishpatient.org/app/assets/images/youtubeCategories/howtostyle.png',
        'Nonprofits & Activism': 'https://englishpatient.org/app/assets/images/youtubeCategories/nonprofitsactivism.png',
        'Education': 'https://englishpatient.org/app/assets/images/youtubeCategories/education.png',
        'People & Blogs': 'https://englishpatient.org/app/assets/images/youtubeCategories/peopleblogs.png',
        'Shows': 'https://englishpatient.org/app/assets/images/youtubeCategories/shows.png',
        'News & Politics': 'https://englishpatient.org/app/assets/images/youtubeCategories/newspolitics.png',
        'Comedy': 'https://englishpatient.org/app/assets/images/youtubeCategories/comedy.png',
        'Gaming': 'https://englishpatient.org/app/assets/images/youtubeCategories/gaming.png',
        'Sports': 'https://englishpatient.org/app/assets/images/youtubeCategories/sports.png',
        'Film & Animation': 'https://englishpatient.org/app/assets/images/youtubeCategories/filmanimation.png',
        'Science & Technology': 'https://englishpatient.org/app/assets/images/youtubeCategories/sciencetechnology.png',
        'Entertainment': 'https://englishpatient.org/app/assets/images/youtubeCategories/entertainment.png',
        'Travel & Events': 'https://englishpatient.org/app/assets/images/youtubeCategories/travelevents.png',
        'Music': 'https://englishpatient.org/app/assets/images/youtubeCategories/music.png',
        'Pets & Animals': 'https://englishpatient.org/app/assets/images/youtubeCategories/petsanimals.png'
    },

    getAllCategories: function(){
        var arr = [];
        var list = this.allCategories;
        for (var i in list){
            arr.push({
                category: list[i],
                avatar: this.getAvatarByCategory(list[i]),
                materials: []
            });
        }
        return arr;
    },

    allCategories: ["Howto & Style","Nonprofits & Activism","Education","People & Blogs","Shows","News & Politics","Comedy","Gaming","Sports","Film & Animation","Science & Technology","Entertainment","Travel & Events","Music","Pets & Animals"]

}

module.exports = KaraokeMixin;