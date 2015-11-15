/**
 * Created by sabir on 26.12.14.
 */

var HeSheExercisesManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.phrases = [];

    this.init = function(){
        initParse();
        self.initPlayLink();
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
            disablePreloader();
            self.phrases = results;
            callback();
        });
    }

    this.getPhraseItem = function(p){
        var s = '';
        s+='<li class="phraseItem" data-id="' + p.id + '" >' +
        '<i class="ti-control-play pull-right playLink" data-id="' + p.id + '" ></i>' +
        '' + p.get('text').replace(/\[/g, '<b>').replace(/\]/g, '</b>') + '' +
        '</li>';
        return s;
    }

    this.drawPhrases = function(){
        var list = self.phrases;
        var s = '';
        for (var i in list){
            s+=self.getPhraseItem(list[i]);
        }
        $('#phrasesList').html(s);
    }

    this.initPlayLink = function(){
        $('body').on('click', '.playLink', function(){
            var id = $(this).attr('data-id');
            window.location.href = 'heshe.html?id=' + id;
        });
    }

}