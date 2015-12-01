/**
 * Created by sabir on 08.11.15.
 */
var DataFactory = require('../data/DataFactory');
var Parse = require('parse').Parse;
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var MaterialsMixin = require('./MaterialsMixin');

var VideoMixin = require('./VideoMixin');

var MigrationMixin = {

    loadAnswersByVariant: function(varNumber){
        var tabs = DataFactory.TGUexercisesTabs;
        var ids = tabs[varNumber].exercises.map(function(e){return e.id});
        var classId = tabs[varNumber].classId;
        console.log('classId = ', classId);
        console.log('ex ids: ', ids);
        var q = new Parse.Query('UserAnswer');
        q.containedIn('exerciseId', ids);
        q.limit(1000);
        q.find(function(results){
            console.log(results);
            var usersMap = {};
            for (var i in results){
                var r = results[i];
                var userId = r.get('userId');
                usersMap[userId] = 1;
            }
            var arr = [];
            for (var key in usersMap){
                arr.push(key);
            }
            console.log('users: ', arr);

            var notSavedLinks = [];
            var StudentClassLink = Parse.Object.extend('StudentClassLink');
            for (var i in arr){
                var l = new StudentClassLink();
                l.set('studentId', arr[i]);
                l.set('classId', classId);
                notSavedLinks.push(l);
            }
            console.log('not saved links: ', notSavedLinks);
            //Parse.Object.saveAll(notSavedLinks, {
            //    success: function(){
            //        alert('saved!');
            //    }
            //});
        });
    },

    loadDirtyMaterials: function(callback){
        var q = new Parse.Query('PatientMaterial');
        q.limit(1000);
        q.doesNotExist('vimeoImgSrc');
        //q.equalTo('duration', 0);
        ParseMixin.loadAllDataFromParse(q, function(materials){
            materials = materials.map(function(m){
                return MaterialsMixin.transformMaterialFromParseObject(m);
            });
            callback(materials);
        });
    },

    processOneDirtyMaterial: function(materialId, callback){
        var q = new Parse.Query('PatientMaterial');
        q.get(materialId, {
            success: function(material){
                var vimeoId = material.get('vimeoId');
                VideoMixin.loadVimeoInfo(vimeoId, function(info){
                   material.set('duration', info.duration);
                   material.set('vimeoImgSrc', info.imgSrc);
                   material.save().then(function(m){
                      callback(m);
                   });
                });
            }
        });
    }



}

module.exports = MigrationMixin;