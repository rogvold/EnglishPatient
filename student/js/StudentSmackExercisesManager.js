/**
 * Created by sabir on 16.07.15.
 */

var StudentSmackExercisesManager = function(){
    var self = this;
    this.exercises = [];

    this.init = function(){
        initParse();
        self.loadExercises(function(){
            console.log('exercises = ', self.exercises);
            self.drawExercises();
        });
    }

    this.loadExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('SmackExercise'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            self.exercises = results;
            callback();
        });
    }

    this.drawExercises = function(){
        var s = '';
        var list = self.exercises;
        for (var i in list){
            var e = list[i];
            s+= '<li class="exItem" ><a target="_blank" href="smack.html?id=' + e.id + '" >' + e.get('name') + '</a></li>';
        }
        $('#exercisesList').html(s);
    }



}