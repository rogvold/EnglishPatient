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
            var matches = /(\d+)/.exec(val);
            if (matches != undefined && matches.length > 0){
                return matches[0];
            }else{
                return undefined;
            }
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
    }

}

module.exports = CommonMixin;