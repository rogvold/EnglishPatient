/**
 * Created by sabir on 19.12.14.
 */


var TeacherMaterialsManager = function(){
    var self = this;
    this.currentUserManager = new CurrentUserManager();
    this.materials = [];
    this.selectedMaterial = undefined;
    this.filteredMaterials = [];
    this.taggle = undefined;
    this.tags = [];
    this.editTaggle = undefined;
    this.group = undefined;
    this.userGroups = [];
    this.allMaterials = [];
    this.updateGroupsList = [];
    this.createGroupsList = [];
    this.mosesModalEditorManager = new MosesModalEditorManager();


    this.init = function(){
        initParse();
        self.mosesModalEditorManager.init();
        self.initMaterialsItem();
        self.initTaggle();
        self.initMaterialCreationBlock();
        self.initSearch();
        self.initUpdateButton();
        self.initDeleteUpdateGroup();
        self.initDeleteCreateGroup();
        self.initCreateAddGroupButton();
        self.initUpdateAddGroupButton();
        self.initDeleteSelectedMaterialButton();
        self.currentUserManager.init(function(){
            self.loadMaterials(function(){
                console.log('MATERIALS LOADED!!!');
                self.checkImagesUrl();
                //setTimeout(function(){self.checkImagesUrl()}, 3000);
                self.loadCurrentGroup(function(){
                    console.log('userGroup loaded. starting loading groups');
                    self.loadUserGroups(function(){
                        self.drawMaterials();
                        self.prepareCreateGroupsList();
                        $('.materialItem:first').click();
                        setTimeout(function(){self.checkImagesUrl()}, 7000); // checking images
                    });

                });

            });
        });
    }

    this.loadMaterials = function(callback){ //todo: add recursion
        //console.log('loadMaterials occured');
        //enablePreloader();
        //var PatientMaterial = Parse.Object.extend('PatientMaterial');
        //var q = new Parse.Query(PatientMaterial);
        //q.equalTo('creatorId', self.currentUserManager.currentUser.id);
        //q.limit(1000);
        //q.ascending('name');


        self.loadAllMaterials(function(list){
            self.materials = list;
            self.allMaterials = list;
            self.filteredMaterials = list;
            self.initAllTags();
            disablePreloader();
            callback();
        });

        //q.find(function(list){
        //    self.materials = list;
        //    self.allMaterials = list;
        //    self.filteredMaterials = list;
        //    self.initAllTags();
        //    disablePreloader();
        //    callback();
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
            callback(results);
        });
    }

    this.initMaterialsItem = function(){
        $('body').on('click', '.materialItem', function(){
            $('.materialItem').removeClass('selected');
            $(this).addClass('selected');
            var mId = $(this).attr('data-id');
            console.log('mId = ', mId);
            self.selectedMaterial = self.getMaterialById(mId);
            console.log('selected material = ', self.selectedMaterial);
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
        console.log('drawing materials');
        $('#materialsList').html(s);
        self.prepareCreateGroupsList();
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
            q.equalTo('creatorId', self.currentUserManager.currentUser.id);
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
                m.set('creatorId', self.currentUserManager.currentUser.id);
                enablePreloader();
                //thumbnail_large
                loadVimeoInfo(vimeoId, function(d){
                    var vimeoImgSrc = d.thumbnail_large;
                    var duration = d.duration;
                    m.set('vimeoImgSrc', vimeoImgSrc);
                    m.set('duration', duration);
                    m.save().then(function(mat){
                        disablePreloader();
                        self.addMaterialToCreateGroups(mat.id, function(){
                            toastr.success('SUCCESS');
                            setTimeout(function(){window.location.href = window.location.href}, 500);
                        });
                    });
                });

                //loadVimeoImgSrc(vimeoId, function(vimeoImgSrc){
                //    m.set('vimeoImgSrc', vimeoImgSrc);
                //    m.save().then(function(mat){
                //        disablePreloader();
                //        self.addMaterialToCreateGroups(mat.id, function(){
                //            toastr.success('SUCCESS');
                //            setTimeout(function(){window.location.href = window.location.href}, 500);
                //        });
                //    });
                //});


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
        $('#mosesEditorButton').attr('data-vimeoId', m.get('vimeoId'));
        $('#videoBlock').html('<iframe src="//player.vimeo.com/video/' + m.get('vimeoId') + '?title=0&byline=0&portrait=0"width="480" height="270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        self.prepareEditTaggle();
        self.prepareUpdateGroups();


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

                var s = (ts[j] == undefined) ? '' : ts[j];
                var s2 = (m.get('name') == undefined) ? '' : m.get('name');
                var s3 = (m.get('transcript') == undefined) ? '' : m.get('transcript');
                var s4 = (m.get('vimeoId') == undefined) ? '' : m.get('vimeoId');


                if ((s.indexOf(q) > -1 )|| (s2.indexOf(q) > -1 ) || (s3.indexOf(q) > -1 ) || (s4.indexOf(q) > -1 ) ){
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
                disablePreloader();
                return;
            }
            if (name == '' || name == undefined){
                toastr.error('name should be specified');
                disablePreloader();
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
                self.makeUpdateGroupsStuff();
                //window.location.href = window.location.href;
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
        console.log('---->>>>>>>checking images');
        var list = self.materials;
        var arr = [];
        for (var i in list){
            //if (list[i].get('vimeoImgSrc').indexOf('default_640') > -1){
            //    arr.push(list[i]);
            //}
        }
        if (arr.length == 0){
            return;
        }
        console.log('loading from vimeo!');
        loadVimeoImgSrc(arr[0].get('vimeoId'), function(url){
            arr[0].set('vimeoImgSrc', url);
            arr[0].save().then(function(){
                //window.location.href = window.location.href;
            });
        })
    }

    this.loadCurrentGroup = function(callback){
        var gId = gup('groupId');
        if (gId == undefined){
            $('.nameBlock').hide();
            callback();
            return;
        }
        enablePreloader();
        var q = new Parse.Query(Parse.Object.extend('MaterialGroup'));
        q.get(gId, {
            success: function(g){
                self.group = g;
                $('.groupName').text(g.get('name'));
                $('.playerButton').attr('href', 'player.html?groupId=' + g.id);
                var materials = g.get('materials');
                var list = self.allMaterials;
                var arr = [];
                for (var i in list){
                    if ($.inArray(list[i].id, materials) > -1){
                        arr.push(list[i]);
                    }
                }
                self.materials = arr;
                self.filteredMaterials = arr;
                console.log('current group', g);
                disablePreloader();
                callback();
            },
            error: function(err){
                console.log('error');
                console.log(err);
                toastr.error(err.message);
                disablePreloader();
            }
        });

    }


    this.loadUserGroups = function(callback){
        console.log('loading groups');
        var q = new Parse.Query(Parse.Object.extend('MaterialGroup'));
        q.limit(1000);
        q.equalTo('ownerId', self.currentUserManager.currentUser.id);
        enablePreloader();
        q.find(function(results){
            self.userGroups = results;
            disablePreloader();
            console.log('userGroups', results);
            callback();
        });
    }

    this.getGroupsOfSelectedMaterial = function(){
        var m = self.selectedMaterial;
        var arr = [];
        var list = self.userGroups;
        for (var i in list){
            if ($.inArray(m.id, list[i].get('materials')) > -1){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.getGroupById = function(id){
        var list = self.userGroups;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.prepareUpdateGroups = function(){
        self.updateGroupsList = self.getGroupsOfSelectedMaterial();
        self.drawUpdateGroupLists();
        self.prepareUpdateDropdown();
    }

    this.getListExceptForOneWithSpecifiedId = function(id, list){
        //console.log('getListExceptForOneWithSpecifiedId', list);
        //console.log('id = ', id);
        var arr = [];
        for (var i in list){
            //console.log('comparing ', list[i].id + ' and ' + id);
            if (list[i].id == id){
                continue;
            }
            arr.push(list[i]);
        }
        console.log(list);
        return arr;
    }

    this.drawUpdateGroupLists = function(){
        var s = '';
        console.log('drawUpdateGroupLists, list = ', self.updateGroupsList);
        var list = self.updateGroupsList;
        for (var i in list){
            var g = list[i];
            s+='<li class="updateGroupsListItem" >' +
            '<span class="groupName" >' + g.get('name') + '</span>' +
            '<span class="groupControl" ><i class="ti-minus pull-right deleteUpdateGroup" data-id="' + g.id + '" style="cursor: pointer;"  ></i></span>' +
            '</li>';
        }
        $('#updateGroupsList').html(s);
    }

    this.initDeleteUpdateGroup = function(){
        $('body').on('click', '.deleteUpdateGroup', function(){
            var id = $(this).attr('data-id');
            console.log('deleting from list id = ' + id);
            self.updateGroupsList = self.getListExceptForOneWithSpecifiedId(id, self.updateGroupsList);
            var list = self.updateGroupsList;
            console.log(list);
            self.drawUpdateGroupLists();
            console.log(self.updateGroupsList);
        });
    }

    this.drawCreateGroupList = function(){
        console.log('drawCreateGroupList', self.createGroupsList);
        var s = '';
        var list = self.createGroupsList;
        for (var i in list){
            var g = list[i];
            s+='<li class="createGroupsListItem" >' +
            '<span class="groupName" >' + g.get('name') + '</span>' +
            '<span class="groupControl" ><i class="ti-minus pull-right deleteCreateGroup" data-id="' + g.id + '" style="cursor: pointer;"  ></i></span>' +
            '</li>';
        }
        $('#createGroupsList').html(s);
    }

    this.drawUpdateGroupList = function(){
        console.log('drawUpdateGroupList', self.updateGroupsList);
        var s = '';
        var list = self.updateGroupsList;
        for (var i in list){
            var g = list[i];
            s+='<li class="updateGroupsListItem" >' +
            '<span class="groupName" >' + g.get('name') + '</span>' +
            '<span class="groupControl" ><i class="ti-minus pull-right deleteUpdateGroup" data-id="' + g.id + '" style="cursor: pointer;"  ></i></span>' +
            '</li>';
        }
        $('#updateGroupsList').html(s);
    }

    this.prepareCreateGroupsList = function(){
        console.log('preparing prepareCreateGroupsList');
        self.createGroupsList = (self.group == undefined) ? [] : [self.group];
        self.drawCreateGroupList();
        self.prepareCreateDropdown();
    }

    this.initDeleteCreateGroup = function(){
        $('body').on('click', '.deleteCreateGroup', function(){
            var id = $(this).attr('data-id');
            self.createGroupsList = self.getListExceptForOneWithSpecifiedId(id, self.createGroupsList);
            self.drawCreateGroupList();
        });
    }

    this.prepareCreateDropdown = function(){
        var s = '';
        var list = self.userGroups;
        //console.log('prepareCreateDropdown', list);
        if (self.group != undefined){
            list = self.getListExceptForOneWithSpecifiedId(self.group.id, list);
        }
        for (var i in list){
            s+='<option value="' + list[i].id + '" >' + list[i].get('name') + '</option>';
        }
        //console.log(s);
        $('#createGroupSelect').html(s);
    }

    this.prepareUpdateDropdown = function(){
        var s = '';
        var list = self.userGroups;
        //console.log('prepareCreateDropdown', list);
        if (self.group != undefined){
            list = self.getListExceptForOneWithSpecifiedId(self.group.id, list);
        }
        for (var i in list){
            s+='<option value="' + list[i].id + '" >' + list[i].get('name') + '</option>';
        }
        //console.log(s);
        $('#updateGroupSelect').html(s);
    }

    self.initUpdateAddGroupButton = function(){
        $('#updateAddGroupButton').bind('click', function(){
            var gId = $('#updateGroupSelect').val();
            self.updateGroupsList.push(self.getGroupById(gId));
            self.drawUpdateGroupList();
        });
    }

    self.initCreateAddGroupButton = function(){
        $('#createAddGroupButton').bind('click', function(){
            var gId = $('#createGroupSelect').val();
            self.createGroupsList.push(self.getGroupById(gId));
            self.drawCreateGroupList();
        });
    }

    this.addMaterialToCreateGroups = function(mId, callback){
        var groups = self.createGroupsList;
        console.log('createGroupsList = ', self.createGroupsList);
        for (var i in groups){
            var mids = groups[i].get('materials');
            if (mids == undefined){
                mids = [];
            }

            mids.push(mId);
            groups[i].set('materials', mids);
        }
        callback();
        enablePreloader();
        Parse.Object.saveAll(groups, {
            success: function(){
                disablePreloader();
                callback();
            }
       });
    }

    this.deleteMaterialFromGroups = function(callback){
        var m =self.selectedMaterial;
        var list = self.userGroups;
        for (var i in list){
            var ms = (list[i].get('materials') == undefined ) ? [] : list[i].get('materials') ;
            var arr = [];
            for (var u in ms){
                if (ms[u] != m.id){
                    arr.push(ms[u]);
                }
            }
            list[i].set('materials', arr);
        }
        enablePreloader();
        Parse.Object.saveAll(list, {
            success: function(ssd){
                self.userGroups = ssd;
                disablePreloader();
                callback();
            }
        });
    }

    this.addMaterialToGroups = function(groups, callback){
        var m = self.selectedMaterial;
        console.log('adding material to ', groups);
        for (var i in groups){
            var ms = (groups[i].get('materials') == undefined ) ? [] : groups[i].get('materials');
            if ($.inArray(m.id, ms) > -1){
                continue;
            }
            ms.push(m.id);
            groups[i].set('materials', ms);
        }
        enablePreloader();
        Parse.Object.saveAll(groups, {
            success: function(){
                disablePreloader();
                callback();
            }
        });
    }

    this.makeUpdateGroupsStuff = function(){
        var m = self.selectedMaterial;
        var list = self.userGroups;
        enablePreloader();
        self.deleteMaterialFromGroups(function(){
            //var ll = self.updateGroupsList.map(function(gi){self.getGroupById(gi.id)})
            var ll = self.updateGroupsList;
            self.addMaterialToGroups(ll, function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }

    this.initDeleteSelectedMaterialButton = function(){
        $('#deleteSelectedMaterialButton').bind('click', function(){
            var m = self.selectedMaterial;
            if (confirm('Вы точно уверены, что хотите удалить этот материал? Он будет потерян безвозвратно.') == false){
                return;
            }
            enablePreloader();
            m.destroy({
                success: function(){
                    disablePreloader();
                    toastr.success('Deleted!');
                    window.location.href = window.location.href;
                }
            });
        });
    }

}
