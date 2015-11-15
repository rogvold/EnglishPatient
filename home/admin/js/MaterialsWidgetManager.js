/**
 * Created by sabir on 22.11.14.
 */

var MaterialsWidgetManager = function(){
    var self = this;
    this.materials = [];
    this.filteredMaterials = [];
    this.selectedMaterial = undefined;
    this.selectCallback = undefined;


    this.init = function(){
        initParse();
        self.initSearch();
        self.initMaterialItem();
        self.loadMaterials(function(){
            self.drawMaterials();
        });
    }

    this.loadMaterials = function(callback){ //todo: add recursion
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.limit(1000);
        q.ascending('name');
        q.find(function(list){
            self.materials = list;
            self.filteredMaterials = list;
            disablePreloader();
            callback();
        });
    }

    this.drawMaterials = function(){
        var list = self.filteredMaterials;
        var s = '';
        for (var i in list){
            s+= self.getMaterialItemHtml(list[i]);
        }
        $('#widgetMaterialsList').html(s);
    }

    this.getMaterialItemHtml = function(m){
            var s = '';
            var selButton = (self.selectCallback == undefined) ? '' : '<a href="javascript:;" class="btn btn-primary btn-xs mt5 selectMaterialButton" data-id="' + m.id + '"  >Select</a>';
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
                +'<a href="javascript:;"  data-toggle="modal" data-target="#materialModal" class="btn btn-info btn-xs mt5 showMaterialButton" data-id="' + m.id + '"  >Show</a>'
                + selButton
                +'</div>'
                +'</div>'
                +'</section>'
                +'</li>';
            return s;
    }

    this.initMaterialItem = function(){
        $('body').on('click', '.showMaterialButton', function(){
            var id = $(this).attr('data-id');
            var m = self.getMaterialById(id);
            self.selectedMaterial = m;
            self.prepareSelectedMaterial();
        });
        $('body').on('click', '.selectMaterialButton', function(){
            if (self.selectCallback == undefined){
                return;
            }
            var id = $(this).attr('data-id');
            var m = self.getMaterialById(id);
            self.selectCallback(m);
        });
    }

    this.prepareSelectedMaterial = function(){
        var m = self.selectedMaterial;
        if (m == undefined){
            return;
        }
        var vimeoHtml = '<iframe src="//player.vimeo.com/video/' + m.get('vimeoId') + '?title=0&byline=0&portrait=0"width="480" height="270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        var tagsHtml = m.get('tags').map(function(a){ return ('<span class="materialTag">' + a + '</span>')}).join(' ');
        $('#vimeoWidgetBlock').html(vimeoHtml);
        $('#tagsWidgetBlock').html(tagsHtml);
        $('.nameWidget').html(m.get('name'));
        $('#commentWidget').html(m.get('comment'));
        $('#transcriptWidget').html(m.get('transcript'));
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

    this.initSearch = function(){
        $('#widgetSearch').bind('keyup',function(){
            var text = $(this).val();
            console.log(text);
            self.filteredMaterials = self.filter(text);
            self.drawMaterials();
        });
    }

}