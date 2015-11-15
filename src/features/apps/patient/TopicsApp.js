/**
 * Created by sabir on 12.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var ClassMixin = require('../../mixins/ClassMixin');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');
var SelfLoadingLeftSidebarClassesList = require('../../components/class/list/SelfLoadingLeftSidebarClassesList');
var LoadingSegment = require('../../components/segment/LoadingSegment');

var LoginApp = require('./LoginApp');

var TeacherHeader = require('../../components/header/teacher/TeacherHeader');

var TopicsList = require('../../components/topics/TopicsList');
var SelfLoadingTopicsList = require('../../components/topics/SelfLoadingTopicsList');

var TopicDialog = require('../../components/topics/dialog/TopicDialog');

var TopicPanel = require('../../components/topics/panels/TopicPanel');
var SelfLoadingTopicDialog = require('../../components/topics/dialog/SelfLoadingTopicDialog');

var SelfLoadingMaterialsList = require('../../components/material/list/SelfLoadingMaterialsList');



var TopicsApp = React.createClass({
    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            users: [],
            selectedTabName: 'users',
            loggedIn: false,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser(),
            topicDialogVisible: true,
            selectedTopicId: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            return false;
        }else{
            this.setState({
                loggedIn: true
            });
        }
        console.log('Exercises App mounted');
        console.log(this.props.params);

    },

    componentStyle: {
        placeholder: {}
    },

    updateAuth: function(){
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            this.setState({
                loggedIn: false
            });
        }else{
            this.setState({
                loggedIn: true
            });
        }
    },


    getSidebar: function(){
        return (
            <div>
                <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                                                    addClassMode={true} selectedClassId={this.props.params.classId} />

            </div>
        );
    },

    onLogout: function(){
        CommonMixin.forceTransitionTo('/#/');
    },

    getHeader: function(){
        return (
            <TeacherHeader activeTab={'topics'} onLogout={this.onLogout}  />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    onTopicClick: function(topicId){
        this.setState({
            selectedTopicId: topicId,
            topicDialogVisible: true
        });
    },

    onTopicDialogClose: function(){
        console.log('onTopicDialogClose occured');
        this.setState({
            topicDialogVisible: false
        });
    },

    getContent: function(){

        return (
            <div style={{padding: 10}}>
                <SelfLoadingTopicsList teacherId={this.state.user.id} />
            </div>


        );
    },

    getFooter: function(){

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                {this.state.loggedIn == false ?
                    <div>
                        <LoginApp />
                    </div> :
                    <LeftSidebarTemplate sidebar={this.getSidebar()} header={this.getHeader()} footer={this.getFooter()} content={this.getContent()} />
                }
            </div>
        );
    }

});

module.exports = TopicsApp;