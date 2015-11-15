/**
 * Created by sabir on 04.07.15.
 */

var StatsManager = function(){
    var self = this;
    this.cards = [];
    this.wordsMap = {};

    this.init = function(){
        initParse();
        self.loadCards(function(cards){
            self.cards = cards;
            console.log('cards: ');
            console.log(cards);
            self.prepareMap();
        });
    }

    this.loadCards = function(callback){
        //var q = new Parse.Query('ReshakaMessage');
        var q = new Parse.Query(Parse.Object.extend('ExerciseCard'));
        q.limit(1000);
        loadAllDataFromParse2(q, function(messages){
            console.log(messages);
            messages = messages.reverse();
            callback(messages);
        });
    }

    this.prepareMap = function(){
        var arr = self.cards.map(function(c){return c.get('transcript')});
        var tr = [];
        for (var i in arr){
            if (arr[i] != undefined && arr[i] != ''){
                tr.push(arr[i]);
            }
        }
        //console.log(tr);
        var wrds = [];
        var map = {};
        for (var i in tr){
            var sent = tr[i];
            sent = sent.replace(/\./g, '').replace(/,/g, '').replace(/\d/g, '').replace(/\?/g, '').replace(/!/g, '');
            var words = sent.split(' ');
            console.log(words);
            for (var j in words){
                var w = words[j].toLowerCase();
                if (w.length < 4){
                    continue;
                }
                //console.log(w);
                if (map[w] == undefined){
                    map[w] = 0;
                }
                map[w]++;
            }
        }
        self.wordsMap = map;
        console.log(map);


        var s = '';
        var n = 0;
        for (var key in map){
            n++;
            s+= '<li>' + n + ' ) <b>' + key + '</b> - ' + map[key] + '</li>';
        }
        $('#list').html(s);
    }


}