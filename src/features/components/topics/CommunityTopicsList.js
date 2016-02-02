/**
 * Created by sabir on 27.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TopicsList = require('./TopicsList');
var CoolPreloader = require('../preloader/CoolPreloader');

var SelfLoadingTopicDialog = require('./dialog/SelfLoadingTopicDialog');

var BackgroundImageContainer =require('../image/BackgroundImageContainer');

var CommunityTopicsList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TopicsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            teacherId: undefined,
            topicType: 'basic'
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var topicsStore = flux.store('TopicsStore');
        var usersStore = flux.store('UsersStore');
        var teacherId = this.props.teacherId;
        var loading = (usersStore.loading || topicsStore.loading);
        var topicType = this.props.topicType;
        var topics = topicsStore.getCommunityTopics(teacherId, topicType);

        return {
            loading: loading,
            topics: topics
        }
    },

    getInitialState: function(){
        return {
            selectedTopicId: undefined
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 852,
            margin: '0 auto',
            marginTop: 10
        },

        userInfoPlaceholder: {
            padding: 5,
            borderBottom: '1px solid #EFF0F1'
        },

        itemPlaceholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 2,
            marginTop: 5,
            marginBottom: 5
        },

        topicsList: {

        },

        avatarPlaceholder: {
            width: 40,
            height: 40,
            borderRadius: 4,
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 10
        },

        userInfoRightBlockPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        userNamePlaceholder: {
            color: '#2E3C54',
            fontSize: 14,
            fontWeight: 'bold'
        },

        userTopicsInfoPlaceholder: {
            fontSize: 12,
            opacity: 0.6
        }
    },

    getTopicsGrouppedByUsers: function(){
        var usersMap = this.getFlux().store('UsersStore').usersMap;
        var arr = [];
        var topics = this.state.topics;
        var map = {};
        for (var i in topics){
            var topic = topics[i];
            if (map[topic.creatorId] == undefined){
                map[topic.creatorId] = {
                    user: usersMap[topic.creatorId],
                    topics: []
                }
            }
            map[topic.creatorId].topics.push(topic);
        }
        for (var key in map){
            arr.push(map[key]);
        }
        return arr;
    },

    onTopicClick: function(topic){
        if (topic == undefined){
            return;
        }
        this.setState({
            selectedTopicId: topic.id
        });
    },

    onClose: function(){
        console.log('CommunityTopicsList: onClose occured');
        this.setState({
            selectedTopicId: undefined
        });
    },

    render: function(){
        var list = this.getTopicsGrouppedByUsers();
        var selectedTopicId = this.state.selectedTopicId;
        var topic = (selectedTopicId == undefined) ? undefined : this.getFlux().store('TopicsStore').topicsMap[selectedTopicId];

        return (
            <div style={this.componentStyle.placeholder} >


                {list.map(function(item, k){
                    var key = 'topic_group_' + k;
                    var user = item.user;
                    var topics = item.topics;

                    return (
                        <div key={key} style={this.componentStyle.itemPlaceholder}>


                            {user == undefined ? null :
                                <div style={this.componentStyle.userInfoPlaceholder}>

                                    <div style={this.componentStyle.avatarPlaceholder}>
                                        <BackgroundImageContainer image={user.avatar} />
                                    </div>

                                    <div style={this.componentStyle.userInfoRightBlockPlaceholder}>
                                        <div style={this.componentStyle.userNamePlaceholder}>
                                            {user.name}
                                        </div>
                                        <div style={this.componentStyle.userTopicsInfoPlaceholder}>
                                            Количество топиков: <b>{topics.length}</b>
                                        </div>
                                    </div>

                                </div>
                            }

                            <div style={this.componentStyle.topicsList}>
                                <TopicsList
                                    topics={topics} onTopicClick={this.onTopicClick} />
                            </div>

                        </div>
                    );

                }, this)}

                {topic == undefined ? null :
                    <SelfLoadingTopicDialog
                        topicId={topic.id} name={topic.name} avatar={topic.avatar} description={topic.description}
                        teacherId={topic.creatorId}
                        editMode={false}
                        onClose={this.onClose}
                        />
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CommunityTopicsList;