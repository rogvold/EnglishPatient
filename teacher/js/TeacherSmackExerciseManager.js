/**
 * Created by sabir on 16.07.15.
 */

var TeacherSmackExerciseManager = function(){
    var self = this;
    this.smacks = [];
    this.exercise = undefined;
    this.selectedSmack = undefined;
    this.currentUserManager = new CurrentUserManager();


    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.loadExercise(function(){
                console.log('smacks loaded: ', self.smacks);
                self.loadSmacks(function(){
                    self.drawSmacks();

                    self.initCreateButton();
                    self.initSmackItemEditLink();
                    self.initUpdateButton();
                    self.initDeleteButton();
                });
            });
        });
    }

    this.loadExercise = function(callback){
        var q = new Parse.Query(Parse.Object.extend('SmackExercise'));
        var id = gup('id');
        q.get(id, {
            success: function(ex){
                self.exercise = ex;
                callback();
            }
        });
    }

    this.loadSmacks = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientSmack'));
        q.equalTo('exerciseId', self.exercise.id);
        q.addAscending('number');
        q.limit(1000);
        q.find(function(results){
            self.smacks = results;
            callback();
        });
    }

    this.drawSmacks = function(){
        var list = self.smacks;
        var s = '';
        for (var i in list){
            s+= self.getSmackItem(list[i]);
        }
        $('#smacksList').html(s);
        $('body').on('click', '.editLink', function(){
            var id = $(this).attr('data-id');
            self.selectedSmack = self.getSmackById(id);
            self.prepareEditModal();
        });
    }

    this.prepareEditModal = function(){
        var s = self.selectedSmack;
        $('#editModal').modal();
        $('#editText').val(s.get('text'));
        $('#editVimeoImgSrc').val(s.get('vimeoImgSrc'));
        $('#editVimeoId').val(s.get('vimeoId'));
    }

    this.initUpdateButton = function(){
        $('#updateButton').bind('click', function(){
            var text = $('#editText').val().trim();
            if (self.textIsOk(text) == false){
                toastr.error('text id not OK');
                return;
            }
            self.selectedSmack.set('text', text);
            var vimeoId = $('#editVimeoId').val().trim();
            loadVimeoInfo(vimeoId, function(data){
                var duration = data.duration;
                var vimeoImgSrc = data.thumbnail_large;
                self.selectedSmack.set('duration', duration);
                self.selectedSmack.set('vimeoImgSrc', vimeoImgSrc);
                self.selectedSmack.save().then(function(){
                    toastr.success('updated!!!');
                    window.location.href = window.location.href;
                });
            });
        });
    }

    this.getSmackItem = function(sm){
        var s = '';
        s+='<div class="smackItem" data-id="' + sm.id + '" >' +
            '<div class="avatarPlaceholder">' +
            '<img src="' + sm.get('vimeoImgSrc') + '" />' +
            '</div>' +
            '<div class="textPlaceholder" >' +
            '' + sm.get('text') +
            '</div>' +
            '<div class="controlsPlaceholder" ><a class="editLink" data-id="' + sm.id + '" href="javascript: void(0);" ><i class="fa fa-pencil"></i> Edit</a>' +
            '</div>' +
            '' +
            '</div>';
        return s;
    }

    this.getSmackById = function(id){
        var list = self.smacks;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }


    this.textIsOk = function(text){
        if (text.indexOf('[') == -1 || text.indexOf(']') == -1){
            return false;
        }
        if (text.indexOf(']') <= text.indexOf('[')){
            return false;
        }
        return true;
    }

    this.initCreateButton = function(){
        $('#createButton').bind('click', function(){
            var text = $('#text').val().trim();
            if (self.textIsOk(text) == false){
                toastr.error('text is no OK! the template is "text text text [XXXX] text text text"');
                return;
            }
            var PatientSmack = Parse.Object.extend('PatientSmack');
            var smack = new PatientSmack();
            smack.set('exerciseId', self.exercise.id);
            smack.set('number', self.smacks.length);
            smack.set('text', text);
            var vimeoId = $('#vimeoId').val().trim();
            smack.set('vimeoId', vimeoId);
            loadVimeoInfo(vimeoId, function(data){
                var duration = data.duration;
                var vimeoImgSrc = data.thumbnail_large;
                smack.set('duration', duration);
                smack.set('vimeoImgSrc', vimeoImgSrc);
                smack.save().then(function(){
                    toastr.success('created!!!');
                    window.location.href = window.location.href;
                });
            });
        });
    }

    this.isLastSmack = function(id){
        var list  = self.smacks;
        if (list.length == 0){
            return false;
        }
        return (list[list.length - 1].id == id);
    }

    this.initSmackItemEditLink = function(){
        $('body').on('click', '.editLink', function(){
            var id = $(this).attr('data-id');
            self.selectedSmack = self.getSmackById(id);
            $('#editModal').modal();
            var s = self.selectedSmack;
            $('#editText').val(s.get('text'));
            $('#editVImeoId').val(s.get('vimeoId'));
            $('#deleteButton').hide();
            if (self.isLastSmack(id) == true){
                $('#deleteButton').show();
            }
        });
    }

    this.initDeleteButton = function(){
        $('#deleteButton').bind('click', function(){
            if (confirm('Вы уверены? ') == false){
                return;
            }
            if (self.isLastSmack(self.selectedSmack.id) == true){
                self.selectedSmack.destroy({
                    success: function(){
                        toastr.success('deleted!');
                        window.location.href = window.location.href;
                    }
                });
            }
        });
    }


}