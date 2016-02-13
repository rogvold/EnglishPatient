/**
 * Created by sabir on 31.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Constants = require('../../js/Constants');

//var mailgun = require('mailgun-js')({apiKey: Constants.MAILGUN_API_KEY, domain: Constants.MAILGUN_DOMAIN});
//var mg = require('mailgun-js');

//var Mailgun = require('mailgun').Mailgun;

var ParseMixin = require('../../react/mixins/commonMixins/ParseMixin');
var Parse = require('parse').Parse;
var MailTemplateHelper = require('../helpers/mail/MailTemplateHelper');

var LoginMixin = require('../mixins/LoginMixin');

var MailAPI = {

    sendEmail: function(toEmail, fromEmail, subject, html, successCallback, errorCallback){
        if (toEmail == undefined){
            return;
        }
        if (fromEmail == undefined){
            var user = LoginMixin.getCurrentUser();
            if (user != undefined){
                fromEmail = user.email;
            }
        }

        var data = {toEmail: toEmail};
        if (fromEmail != undefined){
            data =assign({}, data, {fromEmail: fromEmail});
        }
        if (subject != undefined){
            data =assign({}, data, {subject: subject});
        }
        if (html != undefined){
            html = MailTemplateHelper.getMailHtml('warning', subject, html);
            data =assign({}, data, {html: html});
        }

        Parse.Cloud.run('sendEmail', data, function(){
                successCallback(toEmail);
            }
        );
    }

}

module.exports = MailAPI;