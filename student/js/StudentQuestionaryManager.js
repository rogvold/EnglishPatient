/**
 * Created by sabir on 07.01.15.
 */

var StudentQuestionaryManager = function(){
    var self = this;
    self.questions = [];
    this.currentUserManager = new CurrentUserManager();
    this.currentPhase = 1;
    this.answers = [];
    this.currentUserAnswers = [];
    this.currentNumber = 0;
    this.currentPhase3State = 1;
    this.phase3Quetions = [];
    this.currentPhase3Question = undefined;
    this.recordManager = new RecordManager();
    this.recordingTime = 0;
    this.currentAnswerUrl = undefined;

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.loadQuestionaryQuestions(function(){
                self.loadQuestionaryAnswers(function(){
                    self.loadCurrentUserAnswers(function(){
                        self.initSwitchToPhase2Button();
                        self.initSwitchToPhase3Button();
                        self.initAnswerSelectButton();
                        self.drawPhase1Questions();
                    });
                });
            });
        });
    }


    this.loadQuestionaryQuestions = function(callback){
        var q = new Parse.Query(Parse.Object.extend('QuestionaryQuestion'));
        q.limit(1000);
        q.addAscending('creatorId'); // todo: change on equal to Teacher's id
        q.addAscending('number');
        enablePreloader();
        q.find(function(results){
            console.log('questions loaded: ', results);
            self.questions = results;
            disablePreloader();
            callback();
        });
    }

    this.loadQuestionaryAnswers = function(callback){
        var arr = self.questions.map(function(q){return q.id});
        var q = new Parse.Query(Parse.Object.extend('QuestionaryAnswer'));
        q.containedIn('questionId', arr);
        q.addAscending('number');
        enablePreloader();
        q.find(function(results){
            disablePreloader();
            console.log('answers: ', results);
            self.answers = results;
            callback();
        });
    }

    this.loadCurrentUserAnswers = function(callback){
        var q = new Parse.Query(Parse.Object.extend('UserQuestionaryAnswer'));
        q.equalTo('userId', self.currentUserManager.currentUser.id);
        q.limit(1000);
        q.find(function(results){
            self.currentUserAnswers = results;
            console.log('loadCurrentUserAnswers: current user answers = ', results);
            callback();
        });
    }

    this.getAnswersByQuestionId = function(qId){
        var list = self.answers;
        var arr = [];
        for (var i in list){
            if (list[i].get('questionId') == qId){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.getAnswerById = function(aId){
        var list = self.answers;
        for (var i in list){
            if (list[i].id == aId){
                return list[i];
            }
        }
    }

    this.getUserAnswerOnQuestion = function(questionId){
        var list = self.currentUserAnswers;
        for (var i in list){
            if (list[i].get('questionId') == questionId){
                var answerId = list[i].get('answerId');
                //return self.getAnswerById(answerId);
                return list[i];
            }
        }
    }

    this.drawQuestionaryTable = function(){
        var s = '<tr>' +
                '<th>#</th>' +
                '<th>Вопрос</th>' +
                '<th>Ответы</th>' +
                '<th>Мой ответ</th>' +
            '</tr>';
        var list = self.questions;
        for (var i in list){
            var q = list[i];
            s+= self.getQuestionaryTableRow(q);
            //todo: добавить "мне это не интересно"
        }
        $('#phase1Table').html(s);

    }

    this.getQuestionaryTableRow = function(q){
        var s = '';
        var aS = '';
        var answersList = self.getAnswersByQuestionId(q.id);
        for (var i in answersList){
            var answer = answersList[i];
            aS+='<li class="qAnswer" data-id="' + answer.id + '"  >' +
            '<span class="answerTranscriptBlock" >' +
                '<span class="answerTranscript" >' + answer.get('transcript') +'</span> <br/>' +
                '<span class="answerRuTranscript" >' + answer.get('ruTranscript') +'</span>' +
            '</span>' +
            '<span class="answerControls" >' +
            '<button class="btn btn-xs btn-dropbox answerSelectButton" data-questionId="' + q.id + '" data-answerId="' + answer.id + '" >выбрать</button>' +
            '</span>' +
            '' +
            '</li>';
        }
        aS+='<li class="" >' +
            '<span class="answerControls" >' +
                '<button class="btn btn-xs btn-danger answerNotInterestedButton answerSelectButton" data-questionId="' + q.id + '" >мне это не интересно</button>' +
            '</span>' +
        '</li>';

        aS = '<ul class="answersList" >' + aS + '</ul>';
        var userQuestionaryAnswer = self.getUserAnswerOnQuestion(q.id);
        var userAnswer = (self.getUserAnswerOnQuestion(q.id) == undefined) ? undefined : self.getAnswerById( self.getUserAnswerOnQuestion(q.id).get('answerId'));
        var sUa = 'ответ не выбран';
        if (userQuestionaryAnswer != undefined){
            console.log('interested = ', userQuestionaryAnswer.get('interested'));
            if (userQuestionaryAnswer.get('interested') == false){
                console.log('--->>>> мне это не интересно, черт побери!');
                sUa = '<span class="userAnswer" style="font-weight: bold;" >не интересует</span>';
            }else{
                if (userAnswer != undefined){
                    sUa = '<span class="userAnswer" >' + (userAnswer.get('number') + 1) + '</span>'; // number of answer
                }
            }
        }
        var qS = '';
        var rowClass = (userAnswer == undefined) ? '' : 'answered';
        qS+='<span class="questionTranscript" >' + q.get('transcript') +'</span> <br/>' +
           '<span class="questionRuTranscript" >' + q.get('ruTranscript') +'</span>';
        s+='<tr class="' + rowClass +'" ><td class="qNumber" >' + (q.get('number') + 1) + '</td><td>' + qS + '</td><td>' + aS + '</td><td>' + sUa + '</td></tr>';
        return s;
    }

    this.getPhase2QuestionaryTableRow = function(q){
        var s = '';
        var iframeHtml = '<iframe class="questionaryPhase2Iframe" src="http://player.vimeo.com/video/' + q.get('vimeoId') +'?title=0&byline=0&portrait=0" ></iframe>';
        var qS = '<span class="iframePlaceholder" >' + iframeHtml + '</span> <span class="transcriptsBlock" >' +
            '<span class="transcript" >' + q.get('transcript') + '</span> <br/>' +
            '<span class="ruTranscript" >' + q.get('ruTranscript') + '</span>' +
            '</span> ';
        var userAnswer = self.getUserAnswerOnQuestion(q.id);
        if (userAnswer == undefined){
            return '';
        }
        var a = self.getAnswerById(userAnswer.get('answerId'));
        if (a == undefined){
            return '';
        }

        var aS = '<span><span class="audioPlaceholder" ><audio controls="1" src="' + a.get('audioUrl')  + '" ></audio><br/></span>' +
            '<span class="transcriptsBlock" >' +
            '<span class="transcript" >' + a.get('transcript') + '</span> <br/>' +
            '<span class="ruTranscript" > ' + a.get('ruTranscript') +  '</span>' +
            '</span>' +
            '</span>';
        s+='<tr><td>' + qS + '</td><td>' + aS + '</td></tr>';
        return s;
    }

    this.initAnswerSelectButton = function(){
        $('body').on('click', '.answerSelectButton', function(){
            var answerId = $(this).attr('data-answerId');
            var questionId = $(this).attr('data-questionId');
            var UserQuestionaryAnswer = Parse.Object.extend('UserQuestionaryAnswer');
            var a = self.getUserAnswerOnQuestion(questionId);
            if (a == undefined){
                a = new UserQuestionaryAnswer();
            }else{
                console.log('already exists: answerId = ' + a.get('answerId'));
            }
            a.set('questionId', questionId);
            if (answerId == undefined){
                console.log('interested = false');
                a.set('interested', false);
            }else{
                a.set('answerId', answerId);
                a.set('interested', true);
            }

            console.log('setting answerId = ' + answerId);
            a.set('userId', self.currentUserManager.currentUser.id);
            enablePreloader();
            a.save().then(function(){
                self.loadCurrentUserAnswers(function(){
                    self.drawPhase1Questions();
                    disablePreloader();
                });
            });
        });
        //$('body').on('click', '.answerNotInterestedButton', function(){
        //    var answerId = $(this).attr('data-answerId');
        //    var questionId = $(this).attr('data-questionId');
        //    var a = self.getUserAnswerOnQuestion(questionId);
        //    if (a == undefined){
        //        return;
        //    }
        //    alert(a.id);
        //});
    }


    this.drawPhase1Questions = function(){
        self.drawQuestionaryTable();
    }

    this.drawPhase2Questions = function(){
        var s = '<tr><th>Вопрос</th><th>Ответ</th></tr>';
        var list = self.questions;
        var arr = [];
        for (var i in list){
            var uA = self.getUserAnswerOnQuestion(list[i].id);
            if (uA != undefined){
                arr.push(list[i]);
            }
        }
        list = arr;
        for (var i in list){
            s+= self.getPhase2QuestionaryTableRow(list[i]);
        }
        $('#phase2Table').html(s);
    }

    this.initSwitchToPhase2Button = function(){
        $('#switchToPhase2Button').bind('click', function(){
            if (self.currentUserAnswers == undefined || self.currentUserAnswers.length == 0){
                toastr.error('Вы должны ответить хотя бы на 1 вопрос');
                return;
            }
            $("#commandBlock").html('Подготовьтесь и нажмите на кнопку "<b>перейти к тесту</b>"');
            $(this).hide();
            $('#phase1Table').hide();
            self.drawPhase2Questions();
            $('#switchToPhase3Button').show();
        });
    }

    //---- Phase 3 block ---

    this.initSwitchToPhase3Button = function(){
        $('#switchToPhase3Button').bind('click', function(){
            $(this).hide();
            $("#commandBlock").html('');
            $('#phase2Table').hide();
            self.startPhase3();
        });
    }

    this.initPhase3Questions = function(){
        var list = self.questions;
        var arr = [];
        for (var i in list){
            var q = list[i];
            var uA = self.getUserAnswerOnQuestion(q.id);
            if (uA == undefined || uA.get('interested') == false){
                continue;
            }
            arr.push(q);
        }
        self.phase3Quetions = arr;
    }

    //draw everything but hide depending on state
    this.preparePhase3QuestionBlock = function(){
        var q = self.currentPhase3Question;
        var qS = '<span class="transcriptsBlock questionTranscriptsBlock" id="questionBlock" >' +
                    '<span class="transcript" >' + q.get('transcript') + '</span>' +
                    '<span class="ruTranscript" >' + q.get('ruTranscript') + '</span>' +
                 '</span>';
        var iframeHtml = '';
        iframeHtml+='<iframe src="http://player.vimeo.com/video/' + q.get('vimeoId') +'?title=0&byline=0&portrait=0" />';
        var userAnswer = self.getUserAnswerOnQuestion(q.id);
        var answer = self.getAnswerById(userAnswer.get('answerId'));
        var aS = '<span class="answerBlock" id="answerBlock" >' +
                    '<span class="transcriptsBlock" >' +
                        '<span class="transcript" ><p>' + answer.get('transcript') + '</p></span> <br/>' +
                        '<span class="ruTranscript" ><p>' + answer.get('ruTranscript') + '</p></span> <br/>' +
                    '</span>' +
                 '</span>';
        var hintS = '<span id="hintsBlock" class="hintsBlock">' +
            '<b>Подсказки</b> <br/>' +
                '<span class="hint" >' + answer.get('answerHints') + '</span>' +
            '</span>';
        var s = '<div class="questionBlock" >' +
            '<div class="iframePlaceholder" >' + iframeHtml + '</div>' +
            '' + qS + '' +
            '</div>' +
            '' + aS + '' +
            '' + hintS
            '';
        $('#phase3Block').html(s);
        $('#phase3Block').show();
        self.showTextByState(self.currentPhase3State);
        self.prepareAudioBlock();
    }

    this.initSkipButton = function(){
        $('#skipButton').bind('click', function(){
            self.generateNextPhase3Question();
        });
    }

    this.generateNextPhase3Question = function(){
        var n = self.phase3Quetions.length;
        var k = Math.round(Math.random() * ( n - 1) );
        self.currentPhase3Question = self.phase3Quetions[k];
        self.preparePhase3QuestionBlock();
    }

    this.prepareAudioBlock = function(){
        var userAnswer = self.getUserAnswerOnQuestion(self.currentPhase3Question.id);
        var field = 'state' + self.currentPhase3State + 'Answer';
        var url = userAnswer.get(field);
        console.log('url: under');
        console.log(url);
        if (url == undefined || url == ''){
            $('#audioId').attr('src', '');
        }else{
            $('#audioId').attr('src', url);
        }
    }


    this.startPhase3 = function(){
        self.initRecordManager();
        if (gup('state') != undefined){
            self.currentPhase3State = parseInt(gup('state'));
        }
        self.initSkipButton();
        $('#recorderPlaceholder').show();
        self.initPhase3Questions();
        self.generateNextPhase3Question();
    }


    this.showTextByState = function(state){
        if (state == undefined){
            return;
        }
        if (state == 2){
            $('#answerBlock').hide();
            $('#questionBlock .ruTranscript').hide();
        }
        if (state == 3){
            $('#answerBlock').hide();
            $('#questionBlock').hide();
            $('#hintsBlock').hide();
        }
    }

    this.saveUserAnswer = function(){
        var url = self.currentAnswerUrl;
        var q = self.currentPhase3Question;
        var field = 'state' + self.currentPhase3State + 'Answer';
        var k = 0;
        for (var i in self.currentUserAnswers){
            if (self.currentUserAnswers[i].get('questionId') == q.id){
                k = i;
                break;
            }
        }
        self.currentUserAnswers[k].set(field, self.currentAnswerUrl);
        self.currentUserAnswers[k].save().then(function(){
            toastr.success('Saved');
            enablePreloader();
            self.loadCurrentUserAnswers(function(){
                disablePreloader();
                self.generateNextPhase3Question();
            });
        });
    }

    this.initRecordManager = function(){

        self.recordManager.savedRecordCallback = function(fName){
            self.currentAnswerUrl = fName;
            $('.loader').html('');
            self.state = 'waiting';
            disablePreloader();
            self.saveUserAnswer();
        }

        self.recordManager.startingLoadingCallback = function(){
            self.recordingTime = 0;
            $('#recordingTime').addClass('hide');
            enablePreloader();
        }
        self.recordManager.onProgressCallback = function(p){
            //self.state = 'saving';
            $('.loader').html('Uploading... ' + p + ' %');
        }
        self.recordManager.startedRecordCallback = function(){
            //self.state = 'recording';
            self.recordingTime = 0;
            $('#recordingTime').addClass('hide');
        }

        self.recordManager.stoppedRecordCallback = function(){
            //self.state = 'waiting';
            self.recordingTime = 0;
            $('#recordingTime').addClass('hide');
        }
        self.recordManager.init();
    }

}