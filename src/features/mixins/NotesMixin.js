/**
 * Created by sabir on 20.10.15.
 */
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var MixpanelHelper = require('../helpers/analytics/MixpanelHelper');

var NotesMixin = {

    transformNote: function(n){
        return {
            id: n.id,
            noteId: n.id,
            creatorId: n.get('creatorId'),
            name: n.get('name'),
            content: n.get('content'),
            timestamp: (new Date(n.createdAt)).getTime()
        }
    },

    createNote: function(creatorId, name, content, groupId, callback){
        if (creatorId == undefined){
            alert('creator is undefined - cannot create note');
            return;
        }
        var self = this;
        var PatientNote = Parse.Object.extend('PatientNote');
        var note = new PatientNote();
        note = ParseMixin.safeSet(note, [
            {name : 'name', value: name},
            {name : 'creatorId', value: creatorId},
            {name : 'content', value: content},
            {name : 'groupId', value: groupId}
        ]);
        note.save().then(function(n){
            var tN = self.transformNote(n);
            MixpanelHelper.track('createNote', tN);
            callback(tN);
        });
    },

    loadNotes: function(teacherId, callback){
        console.log('loadNotes occured: teacherId = ', teacherId);

        var q = new Parse.Query('PatientNote');
        q.limit(1000);
        q.equalTo('creatorId', teacherId);
        q.addDescending('createdAt');
        q.find(function(list){
            console.log('notes loeded: ', list);
            var arr = list.map(function(n){
                return {
                    id: n.id,
                    noteId: n.id,
                    groupId: n.get('groupId'),
                    creatorId: n.get('creatorId'),
                    name: n.get('name'),
                    content: n.get('content'),
                    timestamp: (new Date(n.createdAt)).getTime()
                }
            });
            console.log(arr);
            callback(arr);
        });
    },

    loadNoteById: function(noteId, callback, errorCallback){
        var q = new Parse.Query('PatientNote');
        q.get(noteId, {
            success: function(n){
                callback(n);
            },
            error: function(){
                if (errorCallback != undefined){
                    errorCallback();
                }
            }
        });
    },

    loadNote: function(noteId, callback){
        this.loadNoteById(noteId, function(no){
            callback({
                id: no.id,
                noteId: no.id,
                groupId: no.get('groupId'),
                creatorId: no.get('creatorId'),
                name: no.get('name'),
                content: no.get('content'),
                timestamp: (new Date(no.createdAt)).getTime()
            });
        });
    },

    updateNote: function(noteId, teacherId, name, content, groupId, callback){
        if (noteId == undefined){
            this.createNote(teacherId, name, content, groupId, function(n){
                callback(n);
            });
            return;
        }
        this.loadNoteById(noteId, function(n){
            n = ParseMixin.safeSet(n, [
                {name : 'name', value: name},
                {name : 'content', value: content},
                {name : 'groupId', value: groupId}
            ]);
            n.save().then(function(no){
                callback({
                    id: no.id,
                    noteId: no.id,
                    groupId: no.get('groupId'),
                    creatorId: no.get('creatorId'),
                    name: no.get('name'),
                    content: no.get('content'),
                    timestamp: (new Date(no.createdAt)).getTime()
                });
            });
        });
    },

    deleteNote: function(noteId, callback){
        if (noteId == undefined){
            return;
        }
        this.loadNoteById(noteId, function(note){
            note.destroy({
                success: function(){
                    callback();
                }
            });
        });
    },



    // NOTES GROUP

    createNotesGroup: function(teacherId, name, description, callback){
        if (teacherId == undefined){
            return;
        }
        var NotesGroup = Parse.Object.extend('NotesGroup');
        var g = new NotesGroup();
        g.set('creatorId', teacherId);
        g.set('name', name);
        g.set('description', description);
        g.save().then(function(g){
            callback({
                name: g.get('name'),
                description: g.get('description'),
                id: g.id,
                groupId: g.id
            });
        });
    },




    loadNoteGroupById: function(noteId, callback){
        var q = new Parse.Query('NotesGroup');
        q.get(noteId, {
            success: function(note){
                callback(note);
            }
        });
    },

    loadNoteGroup: function(groupId, callback){
        this.loadNoteGroupById(groupId, function(group){
            callback({
                id: group.id,
                name: group.get('name'),
                description: group.get('description'),
                groupId: group.id,
                teacherId: group.get('creatorId'),
                creatorId: group.get('creatorId')
            });
        });
    },

    updateNoteGroup: function(groupId, teacherId, name, description, callback){
        if (groupId == undefined){
            this.createNotesGroup(teacherId, name, description, function(n){
                callback(n);
            });
            return;
        }
        this.loadNoteGroupById(groupId, function(group){
            group.set('name', name);
            group.set('description', description);
            //group.set('creator', teacherId);
            group.save().then(function(g){
                    callback({
                        name: g.get('name'),
                        description: g.get('description'),
                        id: g.id,
                        teacherId: g.get('creatorId'),
                        creatorId: g.get('creatorId'),
                        groupId: g.id
                });
            });
        }, function(){});

    },

    loadNotesGroups: function(teacherId, callback){
        var q = new Parse.Query('NotesGroup');
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('creatorId', teacherId);
        q.find(function(groups){
            var arr = groups.map(function(g){
                return {
                    name: g.get('name'),
                    description: g.get('description'),
                    id: g.id,
                    teacherId: g.get('creatorId'),
                    creatorId: g.get('creatorId'),
                    groupId: g.id
                }
            });
            callback(arr);
        });
    },

    loadGroupsAndNotes: function(teacherId, callback){
        var self = this;
        var map = {};
        self.loadNotesGroups(teacherId, function(groups){
            for (var i in groups){
                if (map[groups[i].id] == undefined){
                    map[groups[i].id] = {
                        group: groups[i],
                        notes: []
                    }
                }
            }
            map[undefined] = {
                group: {
                    name: 'Прочее',
                    description: undefined,
                    id: undefined,
                    groupId: undefined
                },
                notes: []
            }
            self.loadNotes(teacherId, function(notes){
                for (var i in notes){
                    var note = notes[i];
                    map[note.groupId].notes.push(note);
                }
                var arr = [];
                for (var key in map){
                    arr.push(map[key]);
                }
                callback(arr);
            });
        });
    },

    deleteGroup: function(groupId, callback){
        var self = this;
        console.log('deleteGroup occured: groupId = ', groupId);
        this.loadNoteGroupById(groupId, function(group){
            var q = new Parse.Query('PatientNote');
            q.equalTo('groupId', groupId);
            q.limit(1000);
            q.find(function(notes){
                for (var i in notes){
                    notes[i].unset('groupId');
                }
                if (notes.length == 0){
                    group.destroy({
                        success: function(){
                            callback();
                        }
                    });
                    return;
                }
                Parse.Object.saveAll(notes, {
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
    }

}

module.exports = NotesMixin;