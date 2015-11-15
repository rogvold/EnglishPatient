/**
 * Created by sabir on 04.01.15.
 */

var TeacherAssignmentManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.class = undefined;
    this.assignments = [];
    this.auditorExercises = [];
    this.smackExercises = [];
    this.heShePhrases = [];
    this.selectedAuditorExercise = undefined;
    this.selectedHeShePhrase = undefined;
    this.selectedArticle = undefined;
    this.selectedDialog = undefined;
    this.selectedSmackExercise = undefined;
    this.articles = [];
    this.questionaryState = undefined;
    this.dialogState = undefined;
    this.remarkable = new Remarkable();
    this.dialogs = [];
    this.selectedAssignment = undefined;

    this.init = function(callback){
        console.log('TeacherAssignmentManager: init()');
        initParse();
        self.initExerciseItem();
        self.initSmackExerciseItem();
        self.initPhraseItem();
        self.initArticleItem();
        self.initDialogItem();
        self.initQuestionaryCheckboxes();
        self.initDialogCheckboxes();
        self.initCreateAssignmentButton();
        self.initDeleteAssignmentButton();
        self.initUpdateButton();
        self.initEditAssignmentButton();
        self.currentUserManager.init(function(){
            if (self.currentUserManager.currentUser.get('userRole') != 'teacher') {
                window.location.href = '/index.html';
            }
            enablePreloader();
                self.loadCurrentClass(function(){
                    console.log('current class is loaded', self.class);
                    self.loadAssignments(function(){
                        console.log('assignments loaded', self.assignments);
                        self.loadAllExercisesAndArticles(function(){
                            self.drawAssignments();
                            self.drawModals();
                            disablePreloader();
                            if (callback != undefined){
                                callback();
                            }
                        });
                    });
                });

        });
    }

    this.loadCurrentClass = function(callback){
        var classId = gup('id');
        if (classId == undefined){
            toastr.error('class id is not defined');
            return;
        }
        var q = new Parse.Query(Parse.Object.extend('PatientClass'));
        q.limit(1000);
        enablePreloader();
        q.get(classId, {
            success: function(c){
                self.class = c;
                disablePreloader();
                callback();
            }
        });
    }

    this.loadAssignments = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientAssignment'));
        q.equalTo('classId', self.class.id);
        q.addDescending('createdAt');
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.assignments = results;
            disablePreloader();
            callback();
        });
    }

    this.initDeleteAssignmentButton = function(){
        $('body').on('click', '.deleteAssignmentButton', function(){
            console.log('deleteAssignmentButton clicked');
            var id = $(this).attr('data-id');
            var ass = self.getAssignmentById(id);
            if (confirm('Вы уверены, что хотите удалить это задание?') == false){
                return;
            }
            enablePreloader();
            ass.destroy({
                success: function(){
                    disablePreloader();
                    window.location.href = window.location.href;
                }
            });

        });
    }

    this.initEditAssignmentButton = function(){
        //editAssignmentButton
        $('body').on('click', '.editAssignmentButton', function(){
            console.log('editAssignmentButton clicked');
            var id = $(this).attr('data-id');
            var ass = self.getAssignmentById(id);
            self.selectedAssignment = ass;
            $('#editDescription').val(ass.get('description'));
            $('#editName').val(ass.get('name'));
            $('#editModal').modal();
        });
    }

    this.initUpdateButton = function(){
        $('#updateButton').bind('click', function(){
            var description = $('#editDescription').val().trim();
            var name = $('#editName').val().trim();
            self.selectedAssignment.set('description', description);
            self.selectedAssignment.set('name', name);
            enablePreloader();
            self.selectedAssignment.save().then(function(){
                disablePreloader();
                toastr.success('Saved!');
                window.location.href = window.location.href;
            });
        });
    }

    this.getAssignmentById = function(id){
        var list = self.assignments;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.getAssignmentItemHtml = function(ass){
        var s = '';
        s+='<section class="widget">'+
        '<div class="row equal-blocks no-m">'+
        '<i class="ti-trash pull-right deleteAssignmentButton" data-id="' + ass.id +'" ></i>' +
        '<i class="ti-pencil pull-right editAssignmentButton" data-id="' + ass.id +'" ></i>' +
        '<div class="col-xs-3 block">'+
        '<div class="text-center">'+
        '<i class="fa fa-file-text fa-5x text-info"></i>'+
        '<h6 class="text-uppercase">' + ass.get('name') + '</h6>'+
        '</div>'+
        '</div>'+
        '<div class="col-xs-9 block bg-primary brtr brbr p25">' +
        ''+
        '<div class="arrow left"></div>'+
        '<div class="widget-body">'+
        '<em>'+ self.remarkable.render(ass.get('description')) + '' +
        '<div class="tasksBlock"> ' + self.getTasksHtml(ass) +  '</div>' +
        '</em>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</section>';
        return s;
    }

    this.drawAssignments = function(){
        var list = self.assignments;
        var s = '';
        for (var i in list){
            s+=self.getAssignmentItemHtml(list[i]);
        }
        $('#assignmentsList').html(s);
    }

    this.loadAuditorExercises = function(callback){
        var q1 = new Parse.Query(Parse.Object.extend('Exercise'));
        q1.limit(1000);
        q1.equalTo('creatorId', self.currentUserManager.currentUser.id); // exercises created by me

        var q2 = new Parse.Query(Parse.Object.extend('Exercise'));
        q2.limit(1000);
        q2.notEqualTo('creatorId', self.currentUserManager.currentUser.id);
        q2.equalTo('access', 'public'); // not mine public exercises

        var q = Parse.Query.or(q1, q2);
        q.limit(1000);

        enablePreloader();
        q.find(function(results){
            self.auditorExercises = results;
            disablePreloader();
            callback();
        });

    }

    this.loadHeShePhrases = function(callback){
        var q = new Parse.Query(Parse.Object.extend('HeShePhrase'));
        q.limit(1000);
        q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        enablePreloader();
        q.find(function(results){
            self.heShePhrases = results;
            disablePreloader();
            callback();
        });
    }

    this.loadAllExercisesAndArticles = function(callback){
        self.loadAuditorExercises(function(){
           self.loadHeShePhrases(function(){
               self.loadArticles(function(){
                   self.loadDialogs(function(){
                       self.loadSmackExercises(function(){
                           callback();
                       });
                   });
               });
           });
        });
    }

    this.loadSmackExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('SmackExercise'));
        q.limit(1000);
        q.addDescending('createdAt');
        //q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        q.find(function(results){
            self.smackExercises = results;
            callback();
        });
    }

    this.loadDialogs = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientDialog'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        q.find(function(results){
            self.dialogs = results;
            callback();
        });
    }

    this.loadArticles = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientArticle'));
        q.limit(1000);
        q.equalTo('ownerId',self.currentUserManager.currentUser.id);
        q.addAscending('name');
        enablePreloader();
        q.find(function(results){
            self.articles = results;
            disablePreloader();
            callback();
        });
    }

    this.drawExercisesModal = function(){
        var list = self.auditorExercises;
        var s = '';
        for (var i in list){
            var e = list[i];
            var ownershipClass = 'myExercise';
            if (e.get('creatorId') != self.currentUserManager.currentUser.id){
                ownershipClass = 'notMyExercise';
            }
            s+='<li title="' + e.get('description') +'" class="exerciseItem ' + ownershipClass + '" data-id="' + e.id + '"  >' + e.get('name') + '</li>';
        }
        $('#auditorExercisesModalList').html(s);
    }

    this.drawSmackExercisesModal = function(){
        var list = self.smackExercises;
        var s = '';
        for (var i in list){
            var e = list[i];
            s+='<li title="' + e.get('description') + '" class="smackExerciseItem" data-id="' + e.id + '"  >' + e.get('name') + '</li>';
        }
        $('#smackExercisesModalList').html(s);
    }

    this.drawHeShePhrasesModal = function(){
        var list = self.heShePhrases;
        var s = '';
        for (var i in list){
            var p = list[i];
            var examples = p.get('text').split('<br/>');
            s+='<li class="phraseItem" data-id="' + p.id + '" >' + examples[0] + '</li>';
        }
        $('#heSheModalList').html(s);
    }


    this.drawArticlesModal = function(){
        var list = self.articles;
        var s = '';
        for (var i in list){
            var a = list[i];
            s+='<li class="articleItem" data-id="' + a.id + '" >' + a.get('name') + '</li>';
        }
        $('#articlesModalList').html(s);
    }

    this.drawDialogsModal = function(){
        var list = self.dialogs;
        var s = '';
        for (var i in list){
            var d = list[i];
            s+='<li class="dialogItem" data-id="' + d.id + '" >' + d.get('name') + '</li>';
        }
        $('#dialogsModalList').html(s);
    }

    this.drawModals = function(){
        self.drawExercisesModal();
        self.drawHeShePhrasesModal();
        self.drawArticlesModal();
        self.drawDialogsModal();
        self.drawSmackExercisesModal();
    }

    this.drawSelectedTasksPlaceholder = function(){
        if (self.selectedArticle != undefined){
            var a = self.selectedArticle;
            var s = '<span class="selectedArticle" >' + a.get('name') + '</span>';
            $('#selectedArticlePlaceholder').html(s);
        }
        if (self.selectedAuditorExercise != undefined){
            var ex = self.selectedAuditorExercise;
            var s = '<span class="selectedExercise" >' + ex.get('name') + '</span>';
            $('#selectedExercisePlaceholder').html(s);
        }
        if (self.selectedHeShePhrase != undefined){
            var p = self.selectedHeShePhrase;
            var examples = p.get('text').split('<br/>');
            var s = '<span class="selectedPhrase" >' + examples[0] + '</span>';
            $('#selectedPhrasePlaceholder').html(s);
        }
        if (self.questionaryState != undefined){
            var s = '<span class="selectedQuestionary" >Опросник. Уровень: ' + self.questionaryState + '</span>';
            $('#selectedQuestionaryPlaceholder').html(s);
        }
        if (self.dialogState != undefined && self.selectedDialog != undefined){
            var s = '<span class="selectedQuestionary" >Диалог (' + self.selectedDialog.get('name') + '). Уровень: ' + self.dialogState + '</span>';
            $('#selectedDialogPlaceholder').html(s);
        }
        if (self.selectedSmackExercise != undefined){
            var ex = self.selectedSmackExercise;
            var s = '<span class="selectedSmackExercise" >Упражнение на заполнение пропусков: <b>' + ex.get('name') + '</b></span>';
            $('#selectedSmackExercisePlaceholder').html(s);
        }
    }
    
    this.initExerciseItem = function(){
        $('body').on('click', '.exerciseItem', function(){
            $('.exerciseItem').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            var ex = self.getExerciseById(id);
            self.selectedAuditorExercise = ex;
            self.drawSelectedTasksPlaceholder();
        });
    }

    this.initSmackExerciseItem = function(){
        $('body').on('click', '.smackExerciseItem', function(){
            $('.smackExerciseItem').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            var ex = self.getSmackExerciseById(id);
            self.selectedSmackExercise = ex;
            self.drawSelectedTasksPlaceholder();
        });
    }

    this.getSmackExerciseById = function(id){
        var list = self.smackExercises;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initQuestionaryCheckboxes = function(){
        $('.questionaryCheckbox').change(function(){
            if(this.checked) {
                $('.questionaryCheckbox').prop('checked', false);
                $(this).prop('checked', true);
                //Do stuff
            }else{
                $('.questionaryCheckbox').prop('checked', false);
                $(this).prop('checked', true);
            }
            var state = parseInt($(this).attr('data-state'));
        });
        $('#selectQuestionaryButton').bind('click', function(){
            self.questionaryState = parseInt($('.questionaryCheckbox:checked').attr('data-state'));
            self.drawSelectedTasksPlaceholder();
            $('#questionaryModal').modal('hide');
        });
    }

    this.initDialogCheckboxes = function(){
        $('.dialogCheckbox').change(function(){
            if(this.checked) {
                $('.dialogCheckbox').prop('checked', false);
                $(this).prop('checked', true);
                //Do stuff
            }else{
                $('.dialogCheckbox').prop('checked', false);
                $(this).prop('checked', true);
            }
            var state = parseInt($(this).attr('data-state'));
        });
        $('#selectDialogButton').bind('click', function(){
            self.dialogState = parseInt($('.dialogCheckbox:checked').attr('data-state'));
            self.drawSelectedTasksPlaceholder();
            $('#dialogModal').modal('hide');
        });
    }

    this.initPhraseItem = function(){
        $('body').on('click', '.phraseItem', function(){
            $('.phraseItem').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            var p = self.getPhraseById(id);
            self.selectedHeShePhrase = p;
            self.drawSelectedTasksPlaceholder();
        });
    }

    this.initArticleItem = function(){
        $('body').on('click', '.articleItem', function(){
            var id = $(this).attr('data-id');
            self.selectedArticle = self.getArticleById(id);
            $('.articleItem').removeClass('active');
            $(this).addClass('active');
            self.drawSelectedTasksPlaceholder();
        });
    }

    this.initDialogItem = function(){
        $('body').on('click', '.dialogItem', function(){
            var id = $(this).attr('data-id');
            self.selectedDialog = self.getDialogById(id);
            $('.dialogItem').removeClass('active');
            $(this).addClass('active');
            self.drawSelectedTasksPlaceholder();

            //self.selectedArticle = self.getArticleById(id);
            //$('.articleItem').removeClass('active');
            //$(this).addClass('active');
            //self.drawSelectedTasksPlaceholder();
        });
    }

    this.getDialogById = function(id){
        var list = self.dialogs;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.getArticleById = function(id){
        var list = self.articles;
        for (var i in list){
            if (list[i].id == id){
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


    this.getPhraseById = function(id){
        var list = self.heShePhrases;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initCreateAssignmentButton = function(){
        $('#createAssignmentButton').bind('click', function(){
            var name = $('#assignmentName').val().trim();
            var description = $('#assignmentDescription').val().trim();
            if (name == ''){
                toastr.error('Name is not defined');
                return;
            }

            var ex = self.selectedAuditorExercise;
            var smackEx = self.selectedSmackExercise;
            var p = self.selectedHeShePhrase;
            var art = self.selectedArticle;
            var dialog = self.selectedDialog;


            var PatientAssignment = Parse.Object.extend('PatientAssignment');
            var a = new PatientAssignment();
            a.set('classId', self.class.id);
            a.set('name', name);
            a.set('description', description);

            if (ex != undefined){
                a.set('exerciseId', ex.id);
            }

            if (smackEx != undefined){
                a.set('smackExerciseId', smackEx.id);
            }

            if (p != undefined){
                a.set('phraseId', p.id);
            }
            if (dialog != undefined){
                a.set('dialogId', dialog.id);
            }

            if (art != undefined){
                a.set('articleId', art.id);
            }
            if (self.questionaryState != undefined){
                a.set('questionaryState', self.questionaryState);
            }

            if (self.dialogState != undefined){
                a.set('dialogState', self.dialogState);
            }




            enablePreloader();
            a.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }


    this.getTasksHtml = function(assignment){
        var a = assignment;
        var s = '';
        if (a.get('articleId') != undefined){
            var art = self.getArticleById(a.get('articleId'));
            if (art != undefined){
                s+='<li class="assignmentArticle" data-id="' + art.id + '" >Статья <a target="_blank" href="http://article.englishpatient.org/article.php?id=' + art.id + '" >' + art.get('name') + '</a></li>'
            }
        }
        if (a.get('exerciseId') != undefined){
            var ex = self.getExerciseById(a.get('exerciseId'));
            if (ex!= undefined){
                s+='<li class="assignmentExercise" data-id="' + ex.id + '" >Упражнение (аудитор) <a target="_blank" href="auditorExercise.html?id=' + ex.id + '" >' + ex.get('name') + '</a></li>';
            }
        }

        if (a.get('smackExerciseId') != undefined){
            var ex = self.getSmackExerciseById(a.get('smackExerciseId'));
            if (ex!= undefined){
                s+='<li class="assignmentSmackExercise" data-id="' + ex.id + '" ><a target="_blank" href="smack.html?id=' + ex.id + '" >Упражнение на заполнение пропусков <b>' + ex.get('name') + '</b></a></li>';
            }
        }

        if (a.get('dialogId') != undefined){
            var ex = self.getDialogById(a.get('dialogId'));
            if (ex!= undefined){
                s+='<li class="assignmentDialog" data-id="' + ex.id + '" ><a target="_blank" href="dialog.html?id=' + ex.id + '" >Диалог <b>' + ex.get('name') + '</b></a></li>';
            }
        }

        if (a.get('phraseId') != undefined){
            var p = self.getPhraseById(a.get('phraseId'));
            if (p != undefined){
                s+='<li class="assignmentPhrase" target="_blank" data-id="' + p.id + '"  >Упражнение HE/SHE <a href="heshe.html?id=' + p.id + '">' + p.get('text').replace(/\[/g, '<b>').replace(/\]/g, '</b>').split('<br/>')[0]  + '</a></li>';
            }
        }

        if (a.get('questionaryState') != undefined){
            s+='<li class="assignmentQuestionary" target="_blank"  ><a href="javascript: void(0);">Опросник, сложность: ' + a.get('questionaryState') + '</a></li>';
        }




        return s;
    }




}