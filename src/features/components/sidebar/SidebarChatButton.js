/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var ChatButton = require('../chat/ChatButton');

var NotReadChatSpan= require('../chat/NotReadChatSpan')

var LoginMixin = require('../../mixins/LoginMixin');

var SidebarChatButton = React.createClass({
    getDefaultProps: function () {
        return {}
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
            //padding: 8,
            paddingTop: 8,
            paddingBottom: 8,
            //marginLeft: 10,
            paddingLeft: 10,
            //marginRight: 10,
            paddingRight: 10,
            height: 30,
            fontSize: 14,
            lineHeight: '16px',
            //color: '#8897A3',
            color: '#B3BCC4',

            marginBottom: 20
        },

        buttonStyle: {
            //color: 'white',
            borderBottom: '1px dotted rgba(103, 109, 118, 0.18)',
            cursor: 'pointer',
            width: '100%',
            height: 30,
            paddingBottom: 5
        }
    },

    render: function () {
        var user = LoginMixin.getCurrentUser();
        var userId = (user == undefined) ? undefined : user.id;

        return (
            <div style={this.componentStyle.placeholder} className={''} >
                <ChatButton style={this.componentStyle.buttonStyle}
                            buttonClassName={''} icon={undefined} buttonName={'Мои сообщения'} />

                <NotReadChatSpan userId={userId} />

            </div>
        );
    }

});

module.exports = SidebarChatButton;