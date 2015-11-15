/**
 * Created by sabir on 18.12.14.
 */

var TeacherArticleManager = function(){
    var self = this;
    this.articles = [];
    this.currentUserManager = new CurrentUserManager();
    this.newArticle = undefined;
    this.selectedArticle = undefined;
    this.editEditor = undefined;
    this.createEditor = undefined;
    this.albumManager = new ArticlesAlbumManager();


    this.init = function(){
        initParse();
        //self.initEditor();
        self.initPreviewButton();
        self.initCreateNewArticleButton();
        self.initUpdateArticleButton();
        self.initArticleItem();
        self.initCountable();
        self.initDeleteArticleButton();
        self.currentUserManager.init(function(){
            self.loadArticles(function(){
                self.initAlbumManager(function(){
                    self.drawArticlesList();
                });
            });
        });
    }

    this.loadArticles = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientArticle'));
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('ownerId', self.currentUserManager.currentUser.id);
        enablePreloader();
        q.find(function(list){
            self.articles = list;
            disablePreloader();
            callback();
        });
    }

    this.initAlbumManager = function(callback){
        self.albumManager.onDropdownAlbumSelected = function(a){
            console.log('callback invoked');
            self.saveArticleAlbum((a == undefined) ? a : a.id);
        }
        self.albumManager.init(function(){
            callback();
        });
    }

    this.prepareArticleAlbumDropdown = function(){
        var a = self.selectedArticle;
        self.albumManager.refreshSelect(a.get('albumId'));
    }


    this.initEditor = function(){
        self.createEditor = new MediumEditor(".editable", {
            buttonLabels: "fontawesome"
        });
        $('.editable').mediumInsert({
            editor: self.createEditor,
            addons: {
                embeds: {
                    oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
                }
            }
        });
        self.editEditor = new MediumEditor("#editEditor", {
            buttonLabels: "fontawesome"
        });
        $('#editEditor').mediumInsert({
            editor: self.editEditor,
            addons: {
                embeds: {
                    oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
                }
            }
        });
    }

    this.initUpdateEditor = function(){
        self.editEditor = new MediumEditor("#editEditor", {
            buttonLabels: "fontawesome",
            buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote', 'image', 'superscript', 'subscript', 'strikethrough', 'unorderedlist', 'orderedlist', 'pre', 'justifyLeft', 'justifyFull', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
        });
        $('#editEditor').mediumInsert({
            editor: self.editEditor,
            addons: {
                embeds: {
                    oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
                }
            }
        });
    }

    this.initPreviewButton = function(){
        $('#previewButton').bind('click', function(){
            var allContents = self.createEditor.serialize();
            var h = allContents["element-0"].value;
            $('#previewArticle').html(h);
            $('#previewModal').modal();
        });
        $('#editPreviewButton').bind('click', function(){
            var allContents = self.editEditor.serialize();
            var h = allContents["editEditor"].value;
            $('#previewArticle').html(h);
            $('#previewModal').modal();
        });
    }

    this.getCreateEditorText = function(){
        var allContents = self.createEditor.serialize();
        var h = allContents["element-0"].value;
        return h;
    }



    this.getArticleItem = function(a){
        var s = '';
        s+='<li class="articleItem" data-id="' + a.id + '"  >' + a.get('name') + '</li>';
        return s;
    }

    this.drawArticlesList = function(){
        var list = self.articles;
        var s = '';
        for (var i in list){
            s+=self.getArticleItem(list[i]);
        }
        $('#articlesList').html(s);
        if (list.length == 0){
            $('#addNewArticleButton').click();
        }else{
            $('.articleItem:first').click();
        }
    }

    this.initCreateNewArticleButton = function(){
        $('#addNewArticleButton').bind('click', function(){
            $('#showArticleBlock').hide();
            $('#editEditorBlock').hide();
            $('#createEditorBlock').show();
            $('.articleItem').removeClass('selected');
            self.initEditor();
        });

        $('#createButton').bind('click', function(){
            var name = $('#articleName').val().trim();
            var description = $('#articleDescription').val().trim();
            var tags = $('#articleTags').val().trim().split(",");
            var vocabulary = $('#articleVocabulary').val().trim().split(",");

            var content = self.getCreateEditorText();

            var imgSrc = $('#createThumbnail').val().trim();
            if (imgSrc == ''){
                imgSrc = undefined;
            }
            var PatientArticle = Parse.Object.extend('PatientArticle');
            a = new PatientArticle();
            a.set('ownerId', self.currentUserManager.currentUser.id);
            a.set('name', name);
            a.set('imgSrc', imgSrc);
            a.set('description', description);
            a.set('tags', tags);
            a.set('vocabulary', vocabulary);
            a.set('content', content);
            enablePreloader();
            a.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });

        });
    }

    this.initUpdateArticleButton = function(){
        $('#showUpdateBlockButton').bind('click', function(){
            $('#showArticleBlock').hide();
            $('#editEditorBlock').show();
            $('#createEditorBlock').hide();

        });

        $('#updateArticleButton').bind('click', function(){
            var allContents = self.editEditor.serialize();
            var content = allContents["editEditor"].value;
            var name = $('#editName').val().trim();
            var imgSrc = $('#editThumbnail').val();
            if (imgSrc == ''){
                imgSrc = 'http://disk.englishpatient.org/uploads/dPwIvwMfY7VbA9x.png';
            }
            var description = $('#editDescription').val().trim();
            var tags = $('#editTags').val().trim().split(",");
            var voc = $('#editVocabulary').val().trim().split(",");

            var a = self.selectedArticle;
            a.set('name', name);
            a.set('description', description);
            a.set('tags', tags);
            a.set('vocabulary', voc);
            a.set('imgSrc', imgSrc);
            a.set('content', content);
            enablePreloader();
            a.save().then(function(){
                disablePreloader();
                window.location.href = window.location.href;
            });
        });
    }


    this.prepareUpdateBlock = function(){
        var a = self.selectedArticle;
        $('#editName').val(a.get('name'));
        $('#editThumbnail').val((a.get('imgSrc') == undefined) ? '' : a.get('imgSrc'));
        $('#articleShareLink').attr('href','http://article.englishpatient.org/article.php?id=' + self.selectedArticle.id);
        $('#editDescription').val(a.get('description'));
        $('#editTags').val(a.get('tags').join(', '));
        $('#editVocabulary').val((a.get('vocabulary') == undefined) ? '' : a.get('vocabulary').join(', '));
        $('#editEditor').html(a.get('content'));
        var perc = Math.floor(a.get('content').length / 1000.0);
        $('.patientProgress').css('width', perc + '%')
        //self.initEditor();
        setTimeout(function(){
            self.initUpdateEditor();
        },500);

    }


    this.prepareSelectedArticle = function(){
        var a = self.selectedArticle;
        $('#showArticleBlock').show();
        $('#createEditorBlock').hide();
        $('#editEditorBlock').hide();

        $('#coverImage').attr('src', a.get('imgSrc'));

        $('#demoArticle').html(a.get('content'));
        $('#demoName').html(a.get('name'));
        $('#demoDescription').html(a.get('description'));
        $('#demoTags').html(a.get('tags'));
        $('#creationDate').html(moment(a.createdAt).format('DD.MM.YYYY HH:mm'));
        self.prepareUpdateBlock();
        self.albumManager.refreshSelect(a.get('albumId'));
    }

    this.initArticleItem = function(){
        $('body').on('click', '.articleItem', function(){
            $('.articleItem').removeClass('selected');
            $(this).addClass('selected');
            var id = $(this).attr('data-id');
            self.selectedArticle = self.getArticleById(id);
            self.prepareSelectedArticle();
        });
    }


    this.getArticleById = function(id){
        var list = self.articles;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.initCountable = function(){
        $('.editCountable').on('input', function(a) {
            var h = a.target,innerHTML;
            var perc = Math.floor(h.outerHTML.length / 1000.0);
            $('.patientProgress').css('width', perc + '%');
        });
    }

    this.initDeleteArticleButton = function(){
        $('#deleteButton').bind('click', function(){
            if (confirm('are you sure?') == false){
                return;
            }
            var a = self.selectedArticle;
            enablePreloader();
            a.destroy({
                success: function(){
                    disablePreloader();
                    window.location.href = window.location.href;
                }
            });
        });
    }

    this.saveArticleAlbum = function(albumId){
        if (self.selectedArticle == undefined){
            return;
        }
        self.selectedArticle.set('albumId', albumId);
        enablePreloader();
        self.selectedArticle.save().then(function(){
            disablePreloader();
            $('.articleItem:first').click();
        });
    }



}