/**
 * Created by sabir on 08.07.15.
 */

var StudentDialogManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.recordManager = new RecordManager();
    this.dialog = undefined;
    this.selectedRole = undefined;
    this.selectedRole = 1;
    this.currentExerciseAnswerAudioUrl = undefined;
    this.allCards = [];
    this.teachers = [];
    this.pairs = [];
    this.selectedPair = undefined;
    this.currentUserAnswer = undefined;
    this.recordingTime = 0;
    this.maxRecordingTime = 15 * 1000;
    this.state = 'waiting';
    this.currentMode = 'playing';
    this.intervalTime = 100;
    this.userAnswers = [];
    this.guestUserId = 'RKJY89u9Xl';
    this.guestMode = false;
    this.remarkable = new Remarkable();
    this.dialogState = 1;

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            if (gup('id') == undefined){
                window.location.href = 'index.html';
                return;
            }
            if (gup('state') != undefined){
                self.dialogState = +gup('dialogState');
            }
            self.loadDialog(function(){
                self.loadExerciseCards(function(){
                    self.loadUserAnswers(function(){
                        self.loadUserExerciseScore(function(){
                            console.log('dialog loaded: ', self.dialog);
                            self.prepareDialogInfo();
                            self.initBackLink();
                        });
                    });
                });
            });
        });
    }

    this.loadDialog = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientDialog'));
        var id = gup('id');
        q.get(id, {
            success: function(d){
                self.dialog = d;
                callback();
            }
        });
    }

    this.loadExerciseCards = function(callback){
        var q = new Parse.Query(Parse.Object.extend('ExerciseCard'));
        q.equalTo('dialogId', self.dialog.id);
        q.addAscending('number');
        q.limit(1000);
        q.find(function(results){
            self.allCards = results;
            console.log('cards loaded: ', results);
            callback();
        });
    }

    this.prepareDialogInfo = function(){
        var d = self.dialog;
        $('.exercisable').hide();
        $('#exerciseName').html(d.get('name'));
        $('#dialogVideoPlaceholder').html('<iframe id="patientExerciseIframe" src="http://player.vimeo.com/video/' + d.get('vimeoId') + '?title=0&amp;byline=0&amp;portrait=0&amp;allowfullscreen=1&amp;fullscreen=1" width="520" height="293" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>');
        $('#dialogDescriptionPlaceholder').html(self.remarkable.render(d.get('description')));
        $('#firstRoleBlock .roleImg').attr('src', d.get('firstRoleImg'));
        $('#secondRoleBlock .roleImg').attr('src', d.get('secondRoleImg'));
        $('#firstRoleBlock .roleName').text(d.get('firstRoleName'));
        $('#secondRoleBlock .roleName').text(d.get('secondRoleName'));



        $('.roleBlock').bind('click', function(){
            var n = parseInt($(this).attr('data-role'));
            self.selectedRole = n;
            self.prepareDialog();
            $('#hintLink').show();
        });

        $('#hintLink').bind('click', function(){
            $('#dialogVideoPlaceholder').toggle();
            $('#dialogDescriptionPlaceholder').toggle();
            $('.exercisable').toggle();
        });
    }

    this.prepareDialog = function(){
        $('#dialogVideoPlaceholder').hide();
        $('#dialogDescriptionPlaceholder').hide();
        $('#selectRoleBlock').hide();
        $('.exercisable').show();
        self.prepareCardNumbers();

        $('#recorderPlaceholder').show();
        self.initRecordManager();
        self.initRecordingTimer();
        self.updateCardNumbersWithAnswers();
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


    this.saveUserAnswer = function(callback){

        if (self.currentExerciseAnswerAudioUrl == undefined){
            //toastr.error('currentExerciseAnswerAudioUrl is null');
            if (callback != undefined){
                callback();
            }

            return;
        }

        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserAnswer'));
        q.equalTo('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
        q.equalTo('dialogId', self.dialog.id);
        q.equalTo('cardId', self.selectedPair.answerCard.id);

        q.find(function(results){
            if (results.length == 0){
                var UserAnswer = Parse.Object.extend('UserAnswer');
                var answer = new UserAnswer();
                answer.set('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
                answer.set('dialogId', self.dialog.id);
                answer.set('cardId', self.selectedPair.answerCard.id);

                answer.set('answerUrl', self.currentExerciseAnswerAudioUrl);

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

                answer.set('status', 'notChecked');
                answer.set('answerUrl', self.currentExerciseAnswerAudioUrl);

                answer.save().then(function(ans){

                    disablePreloader();
                    toastr.success('saved!');
                    self.currentUserAnswer = ans;

                    self.loadUserAnswers(function(){
                        self.updateCardNumbersWithAnswers();

                        self.switchToNextQuestion();

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

    this.updateCardNumbersWithAnswers = function(){
        console.log('--->>>   updateCardNumbersWithAnswers occured!');
        var list = self.userAnswers;
        $('.cardNumber').removeClass('answered');
        console.log('updateCardNumbersWithAnswers occured: ', self.userAnswers);
        for (var i in list){
            var a = list[i];
            var cardId = a.get('cardId');
            //console.log('cardId ' + cardId + ' answered!');
            $('.cardNumber[data-answerCardId="' + cardId +'"]').addClass('answered');
        }
        //self.prepareFinishExerciseButton();
    }

    this.prepareCardNumbers = function(){
        self.pairs = self.getDialogPairs();
        var list = self.pairs;
        var s = '';
        for (var i in list){
            var p = list[i];
            s+='<li class="cardNumber" data-questionCardId="' + p.questionCard.id + '" data-answerCardId="' + p.answerCard.id + '" data-number="' + i +'" >' +
                    '<a href="javascript: void(0);">' + (+i + 1) + '</a>' +
                '</li>';
        }
        $('#exercisesNumbersBlock').html(s);
        setTimeout(function(){
            $('.cardNumber').transition({
                debug     : true,
                animation : 'jiggle',
                duration  : 500,
                interval  : 200
            });
        }, 500);


        $('body').on('click', '.cardNumber', function(){
            var num = parseInt($(this).attr('data-number'));
            self.selectedPair = self.pairs[num];
            $('.cardNumber').removeClass('active');
            $(this).addClass('active');
            self.prepareCardPair();
        });
        $('.cardNumber:first').click();
    }


    //this.prepareSelectedCard = function(){
    //    //$('#commentText').html(self.selectedCard.get('comment'));
    //
    //    var materials = self.selectedCard.get('materials');
    //
    //    console.log('materials = ', materials);
    //
    //    materials = materials.map(function(m){return self.extractMaterial(m)});
    //    var matTypeList = self.currentMaterialTypes;
    //    for (var i in materials){
    //        var m = materials[i];
    //        var tp = m.materialType;
    //        m.prepareHtml();
    //        if (self.userExerciseScore.get('status') == 'finished'){
    //            if (self.exercise.get('exerciseType') == 'typing'){
    //                $('#textAnswerPlaceholder').html('Правильный ответ: <b>' + self.cards[parseInt(self.selectedCard.get('number'))].get('transcript') + '</b>');
    //            }
    //        }
    //        self.prepareProContraBlock();
    //    }
    //
    //    self.currentUserAnswer = self.getUserAnswerByCardId(self.selectedCard.id);
    //    console.log('selectedCard = ', self.selectedCard);
    //    console.log('currentUserAnswer = ', self.currentUserAnswer);
    //    if (self.exerciseType == 'speaking'){
    //        if (self.currentUserAnswer != undefined){
    //            $('#audioId').attr('src', self.currentUserAnswer.get('answerUrl'));
    //        }else{
    //            $('#audioId').removeAttr('src');
    //        }
    //    }
    //
    //}



    this.prepareCardPair = function(){
        var p = self.selectedPair;
        var qCard = self.selectedPair.questionCard;
        var aCard = self.selectedPair.answerCard;

        $('#commentText').html(qCard.get('comment'));

        var materials = qCard.get('materials');

        console.log('materials = ', materials);
        materials = materials.map(function(m){return self.extractMaterial(m)});
        for (var i in materials){
            var m = materials[i];
            var tp = m.materialType;
            m.prepareHtml();
            //$('.isTranslatable').each(function(){var text = $(this).text(); text = self.translateManager.getWrappedText(text);$(this).html(text);});
        }

        self.currentUserAnswer = self.getUserAnswerByCardId(aCard.id);
        console.log('selectedCard = ', self.selectedCard);
        console.log('currentUserAnswer = ', self.currentUserAnswer);
        if (self.currentUserAnswer != undefined){
            console.log('setting audio src: ' + self.currentUserAnswer.get('answerUrl') );
            $('#audioId').attr('src', self.currentUserAnswer.get('answerUrl'));
        }else{
            $('#audioId').removeAttr('src');
        }

        $('#transcript').html('');
        $('#transcriptText').html('');
        if (self.dialogState == 1){
            console.log('--- ---- ---- ---- >>>> setting transcript text: ', qCard.get('transcript'));
            if (aCard.get('transcript') != undefined && aCard.get('transcript') != ''){
                $('#transcriptText').html(aCard.get('transcript'));
            }

        }
        if (self.dialogState == 2){
            if (aCard.get('hint') != undefined && aCard.get('hint') != ''){
                $('#transcriptText').html(aCard.get('hint'));
            }

        }

    }

    this.loadUserExerciseScore = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserExerciseScore'));
        q.equalTo('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
        q.equalTo('dialogId', self.dialog.id);
        q.find(function(results){
            console.log('loadUserExerciseScore: results = ', results);
            if (results.length == 0){
                var UserExerciseScore = Parse.Object.extend('UserExerciseScore');
                var score = new UserExerciseScore();
                score.set('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
                score.set('dialogId', self.dialog.id);
                score.set('status', 'new');
                score.save().then(function(s){
                    console.log('created new userExerciseScore ');
                    console.log('userId = ' + ((self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id));
                    console.log('dialog.id = ' + self.dialog.id);
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

    this.getUserAnswerByCardId = function(cardId){
        console.log('---->>>> getUserAnswerByCardId: cardId = ' + cardId);
        var list = self.userAnswers;
        for (var i in list){
            if (list[i].get('cardId') == cardId){
                console.log('---->>>> returning ', list[i]);
                return list[i];
            }
        }
        return undefined;
    }

    this.extractMaterial = function(data){
        if (data == undefined){
            return undefined;
        }
        if (data.materialType == 'video'){
            return (new VideoMaterial(data.vimeoId));
        }
        if (data.materialType == 'audio'){
            return (new AudioMaterial(data.audioUrl, true));
        }
        if (data.materialType == 'image'){
            return (new ImageMaterial(data.imageUrl));
        }
        if (data.materialType == 'text'){
            return (new TextMaterial(data.text));
        }
        return undefined;
    }

    this.getDialogPairs = function(){
        var roleNumber = self.selectedRole;
        if (roleNumber == 1){
            return self.getPairsForFirstRole();
        }
        if (roleNumber == 2){
            return self.getPairsForSecondRole();
        }
    }

    this.getPairsForFirstRole = function(){
        var list = self.allCards;
        var n = Math.floor(list.length / 2.0);
        var pairs = [];
        for (var i = 0; i <= n; i++){
            var num1 = i * 2 - 1;
            var num2 = i * 2;
            var pair = {
                questionCard: undefined,
                answerCard: undefined
            }
            if (num1 ==  - 1){
                pair.questionCard = self.getZeroCard()
            }else{
                pair.questionCard = list[num1];
            }

            if (num2 >= list.length){
                pair.answerCard = self.getFinishCard();
            }else{
                pair.answerCard = list[num2];
            }
            pairs.push(pair);
        }
        return pairs;
    }

    this.getPairsForSecondRole = function(){
        var list = self.allCards;
        var n = Math.floor(list.length / 2.0);
        var pairs = [];
        for (var i = 0; i <= n; i++){
            var num1 = i * 2;
            var num2 = i * 2 + 1;
            var pair = {
                questionCard: undefined,
                answerCard: undefined
            }

            if (num1 >= list.length){  // ????
                break; //todo: check it out!
            }

            pair.questionCard = list[num1];

            if (num2 >= list.length){  // ????
                pair.answerCard = self.getFinishCard();
            }else{
                pair.answerCard = list[num2];
            }
            pairs.push(pair);
        }
        return pairs;
    }

    this.getFinishCard = function(){
        var ExerciseCard = Parse.Object.extend('ExerciseCard');
        var card = new ExerciseCard();
        var materials = [{
            "imageUrl" : "http://disk.englishpatient.org/uploads/Ft1mST0jlCkKS87.jpg",
            "materialType": "image"
        }];
        return card;
    }

    this.getZeroCard = function(){
        var ExerciseCard = Parse.Object.extend('ExerciseCard');
        var card = new ExerciseCard();
        var materials = [{
            "audioUrl":"http://beta.englishpatient.org/audio/uploads/143658861207858649999.wav",
            "materialType":"audio"
        }, {
            "imageUrl" : "http://disk.englishpatient.org/uploads/MPEHidviDBWBz81.jpg",
            "materialType": "image"
        }];
        card.set('materials', materials);
        //[{"audioUrl":"http://disk.englishpatient.org/uploads/gz0OeLQUhrejLYO.mp3","materialType":"audio"}]
        //[{"materialType":"video","vimeoId":"132814485"}]
        //todo: work on that
        return card;
    }


    this.loadUserAnswers = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserAnswer'));
        q.equalTo('userId', (self.guestMode == true) ? self.guestUserId : self.currentUserManager.currentUser.id);
        q.equalTo('dialogId', self.dialog.id);
        q.find(function(results){
            disablePreloader();
            self.userAnswers = results;
            console.log('userAnswers = ', results);
            callback();
        });
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