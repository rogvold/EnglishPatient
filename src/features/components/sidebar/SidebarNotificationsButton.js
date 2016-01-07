/**
 * Created by sabir on 05.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var NotificationsNumberSpan = require('../notification/NotificationsNumberSpan');

var LoginMixin = require('../../mixins/LoginMixin');

var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var SidebarNotificationsButton = React.createClass({
    getDefaultProps: function () {
        return {


        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 10,
            paddingRight: 10,
            height: 30,
            fontSize: 14,
            lineHeight: '16px',
            color: '#B3BCC4',

            marginBottom: 20
        },

        buttonStyle: {
            borderBottom: '1px dotted rgba(103, 109, 118, 0.18)',
            cursor: 'pointer',
            //width: '100%',
            //height: 30,
            height: 22,
            paddingBottom: 5,
            display: 'inline-block'
        },

        spanPlaceholder: {
            display: 'inline-block',
            padding: 3,
            paddingRight: 5,
            borderRadius: 4,
            fontSize: 12,
            lineHeight: '10px',
            color: 'white',
            marginLeft: 3,
            backgroundColor: 'rgb(252, 99, 107)'
        },

        active: {
            backgroundColor: '#1B2432',
            color: 'white'
        }

    },

    onClick: function(){
        CommonMixin.forceTransitionTo('/#/notifications');
    },

    isActive: function(){
        var s = window.location.hash;
        if (s.indexOf('/notifications') > -1) {
            return true;
        }
        return false;
    },

    render: function () {
        var userId = LoginMixin.getCurrentUser().id;
        var isActive = this.isActive();

        var st = assign({}, this.componentStyle.placeholder);
        if (isActive == true){
            st = assign({}, st, this.componentStyle.active);
        }


        return (
            <div style={st} onClick={this.onClick} >

                <div style={this.componentStyle.buttonStyle}>
                    Мои уведомления
                </div>

                <NotificationsNumberSpan spanStyle={this.componentStyle.spanPlaceholder} userId={userId} />

            </div>
        );
    }

});

module.exports = SidebarNotificationsButton;