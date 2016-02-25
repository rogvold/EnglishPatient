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

var GrammarPanel = require('../../components/grammar/GrammarPanel');
var CommunityGrammarPanel = require('../../components/grammar/CommunityGrammarPanel');

var TeacherSidebarButtons = require('../../components/sidebar/TeacherSidebarButtons');

var SharePanel = require('../../components/share/SharePanel');

var BackgroundImageContainer = require('../../components/image/BackgroundImageContainer');

var ShareApp = React.createClass({
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
        document.title = 'English Patient';
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

                <TeacherSidebarButtons />

                <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                                                    addClassMode={true} selectedClassId={this.props.params.classId} />

            </div>
        );
    },


    getHeader: function(){
        var userId = LoginMixin.getCurrentUserId();
        return (
            <TeacherHeader userId={userId}   />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    getContent: function(){

        return (
            <div>



            </div>

        );
    },

    getFooter: function(){

    },

    onClose: function(){
        CommonMixin.forceTransitionTo('/#/');
    },

    render: function () {
        var name = this.props.params.name;
        var id = this.props.params.id;
        var userId = LoginMixin.getCurrentUserId();

        return (
            <div style={this.componentStyle.placeholder}>

                <SharePanel objectId={id} name={name} onClose={this.onClose} />

                {userId == undefined ?
                    <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} >
                        <BackgroundImageContainer image={'http://www.englishpatient.org/app/assets/images/galaxy.jpg'} />
                    </div>
                    :
                    <LeftSidebarTemplate sidebar={this.getSidebar()} header={this.getHeader()} footer={this.getFooter()} content={this.getContent()} />
                }

            </div>
        );
    }

});

module.exports = ShareApp;