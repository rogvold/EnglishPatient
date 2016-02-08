/**
 * Created by sabir on 25.01.16.
 */

var Fluxxor = require('fluxxor');

var constants = require('../constants');

var MaterialsMixin = require('../../mixins/MaterialsMixin');

var VocabularyMixin = require('../../mixins/VocabularyMixin');
var IdiomsMixin = require('../../mixins/IdiomsMixin');

var MaterialsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.materialsLoading = false;
        this.groupsLoading = false;
        this.materialsLoaded = false;
        this.groupsLoaded = false;
        this.groupsFactoryList = [];
        this.idioms = [];
        this.vocabularyWords = [];

        this.materials = [];
        this.groups = [];

        this.bindActions(
            constants.LOAD_MATERIALS_GROUPS_FACTORY_LIST, this.onMaterialsAndGroupsLoadingStart,
            constants.LOAD_MATERIALS_GROUPS_FACTORY_LIST_SUCCESS, this.onMaterialsAndGroupsLoaded,

            constants.LOAD_TEACHER_MATERIALS, this.loadTeacherMaterials,
            constants.LOAD_TEACHER_MATERIALS_SUCCESS, this.loadedTeacherMaterials,

            constants.LOAD_TEACHER_MATERIALS_GROUPS, this.loadTeacherGroups,
            constants.LOAD_TEACHER_MATERIALS_GROUPS_SUCCESS, this.loadedTeacherGroups,



            constants.LOAD_MATERIAL, this.loadMaterial,
            constants.LOAD_MATERIAL_SUCCESS, this.loadedMaterial,
            constants.DELETE_MATERIAL, this.deleteMaterial,

            constants.LOAD_MATERIALS_BY_GROUPS_IDS, this.loadMaterialsByGroupsIds,
            constants.LOAD_MATERIALS_BY_GROUPS_IDS_SUCCESS, this.loadedMaterialsByGroupsIds,

            constants.LOAD_MATERIAL_GROUP, this.loadGroup,
            constants.LOAD_MATERIAL_GROUP_SUCCESS, this.loadedGroup,
            constants.DELETE_MATERIAL_GROUP, this.deleteGroup,

            constants.LOAD_MATERIAL_GROUPS_BY_TOPIC_ID, this.loadMaterialGroupsByTopicId,
            constants.LOAD_MATERIAL_GROUPS_BY_TOPIC_ID_SUCCESS, this.loadedMaterialGroupsByTopicId,

            constants.LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS, this.loadMaterialGroupsByTopicsIds,
            constants.LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS_SUCCESS, this.loadedMaterialGroupsByTopicsIds,

            constants.LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS, this.loadMaterialGroupsByGroupsIds,
            constants.LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS_SUCCESS, this.loadedMaterialGroupsByGroupsIds


        );
    },

    onMaterialsAndGroupsLoadingStart: function(payload){
        if (this.materialsLoading == true){
            return;
        }
        this.loading = true;
        this.emit('change');
    },

    onMaterialsAndGroupsLoaded: function(payload, type){
        console.log(payload);
        payload = (payload == undefined) ? {} : payload;
        var groupsFactoryList = (payload.groupsFactoryList == undefined) ? [] : payload.groupsFactoryList;
        this.groupsFactoryList = groupsFactoryList;
        this.materialsLoading = false;
        this.materialsLoaded = true;
        this.emit('change');
    },

    loadTeacherMaterials: function(){
        if (this.materialsLoaded == true){
            return;
        }
        this.materialsLoading = true;
        this.emit('change');
    },

    loadedTeacherMaterials: function(payload){
        var materials = (payload == undefined) ? [] : payload.materials;
        if (materials == undefined){
            materials = [];
        }
        this.materials = materials;
        this.materialsLoading = false;
        this.materialsLoaded = true;
        this.emit('change');
    },

    loadTeacherGroups: function(){
        if (this.groupsLoaded == true){
            return;
        }
        this.groupsLoading = true;
        this.emit('change');
    },

    loadedTeacherGroups: function(payload){
        var groups = (payload == undefined) ? [] : payload.groups;
        if (groups == undefined){
            groups = [];
        }
        this.groupsLoading = false;
        this.groupsLoaded = true;
        this.consumeNewGroups(groups);
        this.emit('change');
    },

    getState: function(){
        return {
            materialsLoading: this.materialsLoading,
            groupsLoading: this.groupsLoading,
            //groupsFactoryList: this.groupsFactoryList,
            groupsFactoryList: MaterialsMixin.getGroupsFactoryList(this.groups, this.materials),
            loading: (this.groupsLoading || this.materialsLoading)
        }
    },

    getTopicGroups: function(topicId, userId){
        console.log('MaterialsStore: getTopicGroups: topicId = ', topicId);
        var arr = [];
        var list = this.groups;
        for (var i in list){
            var g = list[i];
            if ((userId != undefined) && (g.ownerId != userId)){
                continue;
            }
            if (g.topicId == topicId){
                arr.push(g);
            }
        }
        arr.sort(function(a, b){
            return +a.timestamp - +b.timestamp;
        });
        console.log('returning arr = ', arr);
        return arr;
    },

    getTopicGroupsFactoryList: function(topicId, userId){
        var groups = this.getTopicGroups(topicId, userId);
        var materials = this.materials;
        var fac = MaterialsMixin.getGroupsFactoryList(groups, materials);
        console.log('MaterialsStore: getTopicGroupsFactoryList: fac = ', fac);
        return fac;
    },

    getGroupsFactoryListForSearch: function(){
        var groups = this.groups;
        for (var i in groups){
            var g = groups[i];
            if (g.id == constants.VOCABULARY_GROUP_ID){
                console.log('getGroupsFactoryListForSearch: IT HAS VOC GROUP');
            }
        }

        var fac = MaterialsMixin.getGroupsFactoryList(this.groups, this.materials);
        console.log('MaterialsStore: getGroupsFactoryListForSearch: fac = ', fac);
        return fac;
    },

    loadMaterial: function(){
        this.materialsLoading = true;
        this.emit('change');
    },

    loadedMaterial: function(payload){
        var material = (payload == undefined) ? undefined : payload.material;
        console.log('loadedMaterial: material = ', material);
        if (material == undefined){
            return;
        }
        var list = this.materials;
        var map = this.getMaterialsMap();
        if (map[material.id] == undefined){
            this.materials.push(material);
        }else{
            for (var i in list){
                if (list[i].id == material.id){
                    list[i] = material;
                }
            }
            this.materials = list;
        }

        this.materialsLoading = false;
        this.emit('change');
    },

    deleteMaterial: function(payload){
        var materialId = payload.materialId;
        var arr = [];
        var list = this.materials;
        for (var i in list){
            if (list[i].id == materialId){
                continue;
            }
            arr.push(list[i]);
        }
        this.materials = arr;
        this.emit('change');
    },

    deleteGroup: function(payload){
        var groupId = payload.groupId;
        console.log('MaterialsStore: deleteGroup occured: groupId = ', groupId);
        var arr = [];
        var list = this.groups;
        for (var i in list){
            if (list[i].id == groupId){
                console.log('group ', list[i], 'deleted from the this.groups');
                continue;
            }
            arr.push(list[i]);
        }
        this.groups = arr;
        console.log('deleteGroup: this.groups after delete: this.groups = ', this.groups);
        this.emit('change');
    },

    loadGroup: function(){
        this.groupsLoading = true;
        this.emit('change');
    },

    loadedGroup: function(payload){
        var group = (payload == undefined) ? undefined : payload.group;
        this.consumeNewGroups([group]);
        this.groupsLoading = false;
        this.emit('change');
    },

    getTopicsIdsMap: function(){
        var map = {};
        var groups = this.groups;
        for (var i in groups){
            if (groups[i].topicId != undefined){
                map[groups[i].topicId] = groups[i].topicId;
            }
        }
        return map;
    },

    getGroupsMap: function(){
        var groups = this.groups;
        var map = {};
        for (var i in groups){
            map[groups[i].id] = groups[i];
        }
        return map;
    },

    getMaterialsMap: function(){
        var materials = this.materials;
        var map = {};
        for (var i in materials){
            map[materials[i].id] = materials[i];
        }
        return map;
    },

    loadMaterialGroupsByTopicId: function(payload){
        var topicId = payload.topicId;
        var map = this.getTopicsIdsMap();
        if (map[topicId] != undefined){
            return;
        }
        this.groupsLoading = true;
        this.emit('change');
    },



    loadedMaterialGroupsByTopicId: function(payload) {
        var groups = payload.groups;
        this.consumeNewGroups(groups);
        this.groupsLoading = false;
        this.emit('change')
    },

    consumeNewGroups: function(groups){
        console.log('consumeNewGroups: groups = ', groups);
        var groupsMap = this.getGroupsMap();
        var arr = [];
        for (var i in groups){
            if (groupsMap[groups[i].id] == undefined){
                arr.push(groups[i]);
            }
        }
        console.log('loadedMaterialGroupsByTopicId: groups for concatenation: arr = ', arr);
        if (arr.length == 0){
            return;
        }
        this.groups = this.groups.concat(arr);
        console.log('consumeNewGroups: after concat = ', this.groups);
    },

    loadMaterialGroupsByTopicsIds: function(payload){
        var topicsIds = payload.topicsIds;
        var map = this.getTopicsIdsMap();
        var arr = [];
        for (var i in topicsIds){
            if (map[topicsIds[i]] == undefined){
                arr.push(topicsIds[i]);
            }
        }
        if (arr.length == 0){
            return;
        }
        this.groupsLoading = true;
        this.emit('change');
    },

    loadedMaterialGroupsByTopicsIds: function(payload){
        this.loadedMaterialGroupsByTopicId(payload);
    },

    loadMaterialsByGroupsIds: function(payload){
        var groupsIds = payload.groupsIds;
        var groupsMap = this.getGroupsMap();
        var arr = [];
        for (var i in groupsIds){
            var id = groupsIds[i];
            if (groupsMap[id] == undefined){
                arr.push(id);
            }
        }
        if (arr.length == 0){
            return;
        }
        this.materialsLoading = true;
        this.emit('change');
    },

    loadedMaterialsByGroupsIds: function(payload){
        var materials = payload.materials;
        console.log('MaterialsStore: loadedMaterialsByGroupsIds: materials = ', materials);
        var map = this.getMaterialsMap();
        for (var i in materials){
            var m = materials[i];
            map[m.id] = m;
        }
        var arr = [];
        for (var key in map){
            arr.push(map[key]);
        }
        this.materials = arr;
        this.materialsLoading = false;
        this.emit('change');
    },

    loadMaterialGroupsByGroupsIds: function(payload){
        this.groupsLoading = true;
        this.emit('change');
    },

    loadedMaterialGroupsByGroupsIds: function(payload){
        console.log('MaterialsStore: loadedMaterialGroupsByGroupsIds: payload.groups = ', payload.groups);
        this.loadedMaterialGroupsByTopicId(payload);
    },

    getMaterialsInGroup: function(groupId){
        var materials = this.materials;
        var arr = [];
        for (var i in materials){
            var m = materials[i];
            if (m.groups.indexOf(groupId) == -1){
                continue;
            }
            arr.push(m);
        }
        return arr;
    },

    getIdioms: function(){
        if (this.idioms.length == 0){
            var materials = this.getMaterialsInGroup(constants.IDIOMS_GROUP_ID);
            var idioms = IdiomsMixin.getIdiomsByMaterialsList(materials);
            this.idioms = idioms;
        }
        return this.idioms;
    },

    getVocabularyWords: function(){
        if (this.vocabularyWords.length > 0){
            return this.vocabularyWords;
        }
        var materials = this.getMaterialsInGroup(constants.VOCABULARY_GROUP_ID);
        var words = VocabularyMixin.prepareWordsFromMaterials(materials);
        this.vocabularyWords = words;
        return words;
    }



});

module.exports = MaterialsStore;