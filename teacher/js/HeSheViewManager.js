/**
 * Created by sabir on 24.12.14.
 */

var HeSheViewManager = function(heShePhrase){
    var self = this;
    this.divId = 'heSheVewDiv';
    this.phrase = heShePhrase;
    this.time = 0;
    this.intervalId = undefined;
    //this.dt = 4000;
    this.dt = 5500;
    this.currentN = 0;
    this.textList = [];


    this.prepareView = function(){
        self.time = 0;
        self.currentN = 0;
        self.textList = self.phrase.get('text').replace(/\[/g, '<b>').replace(/\]/g, '</b>').split('<br/>');
        //self.textList.push('Пример:');
        self.preparePlaceholder();
        self.initTimer();
        console.log('prepareView occured');
    }

    this.stop = function(){
        clearInterval(self.intervalId);
        //$('#' + self.divId).hide();
        $('#heSheViewVideo').html('');
        $('#heSheViewText').html('');
        //$('#heSheViewText').html(self.textList[0]);
        //$('#heSheViewText').show();
        //$('#heSheViewText').css('visibility', 'visible');
    }


    this.initTimer = function(){
        //if (self.intervalId != undefined){
        //    return;
        //}
        self.onTick();
        console.log('self.intervalId = ' + self.intervalId);
        self.intervalId = setInterval(function(){
            self.time = self.time + self.dt;
            console.log('time = ' + self.time);
            self.onTick();
        }, self.dt);
    }

    this.onTick = function(){
        console.log('onTick occured');
        self.currentN+= 1;
        var text = self.textList[self.currentN % self.textList.length];
        self.changeText(text);
        var videoHtml = self.getVideoHtml(self.phrase.get('vimeoId'));
        if (($('#heSheViewVideo').html() == '') && (self.currentN > self.textList.length) && (videoHtml != '') ){
            $('#heSheViewVideo').html(videoHtml);
            //$('#heSheViewText').hide();
            $('#heSheViewText').css('visibility', 'hidden');
        }
        //if (self.currentN >= self.textList.length){
        //    $('#heSheViewText').css('visibility', 'hidden');
        //}
    }

    this.preparePlaceholder = function(){
        var s = '';
        s+='</div><div id="heSheViewVideo" class="text-center" ></div><div id="heSheViewText" style="text-align: center;" >';
        $('#' + self.divId).html(s);
        $('body').on('click', '#heSheViewText', function(){
            self.currentN+= 1;
            var text = self.textList[self.currentN % self.textList.length];
            self.changeText(text);
        });
    }

    this.getVideoHtml = function(vimeoId){
        var s = '';
        if (vimeoId == undefined){
            return '';
        }
        s+='<iframe src="//player.vimeo.com/video/'+ vimeoId +'?autoplay=1" width="450" height="300" frameborder="0" webkitallowfullscreen autoplay mozallowfullscreen allowfullscreen></iframe>' +
        '' + (self.phrase.get('videoText') == undefined ? '' : ('<h3>' + self.phrase.get('videoText') + '</h3>'));
        return s;
    }


    this.changeText = function(text){
        $('#heSheViewText').fadeOut(self.dt / 6.0);
        setTimeout(function(){$('#heSheViewText').html(text);}, self.dt / 6.0);
        $('#heSheViewText').fadeIn(self.dt / 6.0);
    }


}