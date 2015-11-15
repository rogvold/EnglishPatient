/**
 * Created by sabir on 07.12.14.
 */

var UserQuestionaryManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.questions = [];
    this.filteredQuestions = [];
    this.answers = [];
    this.userQuestionaryAnswers = [];
    this.selectedQuestion = undefined;
    this.selectedAnswer = undefined;

    this.init = function(){
        initParse();
        self.currentUserManager.init();
        console.log(self.currentUserManager);
        self.initAnswerCheckboxes();
        self.initFilters();
        self.initSubmitButton();
        self.loadAllLists(function(){
            self.prepareFilterNumbers();
            self.drawQuestionaryList();
        });
    }

    this.loadQuestions = function(callback){
        var QuestionaryQuestion = Parse.Object.extend('QuestionaryQuestion');
        var q = new Parse.Query(QuestionaryQuestion);
        q.limit(1000);
        q.ascending('number');
        q.find(function(results){
            self.questions = results;
            self.filteredQuestions = self.questions;
            callback();
        });
    }

    this.loadAnswers = function(callback){
        var QuestionaryAnswer = Parse.Object.extend('QuestionaryAnswer');
        var q = new Parse.Query(QuestionaryAnswer);
        q.limit(1000);
        q.find(function(results){
            self.answers = results;
            callback();
        });
    }

    this.loadUserAnswers = function(callback){
        var UserQuestionaryAnswer = Parse.Object.extend('UserQuestionaryAnswer');
        var q = new Parse.Query(UserQuestionaryAnswer);
        q.equalTo('userId', self.currentUserManager.currentUser.id);
        q.addAscending('userId');
        q.addAscending('number');
        q.limit(1000);
        q.find(function(results){
            self.userQuestionaryAnswers = results;
            callback();
        });
    }

    this.loadAllLists = function(callback){
        enablePreloader();
        self.loadQuestions(function(){
            console.log(self.questions);
            console.log('starting loading answers');
            self.loadAnswers(function(){
                console.log('answers have been loaded ', self.answers);
                console.log('starting loading user answers');
                self.loadUserAnswers(function(){
                    console.log(self.userQuestionaryAnswers);
                    disablePreloader();
                    callback();
                })
            });
        });
    }

    this.getQuestionaryListItem = function(q){
        if (q == undefined){
            return '';
        }
        var s = '';
        var answeredClass = (self.isAnsweredQuestion(q.id) == true) ? 'ti-check': 'ti-help-alt';
        s+='<li class="list-group-item questionListItem" data-id="' + q.id + '" >'
        +'<a href="javascript: void(0);">'
        +'<span class="show">'
        +'<small class="pull-right "><i class="' + answeredClass + ' mr5"></i></small>'
        +'<strong class="text-uppercase questionaryQuestionName ">' + (parseInt(q.get('number')) + 1) +') ' + q.get('name') + '</strong>'
        +'</span>'
        +'<p class="questionaryListTranscript">' + q.get('transcript') + '</p>'
        +'</a>'
        +'</li>';
        return s;
    }

    this.drawQuestionaryList = function(){
        //var list = self.questions;
        var list = self.filteredQuestions;
        var s = '';
        for (var i in list){
            s+= self.getQuestionaryListItem(list[i]);
        }
        console.log(s);
        $('#questionaryList').html(s);
        $('body').on('click', '#questionaryList li.questionListItem', function(){
            var qId = $(this).attr('data-id');
            self.selectedQuestion = self.getQuestionById(qId);
            self.prepareQuestionModal();
            $('#questionModal').modal();
        });
    }

    this.prepareQuestionModal = function(){
        var q = self.selectedQuestion;
        $('#vimeoIframe').attr('src', 'http://player.vimeo.com/video/' + q.get('vimeoId') +'?title=0&byline=0&portrait=0');
        $('#questionTranscript').html(q.get('transcript'));
        $('#questionName').html(q.get('name'));
        self.prepareModalAnswers();
    }

    this.prepareModalAnswers = function(){
        var s = '';
        var list = self.getQuestionAnswers(self.selectedQuestion.id);
        var qId = self.selectedQuestion.id;
        var ans = self.getUserQuestionAnswerByQuestionId(qId);
        for (var i in list){
            var a = list[i];
            s+='<tr><td class="answer" data-id="' + a.id + '"  >' +
            '<div class="text-center" >' +
                '<audio controls src="' + a.get('audioUrl') + '" ></audio>' +
            '</div>' +
            '<div>' +
            '<div class="text-center" >' + a.get('transcript') + '</div>' +
            '</div>' +
            '' +
            '</td><td><input class="answerCheckbox" data-id="' + a.id + '" type="checkbox"  /></td>' +
            '</tr>';
        }
        $('#questionAnswersTable').html(s);
        $('#answerQuestionButton').addClass('hide');
        if (ans != undefined){
            $('#answerQuestionButton').addClass('hide');
            $('input.answerCheckbox').removeAttr('checked');
            $('input.answerCheckbox[data-id="' + ans.get('answerId') + '"]').attr('checked', 'checked');
        }else{
            //$('#answerQuestionButton').removeClass('hide');
        }
    }

    this.getQuestionAnswers = function(qId){
        var list = self.answers;
        var arr = [];
        for (var i in list){
            if (list[i].get('questionId') == qId){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.getQuestionById = function(id){
        var list = self.questions;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
        return undefined;
    }

    this.isAnsweredQuestion = function(qId){
        var list = self.userQuestionaryAnswers;
        for (var i in list){
            if (list[i].get('questionId') == qId){
                return true;
            }
        }
        return false;
    }


    this.getAnswerById = function(id){
        var list = self.answers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initAnswerCheckboxes = function(){
        $('body').on('mousedown', '.answerCheckbox', function(){
            var id = $(this).attr('data-id');
            $('.answerCheckbox').removeAttr('checked');
            self.selectedAnswer = self.getAnswerById(id);
            console.log(self.selectedAnswer);
            $('#answerQuestionButton').removeClass('hide');
        });
    }

    this.getUserQuestionAnswerByQuestionId= function(qId){
        var list = self.userQuestionaryAnswers;
        for (var i in list){
            if ( qId == list[i].get('questionId')){
                return list[i];
            }
        }
        return undefined;
    }

    this.initSubmitButton = function(){
        $('#answerQuestionButton').bind('click', function(){
            var q = self.selectedQuestion;
            var a = self.selectedAnswer;
            if (q == undefined || q == undefined){
                toastr.error('question or answer is not defined');
                return;
            }
            var suqa = self.getUserQuestionAnswerByQuestionId(q.id)
            var UserQuestionaryAnswer = Parse.Object.extend('UserQuestionaryAnswer');
            var uqa = (suqa == undefined) ? new UserQuestionaryAnswer() : suqa;
            uqa.set('userId', self.currentUserManager.currentUser.id);
            uqa.set('questionId', q.id);
            uqa.set('answerId', a.id);
            enablePreloader();
            uqa.save().then(function(){
                disablePreloader();
                toastr.success('Saved');
                setTimeout(function(){window.location.href = window.location.href;}, 1000);
            });
        });
    }

    this.prepareFilterNumbers = function(){
        $('#allNumber').html(self.questions.length);
        $('#doneNumber').html(self.userQuestionaryAnswers.length);
        $('#notDoneNumber').html(self.questions.length - self.userQuestionaryAnswers.length);
    }

    this.initFilters = function(){
        $('#allFilterButton').click(function(){
            self.filteredQuestions = self.questions;
            self.drawQuestionaryList();
        });
        $('#doneFilterButton').click(function(){
            var arr = [];
            var list = self.questions;
            for (var i in list){
                if (self.isAnsweredQuestion(list[i].id) == true){
                    arr.push(list[i]);
                }
            }
            self.filteredQuestions = arr;
            self.drawQuestionaryList();
        });
        $('#notDoneFilterButton').click(function(){
            var arr = [];
            var list = self.questions;
            for (var i in list){
                if (self.isAnsweredQuestion(list[i].id) == false){
                    arr.push(list[i]);
                }
            }
            self.filteredQuestions = arr;
            self.drawQuestionaryList();
        });

    }

}