/**
 * Created by sabir on 12.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var ClassMixin = require('../../mixins/ClassMixin');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');
var SelfLoadingLeftSidebarClassesList = require('../../components/class/list/SelfLoadingLeftSidebarClassesList');
var LoadingSegment = require('../../components/segment/LoadingSegment');

var LoginApp = require('./LoginApp');

var TeacherHeader = require('../../components/header/teacher/TeacherHeader');

var MaterialCreateButton = require('../../components/material/buttons/MaterialCreateButton');

var VimeoPlayer = require('../../components/player/VimeoPlayer');

var MaterialTags = require('../../components/material/MaterialTags');

var MaterialDialog = require('../../components/material/dialogs/MaterialDialog');

var SoundsList = require('../../components/corrector/sounds/SoundsList');

var SoundsPanel = require('../../components/corrector/sounds/SoundsPanel');
var WordsPanel = require('../../components/corrector/words/WordsPanel');

var CorrectorPanel = require('../../components/corrector/CorrectorPanel');
var CorrectorHelpButton = require('../../components/corrector/CorrectorHelpButton');

var SelfLoadingVideosList = require('../../components/feed/video/SelfLoadingVideosList');
var FeedItem = require('../../components/feed/FeedItem');
var SelfLoadingClassFeed = require('../../components/feed/SelfLoadingClassFeed');

var SelfLoadingFeedItem = require('../../components/feed/SelfLoadingFeedItem');

var MaterialsSearchPanel = require('../../components/material/search/MaterialsSearchPanel');

var MaterialSearchButton = require('../../components/material/search/MaterialSearchButton');

var SelfLoadingUpdateFeedItem = require('../../components/feed/SelfLoadingUpdateFeedItem');

var ExercisesSearchPanel = require('../../components/exercise/search/ExercisesSearchPanel');
var ExercisesSearchButton = require('../../components/exercise/search/ExercisesSearchButton');

var EditFeedItemButton = require('../../components/feed/button/EditFeedItemButton');

var RoleSelector = require('../../components/user/RoleSelector');

var AddClassPlusButton = require('../../components/class/buttons/student/AddClassPlusButton');

var MigrationMixin = require('../../mixins/MigrationMixin');

var Diff = require('react-diff');

var RightTextAnswerDiff = require('../../components/exercise/diff/RightTextAnswerDiff');

var MaterialsMixin = require('../../mixins/MaterialsMixin');

var DevApp = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I'
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
                    selectedClassId={this.props.params.classId} />
            </div>
        );
    },

    getHeader: function(){
        return (
            <TeacherHeader activeTab={'index'} onLogout={this.updateAuth}  />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    onSelect: function(ids){
        console.log('dev app: ids = ', ids);
    },

    onExerciseSelect: function(){
        alert('onExerciseSelect');
    },


    getContent: function(){

        return (
            <div>


                

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

module.exports = DevApp;