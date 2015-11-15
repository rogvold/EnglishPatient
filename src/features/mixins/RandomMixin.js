/**
 * Created by sabir on 03.10.15.
 */
var LocalStorageMixin = require('./LocalStorageMixin');

var RandomMixin = {

    getRandomInteger: function(max){
        var p = Math.random();
        if (max == undefined){
            return 0;
        }
        return Math.floor(max * p);
    },

    getRandomTestNumber: function(maxNumber){
        var name = 'RANDOM_TEST_NUMBER';
        var n = LocalStorageMixin.getItem(name);
        if (n == undefined){
            n = this.getRandomInteger(maxNumber);
            LocalStorageMixin.setItem(name, n);
        }else{
            n = +n;
        }
        return n;
    }

}

module.exports = RandomMixin;