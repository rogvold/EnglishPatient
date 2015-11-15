/**
 * Created by sabir on 16.07.15.
 */

var TeacherAllSmacksManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.exercises = [];
    this.selectedExercise = undefined;
    this.remarkable = new Remarkable();

    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.loadExercises(function(){
                console.log(self.exercises);
                self.drawExercises();
                self.initButtons();
            });
        });
    }


    this.loadExercises = function(callback){
        var q = new Parse.Query(Parse.Object.extend('SmackExercise'));
        q.limit(1000);
        q.equalTo('creatorId', self.currentUserManager.currentUser.id);
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
            var d = list[i];
            s+= self.getExerciseItemHtml(d);
        }
        $('#exercisesList').html(s);
    }

    this.getExerciseItemHtml = function(d){
        var s = '';
        if (d == undefined){
            return '';
        }
        s+= '<div class="switch-item hr legal mt5 exercisePanel " style="">'
            + '<section class="panel">'
            + '<div class="thumb">'
            + '<img class="img-responsive" alt="Responsive image" src="' + d.get('avatar') +'">'
            + '</div>'
            + '<div class="panel-body">'
            + '<div class="switcher-content">'
            + '<p>'
            + '<b>Название:</b><b style="color: firebrick;" >' + d.get('name') + '</b>'
            + '</p>'

            + '<div>'
                + '<b>Описание:</b>' + self.remarkable.render(d.get('description'))
            + '</div>'

            + '<div>'
            + '<b>Сложность:</b>' + d.get('complexity')
            + '</div>'

            + '<a href="smack.html?id=' + d.id + '" class="show small"><i class="ti-eye" ></i> перейти к наполнению</a>'
            + '<a href="javascript:void(0);" data-id="' + d.id +'" class="show small editButton"><i class="ti-pencil" ></i> редактировать</a>'
            + '</div>'
            + '</div>'
            + '</section>'
            + '</div>';
        return s;
    }


    this.initButtons = function(){
        $('body').on('click','.editButton', function(){
            var dId = $(this).attr('data-id');
            self.selectedExercise = self.getExerciseById(dId);
            var d = self.selectedExercise;
            $('#editName').val(d.get('name'));
            $('#editDescription').val(d.get('description'));
            $('#editAvatar').val(d.get('avatar'));
            $('#editComplexity').val(d.get('complexity'));

            $('#editModal').modal();
        });
        $('#updateButton').bind('click', function(){
            var d = self.selectedExercise;
            d.set('name', $('#editName').val().trim());
            d.set('description', $('#editDescription').val().trim());
            d.set('avatar', $('#editAvatar').val().trim());
            d.set('complexity', +$('#editComplexity').val().trim());

            enablePreloader('saving...');
            d.save().then(function(){
                disablePreloader();
                $('#editModal').modal('hide');
                toastr.success('saved');
                window.location.href = window.location.href;
            });
        });

        $('#createButton').bind('click', function(){
            var SmackExercise = Parse.Object.extend('SmackExercise');
            var d = new SmackExercise();
            d.set('creatorId', self.currentUserManager.currentUser.id);
            var name = $('#name').val().trim();
            if (name == undefined || name == ''){
                toastr.error('Empty field!');
                return;
            }

            d.set('name', name);
            d.set('description', $('#description').val().trim());
            d.set('avatar', $('#avatar').val().trim());
            d.set('complexity', +$('#complexity').val().trim());

            d.save().then(function(){
                toastr.success('saved');
                window.location.href = window.location.href;
                return;
            });
        });

        $('#deleteButton').bind('click', function(){
            if (confirm('Are you sure?') == false){
                return;
            }
            self.selectedExercise.destroy({
                success: function(){
                    toastr.success('deleted!');
                    window.location.href = window.location.href;
                }
            });
        });

    }

    this.getExerciseById = function(id){
        var list = self.exercises;
        for (var i in list){
            var d = list[i];
            if (d.id == id){
                return d;
            }
        }
    }

}