/**
 * Created by sabir on 14.07.15.
 */

var MVPManager = function(){
    var self = this;
    this.materials = [];
    this.currentMaterial = undefined;
    this.currentNumber = 0;
    this.userAnswers = [];
    this.materialAnswers = [];
    this.countDownTime = 9;
    this.intervalId = undefined;

    this.init = function(){
        self.loadMaterials(function(){
            console.log(self.materials);
            self.drawMaterials();
            self.initAnswerInput();
            self.initTimer();
        });
    }

    this.loadMaterials = function(callback){
        $.ajax({
            type: 'GET',
            url: 'json/base.json',
            success: function(data){
                self.materials = data.questions;
                self.materialAnswers = self.materials.map(function(m){ return /\[(.*)\]/g.exec(m.text)[1] });
                callback();
            }
        });
    }

    this.drawMaterials = function(){
        var s = '';
        var list = self.materials;
        for (var i in list){
            self.userAnswers.push('');
            s+= self.getMaterialItem(list[i], i);
        }
        s+=$('#hiddenFinishPlaceholder').html();
        $("#hiddenFinishPlaceholder").html('');

        $('#materialsPlaceholder').append(s);
        //$('.side:first').addClass('active');
        //$('.shape').shape();
        $('.gap').popup();
    }

    this.getMaterialItem = function(m, num){
        var s = '';
        s+= '<div class="side questionItem" data-num="' + num + '" >' +
                '<div class="ui card">' +
                    '<div class="image">' +
                        '<img src="' + m.imgSrc + '">' +
                    '</div>' +
                    '<div class="videoPlaceholder" style="display: none;">' +
                    '</div>' +
                    '<div class="content">' +
                        '<div class="description">' +
                            '' + self.getPreparedTextHtml(m.text) +
                        '</div>' +
                    '</div>' +

                    '<div class="extra content">' +
                        '<div class="ui large transparent left icon input">' +
                            '<i class="comment outline icon"></i>' +
                            '<input autofocus="1" disabled="1" data-num="' + num + '" class="answerInput" type="text" placeholder="Вставьте пропуск..." />' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        return s;
    }

    this.initAnswerInput = function(){
        $('body').on('keyup', '.answerInput', function(e){
            var num = $(this).attr('data-num');
            var val = $(this).val();
            var gVal = (val == undefined || val == '') ? '&nbsp;': val;
            $('.side[data-num="' + num + '"] .gap').html(gVal);
            if(e.which == 13) {
                self.answerOnQuestion(val);
            }
        });
    }

    this.getIframeHtml = function(vimeoId, autoplay){
        autoplay = (autoplay == undefined) ? false : autoplay;
        var a = (autoplay == true) ? '&autoplay=1' : '';
        var s = '<iframe src="https://player.vimeo.com/video/' + vimeoId + '?title=0&byline=0' + a + '&portrait=0" width="350" height="263" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        console.log('getIframeHtml: returning' + s);
        return s;
    }

    this.getPreparedTextHtml = function(text){
        var re = /\[.*\]/;
        text = text.replace(re, function(a, b){
            return ('<span class="gap" data-content="Вставьте пропуск">&nbsp;</span>');
        });
        return text;
    }

    this.goToSpecifiedCard = function(num){
        num = +num;
        if (num >= self.materials.length){
            self.exerciseFinishedCallback();
            return;
        }
        var p = 100.0 * num / self.materials.length;
        var sP = (num + 1) + '/' + self.materials.length;
        var m = self.materials[num];
        $('.side .videoPlaceholder').hide();
        $('.side .videoPlaceholder').html('');
        $('#progress').progress({
            percent: p
        });
        $('#progressLabel').html(sP);

        $('.shape')
            .shape('set next side', '.side[data-num="' + num + '"]')
            .shape('flip over');

        setTimeout(function(){
            $('.side[data-num="' + num + '"] .videoPlaceholder').show();
            $('.side[data-num="' + num + '"] .videoPlaceholder').html(self.getIframeHtml(m.vimeoId, true));

            $('.side[data-num="' + num + '"] input').removeAttr('disabled');
            $('.side[data-num="' + num + '"] input').focus();
        }, 500);
    }

    this.answerOnQuestion = function(ans){
        if (ans == undefined || ans.trim() == ''){
            return;
        }
        console.log(ans);
        self.userAnswers[self.currentNumber] = ans;
        self.currentNumber++;
        self.goToSpecifiedCard(self.currentNumber);
    }

    this.exerciseFinishedCallback = function(){
        self.prepareFinishCard();
    }

    this.getCheckedAnwers = function(){
        var list = self.userAnswers;
        var arr = [];
        for (var i in list){
            var uA = list[i];
            var a = self.materialAnswers[i];
            arr.push({
                rightAnswer: a,
                userAnswer: uA,
                isRight: (a == uA)
            });
        }
        return arr;
    }

    this.prepareFinishCard = function(){
        $('.shape')
            .shape('set next side', '#finishCard')
            .shape('flip over');
        var list = self.getCheckedAnwers();
        var r = 0;
        for (var i in list){
            if (list[i].isRight == true){
                r++;
            }
        }
        $('#rightNumber').html(r);
        $('#wrongNumber').html(self.materials.length - r);
        $('#progress').progress({
            percent: 100
        });
        $('#progressLabel').html('');
        $('#progress').hide();
        self.prepareResultsTable();
    }



    this.go = function(){
        $('#progress').show();
        self.currentNumber = 0;
        self.goToSpecifiedCard(self.currentNumber);
    }

    this.initTimer = function(){
        self.intervalId = setInterval(function(){
            self.countDownTime = self.countDownTime - 1;
            $('#countdown').html(self.countDownTime);
            if (self.countDownTime == 0){
                clearInterval(self.intervalId);
                self.go();
                self.countDownTime = 0;
            }
        }, 1000);
        $('#startButton').bind('click', function(){
            clearInterval(self.intervalId);
            self.go();
        });
        $('#progress').progress({
            percent: 0
        });
    }

    this.prepareResultsTable = function(){
        var s = '<tr>';
        var list = self.getCheckedAnwers();
        for (var i in list){
            var res = list[i];
            var debHtml = self.getAnswerPopupHtml(i);
            if (res.isRight == true){
                s+= '<td class="green" data-html="'+ debHtml +'" >' + (+i + 1) + '</td>';
            }else{
                s+= '<td class="red" data-html="'+ debHtml +'" >' + (+i + 1) + '</td>';
            }
        }
        s+='</tr>';
        $('#resultsTable').html(s);
        $('#resultsTable td').popup();
        $('#resultText').html(self.getResultText());
    }

    this.getAnswerPopupHtml = function(answerNumber){
        var userAnswer = self.userAnswers[answerNumber];
        var rightAnswer = self.materialAnswers[answerNumber];
        var gapText = (userAnswer == rightAnswer) ? userAnswer : ('<span class=\'wrongUserAnswer\'>' + userAnswer + '</span> <span class=\'rightAnswer\'>' + rightAnswer + '</span>');
        var text = self.materials[answerNumber].text;
        var re = /\[.*\]/;
        text = text.replace(re, function(a, b){
            return ('<span class=\'gap\'>' + gapText + '</span>');
        });
        var iframeHtml = '<div style=\'text-align: center;\'><iframe src=\'https://player.vimeo.com/video/' + self.materials[answerNumber].vimeoId + '?title=0&byline=0&autoplay=1&portrait=0\' width=\'220\' height=\'160\' frameborder=\'0\' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
        text =  iframeHtml  + '<span class=\'debriefingText\' >' + text + '</span>';
        return text;
    }

    this.getResultText = function(){
        var list = self.getCheckedAnwers();
        var r = 0;
        for (var i in list){
            if (list[i].isRight == true){
                r++;
            }
        }
        var p = 100.0 * r / self.materials.length;
        if (p > 90){
            return 'Отличный результат!';
        }
        if (p > 70){
            return 'Хороший результат!';
        }
        if (p > 50){
            return 'Удовлетворительный результат';
        }
        return 'Слабый результат';
    }


    //90-100 Отличный результат. 70-90 - Хороший результат 50-70 - Удовлетворительный результат 0-50 - Слабый результат.

}