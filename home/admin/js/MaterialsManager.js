/**
 * Created by sabir on 21.11.14.
 */

var MaterialsManager = function(){
    var self = this;
    this.materials = [];
    this.selectedMaterial = undefined;
    this.filteredMaterials = [];
    this.taggle = undefined;
    this.tags = [];
    this.editTaggle = undefined;

    this.init = function(){
        initParse();
        self.initMaterialsItem();
        self.initTaggle();
        self.initMaterialCreationBlock();
        self.initSearch();
        self.initUpdateButton();
        self.loadAllMaterials(function(){
            self.drawMaterials();
            $('.materialItem:first').click();
            setTimeout(function(){self.checkImagesUrl()}, 3000); // checking images
        });
    }

    this.loadAllMaterials = function(callback){ //todo: add recursion
        enablePreloader();
        var PatientMaterial = Parse.Object.extend('PatientMaterial');
        var q = new Parse.Query(PatientMaterial);
        q.limit(1000);
        q.ascending('name');
        q.find(function(list){
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

    this.initMaterialCreationBlock = function(){
        $('#createButton').bind('click', function(){
            enablePreloader();
            var name = $('#name').val().trim();
            var transcript = $('#transcript').val().trim();
            var comment = $('#comment').val().trim();
            var vimeoId = $('#vimeoId').val().trim();
            if (vimeoId == undefined || vimeoId == ''){
                toastr.error('you should specify vimeo id');
                return;
            }
            if (name == undefined || name == ''){
                toastr.error('you shoul specify name');
                return;
            }
            var tags = self.taggle.getTags().values;
            var PatientMaterial = Parse.Object.extend('PatientMaterial');
            var q = new Parse.Query(PatientMaterial);
            q.equalTo('vimeoId', vimeoId);
            q.find(function(results){
                disablePreloader();
                if (results.length > 0){
                    toastr.error('material with specified vimeoId already exists in the system');
                    return;
                }
                m = new PatientMaterial();
                m.set('name', name);
                m.set('vimeoId', vimeoId);
                m.set('comment', comment);
                m.set('transcript', transcript);
                m.set('tags', tags);
                m.set('status', 'active');
                enablePreloader();
                loadVimeoImgSrc(vimeoId, function(vimeoImgSrc){
                    m.set('vimeoImgSrc', vimeoImgSrc);
                    m.save().then(function(){
                        disablePreloader();
                        toastr.success('SUCCESS');
                        setTimeout(function(){window.location.href = window.location.href}, 500);
                    });
                })
            });

        });
    }

    this.initTaggle = function(){
        self.taggle = new Taggle('tags', {
            placeholder: 'Tags',
            tags: ['englishpatient']
        });
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
        var list = self.materials;
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
        var list = self.materials;
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

    this.initUpdateButton = function(){
        $('#updateButton').bind('click', function(){
            var m = self.selectedMaterial;
            if (m == undefined){
                toastr.error('Select material from the left list!');
                return;
            }
            var name = $('#editName').val().trim();
            var transcript = $('#editTranscript').val().trim();
            var comment = $('#editComment').val().trim();
            var vimeoId = $('#editVimeoId').val().trim();
            var tags = (self.editTaggle.getTags() == undefined) ? [] : self.editTaggle.getTags().values;
            if (vimeoId == undefined || vimeoId == ''){
                toastr.error('vimeo id should be specified');
                return;
            }
            if (name == '' || name == undefined){
                toastr.error('name should be specified');
                return;
            }
            m.set('name', name);
            m.set('transcript', transcript);
            m.set('vimeoId', vimeoId);
            m.set('comment', comment);
            m.set('tags', tags)
            enablePreloader();
            m.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }

    this.prepareEditTaggle = function(){
        if (self.editTaggle == undefined){
            self.editTaggle = new Taggle('editTaggle');
        }
        self.editTaggle.removeAllTags();
        var m = self.selectedMaterial;
        self.editTaggle.add(m.get('tags'));
    }

    this.checkImagesUrl = function(){
        var list = self.materials;
        var arr = [];
        for (var i in list){
            if (list[i].get('vimeoImgSrc').indexOf('default_640') > -1){
                arr.push(list[i]);
            }
        }
        if (arr.length == 0){
            return;
        }
        loadVimeoImgSrc(arr[0].get('vimeoId'), function(url){
            arr[0].set('vimeoImgSrc', url);
            arr[0].save().then(function(){
                window.location.href = window.location.href;
            });
        })
    }



}