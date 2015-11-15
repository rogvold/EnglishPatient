/**
 * Created by sabir on 13.01.15.
 */

var TeacherYoutubeSearchManager = function(){
    var self = this;
    this.results = [];
    this.query = '';

    this.init = function(){
        initParse();
        self.initSearchButton();
    }

    this.search = function(query, callback){
        self.query = query;
        console.log(query);
        var q = new Parse.Query(Parse.Object.extend('YoutubeVideoMaterial'));
        q.containsAll('words', [query]);
        q.limit(1000);
        enablePreloader('searching...');
        q.find(function(results){
            self.results = results;
            disablePreloader();
            callback();
        });
    }

    this.initSearchButton = function(){
        $('#searchButton').bind('click', function(){
            var q = $('#search').val().trim();
            self.search(q, function(){
                self.drawResults();
            });
        });
    }

    this.drawResults = function(){
        var list = self.results;
        var s = '';
        for (var i in list){
            s+= self.getResultItem(list[i]);
        }
        $('#resultsList').html(s);
    }

    this.getResultItem = function(m){
        var s = '';
        s+='<div class="panel panel-default resultsItem" data-youtubeId="' + m.get('youtubeId') +'">' +
        '<div class="panel-body headBlock" >' +
        '<img src="' + m.get('thumbnail') + '" class="img-thumbnail pull-left" >' +
        '<h5 >' + m.get('title') + '</h5>' +
        '<div class="bottomInfo" >' +
        '<span class="categoryLabel label label-info" >' + m.get('category') + '</span>' +
        '<span class="viewCountLabel ml10" >' + m.get('viewCount') + '</span>' +
        '</div>' +
        '</div>' +
        //'<div class="panel-body displaynone" data-reactid=".0.6.0.$EPs9DY3uvrA.1">' +
        //'   <div class="list-group " data-reactid=".0.6.0.$EPs9DY3uvrA.1.0">' +
        //'   <a href="javascript: void(0);" class="list-group-item " data-reactid=".0.6.0.$EPs9DY3uvrA.1.0.$662=109">' +
        //'   <span data-reactid=".0.6.0.$EPs9DY3uvrA.1.0.$662=109.0"> white <b>table</b> take all wonderful out and then</span>' +
        //'</a>' +
        //'</div>' +
        //'</div>' +
        '</div>';
        return s;
    }

}