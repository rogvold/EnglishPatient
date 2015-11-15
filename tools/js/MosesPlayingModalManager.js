/**
 * Created by sabir on 31.12.14.
 */

    //if there is a sidebar then use it

var MosesPlayingModalManager = function(){
    var self = this;
    this.modalId = 'mosesModal';
    this.sidebarId = 'mosesSidebar';

    this.init = function(){
        self.initMosesLink();
    }

    this.initMosesLink = function(){
        $('body').on('click', '.mosesLink', function(){
            var vimeoId = $(this).attr('data-vimeoId');
            if (self.hasSidebar() == true){
                self.showSidebar(vimeoId);
            }else{
                self.showModal(vimeoId);
            }
        });
        self.initModalClosing();
        self.initSidebarClosing();
    }

    this.showModal = function(vimeoId){
        $('#' + self.modalId).modal();
        $('#' + self.modalId + ' .modal-body').html('<iframe style="width: 320px; border: none; height: 400px; margin: 0 auto;" src="http://beta.englishpatient.org/tools/mosesPlayer.html?vimeoId=' + vimeoId +'" />');
        $('#' + self.modalId).modal();
    }

    this.showSidebar = function(vimeoId){
        $('#' + self.sidebarId).removeClass('hide');
        $('#' + self.sidebarId + ' .sidebar-body').html('<iframe style="width: 320px; border: none; height: 400px; margin: 0 auto;" src="http://beta.englishpatient.org/tools/mosesPlayer.html?vimeoId=' + vimeoId +'" />');
    }

    this.initModalClosing = function(){
        $('#' + self.modalId).on('hidden.bs.modal', function () {
            $('#' + self.modalId + ' .modal-body').html('');
        });
    }

    this.initSidebarClosing = function(){
        $('#' + self.sidebarId + ' .close-button, .cardNumber').bind('click', function(){
            $('#' + self.sidebarId).addClass('hide');
            $('#' + self.sidebarId + ' .sidebar-body').html('');
        });
    }

    this.hasSidebar = function(){
        return ($('#' + self.sidebarId).length == 1);
    }

}

