/**
 * Created by sabir on 31.12.14.
 */

var MosesModalEditorManager = function(){
    var self = this;
    this.modalId = 'mosesEditorModal';

    this.init = function(){
        self.initMosesEditorLinks();
    }

    this.initMosesEditorLinks = function(){
        $('body').on('click', '.mosesEditorLink', function(){
            var vimeoId = $(this).attr('data-vimeoId');
            self.initIframe(vimeoId);
            $('#' + self.modalId).modal();
        });
    }

    this.prepareModal = function(){
        self.initIframe();
    }

    this.initIframe = function(vimeoId){
        $('#' + self.modalId + ' .modal-body').html('<iframe style="display: block; width: 430px; border: none; height: 600px; margin: 0 auto;" src="http://beta.englishpatient.org/tools/mosesEditorEmbed.html?vimeoId=' + vimeoId + '&text=1" />');
    }
}