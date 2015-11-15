/**
 * Created by sabir on 21.07.15.
 */

var PatientInstrumentsMenuManager = function(){
    var self = this;
    this.panels = [];
    this.materials = [];
    this.selectedPanel = undefined;
    this.remarkable = new Remarkable();


    this.init = function(){
        initParse();
        self.initPanelItem();
        self.initCreateBlock();
        self.initDeleteButtons();
        self.initEditButtons();
        self.loadPanels(function(){
            console.log('panelsLoaded: ', self.panels);
            self.drawPanels();
        });



    }

    this.loadPanels = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientMenuBlock'));
        q.addAscending('parentId');
        q.addAscending('number');
        q.limit(1000);
        q.find(function(results){
            self.materials = results;
            self.panels = self.prettifyMaterials(results);
            callback();
        });
    }


    this.prettifyMaterials = function(){
        var map = {};
        var arr = [];
        var list = self.materials;
        for (var i in list){
            var p = list[i];
            if (list[i].get('parentId') == undefined){
                map[list[i].id] = {
                        mainPanel: {
                                name: p.get('name'),
                                imgSrc: p.get('imgSrc'),
                                description: p.get('description'),
                                blockDescription: p.get('blockDescription'),
                                id: p.id
                            },
                        panels: []
                    }
                }
        }

        for (var i in list){
            if (list[i].get('parentId') != undefined){
                var p = list[i];
                if (map[p.get('parentId')] == undefined){
                    continue;
                }
                map[p.get('parentId')].panels.push({
                    name: p.get('name'),
                    imgSrc: p.get('imgSrc'),
                    description: p.get('description'),
                    id: p.id
                });
            }
        }
        for (var key in map){
            arr.push(map[key]);
        }
        return arr;
    }

    this.drawPanels = function(){
        var s = '';
        console.log('drawing panels: ', self.panels);
        var list = self.panels;
        for (var i in list){
            s+= self.getItemHtml(list[i]);
        }
        $('#panelsPlaceholder').html(s);
    }

    this.getItemHtml = function(item){
        var s = '';
        s+= self.getParentPanelHtml(item.mainPanel);
        var list = item.panels;
        s+= '<div class="childrenPlaceholder">';
        for (var i in list){
            s+= self.getChildPanelHtml(list[i]);
        }
        s+='</div>';
        return s;
    }

    this.getParentPanelHtml = function(p){
        var s = '';
        s+= '<div class="panel parentPanel" data-id="' + p.id + '" >' +
                    '<div class="imagePlaceholder">' +
                    '<img src="' + p.imgSrc + '" />' +
                    '</div>' +
                    '<div class="contentPlaceholder">' +
                        '<div class="namePlaceholder">' + p.name +
                        '</div>' +
            '' +
                        '<div>' +
                    '' +
                        '' + self.remarkable.render(p.description) + '' +
                        '</div>' +
                    '</div>' +
                    '<div class="controlsBlock">' +
                        '<button class="deleteButton btn ui button danger btn-danger btn-small" data-id="' + p.id + '" >delete!</button>' +
                        '<button class="editButton btn ui button danger btn-danger btn-small" data-id="' + p.id + '" >edit!</button>' +
                    '</div>' +
            '' +
            '</div>' +
            '<div class="blockDescription">' +
            '' + self.remarkable.render(p.blockDescription) +
            '</div>';
        console.log('getParentPanelHtml: returning s = ', s);
        return s;
    }

    this.getChildPanelHtml = function(item){
        var s = '';
        s+= '<div class="panel childPanel" data-id="' + item.id +'" >' +
                '<div class="imagePlaceholder" >' +
                '   <img src="' + item.imgSrc + '" />' +
                '</div>' +
                '<div class="contentPlaceholder">' +
                '<div class="namePlaceholder" >' + item.name + '</div>' +
                '<div class="descriptionPlaceholder" >' + self.remarkable.render(item.description) + '</div>' +
                '</div>' +
            '<div class="controlsBlock">' +
            '<button class="deleteButton btn ui button danger btn-danger btn-small" data-id="' + item.id + '" >delete!</button>' +
            '<button class="editButton btn ui button danger btn-danger btn-small" data-id="' + item.id + '" >edit</button>' +
            '</div>' +
            '' +
            '</div>';
        console.log('getChildPanelHtml: returning s = ', s);
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

    this.initPanelItem = function(){
        $('body').on('click', '.panel', function(){
            self.selectedPanel = self.getMaterialById($(this).attr('data-id'));
            $('.panel').removeClass('active');
            $(this).addClass('active');
            $('#parentNamePlaceholder').html('');
            if (self.isParent($(this).attr('data-id')) == true){
                $('#parentNamePlaceholder').html('Создание подпункта: <b>' + self.selectedPanel.get('name') + '</b>');
            }
        });
    }

    this.initCreateBlock = function(){
        $('#createButton').bind('click', function(){
            var name = $('#name').val().trim();
            var description = $('#description').val().trim();
            var imgSrc = $('#imgSrc').val().trim();
            var vimeoId = $('#vimeoId').val().trim();
            var videoText = $('#videoText').val().trim();
            var blockDescription = $('#blockDescription').val().trim();
            var PatientMenuBlock = Parse.Object.extend('PatientMenuBlock');
            var p = new PatientMenuBlock();
            p.set('name', name);
            p.set('vimeoId', vimeoId);
            p.set('videoText', videoText);
            p.set('description', description);
            p.set('imgSrc', imgSrc);
            p.set('blockDescription', blockDescription);
            if (self.selectedPanel != undefined){
                p.set('parentId', self.selectedPanel.id);
                var children = self.getChildrenByParentId(self.selectedPanel.id);
                p.set('number', children.length);
            }
            p.save().then(function(){
                alert('saved!');
                window.location.href = window.location.href;
            });
        });
    }

    this.initDeleteButtons = function(){
        $('body').on('click', '.deleteButton', function(){
            var id = $(this).attr('data-id');
            var p = self.getMaterialById(id);
            if (confirm('are you sure?') == false){
                return;
            }
            p.destroy({
                success: function(){
                    //alert('destroyed!');
                    window.location.href = window.location.href;
                }
            });
        });
    }

    this.initEditButtons = function(){
        $('body').on('click', '.editButton', function(){
            var id = $(this).attr('data-id');
            var p = self.getMaterialById(id);
            self.selectedPanel = p;
            $('#editModal').modal();
            $('#editName').val(p.get('name'));
            $('#editVimeoId').val(p.get('vimeoId'));
            $('#editVideoText').val(p.get('videoText'));
            $('#editDescription').val(p.get('description'));
            $('#editImgSrc').val(p.get('imgSrc'));
            $('#editBlockDescription').val(p.get('blockDescription'));
        });
        $('#updateButton').bind('click', function(){
            var name = $('#editName').val().trim();
            var description = $('#editDescription').val().trim();
            var imgSrc = $('#editImgSrc').val().trim();
            var vimeoId = $('#editVimeoId').val().trim();
            var videoText = $('#editVideoText').val().trim();
            var blockDescription = $('#editBlockDescription').val().trim();
            self.selectedPanel.set('name', name);
            self.selectedPanel.set('description', description);
            self.selectedPanel.set('imgSrc', imgSrc);
            self.selectedPanel.set('videoText', videoText);
            self.selectedPanel.set('blockDescription', blockDescription);
            self.selectedPanel.set('vimeoId', vimeoId);
            self.selectedPanel.save().then(function(){
                alert('updated');
                window.location.href = window.location.href;
            });
        });
    }

    this.getChildrenByParentId = function(id){
        var arr = [];
        var list = self.materials;
        for (var i in list){
            if (list[i].get('parentId') == id){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    this.isParent = function(id){
        var m = self.getMaterialById(id);
        if (m.get('parentId') == undefined){
            return true;
        }
        return false;
    }


}