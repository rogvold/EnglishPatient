/**
 * Created by sabir on 02.12.14.
 */


var TeacherQuestionaryManager = function(){
    var self = this;
    this.questions = [];
    this.answers = [];
    this.selectedAnswer = undefined;
    this.selectedQuestion = undefined;
    this.currentUserManager = new CurrentUserManager();

    this.init = function(){
        initParse();
        enablePreloader();
        self.initQuestionaryLists();
        self.initCreateButtons();
        self.initUpdateButtons();
        self.initDeleteButtons();
        self.currentUserManager.init(function(){
            self.loadAllQuestions(function(){
                self.loadAllQuestionaryAnswers(function(){
                    self.drawQuestionsList();
                    disablePreloader();
                })
            });
        });
    }

    this.loadAllQuestions = function(callback){
        enablePreloader();
        var QuestionaryQuestion = Parse.Object.extend('QuestionaryQuestion');
        var q = new Parse.Query(QuestionaryQuestion);
        q.limit(1000);
        q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        q.ascending('number');
        q.find(function(results){
            self.questions = results;
            disablePreloader();
            callback();
        });
    }

    this.drawQuestionsList = function(){
        var s = '';
        var list = self.questions;
        for (var i in list){
            var cl = (list[i].get('vimeoId') == undefined || list[i].get('vimeoId') == '') ? 'notReady' : 'ready';
            s+= '<li data-number="' + list[i].get('number') + '" class="question" data-id="' + list[i].id + '" ><b>' + (parseInt(list[i].get('number')) + 1) + '</b> - ' + list[i].get('name') + '</li>';
        }
        $('#questionaryList').html(s);
        $('li.question:first').click();
    }

    this.loadAllQuestionaryAnswers = function(callback){
        enablePreloader();
        var QuestionaryAnswer = Parse.Object.extend('QuestionaryAnswer');
        var q = new Parse.Query(QuestionaryAnswer);
        q.limit(1000);
        q.addAscending('questionId');
        q.addAscending('number');
        q.find(function(results){
            self.answers = results;
            disablePreloader();
            callback();
        });
    }

    this.initQuestionaryLists = function(){
        $('body').on('click', 'li.question', function(){
            var id = $(this).attr('data-id');
            $('li.question').removeClass('selected');
            $(this).addClass('selected');
            self.selectedQuestion = self.getQuestionById(id);
            self.prepareSelectedQuestionBlock();
        });

        $('body').on('click', 'li.answer', function(){
            var id = $(this).attr('data-id');
            $('li.answer').removeClass('selected');
            $(this).addClass('selected');
            self.selectedAnswer = self.getAnswerById(id);
            self.prepareSelectedAnswerBlock();
        });
    }

    this.getQuestionAnswers = function(questionId){
        var arr = [];
        var list = self.answers;
        for (var i in list){
            if (list[i].get('questionId') == questionId){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.getQuestionById = function(qId){
        var list = self.questions;
        for (var i in list){
            if (list[i].id == qId){
                return list[i];
            }
        }
    }

    this.getAnswerById = function(id){
        var list = self.answers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.drawQuestionAnswersList = function(questionId){
        var list = self.getQuestionAnswers(questionId);
        var s = '';
        for (var i in list){
            s+='<li data-number="' + list[i].get('number') + '" data-id="' + list[i].id + '" class="answer" ><b>' + (parseInt(list[i].get('number')) + 1) + '</b> - ' + list[i].get('name') +'</li>';
        }
        $('#answersList').html(s);
        $('li.answer:first').click();
    }

    self.prepareSelectedQuestionBlock = function(){
        var q = self.selectedQuestion;
        self.drawQuestionAnswersList(q.id);
        $('#questionName').val(q.get('name'));
        $('#questionTranscript').val(q.get('transcript'));
        $('#questionRuTranscript').val(q.get('ruTranscript'));
        $('#vimeoIframe').attr('src', 'http://player.vimeo.com/video/' + q.get('vimeoId') +'?title=0&byline=0&portrait=0');
        $('#questionVimeoId').val(q.get('vimeoId'));
        self.prepareDeleteQuestionButton();
    }

    self.prepareSelectedAnswerBlock = function(){
        var a = self.selectedAnswer;
        $('#answerName').val(a.get('name'));
        $('#answerNumber').html(a.get('number'));
        $('#answerTranscript').val(a.get('transcript'));
        $('#answerRuTranscript').val(a.get('ruTranscript'));
        $('#answerHints').val(a.get('answerHints'));
        $('#answerAudioUrl').val(a.get('audioUrl'));
        $('#answerAudio').attr('src', a.get('audioUrl'));
        self.prepareDeleteAnswerButton();
    }

    self.initCreateQuestionButton = function(){
        $('#createQuestionButton').bind('click', function(){
            var vimeoId = $('#createQuestionVimeoId').val().trim();
            if (vimeoId == undefined || vimeoId == '' || vimeoId == 'undefined'){
                toastr.error('vimeo id is not specified');
                return;
            }
            var name = $('#createQuestionName').val().trim();
            var transcript = $('#createQuestionTranscript').val().trim();
            var ruTranscript = $('#createQuestionRussianTranscript').val().trim();

            var QuestionaryQuestion = Parse.Object.extend('QuestionaryQuestion');
            var q = new QuestionaryQuestion();
            q.set('number', $('li.question').length);
            q.set('vimeoId', vimeoId);
            q.set('creatorId', self.currentUserManager.currentUser.id);

            q.set('name', name);
            q.set('transcript', transcript);
            q.set('ruTranscript', ruTranscript);

            q.save().then(function(){
                self.loadAllQuestions(function(){
                   self.drawQuestionsList();
                    $('li.question:last').click();
                });
            });
        });
    }

    this.initCreateAnswerButton = function(){
        $('#createAnswerButton').bind('click', function(){
            var audioUrl = $('#createAnswerAudioUrl').val().trim();
            if (self.selectedQuestion == undefined){
                toastr.error('Select question');
                return;
            }
            if (audioUrl == undefined || audioUrl == '' || audioUrl == 'undefined'){
                toastr.error('audio url is not specified');
                return;
            }
            var name = $('#createAnswerName').val().trim();
            var transcript = $('#createAnswerTranscript').val().trim();
            var ruTranscript = $('#createAnswerRuTranscript').val().trim();
            var answerHints = $('#createAnswerHints').val().trim();
            var QuestionaryAnswer = Parse.Object.extend('QuestionaryAnswer');
            var a = new QuestionaryAnswer();
            a.set('questionId', self.selectedQuestion.id);
            a.set('number', $('li.answer').length);
            a.set('audioUrl', audioUrl);
            a.set('name', name);
            a.set('transcript', transcript);
            a.set('ruTranscript', ruTranscript);
            a.set('answerHints', answerHints);
            enablePreloader();
            a.save().then(function(){
                disablePreloader();
                enablePreloader();
                self.loadAllQuestionaryAnswers(function(){
                    disablePreloader();
                    self.prepareSelectedQuestionBlock();
                    $('li.answer:last').click();
                });
                //self.loadAllQuestions(function(){
                //    self.drawQuestionsList();
                //    $('li.question:last').click();
                //});
            });
        });
    }

    this.initQuestionUpdateButton = function(){
        $('#questionUpdateButton').bind('click', function(){
            var q = self.selectedQuestion;
            var name = $('#questionName').val().trim();
            if (name == undefined || name == ""){
                toastr.error('name is not defined');
                return;
            }
            var vimeoId = $('#questionVimeoId').val().trim();
            if (vimeoId == undefined || vimeoId == ""){
                toastr.error('vimeo id is not defined');
                return;
            }
            var transcript = $('#questionTranscript').val().trim();
            var ruTranscript = $('#questionRuTranscript').val().trim();
            q.set('vimeoId', vimeoId);
            q.set('transcript', transcript);
            q.set('ruTranscript', ruTranscript);

            q.set('name', name);
            var n = q.get('number');
            enablePreloader();
            q.save().then(function(){
                disablePreloader();
                self.prepareSelectedQuestionBlock();
            });
        });
    }

    this.initAnswerUpdateButton = function(){
        $('#answerUpdateButton').bind('click', function(){
            var a = self.selectedAnswer;
            var name = $('#answerName').val().trim();
            if (name == undefined || name == ""){
                toastr.error('name is not defined');
                return;
            }
            var audioUrl = $('#answerAudioUrl').val().trim();
            if (audioUrl == undefined || audioUrl == ""){
                toastr.error('audioUrl is not defined');
                return;
            }
            var transcript = $('#answerTranscript').val().trim();
            var ruTranscript = $('#answerRuTranscript').val().trim();
            var answerHints = $('#answerHints').val().trim();


            a.set('audioUrl', audioUrl);
            a.set('transcript', transcript);
            a.set('ruTranscript', ruTranscript);
            a.set('answerHints', answerHints);
            a.set('name', name);
            enablePreloader();
            a.save().then(function(){
                disablePreloader();
                self.prepareSelectedAnswerBlock();
            });
        });
    }

    self.initDeleteQuestionButton = function(){
        $('#deleteQuestionButton').bind('click', function() {
            var q = self.selectedQuestion;
            if (confirm('Are you sure?') == false) {
                return;
            }
            enablePreloader();
            q.destroy().then(function () {
                window.location.href = window.location.href;
            });
        });
    }

    self.initDeleteAnswerButton = function(){
        $('#deleteAnswerButton').bind('click', function() {
            var a = self.selectedAnswer;
            enablePreloader();
            a.destroy().then(function () {
                window.location.href = window.location.href;
            });
        });
    }

    this.prepareDeleteAnswerButton = function(){
            var a = self.selectedAnswer;
            var ans = self.getQuestionAnswers(self.selectedQuestion.id);
            $('#deleteAnswerButton').addClass('hide');
            if (ans.length - 1 == a.get('number')){
                $('#deleteAnswerButton').removeClass('hide');
            }
    }

    this.prepareDeleteQuestionButton = function(){
            var q = self.selectedQuestion;
            $('#deleteQuestionButton').addClass('hide');
            if (q.get('number') == self.questions.length - 1){
                $('#deleteQuestionButton').removeClass('hide');
            }
    }

    this.initUpdateButtons = function(){
        self.initAnswerUpdateButton();
        self.initQuestionUpdateButton();
    }

    this.initCreateButtons = function(){
        self.initCreateAnswerButton();
        self.initCreateQuestionButton();
    }

    this.initDeleteButtons = function(){
        self.initDeleteQuestionButton();
        self.initDeleteAnswerButton();
    }



}