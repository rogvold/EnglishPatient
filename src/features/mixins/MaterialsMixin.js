/**
 * Created by sabir on 21.10.15.
 */
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var $ = require('jquery');

//var TopicsMixin = require('./TopicsMixin');
var UserMixin = require('./UserMixin');
var LoginMixin = require('./LoginMixin');

var MixpanelHelper = require('../helpers/analytics/MixpanelHelper');

var MaterialsMixin = {

    transformMaterialFromParseObject: function(m){
        //console.log('transformMaterialFromParseObject: m = ', m);
        return {
            id: m.id,
            materialId: m.id,
            name: m.get('name'),
            status: m.get('status'),
            tags: m.get('tags'),
            youtubeId: m.get('youtubeId'),
            start: m.get('start'),
            end: m.get('end'),
            transcript: m.get('transcript'),
            createdTimestamp: (new Date(m.createdAt)).getTime(),
            updatedTimestamp: (new Date(m.updatedAt)).getTime(),
            comment: m.get('comment'),
            creatorId: m.get('creatorId'),
            avatar: m.get('vimeoImgSrc'),
            vimeoImgSrc: m.get('vimeoImgSrc'),
            teacherId: m.get('creatorId'),
            vimeoId: m.get('vimeoId'),
            approved: m.get('approved'),
            bbComment: m.get('bbComment'),
            duration: m.get('duration'),
            mosesDurations: (m.get('mosesDurations') == undefined) ? [] : m.get('mosesDurations'),
            groups: (m.get('groups') == undefined) ? [] : m.get('groups'),
            createdTimestamp: (new Date(m.createdAt)).getTime(),
            timestamp: (new Date(m.createdAt)).getTime(),
            updatedTimestamp: (new Date(m.updatedAt)).getTime(),
            lang: (m.get('lang') == undefined) ? 'en' : m.get('lang'),
            access: (m.get('access') == undefined) ? 'private' : m.get('access'),
        }
    },

    transformTopic: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            topicId: p.id,
            name: p.get('name'),
            creatorId: p.get('creatorId'),
            description: p.get('description'),
            avatar: p.get('avatar'),
            access: p.get('access'),
            topicType: p.get('topicType')
        }
    },

    loadTeacherMaterials: function(teacherId, callback){
        var q = new Parse.Query('PatientMaterial');
        q.equalTo('creatorId', teacherId);
        q.addDescending('createdAt');
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformMaterialFromParseObject(m);
            });
            callback(arr);
        });
    },

    loadPublicCommunityMaterials: function(teacherId, callback){
        var q = new Parse.Query('PatientMaterial');
        q.notEqualTo('creatorId', teacherId);
        q.addDescending('createdAt');
        q.equalTo('access', 'public');
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformMaterialFromParseObject(m);
            });
            callback(arr);
        });
    },

    loadOptimizedTeacherMaterials: function(teacherId, topicId, callback){
        if (topicId == undefined){
            this.loadTeacherMaterials(teacherId, callback);
            return;
        }
        var q = new Parse.Query('PatientMaterial');
        q.equalTo('creatorId', teacherId);
        q.addDescending('createdAt');
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformMaterialFromParseObject(m);
            });
            callback(arr);
        });
    },

    loadMaterialsByIds: function(idsList, callback){
        if (idsList == undefined || idsList.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('PatientMaterial');
        q.limit(1000);
        q.containedIn('objectId', idsList);
        var self = this;
        q.find(function(results){
            var arr = results.map(function(r){
                return self.transformMaterialFromParseObject(r);
            });
            var map = {};
            for (var i in arr){
                map[arr[i].id] = arr[i];
            }
            var res = [];
            for (var i in idsList){
                res.push(map[idsList[i]]);
            }

            //callback(arr);
            callback(res);
        });
    },

    loadMaterialById: function(materialId, callback){
        if (materialId == undefined){
            return;
        }
        var q = new Parse.Query('PatientMaterial');
        var self = this;
        q.get(materialId, {
            success: function(m){
                console.log('loadMaterialById: m loaded: ', m);
                callback(m);
            }
        });
    },

    loadMaterialByVimeoId: function(vimeoId, callback){
        console.log('loadMaterialByVimeoId occured: vimeoId = ', vimeoId);
        vimeoId = '' + vimeoId;
        var q = new Parse.Query('PatientMaterial');
        q.equalTo('vimeoId', vimeoId);
        var self = this;
        q.find(function(results){
            console.log('loadMaterialByVimeoId: results = ', results);
            if (results == undefined || results.length == 0){
                callback();
            }else{
                callback(self.transformMaterialFromParseObject(results[0]));
            }
        });
    },

    loadMaterial: function(materialId, callback){
        console.log('loadMaterial occured: materialId = ', materialId);
        var self = this;
        this.loadMaterialById(materialId, function(m){
            var tm = self.transformMaterialFromParseObject(m);
            console.log('loaded ', tm);
            callback(tm);
        });
    },

    deleteMaterial: function(materialId, callback){
        this.loadMaterialById(materialId, function(m){
           m.destroy({
               success: function(){
                   callback();
               }
           });
        });
    },

    updateMosesDurations: function(materialId, durations, callback){
        var self = this;
        this.loadMaterialById(materialId, function(m){
            m.set('mosesDurations', durations);
            m.save().then(function(uM){
                callback(self.transformMaterialFromParseObject(uM));
            });
        });
    },

    createMaterial: function(d, callback){
        console.log('createMaterial occured: materialId, d = ', d);
        var PatientMaterial = Parse.Object.extend('PatientMaterial');
        var m = new PatientMaterial();
        if (d.creatorId == undefined){
            d.creatorId = LoginMixin.getCurrentUserId();
        }
        if (((d.vimeoId == undefined) && (d.youtubeId == undefined)) || d.creatorId == undefined){
            console.log('vimeoId or youtubeId creatorId is undefined');
            return;
        }
        if (d.lang == undefined){
            d.lang = 'en';
        }
        if (d.access == undefined){
            d.access = 'private';
        }
        var videoType = 'vimeo';
        if (d.youtubeId != undefined){
            videoType = 'youtube';
        }
        m = ParseMixin.safeSet(m, [
            {name: 'vimeoId', value: d.vimeoId},
            {name: 'youtubeId', value: d.youtubeId},
            {name: 'name', value: d.name},
            {name: 'transcript', value: d.transcript},
            {name: 'comment', value: d.comment},
            {name: 'tags', value: d.tags},
            {name: 'vimeoImgSrc', value: d.avatar},
            {name: 'groups', value: d.groups},
            {name: 'status', value: d.status},

            {name: 'vimeoImgSrc', value: d.vimeoImgSrc},
            {name: 'duration', value: d.duration},
            {name: 'start', value: d.start},
            {name: 'end', value: d.end},

            {name: 'creatorId', value: d.creatorId},
            {name: 'approved', value: d.approved},
            {name: 'bbComment', value: d.bbComment},
            {name: 'duration', value: d.duration},
            {name: 'lang', value: d.lang},
            {name: 'access', value: d.access}
        ]);
        var self = this;
        //m.save(null, {
        //        success: function(material){
        //            console.log('--->>>> CREATED NEW MATERIAL: ', material);
        //            callback(self.transformMaterialFromParseObject(material));
        //        }
        //});
        m.save().then(function(material){
            console.log('--->>>> CREATED NEW MATERIAL: ', material);
            var mmm = self.transformMaterialFromParseObject(material);
            MixpanelHelper.track('materialCreated', mmm);
            callback(mmm);
        });
    },

    updateMaterial: function(materialId, d, callback){
        console.log('updateMaterial occured: ', materialId, d);
        var self = this;
        if (materialId == undefined){
            this.createMaterial(d, function(m){
                callback(m);
            });
            return;
        }
        this.loadMaterialById(materialId, function(m){
            console.log('material loaded', m);
            m = ParseMixin.safeSet(m, [
                {name: 'vimeoId', value: d.vimeoId},
                {name: 'youtubeId', value: d.youtubeId},
                {name: 'name', value: d.name},
                {name: 'transcript', value: d.transcript},
                {name: 'comment', value: d.comment},
                {name: 'tags', value: d.tags},
                //{name: 'vimeoImgSrc', value: d.avatar},
                {name: 'groups', value: d.groups},
                {name: 'status', value: d.status},
                {name: 'vimeoImgSrc', value: d.vimeoImgSrc},
                {name: 'start', value: d.start},
                {name: 'end', value: d.end},
                {name: 'duration', value: d.duration},
                {name: 'lang', value: d.lang},
                {name: 'access', value: d.access}
                //{name: 'creatorId', value: d.creatorId},
                //{name: 'approved', value: d.approved},
                //{name: 'bbComment', value: d.bbComment},
                //{name: 'duration', value: d.duration}
            ]);
            console.log('saving material', m);
            m.save(null, {
                success: function(material){
                    console.log('material saved: ', material);
                    callback(self.transformMaterialFromParseObject(material));
                }
            });
        });
    },

    deleteMaterial: function(materialId, callback){
        this.loadMaterialById(materialId, function(m){
            m.destroy({
                success: function(mat){
                    callback(mat);
                }
            });
        });
    },


    loadMaterialsAsParseObjectsInGroup: function(groupId, callback){
        var q = new Parse.Query('PatientMaterial');
        q.containsAll('groups', [groupId]);
        q.limit(1000);
        var self = this;
        q.find(function(results){
            callback(results);
        });
    },

    loadMaterialsInGroup: function(groupId, callback){
        var self = this;
        this.loadMaterialsAsParseObjectsInGroup(groupId, function(list){
            var arr = list.map(function(l){
                return self.transformGroup(l);
            });
            callback(arr);
        });
    },


    loadMaterialsInGroupsList: function(groups, callback){
        console.log('MaterialsMixin: loadMaterialsInGroupsList occured: groups = ', groups);
        var q = new Parse.Query('PatientMaterial');
        q.limit(1000);
        q.containedIn('groups', groups);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(m){
                return self.transformMaterialFromParseObject(m);
            });
            callback(arr);
        });
    },


    //material groups

    transformGroup: function(g){
        return {
            name: g.get('name'),
            description: g.get('description'),
            id: g.id,
            topicId: g.get('topicId'),
            ownerId: g.get('ownerId'),
            creatorId: g.get('ownerId'),
            materialId: g.id,
            timestamp: (new Date(g.createdAt)).getTime()
        }
    },

    loadGroupById: function(groupId, callback){
        console.log('loadGroupById occured: groupId = ', groupId);
        if (groupId == undefined){
            return;
        }
        var q = new Parse.Query('MaterialGroup');
        q.get(groupId, {
            success: function(group){
                console.log('loadGroupById: group is loaded: ', group);
                callback(group);
            }
        });
    },

    loadGroup: function(groupId, callback){
        var self = this;
        this.loadGroupById(groupId, function(group){
            callback(self.transformGroup(group));
        });
    },

    loadTeacherGroups: function(teacherId, topicId, callback){
        var q = new Parse.Query('MaterialGroup');
        q.limit(1000);
        var self = this;
        q.equalTo('ownerId', teacherId);
        if (topicId != undefined){
            q.equalTo('topicId', topicId);
        }
        q.addDescending('createdAt');
        q.find(function(results){
            var arr = results.map(function(g){
                return self.transformGroup(g);
            });
            callback(arr);
        });
    },

    loadGroupsByTopicsList: function(topicsList, callback){
        if (topicsList == undefined || topicsList.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('MaterialGroup');
        q.containedIn('topicId', topicsList.map(function(t){return t.id}));
        q.limit(1000);
        var self = this;
        q.find(function(results){
            var arr = results.map(function(t){
                return self.transformGroup(t);
            });
            callback(arr);
        });
    },

    loadGroupsByTopicsIdsList: function(topicsIdsList, callback){
        if (topicsIdsList == undefined || topicsIdsList.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('MaterialGroup');
        q.containedIn('topicId', topicsIdsList);
        q.limit(1000);
        var self = this;
        q.find(function(results){
            var arr = results.map(function(t){
                return self.transformGroup(t);
            });
            callback(arr);
        });
    },

    loadGroupsByIdsList: function(groupsIds, callback){
        if (groupsIds == undefined || groupsIds.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('MaterialGroup');
        q.containedIn('objectId', groupsIds);
        q.limit(1000);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(t){
                return self.transformGroup(t);
            });
            callback(arr);
        });
    },

    loadGroupsByTopicId: function(topicId, callback){
        var q = new Parse.Query('MaterialGroup');
        q.equalTo('topicId', topicId);
        q.limit(1000);
        var self = this;
        q.find(function(results){
            var arr = results.map(function(t){
                return self.transformGroup(t);
            });
            callback(arr);
        });
    },

    createGroup: function(teacherId, topicId, name, description, callback){
        var MaterialGroup = Parse.Object.extend('MaterialGroup');
        var g = new MaterialGroup();
        if (teacherId == undefined){
            teacherId = LoginMixin.getCurrentUserId();
        }
        g.set('ownerId', teacherId);
        if (topicId != undefined){
            g.set('topicId', topicId);
        }
        g.set('name', name);
        g.set('description', description);
        var self = this;
        g.save(null, {
            success: function(group){
                callback(self.transformGroup(group));
            }
        });
    },

    updateGroup: function(groupId, teacherId, topicId, name, description, callback){
        if (groupId == undefined){
            this.createGroup(teacherId, topicId, name, description, callback);
            return;
        }
        var self = this;
        this.loadGroupById(groupId, function(g){
            g = ParseMixin.safeSet(g, [{name: 'name', value: name}, {name: 'description', value: description}]);
            g.save(null, {
                success: function(gr){
                    callback(self.transformGroup(gr));
                }
            });
        });
    },

    deleteGroup: function(groupId, callback){
        var self = this;
        self.loadGroupById(groupId, function(group){
            self.loadMaterialsAsParseObjectsInGroup(groupId, function(materials){
                var uMaterials = [];
                for (var i in materials){
                    var m = materials[i];
                    var groupsList = (m.get('groups') == undefined) ? [] : m.get('groups');
                    var newGroupsList = [];
                    for (var j in groupsList){
                        var grId = groupsList[j];
                        if (grId == groupId){
                            continue;
                        }
                        newGroupsList.push(grId);
                    }
                    m.set('groups', newGroupsList);
                    uMaterials.push(m);
                }
                if (uMaterials.length == 0){
                    group.destroy({
                        success: function(){
                            callback();
                        }
                    });
                    return;
                }
                Parse.Object.saveAll(uMaterials, {
                    success: function(){
                        group.destroy({
                            success: function(){
                                callback();
                            }
                        });
                    }
                });
            });
        });
    },


    getGroupsFactoryList: function(groups, materials, makeUnsorted, hasEmptyGroups){
        console.log('MaterialsMixin: getGroupsFactoryList: groups, materials = ', groups, materials);
        var arr = [];
        if (makeUnsorted == undefined){
            makeUnsorted = true;
        }
        if (hasEmptyGroups == undefined){
            hasEmptyGroups = false;
        }
        var hasUnsortedGroup = false;
        for (var i in groups){
            if (groups[i].id == undefined){
                hasUnsortedGroup = true;
            }
        }
        if ((hasUnsortedGroup == false) && (makeUnsorted == true)){
            groups.push({
                name: 'Unsorted',
                description: 'Материалы вне категорий',
                id: undefined,
                groupId: undefined
            });
        }
        for (var i in groups){
            var g = groups[i];
            var gr = {
                group: g
            };
            var groupId = g.id;
            var ms = [];
            for (var j in materials){
                var m = materials[j];
                var groupsList = (m.groups == undefined) ? [] : m.groups;
                if (groupsList.length == 0){
                    groupsList.push(undefined);
                }
                if (groupsList.indexOf(groupId) > -1){
                    ms.push(m);
                }
            }
            gr.materials = ms;
            arr.push(gr);
        }
        var arr2 = [];
        if (hasEmptyGroups == true){
            arr2 = arr;
        }else {
            for (var i in arr){
                if (arr[i].materials == undefined || arr[i].materials.length == 0){
                    continue;
                }
                arr2.push(arr[i]);
            }
        }
        console.log('returning ', arr2);
        return arr2;
    },

    updateGroupsFactoryListWithMaterial: function(groupsFactoryList, material){
        console.log('updateGroupsFactoryListWithMaterial: groupsFactoryList, material = ', groupsFactoryList, material);
        var list = groupsFactoryList;
        var groups = list.map(function(g){return g.group});
        var materialsMap = {};
        for (var i in list){
            var materials = list[i].materials;
            for (var j in materials){
                var m = materials[j];
                materialsMap[m.id] = m;
            }
        }

        var newMaterials = [];

        if (materialsMap[material.id] == undefined){
            newMaterials.push(material);
        }else{
            materialsMap[material.id] = material;
        }

        for (var key in materialsMap){
            var m = materialsMap[key];
            newMaterials.push(m);
        }

        return this.getGroupsFactoryList(groups, newMaterials);
    },

    loadGroupsAndMaterials: function(teacherId, topicId, callback){
        console.log('loadGroupsAndMaterials occured: teacherId = ',  teacherId,  ' , topicId = ', topicId);
        var self = this;
        console.log('starting loading teacher groups');
        this.loadTeacherGroups(teacherId, topicId, function(groups){
            console.log('teacher groups loaded: groups = ', groups);
            console.log('starting loading teacher materials');
            self.loadTeacherMaterials(teacherId, function(materials){
                console.log('teacher materials loaded: materials = ', materials);
                var arr = self.getGroupsFactoryList(groups, materials);
                console.log('loading not mine groups factory list');
                self.loadNotMineGroupsFactoryList(teacherId, function(notMineArr){
                    arr = arr.concat(notMineArr);
                    console.log('notMineArr loaded: ', notMineArr);
                    callback(arr);
                });
                //callback(arr);
            });
        });
    },

    getMaterialsListFromGroupsFactoryList: function(groupsFactoryList){
        var map = {};
        for (var i in groupsFactoryList){
            var gr = groupsFactoryList[i];
            var materials = gr.materials;
            for (var j in materials){
                if (map[materials[j].id] == undefined){
                    map[materials[j].id] = materials[j];
                }
            }
        }
        var arr = [];
        for (var key in map){
            arr.push(map[key]);
        }
        return arr;
    },

    getGroupsListFromGroupsFactoryList: function(groupsFactoryList){
        var arr = [];
        for (var i in groupsFactoryList){
            var gr = groupsFactoryList[i];
            arr.push(gr.group);
        }
        return arr;
    },

    materialIsInSearch: function(material, query){
        if (query == undefined || query.trim() == ''){
            return false;
        }
        var transcript = (material.transcript == undefined) ? '' : material.transcript.toLowerCase();
        var name = (material.name == undefined) ? '' : material.name.toLowerCase();
        var comment = (material.comment == undefined) ? '' : material.comment.toLowerCase();
        var vimeoId = (material.vimeoId == undefined) ? '' : material.vimeoId;
        var tags = (material.tags == undefined) ? [] : material.tags;
        if ((transcript.indexOf(query) > -1) ||
                        (name.indexOf(query) > -1) ||
                        (comment.indexOf(query) > -1) || (vimeoId.indexOf(query) > -1)){
            return true;
        }
        for (var i in tags){
            var tag = tags[i];
            tag = (tag == undefined) ? '' : tag.toLowerCase();
            if (tag.indexOf(query) > -1){
                return true;
            }
        }
        return false

    },

    searchInGroupsFactoryList: function(groupsFactoryList, text, showEmptyGroups){
        console.log('MaterialsMixin: searchInGroupsFactoryList: text = ', text);
        var groups = this.getGroupsListFromGroupsFactoryList(groupsFactoryList);
        var materials = this.getMaterialsListFromGroupsFactoryList(groupsFactoryList);
        console.log('groups = ', groups);
        var arr = [];
        if (text == undefined || text.trim() == ''){
            return groupsFactoryList;
        }
        for (var i in materials){
            var m = materials[i];
            if (this.materialIsInSearch(m, text) == true){
                arr.push(m);
            }
        }
        var newGr = this.getGroupsFactoryList(groups, arr);
        return newGr;
    },

    loadVimeoInfo: function(vimeoId, callback, errorCallback){
        if (vimeoId == undefined){
            callback(undefined);
            return;
        }
        console.log('loading info for vimeoId = ' + vimeoId);
        $.ajax('https://vimeo.com/api/v2/video/' + vimeoId + '.json', {
            success: function(data){
                console.log('https://vimeo.com/api/v2/video/' + vimeoId + '.json', data);
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

    loadNotMineTopics: function(userId, callback){
        if (userId == undefined){
            callback([]);
            return;
        }
        var q = new Parse.Query('PatientTopic');
        q.limit(1000);
        var self = this;
        q.notEqualTo('creatorId', userId);
        q.find(function(results){
            var arr = results.map(function(t){
                return self.transformTopic(t);
            });
            var usersIds = arr.map(function(a){return a.creatorId});
            UserMixin.loadUsersByIdsList(usersIds, function(users){
                console.log('users: ', users);
                var map = {};
                for (var i in users){
                    map[users[i].id] = users[i];
                }
                arr = arr.map(function(a){ a.user = map[a.creatorId]; return a; });
                callback(arr);
            });
        });
    },

    loadNotMineGroupsFactoryList: function(userId, callback){
        console.log('loadNotMineGroupsFactoryList occured: userId = ', userId);
        var self = this;
        this.loadNotMineTopics(userId, function(topics){
            topics = (topics == undefined) ? [] : topics;
            self.loadGroupsByTopicsList(topics.map(function(top){return top.id}), function(groups){
                console.log('groups loaded: ', groups);
                var groupsIds = groups.map(function(gr){return gr.id});
                self.loadMaterialsInGroupsList(groupsIds, function(materials){
                    console.log('materials loaded: materials = ', materials);
                    var groupsFactoryList = self.getGroupsFactoryList(groups, materials, false);
                    callback(groupsFactoryList);
                });
            });
        });
    },

    migrateLang: function(){
        var q = new Parse.Query('PatientMaterial');
        q.limit(1000);
        q.doesNotExist('lang');
        q.find(function(results){
            console.log('loaded videos: ', results);
            for (var i in results){
                results[i].set('lang', 'en');
                results[i].set('access', 'private');
            }
            console.log('saving lang');
            Parse.Object.saveAll(results, {
                success: function(){
                    alert('lang migrated!');
                }
            });
        });
    }


}


module.exports = MaterialsMixin;