/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var ChatMessagesPanel = require('./ChatMessagesPanel');

var ChatMixin = require('../../mixins/ChatMixin');

var SelfLoadingChatMessagesPanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            friendId: undefined,
            chatName: undefined,
            refreshInterval: 10 * 1000
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            messages: [],
            usersMap: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var userId = nextProps.userId;
        var friendId = nextProps.friendId;
        console.log('SelfLoadingChatMessagesPanel: newProps: userId, friendId = ', userId, friendId);
        //if (userId != this.props.userId || friendId != this.props.friendId){
        this.load(userId, friendId, function(messages, uMap){
            console.log('messages loaded: ', messages, uMap);
        });
        //}
    },

    componentDidMount: function () {
        var userId = this.props.userId;
        var friendId = this.props.friendId;

        this.load(userId, friendId, function(messages, uMap){
            console.log('messages loaded: ', messages, uMap);
        });
        this.initTimers();
    },

    componentWillUnmount: function(){
        this.destroyTimers();
    },

    componentStyle: {
        placeholder: {

        },

        panelPlaceholder: {

        }
    },

    load: function(userId, friendId, callback){
        console.log('SelfLoadingChatMessagesPanel: load: ', userId, friendId);
        if (userId == undefined || friendId == undefined){
            return;
        }
        this.setState({
            messages: [],
            loading: true
        });
        ChatMixin.loadMessages(userId, friendId, undefined, function(messages, uMap){
            this.setState({
                loading: false,
                messages: messages,
                usersMap: uMap
            });
            setTimeout(function(){
                this.makeMessagesRead();
            }.bind(this), 300);


            callback(messages, uMap);
        }. bind(this))
    },

    makeMessagesRead: function(){
        var list = this.state.messages;
        var arr = [];
        var refArr = [];
        var userId = this.props.userId;
        for (var i in list){
            var m = list[i];
            if (m.toId == userId && m.status == 'new'){
                arr.push(m);
                m.status = 'read';
            }
            refArr.push(m);
        }
        if (arr.length == 0){
            return;
        }
        this.setState({
            messages: refArr
        });
        ChatMixin.makeMessagesRead(arr, function(ms){
            console.log('made read: ', ms);
        });
    },

    initTimers: function(){
        this.refreshTimerId = setInterval(function(){
            this.refreshMessages(function(newMessages, uMap){
                console.log(newMessages, uMap);
            });
        }.bind(this), this.props.refreshInterval);
    },

    destroyTimers: function(){
        clearInterval(this.refreshTimerId);
    },

    refreshMessages: function(callback){
        var userId = this.props.userId;
        var friendId = this.props.friendId;
        var messages = this.state.messages;
        var t = 0;
        //if (messages.length > 0){
        //    t = +messages[messages.length - 1].timestamp + 1000;
        //}
        for (var i in messages){
            if (messages[i].timestamp > t) {t = messages[i].timestamp}
        }
        t+= 1300;

        this.setState({
            refreshing: true
        });
        ChatMixin.loadMessages(userId, friendId, t, function(newMessages, uMap){
            this.setState({
                refreshing: false,
                messages: messages.concat(newMessages),
                usersMap: uMap
            });

            setTimeout(function(){
                this.makeMessagesRead();
            }.bind(this), 300);

            callback(newMessages, uMap);
        }. bind(this))
    },

    onSubmit: function(m){
        this.sendMessage(m);
    },

    sendMessage: function(m){
        var content = m.content;
        var attachments = m.attachments;

        var messages = this.state.messages;
        this.setState({
            loading: true
        });
        ChatMixin.sendMessage(this.props.userId, this.props.friendId, content, attachments, function(m){
            var usersMap = this.state.usersMap;
            var fromUser = (usersMap[m.fromId] == undefined) ? {} : usersMap[m.fromId];
            var toUser = (usersMap[m.toId] == undefined) ? {} : usersMap[m.toId];
            m.fromUserName =fromUser.name;
            m.fromUserAvatar = fromUser.avatar;
            m.toUserName = toUser.name;
            m.toUserAvatar =toUser.avatar;
            m.avatar = fromUser.avatar;
            m.name = fromUser.name;
            console.log('adding new message: ', m);
            messages.push(m);
            this.setState({
                loading: false,
                messages: messages
            });
        }.bind(this));
    },

    render: function () {
        var friendIsSelect = (this.props.friendId != undefined);
        var chatName = (friendIsSelect == false) ? 'выберите пользователя' : this.props.chatName;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.panelPlaceholder}>

                    {friendIsSelect == false ?
                        <div style={{paddingTop: 100, fontSize: 20, textAlign: 'center', color: '#A1A4AA'}} >
                            <div style={{marginBottom: 36, lineHeight: '26px'}} >выберите собеседника из <br/> списка справа </div>
                            <img style={{width: 200}} src={'https://www.englishpatient.org/app/assets/images/messages.png'} />
                        </div> :
                        <ChatMessagesPanel onSubmit={this.onSubmit}
                                           sending={this.state.loading}
                                           refreshing={this.state.refreshing}
                                           friendId={this.props.friendId}
                                           userId={this.props.userId}
                                           chatName={chatName} messages={this.state.messages} />
                    }

                </div>


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingChatMessagesPanel;