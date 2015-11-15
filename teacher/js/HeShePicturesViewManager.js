/**
 * Created by sabir on 24.12.14.
 */

var HeShePicturesViewManager = function(){
    var self = this;
    this.pics = [];
    this.number = 0;
    this.placeholderDivId = 'picsPlaceholder';
    this.intevalId = undefined;
    this.dt = 6000;
    this.time = 0;
    this.generatedNumbers = [];
    this.marks = [];
    this.generatedPics = [];

    this.meProbability = 15;
    this.weProbability = 10;

    this.init = function(callback){
        enablePreloader();
        self.loadPictures(function(){
            disablePreloader();
            callback();
        });
    }

    this.loadPictures = function(callback){
        var q = new Parse.Query(Parse.Object.extend('HeSheMaterial'));
        q.limit(1000);
        enablePreloader();
        q.find(function(results){
            self.pics = results;
            self.prepareMeWeArray();
            console.log('pics = ', self.pics);
            disablePreloader();
            callback();
        });
    }

    this.prepareMeWeArray = function(){
        var list = self.pics;
        var HeSheMaterial = Parse.Object.extend('HeSheMaterial');
        for (var i = 0; i < self.meProbability; i++){
            var m = new HeSheMaterial();
            m.set('imageUrl', Parse.User.current().get('mePicSrc'));
            m.set('mark', 'me');
            list.push(m);
        }
        for (var i = 0; i < self.meProbability; i++){
            var m = new HeSheMaterial();
            m.set('imageUrl', Parse.User.current().get('wePicSrc'));
            m.set('mark', 'we');
            list.push(m);
        }
        self.pics = list;
    }



    this.skip = function(){
        self.preparePics();
    }

    this.preparePics = function(){
        self.generatedNumbers = self.generateNumbers();
        self.marks = self.getGeneratedMarksArray();
        self.generatedPics = self.getGeneratedPics();
        self.drawPics();
    }


    this.drawPics = function(){
        var list = self.generatedPics;
        var s = '';
        for (var i in list){
            s+='<img class="heShePic" src="' + list[i].get('imageUrl') + '" />';
        }
        self.changePics(s);
    }

    this.changePics = function(newHtml){
        $('#' + self.placeholderDivId).fadeOut(300);
        setTimeout(function(){$('#picsPlaceholder').html(newHtml)}, 300);
        $('#' + self.placeholderDivId).fadeIn(300);
    }


    this.getGeneratedPics = function(){
        var arr = [];
        var list = self.generatedNumbers;
        for (var i in list){
            var pic = self.pics[list[i]];
            arr.push(pic);
        }
        return arr;
    }

    this.getGeneratedMarksArray = function(){
        var arr = [];
        var list = self.generatedNumbers;
        for (var i in list){
            var pic = self.pics[list[i]];
            arr.push(pic.get('mark'));
        }
        return arr;
    }

    this.generateNumbers = function(){
        var arr = [];
        for (var i = 0; i < self.number; i++){
            arr.push(Math.floor(Math.random() * self.pics.length));
        }
        while (self.uniqueNumbersInArray(arr) == false){
            arr = [];
            for (var i = 0; i < self.number; i++){
                arr.push(Math.floor(Math.random() * self.pics.length));
            }
        }
        return arr;
    }

    this.uniqueNumbersInArray = function(arr){
        var map = {};
        for (var i in arr){
            if (map[arr[i]] != undefined){
                return false;
            }
            map[arr[i]] = arr[i];
        }
        return true;
    }

    this.hasThisNumber = function(num){
        var list = self.generatedNumbers;
        for (var i in list){
            if (list[i] == num){
                return true;
            }
        }
        return false;
    }

}