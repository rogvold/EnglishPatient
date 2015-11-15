/**
 * Created by sabir on 04.11.14.
 */

var AudioMaterial = function(audioUrl, autoplay){
    var self = this;
    this.audioUrl = audioUrl;
    this.audioPlaceholderDivId = 'audioPlaceholder';
    this.audioId = 'patientExerciseAudio';
    this.materialType = 'audio';
    this.autoplay = (autoplay == undefined) ? false : autoplay;

    this.getEmbedHtml = function(){
        var s = '';
        var autoplayHtml = (self.autoplay == true) ? ' autoplay ' : '';
        s+='<div class="audioBlock" >' +
                '<audio ' + autoplayHtml + ' id="' + self.audioId + '" src="' + self.audioUrl + '" controls ></audio>' +
            '</div>';
        return s;
    }

    this.getSimpleHtml = function(){
        var s = '';
        s+= '<audio id="' + self.audioId + '" src="' + self.audioUrl + '" controls ></audio>' ;
        return s;
    }

    this.prepareHtml = function(){
        $('#' + self.audioPlaceholderDivId).show();
        if ( $('#' + self.audioId).length == 0 ){
            $('#' + self.audioPlaceholderDivId).html(self.getEmbedHtml());
            return;
        }
        $('#' + self.audioId).attr('src', self.audioUrl);
    }

}

