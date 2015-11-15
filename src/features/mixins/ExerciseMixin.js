/**
 * Created by sabir on 30.09.15.
 */
var Parse = require('parse').Parse;
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');


var ExerciseMixin = {
    loadExerciseById: function(id, callback){
        console.log('loadExerciseById: id = ', id);
        ParseMixin.loadClassItem('Exercise', id, function(ex){
            callback(ex);
        }, function(e){
            console.log('error: ', e);
        })
    },

    loadExerciseCards: function(exerciseId, callback){
        console.log('loadExerciseCards: exerciseId = ', exerciseId);
        var q = new Parse.Query('ExerciseCard');
        q.limit(1000);
        q.equalTo('exerciseId', exerciseId);
        q.addAscending('number');
        q.find(function(results){
            //console.log('--->>> raw cards loaded: ', results);
           callback(results);
        });
    },

    loadExerciseInfo: function(exerciseId, callback){
        this.loadExerciseById(exerciseId, function(ex) {
            var ex = {
                name: ex.get('name'),
                id: ex.id,
                exerciseId: ex.id,
                groups: (ex.get('groups') == undefined) ? [] : ex.get('groups'),
                description: ex.get('description'),
                task: ex.get('task'),
                avatar: ex.get('imageUrl'),
                imageUrl: ex.get('imageUrl')
            };
            callback(ex);
        });
    },

    getUpdateParseExercise: function(ex, teacherId, name, description, avatar, task, access, groups){
        ex = ParseMixin.safeSet(ex, [
            {name: 'name', value: name},
            {name: 'description', value: description},
            {name: 'imageUrl', value: avatar},
            {name: 'task', value: task},
            {name: 'access', value: access},
            {name: 'groups', value: groups},
            {name: 'teacherId', value: teacherId},
            {name: 'creatorId', value: teacherId}
        ]);
        return ex;
    },

    transformParseExerciseToNormalOne: function(parseEx){
        return {
            name: parseEx.get('name'),
            id: parseEx.id,
            groups: (parseEx.get('groups') == undefined) ? [] : parseEx.get('groups'),
            exerciseId: parseEx.id,
            description: parseEx.get('description'),
            task: parseEx.get('task'),
            avatar: parseEx.get('imageUrl'),
            imageUrl: parseEx.get('imageUrl')
        }
    },

    updateExercise: function(exerciseId, teacherId, name, description, avatar, task, access, groups, callback){
        console.log('ExerciseMixin: updateExercise occured: exerciseId, teacherId, name, description, avatar, task, access, groups =', exerciseId, teacherId, name, description, avatar, task, access, groups);
        var Exercise = Parse.Object.extend('Exercise');
        var self = this;
        if (exerciseId == undefined){
            var ex = new Exercise();
            ex = self.getUpdateParseExercise(ex, teacherId, name, description, avatar, task, access, groups);
            ex.save().then(function(uex){
                console.log('ExerciseMixin: new exercise created: uex = ', uex);
                callback(self.transformParseExerciseToNormalOne(uex));
            });
            return;
        }

        var q = new Parse.Query('Exercise');

        console.log('ExerciseMixin: updateExercise: updating existing exercise: exerciseId = ' + exerciseId);

        q.get(exerciseId, {
            success:function(ex){
                ex = self.getUpdateParseExercise(ex, teacherId, name, description, avatar, task, access, groups);
                ex.save().then(function(uex){
                    console.log('ExerciseMixin: updateExercise: exercise updated: ', uex);
                    callback(self.transformParseExerciseToNormalOne(uex));
                });
            }
        });
    },

    loadExercise: function(exerciseId, callback){
        console.log('loadExercise: exerciseId = ', exerciseId);
        var res = {};
        var self = this;
        this.loadExerciseById(exerciseId, function(ex){
            res.exercise = {
                name: ex.get('name'),
                id: ex.id,
                groups: (ex.get('groups') == undefined) ? [] : ex.get('groups'),
                exerciseId: ex.id,
                description: ex.get('description'),
                task: ex.get('task'),
                avatar: ex.get('imageUrl'),
                imageUrl: ex.get('imageUrl')
            };
            this.loadExerciseCards(exerciseId, function(list){
                var cards = [];
                for (var i in list){
                    var item = list[i];
                    var card = {
                        materials: self.getCorrectlyTransformedMaterialsForRendering(item.get('materials')),
                        comment: item.get('comment'),
                        transcript: item.get('transcript'),
                        correctAnswer: item.get('correctAnswer'),
                        hint: item.get('hint'),
                        number: item.get('number'),
                        cardId: item.id,
                        id: item.id,
                        answerType: (item.get('answerType') == undefined) ? ex.get('exerciseType') : item.get('answerType')
                    };
                    //console.log('one of loaded cards: ', card);
                    cards.push(card);
                }
                res.cards = cards;
                callback(res);
            }.bind(this));
        }.bind(this));
    },

    loadUserExerciseAnswer: function(userId, exerciseId, callback){
        if (userId == undefined || exerciseId == undefined){
            callback(undefined);
            return;
        }
        this.loadUserExerciseScore(userId, exerciseId, function(score){
            this.loadUserAnswers(userId, exerciseId, function(answers){
                callback({
                    score: score,
                    answers: answers
                });
            })
        }.bind(this));
    },

    loadUserAnswers: function(userId, exerciseId, callback){
        var q = new Parse.Query('UserAnswer');
        q.equalTo('userId', userId);
        q.equalTo('exerciseId', exerciseId);
        q.limit(1000);
        q.find(function(list){
            var arr = [];
            for (var i in list){
                var a = list[i];
                arr.push({
                    cardId: a.get('cardId'),
                    text: a.get('answerText'),
                    url: a.get('answerUrl'),
                    status: a.get('status')
                });
            }
            callback(arr);
        }.bind(this));
    },

    loadUserExerciseScore: function(userId, exerciseId, callback){
        var UserExerciseScore = Parse.Object.extend('UserExerciseScore');
        var q = new Parse.Query(UserExerciseScore);
        q.equalTo('userId', userId);
        q.equalTo('exerciseId', exerciseId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                var score = new UserExerciseScore();
                score.set('userId', userId);
                score.set('exerciseId', exerciseId);
                score.set('status', 'new');
                score.save().then(function(sc){
                    callback({
                        scoreId: sc.id,
                        teacherFeedback: sc.get('teacherFeedback'),
                        status: sc.get('status'),
                        userId: userId,
                        exerciseId: exerciseId
                    });
                });
            }else{
                var sco = results[0];
                callback({
                    scoreId: sco.id,
                    teacherFeedback: sco.get('teacherFeedback'),
                    status: sco.get('status'),
                    userId: userId,
                    exerciseId: exerciseId
                });
            }
        }.bind(this));
    },

    saveUserAnswer: function(cardId, userId, exerciseId, type, answ, callback){
        console.log('saving user answer: cardId, userId, exerciseId, type, answ =  ', cardId, userId, exerciseId, type, answ);
        var UserAnswer = Parse.Object.extend('UserAnswer');
        var q = new Parse.Query(UserAnswer);
        q.equalTo('cardId', cardId);
        q.equalTo('userId', userId);
        q.find(function(results){
            var answer = (results == undefined || results.length == 0) ? undefined : results[0];
            if (answer == undefined){
                answer = new UserAnswer();
                answer.set('cardId', cardId);
                answer.set('userId', userId);
                answer.set('exerciseId', exerciseId);
                if (type == 'url'){
                    answer.set('answerUrl', answ);
                }
                if (type == 'text'){
                    answer.set('answerText', answ);
                }
                answer.save().then(function(ans){
                    console.log('saved: ', ans);
                    callback({
                        cardId: ans.get('cardId'),
                        text: ans.get('answerText'),
                        url: ans.get('answerUrl'),
                        status: ans.get('status')
                    });
                });
            }else{
                if (type == 'url'){
                    answer.set('answerUrl', answ);
                }
                if (type == 'text'){
                    answer.set('answerText', answ);
                }
                answer.save().then(function(ans){
                    console.log('saved: ', ans);
                    callback({
                        cardId: ans.get('cardId'),
                        text: ans.get('answerText'),
                        url: ans.get('answerUrl'),
                        status: ans.get('status')
                    });
                });
            }
        }.bind(this));
    },

    finishExercise: function(userId, exerciseId, callback){
        if (exerciseId == undefined || userId == undefined){
            callback();
            return;
        }
        var q = new Parse.Query('UserExerciseScore');
        q.equalTo('userId', userId);
        q.equalTo('exerciseId', exerciseId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback();
                return;
            }
            var score = results[0];
            score.set('status', 'finished');
            score.save().then(function(sc){
                callback({
                    scoreId: sc.id,
                    teacherFeedback: sc.get('teacherFeedback'),
                    status: sc.get('status'),
                    userId: userId,
                    exerciseId: exerciseId
                });
            });
        });
    },

    loadAllExercises: function(callback){
        var q = new Parse.Query('Exercise');
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            callback(results);
        });
    },

    loadAllTeacherExercises: function(teacherId, callback){
        console.log('loadAllTeacherExercises: teacherId = ', teacherId);
        var q = new Parse.Query('Exercise');
        q.equalTo('creatorId', teacherId);
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            var list = results.map(function(ex){
                return {
                    name: ex.get('name'),
                    description: ex.get('description'),
                    access: ex.get('access'),
                    exerciseType: ex.get('type'),
                    warmUpVimeoId: ex.get('warmUpVimeoId'),
                    tags: ex.get('tags'),
                    task: ex.get('task'),
                    image: ex.get('imageUrl'),
                    avatar: ex.get('imageUrl'),
                    exerciseId: ex.id,
                    id: ex.id,
                    groups: (ex.get('groups') == undefined) ? [] : ex.get('groups')
                }
            });
            console.log('exercises loaded', list);
            callback(list);
        });
    },

    commentUserExercise: function(userId, exerciseId, feedback, callback){
        var q = new Parse.Query('UserExerciseScore');
        q.equalTo('userId', userId);
        q.equalTo('exerciseId', exerciseId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback();
                return;
            }
            var score = results[0];
            if (feedback == undefined){
                score.unset('teacherFeedback');
            }else{
                score.set('teacherFeedback', feedback);
            }
            score.save().then(function(sc){
                console.log('saved feedback!! -->>> sc = ', sc);
                callback({
                    scoreId: sc.id,
                    teacherFeedback: sc.get('teacherFeedback'),
                    status: sc.get('status'),
                    userId: userId,
                    exerciseId: exerciseId
                });
            });
        });
    },

    loadAllUserExercisesScores: function(userId, callback){
        var q = new Parse.Query('UserExerciseScore');
        q.equalTo('userId', userId);
        q.doesNotExist('dialogId');
        q.addDescending('updatedAt');
        q.find(function(scores){
            if (scores == undefined || scores.length == 0){
                callback([]);
                return;
            }
            var scoresList = scores.map(function(sc){
                return {
                    id: sc.id,
                    scoreId: sc.id,
                    userId: userId,
                    teacherFeedback: sc.get('teacherFeedback'),
                    status: sc.get('status'),
                    exerciseId: sc.get('exerciseId')
                }
            });
            callback(scoresList);
        });
    },

    getTransformedMaterials: function(materials){
        var arr = [];
        if (materials == undefined){
            return [];
        }
        for (var i in materials){
            var m = materials[i];
            var t = m.materialType;
            var r = {};
            switch (t){
                case 'video':
                    r.type = 'video';
                    r.vimeoId = m.vimeoId;
                    break;
                case 'text':
                    r.type = 'text';
                    r.text = m.text;
                    break;
                case 'image':
                    r.type = 'image';
                    r.url = m.imageUrl;
                    break;
                case 'audio':
                    r.type = 'audio';
                    r.url = m.audioUrl;
                    break;
            }
            arr.push(r);
        }
        return arr;
    },


    createExercisesGroup: function(creatorId, name, description, avatar, tags, callback, errorCallback){
        var ExercisesGroup = Parse.Object.extend('ExercisesGroup');
        var g = new ExercisesGroup();

        g = ParseMixin.safeSet(g, [
            {name: 'creatorId', value: creatorId},
            {name: 'name', value: name},
            {name: 'description', value: description},
            {name: 'tags', value: tags},
            {name: 'avatar', value: avatar}
        ]);

        //g.set('creatorId', creatorId);
        //g.set('name', name);
        //g.set('description', description);
        //g.set('avatar', avatar);
        //g.set('tags', tags);

        g.save(null, {
            success: function(group){
                callback({
                    id: group.id,
                    groupId: group.id,
                    name: group.get('name'),
                    avatar: group.get('avatar'),
                    tags: group.get('tags')
                });
            },
            error: function(group, error){
                if (errorCallback != undefined){
                    errorCallback(error);
                }
            }
        });
    },

    updateExerciseGroup: function(groupId, teacherId, name, description, avatar, tags, callback, errorCallback){
        console.log('updateExerciseGroup occured: groupId = ', groupId);
        var ExerciseGroup = Parse.Object.extend('ExercisesGroup');
        var q = new Parse.Query('ExercisesGroup');

        if (groupId == undefined){
            console.log('creating new group');
            var gr = new ExerciseGroup();
            gr = ParseMixin.safeSet(gr, [
                {name: 'name', value: name},
                {name: 'description', value: description},
                {name: 'tags', value: tags},
                {name: 'avatar', value: avatar},
                {name: 'creatorId', value: teacherId}
            ]);
            gr.save().then(function(group){
                console.log('--->>> group saved! --->> ', group);
                callback({
                    id: group.id,
                    groupId: group.id,
                    description: group.get('description'),
                    name: group.get('name'),
                    avatar: group.get('avatar'),
                    tags: group.get('tags'),
                    teacherId: group.get('creatorId'),
                    creatorId: group.get('creatorId')
                });
            });
            return;
        }

        q.get(groupId, {
            success: function(g){
                g = ParseMixin.safeSet(g, [
                    {name: 'name', value: name},
                    {name: 'description', value: description},
                    {name: 'tags', value: tags},
                    {name: 'avatar', value: avatar}
                ]);

                g.save().then(function(group){
                    console.log('group updated: ', group);
                    callback({
                        id: group.id,
                        groupId: group.id,
                        description: group.get('description'),
                        name: group.get('name'),
                        avatar: group.get('avatar'),
                        tags: group.get('tags')
                    });
                });
            }
        });
    },

    loadExercisesFromGroup: function(groupId, callback){
        var q = new Parse.Query('Exercise');
        q.limit(1000);
        q.contains('groups', groupId);
        q.addDescending('createdAt');
        q.find(function(results){
            var list = results.map(function(ex){
                return {
                    name: ex.get('name'),
                    description: ex.get('description'),
                    access: ex.get('access'),
                    exerciseType: ex.get('type'),
                    warmUpVimeoId: ex.get('warmUpVimeoId'),
                    tags: ex.get('tags'),
                    task: ex.get('task'),
                    image: ex.get('imageUrl'),
                    avatar: ex.get('imageUrl'),
                    exerciseId: ex.id,
                    id: ex.id,
                    groups: (ex.get('groups') == undefined) ? [] : ex.get('groups')
                }
            });
            console.log('exercises loaded', list);
            callback(list);
        });
    },

    loadTeacherExercisesGroups: function(teacherId, callback){
        console.log('loadTeacherExercisesGroups occured: teacherId = ' + teacherId);
        var q = new Parse.Query('ExercisesGroup');
        q.equalTo('creatorId', teacherId);
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            var list = results.map(function(g){
                return {
                    id: g.id,
                    groupId: g.id,
                    name: g.get('name'),
                    description: g.get('description'),
                    avatar: g.get('avatar'),
                    tags: g.get('tags')
                }
            });
            callback(list);
        });
    },

    getExercisesFromGroup: function(exercises, groupId){
        var arr = [];
        for (var i in exercises){
            var ex = exercises[i];
            var groups = (ex.groups == undefined) ? [] : ex.groups;
            if ((groupId == undefined && groups.length == 0 ) || groups.indexOf(groupId) > -1){
                arr.push(ex);
            }
        }
        return arr;
    },

    getGroupsWithExercises: function(groups, exercises){
        var arr = [];
        groups.push(undefined);
        for (var i in groups){
            var g = groups[i];
            var groupId = (g == undefined) ? undefined : g.id;
            arr.push({
                group: g,
                exercises: this.getExercisesFromGroup(exercises, groupId)
            });
        }
        return arr;
    },

    loadGroupsWithExercises: function(teacherId, callback){
        var self = this;
        this.loadTeacherExercisesGroups(teacherId, function(groups){
            console.log('teacher p groups', groups);
            this.loadAllTeacherExercises(teacherId, function(exercises){
                var arr = self.getGroupsWithExercises(groups, exercises);
                callback(arr);
            })
        }.bind(this));
    },


    // migration

    createNotSavedGroupByCategory: function(cat){
        var ExercisesGroup = Parse.Object.extend('ExercisesGroup');
        var g = new ExercisesGroup();
        g.set('name', cat.name);
        g.set('description', cat.description);
        g.set('avatar', cat.avatar);
        g.set('tags', []);
        g.set('tag', cat.tag);
        return g;
    },

    migrateGroups: function(){
        var q = new Parse.Query('ExercisesGroup');
        var self = this;
        q.find(function(results){
            var groups = results.map(function(r){
                return {
                    tag: r.get('tag'),
                    name: r.get('name'),
                    description: r.get('description'),
                    avatar: r.get('avatar'),
                    id: r.id,
                    groupId: r.id
                }
            });



            var q = new Parse.Query('Exercise');
            q.limit(1000);
            q.find(function(exercises){
                var modifExercises = [];
                for (var i in exercises){
                    var ex = exercises[i];
                    var tags = (ex.get('tags') == undefined) ? [] : ex.get('tags');
                    var exGroups = [];
                    for (var j in groups){
                        var gr  = groups[j];
                        if (tags.indexOf(gr.tag) > -1){
                            //console.log('--->> EXERCISE ', ex,  ' is in group ', gr);
                            exGroups.push(gr.id);
                        }
                    }
                    ex.set('groups', exGroups);
                    modifExercises.push(ex);
                }
                //Parse.Object.saveAll(modifExercises);

            });
        });
    },

    /// bad(((
    getCorrectlyTransformedMaterialsForSaving: function(materials){
        //console.log('getCorrectlyTransformedMaterialsForSaving: materials = ', materials);
        var arr = [];
        for (var i in materials){
            var m = materials[i];
            if (m.type == 'audio' || m.materialType == 'audio'){
                var audioUrl = (m.url == undefined) ? m.audioUrl : m.url;
                if (audioUrl == undefined){
                    continue;
                }
                arr.push({materialType: 'audio', audioUrl: audioUrl  });
                continue;
            }
            if (m.type == 'image' || m.materialType == 'image'){
                var imageUrl = (m.url == undefined) ? m.imageUrl : m.url;
                if (imageUrl == undefined){
                    continue;
                }
                arr.push({materialType: 'image', imageUrl: imageUrl });
                continue;
            }
            if (m.type == 'text' || m.materialType == 'text'){
                arr.push({materialType: 'text', text: m.text});
            }
            if (m.type == 'video' || m.materialType == 'video'){
                arr.push({materialType: 'video', vimeoId: m.vimeoId});
            }
            //m.materialType = (m.type == undefined) ? m.materialType : m.type;
            //arr.push(m);

        }
        return arr;
    },

    getCorrectlyTransformedMaterialsForRendering: function(materials){
        //console.log('getCorrectlyTransformedMaterialsForRendering occured: materials = ', materials);
        var arr = [];
        for (var i in materials){
            var m = materials[i];
            if (m.materialType == 'audio'){
                arr.push({type: 'audio', materialType: 'audio', audioUrl: m.audioUrl, url: (m.url == undefined) ? m.audioUrl : m.url  });
                continue;
            }
            if (m.materialType == 'image'){
                arr.push({type: 'image', materialType: 'image', imageUrl: m.imageUrl, url: (m.url == undefined) ? m.imageUrl : m.url  });
                continue;
            }
            m.type = m.materialType;
            arr.push(m);
        }
        //console.log('transformed = ', arr);
        return arr;
    },

    getCardByParseCard: function(c){
        return {
            id: c.id,
            cardId: c.id,
            number: c.get('number'),
            exerciseId: c.get('exerciseId'),
            comment: c.get('comment'),
            hint: c.get('hint'),
            correctAnswer: c.get('correctAnswer'),
            transcript: c.get('transcript'),
            materials: this.getCorrectlyTransformedMaterialsForRendering(c.get('materials')),
            answerType: c.get('answerType')
        }
    },

    /*
     * materials: video
     *
     * video - videoId, audio - audioUrl, image - imageUrl, text - text
     *
    */
    updateCard: function(exerciseId, number, materials, comment, hint, transcript, answerType,
                         correctAnswer,
                         callback){

        console.log('ExerciseMixin: updateCard occured: materials = ', materials);
        console.log('updateCard occured: ', exerciseId, number, materials, comment, hint, transcript, answerType,
            correctAnswer
        );

        if (exerciseId == undefined || number == undefined){
            return;
        }
        var materials = this.getCorrectlyTransformedMaterialsForSaving(materials);
        var ExerciseCard = Parse.Object.extend('ExerciseCard');
        var q = new Parse.Query(ExerciseCard);
        q.equalTo('exerciseId', exerciseId);
        q.equalTo('number', number);
        var self = this;
        q.find(function(results){
            if (results == undefined || results.length == 0){
                var card = new ExerciseCard();
                card.save({
                    exerciseId: exerciseId,
                    number: number,
                    comment: comment,
                    transcript: transcript,
                    hint: hint,
                    answerType: answerType,
                    correctAnswer: correctAnswer,
                    materials: materials
                }, {
                    success: function(savedCard){
                        callback(self.getCardByParseCard(savedCard));
                    }

                });
            }else{
                var c = results[0];

                c = ParseMixin.safeSet(c, [
                    {name: 'exerciseId', value: exerciseId},
                    {name: 'number', value: number},
                    {name: 'comment', value: comment},
                    {name: 'transcript', value: transcript},
                    {name: 'correctAnswer', value: correctAnswer},
                    {name: 'answerType', value: answerType},
                    {name: 'materials', value: self.getCorrectlyTransformedMaterialsForSaving(materials)}
                ]);


                c.save().then(function(sCard){
                    callback(self.getCardByParseCard(sCard));
                });
            }
        });
    },

    deleteCard: function(cardId, callback){
        console.log('deleteCard occured: cardId = ' + cardId);
        var q = new Parse.Query('ExerciseCard');
        q.get(cardId, {
            success: function(card){
                card.destroy({
                    success: function(){
                        callback();
                    },
                    error: function(){
                        callback();
                    }
                });
            },
            error: function(){
                callback();
            }
        });
    },

    deleteExercise: function(exerciseId, callback){
        if (exerciseId == undefined){
            callback();
            return;
        }
        var q = new Parse.Query('Exercise');
        q.get(exerciseId, {
            success: function(ex){
                if (confirm('Вы действительно хотите удалить упражнение? ') == false){
                    callback();
                    return;
                }
                ex.destroy({
                    success: function(){
                        callback();
                    }
                });
            },
            error: function(){
                callback();
            }
        });
    },

    deleteExerciseGroup: function(groupId, callback){
        console.log('deleting exercise group: groupId = ', groupId);
        if (groupId == undefined){
            callback();
            return;
        }
        var q = new Parse.Query('ExercisesGroup');
        q.get(groupId, {
            success: function(g){
                if (confirm('Вы действительно хотите удалить эту категорию? ') == false){
                    callback();
                    return;
                }
                g.destroy({
                    success: function(g){
                        callback();
                    }
                });
            }
        });
    },

    extractExercisesFromGroupsFactoryList: function(groupsFactoryList){
        var map = {};
        var arr = [];
        for (var i in groupsFactoryList){
            var gr = groupsFactoryList[i];
            var group = gr.group;
            var exercises = gr.exercises;
            for (var j in exercises){
                var ex = exercises[j];
                map[ex.id] = ex;
            }
        }
        for (var key in map){
            arr.push(map[key]);
        }
        return arr;
    },

    extractGroupsFromGroupsFactoryList: function(groupsFactoryList){
        if (groupsFactoryList == undefined ){
            return undefined;
        }
        return groupsFactoryList.map(function(gr){
            return gr.group;
        });
    },

    isExerciseInGroup: function(groupId, exercise){
        var groups = exercise.groups;
        if ((groups == undefined || groups.length == 0) && (groupId == undefined)){
            return true;
        }

        for (var i in groups){
            if (groupId == groups[i]){
                return true;
            }
        }
        return false;
    },

    makeGroupsFactoryList: function(groups, exercises){
        var arr = [];
        var self = this;
        for (var i in groups){
            var g = groups[i];
            var gId = (g == undefined) ? undefined : g.id;
            var exList = [];
            for (var j in exercises){
                var ex = exercises[j];
                if (self.isExerciseInGroup(gId, ex)){
                    exList.push(ex);
                }
            }
            arr.push({
                group: g,
                exercises: exList
            });
        }
        return arr;
    },

    isExerciseInSearch: function(ex, text){
        if (text == undefined || text.trim() == ''){
            return true;
        }
        var name = (ex.name == undefined) ? '' : (ex.name.toLowerCase());
        var description = (ex.description == undefined) ? '' : (ex.description.toLowerCase());
        var task = (ex.task == undefined) ? '' : (ex.task.toLowerCase());

        return ((name.indexOf(text) > -1) || (description.indexOf(text) > -1) || (task.indexOf(text) > -1));

    },

    searchInGroupsFactoryList: function(groupsFactoryList, text){
        console.log('searchInGroupsFactoryList occured');
        if (text == undefined || text.trim() == ''){
            return groupsFactoryList;
        }
        var groups = this.extractGroupsFromGroupsFactoryList(groupsFactoryList);
        var exercises = this.extractExercisesFromGroupsFactoryList(groupsFactoryList);
        var sExercises = [];
        for (var i in exercises){
            var ex = exercises[i];
            if (this.isExerciseInSearch(ex, text) == true){
                sExercises.push(ex);
            }
        }
        console.log('found exercises: ', sExercises);
        return this.makeGroupsFactoryList(groups, sExercises);
    }


}

module.exports = ExerciseMixin;