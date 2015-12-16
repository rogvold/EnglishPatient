/**
 * Created by sabir on 15.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MessagesList = require('./messages/MessagesList');

var ChatInput = require('../chat/input/ChatInput');

var SelfLoadingChatMessagesPanel = require('./SelfLoadingChatMessagesPanel');

var SelfLoadingFriendsList = require('./sidebar/SelfLoadingFriendsList');
var LoginMixin = require('../../mixins/LoginMixin');


var ChatPanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            role: undefined,
            friendId: undefined,

            onSubmit: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            friendId: this.props.friendId,
            chatName: this.props.chatName
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var friendId = nextProps.friendId;
        if (friendId != this.props.friendId){
            this.setState({
                friendId: friendId
            });
        }
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            height: 550,
            width: 850,
            color: 'rgba(0, 0, 0, 0.870588)',
            margin: '0 auto',
            backgroundColor: 'white'
        },


        sidebar: {
            height: '100%',
            width: 250,
            display: 'inline-block',
            verticalAlign: 'top',
            borderLeft: '1px solid #EFF0F1'
        },

        main: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 600,
            height: '100%',
            position: 'relative'
        }


    },

    onUserSelect: function(u){
        console.log('selected user: ', u);
        this.setState({
            friendId: u.id,
            chatName: u.name
        });
    },


    render: function () {
        var u = LoginMixin.getCurrentUser();
        var userId = this.props.userId;
        var role = this.props.role;
        if (userId == undefined){
            userId = u.id;
        }
        if (role == undefined){
            role = u.role;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.main}>

                    <SelfLoadingChatMessagesPanel userId={userId}
                                                  friendId={this.state.friendId}
                                                  chatName={this.state.chatName} />

                </div>


                <div style={this.componentStyle.sidebar}>
                    <SelfLoadingFriendsList
                        onUserSelect={this.onUserSelect} selectedUserId={this.state.friendId}
                        userId={userId} role={role} />
                </div>

            </div>
        );
    }

});

module.exports = ChatPanel;