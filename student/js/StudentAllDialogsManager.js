/**
 * Created by sabir on 08.07.15.
 */

    // this is test class for list with all dialogs in the system

var StudentAllDialogsManager = function(){
    var self = this;
    this.dialogs = [];
    this.currentUserManager = new CurrentUserManager();


    this.init = function(){
        initParse();
        self.currentUserManager.init(function(){
            self.loadDialogs(function(){
                self.drawDialogs();
            });
        });
    }

    this.loadDialogs = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientDialog'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            self.dialogs = results;
            callback();
        });
    }


    this.drawDialogs = function(){
        var s = '';
        var list = self.dialogs;
        for (var i in list){
            var d = list[i];
            s+='<li class="dialogItem" data-id="' + d.id + '"  >' + d.get('name') + '</li>';
        }
        $('#dialogsList').html(s);
        $('body').on('click', '.dialogItem', function(){
            var id = $(this).attr('data-id');
            window.location.href = 'dialog.html?id=' + id;
        });
    }

}