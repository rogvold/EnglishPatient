/**
 * Created by sabir on 02.10.15.
 */

var TranslateMixin = {

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
    }


}

module.exports = TranslateMixin;