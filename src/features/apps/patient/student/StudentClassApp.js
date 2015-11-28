/**
 * Created by sabir on 04.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../../mixins/LoginMixin');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');
var ClassMixin = require('../../../mixins/ClassMixin');

var LeftSidebarTemplate = require('../../../components/templates/LeftSidebarTemplate');
var SelfLoadingLeftSidebarClassesList = require('../../../components/class/list/SelfLoadingLeftSidebarClassesList');
var LoadingSegment = require('../../../components/segment/LoadingSegment');

var ClassTabsNamePanel = require('../../../components/class/tabs/ClassTabsNamePanel');
var ClassHeader = require('../../../components/class/header/ClassHeader');
var ClassTab = require('../../../components/class/tabs/ClassTab');
var CheckUsersListDashboard = require('../../../components/class/check/CheckUsersListDashboard');

var UsersCardsList = require('../../../components/card/UsersCardsList');

var IconMessage = require('../../../components/help/IconMessage');
var GifInstruction = require('../../../components/help/GifInstruction');

var LoginApp = require('../LoginApp');


var StudentHeader = require('../../../components/header/student/StudentHeader');

var ExerciseDialogViewer = require('../../../components/dialog/exercise/ExerciseDialogViewer');

var ExerciseDialogClickableArea = require('../../../components/dialog/exercise/ExerciseDialogClickableArea');

var SelfLoadingClassFeed = require('../../../components/feed/SelfLoadingClassFeed');

var TaskPanel = require('../../../components/class/tasks/TaskPanel');

var LeaveClassButton = require('../../../components/class/buttons/student/LeaveClassButton');

var StudentSelfLoadingLeftSidebarClassesList = require('../../../components/class/list/StudentSelfLoadingLeftSidebarClassesList');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;



var StudentClassApp = React.createClass({
    mixins: [Router.Navigation],

    getDefaultProps: function () {
        return {
            headerLinks: [

            ],
            teacherId: 'jnM2pCK62I'
        }
    },

    getInitialState: function(){
        return {
            loading: false,
            users: [],
            selectedTabName: 'users',
            loggedIn: false,
            lastUpdated: (new Date()).getTime(),
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
        }
    },

    componentWillReceiveProps: function (nextProps) {
        console.log('ClassApp: newProps = ', nextProps);
        var newClassId = (nextProps.params == undefined) ? undefined : nextProps.params.classId;
        var oldClassId = (this.props.params == undefined) ? undefined : this.props.params.classId;
        if (oldClassId != newClassId){
            this.loadClass(newClassId, function(result){
                if (result == undefined){
                    CommonMixin.forceTransitionTo('/#/');
                }
                console.log('class loaded: ', result);
            });
        }
    },

    componentDidMount: function () {
        ParseMixin.initParse();

        console.log('ClassApp mounted');
        console.log(this.props.params);
        var classId = this.props.params.classId;
        if (classId == undefined){
            return;
        }
        this.loadClass(classId, function(result){
            if (result == undefined){
                CommonMixin.forceTransitionTo('/#/');
            }
            console.log('class loaded: ', result);
        });
    },

    loadClass: function(classId, callback){
        if (classId == undefined){
            return;
        }
        this.setState({
            loading: true,
            patientClass: undefined
        });
        ClassMixin.loadClass(classId, function(result){
            this.setState({
                patientClass: result,
                loading: false
            });
            callback(result);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        },
        tabStyle: {
            height: window.innerHeight - 100,
            overflowY: 'auto'
        },

        usersTab: {
            //padding: 5,
            //paddingTop: 25,
            paddingTop: 0,
            //maxWidth: 880,
            margin: '0 auto'
        },

        noUsersBlock: {
            marginTop: 10,
            padding: 10
        },

        usersCardsListPlaceholder: {
            maxWidth: 880,
            margin: '0 auto'
        },

        classInfoPlaceholder: {
            marginBottom: 10,
            backgroundColor: 'white',
            textAlign: 'center',
            padding: 5,
            color: '#1B2432',
            borderBottom: '1px solid #EFF0F1'
        },

        feedPlaceholder: {
            paddingTop: 10
        }

    },

    getSidebar: function(){
        var classId = (this.props.params == undefined) ? undefined : this.props.params.classId;
        return (
            <div>
                <StudentSelfLoadingLeftSidebarClassesList  userId={this.state.user.id}
                                                           addClassMode={true}
                                                           selectedClassId={classId} />

            </div>
        );
    },

    onLogout: function(){
        //window.location.reload();
        CommonMixin.forceTransitionTo('/#/');
    },

    getHeader: function(){
        var userId = this.state.user.id;
        return (
            <StudentHeader userId={userId} activeTab={'class'} onLogout={this.onLogout}  />
        );
    },

    onClassLeft: function(){
        CommonMixin.forceTransitionTo('/#/');
    },

    getContent: function(){
        var patientClass = this.state.patientClass;
        var code = (this.state.patientClass == undefined) ? undefined : this.state.patientClass.code;
        console.log('code = ', code);
        var classId = (this.props.params == undefined) ? undefined : this.props.params.classId;
        var userId = this.state.user.id;

        return (
            <LoadingSegment segmentClassName={''} segmentStyle={{height: '100%', backgroundColor: 'transparent'}}
                            loading={this.state.loading} >
                <div className={'loadingLoaderContent'} style={{position: 'relative'}} >

                    <div style={{position: 'absolute', top: 2, left: 5, display: 'none'}} >
                        <LeaveClassButton classId={classId} onClassLeft={this.onClassLeft}
                                         userId={userId}
                            />
                    </div>

                    {patientClass == undefined ? null :
                        <ClassHeader text={patientClass.name} />
                    }

                    <div style={this.componentStyle.feedPlaceholder}>
                        <SelfLoadingClassFeed userId={userId} teacherMode={false} classId={classId}  />
                    </div>

                </div>
            </LoadingSegment>
        );
    },

    getFooter: function(){

    },

    render: function () {
        return (
            <div style={this.componentStyle.placeholder}>
                <LeftSidebarTemplate sidebar={this.getSidebar()} header={this.getHeader()} footer={this.getFooter()} content={this.getContent()} />
            </div>
        );
    }

});

module.exports = StudentClassApp;