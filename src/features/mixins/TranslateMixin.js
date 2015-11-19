/**
 * Created by sabir on 02.10.15.
 */
var $ = require('jquery');

var TranslateMixin = {

    lang: 'en-ru',

    wrapWordInHtml: function(html, className){
        if ((html.indexOf('<img') > -1) || (html.indexOf('<a') > -1) || (html.indexOf('<div') > -1) || (html.indexOf('<iframe') > -1) || html.indexOf('<audio') > -1){
            return html;
        }

        var text = html.split(/[ ]/),
            len = text.length,
            result = [];
        for( var i = 0; i < len; i++ ) {
            text[i] = text[i].trim();
            if (text[i] == ''){
                continue;
            }
            if (text[i] == '<br/>'){
                result.push('<br/>');
            }
            var pret = text[i].replace(/[^A-Za-z,-\\' \\.]/g, '');
            if (pret == '' || (this.isEmptyTag(pret) == true ) || /[a-zA-Z]+/.test(pret) == false ){
                result.push(text[i]);
                continue;
            }
            result.push('<span class="' + className + '" >' + text[i] + '</span>');
        }
        return result.join(' ');
    },

    isEmptyTag: function(s){
        var re = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
        return re.test(s);
    },

    //yandexAPIKey: 'trnsl.1.1.20150110T185919Z.9c8b624f38753301.90dc84ff422be1e5c7c60154ef77bd350b2ad6cc',
    yandexAPIKey: 'trnsl.1.1.20150110T185919Z.9c8b624f38753301.90dc84ff422be1e5c7c60154ef77bd350b2ad6cc',


    yandexDicApiKey: 'dict.1.1.20150111T061533Z.349245bda1a12276.29f9baac4b0623f43ede19d011e5abd6d1b4c5ed',

    getTranslationHtml: function(tr){
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
    },

    translate: function(text, callback){
        var self = this;
        var url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + self.yandexDicApiKey + '&format=html&lang=' + self.lang +'&ui=ru&text=' + text;
        text = text.split("’")[0];
        $.ajax({
            url: url,
            success: function(data){
                console.log(data);
                callback(self.getTranslationHtml(data));
            }
        });
    }


}

module.exports = TranslateMixin;