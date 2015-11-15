/**
 * Created by sabir on 10.07.15.
 */

var TeacherGrammarManager = function(){
    var self = this;
    this.grammars = [];
    this.selectedGrammar = undefined;

    this.init = function(){
        initParse();
        self.loadGrammars(function(){
            self.drawGrammars();
            self.initButtons();
        });
    }


    this.loadGrammars = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientGrammar'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.find(function(results){
            self.grammars = results;
            callback();
        });
    }

    this.drawGrammars = function(){
        var s = '';
        var list = self.grammars;
        for (var i in list){
            s+= self.getGrammarItemHtml(list[i]);
        }
        $('#grammarsList').html(s);
        $('body').on('click', '.grammarItem', function(){
            var id = $(this).attr('data-id');
            self.selectedGrammar = self.getGrammarById(id);
            var g = self.selectedGrammar;
            $('#editName').val(g.get('name'));
            $('#editTags').val(g.get('tags'). join(', '));
            $('#editAvatar').val(g.get('avatar'));
            $('#editModal').modal();
        });
    }


    this.getGrammarById = function(id){
        var list = self.grammars;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.getGrammarItemHtml = function(g){
        var s = '';
        var tags = (g.get('tags') == undefined) ? [] : g.get('tags');
        var avatar = (g.get('avatar') == undefined || g.get('avatar') == '') ? '../img/noavatar.jpg' : g.get('avatar');
        s+= '<li class="grammarItem" data-id="' + g.id + '" >' +
            '<div class="grammarAvatar" ><img src="' + avatar + '" /></div>' +
            '<div style="display: inline-block;"><div class="grammarName" data-id="' + g.id + '"  >' + g.get('name') + '</div>' +
            '<div class="grammarTags" ><b>Tags: </b>' + tags.join(', ')  +'</div> </div>' +
            '</li>';
        return s;
    }

    this.initButtons = function(){
        $('#updateButton').bind('click', function(){
            self.selectedGrammar.set('name', $('#editName').val().trim());
            self.selectedGrammar.set('avatar', $('#editAvatar').val().trim());
            var tags = $('#editTags').val().split(',').map(function(t){return t.trim()});
            self.selectedGrammar.set('tags', tags);
            self.selectedGrammar.save().then(function(){
                window.location.href = window.location.href;
            });
        });
        $('#deleteButton').bind('click', function(){
            self.selectedGrammar.destroy({
                success: function(){
                    window.location.href = window.location.href;
                }
            });
        });

        $('#createButton').bind('click', function(){
            var name = $('#name').val().trim();
            var avatar = $('#avatar').val().trim();
            var tags = $('#tags').val().split(',').map(function(t){return t.trim()});
            var PatientGrammar = Parse.Object.extend('PatientGrammar');
            var g = new PatientGrammar();
            g.set('name', name);
            g.set('avatar', avatar);
            g.set('tags', tags);
            g.save().then(function(){
                window.location.href = window.location.href;
            });
        });

    }

}