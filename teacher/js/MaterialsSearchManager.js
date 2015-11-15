/**
 * Created by sabir on 11.07.15.
 */

var MaterialsSearchManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.searchMaterials = [];
    this.query = '';
    this.materials = [];
    this.selectedMaterial = undefined;
    this.remarkable = new Remarkable();
    this.cNum = 0;
    this.translateManager = new TranslateWidgetManager();

    this.init = function(){
        initParse();
        enablePreloader();
        self.translateManager.modalMode = true;
        self.translateManager.init();
        //self.currentUserManager.init(function(){
            self.loadAllMaterials(function(){
                self.initButtons();
                console.log('materials loaded: ', self.materials);
                disablePreloader();
                if (gup('q') != undefined){
                    self.query = decodeURI(gup('q'));
                    $('#searchInput').val(self.query);
                    $('#searchButton').click();
                }
            });
        //});
    }


    this.loadAllMaterials = function(callback){
        //todo: change it
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.limit(1000);

        //q.find(function(results){
        //    self.materials = results;
        //    callback();
        //});

        loadAllDataFromParse2(q, function(results){
            self.materials = results;
            callback();
        });
    }

    this.initButtons = function(){
        self.initSearchButton();
        $('#closeLink').bind('click', function(){
            $('#videoBlock').hide();
            $('#iframePlaceholder').html('');
            $('.searchItem').removeClass('selected');
            $('#videoInfoBlock').hide();
        });

        $('#allMaterialsLink').bind('click', function(){
            self.searchMaterials = self.materials;
            self.drawSearchMaterials();
        });

        $('#infoModal').on('hidden.bs.modal', function () {
            $('#infoModal .modal-body').html($('#infoModal .modal-body').html());
        });
    }


    this.initSearchButton = function(){
        $('#searchButton').bind('click', function(){
            var s = $('#searchInput').val().trim();
            if (s != ''){
                self.query = s;
                self.searchMaterials = self.extraSearch(s);
                //alert('found ' + self.searchMaterials.length);
                self.drawSearchMaterials();

                history.pushState(null, 'Search', 'materialVideos.html?q=' + encodeURI(s));

                //history.pushState(null, null, "materialVideos.html?q=" + encodeURI());
            }
        });
        $('#searchInput').keyup(function(e){
            if(e.keyCode == 13){
                $('#searchButton').trigger("click");
            }
        });

        $('body').on('click', '.searchItem', function(){
            var id = $(this).attr('data-id');
            $('.searchItem').removeClass('selected');
            $(this).addClass('selected');
            self.selectedMaterial = self.getMaterialById(id);
            var m = self.selectedMaterial;
            console.log('selected material: ', m);
            console.log('vimeoId = ' + m.get('vimeoId'));
            self.prepareSelectedMaterial();
        });

        $('body').on('click', '.tag', function(){
            var tag = $(this).text();
            var s = 'tag: ' + tag;
            $('#searchInput').val(s);
            $('#searchButton').click();
        });

        $('body').on('click', '#shareLink', function(){
            $(this).select();
        });

        $('#shareButton').bind('click', function(){
            self.showShareLink();
        });

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
        var s = '';
        var list = self.searchMaterials;
        for (var i in list){
            s+= self.getSearchItem(list[i]);
        }
        $('#searchResults').html(s);
        if (list.length == 0){
            $('#searchResults').html('<h3>По Вашему запросу ничего не найдено... Попробуйте еще раз</h3>');
        }
        self.hideVideo();
        if (list.length == 1){
            $('.searchItem:first').click();
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
        //transcript = self.translateManager.getWrappedText(transcript)

        var tagsString = m.get('tags').join(', ').toLowerCase();
        if (tagsString.indexOf(s) > -1 || name.indexOf(s) > -1 || transcript.indexOf(s) > -1){
            return true;
        }
        return false;
    }

    this.prepareSelectedMaterial = function(){
        var m = self.selectedMaterial;
        $('#iframePlaceholder').html(self.getIframeHtml(m.get('vimeoId')));
        $('#videoBlock').show();
        $('#videoInfoBlock').show();

        var tr = (m.get('transcript') == undefined) ? '' : m.get('transcript');
        tr = self.translateManager.getWrappedText(tr)
        var c = (m.get('comment') == undefined) ? '' : m.get('comment');

        $('#transcript').html(tr);
        $('#comment').html(self.remarkable.render(c));
        var sTags = m.get('tags').map(function(t){ return ('<span class="tag label label-color" >' + t + '</span>');}).join(' ');
        $('#tags').html(sTags);
        $('body').scrollTop(0);
    }

    this.hideVideo = function(){
        $('#closeLink').click();
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