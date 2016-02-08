/**
 * Created by sabir on 05.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');
var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');

var Constants = require('../../../js/Constants');

var SlaaskHelper = {

    init: function(){
        console.log('SlaaskHelper: init occured');
        ParseMixin.initParse();
        var user = LoginMixin.getCurrentUser();
        if (user == undefined){
            this.initSlaask();
        }else {
            var email = user.email;
            var id = user.id;
            var name = user.name;
            this.initSlaask(name, {
                name: name,
                email: email,
                id: id
            })
        }
    },

    initSlaask: function(userName, paramsObj){
        console.log('trying to init Slaask: userName, paramsObj = ', userName, paramsObj);
        try{
            if (_slaask == undefined){
                console.log('_slaask == undefined');
                return;
            }
            var n = 0;
            if ((paramsObj != undefined) && (userName != undefined)){
                n = Object.keys(paramsObj).length;
                console.log('n = ' + n);
                if (n != 0){
                    _slaask.identify(userName, paramsObj);
                    _slaask.init(Constants.SLAASK_KEY);
                }
            }else {
                _slaask.init(Constants.SLAASK_KEY);
            }
        }catch(err){
            console.log('can not init Slaask: err = ', err);
            setTimeout(function(){
                this.initSlaask(userName, paramsObj);
            }.bind(this), 3000);
        }
    }

}

module.exports = SlaaskHelper;