/**
 * Created by sabir on 24.11.14.
 */

var PhrasesManager = function(){
    var self = this;
    this.textareaId = 'topTextInput';
    this.showDivId = 'topText';
    this.editPhraseButtonId = 'changeTopTextButton';
    this.phrases = ['He  thinks  they’ll  never pay  them', 'They  think  she’ll  never pay  them'];
    this.currentPhraseIndex = 0;
    this.dt = 5000;
    this.time = 0;



    this.init = function(){
        self.initEditPhrasesBlock();
    }

    this.initEditPhrasesBlock = function(){
        self.loadFromLocalStorage();
        $('#' + self.textareaId).val(self.phrases.join('\n'));
        $('#' + self.editPhraseButtonId).bind('click', function(){
            var text = $('#' + self.textareaId).val();
            text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            self.phrases = text.split('<br/>');
            localStorage.setItem('phrases', JSON.stringify(self.phrases));
        });
    }

    this.startShowing = function(){
        var dt = self.dt;
        self.time = 0;
        var i = Math.floor(self.time / self.dt);
        $('#' + self.showDivId).text(self.phrases[Math.min(self.phrases.length - 1, i)]);
        setInterval(function(){
            self.time+=self.dt;
            var i = Math.floor(self.time / self.dt);

            $('#' + self.showDivId).fadeOut();

            $('#' + self.showDivId).text(self.phrases[Math.min(self.phrases.length - 1, i)]);



            if (self.time >= self.dt * self.phrases.length ){
                $('#' + self.showDivId).fadeOut();
            }else{
                $('#' + self.showDivId).fadeIn();
            }

        }, self.dt);
    }

    this.loadFromLocalStorage = function(){
        var s = localStorage.getItem('phrases');
        if (s == undefined){
            localStorage.setItem('phrases', JSON.stringify(self.phrases));
        }
        self.phrases = JSON.parse(localStorage.getItem('phrases'));
    }

}