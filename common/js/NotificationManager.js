/**
 * Created by sabir on 06.01.15.
 */

var NotificationManager = function(){
    var self = this;
    this.user = undefined;
    this.notifications = [];

    this.init = function(){
        initParse();
        self.user = Parse.User.current();
        self.prepare();
    }

    this.prepare = function(){
        self.loadNotifications(function(){
            self.drawNotifications();
        });
    }

    this.loadNotifications = function(callback){
        var q = new Parse.Query(Parse.Object.extend('ParseNotification'));
        q.limit(1000);
        q.equalTo('toId', self.user.id);
        enablePreloader();
        q.find(function(results){
            self.notifications = results;
            disablePreloader();
            callback();
        });
    }

    this.drawNotifications = function(){
        var s = '';
        var list = self.notifications;
        for (var i in list){
            s+= self.getNotificationItemHtml(list[i]);
        }
        $('#notificationsList').html(s);
        if (list.length > 0){
            $("#notificationsBadge").show();
            $('#notificationsNumber').html(list.length);
        }else{
            $("#notificationsBadge").hide();
        }
    }


    this.getNotificationItemHtml = function(not){
        var s = '';
        s+='<li class="list-group-item">' +
        '<a href="javascript:;">' +
        '<span class="pull-left mt5 mr15">' +
        '<img src="img/faceless.jpg" class="avatar avatar-sm img-circle" alt="">' +
        '</span>' +
        '<div class="m-body">' +
        '<div class="">' +
        '<small><b>CRYSTAL BROWN</b></small>' +
        '<span class="label pull-right label-info"><i class="ti-check" ></i></span>' +
        '</div>' +
        '<span>' + not.get('message') + '</span>' +
        '<span class="time small">' + moment(not.createdAt) + '</span>' +
        '</div>' +
        '</a>' +
        '</li>';
        return s;
    }


}