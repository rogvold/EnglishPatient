/**
 * Created by sabir on 30.12.15.
 */

var assign = require('object-assign');

var LinkMixin = {

    parseLink: function(linkText){
        var data = {
            content: undefined,
            linkType: undefined,
            name: undefined
        }
        if (linkText == undefined){
            return undefined;
        }
        var text = linkText.replace(/\[/g, '').replace(/\]/g, '');
        var arr = text.split('|');
        if (arr.length < 2){
            return;
        }
        data.linkType = arr[0];
        data.content = arr[1];
        data.name = data.conent;
        if (arr.length > 2){
            data.name = arr[2];
        }
        return data;
    }

}

module.exports = LinkMixin;