/**
 * Created by sabir on 04.11.14.
 */

var QuizManager = function(){
    var self = this;
    this.exerciseId = undefined;
    this.currentUserManager = new CurrentUserManager();
    this.recordManager = new RecordManager();
    this.typingManager = new TypingManager();
    this.exercise = undefined;
    this.cards = [];
    this.mosesses = [];
    this.userAnswers = [];
    this.recordingTime = 0;
    this.maxRecordingTime = 15 * 1000;
    this.state = 'waiting';
    this.intervalTime = 100;
    this.selectedCard = undefined;
    this.currentExerciseAnswerAudioUrl = undefined;
    this.currentExerciseAnswerText = undefined;
    this.mosesPlayingModalManager = new MosesPlayingModalManager();
    this.currentMode = 'playing';
    this.currentMaterialTypes = [];
    this.translateManager = new TranslateWidgetManager();
    this.guestMode = false;
    this.guestUserId = 'RKJY89u9Xl';
    this.remarkable = new Remarkable();



    this.hasChanges = false;


    this.exerciseType = 'speaking';


    this.currentUserAnswer = undefined;
    this.userExerciseScore = undefined;

    this.init = function(){
        initParse();
        if (gup('guest') == '1'){
            self.guestMode = true;
        }
        self.mosesPlayingModalManager.init();
        self.translateManager.init();
        self.currentUserManager.init(function(){
            self.loadAndPrepareExercise(function(){
                if (self.guestMode == true){
                    $('#rightSidebar').hide();
                    $('header').hide();
                    $('section.layout').css('padding-top', '0px !important');
                }
            });
        });
        self.initBackLink();
    }


    this.loadAndPrepareExercise = function(callback){
        self.loadCurrentExercise(function(){
            self.prepareWarmUpBlock();

            $('.exerciseName').html(self.exercise.get('name'));
            if (self.exercise.get('task') == undefined || self.exercise.get('task') == ''){
                $('#taskBlock').hide();
            }
            $('.exerciseTask').html(self.exercise.get('task'));
            self.loadUserExerciseScore(function(){
                if (self.userExerciseScore.get('status') != 'new'){
                    $('#recordButtonsBlock').hide();
                }
                var fb = self.userExerciseScore.get('teacherFeedback');
                if (fb == undefined){
                    fb = '';
                }

                //fb = fb.replace(/\n/g, '<br/>');
                if (fb != undefined && fb != '' ){
                    fb = self.remarkable.render(fb);
                    $('#teacherFeedback').html(fb);
                    $('#teacherFeedbackBlock').show();
                }
                self.loadCards(function(){
                    self.loadMosesses(function(){
                        self.initCardsNumbers();
                        self.loadUserAnswers(function(){

                            if (self.exercise.get('exerciseType') == 'speaking'){
                                $('#recorderPlaceholder').show();
                                self.initRecordManager();
                                self.initRecordingTimer();
                            }
                            if (self.exercise.get('exerciseType') == 'typing'){
                                $('#placeholderOfTypingPlaceholderDiv').show();
                                self.initTypingManager();
                            }
                            self.updateCardNumbersWithAnswers();
                            self.prepareFinishExerciseButton();
                            self.initFinishButton();
                            $('li.cardNumber:first').click();

                            if (callback != undefined){
                                callback();
                            }

                        });
                    });
                });
            });
        });
    }


    this.loadCurrentExercise = function(callback){
        self.exerciseId = gup('id');
        if (self.exerciseId == undefined){
            window.location.href = 'index.html';
            return;
        }
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        enablePreloader();
        q.get(self.exerciseId,{
            success: function(ex){
                self.exercise = ex;
                document.title = ex.get('name');
                self.exerciseType = ex.get('exerciseType');
                disablePreloader();
                callback();
            }
        });
    }

    this.loadCards = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('ExerciseCard'));
        q.ascending('number');
        q.equalTo('exerciseId', self.exerciseId);
        q.find(function(list){
            self.cards = list;
            disablePreloader();
            callback();
        });
    }


    this.initCardsNumbers = function(){
        var s = '';
        var list = self.cards;
        for (var i in list){
            s+='<li class="cardNumber" data-id="' + list[i].id + '" >' +
            '<a href="javascript: void(0);">' + (+i + 1) + '</a>' +
            '</li>';
        }
        $('#exercisesNumbersBlock').html(s);
        $('.cardNumber').bind('click', function(){
            $('.cardNumber').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('data-id');

            self.selectedCard = self.getCardById(id);
            console.log('selectedCard = ');
            console.log(self.selectedCard);
            $('.mediaMaterial').hide();
            self.prepareSelectedCard();


            //todo: make it, check it



            //enablePreloader('сохранение');

            //self.saveUserAnswer(function(){
            //    console.log('ответ сохранен');
            //    self.selectedCard = self.getCardById(id);
            //    console.log('selectedCard = ');
            //    console.log(self.selectedCard);
            //    $('.mediaMaterial').hide();
            //    self.prepareSelectedCard();
            //    disablePreloader();
            //});


        });
        $('#deleteButton').bind('click', function(){
            self.selectedCard.destroy({
                success: function(){
                    window.location.href = window.location.href;
                }
            });
        });
        $('.cardNumber:first').click();
    }

    this.prepareSelectedCard = function(){
        $('#commentText').html(self.selectedCard.get('comment'));
        if (self.exercise.get('exerciseType') != 'typing'){
            $('#transcriptText').html(self.selectedCard.get('transcript'));
        }

        var materials = self.selectedCard.get('materials');

        console.log('materials = ', materials);

        materials = materials.map(function(m){return self.extractMaterial(m)});
        var matTypeList = self.currentMaterialTypes;
        for (var i in materials){
            var m = materials[i];
            var tp = m.materialType;
            // checking if we can show this material in current Mode
            //if (self.isInList(tp, matTypeList) == false){
            //    continue;
            //}

            m.prepareHtml();
            $('.isTranslatable').each(function(){var text = $(this).text(); text = self.translateManager.getWrappedText(text);$(this).html(text);});
            if (self.userExerciseScore.get('status') == 'finished'){
                if (self.exercise.get('exerciseType') == 'typing'){
                    $('#textAnswerPlaceholder').html((self.exercise.get('exerciseType') == 'speaking') ? ('Правильный ответ: <b>' + self.cards[parseInt(self.selectedCard.get('number'))].get('transcript') + '</b>') : '');
                }
            }
            self.prepareProContraBlock();
        }

        self.currentUserAnswer = self.getUserAnswerByCardId(self.selectedCard.id);
        console.log('selectedCard = ', self.selectedCard);
        console.log('currentUserAnswer = ', self.currentUserAnswer);
        if (self.exerciseType == 'speaking'){
            if (self.currentUserAnswer != undefined){
                $('#audioId').attr('src', self.currentUserAnswer.get('answerUrl'));
            }else{
                $('#audioId').removeAttr('src');
            }
        }

        if (self.exerciseType == 'typing'){
            $('#transcriptText').addClass('hide');
            if (self.currentUserAnswer != undefined){
                self.typingManager.prepare(self.currentUserAnswer.get('answerText'), self.selectedCard.id);
                if (self.currentUserAnswer.get('answerText') != '' && self.currentUserAnswer.get('answerText') != undefined){
                    $('#transcriptText').html(self.selectedCard.get('transcript'));
                    $('#transcriptText').removeClass('hide');
                }
            }else{
                self.typingManager.prepare('', self.selectedCard.id);
            }
        }
        self.hasChanges = false;
        self.prepareMosesLink();
        self.prepareFinishExerciseButton();
    }


    this.extractMaterial = function(data){
        if (data == undefined){
            return undefined;
        }
        if (data.materialType == 'video'){
            return (new VideoMaterial(data.vimeoId));
        }
        if (data.materialType == 'audio'){
            return (new AudioMaterial(data.audioUrl));
        }
        if (data.materialType == 'image'){
            return (new ImageMaterial(data.imageUrl));
        }
        if (data.materialType == 'text'){
            return (new TextMaterial(data.text));
        }
        return undefined;
    }

    this.getSimpleCardHtml = function(card){
        if (card == undefined){
            return '';
        }
        var s = '';
        var materials = card.get('materials');
        for (var i in materials){
            var d = materials[i];
            var m = self.extractMaterial(d);
            s+= m.getSimpleHtml();
        }
        return s;
    }


    this.getCardById = function(id){
        var list = self.cards;
        if (id == undefined){
            return undefined;
        }
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
        return undefined;
    }


    this.initTypingManager = function(){
        self.typingManager = new TypingManager();
        console.log('status = ' + self.userExerciseScore.get('status'));
        if (self.userExerciseScore.get('status') == 'finished'){
            self.typingManager.enabled = false;
        }

        self.typingManager.onSubmit = function(a){
            if (a == undefined || a == ''){
                toastr.error('Пустой ответ!');
                return;
            }
            self.currentExerciseAnswerText = a;
            self.saveUserAnswer(function(){
                $('.cardNumber.active').click();
            });
        }
        self.typingManager.onChange = function(a){
            self.hasChanges = true;
            self.currentExerciseAnswerText = a;
        }

        self.typingManager.init(); // death

        $('#bottomTextsPlaceholder').css('padding', '32px');

    }

    this.initRecordManager = function(){

        self.recordManager.savedRecordCallback = function(fName){
            self.currentExerciseAnswerAudioUrl = fName;
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
            self.state = 'saving';
            $('.loader').html('Uploading... ' + p + ' %');
        }
        self.recordManager.startedRecordCallback = function(){
            self.state = 'recording';
            self.recordingTime = 0;
            $('#recordingTime').addClass('hide');
        }

        self.recordManager.stoppedRecordCallback = function(){
            self.state = 'waiting';
            self.recordingTime = 0;
            $('#recordingTime').addClass('hide');
        }

        self.recordManager.init();
    }

    this.initRecordingTimer = function(){
        setInterval(function(){
            if (self.state == 'recording'){
                self.recordingTime += self.intervalTime;
                $('#recordingTime').removeClass('hide');
                $('#recordingTime').html((self.recordingTime / 1000.0) + ' sec');
                if (self.recordingTime >= self.maxRecordingTime){
                    self.recordManager.stopRecording();
                    self.state = 'waiting';
                    self.recordingTime = 0;
                    $('#recordingTime').addClass('hide');
                }
            }
        }, self.intervalTime);
    }

    this.loadUserAnswers = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserAnswer'));
        q.equalTo('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
        q.equalTo('exerciseId', self.exerciseId);
        q.find(function(results){
            disablePreloader();
            self.userAnswers = results;
            console.log('userAnswers = ', results);
            callback();
        });
    }

    this.saveUserAnswer = function(callback){

        if ((self.exercise.get('exerciseType') == 'speaking') && (self.currentExerciseAnswerAudioUrl == undefined)){
            //toastr.error('currentExerciseAnswerAudioUrl is null');
            if (callback != undefined){
                callback();
            }


            return;
        }
        if ( (self.exercise.get('exerciseType') == 'typing') && (self.currentExerciseAnswerText == undefined || self.currentExerciseAnswerText == '')){
            //toastr.error('Пустой текст!');
            if (callback != undefined){
                callback();
            }
            return;
        }

        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserAnswer'));
        q.equalTo('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
        q.equalTo('exerciseId', self.exerciseId);
        q.equalTo('cardId', self.selectedCard.id);
        q.find(function(results){
            if (results.length == 0){
                var UserAnswer = Parse.Object.extend('UserAnswer');
                var answer = new UserAnswer();
                answer.set('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
                answer.set('exerciseId', self.exerciseId);
                answer.set('cardId', self.selectedCard.id);

                if (self.exerciseType == 'speaking'){
                    answer.set('answerUrl', self.currentExerciseAnswerAudioUrl);
                }
                if (self.exerciseType == 'typing'){
                    answer.set('answerText', self.currentExerciseAnswerText);
                }

                answer.set('status', 'notChecked');
                answer.save().then(function(ans){
                    toastr.success('saved!');
                    disablePreloader();
                    self.currentUserAnswer = ans;
                    self.loadUserAnswers(function(){
                        self.updateCardNumbersWithAnswers();
                        if (callback != undefined){
                            callback();
                        }
                    });
                });
            }else{
                var answer = results[0];

                if (self.exerciseType == 'speaking'){
                    answer.set('answerUrl', self.currentExerciseAnswerAudioUrl);
                }
                if (self.exerciseType == 'typing'){
                    answer.set('answerText', self.currentExerciseAnswerText);
                }

                answer.set('status', 'notChecked');
                answer.save().then(function(ans){
                    disablePreloader();
                    toastr.success('saved!');
                    self.currentUserAnswer = ans;
                    self.switchToNextQuestion();
                    self.loadUserAnswers(function(){
                        self.updateCardNumbersWithAnswers();
                        if (callback != undefined){
                            callback();
                        }
                    });
                });
            }
        });
    }

    this.switchToNextQuestion = function(){
        $('.cardNumber.active').next().click();
    }

    this.getUserAnswerByCardId = function(cardId){
        var list = self.userAnswers;
        for (var i in list){
            if (list[i].get('cardId') == cardId){
                return list[i];
            }
        }
        return undefined;
    }

    this.updateCardNumbersWithAnswers = function(){
        var list = self.userAnswers;
        $('.cardNumber').removeClass('answered');
        for (var i in list){
            var a = list[i];
            var cardId = a.get('cardId');
            $('.cardNumber[data-id="' + cardId +'"]').addClass('answered');
        }
        self.prepareFinishExerciseButton();
    }

    this.loadUserExerciseScore = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserExerciseScore'));

        q.equalTo('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);

        q.equalTo('exerciseId', self.exerciseId);
        q.find(function(results){
            console.log('loadUserExerciseScore: results = ', results);
            if (results.length == 0){
                var UserExerciseScore = Parse.Object.extend('UserExerciseScore');
                var score = new UserExerciseScore();
                score.set('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
                score.set('exerciseId', self.exerciseId);
                score.set('status', 'new');
                score.save().then(function(s){
                    console.log('created new userExerciseScore ');
                    console.log('userId = ' + ((self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id));
                    console.log('exerciseId = ' + self.exerciseId);
                    self.userExerciseScore = s;
                    disablePreloader();
                    callback();
                });
            }else{
                self.userExerciseScore = results[0];
                disablePreloader();
                callback();
            }
        });
    }

    this.prepareFinishExerciseButton = function(){
        $('#finishBlock').hide();
        var list = self.userAnswers;
        var f = true;
        for (var i in list){
            if (self.exercise.get('exerciseType') == 'speaking'){
                if (list[i].get('answerUrl') == '' || list[i].get('answerUrl') == undefined){
                    f = false;
                }
            }else{
                if (list[i].get('answerText') == '' || list[i].get('answerText') == undefined){
                    f = false;
                    console.log('f is false because list[i].get("answerText") = ' + list[i].get('answerText') );
                }
            }
        }

        if (self.userAnswers.length != self.cards.length){
            f = false;
            console.log('self.userAnswers.length != self.cards.length, l1 = ' + self.userAnswers.length + ' ; l2 = ' + self.cards.length);
        }
        console.log('prepareFinishExerciseButton: f = ' + f);
        if (f == true){
            console.log('f == true');
            $('#finishBlock').show();
        }
    }

    this.initFinishButton = function(){
        console.log('initFinishButton: status =  ' + self.userExerciseScore.get('status'));
        if (self.userExerciseScore.get('status') != 'new'){
            $('#finishButton').hide();
            if (self.userExerciseScore.get('status') == 'finished'){
                $('#exerciseIsFinishedBlock').show();
            }
            return;
        }
        $('#finishButton').bind('click', function(){
            enablePreloader();
            self.userExerciseScore.set('status', 'finished');
            self.userExerciseScore.save().then(function(){
                toastr.success('Exercise was finished');
                disablePreloader();
                setTimeout(function(){
                    window.location.href = window.location.href;
                }, 1000);
            });
        });
    }

    this.extractVimeoIdsFromCards = function(){
        var list = self.cards;
        var arr = [];
        for (var i in list){
            var l = list[i];
            var materials = l.get('materials');
            for (var j in materials){
                if (materials[j].materialType == 'video'){
                    arr.push(materials[j].vimeoId);
                }
            }
        }
        return arr;
    }

    this.loadMosesses = function(callback){
        var arr = self.extractVimeoIdsFromCards();
        var q = new Parse.Query(Parse.Object.extend('Moses'));
        q.containedIn('vimeoId', arr);
        enablePreloader();
        q.find(function(results){
            disablePreloader();
            self.mosesses = results;
            callback();
        });
    }

    this.getSelectedCardMoses = function(){
        var c = self.selectedCard;
        var materials = c.get('materials');
        for (var i in materials){
            var m = materials[i];
            if (m.materialType == 'video'){
                return self.getMosesByVimeoId(m.vimeoId);
            }
        }
        return undefined;
    }

    this.prepareMosesLink = function(){
        var mos = self.getSelectedCardMoses();
        if (mos == undefined){
            $('#mosesLinkPlaceholder').html('');
            return;
        }
        $('#mosesLinkPlaceholder').html('<a href="javascript:void(0);" class="mosesLink" data-vimeoId="' + mos.get('vimeoId') + '" >помощь</a>');
    }

    this.getMosesByVimeoId = function(vimeoId){
        var list = self.mosesses;
        for (var i in list){
            if (list[i].get('vimeoId') == vimeoId){
                return list[i];
            }
        }
    }

    this.exerciseHasPlayMode = function(){
        var ex = self.exercise;
        var f = false;
        var list1 = ex.get('exerciseModeMedia');
        var list2 = ex.get('playingModeMedia');
        if (list1 == undefined && list2 == undefined){
            return false;
        }
        if (list1 == undefined || list2 == undefined){
            return true;
        }
        if (list1.length != list2.length){
            return true;
        }
        if (list1.length == 0){
            return false;
        }
        for (var i in list1){
            var l1 = list1[i];
            var has = false;
            for (var j in list2){
                var l2 = list2[j];
                if (l1 == l2){
                    has = true;
                }
                if (has == false){
                    return true;
                }
            }
        }
        return false;
    }

    this.isInList = function(a, list){
        for (var i in list){
            if (list[i] == a){
                return true;
            }
        }
        return false;
    }

    this.prepareMode = function(){
        self.currentMode = 'playing';
        if (self.exerciseHasPlayMode() == false){
            self.currentMode = 'exercise';
            $('#goButton').hide();
        }
        self.currentMaterialTypes = (self.currentMode == 'playing' ? self.exercise.get('playingModeMedia') : self.exercise.get('exerciseModeMedia'));
        $('#goButton').show();
        $('#goButton').bind('click', function(){
            self.switchMode();
        });
    }

    this.switchMode = function(){
        self.currentMode = 'exercise';
        self.currentMaterialTypes = self.exercise.get('exerciseModeMedia');
    }


    this.prepareHasUnsavedDate = function(){
        if (self.hasChanges == true){

        }
    }


    this.prepareWarmUpBlock = function(){
        if (self.exercise.get('hintText') != undefined && self.exercise.get('hintText') != ''){
            self.prepareHintBlock();
            return;
        }
        $('#warmUpLink').bind('click', function(){
            $('#warmUpBlock').toggle();
            $('#warmUpFrame').attr('src', 'http://player.vimeo.com/video/' + self.exercise.get('warmUpVimeoId') + '?title=0&byline=0&portrait=0&fullscreen=1');
        });
        var hintText = self.exercise.get('hintText');
        var hintVimeoId = self.exercise.get('warmUpVimeoId');



        $('#warmUpLink').show();

        if (isEmptyString(hintVimeoId) && isEmptyString(hintText)){
            $('#warmUpLink').hide();
        }


        //if (hintText == undefined || hintText == ''){
            //$('#warmUpLink').hide();
        //}else{

            hintText = wrapSentenceBracketWordsWithTag(hintText, 'b', 'blue');
            //$('#warmUpText').html(hintText);
            $('#warmUpFrame').attr('src', 'http://player.vimeo.com/video/' + hintVimeoId + '?title=0&byline=0&portrait=0&fullscreen=1');
        //}
    }

    this.prepareHintBlock = function(){
        var hintText = self.exercise.get('hintText');
        var hintVimeoId = self.exercise.get('warmUpVimeoId');
        if (hintText == undefined || hintText == ''){
            return;
        }
        if (hintVimeoId != undefined && hintVimeoId != ''){
            $('#warmUpFrame').attr('src', 'http://player.vimeo.com/video/' + hintVimeoId + '?title=0&byline=0&portrait=0&fullscreen=1');

        }else{
            $('#warmUpFrame').hide();
        }
        $('#goButton').show();
        $('#warmUpBlock').show();
        hintText = wrapSentenceBracketWordsWithTag(hintText, 'b', '#1582dc');
        $('#warmUpText').html(hintText);

        $('.exercisable').hide();
        $('#hintButton').hide();
        $('#goButton').bind('click', function(){
            $('#warmUpBlock').toggle();
            $('.exercisable').toggle();
            $('#hintButton').show();
            $('#goButton').hide();
        });
        $('#hintButton').bind('click', function(){
            $('#warmUpBlock').toggle();
            $('.exercisable').toggle();
            $("#hintButton").hide();
            $('#goButton').show();
        });
    }


    this.prepareProContraBlock = function(){
        var ex = self.exercise;
        console.log('proContra = ' + ex.get('proContra'));
        if (ex.get('proContra') != true){
            $('#proContraBlock').hide();
            return;
        }
        $('.videoBlock').addClass('proContraVideoBlock');
        $('#proBlock').html(getStringListHtml(PRO_LIST));
        $('#contraBlock').html(getStringListHtml(CONTRA_LIST));
    }

    this.initBackLink = function(){
        if (gup('classId') == undefined){
            $("#backLink").hide();
        }
        $('#backLink').bind('click', function(){
            var classId = gup('classId');
            if (classId == undefined){
                return;
            }
            window.location.href = 'class.html?id=' + classId;
        });

    }

}