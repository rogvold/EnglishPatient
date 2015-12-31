/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;


var JungleMixin = {

    transformJungle: function(m){
        return {
            id: m.id,
            jungleMaterialId: m.id,
            creatorId: m.get('creatorId'),
            name: m.get('name'),
            text: m.get('text'),
            description: m.get('description'),
            youtubeId: m.get('youtubeId'),
            vimeoId: m.get('vimeoId'),
            audioUrl: m.get('audioUrl'),
            timestamp: (new Date(m.createdAt)).getTime(),
            materialType: m.get('materialType')
        }
    },

    loadUserJungleMaterials: function(userId, callback){
        var q = new Parse.Query('JungleMaterial');
        q.equalTo('creatorId', userId);
        q.addDescending('createdAt');
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformJungle(m);
            });
            callback(arr);
        });
    },

    loadJungleMaterialById: function(materialId, callback){
        var q = new Parse.Query('JungleMaterial');
        if (materialId == undefined){
            return;
        }
        q.get(materialId, {
            success: function(m){
                callback(m);
            }
        });
    },

    loadJungleMaterial: function(materialId, callback){
        var self = this;
        this.loadJungleMaterialById(materialId, function(m){
            callback(self.transformJungle(m));
        });
    },

    createJungleMaterial: function(userId, data, callback){
        console.log('JungleMixin: createJungleMaterial: userId, data = ', userId, data);
        if (userId == undefined){
            return;
        }
        var self = this;
        var JungleMaterial = Parse.Object.extend('JungleMaterial');
        var m = new JungleMaterial();
        m.set('creatorId', userId);
        m = ParseMixin.safeSet(m, [
            {name: 'name', value: data.name},
            {name: 'description', value: data.description},
            {name: 'vimeoId', value: data.vimeoId},
            {name: 'youtubeId', value: data.youtubeId},
            {name: 'audioUrl', value: data.audioUrl},
            {name: 'text', value: data.text},
            {name: 'materialType', value: data.materialType}
        ]);
        m.save().then(function(savedMaterial){
            callback(self.transformJungle(savedMaterial));
        });
    },

    updateJungleMaterial: function(materialId, data, callback){
        console.log('JungleMixin: updateJungleMaterial: materialId, data = ', materialId, data);
        var self = this;
        this.loadJungleMaterialById(materialId, function(m){
            m = ParseMixin.safeSet(m, [
                {name: 'name', value: data.name},
                {name: 'description', value: data.description},
                {name: 'vimeoId', value: data.vimeoId},
                {name: 'youtubeId', value: data.youtubeId},
                {name: 'audioUrl', value: data.audioUrl},
                {name: 'text', value: data.text},
                {name: 'materialType', value: data.materialType}
            ]);
            m.save().then(function(updatedMaterial){
                callback(self.transformJungle(updatedMaterial));
            });
        });
    },

    deleteJungleMaterial: function(materialId, callback){
        this.loadJungleMaterialById(materialId, function(m){
            m.destroy({
                success: function(){
                    callback();
                }
            });
        })
    }


}

module.exports = JungleMixin;