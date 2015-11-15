/**
 * Created by sabir on 19.12.14.
 */

var MaterialsGroupManager = function(){
    var self = this;
    this.groups = [];
    this.currentUserManager = new CurrentUserManager();
    this.selectedGroup = undefined;
    this.selectedMaterials = undefined;
    this.allUserMaterials = [];

    this.init = function(){
        initParse();
        self.initCreateButton();
        self.initEditButton();
        self.initGroupItem();
        self.currentUserManager.init(function(){
            self.loadAllUserMaterials(function(){
                self.loadGroups(function(){
                    self.drawGroups();
                });
            });
        });
    }


    this.loadGroups = function(callback){
        var q = new Parse.Query(Parse.Object.extend('MaterialGroup'));
        q.limit(1000);
        q.equalTo('ownerId', self.currentUserManager.currentUser.id);
        enablePreloader();
        q.find(function(results){
            self.groups = results;
            disablePreloader();
            callback();
        });
    }



    this.getGroupItem = function(g){
        var s = '';
        s+='';
        s+='<div class="col-xs-4 groupItem " data-id="' + g.id + '" >'
        +'<section class="panel position-relative">'
        +'<div class="panel-body">'
        +'<div class="overflow-hidden bb">'
        +'<p class="no-m" style="cursor: pointer;" onclick="window.location.href=\'materials.html?groupId=' + g.id +'\'" >'
        +'<b>' + g.get('name') + '</b>'
        +'</p>'
        + '<small><b>' + g.get('tags').join(',') + '</b></small>'

        +'</div>'
        +'<p class="small">'
        +'' + g.get('description')
        +'</p>'
        +'</div>' +
        '<div><i class="ti-trash delete mr5 ml5" data-id="' + g.id + '" ></i> <i class="ti-pencil edit mr5 ml5" data-id="' + g.id + '"  ></i> <i class="ti-eye showItem mr5 ml5" data-id="' + g.id + '"  ></i><i class="ti-control-play mr5 ml5 playItem " data-id="' + g.id + '" ></i></div>'
        + '</section>'
        +'</div>';

        return s;
    }

    this.drawGroups = function(){
        var s = '';
        var list = self.groups;
        for (var i in list){
            s+=self.getGroupItem(list[i]);
        }
        $('#groupsPlaceholder').append(s);
    }

    this.initGroupItem = function(){
        $('body').on('click', '.groupItem .showItem', function(){
            var id = $(this).attr('data-id');
            self.selectedGroup = self.getGroupById(id);
            self.prepareDemoModal();
        });
        $('body').on('click', '.groupItem .edit', function(){
            var id = $(this).attr('data-id');
            self.selectedGroup = self.getGroupById(id);
            self.prepareEditModal();
        });
        $('body').on('click', '.groupItem .delete', function(){
            if (confirm('are you sure') == false){
                return;
            }
            var id = $(this).attr('data-id');
            self.selectedGroup = self.getGroupById(id);
            self.deleteSelectedGroup(function(){
                window.location.href = window.location.href;
            });
        });
        $('body').on('click', '.groupItem .playItem', function(){
            var id = $(this).attr('data-id');
            window.location.href='player.html?groupId=' + id;
        });
    }

    this.deleteSelectedGroup = function(callback){
        var g = self.selectedGroup;
        enablePreloader();
        g.destroy({
            success: function(){
                disablePreloader();
                callback();
            }
        });
    }

    this.getGroupById = function(id){
        var list = self.groups;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.prepareDemoModal = function(){
        var g = self.selectedGroup;
        self.selectedMaterials = self.getSelectedMaterials();
        $('#demoGroupName').html(g.get('name'));
        var content = self.getDemoModalContent();
        if (content == ''){
            content = 'You have no materials in this group. Add it <a style="text-decoration: underline;" href="materials.html?groupId=' + g.id + '" >there</a>';
        }
        $('#demoContent').html(content);
        $('#demoModal').modal();
    }


    this.getDemoModalContent = function(){
        var list = self.selectedMaterials;
        var s = '';
        for (var i in list){
            s+=self.getDemoMaterialItem(list[i]);
        }
        return s;
    }

    this.getDemoMaterialItem = function(m){
        var s = '';
        s+='<div class="demoMaterialItem" >' +
        '<h4 class="materialName" >' + m.get('name') + '</h4>' +
        '<div class="demoIframePlaceholder" >' +
            '<iframe class="demoMaterial" src="//player.vimeo.com/video/' + m.get('vimeoId') + '?title=0&byline=0&portrait=0"width="480" height="270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' +
        '</div>' +
        '' +
        '</div>';
        return s;
    }

    this.loadAllUserMaterials = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.limit(1000);
        q.addAscending('name');
        q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        enablePreloader();
        q.find(function(results){
            self.allUserMaterials = results;
            callback();
            disablePreloader();
        });
    }

    this.getSelectedMaterials = function(){
        var g = self.selectedGroup;
        console.log('selected group = ', g);
        var materialsArray = g.get('materials');
        console.log('materialsArray = ', materialsArray);
        var arr = [];
        var list = self.allUserMaterials;
        for (var i in list){
            console.log('checking if ' + list[i].id + ' is in array ', materialsArray.map(function(t){return t}));
            if ($.inArray(list[i].id, materialsArray) > -1){
                arr.push(list[i]);
            }
        }
        console.log('selected materials = ', arr);
        return arr;
    }


    this.initCreateButton = function(){
        $('#createButton').bind('click', function(){
            var name = $('#createName').val().trim();
            if (name == undefined || name == ''){
                toastr.error('Name is empty');
                return;
            }
            var description = $('#createDescription').val().trim();
            var tags = $('#createTags').val().split(',').map(function(t){return t.trim()});
            var MaterialGroup = Parse.Object.extend('MaterialGroup');
            var q = new Parse.Query(MaterialGroup);
            q.equalTo('ownerId', self.currentUserManager.currentUser.id);
            q.equalTo('name', name);
            enablePreloader();
            q.find(function(results){
                if (results.length > 0){
                    toastr.error('Group with name "' + name + '" already exists');
                    disablePreloader();
                    return;
                }
                var g = new MaterialGroup();
                g.set('ownerId', self.currentUserManager.currentUser.id);
                g.set('name', name);
                g.set('description', description);
                g.set('tags', tags);
                g.save().then(function(){
                    disablePreloader();
                    window.location.href = window.location.href;
                });
            });
        });
    }


    this.prepareEditModal = function(){
        var g = self.selectedGroup;
        $('#editName').val(g.get('name'));
        $('#editDescription').val(g.get('description'));
        $('#editTags').val(g.get('tags').join(','));
        $('#editModal').modal();
    }

    this.initEditButton = function(){
        $('#editButton').bind('click', function(){
            var name = $('#editName').val().trim();
            var description = $('#editDescription').val().trim();
            var tags = $('#editTags').val().split(',').map(function(t){return t.trim()});
            var g = self.selectedGroup;
            g.set('name', name);
            g.set('description', description);
            g.set('tags', tags);
            enablePreloader();
            g.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }

}