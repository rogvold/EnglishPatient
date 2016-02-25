/**
 * Created by sabir on 18.02.16.
 */

var Mixpanel = require('mixpanel');

var Constants = require('../../../js/Constants');
var assign = require('object-assign');
var Parse = require('parse').Parse;
var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');

var MixpanelHelper = {

    getCurrentUser: function(){
        ParseMixin.initParse();
        var u = Parse.User.current();
        if (u == undefined){
            return undefined;
        }
        var firstName = ( u.get('firstName') == undefined ) ? '' : u.get('firstName');
        var lastName = ( u.get('lastName') == undefined ) ? '' : u.get('lastName');
        var name = firstName + ' ' + lastName;
        if (name == ' '){
            name = u.get('email');
        }
        return {
            name: name,
            firstName: firstName,
            lastName: lastName,
            role: u.get('userRole'),
            email: u.get('email'),
            avatar: u.get('avatar'),
            id: u.id,
            createdAt: u.createdAt,
            lang: (u.get('lang') == undefined) ? 'en' : u.get('lang')
        }
    },

    getCurrentUserId: function(){
        var u = this.getCurrentUser();
        if (u == undefined){
            return undefined;
        }
        return u.id;
    },

    getMixpanel: function(){
        //var mixpanel = Mixpanel.init(Constants.MIXPANEL_KEY);
        //console.log('getMixpanel occured: mixpanel = ', mixpanel);
        return mixpanel;
    },

    track: function(eventName, params){
        if (eventName == undefined){
            return;
        }
        if (params == undefined){
            params = {};
        }
        var userId = this.getCurrentUserId();
        var mixpanel = this.getMixpanel();
        var p = assign({}, {distinct_id: userId}, params);
        mixpanel.track(eventName, p);
    },

    identify: function(){
        console.log('MixpanelHelper: identify occured');
        var mixpanel = this.getMixpanel();
        var user = this.getCurrentUser();
        if (user == undefined){
            return;
        }
        mixpanel.identify(user.id);
        mixpanel.people.set({
            "$first_name": user.firstName,
            "$last_name": user.lastName,
            "$created": user.createdAt,
            "$email": user.email,
            'role': user.role,
            'avatar': user.avatar,
            'lang': user.lang
        });
    },

    setValueToUser: function(name, value){
        var mixpanel = this.getMixpanel();
        mixpanel.people.set(name, value);
    },

    incrementUserValue: function(name){
        var mixpanel = this.getMixpanel();
        mixpanel.people.set_once(name, 0);
        mixpanel.people.increment(name);
    }

};

module.exports = MixpanelHelper;