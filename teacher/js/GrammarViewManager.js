/**
 * Created by sabir on 10.07.15.
 */

var GrammarViewManager = function(){
    var self = this;
    this.grammars = [];
    this.selectedGrammar = undefined;
    this.materials = [];
    this.selectedMaterial = undefined;
    this.remarkable = new Remarkable();


    this.init = function(){
        initParse();
        enablePreloader();
        self.loadGrammars(function(){
            self.loadMaterials(function(){
                self.drawMaterials();
                disablePreloader();
            });
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

    this.loadMaterials = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.limit(1000);
        q.containsAll('tags', ['grammar']);
        q.find(function(results){
            self.materials = results;
            callback();
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

    this.getMaterialById = function(id){
        var list = self.materials;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }


    this.getMaterialGrammar = function(m){
        var list = self.grammars;
        for (var i in list){
            var g = list[i];
            var inter = getArraysIntersection(g.get('tags'), m.get('tags'));
            if (inter.length > 0){
                return g;
            }
        }
        return undefined;
    }

    this.drawMaterials = function(){
        var list = self.materials;
        var s = '';
        for (var i in list){
            var m = list[i];
            var g = self.getMaterialGrammar(m);
            if (g == undefined){
                continue;
            }
            s+= self.getMaterialItemHtml(m, g);
        }
        $('#materialsList').html(s);
        self.initMaterialItem();
    }

    this.getMaterialItemHtml = function(m ,g){
        var s = '';
        var avatar = (m.get('vimeoImgSrc') == undefined) ? '../img/noavatar.jpg' : m.get('vimeoImgSrc');
        s+='<li class="materialItem" data-id="' + m.id  +'" >' +
                '<div class="materialAvatar" ><img src="' + avatar + '" /></div>' +
                '<div class="materialTranscript" data-id="' + m.id + '" >' + m.get('transcript') + '</div>' +
                '<div class="materialGrammar" data-id="' + g.id + '" data-materialId="' + m.id +' " >' +
                    '<img/ src="' + g.get('avatar') + '" >' +
                '</div>' +
            '</li>';
        return s;
    }

    this.initMaterialItem = function(){
        $('body').on('click', '.materialTranscript', function(){
            var id = $(this).attr('data-id');
            self.selectedMaterial = self.getMaterialById(id);
            var m = self.selectedMaterial;
            $('#transcript').html(m.get('transcript'));
            $('#comment').html(self.remarkable.render(m.get('comment')));
            var vimeoId = m.get('vimeoId');
            var playerHtml = '<iframe id="patientExerciseIframe" src="http://player.vimeo.com/video/' + vimeoId + '?title=0&amp;byline=0&amp;portrait=0&amp;allowfullscreen=1&amp;fullscreen=1&autoplay=1" width="680" height="400" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
            $('#videoPlaceholder').html(playerHtml);
            $('#materialModal').modal();
        });
        self.initToggleCommentLink();
    }

    this.initToggleCommentLink = function(){
        $('#toggleCommentLink').bind('click', function(){
            $('#comment').toggle();
        });
        $('#materialModal').on('hidden.bs.modal', function () {
            $('#videoPlaceholder').html('');
        })
    }


}