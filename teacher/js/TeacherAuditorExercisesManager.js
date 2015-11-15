/**
 * Created by sabir on 28.12.14.
 */

var TeacherAuditorExercisesManager = function(){
    var self = this;
    this.exercises = [];
    this.editingExercise = undefined;
    this.currentUserManager = new CurrentUserManager();

    this.init = function(){
        initParse();
        self.initCreateNewExBlock();
        self.initDeleteButton();
        self.initEditingBlock();
        self.initExercisesList();
        self.currentUserManager.init(function(){

            self.loadExercises(function(){
                self.drawExercises();
            });
        });
    }

    this.loadExercises = function(callback){
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('Exercise'));
        q.limit(1000);
        q.descending('createdAt');
        q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        q.find(function(list){
            self.exercises = list;
            disablePreloader();
            callback();
        });

    }

    this.drawExercises = function(){
        var list = self.exercises;
        var s = '';
        for (var i in list){
            s+= self.getExercisePanelHtml(list[i]);
        }
        $('#exercisesList').html(s);
    }

    this.initExercisesList = function(){
        $('body').on('click', '.editButton', function(){
            var id = $(this).attr('data-id');
            self.editingExercise = self.getExerciseById(id);
            self.prepareEditingBlock();
        });
        $('body').on('click', '.accessButton', function(){
            var id = $(this).attr('data-id');
            console.log('changing access to ' + id);
            var ex = self.getExerciseById(id);
            var newAccess = (ex.get('access') == 'public') ? 'private' : 'public';
            ex.set('access', newAccess);
            enablePreloader();
            ex.save().then(function(){
                window.location.href = window.location.href;
            });
        });
    }

    this.getExercisePanelHtml = function(exercise){
        var s = '';
        if (exercise == undefined){
            return '';
        }
        s+= '<div class="switch-item hr legal mt5 exercisePanel " style="">'
        + '<section class="panel">'
        + '<div class="thumb">'
        + '<img class="img-responsive" alt="Responsive image" src="' + exercise.get('imageUrl') +'">'
        + '</div>'
        + '<div class="panel-body">'
        + '<div class="switcher-content">'
        + '<p>'
        + '<b>Name:</b><b style="color: firebrick;" >' + exercise.get('name') + '</b>'
        + '</p>'

        + '<p>'
        + '<b>Description:</b>' + exercise.get('description')
        + '</p>'

        + '<p>'
        + '<b>Task:</b>' + exercise.get('task')
        + '</p>'

        + '<a href="auditorExercise.html?id=' + exercise.id + '" class="show small"><i class="ti-eye" ></i> view</a>'
        + '<a href="javascript:void(0);" data-id="' + exercise.id +'" class="show small editButton"><i class="ti-pencil" ></i> edit</a>'
        + '<a href="javascript:void(0);" data-id="' + exercise.id +'" class="show small accessButton"><i class="ti-sharethis" ></i> <span class="' + exercise.get('access') + '" >' + exercise.get('access') + '</span> </a>'
        + '</div>'
        + '</div>'
        + '</section>'
        + '</div>';
        return s;
    }

    this.getExerciseById = function(id){
        for (var i in self.exercises){
            if (self.exercises[i].id == id){
                return self.exercises[i];
            }
        }
        return undefined;
    }

    this.prepareEditingBlock = function(){
        $('#editingBlock').removeClass('hide');
        var ex = self.editingExercise;
        $('#editName').val(ex.get('name'));
        $('#editImageUrl').val(ex.get('imageUrl'));
        $('#editDescription').val(ex.get('description'));
        $('#editVimeoId').val(ex.get('warmUpVimeoId') == undefined ? '' : ex.get('warmUpVimeoId'));
        $('#editHintText').val(ex.get('hintText') == undefined ? '' : ex.get('hintText'));
        $('#editTask').val(ex.get('task'));
        $('#editTags').val((ex.get('tags') == undefined) ? '' : ex.get('tags').join(', '));
        $('#editProContra').removeAttr('checked');
        if (ex.get('proContra') == true){
            $('#editProContra').attr('checked', true);
        }
    }

    this.initEditingBlock = function(){
        $('#editSaveButton').bind('click', function(){
            var name = $('#editName').val().trim();
            var imageUrl = $('#editImageUrl').val().trim();
            var description = $('#editDescription').val().trim();
            var warmUpVimeoId = $('#editVimeoId').val().trim();
            var task = $('#editTask').val().trim();
            var tagsString = $('#editTags').val().trim();
            var hintText = $('#editHintText').val().trim();
            var proContra = $('#editProContra').is(':checked');

            var tags = tagsString.split(',').map(function(t){return t.trim()});
            if (tags.length == 1 && tags[0] == ''){
                tags = [];
            }

            if (name == undefined || name == ''){
                alert('name is empty');
                return;
            }
            if (imageUrl == undefined || imageUrl == ''){
                imageUrl = 'http://disk.englishpatient.org/uploads/Ob5IRQi2MNI5gOM.png';
            }

            var ex = self.editingExercise;
            if (ex == undefined){
                return;
            }
            ex.set('name', name);
            ex.set('description', description);
            ex.set('task', task);
            ex.set('imageUrl', imageUrl);
            ex.set('warmUpVimeoId', warmUpVimeoId);
            ex.set('creatorId', self.currentUserManager.currentUser.id);
            ex.set('proContra', proContra);
            ex.set('hintText', hintText);
            ex.set('tags', tags);
            console.log('proContra = ' + proContra);
            ex.save().then(function(){
                disablePreloader();
                self.loadExercises(function(){self.drawExercises()});
            });
        });
    }

    this.initCreateNewExBlock = function(){
        $('#createNewExButton').bind('click', function(){
            var name = $('#newExName').val().trim();
            var imageUrl = $('#newExImageUrl').val().trim();
            var task = $('#newExTask').val().trim();
            var description = $('#newExDescription').val().trim();
            var exerciseType = $('#exerciseType').val();
            var newExTags = $('#newExTags').val().split(',').map(function(t){return t.trim()});
            if (newExTags.length == 1 && newExTags[0] == ''){
                newExTags = [];
            }

            var newExHintText = $('#newExHintText').val();
            var proContra = $('#newExProContra').is(':checked');

            var newExVimeoId = $('#newExVimeoId').val().trim();

            enablePreloader();
            if (name == undefined || name == ''){
                alert('name is empty');
                return;
            }
            if (imageUrl == undefined || imageUrl == ''){
                imageUrl = 'http://disk.englishpatient.org/uploads/Ob5IRQi2MNI5gOM.png';
            }
            var Exercise = Parse.Object.extend('Exercise');
            var ex = new Exercise();
            ex.set('creatorId', self.currentUserManager.currentUser.id);
            ex.set('name', name);
            ex.set('description', description);
            ex.set('task', task);
            if (newExVimeoId != ''){
                ex.set('warmUpVimeoId', newExVimeoId);
            }
            ex.set('imageUrl', imageUrl);
            ex.set('exerciseType', exerciseType);
            ex.set('tags', newExTags);
            ex.set('hintText', newExHintText);
            ex.set('playingModeMedia', self.getPlayingModeMedia());
            ex.set('exerciseModeMedia', self.getExerciseModeMedia());
            ex.set('proContra', proContra);
            ex.save().then(function(){
                disablePreloader();
                self.loadExercises(function(){self.drawExercises()});
            });
        });
    }

    this.deleteEditingExercise = function(){
        var ex = self.editingExercise;
        if (ex == undefined){
            return;
        }
        ex.destroy({
            success: function(){
                window.location.href = window.location.href;
            }
        });
    }

    this.initDeleteButton = function(){
        $('#deleteButton').bind('click', function(){
            self.deleteEditingExercise();
        });
    }

    this.getPlayingModeMedia = function(){
        var arr = [];
        $('#playingModeControls .modeCheckbox:checked').each(function(){
            arr.push($(this).attr('data-value'));
        });
        return arr;
    }

    this.getExerciseModeMedia = function(){
        var arr = [];
        $('#exerciseModeControls .modeCheckbox:checked').each(function(){
            arr.push($(this).attr('data-value'));
        });
        return arr;
    }
}