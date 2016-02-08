/**
 * Created by sabir on 29.07.15.
 */


var CommonMixin = {

    arraysAreEqual: function(array1, array2, itemComparator){
        console.log('arraysAreEqual: ', array1, array2);
        if (itemComparator == undefined){
            itemComparator = function(a, b){return (a == b)}
        }
        if (array1 == undefined || array2 == undefined){
            console.log('returning false');
            return false;
        }
        if (array1.length != array2.length){
            console.log('returning false (l1 != l2)');
            return false;
        }
        for (var i in array1){
            var f = itemComparator(array1[i], array2[i]);
            if (f == false){
                return false;
            }
        }
        return true;
    },

    stringArraysAreMaplyEqual: function(array1, array2){
        if (array1 == undefined || array2 == undefined){
            console.log('returning false');
            return false;
        }
        if (array1.length != array2.length){
            console.log('returning false (l1 != l2)');
            return false;
        }
        var map = {};
        for (var i in array1){
            map[array1[i]] = array1[i];
        }
        var f = true;
        for (var i in array2){
            if (map[array2[i]] == undefined){
                f = false;
            }
        }
        return f;
    },

    pointsComparator: function(p1, p2){
        if ((p1.lat != p2.lat) || (p1.lon != p2.lon) ){
            return false;
        }
        return true;
    },

    getDistanceFromLatLon: function (lat1, lon1, lat2, lon2) {
        var R = 6371000;
        var dLat = this.deg2rad(lat2-lat1);
        var dLon = this.deg2rad(lon2-lon1);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        //console.log('distance between points is ', d);
        if (isNaN(d) == true){
            return 0;
        }
        return d;
    },

    deg2rad: function(deg) {
        return deg * (Math.PI/180)
    },

    getDistanceFromPointsArray: function(points){
        var d = 0;
        if (points == undefined || points.length < 2){
            return 0;
        }
        for (var i = 0; i < points.length - 1; i++){
            var p1 = points[i];
            var p2 = points[i+1];
            d+= this.getDistanceFromLatLon(p1.lat, p1.lon, p2.lat, p2.lon);
        }
        return d;
    },


    getRandomString: function(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    },

    getObjectById: function(list, id){
        if (list == undefined || id == undefined){
            return undefined;
        }
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
    },

    gup: function(name){
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( window.location.href );
        if( results == null ){
                return null;
            }else{
                return results[1];
            }
    },

    validateEmail: function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },

    extractVimeoIdFromUrl: function(val){
        if (val == '' || val == undefined) {
            return undefined;
        }
        if (val.indexOf('youtube') > -1){
            return undefined;
        }

            var matches = /(\d+)/.exec(val);
            if (matches != undefined && matches.length > 0){
                return matches[0];
            }else{
                return undefined;
            }
    },

    extractYoutubeIdFromUrl: function(url){
        if (url == undefined){
            return undefined;
        }
        var video_id = url.split('v=')[1];
        if (video_id == undefined){
            return undefined;
        }
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    },

    wrapURLs: function(text, new_window) {
        var urlRegex =
            new RegExp(
                '((https?://)' +
                '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' + //user@
                '(([0-9]{1,3}\.){3}[0-9]{1,3}' + // IP- 199.194.52.184
                '|' + // allows either IP or domain
                '([0-9a-z_!~*\'()-]+\.)*' + // tertiary domain(s)- www.
                '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' + // second level domain
                '[a-z]{2,6})' + // first level domain- .com or .museum
                '(:[0-9]{1,4})?' + // port number- :80
                '((/?)|' + // a slash isn't required if there is no file name
                '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?))',
                "gi");
        text = text.replace(urlRegex, "<a href='$1'>$1</a>");
        return text;

        //var url_pattern = /(http|ftp|https:\/\/[\w\-_]+\.{1}[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi;
        //var target = (new_window === true || new_window == null) ? '_blank' : '';
        //
        //return text.replace(url_pattern, function (url) {
        //    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
        //    var href = protocol_pattern.test(url) ? url : 'http://' + url;
        //    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
        //});

    },

    isLocalhost: function(){
        var url = window.location.href;
        if (url.indexOf('0.0.0.0') > -1){
            return true;
        }
        return false;
    },

    forceTransitionTo: function(url){
        var isLocalhost = this.isLocalhost();
        var base = 'https://www.englishpatient.org/app';
        if (isLocalhost == false){
            url = base + url;
        }
        history.pushState(null, null, url);
        window.location.reload();
    },

    printHtml: function(data, width, height){
        if (width == undefined){
            width == 400;
        }
        if (height == undefined){
            height == 600;
        }
        var mywindow = window.open('', 'my div', 'height=' + height + ',width=' + width);
        mywindow.document.write('<html><head><title>my div</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();

        return true;
    }

}

module.exports = CommonMixin;