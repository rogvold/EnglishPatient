/**
 * Created by sabir on 12.10.15.
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

var Sausage = require('../../components/sausage/Sausage');

var TeacherSidebarButtons = require('../../components/sidebar/TeacherSidebarButtons');

var IndexPanel = require('../../components/interface_manuals/index/IndexPanel');

var IndexApp = React.createClass({
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
            user: undefined,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
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
        document.title = 'Главная';
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

                <TeacherSidebarButtons />

                <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                    addClassMode={true} selectedClassId={this.props.params.classId} />
            </div>
        );
    },

    onLogout: function(){
        CommonMixin.forceTransitionTo('/#/');
    },

    getHeader: function(){
        var userId = this.state.user.id;
        return (
            <TeacherHeader userId={userId} activeTab={'index'} onLogout={this.onLogout}  />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    getContent: function(){

        return (
            <div>


                <div>

                    <IndexPanel />

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
                    <LeftSidebarTemplate sidebar={this.getSidebar()} header={this.getHeader()} footer={this.getFooter()} content={this.getContent()} />
                }
            </div>
        );
    }

});

module.exports = IndexApp;