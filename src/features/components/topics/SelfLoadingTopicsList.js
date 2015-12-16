/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicsMixin = require('../../mixins/TopicsMixin');

var TopicsList = require('./TopicsList');


var SelfLoadingTopicDialog = require('./dialog/SelfLoadingTopicDialog');

var AddTopicButton = require('./AddTopicButton');

var SelfLoadingTopicsList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            topicType: 'basic'
        }
    },

    getInitialState: function () {
        return {
            topics: [],
            loading: false,

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
            this.load(teacherId, function(ts){
                console.log('topics loaded');
            });
        }
    },

    componentDidMount: function () {
        var teacherId = this.props.teacherId;
        this.load(teacherId, function(ts){
            console.log('topics loaded: ', ts);
        });
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
            maxWidth: 850,
            margin: '0 auto'
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
        this.load(this.props.teacherId, function(topics){

        });

    },

    onTopicUpdated: function(topic){
        this.onTopicCreated(topic);
    },

    onTopicDeleted: function(){
        console.log('SelfLoadingTopicsList: onTopicDeleted occured');
        this.onTopicCreated();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <TopicsList topics={this.state.topics} onTopicClick={this.onTopicClick} />

                <AddTopicButton
                    topicType={this.props.topicType}
                    onTopicCreated={this.onTopicCreated}
                    teacherId={this.props.teacherId}
                    />


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