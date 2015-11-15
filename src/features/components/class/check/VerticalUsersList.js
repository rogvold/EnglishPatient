/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var VerticalUserListItem = require('./VerticalUsersListItem');

var VerticalUsersList = React.createClass({
    getDefaultProps: function () {
        return {
            users: [],
            selectedUserId: undefined,
            onUserSelect: function(userId){
                console.log('onUserSelect: ' + userId);
            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onItemClick: function(userId){
        this.props.onUserSelect(userId);
    },

    componentStyle: {
        placeholder: {
            width: '100%'
        }
    },

    render: function () {
        var list = this.props.users;

        return (
            <div style={this.componentStyle.placeholder} className={'ui animated middle aligned divided list'}>
                {list.map(function(u, k){
                    var key = 'user_list_item_' + u.id + '_' + k;
                    var boundClick = this.onItemClick.bind(this, u.id);
                    var isSelected = (this.props.selectedUserId != undefined && this.props.selectedUserId == u.id);
                    return (
                        <VerticalUserListItem isSelected={isSelected}
                                      name={u.name} avatar={u.avatar} userId={u.id}
                                      number={k} userId={u.id} onClick={boundClick} key={key} />
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = VerticalUsersList;