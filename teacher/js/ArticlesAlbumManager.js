/**
 * Created by sabir on 17.04.15.
 */

var ArticlesAlbumManager = function(){
    var self = this;
    this.albums = [];
    this.currentUserManager = new CurrentUserManager();
    this.selectedAlbum = undefined;
    this.selectedAlbumId = undefined;
    this.selectedDropdownAlbum = undefined;

    this.init = function(callback){
        console.log('articles album manager init occured');
        initParse();
        self.initCreateAlbumButton();
        self.initAlbumItem();
        self.initArticleAlbumSelect();
        self.currentUserManager.init(function(){
            self.loadArticlesAlbums(function(){
                self.drawAlbums();
                self.drawDropdownHtml();
                if (callback != undefined){
                    callback();
                }
            });
        });
    }

    this.loadArticlesAlbums = function(callback){
        var q = new Parse.Query(Parse.Object.extend('ArticlesAlbum'));
        q.equalTo('ownerId', self.currentUserManager.currentUser.id);
        q.limit(1000);
        q.find(function(results){
            self.albums = results;
            callback();
        });
    }

    this.drawAlbums = function(){
        var s = '';
        var list = self.albums;
        for (var i in list){
            s+= self.getAlbumItemHtml(list[i]);
        }
        $('#articlesAlbumPlaceholder').html(s);
    }

    this.getAlbumItemHtml = function(g){
        var s = '';
        var selClass = (self.selectedAlbum != undefined && self.selectedAlbum.id == g.id) ? ' selected ' : '';
        s+='<div class="articlesAlbumItem ' + selClass + ' " data-id="' + g.id + '" >' +
                '<div class="avatarPlaceholder" >' +
                    '<img src="' + g.get('avatarSrc') + '" />' +
                    '<div class="articlesAlbumName">' + g.get('name') + '</div>' +
                '</div>' +
        '</div>';
        return s;
    }

    this.initAlbumItem = function(){
        $('body').on('click', '.articlesAlbumItem', function(){
            var id = $(this).attr('data-id');
            self.selectedAlbum = self.getAlbumById(id);
            $('.articlesAlbumItem').removeClass('selected');
            $(this).addClass('selected');
            self.albumSelectedCallback(self.selectedAlbum);
        });
    }

    this.albumSelectedCallback = function(a){
        $('#albumEditModal').modal();
        $('#editAlbumName').html(a.get('name'));

    }

    this.loadSelectedAlbumArticles = function(){
        var q = new Parse.Query(Parse.Object.extend('PatientArticle'));
        q.equalTo('albumId', self.selectedAlbum.id);
        q.limit(1000);
        q.find(function(list){
            var s = '';
            for (var i in list){
                var a = list[i];
                s+= '<a href="http://article.englishpatient.org/article.php?id=' + a.id + '" target="_blank" >' + a.get('name') + '</a>';
            }
            $('#editAlbumArticlesList').html(s);
        });
    }

    this.getAlbumById = function(id){
        var list = self.albums;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.createAlbum = function(albumName, albumDescription, tags, avatarSrc, callback){
        if (albumName == ''){
            return;
        }
        var ArticlesAlbum = Parse.Object.extend('ArticlesAlbum');
        var q = new Parse.Query(ArticlesAlbum);
        q.equalTo('ownerId', self.currentUserManager.currentUser.id);
        q.equalTo('name', albumName);
        q.find(function(results){
            if (results.length > 0){
                toastr.error('Группа с таким название уже существует');
                //callback();
                //return;
            }
        });
        var a = new ArticlesAlbum();
        a.set('ownerId', self.currentUserManager.currentUser.id);
        a.set('name', albumName);
        a.set('description', albumDescription);
        a.set('tags', tags);
        a.set('avatarSrc', avatarSrc);
        a.save().then(function(){
            if (callback != undefined){
                callback();
            }
        });
    }

    this.initCreateAlbumButton = function(){
        console.log('initCreateAlbumButton occured');
        $('#createArticlesAlbumButton').bind('click', function(){
            console.log('initCreateAlbumButton clicked');
            var name = $('#articlesAlbumName').val().trim();
            var description = $('#articlesAlbumDescription').val().trim();
            var tags = $('#articlesAlbumTags').val().split(',').map(function(a){ return a.trim()});
            var avatarSrc = $('#articlesAlbumAvatarSrc').val().trim();
            enablePreloader('создаем альбом');
            self.createAlbum(name, description, tags, avatarSrc, function(){
                self.loadArticlesAlbums(function(){
                    self.drawAlbums();
                    disablePreloader();
                });
            });
        });
    }

    this.drawDropdownHtml = function(){
        var s = '';
        s+='<option>Выберите группу из списка</option>';
        var list = self.albums;
        for (var i in list){
            var g = list[i];
            s+='<option  >' + g.get('name') + '</option>';
        }
        $('#articleAlbumSelect').html(s);
        //<select><option>Выберите из списка</option>
        //<option>Option</option>
        //<option>Textarea</option>
        //<option>Label</option>
        //<option>Fieldset</option><
        //<option>Legend</option></select>
    }

    this.initArticleAlbumSelect = function(){
        $('#articleAlbumSelect').on('change', function(){
            var name = $(this).val();
            self.selectedDropdownAlbum = self.getAlbumByName(name);
            self.onDropdownAlbumSelected(self.selectedDropdownAlbum);
        });
    }

    this.onDropdownAlbumSelected = function(g){
        console.log(g);
    }

    this.getAlbumByName = function(name){
        var list = self.albums;
        for (var i in list){
            if (list[i].get('name') == name){
                return list[i];
            }
        }
        return undefined;
    }

    this.refreshSelect = function(albumId){
        var s = '';
        s+='<option ' + (albumId == undefined ? ' selected="" ' : '') + '>Выберите группу из списка</option>';
        var list = self.albums;
        for (var i in list){
            var g = list[i];
            s+='<option ' + (albumId == g.id ? ' selected="" ' : '') + '  >' + g.get('name') + '</option>';
        }
        $('#articleAlbumSelect').html(s);
    }



}