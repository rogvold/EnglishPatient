/**
 * Created by sabir on 01.01.15.
 */

var TypingManager = function(){
    var self = this;
    this.placeholderDivId = 'typingPlaceholderDiv';
    this.defaultAnswer = '';
    this.currentText = '';
    this.answersMap = {};
    this.enabled = true;

    this.currentCardId = undefined;

    this.init = function(){
        self.initSubmitButton();
        self.initOnChange();
        self.prepare(self.defaultAnswer);
    }

    this.onSubmit = function(answer){
        console.log(answer);
    }

    this.onChange = function(answer){
        console.log(self.currentText);
    }

    this.prepare = function(defaultAnswer, currentCardId){
        console.log('prepare accured: defaultAnswer = ' + defaultAnswer);

        self.defaultAnswer = defaultAnswer;
        if (currentCardId != undefined){
            if ((defaultAnswer == '' || defaultAnswer == undefined)){
                if (self.answersMap[currentCardId] != undefined){
                    self.defaultAnswer = self.answersMap[currentCardId];
                }
            }else{
                self.answersMap[currentCardId] = defaultAnswer;
            }
        }

        var s = '';
        s+='<div>' +
        ' <textarea id="typingManagerTextarea" class="form-control" ' + (self.enabled == true ? '' : ' disabled="true" ') + ' placeholder="Транскрипт" ></textarea> ' +
        '<button class="btn btn-primary mt10 pull-right '+ (self.enabled == true ? '' : ' hide ') +' " id="typingManagerSubmitButton" >ОТВЕТИТЬ</button>' +
        '</div>';
        if ($('#' + self.placeholderDivId).val().trim() == ''){
            $('#' + self.placeholderDivId).html(s);
        }
        $('#typingManagerTextarea').attr('disabled', true);
        $('#typingManagerSubmitButton').addClass('hide');
        if (defaultAnswer == '' || defaultAnswer == undefined){
            console.log('enabling textarea');
            $('#typingManagerTextarea').removeAttr('disabled');
            $('#typingManagerSubmitButton').removeClass('hide');
        }
        $('#typingManagerTextarea').val(self.defaultAnswer);
        //window.onload = function() {
            var myInput = document.getElementById('typingManagerTextarea');
            myInput.onpaste = function(e) {
                e.preventDefault();
            }
        //}
    }

    this.initSubmitButton = function(){
        $('body').on('click', '#typingManagerSubmitButton', function(){
            var a = $('#typingManagerTextarea').val().trim();
            self.onSubmit(a);
        });
    }

    this.initOnChange = function(){
        $("body").on('keyup', '#typingManagerTextarea', function(){
            self.currentText = $(this).val();
            self.onChange(self.currentText);
        });
    }


}