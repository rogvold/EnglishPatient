/**
 * Created by sabir on 11.07.15.
 */

var StudentMaterialManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.searchMaterials = [];
    this.query = '';
    this.materials = [];
    this.selectedMaterial = undefined;
    this.remarkable = new Remarkable();

    this.init = function(){
        initParse();
        enablePreloader();
        self.currentUserManager.init(function(){
            self.loadMaterials(function(){
                self.drawMaterials();
                self.initButtons();
                disablePreloader();
            });
        });
    }

    this.loadMaterials = function(callback){
        console.log('loading materials');
        if (gup('materialId') != undefined){
            self.loadMaterialsByMaterialId(function(){
                callback();
            });
            return;
        }
        if (gup('vimeoId') != undefined){
            self.loadMaterialsByVimeoId(function(){
                callback();
            });
            return;
        }
        if (gup('groupId') != undefined){
            self.loadMaterialsByGroupId(function(){
                callback();
            });
            return;
        }
        alert('wrong url!');
    }

    this.loadMaterialsByVimeoId = function(callback){
        var vimeoId = gup('vimeoId');
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.equalTo('vimeoId', vimeoId);
        q.find(function(results){
            self.materials = results;
            callback();
        });
    }

    this.loadMaterialsByMaterialId = function(callback){
        var materialId = gup('materialId');
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.get(materialId, function(m){
            self.materials = [m];
            callback();
        });
    }

    this.loadMaterialsByGroupId = function(callback){
        console.log('loadMaterialsByGroupId');
        var groupId = gup('groupId');
        if (groupId == undefined){
            return;
        }
        console.log('groupId = ' + groupId);
        var q = new Parse.Query(Parse.Object.extend('MaterialGroup'));
        q.get(groupId, function(g){
            $('#groupName').html(g.get('name'));
            $('#groupDescription').html( (g.get('description') == undefined) ? '' : g.get('description') );
            $('#groupNameBlock').show();
            var ids = g.get('materials');
            var q1 = new Parse.Query(Parse.Object.extend('PatientMaterial'));
            q1.containedIn('objectId', ids);
            q1.limit(1000);
            q1.find(function(results){
                self.materials = results;
                callback();
            });
        });
    }




    this.initButtons = function(){
        $('#closeLink').bind('click', function(){
            $('#videoBlock').hide();
            $('#iframePlaceholder').html('');
            $('.searchItem').removeClass('selected');
            $('#videoInfoBlock').hide();
        });

        $('#infoModal').on('hidden.bs.modal', function () {
            $('#infoModal .modal-body').html($('#infoModal .modal-body').html());
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

    }

    this.drawMaterials = function(){
        var s = '';
        var list = self.materials;
        for (var i in list){
            s+= self.getSearchItem(list[i]);
        }
        $('#searchResults').html(s);
        self.hideVideo();
        console.log('drawMaterials: list.length = ' + list.length);
        if (list.length == 1){
            setTimeout(function(){
                $('.searchItem:first').click();
            }, 300);
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

    this.prepareSelectedMaterial = function(){
        var m = self.selectedMaterial;
        $('#iframePlaceholder').html(self.getIframeHtml(m.get('vimeoId')));
        $('#videoBlock').show();
        $('#videoInfoBlock').show();

        var tr = (m.get('transcript') == undefined) ? '' : m.get('transcript');
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



}