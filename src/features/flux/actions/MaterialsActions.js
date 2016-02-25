/**
 * Created by sabir on 25.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../mixins/MaterialsMixin');

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var MixpanelHelper = require('../../helpers/analytics/MixpanelHelper');

var MaterialsActions = {

    loadMaterialsAndGroups: function(){
        var user = LoginMixin.getCurrentUser();
        if (user == undefined){
            return;
        }
        var userId = LoginMixin.getCurrentUser().id;
        this.dispatch(constants.LOAD_MATERIALS_GROUPS_FACTORY_LIST, {userId: userId});

        MaterialsMixin.loadGroupsAndMaterials(userId, undefined, function(groupsFactoryList){
            this.dispatch(constants.LOAD_MATERIALS_GROUPS_FACTORY_LIST_SUCCESS, {groupsFactoryList: groupsFactoryList})
        }.bind(this));

    },

    loadAllTeacherMaterials: function(callback){
        var user = LoginMixin.getCurrentUser();
        if (user == undefined){
            return;
        }
        var userId = user.id;
        this.dispatch(constants.LOAD_TEACHER_MATERIALS, {userId: userId});
        MaterialsMixin.loadTeacherMaterials(userId, function(materials){
            this.dispatch(constants.LOAD_TEACHER_MATERIALS_SUCCESS, {materials: materials, userId: userId});
            if (callback != undefined){
                callback();
            }
        }.bind(this));
    },

    loadTeacherMaterialsGroups: function(callback){
        var user = LoginMixin.getCurrentUser();
        if (user == undefined){
            return;
        }
        var userId = user.id;
        this.dispatch(constants.LOAD_TEACHER_MATERIALS_GROUPS, {userId: userId});
        MaterialsMixin.loadTeacherGroups(userId, undefined, function(groups){
            this.dispatch(constants.LOAD_TEACHER_MATERIALS_GROUPS_SUCCESS, {groups: groups, userId: userId});
            if (callback != undefined){
                callback();
            }
        }.bind(this));
    },

    loadTeacherMaterialsAndGroups: function(callback){
        console.log('MaterialsActions: loadTeacherMaterialsAndGroups occured');
        var self = this;
        var user = LoginMixin.getCurrentUser();
        if (user == undefined){
            return;
        }
        var userId = user.id;
        this.dispatch(constants.LOAD_TEACHER_MATERIALS, {userId: userId});
        MaterialsMixin.loadTeacherMaterials(userId, function(materials){
            console.log('MaterialsActions: materials loaded: ', materials);
            self.dispatch(constants.LOAD_TEACHER_MATERIALS_SUCCESS, {materials: materials, userId: userId});
            self.dispatch(constants.LOAD_TEACHER_MATERIALS_GROUPS, {userId: userId});
            var materialsUsersIds = materials.map(function(mat){return mat.creatorId});
            MaterialsMixin.loadTeacherGroups(userId, undefined, function(groups){
                console.log('MaterialsActions: groups loaded: ', groups);
                self.dispatch(constants.LOAD_TEACHER_MATERIALS_GROUPS_SUCCESS, {groups: groups, userId: userId});

                var groupUsersIds = groups.map(function(gr){return gr.creatorId});
                var usersIds = materialsUsersIds.concat(groupUsersIds);
                this.flux.actions.loadUsersByIds(usersIds);

                if (callback != undefined){
                    callback();
                }
            }.bind(this));
        }.bind(this));
    },

    refreshMaterial: function(materialId){
        if (materialId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_MATERIAL, {materialId: materialId});
        MaterialsMixin.loadMaterial(materialId, function(material){
            this.dispatch(constants.LOAD_MATERIAL_SUCCESS, {materialId: materialId, material: material});
        }.bind(this));
    },

    deleteMaterial: function(materialId){
        if (materialId == undefined){
            return;
        }
        this.dispatch(constants.DELETE_MATERIAL, {materialId: materialId});
    },

    refreshMaterialGroup: function(groupId){
        if (groupId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_MATERIAL_GROUP, {groupId: groupId});
        MaterialsMixin.loadGroup(groupId, function(group){
            this.dispatch(constants.LOAD_MATERIAL_GROUP_SUCCESS, {group: group});
        }.bind(this));
    },

    deleteMaterialGroup: function(groupId){
        if (groupId == undefined){
            return;
        }
        this.dispatch(constants.DELETE_MATERIAL_GROUP, {groupId: groupId});
    },

    loadMaterialsByGroupsIds: function(groupsIds){
        if (groupsIds == undefined || groupsIds.length == 0){
            return;
        }
        this.dispatch(constants.LOAD_MATERIALS_BY_GROUPS_IDS, {groupsIds: groupsIds});
        MaterialsMixin.loadMaterialsInGroupsList(groupsIds, function(materials){
            this.dispatch(constants.LOAD_MATERIALS_BY_GROUPS_IDS_SUCCESS, {materials: materials});
        }.bind(this));
    },

    loadGroupsByTopicId: function(topicId){
        this.dispatch(constants.LOAD_MATERIAL_GROUPS_BY_TOPIC_ID, {topicId: topicId});
        MaterialsMixin.loadGroupsByTopicId(topicId, function(groups){
            this.dispatch(constants.LOAD_MATERIAL_GROUPS_BY_TOPIC_ID_SUCCESS, {groups: groups});
            var groupsIds = groups.map(function(gr){return gr.id});
            this.flux.actions.loadMaterialsByGroupsIds(groupsIds);
        }.bind(this));
    },

    loadGroupsByTopicsIds: function(topicsIds){
        var map = this.flux.store('MaterialsStore').getTopicsIdsMap();
        var ids = [];
        for (var i in topicsIds){
            var id = topicsIds[i];
            if (map[id] == undefined){
                ids.push(id);
            }
        }
        if (ids.length == 0){
            return;
        }
        this.dispatch(constants.LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS, {topicsIds: topicsIds});
        MaterialsMixin.loadGroupsByTopicsIdsList(ids, function(groups){
            this.dispatch(constants.LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS_SUCCESS, {groups: groups});
            var groupsIds = groups.map(function(gr){return gr.id});
            this.flux.actions.loadMaterialsByGroupsIds(groupsIds);
        }.bind(this));
    },

    loadGroupsByGroupsIds: function(groupsIds){
        if (groupsIds == undefined){
            groupsIds = [];
        }
        var groupsMap = this.flux.store('MaterialsStore').getGroupsMap();
        var ids = [];
        for (var i in groupsIds){
            var id = groupsIds[i];
            if (groupsMap[id] == undefined){
                ids.push(id);
            }
        }
        if (ids.length == 0){
            return;
        }
        this.dispatch(constants.LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS, {groupsIds: ids});
        MaterialsMixin.loadGroupsByIdsList(ids, function(groups){
            console.log('materials groups loaded: groups = ', groups);
            this.dispatch(constants.LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS_SUCCESS, {groups: groups});
            this.flux.actions.loadMaterialsByGroupsIds(ids);
        }.bind(this));
    },

    loadExtraMaterialsGroups: function(){ //materials
        console.log('MaterialsActions: loadExtraMaterialsGroups occured');
        var groupsIds = [
            constants.VOCABULARY_GROUP_ID, //vocabulary
            constants.IDIOMS_GROUP_ID //idioms
        ];
        this.flux.actions.loadGroupsByGroupsIds(groupsIds);
    },

    loadPublicCommunityMaterials: function(){
        console.log('loadPublicCommunityMaterials occured');
        this.dispatch(constants.LOAD_PUBLIC_MATERIALS, {});
        var teacherId = LoginMixin.getCurrentUserId();
        MaterialsMixin.loadPublicCommunityMaterials(teacherId, function(materials){
            this.dispatch(constants.LOAD_PUBLIC_MATERIALS_SUCCESS, {materials: materials});
            console.log('loadPublicCommunityMaterials: loaded: materials = ', materials);
            var map = {};
            for (var i in materials){
                var m = materials[i];
                var groups = m.groups;
                for (var j in groups){
                    var groupId = groups[j];
                    map[groupId] = 1;
                }
            }
            var arr = [];
            for (var key in map){
                arr.push(key);
            }
            if (arr.length > 0){
                console.log('loading groups for public materials: arr = ', arr);
                this.flux.actions.loadGroupsByGroupsIds(arr);
            }
        }.bind(this));
    }


}

module.exports = MaterialsActions;