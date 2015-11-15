/**
 * Created by sabir on 11.07.15.
 */

var MaterialSearchWidget = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.searchMaterials = [];
    this.query = '';
    this.materials = [];
    this.selectedMaterial = undefined;

    this.init = function(callback){
        initParse();
        enablePreloader();
        self.currentUserManager.init(function(){
            self.loadAllMaterials(function(){
                self.initButtons();
                console.log('materials loaded: ', self.materials);
                disablePreloader();
                if (callback != undefined){
                    callback();
                }
            });
        });
    }

    this.selectCallback = function(m){
        console.log(m);
    }

    this.loadAllMaterials = function(callback){
        //todo: change it
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.limit(1000);
        q.find(function(results){
            self.materials = results;
            callback();
        });
    }

    this.initButtons = function(){
        self.initSearchButton();
        $('#allMaterialsLink').bind('click', function(){
            self.searchMaterials = self.materials;
            self.drawSearchMaterials();
        });

    }


    this.initSearchButton = function(){
        $('#searchButton').bind('click', function(){
            var s = $('#searchInput').val().trim();
            console.log('searching for ' + s);
            if (s != ''){
                self.query = s;
                self.searchMaterials = self.extraSearch(s);
                //alert('found ' + self.searchMaterials.length);
                self.drawSearchMaterials();
                //history.pushState(null, null, "materialVideos.html?q=" + encodeURI());
            }else{
                $('#materialsList').html('');
            }

        });

        $('#searchInput').keyup(function(e){
            if(e.keyCode == 13){
                $('#searchButton').trigger("click");
            }
        });

        $('body').on('click', '.materialItem .selectButton', function(){
            var id = $(this).attr('data-id');
            $('.materialItem .selectButton').removeClass('selected');
            $(this).addClass('selected');
            self.selectedMaterial = self.getMaterialById(id);
            var m = self.selectedMaterial;
            console.log('selected material: ', m);
            console.log('vimeoId = ' + m.get('vimeoId'));
            self.prepareSelectedMaterial();
        });

        $('body').on('click', '.materialItem .playButton', function(){
            var id = $(this).attr('data-id');
            $('.materialItem .pla').removeClass('selected');
            $(this).addClass('selected');
            var m = self.getMaterialById(id);
            self.showPlayBLock(m);
        });

        $('body').on('click', '.tag', function(){
            var tag = $(this).text();
            var s = 'tag: ' + tag;
            $('#searchInput').val(s);
            $('#searchButton').click();
        });

    }

    this.showPlayBLock = function(m){
        var s = '<iframe src="https://player.vimeo.com/video/' + m.get('vimeoId') + '?title=0&autoplay=1&byline=0&portrait=0" width="380" height="204" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        $('#searchPlayBlock').html(s);
    }

    this.getMaterialItemHtml = function(m){
        var name = (m.get('name') == undefined || m.get('name') == '' ) ? 'N/A' : m.get('name');
        if (name.length > 50){
            name = name.substr(0, 50) + ' ...';
        }
        var sTags = m.get('tags').map(function(t){ return ('<span class="tag label label-color" >' + t + '</span>');}).join(' ');

        var s = '<li class="materialItem selected" data-id="' + m.id + '">' +
                    '<section class="widget bordered">' +
                        '<div class="panel-body">' +
                            '<a href="javascript:;" class="pull-left mr15">' +
                                '<img src="' + m.get('vimeoImgSrc') + '" class="avatar avatar-md" alt="">' +
                            '</a>' +
                            '<div class="overflow-hidden" style="padding-right: 5px;">' +
                                '<b>' + name + '</b>' +
                                '<small class="show">' + sTags + '</small>' +
                                '<div class="show"></div>' +
                            '</div>' +
                        '</div>' +
                    '</section>' +
                    '<button class="btn btn-xs btn-default selectButton" data-id="' + m.id + '" >select</button>' +
                    '<button class="btn btn-xs btn-default playButton" data-id="' + m.id + '" ><i class="glyphicon glyphicon-play-circle" ></i></button>' +
                '</li>';
        return s;
    }



    this.getSearchResults = function(s){
        var list = self.materials;
        var arr = [];
        for (var i in list){
            if (self.isInSearch(s, list[i]) == true){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.drawSearchMaterials = function(){
        $('#searchPlayBlock').html('');
        console.log('drawing search materials: ', self.searchMaterials);
        var s = '';
        var list = self.searchMaterials;
        for (var i in list){
            //s+= self.getSearchItem(list[i]);
            s+= self.getMaterialItemHtml(list[i]);
        }
        $('#materialsList').html(s);
        if (list.length == 0){
            $('#materialsList').html('<h3>По Вашему запросу ничего не найдено... Попробуйте еще раз</h3>');
        }

    }

    this.getSearchItem = function(m){
        var s = '';
        var imgSrc = (m.get('vimeoImgSrc') == undefined) ? 'defaultImgSrc' : m.get('vimeoImgSrc');
        var name = 'N/A';
        if (m.get('name') != undefined){
            name = m.get('name');
            if (name.length > 50){
                name = name.substr(0, 50) + ' ...';
            }
        }
        var duration = m.get('duration');
        console.log('duration = ' + duration);
        var minD = Math.floor(duration / 60.0);
        var secD = duration % 60;
        var sDur = '  <i class="glyphicon glyphicon-time" ></i>  ' + minD + ':' + secD;
        if (duration == undefined){
            sDur = '';
        }
        s+='<div class="searchItem col-md-3" data-id="' + m.id + '"  >' +
        '<div class="searchItemAvatarPlaceholder" ><img src="' + imgSrc + '" /></div>' +
        '<div class="searchItemTextBlock">' +
        '<div class="searchItemName" >' +  name + '</div>' +
        '</div>' +
        '<div class="searchItemDuration">' + sDur + '</div>' +
        '</div>';
        return s;
    }

    this.isInSearch = function(s, m){
        if (s == undefined || s == ''){
            return false;
        }
        s = s.toLowerCase();
        var name = ((m.get('name') == undefined) ? '' : m.get('name')).toLowerCase();
        var transcript = ((m.get('transcript') == undefined) ? '' : m.get('transcript')).toLowerCase();
        var tagsString = m.get('tags').join(', ').toLowerCase();
        if (tagsString.indexOf(s) > -1 || name.indexOf(s) > -1 || transcript.indexOf(s) > -1){
            return true;
        }
        return false;
    }

    this.prepareSelectedMaterial = function(){
        var m = self.selectedMaterial;
        self.selectCallback(m);
    }


    this.getIframeHtml = function(vimeoId){
        var s = '<iframe src="https://player.vimeo.com/video/' + vimeoId + '?title=0&byline=0&portrait=0&autoplay=1"  height="562" width="1000" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
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

    this.getMaterialByVimeoId = function(vimeoId){
        var list = self.materials;
        for (var i in list){
            if (list[i].get('vimeoId') == vimeoId){
                return list[i];
            }
        }
    }

    this.extraSearch = function(q){
        if (q == undefined || q.trim() == ''){
            return [];
        }
        if (q.indexOf('transcript:') > -1){
            q = q.substr(11).toLowerCase();
            return self.searchByTranscript(q);
        }
        if (q.indexOf('tag:') > -1){
            q = q.substr(4).toLocaleLowerCase();
            return self.searchByTag(q);
        }
        if (q.indexOf('name:') > -1){
            q = q.substr(5).toLocaleLowerCase();
            return self.searchByName(q);
        }
        q = q.trim();
        return self.getSearchResults(q);
    }

    this.searchByName = function(nam){
        nam = nam.toLowerCase().trim();
        var list = self.materials;
        var arr = [];
        for (var i in list){
            var m = list[i];
            var name = m.get('name');
            if (name == undefined || name == ''){
                continue;
            }
            name = name.toLowerCase();
            if (name.indexOf(nam) > -1){
                arr.push(m);
            }
        }
        return arr;
    }

    this.searchByTranscript = function(tr){
        tr = tr.toLowerCase().trim();
        var list = self.materials;
        var arr = [];
        for (var i in list){
            var m = list[i];
            var tran = m.get('transcript');
            if (tran == undefined || tran == ''){
                continue;
            }
            tran = tran.toLowerCase();
            if (tran.indexOf(tr) > -1){
                arr.push(m);
            }
        }
        return arr;
    }

    this.searchByTag = function(tag){
        console.log('searc by tag = ' + tag);
        tag = tag.toLowerCase().trim();
        var list = self.materials;
        var arr = [];
        for (var i in list){
            var tags = list[i].get('tags');
            for (var j in tags){
                if (tags[j].indexOf(tag) > -1){
                    arr.push(list[i]);
                    break;
                }
            }
        }
        return arr;
    }

    this.showShareLink = function(){
        var m = self.selectedMaterial;
        var s = 'http://beta.englishpatient.org/student/material.html?materialId=' + m.id;
        var html = '<span>' +
            '<input id="shareLink" type="text" style="display: block;" value="' + s + '"  />' +
            '</span>';
        swal({   title: "Ссылка для ученика",   text: html,   html: true });
    }

}