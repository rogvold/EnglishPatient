/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicsMixin = require('../../mixins/TopicsMixin');

var TopicsList = require('./TopicsList');


var SelfLoadingTopicDialog = require('./dialog/SelfLoadingTopicDialog');

var AddTopicButton = require('./AddTopicButton');

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;


var SelfLoadingTopicsList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TopicsStore', 'UsersStore')],

    getDefaultProps: function () {
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
        var topics = topicsStore.getTopicsByUserIdAndTopicType(teacherId, topicType);

        return {
            loading: loading,
            topics: topics
        }

    },

    getInitialState: function () {
        return {
            //topics: [],
            //loading: false,

            selectedTopicId: undefined,
            selectedTopicName: undefined,
            selectedTopicDescription: undefined,
            selectedTopicAvatar: undefined,

            topicDialogVisible: false,

            addNewTopicButtonVisible: true
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var teacherId = nextProps.teacherId;
        if (teacherId != this.props.teacherId){
            //this.load(teacherId, function(ts){
            //    console.log('topics loaded');
            //});
        }
    },

    componentDidMount: function () {
        var teacherId = this.props.teacherId;
        //this.load(teacherId, function(ts){
        //    console.log('topics loaded: ', ts);
        //});
    },

    load: function(teacherId, callback){
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var topicType = this.props.topicType;
        TopicsMixin.loadTeacherTopics(teacherId, topicType, function(topics){
            this.setState({
                loading: false,
                topics: topics
            });
            if (callback != undefined){
                callback(topics);
            }
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            maxWidth: 852,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 2,
            marginBottom: 5
        },

        userInfoPlaceholder: {
            padding: 5,
            borderBottom: '1px solid #EFF0F1'
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
        },

        addTopicButtonStyle: {

        },

        addTopicButtonPlaceholder: {
            textAlign: 'right',
            padding: 5
        }
    },

    onTopicClick: function(topic){
        console.log(topic);
        this.setState({
            selectedTopicId: topic.id,
            selectedTopicName: topic.name,
            selectedTopicDescription: topic.description,
            selectedTopicAvatar: topic.avatar,

            topicDialogVisible: true
        });
    },

    onDialogClose: function(){
        this.setState({
            topicDialogVisible: false
        });
    },

    onTopicCreated: function(topic){
        this.setState({
            topicDialogVisible: false
        });
        //this.load(this.props.teacherId, function(topics){
        //
        //});
        this.getFlux().actions.refreshTopic(topic.id);
    },

    onTopicUpdated: function(topic){
        this.onTopicCreated(topic);
    },

    onTopicDeleted: function(){
        console.log('SelfLoadingTopicsList: onTopicDeleted occured');
        this.onTopicCreated();
    },

    render: function () {
        var user = this.getFlux().store('UsersStore').usersMap[this.props.teacherId];

        return (
            <div style={this.componentStyle.placeholder}>




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
                                Количество топиков: <b>{this.state.topics.length}</b>
                            </div>
                        </div>
                    </div>
                }

                <div style={this.componentStyle.addTopicButtonPlaceholder}>
                    <AddTopicButton
                        buttonClassName={'ui button basic mini'}
                        icon={'icon plus'}
                        style={this.componentStyle.addTopicButtonStyle}
                        topicType={this.props.topicType}
                        onTopicCreated={this.onTopicCreated}
                        teacherId={this.props.teacherId}
                        />
                </div>

                <TopicsList topics={this.state.topics} onTopicClick={this.onTopicClick} />




                {this.state.topicDialogVisible == false ? null :
                    <SelfLoadingTopicDialog
                        name={this.state.selectedTopicName}
                        description={this.state.selectedTopicDescription}
                        avatar={this.state.selectedTopicAvatar}
                        topicId={this.state.selectedTopicId}
                        visible={this.state.topicDialogVisible}

                        teacherId={this.props.teacherId}

                        onClose={this.onDialogClose}

                        onTopicUpdated={this.onTopicUpdated}
                        onTopicDeleted={this.onTopicDeleted}
                        />
                }


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingTopicsList;