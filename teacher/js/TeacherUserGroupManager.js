/**
 * Created by sabir on 27.12.14.
 */

var TeacherUserGroupManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.patientClass = undefined;
    this.users = [];
    this.allUsers = [];
    this.userLinks = [];
    this.selectedUser = undefined;
    this.auditorExercises = [];
    this.auditorSelectedUserAnswers = [];
    this.auditorSelectedCards = [];
    this.auditorSelectedUserScores = [];

    this.heShePharses = [];
    this.heSheSelectedUserAnswers = [];

    this.selectedHeShePhrase = undefined;
    this.selectedExercise = undefined;

    this.questionaryAnswers = [];
    this.questionaryQuestions = [];


    this.init = function(){
        initParse();
        self.initUserItem();
        self.initExerciseItem();
        self.initHeSheItem();
        self.initLeaveFeedbackButton();
        self.initUnfinishButton();
        self.currentUserManager.init(function(){
            self.loadCurrentClass(function(){
                self.loadAllUsers(function(){
                    self.loadUserLinks(function(){
                        self.loadAuditorExercises(function(){
                            self.loadHeShePhrases(function(){
                                self.loadAllQuestionaryQuestions(function(){
                                    self.drawUsers();
                                    self.initDeleteUserFromGroupButton();
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    this.loadCurrentClass = function(callback){
        var classId = gup('classId');
        if (classId == undefined){
            toastr.error('classId id is not defined');
            window.location.href = 'index.html';
            return;
        }
        var q = new Parse.Query(Parse.Object.extend('PatientClass'));
        enablePreloader();
        q.get(classId, {
            success: function(res){
                disablePreloader();
                self.patientClass = res;
                self.prepareClassPage();
                callback();
            }
        });
    }

    this.prepareClassPage = function(){
        var c = self.patientClass;
        $('#className').html(c.get('name'));
        $('.className').html(c.get('name'));
        $('.classDescription').html(c.get('description'));
        $('.classCode').html(c.get('invitationCode'));
        $('#classLink').attr('href', 'class.html?id=' + self.patientClass.id);
    }

    this.loadAllUsers = function(callback){
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.allUsers = results;
            disablePreloader();
            callback();
        });
    }

    this.loadUserLinks = function(callback){
        var q = new Parse.Query(Parse.Object.extend('StudentClassLink'));
        q.limit(1000);
        q.equalTo('classId', self.patientClass.id);
        enablePreloader();
        q.find(function(results){
            self.userLinks = results;
            console.log(results);
            disablePreloader();
            var arr = [];
            var list = self.allUsers;
            for (var i in list){
                var f = false;
                for (var j in results){
                    if (list[i].id == results[j].get('studentId')){
                        arr.push(list[i]);
                    }
                }
            }
            self.users = arr;
            console.log('users = ', arr);
            callback();
        });
    }

    this.drawUsers = function(){
        var s = '';
        var list = self.users;
        for (var i in list){
            s+= self.getUserItemHtml(list[i]);
        }
        $('#studentsList').html(s);
    }

    this.getUserItemHtml = function(u){
        var s = '';
        s+= '<li class="userItem" data-id="' + u.id + '" title="' + u.get('email') + '"  >' + u.get('firstName') + ' ' + u.get('lastName') + '</li>';
        return s;
    }

    this.initUserItem = function(){
        $('body').on('click', '.userItem', function(){
            var id = $(this).attr('data-id');
            self.selectedUser = self.getUserById(id);
            console.log('selectedUser = ', self.selectedUser);
            $('.userItem').removeClass('active');
            $(this).addClass('active');
            self.prepareSelectedUser();
        });
    }

    this.prepareSelectedUser = function(){
        self.loadSelectedUserAnswers(function(){
            self.loadAuditorSelectedUserScores(function(){
                self.loadUserQuestionaryAnswers(function(){
                    self.drawSelectedUserExercises();
                    self.drawSelectedUserHeShePhrases();
                    self.drawUserQuestionaryAnswers();
                });
            });

        });
    }

    this.getUserById = function(id){
        var list = self.allUsers;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.loadAuditorExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        q.limit(1000);
        q.addAscending('name');
        enablePreloader();
        q.find(function(results){
            self.auditorExercises = results;
            disablePreloader();
            callback();
        });
    }

    this.loadAuditorSelectedUserScores = function(callback){
        var q = new Parse.Query(Parse.Object.extend('UserExerciseScore'));
        q.limit(1000);
        q.equalTo('userId', self.selectedUser.id);
        enablePreloader();
        q.find(function(results){
            self.auditorSelectedUserScores = results;
            disablePreloader();
            callback();
        });
    }

    this.getCurrentUserExerciseScore = function(){
        var ex = self.selectedExercise;
        var u = self.selectedUser;
        if (ex == undefined || u == undefined){
            return undefined;
        }
        var list = self.auditorSelectedUserScores;
        for (var i in list){
            if (list[i].get('exerciseId') == ex.id && list[i].get('userId') == u.id){
                return list[i];
            }
        }
    }


    this.loadHeShePhrases = function(callback){
        var q = new Parse.Query(Parse.Object.extend('HeShePhrase'));
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.heShePharses = results;
            disablePreloader();
            callback();
        });
    }

    this.loadAuditorSelectedUserAnswers = function(callback){
        console.log('loadAuditorSelectedUserAnswers occured');
        var q = new Parse.Query(Parse.Object.extend('UserAnswer'));

        q.addAscending('createdAt');

        q.limit(1000);
        q.equalTo('userId', self.selectedUser.id);

        enablePreloader();
        q.find(function(results){
            self.auditorSelectedUserAnswers = results;
            console.log('auditorSelectedUserAnswers ', self.auditorSelectedUserAnswers);
            disablePreloader();
            callback();
        });
    }

    this.loadSelectedExerciseCards = function(callback){
        var q = new Parse.Query(Parse.Object.extend('ExerciseCard'));
        console.log('loadSelectedExerciseCards occured:  self.selectedExercise.id = ',  self.selectedExercise.id);
        q.equalTo('exerciseId', self.selectedExercise.id);
        q.addAscending('number');
        enablePreloader();
        q.find(function(results){
            disablePreloader();
            self.auditorSelectedCards = results;
            callback();
        });
    }



    this.loadHeSheSelectedUserAnswers = function(callback){
        console.log('loadHeSheSelectedUserAnswers occured');
        console.log('selectedUser = ', self.selectedUser);
        var q = new Parse.Query(Parse.Object.extend('UserHeSheAnswer'));
        q.limit(1000);
        q.equalTo('userId', self.selectedUser.id);
        enablePreloader();
        q.find(function(results){
            self.heSheSelectedUserAnswers = results;
            console.log('heSheSelectedUserAnswers = ', self.heSheSelectedUserAnswers);
            disablePreloader();
            callback();
        });
    }

    this.loadSelectedUserAnswers = function(callback){
        self.loadHeSheSelectedUserAnswers(function(){
            self.loadAuditorSelectedUserAnswers(function(){
                callback();
            });
        });
    }

    this.getSelectedUserAuditorExercises = function(){
        var arr = [];
        var exs = self.auditorExercises;
        var list = self.auditorSelectedUserAnswers;
        for (var i in exs){
            var ex = exs[i];
            for (var j in list){
                if (list[j].get('exerciseId') == ex.id){
                    arr.push(ex);
                    break;
                }
            }
        }
        return arr;
    }


    this.getSelectedUserHeSheExercises = function(){
        var arr = [];
        var prs = self.heShePharses;
        var list = self.heSheSelectedUserAnswers;
        for (var i in prs){
            var p = prs[i];
            for (var j in list){
                if (list[j].get('phraseId') == p.id){
                    arr.push(p);
                    break;
                }
            }
        }
        return arr;
    }

    this.getExerciseHtml = function(ex){
        var s = '';
        var score = self.getScoreByExerciseId(ex.id);
        if (score == undefined){
            return '';
        }
        s+='<li class="exerciseItem ' + score.get('status') + 'ExerciseItem"' +
        ' data-id="' + ex.id + '" >' + ex.get('name') + '' +
        '<i class="ti-check pull-right"> сделано</i><i class="ti-close pull-right"> не доделано</i>' +
        '</li>'
        return s;
    }

    this.getScoreByExerciseId = function(exId){
        var list = self.auditorSelectedUserScores;
        for (var i in list){
            if (list[i].get('exerciseId') == exId){
                return list[i];
            }
        }
    }


    this.getExerciseById = function(id){
        var list = self.auditorExercises;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.drawSelectedUserExercises = function(){
        var list = self.getSelectedUserAuditorExercises();
        var s = '';
        for (var i in list){
            s+=self.getExerciseHtml(list[i]);
        }
        $('#exercisesList').html(s);
    }



    this.getHeShePhraseHtml = function(h){
        var s = '';
        s+='<li class="heSheItem" data-id="' + h.id + '" >' + h.get('text').split('<br/>')[0] + '</li>';
        return s;
    }

    this.getPhraseById = function(id){
        var list = self.heShePharses;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initExerciseItem = function(){
        $('body').on('click', '.exerciseItem', function(){
            var id = $(this).attr('data-id');
            self.selectedExercise = self.getExerciseById(id);
            self.prepareSelectedExercise();
        });
    }



    this.drawSelectedExerciseUserAnswers = function(){
        console.log('drawSelectedExerciseUserAnswers occured');
        var list = self.auditorSelectedUserAnswers;
        var ex = self.selectedExercise;
        var cards = self.auditorSelectedCards;
        var s = '';
        //console.log();
        for (var i in list){
            var a = list[i];
            if (a.get('exerciseId') != ex.id){
                continue;
            }
            var card = self.getExerciseCardById(a.get('cardId'));
            if (card == undefined){
                console.log('no card with cardId = ', a.get('cardId'));
                console.log(a);
            }

            var cardHtml = self.getSimpleCardHtml(card);
            var transcriptHtml = card.get('transcript') == undefined ? '' : card.get('transcript');
            if (ex.get('exerciseType') == 'speaking'){
                console.log('drawing speaking item');
                s+='<li class="exerciseSpeakingItem" > ' +
                    '<span class="exerciseCardPlaceholder" > ' + cardHtml + '' + ' </span>' +
                    '<span class="exerciseTranscriptHtml" >' + transcriptHtml + '</span>' +
                    '<span class="exerciseAnswerAudio" >' +
                '<audio controls="1" src="' + a.get('answerUrl') + '" ></audio>' +
                '<a href="' + a.get('answerUrl') + '" target="_blank" class="downloadLink" >скачать</a>' +
                '</span>' +
                '</li>';
            }
            if (ex.get('exerciseType') == 'typing'){
                s+='<li class="exerciseTypingItem" >' +
                '<span class="exerciseCardPlaceholder"> ' + cardHtml + ' </span> ' + '' +
                '<span class="" ><span class="userAnswerText" >' + a.get('answerText') + '</span></span>' +
                '</li>';
            }
        }
        //console.log(s);
        $('#exerciseAnswersList').html(s);
        var score = self.getCurrentUserExerciseScore();
        if (score == undefined){
            return;
        }
        var ms = score.get('teacherFeedback');
        if (ms == undefined){
            ms = '';
        }
        //ms = ms.replace(/<br\/>/g, '\n');
        $('#auditorExerciseFeedback').val(ms);

        // prepare unfinish
        var score = self.getScoreByExerciseId(self.selectedExercise.id);
        console.log('preparing unfinishing: score = ', score);
        console.log('status = ' + score.get('status'));
        $('#unfinishButton').hide();
        if (score.get('status') == 'finished'){
            $('#unfinishButton').show();
        }
    }

    this.getExerciseCardById = function(id){
        var list = self.auditorSelectedCards;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initHeSheItem = function(){
        $('body').on('click', '.heSheItem', function(){
            var id = $(this).attr('data-id');
            self.selectedHeShePhrase = self.getPhraseById(id);
            self.prepareSelectedHeShePhrase();
        });
    }

    this.prepareSelectedExercise = function(){
        var ex = self.selectedExercise;
        self.loadSelectedExerciseCards(function(){
            self.prepareSelectedExerciseModal();
            $('#exerciseAnswersModal').modal();
        });
    }

    this.prepareSelectedExerciseModal = function(){
        var s = '';
        var ex = self.selectedExercise;
        $('#exerciseAnswerModalName').html(ex.get('name'));
        self.drawSelectedExerciseUserAnswers();

    }

    this.prepareSelectedHeShePhrase = function(){
        var p = self.selectedHeShePhrase;
        var list = self.getSelectedPhraseUserAnswers();
        var s = '';
        for (var i in list){
            var a = list[i];
            s+='<li class="heSheAnswerItem" data-id="' + a.id + '" ><span class="heSheMarks">' + a.get('marks').join(', ') + '</span><br/><audio controls="" src="' + a.get('answerUrl') +'" ></audio></li>';
        }
        $('#heSheAnswersList').html(s);
        $('#heSheAnswerModalName').html( p.get('text').split('<br/>')[0]);
        $('#heSheAnswersModal').modal();
    }

    this.getSelectedPhraseUserAnswers = function(){
        var arr = [];
        var p = self.selectedHeShePhrase;
        var list = self.heSheSelectedUserAnswers;
        for (var i in list){
            if (list[i].get('phraseId') == p.id){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.drawSelectedUserHeShePhrases = function(){
        var list = self.getSelectedUserHeSheExercises();
        var s = '';
        for (var i in list){
            s+= self.getHeShePhraseHtml(list[i]);
        }
        $('#heShePhrasesList').html(s);
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

    this.initLeaveFeedbackButton = function(){
        $('#auditorExerciseFeedbackButton').bind('click', function(){
            var score = self.getCurrentUserExerciseScore();
            if (score == undefined){
                toastr.error('Score is undefined');
                return;
            }
            var message = $('#auditorExerciseFeedback').val();
            //message = message.replace(/\n/g, '<br/>')
            score.set('teacherFeedback', message);
            enablePreloader();
            score.save().then(function(){
                disablePreloader();
                toastr.success('saved');
            });
        });
    }

    this.initUnfinishButton = function(){
        $('#unfinishButton').bind('click', function(){
            //alert('unfinish occured');
            var score = self.getScoreByExerciseId(self.selectedExercise.id);
            console.log('score = ', score);
            score.set('status', 'new');
            enablePreloader();
            score.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }

    this.loadUserQuestionaryAnswers = function(callback){
        var q = new Parse.Query(Parse.Object.extend('UserQuestionaryAnswer'));
        q.limit(1000);
        q.equalTo('userId', self.selectedUser.id);
        q.addAscending('questionId');
        enablePreloader();
        q.find(function(results){
            self.questionaryAnswers = results;
            callback();
            disablePreloader();
        });
    }

    this.loadAllQuestionaryQuestions = function(callback){
        var q = new Parse.Query(Parse.Object.extend('QuestionaryQuestion'));
        q.limit(1000);
        q.find(function(results){
            self.questionaryQuestions = results;
            callback();
        });
    }

    this.getQuestionById = function(id){
        var list = self.questionaryQuestions;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.getUserQuestionaryAnswerItem = function(a){
        var s = '';
        if (a.get('state1Answer') == undefined && a.get('state2Answer') == undefined && a.get('state3Answer') == undefined){
            return '';
        }
        var url = '';
        var arr = [1, 2, 3];
        var c = 1;
        for (var i in arr){
            var field = 'state' + arr[i] + 'Answer';
            if (a.get(field) != undefined){
                url = a.get(field);
                c = arr[i];
            }
        }
        var q = self.getQuestionById(a.get('questionId'));
        s+='<li class="userQuestionaryAnswerItem" data-id="' + a.id + '" >' +
        '<span class="questionText" >' + q.get('transcript') + '</span> <br/>' +
        '<span class="questionComplexity"> Сложность: ' + c + '</span> <br/>' +
        '<audio controls="" src="' + url + '" />' +
        '</li>';
        return s;
    }

    this.drawUserQuestionaryAnswers = function(){
        var s = '';
        var list = self.questionaryAnswers;
        for (var i in list){
            s+= self.getUserQuestionaryAnswerItem(list[i]);
        }
        $('#questionaryAnswersList').html(s);
    }

    this.getUserLinkByUserId = function(userId){
        var list = self.userLinks;
        for (var i in list){
            if (list[i].get('studentId') == userId){
                return list[i];
            }
        }
    }

    this.initDeleteUserFromGroupButton = function(){
        $('#deleteUserButton').bind('click', function(){
            var u = self.selectedUser;
            var name = u.get('firstName') + ' ' + u.get('lastName');
            if (confirm('Вы уверены, что хотите удалить из группы пользователя ' + name + ' ?') == false){
                return;
            }
            var link = self.getUserLinkByUserId(self.selectedUser.id);
            console.log('link = ', link);
            enablePreloader();
            link.destroy({
                success: function(){
                    disablePreloader();
                    window.location.href = window.location.href;
                }
            });
        });
    }

}