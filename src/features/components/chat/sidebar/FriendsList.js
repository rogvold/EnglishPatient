/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FriendsList = React.createClass({
    getDefaultProps: function () {
        return {
            //users: [{
            //    name: 'Marina Gotovkina',
            //    id: 3
            //}, {
            //    name: 'Susanna Bekker',
            //    id: 2
            //}, {
            //    name: 'Valery Mokhova',
            //    id: 1
            //}, {
            //    name: 'Sasha Markova',
            //    id: 0
            //}],
            users: [],
            selectedUserId: 0,
            notReadMap: {},
            onUserSelect: function(u){

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

    componentStyle: {
        placeholder: {
            //width: 250,
            width: '100%',
            height: 550,
            overflowY: 'auto',
            color: '#A2B4BC',
            //backgroundColor: '#4D394B',
            backgroundColor: '#2E3C54'
            //padding: 5
        },

        item: {
            cursor: 'pointer',
            //color: 'white',
            //backgroundColor: '#1B2432',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            padding: 8,
            paddingLeft: 13,
            fontSize: 14,
            lineHeight: '16px',
            height: 30
        },

        selected: {
            color: 'white',
            backgroundColor: '#1B2432'
        },

        notReadSpan: {
            display: 'inline-block',
            padding: '3px 5px',
            color: 'white',
            marginLeft: 3,
            backgroundColor: 'rgb(252, 99, 107)',
            borderRadius: 4,
            lineHeight: '10px',
            fontSize: 12
        }
    },

    onUserClick: function(u){
        this.props.onUserSelect(u);
    },

    getSortedList: function(){
        var arr = this.props.users;
        var map = this.props.notReadMap;
        arr.sort(function(u1, u2){
            var n1 = (map[u1.id] == undefined) ? 0 : map[u1.id].lastTimestamp;
            var n2 = (map[u2.id] == undefined) ? 0 : map[u2.id].lastTimestamp;
            var k2 = (map[u2.id] == undefined) ? 0 : map[u2.id].messagesNumber;
            var k1 = (map[u1.id] == undefined) ? 0 : map[u1.id].messagesNumber;
            var t1 = u1.timestamp;
            var t2 = u2.timestamp;

            //var p1 = k1 * 86400 * 1000 * 1000 + n1;
            //var p2 = k2 * 86400 * 1000 * 1000 + n2;
            var p1 = n1  * 86400 * 1000 * 1000 + t1;
            var p2 = n2  * 86400 * 1000 * 1000 + t2;

            return p2 - p1;
        });
        return arr;
    },

    render: function () {
        var selectedSt = assign({}, this.componentStyle.item, this.componentStyle.selected);

        var list = this.props.users;
        var nMap = this.props.notReadMap;

        list = this.getSortedList();

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(u, k){
                    var key = 'chat_' + u.id + '_user_' + k;
                    var n = (nMap[u.id] == undefined) ? 0 : nMap[u.id].messagesNumber;
                    var isSelected = (u.id == this.props.selectedUserId);
                    var st = (isSelected == true) ? selectedSt : this.componentStyle.item;
                    var onUserClick = this.onUserClick.bind(this, u);
                    return (
                        <div className={'chatFriendsListItem'} key={key} style={st} onClick={onUserClick} >
                            <span>{u.name}</span>
                            {n == 0 ? null : <span style={this.componentStyle.notReadSpan}>{n}</span>}
                        </div>
                    );

                }, this)}


            </div>
        );
    }

});

module.exports = FriendsList;