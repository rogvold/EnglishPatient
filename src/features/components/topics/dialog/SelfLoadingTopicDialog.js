/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicDialog = require('./TopicDialog');

var TopicPanel = require('../panels/TopicPanel');

var SelfLoadingTopicDialog = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            topicId: undefined,

            name: undefined,
            description: undefined,
            avatar: undefined,

            onClose: function(){

            },

            onTopicUpdated: function(topic){

            },

            onTopicDeleted: function(){

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

    onTopicUpdated: function(topic){
        this.props.onTopicUpdated(topic);
    },

    onTopicDeleted: function(){
        console.log('SelfLoadingTopicDialog: onTopicDeleted oocured');
        this.props.onTopicDeleted();
    },

    //getDialogContent: function(){
    //    return (
    //
    //        <div>
    //            {this.props.topicId == undefined ?
    //                <div style={{padding: 10}}>
    //                    topicId is not defined
    //                </div>
    //                :
    //                <TopicPanel name={this.props.name}
    //                            teacherId={this.props.teacherId}
    //                            topicId={this.props.topicId}
    //                            description={this.props.description}
    //                            avatar={this.props.avatar}
    //                    />
    //            }
    //
    //        </div>
    //    );
    //},

    getDialogContent: function(){
        return (
                    <TopicPanel name={this.props.name}
                                teacherId={this.props.teacherId}
                                topicId={this.props.topicId}
                                description={this.props.description}
                                avatar={this.props.avatar}

                                onTopicUpdated={this.onTopicUpdated}
                                onTopicDeleted={this.onTopicDeleted}
                    />
        );
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <TopicDialog
                    content={this.getDialogContent()}
                    visible={this.props.visible}
                    onClose={this.props.onClose}
                    />

            </div>
        );
    }

});

module.exports = SelfLoadingTopicDialog;