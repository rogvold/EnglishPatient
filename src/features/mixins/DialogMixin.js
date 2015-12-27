/**
 * Created by sabir on 18.12.15.
 */


var assign = require('object-assign');
var Parse = require('parse').Parse;
var FeedMixin = require('./FeedMixin');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../react/mixins/commonMixins/CommonMixin');
var UserMixin = require('./UserMixin');
var ExerciseMixin = require('./ExerciseMixin');
var LoginMixin = require('./LoginMixin');


var DialogMixin = {

    transformDialog: function(d){
        return {
            name: d.get('name'),
            description: d.get('description'),
            task: d.get('task'),
            firstRoleName: d.get('firstRoleName'),
            secondRoleName: d.get('secondRoleName'),
            firstRoleImg: d.get('firstRoleImg'),
            secondRoleImg: d.get('secondRoleImg'),
            timestamp: (new Date(d.createdAt)).getTime(),
            avatar: d.get('avatar'),
            vimeoId: d.get('vimeoId'),
            creatorId: d.get('creatorId'),
            id: d.id,
            dialogId: d.id
        }
    },

    transformCard: function(c){
        var materials = c.get('materials');
        var audioUrl = undefined;
        var text = undefined;
        for (var i in materials){
            var m = materials[i];
            if (m.materialType == 'text'){
                text = m.text;
            }
            if (m.materialType == 'audio'){
                audioUrl = m.audioUrl;
            }
        }
        if (text == undefined){
            text = c.get('transcript')
        }

        return {
            dialogId: c.get('dialogId'),
            cardId: c.id,
            id: c.id,
            number: c.get('number'),
            text: text,
            audioUrl: audioUrl
        }
    },

    loadDialogById: function(dialogId, callback){
        var q = new Parse.Query('PatientDialog');
        q.get(dialogId, {
            success: function(d){
                callback(d);
            }
        })
    },


    loadDialogCards: function(dialogId, callback){
        var q = new Parse.Query('ExerciseCard');
        q.equalTo('dialogId', dialogId);
        q.notEqualTo('status', 'deleted');
        q.limit(1000);
        q.addAscending('number');
        var self = this;
        q.find(function(results){
            var arr = results.map(function(c){
                return self.transformCard(c);
            });
            callback(arr);
        });
    },


    loadDialog: function(dialogId, callback){
        var self = this;
        this.loadDialogById(dialogId, function(d){
            var dialog = self.transformDialog(d);
            self.loadDialogCards(dialogId, function(cards){
                dialog.cards = cards;
                callback(dialog);
            });
        });
    },

    loadCardsListByIds: function(ids, callback){
        var q = new Parse.Query('ExerciseCard');
        q.containedIn('objectId', ids);
        q.find(function(results){
            callback(results);
        });
    },

    prepareNewCards: function(newCards, dialogId){
        console.log('prepareNewCards: newCards = ', newCards);
        var arr = [];
        var ExerciseCard = Parse.Object.extend('ExerciseCard');
        for (var i in newCards){
            var card = newCards[i];
            var c = new ExerciseCard();
            c.set('dialogId', dialogId);
            c.set('number', card.number);
            c.set('status', 'active');
            arr.push(c);
        }
        console.log('cards prepared: arr = ', arr);
        return arr;
    },

    loadCardsForSave: function(cards, dialogId, callback){
        console.log('loadCardsForSave: cards = ', cards);
        var ids = [];
        var newCards = [];
        for (var i in cards){
            if (cards[i].id != undefined){
                ids.push(cards[i].id);
            }else{
                newCards.push(cards[i]);
            }
        }
        newCards = this.prepareNewCards(newCards, dialogId); // Parse cards ready for saving
        this.loadCardsListByIds(ids, function(oldCards){
            var saveCards = oldCards.concat(newCards);
            saveCards.sort(function(c1, c2){return c1.get('number') - c2.get('number')});
            console.log('cards for saving = ', saveCards);
            callback(saveCards);
        });
    },

    getMaterialsByTransformedCard: function(card){
        if (card == undefined){
            return undefined;
        }
        var text = card.text;
        var audioUrl = card.audioUrl;
        var arr = [];
        if (text != undefined){
            arr.push({
                materialType: 'text',
                text: text
            });
        }
        if (audioUrl != undefined){
            arr.push({
                materialType: 'audio',
                audioUrl: audioUrl
            });
        }
        return arr;
    },

    destroyCardsNotContainedInIds: function(dialogId, ids, callback){
        var q = new Parse.Query('ExerciseCard');
        q.equalTo('dialogId', dialogId);
        q.notContainedIn('objectId', ids);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback();
                return;
            }
            var arr = [];
            for (var i in results){
                var re = results[i];
                re.set('status', 'deleted');
                arr.push(re);
            }
            Parse.Object.saveAll(results, {
                success: function(){
                    callback();
                }
            });
        });
    },

    saveCards: function(cards, dialogId, callback){
        console.log('DialogMixin: saveCards occured: ', cards, dialogId);
        var self = this;
        this.loadCardsForSave(cards, dialogId, function(cardsForSave){
            if (cards.length != cardsForSave.length){
                alert('cards.length != cardsForSave.length');
                return;
            }
            var arr = [];

            for (var i in cardsForSave){
                var c = cardsForSave[i];
                var iCard = cards[i];
                var materials = self.getMaterialsByTransformedCard(iCard);
                c = ParseMixin.safeSet(c, [{name: 'materials', value: materials}]);
                arr.push(c);
            }
            Parse.Object.saveAll(arr, {
                success: function(savedCards){
                    var arr = savedCards.map(function(sc){return self.transformCard(sc)});
                    var ids = arr.map(function(sc){return sc.id});
                    self.destroyCardsNotContainedInIds(dialogId, ids, function(){
                        self.loadDialogCards(dialogId, function(crds){
                            callback(crds);
                        });
                    });
                }
            });
        });
    },

    createDialog: function(callback){
        var user = LoginMixin.getCurrentUser();
        var userId = (user == undefined) ? undefined : user.id;
        var PatientDialog = Parse.Object.extend('PatientDialog');
        var dialog = new PatientDialog();
        dialog.set('creatorId', userId);
        console.log('createDialog: userId = ', userId);
        dialog.save().then(function(d){
            callback(d);
        });
    },

    loadDialogForUpdatingById: function(dialogId, callback){
        if (dialogId == undefined){
            this.createDialog(function(d){
                callback(d);
            });
            return;
        }
        this.loadDialogById(dialogId, function(d){
            callback(d);
        });
    },

    updateDialog: function(dialogId, data, callback){
        console.log('update dialog occured: dialogId, data = ', dialogId, data);
        var self = this;
        this.loadDialogForUpdatingById(dialogId, function(dialog){
            dialog = ParseMixin.safeSet(dialog, [
                {name: 'name', value: data.name},
                {name: 'task', value: data.task},
                {name: 'avatar', value: data.avatar},
                {name: 'firstRoleName', value: data.firstRoleName},
                {name: 'secondRoleName', value: data.secondRoleName},
                {name: 'firstRoleImg', value: data.firstRoleImg},
                {name: 'secondRoleImg', value: data.secondRoleImg},
                {name: 'description', value: data.description},
                {name: 'vimeoId', value: data.vimeoId}
            ]);
            dialog.save().then(function(savedDialog){
                var transformedDialog = self.transformDialog(savedDialog);
                var cards = data.cards;
                self.saveCards(cards, transformedDialog.id, function(iCards){
                    transformedDialog.cards = iCards;
                    callback(transformedDialog);
                });
            });
        });
    },

    getLirmakDefaultCard: function(){
        return {
            audioUrl: 'http://beta.englishpatient.org/audio/uploads/143658861207858649999.wav',
            text: 'Начинайте говорить.',
            img: 'http://disk.englishpatient.org/uploads/MPEHidviDBWBz81.jpg'
        }
    },

    getDialogPairedCards: function(cards, roleNumber, dialog){
        var arr = [];
        if (roleNumber == 0){
            cards = [this.getLirmakDefaultCard()].concat(cards);
        }
        if (cards.length % 2 == 1){
            cards.push({});
        }
        for (var i=0; i<cards.length - 1; i++){
            if (i % 2 == 1){
                continue;
            }
            arr.push({
                questionCard: assign({}, cards[i]),
                answerCard: assign({}, cards[i+1])
            });
        }
        return arr;
    },

    transformUserAnswer: function(a){
        return {
            id: a.id,
            cardId: a.get('cardId'),
            audioUrl: a.get('answerUrl'),
            answerUrl: a.get('answerUrl'),
            userId: a.get('userId')
        }
    },

    saveUserAnswer: function(cardId, answerUrl, callback){
        console.log('saveUserAnswer: cardId, answerUrl = ', cardId, answerUrl);
        if (cardId == undefined){
            return;
        }
        var self = this;
        var userId = LoginMixin.getCurrentUser().id;
        var UserAnswer = Parse.Object.extend('UserAnswer');
        var q = new Parse.Query('UserAnswer');
        q.equalTo('cardId', cardId);
        q.equalTo('userId', userId);
        q.find(function(results){
            var answer = undefined;
            if (results == undefined || results.length == 0){
                answer = new UserAnswer();
                answer.set('userId', userId);
                answer.set('cardId', cardId);
            }else{
                answer = results[0];
            }
            answer.set('answerUrl', answerUrl);
            answer.save().then(function(a){
                callback(self.transformUserAnswer(a));
            });
        });
    },

    loadAnswersMap: function(dialogId, userId, callback){
        //var userId = LoginMixin.getCurrentUser().id;
        console.log('loadAnswersMap: dialogId, userId = ', dialogId, userId);
        var self = this;
        var map = {};
        if (userId == undefined){
            callback({});
            return;
        }
        this.loadDialogCards(dialogId, function(cards){
            var ids = cards.map(function(c){return c.id});
            var q = new Parse.Query('UserAnswer');
            q.containedIn('cardId', ids);
            q.equalTo('userId', userId);
            q.find(function(answers){
                for (var i in answers){
                    var a = self.transformUserAnswer(answers[i]);
                    map[a.cardId] = a;
                }
                console.log('map loaded: ', map);
                callback(map);
            });
        });
    },

    loadTeacherDialogs: function(teacherId, callback){
        var q = new Parse.Query('PatientDialog');
        q.equalTo('creatorId', teacherId);
        q.limit(1000);
        var self = this;
        ParseMixin.loadAllDataFromParse(q, function(list){
            var arr = list.map(function(d){
                return self.transformDialog(d);
            });
            callback(arr);
        });
    },

    deleteDialog: function(dialogId, callback){
        var self = this;
        this.loadDialogById(dialogId, function(d){
            d.destroy({
                success: function(){
                    callback();
                }
            });
        });
    },

    loadUserDialogScore: function(userId, dialogId, callback){
        console.log('loadUserDialogScore: userId, dialogId = ', userId, dialogId);
        var UserExerciseScore = Parse.Object.extend('UserExerciseScore');
        var q = new Parse.Query(UserExerciseScore);
        q.equalTo('userId', userId);
        q.equalTo('dialogId', dialogId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                var score = new UserExerciseScore();
                score.set('userId', userId);
                score.set('dialogId', dialogId);
                score.set('status', 'new');
                score.save().then(function(sc){
                    console.log('new dialog score created: ', sc);
                    callback({
                        scoreId: sc.id,
                        teacherFeedback: sc.get('teacherFeedback'),
                        feedback: sc.get('teacherFeedback'),
                        status: sc.get('status'),
                        userId: userId,
                        dialogId: dialogId
                    });
                });
            }else{
                var sco = results[0];
                console.log('user score found: ', sco);
                callback({
                    scoreId: sco.id,
                    teacherFeedback: sco.get('teacherFeedback'),
                    feedback: sco.get('teacherFeedback'),
                    status: sco.get('status'),
                    userId: userId,
                    dialogId: dialogId
                });
            }
        }.bind(this));
    },

    commentUserDialog: function(userId, dialogId, feedback, callback){
        console.log('commentUserDialog occured: userId, dialogId, feedback = ', userId, dialogId, feedback);
        var q = new Parse.Query('UserExerciseScore');
        q.equalTo('userId', userId);
        q.equalTo('dialogId', dialogId);
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
                    feedback: sc.get('teacherFeedback'),
                    status: sc.get('status'),
                    userId: userId,
                    dialogId: dialogId
                });
            });
        });
    },

    finishDialog: function(userId, dialogId, callback){
        if (dialogId == undefined || userId == undefined){
            callback();
            return;
        }
        var q = new Parse.Query('UserExerciseScore');
        q.equalTo('userId', userId);
        q.equalTo('dialogId', dialogId);
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
                    feedback: sc.get('teacherFeedback'),
                    status: sc.get('status'),
                    userId: userId,
                    dialogId: dialogId
                });
            });
        });
    }



}

module.exports = DialogMixin;