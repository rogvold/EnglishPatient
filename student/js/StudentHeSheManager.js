/**
 * Created by sabir on 25.12.14.
 */

var StudentHeSheManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.pictureManager = new HeShePicturesViewManager();
    this.heSheViewManager = new HeSheViewManager();
    this.phrase = undefined;
    this.userHeSheAnswers = [];
    this.selectedAnswer = undefined;
    this.recordingAnswer = undefined;

    this.meDefaultPic = '../img/mePic.jpg';
    this.weDefaultPic = '../img/wePic.jpg';

    //recording stuff
    this.recordManager = new RecordManager();
    this.recordingTime = 0;
    this.maxRecordingTime = 10 * 1000;
    this.intervalTime = 100;
    this.state = 'waiting';

    this.mePic = undefined;
    this.wePic = undefined;

    this.init = function(){
        initParse();
        self.initNextButton();
        self.initGoButton();
        self.initUserAnswerItem();
        self.initRecordingTimer();
        self.currentUserManager.init(function(){
            self.initMeWePics();
            self.pictureManager.init(function(){
                self.loadCurrentPhrase(function(){
                    self.loadUserAnswers(function(){
                        self.drawUserAnswers();
                        self.heSheViewManager.prepareView();
                        self.initRecordManager();
                        console.log(self.phrase);
                    });

                });
            });
        });
    }


    this.loadCurrentPhrase = function(callback){
        var id = gup('id');
        if (id == undefined){
            toastr.error('id is undefined');
            window.location.href = 'index.html';
            return;
        }
        var q = new Parse.Query(Parse.Object.extend('HeShePhrase'));
        enablePreloader();
        q.get(id, {
            success: function(p){
                self.phrase = p;
                self.heSheViewManager.phrase = p;
                self.pictureManager.number = p.get('number');
                disablePreloader();
                callback();
            }
        });
    }

    this.loadUserAnswers = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserHeSheAnswer'));
        q.limit(1000);
        q.equalTo('userId', self.currentUserManager.currentUser.id);
        q.addAscending('number');
        q.equalTo('phraseId', self.phrase.id);
        q.find(function(results){
            disablePreloader();
            console.log('user answers = ', results);
            self.userHeSheAnswers = results;
            callback();
        });
    }

    this.getUserAnswerListItem = function(a){
        var s = '';
        s+= '<li class="userAnswer" data-id="' + a.id + '" > ' + a.get('marks').join(', ') + ' </li>';
        return s;
    }

    this.drawUserAnswers = function(){
        var list = self.userHeSheAnswers;
        var s = '';
        for (var i in list){
            s+=self.getUserAnswerListItem(list[i]);
        }
        $('#answersList').html(s);
    }

    this.initUserAnswerItem = function(){
        $('body').on('click', '.userAnswer', function(){
            var id = $(this).attr('data-id');
            self.selectedAnswer = self.getAnswerById(id);
            self.prepareSelectedUserAnswerModal();
        });
    }

    this.prepareSelectedUserAnswerModal = function(){
        var a = self.selectedAnswer;
        $('#userAnswerAudioPlaceholder').html('<audio controls="1" src="' + a.get('answerUrl') + '" ></audio>');
        $('userAnswerHeader').html(a.get('marks').join(', '));
        $('#userAnswerModal').modal();
    }

    this.getAnswerById = function(id){
        var list = self.userHeSheAnswers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initNextButton = function(){
        $('#nextButton').bind('click', function(){
            if (self.state != 'waiting'){
                toastr.error('You should record your answer first');
                return;
            }
            self.pictureManager.preparePics();
            console.log(self.pictureManager.marks);
            self.prepareRecordingAnswer();
        });
    }

    this.prepareRecordingAnswer = function(){
        var UserHeSheAnswer = Parse.Object.extend('UserHeSheAnswer');
        self.recordingAnswer = new UserHeSheAnswer();
        self.recordingAnswer.set('marks', self.pictureManager.marks);
        self.recordingAnswer.set('phraseId', self.phrase.id);
        self.recordingAnswer.set('userId', self.currentUserManager.currentUser.id);
    }

    this.initGoButton = function(){
        $('#goButton').bind('click', function(){
            $('#recordBlock').show();
            $('#controlsBlock').show();
            $('#goButtonPlaceholder').hide();
            self.heSheViewManager.stop();
            self.pictureManager.preparePics();
            self.prepareRecordingAnswer();
            $('#hintButtonPlaceholder').show();
        });
        self.initHintButton();
    }

    this.initHintButton = function(){
        $('#hintButton').bind('click', function(){
            self.heSheViewManager.prepareView();
            $('#goButtonPlaceholder').show();
            $('#hintButtonPlaceholder').hide();
            $('#picsPlaceholder').hide();
            $('#recordBlock').hide();
            $('#controlsBlock').hide();
            $('#heSheVewDiv').show();
        });
    }

    this.initRecordManager = function(){
        self.recordManager.savedRecordCallback = function(fName){
            self.recordingAnswer.set('answerUrl', fName);
            $('.loader').html('');
            self.state = 'waiting';
            disablePreloader();
            enablePreloader();
            self.recordingAnswer.save().then(function(){
                disablePreloader();
                enablePreloader();
                self.loadUserAnswers(function(){
                    self.drawUserAnswers();
                    disablePreloader();
                });
            });
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
                //console.log('recording time = ', (self.recordingTime / 1000.0) + ' sec');
                if (self.recordingTime >= self.maxRecordingTime){
                    self.recordManager.stopRecording();
                    self.state = 'waiting';
                    self.recordingTime = 0;
                    $('#recordingTime').addClass('hide');
                }
            }
        }, self.intervalTime);
    }

    this.initMeWePics = function(){
        console.log('initMeWePics occured');
        self.mePic = self.currentUserManager.currentUser.get('mePicSrc');
        self.wePic = self.currentUserManager.currentUser.get('wePicSrc');

        //
        self.mePic = (self.mePic == undefined) ? self.meDefaultPic : self.mePic;
        self.wePic = (self.wePic == undefined) ? self.weDefaultPic : self.wePic;

        console.log(self.mePic, self.wePic);

        if (self.mePic == undefined || self.wePic == undefined || self.wePic == 'undefined' || self.mePic == 'undefined'){
            $('#meUrl').val((self.mePic == undefined) ? '' : self.mePic);
            $('#weUrl').val((self.wePic == undefined) ? '' : self.wePic);
            console.log('modalling');
            $('#meWeModal').modal();
        }
        self.prepareMeWeButton();
    }

    this.prepareMeWeButton = function(){
        $('#meWeButton').bind('click', function(){
            self.mePic = $('#meUrl').val().trim();
            self.wePic = $('#weUrl').val().trim();
            if (self.mePic == '' || self.wePic == ''){
                toastr.error('Url is not defined');
                return;
            }
            self.currentUserManager.currentUser.set('mePicSrc', self.mePic);
            self.currentUserManager.currentUser.set('wePicSrc', self.wePic);
            enablePreloader();
            self.currentUserManager.currentUser.save().then(function(){
                disablePreloader();
                toastr.success('saved');
                setTimeout(function(){
                    window.location.href = window.location.href;
                }, 500);
            });
        });
    }

}