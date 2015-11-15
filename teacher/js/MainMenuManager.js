/**
 * Created by sabir on 23.03.15.
 */

var MainMenuManager = function(){
    var self = this;
    this.exerciseDemoManager = new TeacherExerciseDemoManager();
    this.auditorExercises = [];
    this.exerciseInfoModalId = 'exerciseInfoModal';
    this.selectedAuditorExercises = [];
    this.selectedAuditorExercise = undefined;
    this.articles = [];

    this.init = function(){
        initParse();
        self.initGroupBlocks();
        self.initAuditorExerciseItem();
        self.initAuditorExercisePanel();
        self.initArticlesPanelItem();
        console.log('MainMenuManager: init occured');
        enablePreloader();
        self.loadAuditorExercises(function(){
            enablePreloader('loading articles list');
            self.loadArticles(function(){
                self.drawArticlesList();
                disablePreloader();
            });
        });

    }

    this.loadArticles = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientArticle'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            self.articles = results;
            callback();
        });
    }

    this.getArticleItem = function(a){
        var s = '';
        s+='<div class="articlesItem">' +
            '<a href="http://article.englishpatient.org/article.php?id=' + a.id + '" target="_blank" >' +
                '<img src="' + a.get('imgSrc') + '" />' +
                '<div class="articleName" >' + a.get('name') + '</div>' +
                '</div>' +
            '</a>';
        return s;
    }

    this.drawArticlesList = function(){
        var s = '';
        var list = self.articles;
        for (var i in list){
            s+= self.getArticleItem(list[i]);
        }
        $('#articlesList').html(s);
    }



    this.initGroupBlocks = function(){
        $('.parentWidget').bind('click', function(){
            var name = $(this).attr('data-name');
            $('.childWidget[data-parent="' + name + '"]').toggle();
        });
    }

    this.loadAuditorExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            self.auditorExercises = results;
            self.selectedAuditorExercises = results;
            console.log(results);
            callback();
        });
    }

    this.showExerciseInfoModal = function(name, description, explainerVimeoId){
        name = (name == undefined || name == '') ? 'короткое название упражнения TODO (Yury)' : name;
        description = (description == undefined || description == '') ? 'То самое описание на 300 символов TODO (Yury)' : description;
        if (explainerVimeoId == undefined || explainerVimeoId == ''){
            explainerVimeoId = '124185879';
        }
        var explainerIframeHtml = '<iframe src="http://player.vimeo.com/video/' + explainerVimeoId + '?portrait=0&color=333" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

        self.drawSelectedAuditorExercises();
        $('#' + self.exerciseInfoModalId).modal();
        $('#auditorDescriptionBlock p').html(description);
        $('#auditorNameBlock').html(name);
        $('#explainerVideoPlaceholder').html(explainerIframeHtml);
        $('#explainerVideoBlock').show();
    }

    this.getExerciseItemHtml = function(ex){
        var s = '';
        s+='<figure class="auditorExerciseItem" data-id="' + ex.id + '" >' +
            '<img src="' + ex.get('imageUrl') + '" />' +
            '<span class="auditorExerciseTitle" >' + ex.get('name') + '</span>' +
        '</figure>';
        return s;
    }

    this.drawSelectedAuditorExercises = function(){
        var list = self.selectedAuditorExercises;
        var s = '';
        for (var i in list){
            s+= self.getExerciseItemHtml(list[i]);
        }
        $('#auditorExercisesList').html(s);
    }

    this.getExerciseById = function(exId){
        var list = self.auditorExercises;
        for (var i in list){
            if (list[i].id == exId){
                return list[i];
            }
        }
    }

    this.initAuditorExerciseItem = function(){
        $('body').on('click', '.auditorExerciseItem', function(){
            var id = $(this).attr('data-id');
            self.selectedAuditorExercise = self.getExerciseById(id);
            self.exerciseDemoManager.showExercise(id);
        });
    }

    this.initAuditorExercisePanel = function(){
        $('.auditorExercisePanel').bind('click', function(){
            var exType = $(this).attr('data-type');
            var exMedia = $(this).attr('data-media').split(',');
            self.filterAuditorExercises(exType, exMedia);
            var name = $(this).attr('data-name');
            var description = $(this).attr('data-description');
            self.showExerciseInfoModal(name, description);
        });
    }

    this.filterAuditorExercises = function(exType, mediaArray){
        var list = self.auditorExercises;
        var arr = [];
        for (var i in list){
            var ex = list[i];
            if (ex.get('exerciseType') != exType){
                continue;
            }
            var medias = ex.get('exerciseModeMedia');
            var f = false;
            for (var j in medias){
                if ($.inArray(medias[j], mediaArray) > -1){
                    f = true;
                }
            }
            if (f == true){
                arr.push(ex);
            }
        }
        self.selectedAuditorExercises = arr;
    }

    this.initArticlesPanelItem = function(){
        $('.articlesPanelItem').bind('click', function(){
            $('#articlesModal').modal();
        });
    }

}