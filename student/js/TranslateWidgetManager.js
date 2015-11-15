/**
 * Created by sabir on 19.07.15.
 */

var TranslateWidgetManager = function(){
    var self = this;
    this.lang = 'en-ru';
    this.apiKey = 'trnsl.1.1.20150110T185919Z.9c8b624f38753301.90dc84ff422be1e5c7c60154ef77bd350b2ad6cc';
    this.dicApiKey = 'dict.1.1.20150111T061533Z.349245bda1a12276.29f9baac4b0623f43ede19d011e5abd6d1b4c5ed';
    this.text = '';
    this.translation = '';
    this.translateTranslation = '';
    this.dictTranslation = '';
    this.translatableDivId = 'isTranslatable';
    this.translateModalId = 'translateModal';
    this.translationPlaceholderSelector = '#translatePlaceholder';
    this.translateInputSelecor = '#translateInput';
    this.translateButtonSelector = '#translateButton';
    this.modalMode = false;

    this.init = function(){
        self.initTranslatable();
        self.initTranslateButton();
        //self.prepareSpans();
        self.initTranslatable();
    }

    this.initTranslatable = function(){
        $('body').on('click', '.translatable', function(){
            var text = $(this).text();
            text = text.toLowerCase();
            text = text.replace(/[^A-Za-z]/g, '');
            if (text == ''){
                return;
            }
            self.text = text;
            $(self.translateInputSelecor).val(self.text);
            $(self.translateButtonSelector).click();

            if (self.modalMode == true){
                $('#translateModal').modal();
            }

            //self.linguaTranslate(text);
            //self.translate(text, function(){
            //    if (self.translation == undefined || self.translation.def == undefined || self.translation.def.length == 0){
            //        console.log('no translation: ', self.translation);
            //        return;
            //    }
            //    console.log('show modal');
            //    $('#' + self.translateModalId).modal();
            //    $('#' + self.translateModalId + ' .modal-title').html(self.text);
            //    $('#' + self.translateModalId + ' .modal-body').html(self.getTranslationHtml(self.translation));
            //});
        });
    }

    this.getTranslationHtml = function(tr){
        var s = '<ul class="translation" >';
        for (var i in tr.def){
            s+='<li class="def" >';
            s+='<span class="defName" >' + tr.def[i].pos +'</span>';
            s+='<ol class="meanings" >';
            for (var j in tr.def[i].tr){
                var exHtml = (tr.def[i].tr[j].ex == undefined) ? '' : (' <ul class="exList">' + tr.def[i].tr[j].ex.map(function(r){return '<li>' + r.text + (r.tr == undefined ? '' : (' - <span class="exTr">' + r.tr[0].text + '</span>') ) + '</li>';}).join(' ') + '</ul>');
                s+='<li class="mean"><b>' + tr.def[i].tr[j].text + '</b>' + exHtml +'</li>';
            }
            s+='</ol>';
            s+='</li>';
        }
        s+='</ul>';
        return s;
    }

    this.dictTranslate = function(text, callback){
        //var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + self.apiKey + '&format=html&lang=' + self.lang +'&text=' + text;
        var url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + self.dicApiKey + '&format=html&lang=' + self.lang +'&ui=ru&text=' + text;
        text = text.split("’")[0];
        $.ajax({
            url: url,
            success: function(data){
                console.log(data);
                self.dictTranslation = data;
                callback(data);
            }
        });
    }

    this.translateTranslate = function(text, callback){
        var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + self.apiKey + '&format=html&lang=' + self.lang +'&ui=ru&text=' + text;
        text = text.split("’")[0];
        $.ajax({
            url: url,
            success: function(data){
                console.log(data);
                //self.translation = data;
                callback(data);
            }
        });
    }

    this.translate = function(text, callback){
        self.text = text;
        self.dictTranslate(text, function(data){
            self.dictTranslation = data;
            self.translateTranslate(text, function(data){
                self.translateTranslation = data;
                callback(data);
            });
        });
    }


    this.prepareTranslationResult = function(){
        var translatedText = (self.translateTranslation == undefined || self.translateTranslation.text== undefined || self.translateTranslation.text.length == 0) ? '' : self.translateTranslation.text[0];
        var dictTranslationHtml = self.getTranslationHtml(self.dictTranslation);
        var html = '';
        if (translatedText != ''){
            html+= '<h3 style="text-align: center; margin-top: 10px;" >' + translatedText + '</h3> <div class="ui ignored  divider"></div>';
        }
        html+= dictTranslationHtml;
        if (self.text == translatedText){
            html = '<span style="color: firebrick;">Неверный запрос... Попробуйте еще раз.</span>';
        }
        $(self.translationPlaceholderSelector).html(html);
    }

    this.initTranslateButton = function(){
        $(self.translateButtonSelector).bind('click', function(){

            var text = $(self.translateInputSelecor).val().trim();
            if (text == ''){
                return;
            }
            $(this).attr('disabled', '1');
            $(this).html('<i class="notched circle loading icon"></i>');
            self.text = text;
            console.log('starting translation');
            self.translate(text, function(){
                $(self.translateButtonSelector).removeAttr('disabled');
                $(self.translateButtonSelector).html('<i class="icon search"></i> translate');
                self.prepareTranslationResult();
            });
        });

        $(self.translateInputSelecor).on( "keydown", function(event) {
            if(event.which == 13){
                $(self.translateButtonSelector).click();
            }

        });

    }


    this.prepareSpans = function(){
        $('.' + self.translatableDivId + ' p').each(function(){
            var html = $(this).html();
            //html = wrap(html, "words", 'translatable');
            html = wrapWordInHtml(html, 'translatable');
            $(this).html(html);
        });
    }

    this.getWrappedText = function(html){
        return wrapWordInHtml(html, 'translatable');
    }

    this.getTranslatableHtml = function(html){
        return wrapWordInHtml(html, 'translatable');
    }



}