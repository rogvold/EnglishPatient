/**
 * Created by sabir on 08.07.15.
 */

var MaterialsSauronManager = function(){
    var self = this;
    this.materials = [];
    this.dayStartTimestamp = moment().startOf('day').unix() * 1000;
    this.todayNumber = 0;
    this.selectedMaterial = undefined;
    this.todayUsersMap = {};


    this.init = function(){
        $('#picsPlaceholder').hide();
        initParse();
        enablePreloader();
        self.initControlButtons();
        self.loadMaterials(function(){
            self.loadTeachers(function(){
                self.drawMaterials();
                disablePreloader();
                self.initButtons();
                $('#picsPlaceholder').fadeIn('slow');
                self.drawTodayUsersTable();
                $('[data-toggle="tooltip"]').tooltip();
            });
        });
    }


    this.loadMaterials = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            self.materials = results;
            callback();
        });
    }

    this.drawMaterials = function(){
        var s = '';
        var list = self.materials;
        for (var i in list){
            s+= self.getMaterialItemHtml(list[i]);

            if (self.isTodayMaterial(list[i]) == true){
                self.todayNumber++;
            }
        }
        $('#whatBlock').html(' ( ' + self.todayNumber + ' ) ');
        $('#materialsList').html(s);
        $('body').on('click', '.materialDate, .materialTranscriptBlock', function(){
            var id = $(this).attr('data-id');
            var m = self.getMaterialById(id);
            var vimeoId = m.get('vimeoId');
            var playerHtml = '<iframe id="patientExerciseIframe" src="http://player.vimeo.com/video/' + vimeoId + '?title=0&amp;byline=0&amp;portrait=0&amp;allowfullscreen=1&amp;fullscreen=1&autoplay=1" width="680" height="400" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
            $('#videoPlaceholder').html(playerHtml);
            $('#transcriptPlaceholder').html(m.get('transcript'));
            $('#tagsPlaceholder').html(m.get('tags').join(', '));
            $('#videoModal').modal();
        });
        $('#videoModal').on('hidden.bs.modal', function () {
            $('#videoPlaceholder').html('');
        })
    }

    this.getMaterialItemHtml = function(m){
        var s = '';
        var u = self.getUserById(m.get('creatorId'));
        var name = (u != undefined) ? (u.get('firstName') + ' ' + u.get('lastName') ) : '';
        var fName = (u != undefined) ? u.get('firstName')  : '';
        var avatar = (u != undefined) ? u.get('avatar') : '';
        var f = (m.get('approved') == undefined) ? true : m.get('approved');
        var buttonHtml = '<button class="btn btn-sm btn-' + ((f == true) ? 'success' : 'danger') + ' controlButton" data-id="' + m.id + '" style="" > ' + ((f == true) ? '<i class="fa fa-check" ></i> APPROVED' : '<i class="fa fa-close" ></i> REJECTED !') + '</button>';
        s+='<li class="materialItem" data-id="' + m.id + '" >' +
            '<div class="materialDate" data-id="' + m.id + '" >' + moment(m.createdAt).format('LLL') + '</div>' +
            '<div class="avatarPlaceholder" title="' + name + '" ><img data-toggle="tooltip" data-placement="top"  title="' + name + '" src="' + avatar + '" /></div>' +
            '<div class="namePlaceholder"  >' +
            '' + fName +
            '</div>' +
            '<div class="materialTranscriptBlock" data-id="' + m.id + '" > ' + m.get('transcript') + '</div>' +
            //'<div class="materialVimeoBlock" ><a target="_blank" href="http://vimeo.com/' + m.get('vimeoId') + '" > видео </a></div>' +
            '' + buttonHtml +
            '<button class="btn btn-sm btn-default bbCommentButton" data-id="' + m.id + '" ><i class="fa fa-comment" ></i> Comment</button>' +
            '</li>';
        return s;
    }

    this.getMaterialById = function(id){
        var list = self.materials;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.isTodayMaterial = function(m){
        var t0 = self.dayStartTimestamp;
        var t = new Date(m.createdAt).getTime();
        if (t > t0){
            return true;
        }
        return false;
    }

    this.initButtons = function(){
        $('#failButton').bind('click', function(){
            var vimeoId = '132952313';
            var playerHtml = '<iframe id="patientExerciseIframe" src="http://player.vimeo.com/video/' + vimeoId + '?title=0&amp;byline=0&amp;portrait=0&amp;allowfullscreen=1&amp;fullscreen=1&autoplay=1" width="700" height="400" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
            $('#videoPlaceholder').html(playerHtml);
            $('#transcriptPlaceholder').html('');
            $('#videoModal').modal();
        });
        $('#consultationButton').bind('click', function(){
            var vimeoId = '132949142';
            var playerHtml = '<iframe id="patientExerciseIframe" src="http://player.vimeo.com/video/' + vimeoId + '?title=0&amp;byline=0&amp;portrait=0&amp;allowfullscreen=1&amp;fullscreen=1&autoplay=1" width="700" height="400" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
            $('#videoPlaceholder').html(playerHtml);
            $('#transcriptPlaceholder').html('');
            $('#videoModal').modal();
        });

        $('#helpButton').bind('click', function(){
            var vimeoId = '132950220';
            var playerHtml = '<iframe id="patientExerciseIframe" src="http://player.vimeo.com/video/' + vimeoId + '?title=0&amp;byline=0&amp;portrait=0&amp;allowfullscreen=1&amp;fullscreen=1&autoplay=1" width="700" height="400" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
            $('#videoPlaceholder').html(playerHtml);
            $('#transcriptPlaceholder').html('');
            $('#videoModal').modal();
        });
        self.initBbCommentButtons();
    }


    this.loadTeachers = function(callback){
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        //q.equalTo('userRole', 'teacher');
        q.find(function(users){
            self.teachers = users;
            callback();
        });
    }

    this.getUserById = function(id){
        var list = self.teachers;
        for (var i in list){
            if (list[i].id == id){
                console.log(id + ' - ', list[i].get('firstName') + ' _ ' + list[i].get('lastName') );
                return list[i];
            }
        }
        console.log('no user for id = ' + id);
    }

    this.initControlButtons = function(){
        $('body').on('click', '.controlButton', function(){
            var id = $(this).attr('data-id');
            $('.controlButton[data-id="' + id + '"]').removeClass('btn-success');
            $('.controlButton[data-id="' + id + '"]').removeClass('btn-danger');
            self.selectedMaterial = self.getMaterialById(id);
            var f = (self.selectedMaterial.get('approved') == undefined) ? true : self.selectedMaterial.get('approved');
            f = !f;
            self.selectedMaterial.set('approved', f);
            enablePreloader();
            self.selectedMaterial.save().then(function(m){
                console.log('saved', self.selectedMaterial);
                disablePreloader();
                if (f == true){
                    $('.controlButton[data-id="' + id + '"]').addClass('btn-success');
                    $('.controlButton[data-id="' + id + '"]').html('<i class="fa fa-check" ></i> APPROVED');
                }else{
                    $('.controlButton[data-id="' + id + '"]').addClass('btn-danger');
                    $('.controlButton[data-id="' + id + '"]').html('<i class="fa fa-close" ></i> REJECTED !');
                }
                self.updateListBase(m);
            });
        });
    }

    this.updateListBase = function(m){
        var list = self.materials;
        for (var i in list){
            if (list[i].id == m.id){
                list[i] = m;
            }
        }
        self.materials = list;
    }

    this.initBbCommentButtons = function(){
        $('body').on('mousedown', '.bbCommentButton', function(){
            var id = $(this).attr('data-id');
            self.selectedMaterial = self.getMaterialById(id);
            var s = (self.selectedMaterial.get('bbComment') == undefined) ? '' : self.selectedMaterial.get('bbComment');
            $('#bbComment').val(s);
            $('#bbModal').modal();
        });
        $('#updateBBCommentButton').bind('click', function(){
            var comment = $('#bbComment').val().trim();
            self.selectedMaterial.set('bbComment', comment);
            enablePreloader();
            self.selectedMaterial.save().then(function(m){
                self.updateListBase(m);
                disablePreloader();
                toastr.success('Saved!');
                $('#bbModal').modal('hide');
            });
        });
    }

    this.getTodayMaterials = function(){
        var arr = [];
        var list = self.materials;
        for (var i in list){
            var m = list[i];
            if (self.isTodayMaterial(m) == true){
                arr.push(m);
            }
        }
        return arr;
    }

    this.drawTodayUsersTable = function(){
        var list = self.getTodayMaterials();
        var map = {};
        for (var i in list){
            var m = list[i];
            var userId = m.get('creatorId');
            if (map[userId] == undefined){
                map[userId] = [];
            }
            map[userId].push(m);
        }
        var u = self.getUserById(userId);
        var name = (u != undefined) ? (u.get('firstName') + ' ' + u.get('lastName') ) : '';
        self.todayUsersMap = map;
        console.log('users map', map);
        var s = '';
        for (var key in map){
            var u = self.getUserById(key);
            var name = (u != undefined) ? (u.get('firstName') + ' ' + u.get('lastName') ) : '';
            s+= '<tr data-toggle="tooltip" title="' + name + '" data-placement="right" ><td>' + self.getUserCuteCardHtml(u) + '</td> <td class="materialsNumber" >' + map[key].length +'</td></tr>';
        }
        $('#usersTable').html(s);
    }

    this.getUserCuteCardHtml = function(u){
        var s = '';
        if (u == undefined){
            return '';
        }
        var name = (u != undefined) ? ( u.get('firstName') + ' ' + u.get('lastName') ) : '';
        s+= '<div class="cuteCard">' +
            '<div class="cuteImgPlaceholder" title="' + name + '" ><img  src="' + u.get('avatar') + '"  /></div>' +
            '<div class="cuteImgText">' + u.get('firstName') + '</div>' +
            '</div>';
        return s;
    }

}
