
var React = require('react');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var MaterialsMixin = require('./MaterialsMixin');

var VocabularyMixin = {

    getSortedWords: function(words){
        var self = this;
        console.log('getSortedWords occured: words = ', words);
        words.sort(function(word1, word2){
            var w1 = self.getClearWord(word1.name).toLowerCase();
            var w2 = self.getClearWord(word2.name).toLowerCase();
            if (w1 < w2){
                return -1;
            }
            if (w1 > w2){
                return 1;
            }
            return 0;
        });
        return words;
    },

    getClearWord: function(w){
        if (w.indexOf('a ') == 0){
            w = w.substr(1).trim();
            return w;
        }
        if (w.indexOf('the ') == 0){
            w = w.substr(3).trim();
            return w;
        }

        if (w.indexOf('to ') == 0){
            w = w.substr(2).trim();
            return w;
        }

        if (w.indexOf('an ') == 0){
            w = w.substr(2).trim();
            return w;
        }

        return w.trim();
    },

    getAlphabetList: function(words){
        var list = [];
        var abet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
        for (var i in abet){
            var a = abet[i];
            var arr = [];
            for (var j in words){
                var w = words[j];
                var wo = this.getClearWord(w.name).toLowerCase();
                if (wo[0] == a){
                    arr.push(w);
                }
            }
            if (arr.length > 0){
                list.push({
                    letter: a,
                    words: arr
                });
            }
        }
        return list;
    },

    prepareWordsFromMaterials: function(materials){
        var words = [];
        //var map = [];
        var map = {};
        for (var i in materials){
            var m = materials[i];
            var name = (m.name == undefined) ? '' : m.name;
            var nWords = m.name.split(',').map(function(w){return w.trim()});
            for (var i in nWords){
                var w = nWords[i];
                w = w.trim();
                if (w.split(' ').length > 3){
                    continue;
                }
                if (map[w] == undefined){
                    map[w] = {
                        name: w,
                        materials: []
                    };
                }
                map[w].materials.push(m);
            }
        }
        for (var key in map){
            words.push(map[key]);
        }
        return this.getSortedWords(words);
    },

    loadWords: function(callback){
        var groupId = 'LmohVyRlIQ';
        var q = new Parse.Query('PatientMaterial');
        q.containedIn('groups', [groupId]);
        q.limit(1000);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(materials){
            materials = materials.map(function(m){
                return MaterialsMixin.transformMaterialFromParseObject(m);
            });
            console.log('vocabulary materials length = ', materials.length);
            callback(self.prepareWordsFromMaterials(materials));
        });
    }


}

module.exports = VocabularyMixin;