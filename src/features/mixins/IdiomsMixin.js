/**
 * Created by sabir on 28.11.15.
 */

var React = require('react');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var MaterialsMixin = require('./MaterialsMixin');
var VocabularyMixin = require('./VocabularyMixin');

var IdiomsMixin = {

    prepareIdiomsList: function(materials){
        var list = [];
        var map = {};
        for (var i in materials){
            var m = materials[i];
            if (map[m.name] == undefined){
                map[m.name] = {
                    name: m.name,
                    description: m.comment.replace('<div><b>Значение</b></div><div><br></div>', ''),
                    materials: []
                }
            }
            map[m.name].materials.push(m);
        }
        for (var key in map){
            list.push(map[key]);
        }
        return list;
    },

    getSortedIdioms: function(idioms){
        var self = this;
        console.log('getSortedIdioms occured: idioms = ', idioms);
        idioms.sort(function(idiom1, idiom2){
            var w1 = VocabularyMixin.getClearWord(idiom1.name).toLowerCase();
            var w2 = VocabularyMixin.getClearWord(idiom2.name).toLowerCase();
            if (w1 < w2){
                return -1;
            }
            if (w1 > w2){
                return 1;
            }
            return 0;
        });
        return idioms;
    },

    loadIdioms: function(callback){
        var groupId = 'lN6Ow0ZOBY';
        var q = new Parse.Query('PatientMaterial');
        q.containedIn('groups', [groupId]);
        q.limit(1000);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(materials){
            materials = materials.map(function(m){
                return MaterialsMixin.transformMaterialFromParseObject(m);
            });
            var idiomsList = self.prepareIdiomsList(materials);
            callback(self.getSortedIdioms(idiomsList));
        });
    }

}

module.exports = IdiomsMixin;

//
//(function loadIdioms(){
//    var q = new Parse.Query(Parse.Object.extend('Idiom'));
//    q.equalTo('idiomType', 'idiom');
//    q.limit(1000);
//    q.ascending('title');
//    q.find(function(results){
//
//        var arr = results.map(function(r){
//            var comment = '';
//            comment+= '<div><b>Значение</b></div><div><br></div>';
//            comment+= '<div>' + r.get('description') + '</div>';
//            comment+= '<div>' + r.get('ruDescription') + '</div>';
//
//            var transcript = r.get('transcript');
//            transcript+= '\n';
//            transcript+= r.get('ruTranscript');
//
//            return {
//                title: r.get('title'),
//                transcript: transcript,
//                vimeoId: r.get('vimeoId'),
//                comment: comment
//            }
//        });
//        console.log(arr);
//        console.log(JSON.stringify(arr));
//    });
//})();

