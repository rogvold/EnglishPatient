/**
 * Created by sabir on 18.07.15.
 */

var ExTagsManager = function(){
    var self = this;
    this.exercises = [];
    this.tags = [];

    this.categories = [];

    this.selectedCategory = undefined;


    this.init = function(){
        initParse();
        self.initCreateButton();
        console.log('loading');
        self.loadAuditorExercises(function(){
            self.loadCategories(function(){
                console.log('loaded');
                self.drawTags();
                self.drawCategories();
                self.initEditButton();
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
            self.extractTags();
            callback();
        });
    }

    this.extractTags = function(){
        var map = {};
        var arr = [];
        var list = self.exercises;
        for (var i in list){
            var tags = list[i].get('tags');
            //console.log(tags);
            for (var j in tags){
                map[tags[j]] = map[tags[j]];
            }
        }
        for (var key in map){
            arr.push(key);
        }
        self.tags = arr;
    }

    this.drawTags = function(){
        var s = '';
        var list = self.tags;
        for (var i in list){
            var t = list[i];
            s+= '<li>' + t + '</li>';
        }
        $('#tagsList').html(s);
    }

    this.drawCategories = function(){
        var s = '';
        var list = self.categories;
        for (var i in list){
            s+= self.getCategoryItem(list[i]);
        }
        $('#categories').html(s);
    }

    this.getCategoryItem = function(c){
        var s = '';
        var ava = (c.get('avatar') == undefined || c.get('avatar') == '') ? 'http://beta.englishpatient.org/img/kitty.jpg' : c.get('avatar');
        s+='<div class="ui card" style="display: inline-block; margin-left: 20px; margin-bottom: 20px;">' +
            '<div class="image">' +
            '<img src="' + ava + '">' +
            '</div>' +
            '<div class="content">' +
            '<a class="header">' + c.get('name') +'</a>' +
            '<div class="meta">' +
            '<span class="date">' + c.get('tag') +'</span>' +
            '</div>' +
            '<div class="description">' +
                '' + c.get('description') +
                '</div>' +
                '</div>' +
                '<div class="extra content">' +
                '<a>' +
                //'<i class="star icon"></i>' +
                '<button class="ui download primary button editButton" data-id="' + c.id + '" > <i class="icon pencil"></i> EDIT</button>' +
                '</a>' +
                '</div>' +
                '</div>';
        return s;
    }

    this.initEditButton = function(){
        $('body').on('click', '.editButton', function(){
            self.selectedCategory = self.getCategoryById($(this).attr('data-id'));
            var c = self.selectedCategory;
            $('#editName').val(c.get('name'));
            $('#editDescription').val(c.get('description'));
            $('#editAvatar').val(c.get('avatar'));
            $('#editTag').val(c.get('tag'));
            $('#editModal').modal('show');
        });
        $('#updateButton').bind('click', function(){
            console.log('updateButton clicked');
            self.selectedCategory.set('name', $('#editName').val().trim());
            self.selectedCategory.set('description', $('#editDescription').val().trim());
            self.selectedCategory.set('avatar', $('#editAvatar').val().trim());
            self.selectedCategory.set('tag', $('#editTag').val().trim());
            self.selectedCategory.save().then(function(){

                self.loadCategories(function(){
                    self.drawCategories();
                });

            });
        });
    }

    this.getCategoryById = function(id){
        var list = self.categories;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }


    this.initCreateButton = function(){
        $('#createButton').bind('click', function(){
            var name = $('#name').val().trim();
            var description = $('#description').val().trim();
            var tag = $('#tag').val().trim();
            var avatar = $('#avatar').val().trim();
            var ExerciseCategory = Parse.Object.extend('ExerciseCategory');
            var c = new ExerciseCategory();
            c.set('name', name);
            c.set('tag', tag);
            c.set('description', description);
            c.set('avatar', avatar);
            c.save().then(function(){
                window.location.href = window.location.href;
            });
        });
    }

    this.initDeleteButton = function(){

    }


}