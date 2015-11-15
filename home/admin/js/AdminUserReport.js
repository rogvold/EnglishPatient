/**
 * Created by sabir on 11.12.14.
 */

var AdminUserReport = function(){
    var self = this;
    this.userQuestionaryAnswers = [];
    this.user = undefined;
    this.questions = [];
    this.answers = [];
    this.exercises = [];
    this.userScores = [];
    this.userExerciseAnswers = [];
    this.exercisesCards = [];
    this.selectedExercise = undefined;

    this.init = function(){
        initParse();
        self.initVimeoLinks();
        self.initExerciseItem();
        self.initLeaveFeedbackButton();
        self.loadEverything(function(){
            self.prepareQuestionaryReport();
            self.drawExercises();
        });
    }

    this.loadEverything = function(callback){
        enablePreloader();
        self.loadCurrentUser(function(){
            self.loadQuestionsAndAnswers(function(){
                self.loadUserQuestions(function(){
                    self.loadUserScores(function(){
                        self.loadExercises(function(){
                            self.loadExercisesAnswers(function(){
                                self.loadExercisesCards(function(){
                                    disablePreloader();
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    this.loadExercisesCards = function(callback){
        enablePreloader();
        var ids = self.userScores.map(function(s){return s.get('exerciseId')});
        var q = new Parse.Query(Parse.Object.extend('ExerciseCard'));
        q.addAscending('exerciseId');
        q.addAscending('number');
        q.containedIn('exerciseId', ids);
        q.find(function(list){
            console.log('cards = ', list);
            self.exercisesCards = list;
            disablePreloader();
            callback();
        });
    }

    this.loadExercises = function(callback){
        if (self.userScores.length == 0){
            console.log('scores empty');
            callback();
            return;
        }
        enablePreloader();
        var ids = self.userScores.map(function(s){return s.get('exerciseId')});
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        q.descending('createdAt');
        q.limit(1000);
        q.find(function(list){
            console.log('all exercises = ', list);
            var arr = [];
            for (var i in list){
                if ($.inArray(list[i].id, ids) >= 0){
                    arr.push(list[i]);
                }
            }
            self.exercises = arr;
            disablePreloader();
            callback();
        });
    }

    this.loadExercisesAnswers = function(callback){
        enablePreloader();
        if (self.userScores.length == 0){
            disablePreloader();
            callback();
            return;
        }
        var ids = self.userScores.map(function(s){return s.get('exerciseId')});
        var q = new Parse.Query(Parse.Object.extend('UserAnswer'));
        q.containedIn('exerciseId', ids);
        q.find(function(list){
            console.log('answers = ', list);
            self.userExerciseAnswers = list;
            disablePreloader();
            callback();
        });

    }

    this.loadUserScores = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserExerciseScore'));
        q.limit(1000);
        q.equalTo('userId', self.user.id);
        q.equalTo('status', 'finished');
        q.find(function(results){
            console.log('scores = ', results);
            disablePreloader();
            self.userScores = results;
            callback();
        });
    }

    this.loadCurrentUser = function(callback){
        var id = gup('id');
        if (id == undefined){
            return;
        }
        enablePreloader();
        var q = new Parse.Query(Parse.User);
        console.log('userId = ', id);
        q.get(id, {
            success: function(user){
                self.user = user;
                console.log('user = ', user);
                $('#userName').html(user.get('firstName') + ' ' + user.get('lastName'));
                disablePreloader();
                callback();
            }
        });
    }

    this.loadUserQuestions = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserQuestionaryAnswer'));
        q.limit(1000);
        q.equalTo('userId', self.user.id);
        q.find(function(list){
            disablePreloader();
            self.userQuestionaryAnswers = list;
            callback();
        });
    }

    this.loadQuestions = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('QuestionaryQuestion'));
        q.limit(1000);
        q.addAscending('number');
        q.find(function(list){
            self.questions = list;
            disablePreloader();
            callback();
        });
    }

    this.loadAnswers = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('QuestionaryAnswer'));
        q.limit(1000);
        q.addAscending('number');
        q.find(function(list){
            self.answers = list;
            disablePreloader();
            callback();
        });
    }

    this.loadQuestionsAndAnswers = function(callback){
        enablePreloader();
        self.loadQuestions(function(){
            self.loadAnswers(function(){
                disablePreloader();
                callback();
            });
        });
    }

    this.prepareQuestionaryReport = function(){
        var list = self.userQuestionaryAnswers;
        var s = '';
        for (var i in list){
            var a = self.getAnswerById(list[i].get('answerId'));
            var q = self.getQuestionById(list[i].get('questionId'));
            s+= self.getQuestionaryItemHtml(q, a);
        }
        $('#questionsList').html(s);
    }

    this.getQuestionaryItemHtml = function(q, a){
        var s = '';
        s+='<li class="list-group-item questionListItem" data-id="' + q.id + '" >'
        +'<a href="javascript: void(0);">'
        +'<span class="show">'
        //+'<small class="pull-right "><i class="ti-check mr5"></i></small>'
        +'<strong class="text-uppercase questionaryQuestionName ">' + (parseInt(q.get('number')) + 1) +') ' + q.get('name') + '</strong>'
        +'</span>'
        +'<p class="questionaryListTranscript">' + q.get('transcript') + '<a data-vimeoId="' + q.get('vimeoId') + '" href="javascript: void(0);" class="videoLink"  > <i class="ti-vimeo"></i></a></p>' +
        '<p>' +
        '<audio controls="" src="' + a.get('audioUrl') + '" ></audio>' +
        '</p>'
        +'</a>'
        +'</li>';

        return s;
    }


    this.getExerciseItemHtml = function(exercise){
        var s = '';
        s+='<li class="list-group-item auditorListItem" data-id="' + exercise.id + '">' +
        '<a href="javascript: void(0);">' +
        '<span class="show">' +
        '<small class="pull-right "><i class="ti-check' + ( (self.isCheckedExercise(exercise.id) == true) ? '' : 'hide' ) +' mr5"></i></small>' +
        '<strong class="text-uppercase questionaryQuestionName ">' + exercise.get('name') + '</strong>' +
        '</span>' +
        '</a>' +
        '<p class="questionaryListTranscript">' +
            '<a href="javascript: void(0);">' + exercise.get('task') + '</a>' +
        '</p>' +
        '<p>' +
        '</p>' +
        '</li>';
        return s;
    }

    this.drawExercises = function(){
        var s = '';
        var list = self.exercises;
        console.log('exercises = ', self.exercises);
        for (var i in list){
            s+= self.getExerciseItemHtml(list[i]);
        }
        $('#auditorList').html(s);
    }

    this.initExerciseItem = function(){
        $('body').on('click', '.auditorListItem', function(){
            var id = $(this).attr('data-id');
            self.selectedExercise = self.getExerciseById(id);
            self.prepareExerciseModal();
        });
    }

    this.prepareExerciseModal = function(){
        var ex = self.selectedExercise;
        $('#exerciseModal .exerciseName').html(ex.get('name'));
        var score = self.getScoreByExerciseId(ex.id);
        $('#teacherFeedback').val((score.get('teacherFeedback') == undefined) ? '' : score.get('teacherFeedback'));
        var s = '';
        var cards = self.getSelectedCards();
        console.log('selected cards = ', cards);
        for (var i in cards){
            var a = self.getAnswerByCardId(cards[i].id);
            console.log('a = ', a);
            var materials = cards[i].get('materials');
            var ms = (new ExerciseCard(materials)).getAdminHtml();
            s+='<li><span class="exerciseTask" > ' + ms + ' </span>' +
            '<span class="audioPlaceholder" > User Answer: <audio src="' + a.get('answerUrl') +  '" controls="" ></audio></span>' +
            '</li>';
        }
        $('#exerciseAnswersList').html(s);
        $('#exerciseModal').modal();
    }

    this.getSelectedCards = function(){
        var ex = self.selectedExercise;
        var arr = [];
        var list = self.exercisesCards;
        for (var i in list){
            if (list[i].get('exerciseId') == ex.id){
                arr.push(list[i]);
            }
        }
        return list;
    }

    this.getAnswerByCardId = function(cardId){
        var list = self.userExerciseAnswers;
        for (var i in list){
            if (list[i].get('cardId') == cardId){
                return list[i];
            }
        }
    }


    this.getExerciseById = function(id){
        var list = self.exercises;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.getQuestionById = function(id){
        //console.log('getQuestionById', id);
        var list = self.questions;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
        return undefined;
    }


    this.getAnswerById = function(id){
        var list = self.answers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initVimeoLinks = function(){
        $('body').on('click', 'a.videoLink', function(){
            var vimeoId = $(this).attr('data-vimeoId');
            $('#vimeoModalIframe').attr('src', 'http://player.vimeo.com/video/' + vimeoId +'?title=0&byline=0&portrait=0');
            $('#vimeoModal').modal();
        });
    }

    this.initLeaveFeedbackButton = function(){
        $('#submitFeedbackButton').bind('click', function(){
            var feedback = $('#teacherFeedback').val().trim();
            if (feedback == undefined || feedback == ''){
                toastr.error('Message is empty');
                return;
            }
            var score = self.getScoreByExerciseId(self.selectedExercise.id);
            score.set('teacherFeedback', feedback);
            enablePreloader();
            score.save().then(function(){
                disablePreloader();
                toastr.success('Saved!');
            });

        });
    }

    this.getScoreByExerciseId = function(exId){
        var list = self.userScores;
        for (var i in list){
            if (list[i].get('exerciseId') == exId){
                return list[i];
            }
        }
    }

    this.isCheckedExercise = function(exId){
        var score = self.getScoreByExerciseId(exId);
        return ((score.get('teacherFeedback') != undefined) && (score.get('teacherFeedback') != ''));
    }

}