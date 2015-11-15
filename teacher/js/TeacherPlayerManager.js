/**
 * Created by sabir on 19.12.14.
 */


var TeacherPlayerManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.materials = [];
    this.selectedMaterial = undefined;
    this.filteredMaterials = [];
    this.taggle = undefined;
    this.tags = [];
    this.editTaggle = undefined;
    this.group = undefined;
    this.allMaterials = [];


    this.init = function(){
        initParse();
        self.initMaterialsItem();
        self.initSearch();
        self.currentUserManager.init(function(){
            self.loadMaterials(function(){
                self.loadGroup(function(){
                    self.drawMaterials();
                    $('.materialItem:first').click();
                });
            });
        });
    }

    this.loadMaterials = function(callback){ //todo: add recursion
        enablePreloader();
        var PatientMaterial = Parse.Object.extend('PatientMaterial');
        var q = new Parse.Query(PatientMaterial);
        q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        q.limit(1000);
        q.ascending('name');
        q.find(function(list){
            self.allMaterials = list;
            self.materials = list;
            self.filteredMaterials = list;
            self.initAllTags();
            disablePreloader();
            callback();
        });
    }

    this.initMaterialsItem = function(){
        $('body').on('click', '.materialItem', function(){
            $('.materialItem').removeClass('selected');
            $(this).addClass('selected');
            var mId = $(this).attr('data-id');
            self.selectedMaterial = self.getMaterialById(mId);
            self.prepareSelectedMaterial();
        });
    }

    this.drawMaterials = function(){

        var list = self.filteredMaterials;
        var s = '';
        for (var i in list){
            var m = list[i];
            s+= self.getMaterialItemHtml(m);
        }
        $('#materialsList').html(s);
    }


    this.getMaterialItemHtml = function(m){
        var s = '';
        s+='<li class="materialItem" data-id="' + m.id + '" >'
        +'<section class="widget bordered">'
        +'<div class="panel-body">'
        +'<a href="javascript:;" class="pull-left mr15">'
        +'<img src="' + m.get('vimeoImgSrc') + '" class="avatar avatar-md img-circle" alt="">'
        +'</a>'
        +'<div class="overflow-hidden">'
        +'<b>' + m.get('name') + '</b>'
        +'<small class="show">' + m.get('tags').join(', ') + '</small>'
        +'<div class="show"></div>'
//                        +'<a href="javascript:;" class="btn btn-primary btn-xs mt5">Send request</a>'
        +'</div>'
        +'</div>'
        +'</section>'
        +'</li>';
        return s;
    }

    this.prepareSelectedMaterial = function(){
        $('#materialBlock').show();
        var m = self.selectedMaterial;
        console.log(m);
        $('#editName').val(m.get('name'));
        $('#editTranscript').val(m.get('transcript'));
        $('#editComment').val(m.get('comment'));
        $('#editVimeoId').val(m.get('vimeoId'));
        $('.selectedName').html(m.get('name'));
        $('#videoBlock').html('<iframe src="//player.vimeo.com/video/' + m.get('vimeoId') + '?title=0&byline=0&portrait=0"width="480" height="270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        self.prepareEditTaggle();

        //todo: make all preparations
    }

    this.getMaterialById = function(id){
        var list = self.allMaterials;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
        return undefined;
    }

    this.initAllTags = function(){
        var a = {};
        var arr = [];
        var list = self.materials;
        for (var i in list){
            var m = list[i];
            var ts = m.get('tags');
            for (var j in ts){
                var t = ts[j];
                a[t] = 1;
            }
        }
        for (var key in a){
            arr.push(key);
        }
        self.tags = arr;
    }

    this.initSearch = function(){
        $('#search').bind('keyup',function(){
            var text = $(this).val();
            self.filteredMaterials = self.filter(text);
            self.drawMaterials();
        });
    }

    this.filter = function(t){
        var arr = [];
        var a = {};
        if (t == undefined || t == ''){
            return self.materials;
        }
        var q = t.toLowerCase();
        q = q.trim();
        var list = self.allMaterials;
        for (var i in list){
            var m = list[i];
            var ts = m.get('tags');
            for (var j in ts){
                var s = ts[j].toLowerCase();
                var s2 = m.get('name').toLocaleLowerCase();
                if ((s.indexOf(q) > -1 )|| (s2.indexOf(q) > -1 ) ){
                    a[m.id] = 1;
                }
            }
        }
        for (var key in a){
            arr.push(self.getMaterialById(key));
        }
        return arr;
    }



    this.prepareEditTaggle = function(){
        if (self.editTaggle == undefined){
            self.editTaggle = new Taggle('editTaggle');
        }
        self.editTaggle.removeAllTags();
        var m = self.selectedMaterial;
        self.editTaggle.add(m.get('tags'));
    }


    this.loadGroup = function(callback){
        if (gup('groupId') == undefined){
            $('.nameBlock').hide();
            callback();
            return;
        }
        var MaterialGroup = Parse.Object.extend('MaterialGroup');
        var q = new Parse.Query(MaterialGroup);
        enablePreloader();
        q.get(gup('groupId'), {
            success: function(g){
                disablePreloader();
                self.group = g;
                $('.nameBlock').text(g.get('name'));
                $('.materialsLink').attr('href', 'materials.html?groupId=' + g.id);
                self.materials = self.getGroupMaterials();
                self.filteredMaterials = self.materials;
                callback();
            }
        });

    }

    this.getGroupMaterials = function(){
        if (self.group == undefined){
            return self.allMaterials;
        }
        var list = self.allMaterials;
        var arr = [];
        var ms = (self.group.get('materials') == undefined) ? [] : self.group.get('materials');
        for (var i in list){
            if ($.inArray(list[i].id, ms) > -1){
                arr.push(list[i]);
            }
        }
        return arr;
    }



}
