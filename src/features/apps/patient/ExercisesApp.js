/**
 * Created by sabir on 12.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');
var ClassMixin = require('../../mixins/ClassMixin');
var ExerciseMixin = require('../../mixins/ExerciseMixin');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');
var SelfLoadingLeftSidebarClassesList = require('../../components/class/list/SelfLoadingLeftSidebarClassesList');
var LoadingSegment = require('../../components/segment/LoadingSegment');

var ClassTabsNamePanel = require('../../components/class/tabs/ClassTabsNamePanel');
var ClassHeader = require('../../components/class/header/ClassHeader');
var ClassTab = require('../../components/class/tabs/ClassTab');
var CheckUsersListDashboard = require('../../components/class/check/CheckUsersListDashboard');

var UsersCardsList = require('../../components/card/UsersCardsList');

var IconMessage = require('../../components/help/IconMessage');
var GifInstruction = require('../../components/help/GifInstruction');

var LoginApp = require('./LoginApp');

var TeacherHeader = require('../../components/header/teacher/TeacherHeader');

var ExerciseDialogViewer = require('../../components/dialog/exercise/ExerciseDialogViewer');

var ExerciseDialogClickableArea = require('../../components/dialog/exercise/ExerciseDialogClickableArea');

var ExerciseCard = require('../../components/card/ExerciseCard');
var ExercisesPagedCardsList = require('../../components/card/ExercisesPagedCardsList');

var ExercisesBunch = require('../../components/bunch/exercise/ExercisesBunch');
var ExercisesGroupsList = require('../../components/bunch/exercise/ExercisesGroupsList');

var CreateNewExerciseButton = require('../../components/exercise/create/button/CreateNewExerciseButton');

var CreateNewExerciseGroupButton = require('../../components/bunch/exercise/CreateNewExerciseGroupButton');


var ExercisesApp = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            loading: false,
            users: [],
            selectedTabName: 'users',
            loggedIn: false,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser(),
            groups: []
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

        this.loadGroups(this.state.user.id, function(grs){
            console.log('groups loaded: ', grs);
        });
    },

    loadGroups: function(teacherId, callback){
        this.setState({
            loading: true,
            groups: []
        });
        console.log('loading groups !! -- !!');
        var self = this;
        ExerciseMixin.loadGroupsWithExercises(teacherId, function(list){
            console.log('loaded groups: ', list);
            self.setState({
                loading: false,
                groups: list
            });
            callback(list);
        });
    },

    componentStyle: {
        placeholder: {

        },

        exercisesListPlaceholder: {
            maxHeight: '100%',
            overflowY: 'auto'
        },

        createExerciseButtonPlaceholder: {
            paddingTop: 5,
            paddingBottom: 5,
            height: 46,
            backgroundColor: 'white',
            width: 900,
            margin: '0 auto',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1'
            //borderLeft: '1px solid '
        },

        contentPlaceholder: {
            width: 900,
            margin: '0 auto'
        }
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
            <div style={this.componentStyle.exercisesListPlaceholder}>
                <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                    selectedClassId={this.props.params.classId} />
            </div>
        );
    },

    onLogout: function(){
        CommonMixin.forceTransitionTo('/#/');
    },

    getHeader: function(){
        return (
            <TeacherHeader activeTab={'exercises'} onLogout={this.onLogout}  />
        );
    },

    onExerciseUpdate: function(ex){
        console.log('ExercisesApp: onExerciseUpdate: ex = ', ex);

        //this.setState({
        //    loading: true
        //    //groups: []
        //});
        console.log('loading groups !! -- !!');
        var self = this;
        ExerciseMixin.loadGroupsWithExercises(this.state.user.id, function(list){
            console.log('loaded groups: ', list);
            self.setState({
                loading: false,
                groups: list
            });
            //callback(list);
        });
    },

    onExerciseCreate: function(ex){
        this.onExerciseUpdate(ex);
    },

    onGroupUpdate: function(g){
        this.onExerciseUpdate();
    },

    onGroupCreate: function(g){
        this.onExerciseUpdate();
    },


    getContent: function(){
        console.log('getting content for the list: groups = ', this.state.groups);
        return (
            <div style={this.componentStyle.contentPlaceholder}>

                <div style={this.componentStyle.createExerciseButtonPlaceholder}>
                    <CreateNewExerciseButton style={{float: 'right'}} teacherId={this.state.user.id} onExerciseCreate={this.onExerciseCreate}
                                             buttonClassName={'ui basic grey button'}
                        />

                    <CreateNewExerciseGroupButton style={{float: 'right'}} teacherId={this.state.user.id} onGroupCreate={this.onGroupCreate} />
                </div>

                <ExercisesGroupsList onGroupUpdate={this.onGroupUpdate}
                                     onExerciseUpdate={this.onExerciseUpdate}
                                     pageSize={6} userId={this.state.user.id} groups={this.state.groups} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : ' ') }>
                    <div className="ui text loader">Загрузка...</div>
                </div>

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
                    <LeftSidebarTemplate sidebar={this.getSidebar()}
                                         header={this.getHeader()} footer={this.getFooter()}
                                         content={this.getContent()} />
                }
            </div>
        );
    }

});

module.exports = ExercisesApp;