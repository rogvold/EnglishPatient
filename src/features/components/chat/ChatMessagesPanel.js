/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var ChatInput = require('./input/ChatInput');

var MessagesList = require('./messages/MessagesList');

var SelfLoadingUserSpan = require('../user/SeflLoadingUserSpan');

var ChatMessagesPanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            friendId: undefined,
            chatName: undefined,
            messages: [],
            sending: false,
            refreshing: false,
            onSubmit: function(m){

            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        setTimeout(function(){
            this.scrollMessagesToDown();
        }.bind(this), 300);
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
            //position: 'relative'
        },

        header: {
            height: 40,
            padding: 10,
            borderBottom: '1px solid #EFF0F1',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
        },

        footer: {
            height: 70,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            borderTop: '1px solid #EFF0F1'
        },

        sidebar: {
            height: '100%',
            width: 250,
            display: 'inline-block',
            verticalAlign: 'top',
            color: '#A2B4BC',
            //backgroundColor: '#4D394B',
            backgroundColor: '#2E3C54',
            borderLeft: '1px solid #EFF0F1'
        },

        messages: {
            marginTop: 40,
            marginBottom: 100,
            maxHeight: 440,
            overflowY: 'auto'
        },

        chatNamePlaceholder: {

        }
    },

    scrollMessagesToDown: function(){
        var parentId = 'patient_chat_messages_placeholder';
        var parent = document.getElementById(parentId);
        if (parent != undefined){
            parent.scrollTop = 1000000000;
        }
    },

    componentDidUpdate: function(){
        this.scrollMessagesToDown();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                    <div style={this.componentStyle.header}>
                        <div style={this.componentStyle.chatNamePlaceholder}>

                            {this.props.chatName == undefined ?
                                <div>
                                    <span style={{color: '#9e9ea6'}}>@</span> <b><SelfLoadingUserSpan userId={this.props.friendId} /></b>
                                </div>
                                :
                                <div>
                                    <span style={{color: '#9e9ea6'}}>@</span> <b>{this.props.chatName}</b>
                                </div>
                            }

                            <div className={'ui inverted dimmer ' + (this.props.refreshing ? ' active ' : '') }>
                                <div className="ui indeterminate loader"></div>
                            </div>
                        </div>

                    </div>


                <div id={'patient_chat_messages_placeholder'} style={this.componentStyle.messages}>
                    <div id={'patient_chat_messages'} >
                        <MessagesList userId={this.props.userId} messages={this.props.messages} />
                    </div>

                </div>

                <div style={this.componentStyle.footer}>

                    <ChatInput sending={this.props.sending} onSubmit={this.props.onSubmit} />

                </div>
            </div>
        );
    }

});

module.exports = ChatMessagesPanel;