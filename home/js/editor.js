var editableContent = function () {
    return {
        init: function () {
            GlobalEditor = new MediumEditor(".editable", {
                buttonLabels: "fontawesome"
            });
            //$('.editable').on('input', function(a) {
            //    console.log(a);
            //});
            $('.editable').mediumInsert({
                editor: GlobalEditor,
                addons: {
                    images: {},
                    embeds: {
                        oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
                    },
                    tables: {}
                }
            });
        }
    };
}();

function getEditorContent(){
    var allContents = GlobalEditor.serialize();
    var elContent = allContents["element-0"].value;
    //$('#article').html(elContent);
    return elContent;
}

$(function () {
	"use strict";
    editableContent.init();
});