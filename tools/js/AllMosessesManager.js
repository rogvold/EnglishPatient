/**
 * Created by sabir on 31.12.14.
 */

var AllMosessesManager = function(){
    var self = this;
    this.mosesses = [];
    this.listId = 'mosesList';
    this.mosessPlayingModalManager = new MosesPlayingModalManager();

    this.init = function(){
        initParse();
        self.initAddNewButton();
        self.mosessPlayingModalManager.init();
        self.loadMosesses(function(){
            self.drawList();
        });
    }

    this.loadMosesses = function(callback){
        var q = new Parse.Query(Parse.Object.extend('Moses'));
        q.limit(1000);
        q.addDescending('createdAt');
        enablePreloader();
        q.find(function(results){
            self.mosesses = results;
            disablePreloader();
            callback();
        });
    }

    this.drawList = function(){
        var s = '';
        var list = self.mosesses;
        for (var i in list){
            var m = list[i];
            s+='<li><a class="mosesLink" data-vimeoId="' + m.get('vimeoId') +'" href="javascript: void(0)" >' + m.get('vimeoId') + '</a></li>';
        }
        $('#' + self.listId).html(s);
    }

    this.initAddNewButton = function(){
        $('#addNewButton').bind('click', function(){
            var vimeoId = $('#newMosesInput').val().trim();
            window.location.href = 'mosesEditor.html?vimeoId=' + vimeoId;
        });
    }

}