/**
 * Created by sabir on 06.11.14.
 */

var UserDashboardManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.exercises = [];
    this.userScores = [];
    this.filteredExercises = [];


    this.init = function(){
        initParse();
        self.initFilters();
        enablePreloader();
        self.currentUserManager.init(function(){
            self.loadExercises(function(){
                self.loadUserScores(function(){
                    self.drawExercises();
                    disablePreloader();
                });
            });
        });
    }

    this.loadExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        q.descending('createdAt');
        q.find(function(list){
            self.exercises = list;
            self.filteredExercises = list;
            callback();
        });
    }

    this.drawExercises = function(){
        var list = self.filteredExercises;
        var s = '';
        for (var i in list){
            s += self.getExercisePanelHtml(list[i]);
        }
        $('#exercisesCards').html(s);
        $('#doneNumber').html(self.userScores.length);
        $('#notDoneNumber').html(self.exercises.length - self.userScores.length);
        $('#allNumber').html(self.exercises.length);
    }

    this.getExercisePanelHtml = function(exercise){
        var s = '';

        if (exercise == undefined){
            return '';
        }
        var answeredClass = (self.isAnsweredExercise(exercise.id) == true) ? 'ti-check' : 'ti-help-alt';

        s+= '<div class="switch-item hr legal mt5 exercisePanel bb " style="">'
            + '<section class="panel p0">' +
        '       <small class="pull-right "><i class="' + answeredClass + ' mr5"></i></small>'
            + '<div class="thumb">' +
            '<a href="exercise.html?id=' + exercise.id + '" >'
            + '<img class="img-responsive" alt="Responsive image" src="' + exercise.get('imageUrl') +'">' +
            '</a>'
            + '</div>'
            + '<div class="panel-body">'
            + '<div class="switcher-content">'
            + '<p class="mb0">'
            + '<h4 class="mt0 mb0"><a href="exercise.html?id='+ exercise.id +'">' + exercise.get('name') + ' </a></h4>'
            + '' +
        '   </p>'

            + '<p class="mb0">'
            + '<b>Description: </b>' + exercise.get('description')
            + '</p>'

            + '<p class="mb0">'
            + '<b>Task: </b>' + exercise.get('task')
            + '</p>'
            + '</div>'
            + '</div>'
            + '</section>'
            + '</div>';
        return s;
    }

    this.loadUserScores = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('UserExerciseScore'));
        q.limit(1000);
        q.equalTo('userId', self.currentUserManager.currentUser.id);
        q.equalTo('status', 'finished');
        q.find(function(results){
            disablePreloader();
            self.userScores = results;
            callback();
        });
    }

    this.isAnsweredExercise = function(exId){
        var list = self.userScores;
        for (var i in list){
            if (list[i].get('exerciseId') == exId){
                return true;
            }
        }
        return false;
    }

    this.getExerciseById = function(id){
        var list = self.exercises;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initFilters = function(){
        $('#allFilterButton').click(function(){
            self.filteredExercises = self.exercises;
            self.drawExercises();
        });
        $('#doneFilterButton').click(function(){
            var arr = [];
            var list = self.userScores;
            for (var i in list){
                arr.push(self.getExerciseById(list[i].get('exerciseId')));
            }
            self.filteredExercises = arr;
            console.log('done = ', arr);
            self.drawExercises();
        });
        $('#notDoneFilterButton').click(function(){
            var arr = [];
            var list = self.exercises;
            for (var i in list){
                if (self.isAnsweredExercise(list[i].id) == false){
                    arr.push(list[i]);
                }
            }
            console.log('notDone = ', arr);
            self.filteredExercises = arr;
            self.drawExercises();
        });
    }


}