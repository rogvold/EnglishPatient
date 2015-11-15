/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');
var UserCard = require('./UserCard');

var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var UsersCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            users: [],
            userClicked: function(n, userId){
                console.log('userClicked: ', n, userId);
            },
            onUserDelete: function(userId){

            },
            stasiMode: false
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {
        //var newUsers = (nextProps.users == undefined) ? [] : nextProps.users;
        //var oldUsers = (this.props.users == undefined) ? [] : this.props.users;
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%'
        }
    },

    onItemClick: function(n, userId){

    },

    onUserDelete: function(userId){
        this.props.onUserDelete(userId);
    },

    render: function () {
        var list = this.props.users;

        return (
            <div style={this.componentStyle.placeholder} className={'ui stackable three cards'}  >
                {list.map(function(user, n){
                    var userId = user.userId;
                    var key = 'user-card-' + userId + '-' + n;
                    var boundClick = this.onItemClick.bind(this, n, userId);
                    var boundDelete = this.onUserDelete.bind(this, userId);

                    return (
                        <UserCard onClick={boundClick} key={key} onUserDelete={boundDelete}
                                  name={user.name} avatar={user.avatar} timestamp={user.timestamp}
                                  userId={userId} stasiMode={this.props.stasiMode}
                                  email={user.email}
                            />
                    );

                }, this)}
            </div>
        );
    }

});

module.exports = UsersCardsList;