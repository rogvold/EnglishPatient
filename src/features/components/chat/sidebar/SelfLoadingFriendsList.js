/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FriendsList = require('./FriendsList');
var ChatMixin = require('../../../mixins/ChatMixin');
var ClassMixin = require('../../../mixins/ClassMixin');

var SelfLoadingFriendsList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            role: undefined,
            selectedUserId: undefined,
            onUserSelect: function(u){

            },
            refreshInterval: 30 * 1000
        }
    },

    getInitialState: function () {
        return {
            users: [],
            loading: false,
            selectedUserId: this.props.selectedUserId,
            notReadMap: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var selectedUserId = nextProps.selectedUserId;
        if (selectedUserId != this.props.selectedUserId){
            this.setState({
                selectedUserId: selectedUserId
            });
        }
    },

    componentDidMount: function () {
        this.load(function(users){
            console.log('friends loaded: ', users);
        });
        this.initTimer();
    },

    componentWillUnmount: function(){
        this.destroyTimer();
    },

    load: function(callback){
        this.setState({
            loading: true,
            users: []
        });
        ClassMixin.loadFriends(this.props.userId, this.props.role, function(users){
            this.setState({
                loading: false,
                users: users
            });
            this.loadNotReadMessagesUsersMap();
            callback(users);
        }.bind(this))
    },

    loadNotReadMessagesUsersMap: function(){
        ChatMixin.loadNotReadMessagesUsersMap(this.props.userId, function(map){
            this.setState({
                notReadMap: map
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        listPlaceholder: {

        }
    },

    initTimer: function(){
        this.intervalId = setInterval(function(){
            this.loadNotReadMessagesUsersMap();
        }.bind(this), this.props.refreshInterval);
    },

    destroyTimer: function(){
        clearInterval(this.intervalId);
    },

    onUserSelect: function(u){
        this.setState({
            selectedUserId: u.id
        });
        this.props.onUserSelect(u);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>
                    <FriendsList users={this.state.users} notReadMap={this.state.notReadMap}
                                 onUserSelect={this.onUserSelect}
                                 selectedUserId={this.state.selectedUserId} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingFriendsList;