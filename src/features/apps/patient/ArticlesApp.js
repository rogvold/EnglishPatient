/**
 * Created by sabir on 05.01.16.
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


var TeacherSidebarButtons = require('../../components/sidebar/TeacherSidebarButtons');

var SelfLoadingArticlesList = require('../../components/articles/SelfLoadingArticlesList');

var CommunityArticlesPanel = require('../../components/articles/CommunityArticlesPanel');

var ArticlesApp = React.createClass({
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
        document.title = 'Модули';
        console.log('Exercises App mounted');
        console.log(this.props.params);

    },

    componentStyle: {
        placeholder: {

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
            <TeacherHeader userId={userId} activeTab={'articles'} onLogout={this.onLogout}  />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    getContent: function(){
        var userId = this.state.user.id;
        return (
            <div style={{padding: 5,
            width: 840, padding: 0, height: '100%', margin: '0 auto', marginTop: 0, paddingTop: 10}} >

                <SelfLoadingArticlesList teacherId={userId} />

                <CommunityArticlesPanel userId={userId} />

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

module.exports = ArticlesApp;