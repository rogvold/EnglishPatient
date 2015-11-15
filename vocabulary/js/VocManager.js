/**
 * Created by sabir on 05.08.15.
 */

var VocManager = function(){
    var self = this;
    this.words = [];
    this.materials = [];
    this.selectedMaterial = undefined;

    this.init = function(){
        initParse();
        self.loadMaterials(function(){
            self.loadWords(function(){
                self.drawWords();
                self.initVocItem();
            });
        });
    }


    this.loadWords = function(callback){
        $.ajax({
            url: 'json/list.json',
            success: function(data){
                data = data.sort(function(a, b){
                    if (a < b){
                        return -1;
                    }
                    if (a > b){
                        return 1;
                    }
                    return 0;
                });
                self.words = data;
                console.log('words loaded: ', data);
                callback(data);
            }
        });
    }

    this.loadMaterials = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientMaterial'));
        q.limit(1000);
        q.find(function(results){
            console.log('materials loaded: ', results);
            self.materials = results;
            callback();
        });
    }

    this.drawWords = function(){
        var list = self.words;
        console.log();
        var s = '';
        for (var i in list){
            s+= self.getWordItemHtml(list[i]);
        }
        $('#words').html(s);
    }

    this.initVocItem = function(){
        $('body').on('click', '.wordPlaceholder' ,function(){
            var word = $(this).attr('data-word');
            $('.infoPlaceholder[data-word="' + word + '"]').toggle();
        });
        $('body').on('click', '.materialItem', function(){
            var id = $(this).attr('data-id');
            var word = $(this).attr('data-word');
            var m = self.getMaterialById(id);
            self.selectedMaterial = m;
            $('#videoPlaceholder').html('<iframe src="https://player.vimeo.com/video/' + m.get('vimeoId') + '?title=0&autoplay=1&byline=0&portrait=0" width="600" height="338" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            $('#transcript').html(m.get('transcript'));
            $('#modalName').html(word);
            $('#modal').modal('show');
        });

        $('#modal').modal({
            onHidden: function(){
                $('#videoPlaceholder').html('');
                $('#transcript').html('');
            }
        });

    }

    this.getMaterialById = function(id){
        var list = self.materials;
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    }

    this.getWordItemHtml = function(item){
        var s = '';
        s+='';
        var arr = self.getMaterialsByWord(item);
        var listHtml = (arr.length == 0) ? '' : ('<ul>' + arr.map(function(a){return ('<li class="materialItem" data-word="' + item + '" data-id="' + a.id + '" >' + a.get('transcript') + '</li>')}).join('') + '</ul>');
        s+='<div class="item vocItem ' + (arr.length == 0 ? ' danger ' : '  ') + '" data-word="' + item + '" >' +
                '<div class="wordPlaceholder"  data-word="' + item + '"  >' +
                    item +
                '</div>' +
                '<div class="amountPlaceholder">' +
                 arr.length +
                '</div>' +
                '<div class="infoPlaceholder" style="display: none;" data-word="' + item + '" >' +
                '' + listHtml +
                '</div>' +
            '</div>';
        return s;
    }


    this.getMaterialsByWord = function(word){
        word = word.toLowerCase();
        var arr = [];
        var list = self.materials;
        for (var i in list){
            var tr = list[i].get('transcript');
            if (tr != undefined){
                if (tr.length > 300){
                    continue;
                }
                tr = tr.toLowerCase();
                var res = '\\b' + word + '\\b';
                var re = new RegExp(res, 'g');
                var tF = re.test(tr);

                //if (tr.indexOf(word) > - 1){
                //    console.log('[' + word +']: re.test(' + tr + ') = ', re.test(tr));
                if (tF == true){
                    arr.push(list[i]);
                }
                //}
            }
        }
        return arr;
    }

}