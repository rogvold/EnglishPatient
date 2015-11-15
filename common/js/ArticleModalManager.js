/**
 * Created by sabir on 10.01.15.
 */

var ArticleModalManager = function(){
    var self = this;
    this.article = undefined;
    this.articleId = undefined;
    this.modalId = 'articleModal';
    this.translateManager = new TranslateManager();


    this.init = function(){
        initParse();
        self.translateManager.init();
        self.initArticleLink();
        moment.lang('ru');
    }


    this.initArticleLink = function(){
        $('body').on('click', '.articleLink', function(){
            var id = $(this).attr('data-articleId');
            self.articleId = id;
            self.loadArticle(function(){
                self.prepareArticleModal();
            });
        });
    }

    this.loadArticle = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientArticle'));
        enablePreloader();
        q.get(self.articleId, {
            success: function(a){
                disablePreloader();
                self.article = a;
                callback();
            }
        })
    }

    this.prepareArticleModal = function(){
        $('#' + self.modalId + ' .articlePlaceholder').html(self.article.get('content'));
        $('#' + self.modalId + ' .articleName').html(self.article.get('name'));
        $('#' + self.modalId + ' .articleDate').html(moment(self.article.createdAt).format('LLL'));
        self.prepareTranslatableModal();
        $('#' + self.modalId).modal();
    }

    this.prepareTranslatableModal = function(){
        $('#' + self.modalId + ' .articlePlaceholder p, #' + self.modalId + ' .articlePlaceholder pre').each(function(){
            var html = $(this).html();
            html = self.translateManager.getTranslatableHtml(html);
            $(this).html(html);
        });
    }


}