/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicItem = require('./TopicItem');

var TopicsList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            topics: [
                {
                    name: 'Science',
                    description: 'this is science description',
                    avatar: 'http://im.vsco.co/1/52975c6e11a33133254/529c68135a6808eb3d0003fe/vsco_120213_9.jpg?w=373&dpr=1'
                },
                {
                    name: 'Politics',
                    description: 'this is science description',
                    avatar: 'http://im.vsco.co/1/51dc8d0050f9622776/547506300c5615f74f8b461e/vsco_112514.jpg?w=373&dpr=1'
                }
            ],

            onTopicClick: function(topic){
                console.log('onTopicClick occured: ', topic);
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
            //textAlign: 'center'
        }
    },

    onTopicClick: function(topic){
        this.props.onTopicClick(topic);
    },

    render: function () {
        var list = this.props.topics;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(topic, k){
                    var id = topic.id;
                    var key = 'topic_item_' + id + '_' + k;
                    var boundClick = this.onTopicClick.bind(this, topic);
                    return (
                        <TopicItem key={key}
                                   onTopicClick={boundClick}
                                   name={topic.name}
                                   avatar={topic.avatar}
                                   topicId={topic.id} />
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = TopicsList;