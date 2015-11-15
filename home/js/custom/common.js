/**
 * Created by sabir on 02.11.14.
 */

function initParse(){
    var appId = 'h1QhtsSjeoyQSa8RDQBDPvgbnI7Ix6nadHTsepwN';
    var jsKey = 'Ci34OXCgbv7TuVOiUJFOmoSwULbC7JRnxvFaT1ZI';
    Parse.initialize(appId, jsKey);
}

function gup( name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return null;
    else
        return results[1];
}

function enablePreloader(message){
    $('.gallery-loader').removeClass('hide');
    if (message != undefined){
        $('.gallery-loader .loader').html(message);
    }
}

function disablePreloader(){
    $('.gallery-loader').addClass('hide');
    $('.gallery-loader .loader').html('');
}

function loadVimeoImgSrc(vimeoId, callback){
    $.ajax({
        type:'GET',
        url: 'http://vimeo.com/api/v2/video/' + vimeoId + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data){
            var thumbnail_src = data[0].thumbnail_large;
            callback(thumbnail_src);
        }
    });
}

function loadVimeoInfo(vimeoId, callback){
    $.ajax({
        type:'GET',
        url: 'http://vimeo.com/api/v2/video/' + vimeoId + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data){
            callback(data[0]);
        }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}


function randomString(len, charSet) {
    //charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function wrap(str, method, className) {
    return str.replace({
        chars: /[^]/g,
        words: /\w+/g,
        lines: /.+$/gm
    }[method || 'words'], function ($1) {
        return '<span class="' + className + '" >' + $1 + '</span>';
    });
}

function wrapWordInHtml(html, className){
    //var text = $(this).html().split(/[^A-Za-z,\.\!\?<>]/),
    ///^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/
    if ((html.indexOf('<img') > -1) || (html.indexOf('<a') > -1) || (html.indexOf('<div') > -1) || (html.indexOf('<iframe') > -1) || html.indexOf('<audio') > -1){
        return html;
    }

    //var text = html.split(/[\\. ,!\\?-]/),
    var text = html.split(/[ ]/),
        len = text.length,
        result = [];
    for( var i = 0; i < len; i++ ) {
        text[i] = text[i].trim();
        if (text[i] == ''){
            continue;
        }
        if (text[i] == '<br/>'){
            result.push('<br/>');
        }
        var pret = text[i].replace(/[^A-Za-z,-\\' \\.]/g, '');
        //if (pret == '' || (isEmptyTag(pret) == true ) || (pret.indexOf(',') > -1) || (pret.indexOf(':') > -1) || (pret.indexOf('.') > -1) || (pret.indexOf('?') > -1) || (pret.indexOf('!') > -1)){
        if (pret == '' || (isEmptyTag(pret) == true ) || /[a-zA-Z]+/.test(pret) == false ){
            result.push(text[i]);
            continue;
        }
        result.push('<span class="' + className + '" >' + text[i] + '</span>');
    }
    return result.join(' ');
}

var isEmptyTag = function(s){
    var re = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
    return re.test(s);
}

var onlyTags = function(s){

}

//placeholder should be div with class list-group
function getStringListHtml(stringList, itemClass){
    var s = '';
    var sClass = (itemClass == undefined) ? ' ' : itemClass;
    var list = stringList;
    for (var i in list){
        var st = list[i];
        s+='<a href="javascript: void(0);" class="list-group-item ' + sClass + '">' +
        //'<h4 class="list-group-item-heading" id="list-group-item-heading">' +
        //    '' + st +
        //    '<a class="anchorjs-link" href="#list-group-item-heading">' +
        //    '<span class="anchorjs-icon"></span></a>' +
        //'</h4>' +
        '<p class="list-group-item-text">' +
            '' + st +
        '</p>' +
        '</a>';
    }
    return s;
}

//PRO_LIST = ['I absolutely agree with you.', 'That\'s exactly what I think.', 'I agree with you 100 percent.', 'I am of the same opinion.', 'I agree with you entirely.', 'I totally agree with you.', 'That\'s true.', 'That\'s for sure.', 'You\'re absolutely right.', 'Well, you could be right.', 'That\'s exactly how I feel.', 'I’ve come to the same conclusion', 'No doubt about it.', 'That’s correct!'];
PRO_LIST = ['I absolutely agree with you.', 'That\'s exactly what I think.', 'I agree with you 100 percent.', 'I totally agree with you.', 'That\'s true.', 'That\'s for sure.', 'You\'re absolutely right.', 'That\'s exactly how I feel.', 'I\'ve come to the same conclusion.', 'No doubt about it.'];
//CONTRA_LIST = ['I cannot share this view.', 'I cannot agree with this idea.', 'It is not as simple as it seems.', 'I\'m afraid, I can\'t agree with you.', 'That is not necessarily so.', 'I\'m sorry, but I disagree.', 'That\'s not always the case.', 'I don\'t agree with you.', 'I\'m not so sure about that.', 'That\'s not always true.', 'I don\'t think so.', 'I\'d say the exact opposite.', 'I\'m afraid I disagree.', 'Not at all!'];
CONTRA_LIST = ['I cannot share this view', 'It is not as simple as it seems.', 'I\'m afraid, I can\'t agree with you.', 'I\'m sorry, but I disagree.', 'That\'s not always the case.', 'I don\'t agree with you.', 'I\'m not so sure about that.', 'That\'s not always true.', 'I\'d say the exact opposite.', 'I\'m afraid I disagree.'];



function loadAllDataFromParseRecursively(className, page, createdAt, results, callback){
    if (className == undefined){
        callback({error: 'className is not defined'});
        return;
    }
    console.log('loading ' + className + ': page = ' + page + ' createdAt =', createdAt);
    var q = new Parse.Query(Parse.Object.extend(className));
    q.limit(1000);
    q.skip(page * 1000);
    q.greaterThan('createdAt', createdAt);
    q.addAscending('createdAt');
    q.find(function(list){
        if (page > 8){
            page = 0;
            createdAt = results[results.length - 1].createdAt;
        }
        page = page + 1;

        results = results.concat(list);
        if (list.length < 1000){
            callback(results);
            return;
        }
        loadAllDataFromParseRecursively(className, page, createdAt, results, callback);
    });
}

function loadAllDataFromParse(className, callback){
    initParse();
    loadAllDataFromParseRecursively(className, 0, new Date(0), [], callback);
}

function loadAllDataFromParseRecursively2(q, page, createdAt, results, callback){
    console.log('loadAllDataFromParseRecursively2', q);
    if (q == undefined){
        callback({error: 'q is not defined'});
        return;
    }
    q.limit(1000);
    q.skip(page * 1000);
    q.greaterThan('createdAt', createdAt);
    q.addAscending('createdAt');
    q.find(function(list){
        if (page > 8){
            page = 0;
            createdAt = results[results.length - 1].createdAt;
        }
        page = page + 1;

        results = results.concat(list);
        if (list.length < 1000){
            callback(results);
            return;
        }
        loadAllDataFromParseRecursively2(q, page, createdAt, results, callback);
    });
}

function loadAllDataFromParse2(q, callback){
    initParse();
    loadAllDataFromParseRecursively2(q, 0, new Date(0), [], callback);
}

function wrapSentenceBracketWordsWithTag(word, tagName, color){
    if (word == undefined){
        return undefined;
    }

    var colorStyle =  (color == undefined) ? ' ' : (' color: ' + color + ';');
    console.log('color: ', color);
    console.log('colorStyle: ', colorStyle);


    word = word.replace(/\[(.*?)\]/g, function(a, b){
        return '<' + tagName + ' style="' + colorStyle + ' " >' + b + '</' + tagName + '>';
    });
    return word;
}

function getArraysIntersection(arr1, arr2){
    var arr = [];
    var map = {};
    for (var i in arr1){
        var f = false;
        var a1 = arr1[i];
        for (var j in arr2){
            var a2 = arr2[j];
            if (a1 == a2){
                map[a1] = a1;
            }
        }
    }
    for (var key in map){
        arr.push(key);
    }
    return arr;
}


function isEmptyString(s){
    return (s == undefined || s == '');
}