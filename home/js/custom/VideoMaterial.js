/**
 * Created by sabir on 04.11.14.
 */

var VideoMaterial = function(vimeoId){
    var self = this;
    this.vimeoId = vimeoId;
    //this.width = 400;
    //this.height = 225;

    this.width = 520;
    this.height = 293;

    this.videoPlaceholderDivId = 'videoPlaceholder';
    this.iframeId = 'patientExerciseIframe';
    this.materialType = 'video';

    this.getEmbedHtml = function(){
        var s = '';
        s+='<div class="videoBlock" >' +
                '<iframe id="' + self.iframeId + '" src="http://player.vimeo.com/video/' + self.vimeoId + '?title=0&byline=0&portrait=0&allowfullscreen=1&fullscreen=1" width="' + self.width + '" height="' + self.height + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allowfullscreen="1" ></iframe>' +
            '</div>';
        return s;
    }

    this.getSimpleHtml = function(){
        var s = '';
        s+='<span class="videoMaterial" >video: <a href="javascript: void(0);" class="videoLink" data-vimeoId="' + self.vimeoId +'" >' + self.vimeoId + '</a><a href="http://vimeo.com/' + self.vimeoId +'" target="_blank" > <i class="ti-vimeo" ></i></a></span>';
        return s;
    }

    this.prepareHtml = function(){
        $('#' + self.videoPlaceholderDivId).show();
        if ( $('#' + self.iframeId).length == 0 ){
            $('#' + self.videoPlaceholderDivId).html(self.getEmbedHtml());
            return;
        }
        if ($('#' + self.iframeId).attr('src').indexOf(self.vimeoId) > -1){
            return;
        }
        $('#' + self.iframeId).attr('src', 'http://player.vimeo.com/video/' + self.vimeoId + '?title=0&byline=0&portrait=0&fullscreen=1');
        $('#' + self.iframeId).css('width', self.width + 'px');
        $('#' + self.iframeId).css('height', self.height + 'px');
    }

}

