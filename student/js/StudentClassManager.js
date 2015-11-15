/**
 * Created by sabir on 05.01.15.
 */

var StudentClassManager = function(){
    var self = this;
    this.class = undefined;
    this.assignments = [];
    this.auditorExercises = [];
    this.heShePhrases = [];
    this.smackExercises = [];
    this.articles = [];
    this.dialogs = [];
    this.currentManager = new CurrentUserManager();
    this.remarkable = new Remarkable();

    this.init = function(){
        initParse();
        self.currentManager.init(function(){
            self.loadCurrentClass(function(){
                self.loadAssignments(function(){
                    self.loadAllExercisesAndArticles(function(){
                        self.drawAssignments();
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
        enablePreloader();
        q.get(classId, {
            success: function(c){
                self.class = c;
                $('.className').html(c.get('name'));
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

    this.drawAssignments = function(){
        var list = self.assignments;
        var s = '';
        for (var i in list){
            console.log('getAssignmentItemHtml', list[i]);
            s+=self.getAssignmentItemHtml(list[i]);
        }
        $('#assignmentsList').html(s);
    }


    this.getAssignmentItemHtml = function(ass){
        var s = '';
        s+='<section class="widget">'+
        '<div class="row equal-blocks no-m">'+
        '<div class="col-xs-3 block">'+
        '<div class="text-center">'+
        '<i class="fa fa-file-text fa-5x text-info"></i>'+
        '<h6 class="text-uppercase">' + ass.get('name') + '</h6>'+
        '</div>'+
        '</div>'+
        '<div class="col-xs-9 block bg-primary brtr brbr p25">'+
        '<div class="arrow left"></div>'+
        '<div class="widget-body">' +
        '<em>'+ self.remarkable.render(ass.get('description')) + '' +
        '<div class="tasksBlock"> ' + self.getTasksHtml(ass) +  '</div>' +
        '</em>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</section>';
        console.log(s);
        return s;
    }

    this.getTasksHtml = function(assignment){
        console.log('getTasksHtml ass = ', assignment);
        var a = assignment;
        var s = '';
        if (a.get('articleId') != undefined){
            var artId = a.get('articleId');
            var art = self.getArticleById(a.get('articleId'));
            if (art != undefined){
                //s+='<li class="assignmentArticle" data-id="' + art.id + '" >Заметка: <a style="font-weight: bold;" target="_blank" href="http://article.englishpatient.org/article.php?id=' + art.id + '" >' + art.get('name') + '</a></li>'
                s+='<li class="assignmentArticle" data-id="' + art.id + '" >Заметка: <a style="font-weight: bold;" class="articleLink" data-articleId="' + art.id + '" href="javascript: void(0);" >' + art.get('name') + '</a></li>'

            }
        }
        if (a.get('exerciseId') != undefined){
            var ex = self.getExerciseById(a.get('exerciseId'));
            if (ex != undefined){
                s+='<li class="assignmentExercise" data-id="' + ex.id + '" >Упражнение: <a style="font-weight: bold;" target="_blank" href="auditorExercise.html?id=' + ex.id + '&classId=' + self.class.id +  '" >' + ex.get('name') + '</a></li>';
            }
        }

        if (a.get('smackExerciseId') != undefined){
            var ex = self.getSmackExerciseById(a.get('smackExerciseId'));
            if (ex != undefined){
                s+='<li class="assignmentSmackExercise" data-id="' + ex.id + '" >Упражнение на заполнение пропусков: <a style="font-weight: bold;" target="_blank" href="smack.html?id=' + ex.id + '&classId=' + self.class.id +  '" >' + ex.get('name') + '</a></li>';
            }
        }

        if (a.get('dialogId') != undefined){

            var dialog = self.getDialogById(a.get('dialogId'));

            console.log('dialog = ', dialog);
            var dialState = (a.get('dialogState') == undefined) ? 1 : a.get('dialogState');
            //if (dialog != undefined){
            //    if (a.get('dialogState') != undefined){
                    s+='<li class="assignmentDialog" data-id="' + dialog.id + '" >Диалог: <a style="font-weight: bold;" target="_blank" href="dialog.html?id=' + dialog.id + '&state=' + dialState + '&classId=' + self.class.id +  '&dialogState=' + a.get('dialogState') + '" >' + dialog.get('name') + '</a></li>';
                //}
            //}
        }

        if (a.get('phraseId') != undefined){
            var p = self.getPhraseById(a.get('phraseId'));
            if (p != undefined){
                s+='<li class="assignmentPhrase" target="_blank" data-id="' + p.id + '"  ><a href="heshe.html?id=' + p.id + '&classId=' + self.class.id + '">' + p.get('text').replace(/\[/g, '<b>').replace(/\]/g, '</b>').split('<br/>')[0] + '</a></li>';
            }
            //s+='<li class="assignmentPhrase" target="_blank" data-id="' + p.id + '"  ><a href="heshe.html?id=' + p.id + '">' + p.get('name') + '</a></li>';
        }

        if (a.get('questionaryState') != undefined){
            s+='<li class="assignmentQuestionary" target="_blank"  ><a href="questionary.html?state=' + a.get('questionaryState') + '">Опросник, сложность: ' + a.get('questionaryState') + '</a></li>';
        }

        console.log(' --- >>>>   getTasksHtml');
        console.log(s);
        return s;
    }



    this.getDialogById = function(id){
        var list = self.dialogs;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.loadHeShePhrases = function(callback){
        var q = new Parse.Query(Parse.Object.extend('HeShePhrase'));
        q.limit(1000);
        //q.equalTo('creatorId', self.currentUserManager.currentUser.id);
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
        q.find(function(results){
            console.log('all dialogs loaded: ', results);
            self.dialogs = results;
            callback();
        });
    }

    this.loadAuditorExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        q.limit(1000);
        //q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        enablePreloader();
        q.find(function(results){
            self.auditorExercises = results;
            disablePreloader();
            callback();
        });

    }

    this.loadArticles = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientArticle'));
        q.limit(1000);
        //q.equalTo('ownerId',self.currentUserManager.currentUser.id);
        q.addAscending('name');
        enablePreloader();
        q.find(function(results){
            self.articles = results;
            disablePreloader();
            callback();
        });
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

    this.getSmackExerciseById = function(id){
        var list = self.smackExercises;
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


}