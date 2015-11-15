/**
 * Created by sabir on 24.12.14.
 */

var TeacherHeSheManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.heShePharses = [];
    this.heSheAllPhrases = [];
    this.heSheViewManager = new HeSheViewManager();

    this.init = function(){
        initParse();
        self.initDeleteLink();
        self.initCreateButton();
        self.initViewLink();
        self.currentUserManager.init(function(){
            self.loadPhrases(function(){
               self.drawPhrases();
            });
        });
    }


    this.loadPhrases = function(callback){
        var q = new Parse.Query(Parse.Object.extend('HeShePhrase'));
        q.limit(1000);
        q.addDescending('createdAt');
        enablePreloader();
        q.find(function(results){
            self.heSheAllPhrases = results;
            var arr = [];
            for (var i in results){
                if (results[i].get('creatorId') == self.currentUserManager.currentUser.id){
                    arr.push(results[i]);
                }
            }
            self.heShePharses = arr;
            console.log(arr);
            disablePreloader();
            callback();
        });
    }

    this.getPhraseItemHtml = function(p){
        var s = '';
        s+='<li class="phraseItem" data-id="' + p.id + '" >' +
        '<section class="dash-tile" >' +
        '' + (p.get('vimeoId') == undefined ? '' : '<a class="vimeoLink" target="_blank" href="http://vimeo.com/' + p.get('vimeoId') + '" >' + p.get('vimeoId') +' <i class="ti-control-play" ></i></a>') +
        '' + p.get('text').replace('\n', '<br/>') + '' +
        '<i class="pull-right ti-eye viewLink ml5 mr" data-id="' + p.id + '" ></i>' +
        '<i class="pull-right ti-trash deleteLink ml5 mr5" data-id="' + p.id + '" ></i>' +
        '</section></li>'
        return s;
    }

    this.drawPhrases = function(){
        var list = self.heShePharses;
        var s = '';
        for (var i in list){
            s+=self.getPhraseItemHtml(list[i]);
        }
        $('#phrasesList').html(s);
    }


    this.initCreateButton = function(){
        $('#createButton').bind('click', function(){
            var text = $('#text').val().trim();
            text = text.split('\n').join('<br/>');
            var vimeoId = $('#vimeoId').val().trim();
            var videoText = $('#videoText').val().trim();
            if (self.phraseExists(text) == true){
                toastr.error('phrase exists');
                return;
            }
            var number = parseInt($('#number').val());
            var HeShePhrase = Parse.Object.extend('HeShePhrase');
            var p = new HeShePhrase();
            p.set('creatorId', self.currentUserManager.currentUser.id);
            p.set('text', text);
            p.set('number', number);
            if (vimeoId != ''  && vimeoId != undefined){
                p.set('vimeoId', vimeoId);
            }
            if (videoText != ''  && videoText != undefined){
                p.set('videoText', videoText);
            }
            enablePreloader();
            p.save().then(function(){
                toastr.success('saved');
                window.location.href = window.location.href;
            });

        });
    }


    this.phraseExists = function(text){
        var list = self.heSheAllPhrases;
        for (var i in list){
            if (list[i].get('text') == text){
                return true;
            }
        }
        return false;
    }

    this.initDeleteLink = function(){
        $('body').on('click', '.deleteLink', function(){
            if (confirm('Are you sure') == false){
                return;
            }
            var id = $(this).attr('data-id');
            var p = self.getPhraseById(id);
            enablePreloader();
            p.destroy({
                success: function(){
                    disablePreloader();
                    toastr.success('deleted');
                    self.loadPhrases(function(){
                        self.drawPhrases();
                    });
                }
            });
        });
    }

    this.initViewLink = function(){
        $('body').on('click', '.viewLink', function(){
            var id = $(this).attr('data-id');
            var p = self.getPhraseById(id);
            self.heSheViewManager.phrase = p;
            self.heSheViewManager.prepareView();
            $('#viewModal').modal();
        });
    }


    this.getPhraseById = function(id){
        var list = self.heSheAllPhrases;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

}