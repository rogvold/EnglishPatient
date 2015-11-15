/**
 * Created by sabir on 04.11.14.
 */

var TextMaterial = function(text){
    var self = this;
    this.text = text;
    this.textId = 'patientExerciseImage';
    this.textPlaceholderDivId = 'textPlaceholder';
    this.materialType = 'text';
    this.translateManager = new TranslateManager();


    this.getEmbedHtml = function(){
        var s = '';
        //s+='<div class="textBlock unselectable" >' +
        s+='<div class="textBlock unselectable isTranslatable" >' +
                '<span>' + self.text + '</span>' +
            '</div>';
        return s;
    }

    this.getSimpleHtml = function(){
        var s = '';
        var text = self.text;
        text = self.translateManager.getWrappedText(text, 'translatable');
        s+='<span class="unselectable isTranslatable"  >' + text + '</span>';
        return s;
    }

    this.prepareHtml = function(){
        $('#' + self.textPlaceholderDivId).show();
        if ( $('#' + self.textId).length == 0 ){
            $('#' + self.textPlaceholderDivId).html(self.getEmbedHtml());
            return;
        }
        $('#' + self.textId).text(self.text);
    }

}