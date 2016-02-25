/**
 * Created by sabir on 21.12.15.
 */

var assign = require('object-assign');
var Parse = require('parse').Parse;
var FeedMixin = require('./FeedMixin');
var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../react/mixins/commonMixins/CommonMixin');
var UserMixin = require('./UserMixin');
var ExerciseMixin = require('./ExerciseMixin');
var LoginMixin = require('./LoginMixin');

var MixpanelHelper = require('../helpers/analytics/MixpanelHelper');


var QuestionnaireMixin = {

    transformQuestionnaire: function(q){
        return {
            id: q.id,
            questionnaireId: q.id,
            creatorId: q.get('creatorId'),
            name: q.get('name'),
            task: q.get('task'),
            description: q.get('description'),
            avatar: q.get('avatar')
        }
    },

    transformQuestionnaireQuestion: function(question){
        return {
            questionnaireId: question.get('questionnaireId'),
            id: question.id,
            questionId: question.id,
            questionnaireQuestionId: question.id,
            number: question.get('number'),
            name: question.get('name'),
            question: question.get('question'),
            ruQuestion: question.get('ruQuestion'),
            answers: (question.get('answers') == undefined) ? [] : question.get('answers'),
            vimeoId: question.get('vimeoId')
        }
    },

    transformAnswer: function(a){
        return {
            id: a.id,
            answerId: a.id,
            audioUrl: a.get('audioUrl'),
            questionId: a.get('questionId'),
            variant: a.get('variant')
        }
    },

    transformScore: function(sc){
        return {
            scoreId: sc.id,
            id: sc.id,
            userId: sc.get('userId'),
            teacherFeedback: sc.get('teacherFeedback'),
            feedback: sc.get('teacherFeedback'),
            status: sc.get('status'),
            questionnaireId: sc.get('questionnaireId')
        }
    },

    loadQuestionnaireById: function(id, callback){
        if (id == undefined){
            callback();
            return;
        }
        var q = new Parse.Query('Questionnaire');
        q.get(id, function(res){
            callback(res);
        });
    },

    loadQuestionnaire: function(id, callback){
        console.log('loadQuestionnaire: id = ', id);
        var self = this;
        this.loadQuestionnaireById(id, function(q){
            var res = self.transformQuestionnaire(q);
            callback(res);
        });
    },

    loadTeacherQuestionnaires: function(teacherId, callback){
        var q = new Parse.Query('Questionnaire');
        var self = this;
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            var arr = results.map(function(r){return self.transformQuestionnaire(r)});
            callback(arr);
        });
    },

    loadTeacherQuestionnairesCount: function(teacherId, callback){
        var q = new Parse.Query('Questionnaire');
        var self = this;
        q.count({
            success: function(n){
                callback(n);
            }
        });
    },

    createQuestionnaire: function(teacherId, name, description, avatar, task, callback){
        if (teacherId == undefined){
            return;
        }
        var self = this;
        var Questionnaire = Parse.Object.extend('Questionnaire');
        var q = new Questionnaire();
        q.set('creatorId', teacherId);
        q = ParseMixin.safeSet(q, [
            {name: 'name', value: name},
            {name: 'description', value: description},
            {name: 'task', value: task},
            {name: 'avatar', value: avatar}
        ]);
        q.save().then(function(updatedQuestionnaire){
            var tu = self.transformQuestionnaire(updatedQuestionnaire);
            MixpanelHelper.track('createQuestionnaire', tu);
            callback(tu);
        });
    },

    updateQuestionnaire: function(questionnaireId, name, description, avatar, task, callback){
        var self = this;
        this.loadQuestionnaireById(questionnaireId, function(q){
            q = ParseMixin.safeSet(q, [
                {name: 'name', value: name},
                {name: 'description', value: description},
                {name: 'task', value: task},
                {name: 'avatar', value: avatar}
            ]);
            q.save().then(function(uQ){
                callback(self.transformQuestionnaire(uQ));
            });
        });
    },

    deleteQuestionnaire: function(questionnaireId, callback){
        if (questionnaireId == undefined){
            return;
        }
        this.loadQuestionnaireById(questionnaireId, function(q){
            q.destroy({
                success: function(){
                    callback();
                }
            });
        })
    },

    loadQuestionnaireQuestions: function(questionnaireId, callback){
        var q = new Parse.Query('QuestionnaireQuestion');
        q.limit(1000);
        q.addAscending('number');
        q.equalTo('questionnaireId', questionnaireId);
        var self = this;
        q.find(function(results){
            var arr = results.map(function(qu){return self.transformQuestionnaireQuestion(qu)});
            callback(arr);
        });
    },

    loadQuestionnaireQuestionById: function(id, callback){
        var q = new Parse.Query('QuestionnaireQuestion');
        var self = this;
        q.get(id, function(question){
            callback(question);
        });
    },

    loadQuestionnaireQuestion: function(questionId, callback){
        var self = this;
        this.loadQuestionnaireQuestionById(questionId, function(question){
            callback(self.transformQuestionnaireQuestion(question));
        });
    },

    //returns Parse Object
    createQuestionnaireQuestion: function(questionnaireId, number, callback){
        var QuestionnaireQuestion = Parse.Object.extend('QuestionnaireQuestion');
        var q = new QuestionnaireQuestion();
        q.set('questionnaireId', questionnaireId);
        q.set('number', number);
        q.save().then(function(question){
            callback(question);
        });
    },

    loadQuestionByQuestionnaireIdAndNumber: function(questionnaireId, number, callback){
        var q = new Parse.Query('QuestionnaireQuestion');
        var self = this;
        q.equalTo('questionnaireId', questionnaireId);
        q.equalTo('number', number);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                self.createQuestionnaireQuestion(questionnaireId, number, function(qu){
                    callback(qu);
                });
            }else {
                var qu = results[0];
                callback(qu);
            }
        });
    },

    loadTransformedQuestionByQuestionnaireIdAndNumber: function(questionnaireId, number, callback){
        var self = this;
        this.loadQuestionByQuestionnaireIdAndNumber(questionnaireId, number, function(q){
            callback(self.transformQuestionnaireQuestion(q));
        });
    },

    updateQuestionnaireQuestion: function(questionnaireId, number, name, vimeoId, question, ruQuestion, answers, callback){
        var self = this;
        this.loadQuestionByQuestionnaireIdAndNumber(questionnaireId, number, function(que){
            que = ParseMixin.safeSet(que, [
                {name: 'question', value: question},
                {name: 'ruQuestion', value: ruQuestion},
                {name: 'vimeoId', value: vimeoId},
                {name: 'name', value: name},
                {name: 'answers', value: answers}
            ]);
            que.save().then(function(updatedQuestion){
                callback(self.transformQuestionnaireQuestion(updatedQuestion));
            });
        });
    },

    deleteQuestionnaireQuestion: function(questionnaireQuestionId, callback){
        this.loadQuestionnaireQuestionById(questionnaireQuestionId, function(qq){
            qq.destroy({
                success: function(){
                    callback();
                }
            });
        })
    },

    loadUserQuestionnaireAnswersMap: function(userId, questions, callback){
        console.log('loadUserQuestionnaireAnswersMap occured: userId, questions', userId, questions);

        if (userId == undefined || questions == undefined || questions.length == 0){
            callback({});
            return;
        }

        var ids = questions.map(function(q){return q.id});
        var q = new Parse.Query('UserQuestionnaireAnswer');
        q.limit(1000);
        var self = this;
        q.equalTo('userId', userId);
        q.containedIn('questionId', ids);
        q.find(function(results){
            if (results == undefined){
                callback([]);
            }
            var arr = results.map(function(a){
                return self.transformAnswer(a);
            });
            var map = {};
            for (var i in arr){
                map[arr[i].questionId] = arr[i];
            }
            callback(map);
        });
    },

    loadUserAnswer: function(userId, questionId, callback){
        var UserQuestionnaireAnswer = Parse.Object.extend('UserQuestionnaireAnswer');
        var q = new Parse.Query(UserQuestionnaireAnswer);
        q.equalTo('userId', userId);
        q.equalTo('questionId', questionId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                var a = new UserQuestionnaireAnswer();
                a.set('userId', userId);
                a.set('questionId', questionId);
                a.save().then(function(savedA){
                    callback(savedA);
                });
            }else{
                callback(results[0]);
            }
        });
    },

    loadTransformedUserAnswer: function(userId, questionId, callback){
        var self = this;
        if (userId == undefined || questionId == undefined){
            return;
        }
        var q = new Parse.Query('UserQuestionnaireAnswer');
        q.equalTo('userId', userId);
        q.equalTo('questionId', questionId);
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
            }else{
                callback(self.transformAnswer(results[0]));
            }
        });
    },

    saveUserAnswer: function(userId, questionId, variant, audioUrl, callback){
        if (variant != undefined){
            variant = +variant;
        }
        console.log('saveUserAnswer occured: userId, questionId, variant, audioUrl = ', userId, questionId, variant, audioUrl);
        var self = this;
        this.loadUserAnswer(userId, questionId, function(a){
            a = ParseMixin.safeSet(a, [
                {name: 'variant', value: variant},
                {name: 'audioUrl', value: audioUrl}
            ]);
            a.save().then(function(savedA){
                callback(self.transformAnswer(savedA));
            });
        });
    },

    loadLazyUserQuestionnaireScore: function(userId, questionnaireId, callback){
        var UserExerciseScore = Parse.Object.extend('UserExerciseScore');
        var q = new Parse.Query('UserExerciseScore');
        q.equalTo('userId', userId);
        q.equalTo('questionnaireId', questionnaireId);
        q.find(function(results){
            var score = undefined;
            if (results == undefined || results.length == 0){
                score = new UserExerciseScore();
                score.set('userId', userId);
                score.set('status', 'new');
                score.set('questionnaireId', questionnaireId)
                score.save().then(function(sc){
                    callback(sc);
                });
            }else{
                score = results[0];
                callback(score);
            }
        });
    },

    onFinishQuestionnaire: function(userId, questionnaireId, callback){
        if (userId == undefined || questionnaireId == undefined){
            return;
        }
        var self = this;
        this.loadLazyUserQuestionnaireScore(userId, questionnaireId, function(sc){
            sc.set('status', 'finished');
            sc.save().then(function(sco){
                callback(self.transformScore(sco));
            });
        })
    },

    loadUserQuestionnaireScore: function(userId, questionnaireId, callback){
        console.log('loadUserQuestionnaireScore: userId, questionnaireId = ', userId, questionnaireId);
        this.loadLazyUserQuestionnaireScore(userId, questionnaireId, function(sc){
            callback(this.transformScore(sc));
        }.bind(this));
    },


    commentUserQuestionnaire: function(userId, questionnaireId, feedback, callback){
        console.log('commentUserQuestionnaire occured: userId, questionnaireId, feedback = ', userId, questionnaireId, feedback);
        if (userId == undefined || questionnaireId == undefined){
            return;
        }
        var self = this;
        this.loadLazyUserQuestionnaireScore(userId, questionnaireId, function(score){
            if (feedback == undefined){
                score.unset('teacherFeedback');
            }else{
                score.set('teacherFeedback', feedback);
            }
            score.save().then(function(sc) {
                console.log('saved feedback!! -->>> sc = ', sc);
                callback(self.transformScore(sc));
            });
        });
    }


};

module.exports = QuestionnaireMixin;