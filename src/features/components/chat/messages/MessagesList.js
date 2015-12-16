/**
 * Created by sabir on 15.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MessageItem = require('./MessageItem');

var MessagesList = React.createClass({
    getDefaultProps: function () {
        return {
            messages: [{
                name: 'Sabir',
                avatar: 'https://avatars2.githubusercontent.com/u/1834389?v=3&s=460',
                content: 'Hi girls!'
            }, {
                name: 'Susanna',
                content: 'Hi Sabir!',
                avatar: 'https://pp.vk.me/c625829/v625829418/4dcc7/Uw50vmTB4AU.jpg'
            }, {
                name: ' Marina',
                content: 'Hi! How about meeting tonight?',
                avatar: 'https://pp.vk.me/c623230/v623230909/d2bc/o_hfIlTLv0M.jpg'
            }, {
                name: 'Sasha',
                content: 'No, Marina, we spend this evening together.',
                avatar: 'https://pp.vk.me/c624823/v624823671/8b4/xOTNos7LiQM.jpg'
            }, {
                name: 'Valery',
                content: 'Nice to meet you!',
                avatar: 'https://pp.vk.me/c627829/v627829856/25698/My0DVUWtqtI.jpg'
            }, {
                name: 'Sabir',
                avatar: 'https://avatars2.githubusercontent.com/u/1834389?v=3&s=460',
                content: 'Because the first day of the first week does not always fall on the first day of the year, sometimes the week-year will differ from the month year.'
            }, {
                name: 'Sasha',
                content: 'I see...',
                avatar: 'https://pp.vk.me/c624823/v624823671/8b4/xOTNos7LiQM.jpg'
            }, {
                name: ' Marina',
                content: 'Bye',
                avatar: 'https://pp.vk.me/c623230/v623230909/d2bc/o_hfIlTLv0M.jpg'
            }, {
                name: ' Marina',
                content: "It's better for us to drift apart",
                avatar: 'https://pp.vk.me/c623230/v623230909/d2bc/o_hfIlTLv0M.jpg'
            },{
                name: 'Sabir',
                avatar: 'https://avatars2.githubusercontent.com/u/1834389?v=3&s=460',
                content: 'Hi girls!'
            }, {
                name: 'Susanna',
                content: 'Hi Sabir!',
                avatar: 'https://pp.vk.me/c625829/v625829418/4dcc7/Uw50vmTB4AU.jpg'
            }, {
                name: ' Marina',
                content: 'Hi! How about meeting tonight?',
                avatar: 'https://pp.vk.me/c623230/v623230909/d2bc/o_hfIlTLv0M.jpg'
            }, {
                name: 'Sasha',
                content: 'No, Marina, we spend this evening together.',
                avatar: 'https://pp.vk.me/c624823/v624823671/8b4/xOTNos7LiQM.jpg'
            }, {
                name: 'Valery',
                content: 'Nice to meet you!',
                avatar: 'https://pp.vk.me/c627829/v627829856/25698/My0DVUWtqtI.jpg'
            }, {
                name: 'Sabir',
                avatar: 'https://avatars2.githubusercontent.com/u/1834389?v=3&s=460',
                content: 'Because the first day of the first week does not always fall on the first day of the year, sometimes the week-year will differ from the month year.'
            }, {
                name: 'Sasha',
                content: 'I see...',
                avatar: 'https://pp.vk.me/c624823/v624823671/8b4/xOTNos7LiQM.jpg'
            }, {
                name: ' Marina',
                content: 'Bye',
                avatar: 'https://pp.vk.me/c623230/v623230909/d2bc/o_hfIlTLv0M.jpg'
            }, {
                name: ' Marina',
                content: "It's better for us to drift apart",
                avatar: 'https://pp.vk.me/c623230/v623230909/d2bc/o_hfIlTLv0M.jpg'
            }],

            userId: undefined
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
            width: 600,
            backgroundColor: 'white',
            margin: '0 auto'

        }
    },

    getGroupedMessages: function(){
        var arr = [];
        var list = this.props.messages;
        var map = {};
        for (var i in list){
            var t = list[i].timestamp;
            t = Math.floor(t / 60000.0);
            if (map[t] == undefined){
                map[t] = {
                    messages: []
                }
            }
            map[t].messages.push(list[i]);
        }
        for (var key in map){
            var mess = map[key].messages;
            var atts = [];
            var s = mess.join('<br/>');
            for (var i in mess){
                atts = atts.concat(mess[i].attachments);
            }
            //todo: finish this
        }
    },


    render: function () {
        var list = this.props.messages;
        list.sort(function(m1, m2){
            return m1.timestamp - m2.timestamp;
        });

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(m, k){
                    var key = 'message_' + m.id + '_' + k;

                    return (
                        <MessageItem name={m.name} avatar={m.avatar}
                                     timestamp={m.timestamp} key={key}
                                     fromId={m.fromId} toId={m.toId}
                                     status={m.status}
                                     attachments={m.attachments}
                                     userId={this.props.userId}
                                     content={m.content} />
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = MessagesList;