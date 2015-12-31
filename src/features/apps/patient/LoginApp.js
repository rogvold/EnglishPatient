/**
 * Created by sabir on 12.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var AuthForm = require('../../components/user/AuthForm');
var LoginMixin = require('../../mixins/LoginMixin')

var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var LoginApp = React.createClass({
    getDefaultProps: function () {
        return {
            onLogin: function(){

            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        document.title = 'Вход';
    },

    onLogin: function(){
        //LoginMixin.lo
        console.log('onLogin occured - redirecting');
        //window.location.reload();
        CommonMixin.forceTransitionTo('/#/');
    },

    componentStyle: {
        placeholder: {

        },

        topBlock: {
            margin: '0 auto',
            marginTop: 20,
            marginBottom: 20,
            width: 300,
            textAlign: 'center'
        },

        logo: {
            width: 120
        }


    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topBlock} >
                    <img style={this.componentStyle.logo}
                         src={'http://beta.englishpatient.org/home/img/logo_mini.png'} />
                </div>

                <AuthForm onLogin={this.onLogin} roleSelectorEnabled={true} />
            </div>
        );
    }

});

module.exports = LoginApp;