/**
 * Created by sabir on 18.07.15.
 */

var ExercisesDashboardManager = function(){
    var self = this;
    this.exercises = [];
    this.categories = [];
    this.selectedCategory = undefined;

    this.init = function(){
        initParse();

        self.loadCategories(function(){
            self.loadAuditorExercises(function(){
                self.drawCategories();
            });
        });
    }


    this.loadCategories = function(callback){
        var q = new Parse.Query(Parse.Object.extend('ExerciseCategory'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            self.categories = results;
            callback();
        });
    }


    this.loadAuditorExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        q.limit(1000);
        q.find(function(results){
            self.exercises = results;
            callback();
        });
    }



    this.drawCategories = function(){
        var s = '';
        var list = self.categories;
        for (var i in list){
            s+= self.getCategoryItem(list[i]);
        }
        $('#categories').html(s);
        $('.showButton').popup({
            inline: true,
            on: 'click',
            //position: 'top',
            lastResort: 'right center',
            popup: '#categoriesPopup',
            prefer: 'adjacent'
        });
        $('body').on('click', '.showButton', function(){
            console.log('show button clicked');
            self.selectedCategory = self.getCategoryById($(this).attr('data-id'));
            console.log(self.selectedCategory);
            self.prepareSelectedCategoryPopup();
        });
    }

    this.prepareSelectedCategoryPopup = function(){
        var c = self.selectedCategory;
        var list = self.getExercisesByTag(c.get('tag'));
        $('#exercisesNumber').html('Количество: ' + list.length + '');
        var s = '';
        for (var i in list){

            var ex = list[i];
            s+='<div class="card">' +
                '    <div class="content">' +
            '    <img class="right floated mini ui image" src="' + ex.get('imageUrl') + '">' +
            '    <div class="header">' +
            '' + ex.get('name') +
            '</div>' +
                    '<div class="meta"> <i class="icon tag" ></i>' +
                    '' + ex.get('tags').join(', ') +

                '</div>' +
                        '<div class="description">' +
                        '' + ex.get('description') + '' +
                        '</div>' +
            '</div>' +
                    '<div class="extra content">' +
                    '   <div class="ui two buttons">' +
                        //'   <div class="ui basic green button">Approve</div>' +
                        //'   <div class="ui basic red button">Decline</div>' +
                    '   </div>' +
                    ' </div>' +
                '</div>';
        }
        $('#exercisesPlaceholder').html(s);
    }


    this.getCategoryItem = function(c){
        var s = '';
        var ava = (c.get('avatar') == undefined || c.get('avatar') == '') ? 'http://beta.englishpatient.org/img/kitty.jpg' : c.get('avatar');
        var exList = self.getExercisesByTag(c.get('tag'));
        s+='<div class="ui card" style="display: inline-block; margin-left: 20px; margin-bottom: 20px;">' +
            '<div class="image">' +
            '<img src="' + ava + '">' +
            '</div>' +
            '<div class="content">' +
            '<a class="header">' + c.get('name') +'</a>' +
            '<div class="meta">' +
            '<span class="date"> <i class="icon tag"></i>' + c.get('tag') +'' +
            '' +
            ' | <i class="icon unordered list"></i> ' + exList.length +
            '</span>' +
            '</div>' +
            '<div class="description">' +
            '' + c.get('description') +
            '</div>' +
            '</div>' +
            '<div class="extra content">' +
            '<a>' +
                //'<i class="star icon"></i>' +
            '<button class="ui download primary button showButton" data-id="' + c.id + '" > <i class="icon eye"></i> View</button>' +
            '</a>' +
            '</div>' +
            '</div>';
        return s;
    }


    this.getExercisesByTag = function(tag){
        tag = tag.toLowerCase();
        var arr = [];
        var list = self.exercises;
        for (var i in list){
            var tags = list[i].get('tags');
            var f = false;
            for (var j in tags){
                var t = tags[j].toLowerCase();
                if (t == tag){
                    arr.push(list[i]);
                    continue;
                }
            }
        }
        return arr;
    }


    this.getCategoryById = function(id){
        var list = self.categories;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }





}