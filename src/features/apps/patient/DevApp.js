/**
 * Created by sabir on 12.10.15.
 */

var React = require('react/addons');
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

var UserMixin = require('../../mixins/UserMixin');

var SelfLoadingNotificationsList = require('../../components/notification/SelfLoadingNotificationsList');

var YoutubeEmbedPlayer = require('../../components/video/youtube/YoutubeEmbedPlayer');

var FirstLevelPanelsList = require('../../components/sausage/FirstLevelPanelsList');

var ReactPlayer = require('react-player');

var Speech = require('react-speech');

var TranslateMixin = require('../../mixins/TranslateMixin');

//var TranslatePanel = require('../../components/translate/panel/TranslatePanel');
var TranslateButton = require('../../components/translate/TranslateButton');

var WordItem = require('../../components/text/translatable/WordItem');

var UserProfilePanel = require('../../components/profile/UserProfilePanel');

var VocabularyPanel = require('../../components/vocabulary/VocabularyPanel');

var MaterialGroupCard = require('../../components/material/groups/MaterialGroupCard');

var CategoryCheckboxesList = require('../../components/search/youtube/checkbox/CategoryCheckboxesList');

var YoutubeSearchPanel = require('../../components/search/youtube/YoutubeSearchPanel');

var SelfLoadingKaraokePlayerPanel = require('../../components/karaoke/SelfLoadingKaraokePlayerPanel');

var KaraokeGroupsPanel = require('../../components/karaoke/KaraokeGroupsPanel');

var GrammarPanel = require('../../components/grammar/GrammarPanel');

var SelfLoadingUserProgressPanel = require('../../components/chart/SelfLoadingUserProgressPanel');

var MessagesList = require('../../components/chat/messages/MessagesList');

var ChatPanel = require('../../components/chat/ChatPanel');
var ChatButton = require('../../components/chat/ChatButton');

var FileUploadButton = require('../../components/file/FileUploadButton');

var DialogEditInfoPanel = require('../../components/dialog_exercise/edit/DialogEditInfoPanel');

var ExerciseDialogCard = require('../../components/dialog_exercise/card/ExerciseDialogCard');


var SelfLoadingDialogEditPanel = require('../../components/dialog_exercise/edit/SelfLoadingDialogEditPanel');

var SelfLoadingDialogPanel = require('../../components/dialog_exercise/view/SelfLoadingDialogPanel');

var SelfLoadingDialogsList = require('../../components/dialog_exercise/list/SelfLoadingDialogsList');

var SelfLoadingDialogsSearchList = require('../../components/dialog_exercise/list/SelfLoadingDialogsSearchList');

//var QuestionAnswerPanelsList = require('../../components/questionnaire/panels/answer/QuestionAnswerPanelsList');

var QuestionnaireQuestionPanel = require('../../components/questionnaire/panels/question/QuestionnaireQuestionPanel');
//var SelfLoadingUpdateQuestionPanel = require('../../components/questionnaire/panels/question/SelfLoadingUpdateQuestionPanel');
var QuestionnaireEditPanel = require('../../components/questionnaire/panels/QuestionnaireEditPanel');

var SelfLoadingTeacherQuestionnairesList = require('../../components/questionnaire/panels/list/SelfLoadingTeacherQuestionnairesList');

var SelfLoadingQuestionnairePanel = require('../../components/questionnaire/panels/view/SelfLoadingQuestionnairePanel');

var SelfLoadingQuestionnaireSearchList = require('../../components/questionnaire/panels/list/SelfLoadingQuestionnaireSearchList');

var QuestionnaireSearchButton = require('../../components/questionnaire/panels/list/QuestionnaireSearchButton');

var DurationsBar = require('../../components/moses/player/DurationsBar');
var SelfLoadingMosesPlayer = require('../../components/moses/player/SelfLoadingMosesPlayer');

var SelfLoadingMosesEditor = require('../../components/moses/editor/SelfLoadingMosesEditor');
var MosesEditorButton = require('../../components/moses/editor/MosesEditorButton');

var JunglesPanel = require('../../components/jungle/JunglesPanel');

var PatientLink = require('../../components/link/PatientLink');

var StarRating = require('../../components/star/StarRating');

var SelfLoadingCoursesList = require('../../components/course/list/SelfLoadingCoursesList');

var DevApp = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I'
        }
    },

    getInitialState: function () {
        var checkboxes = [{
            name: 'sabir',
            active: false
        }, {
            name: 'anton',
            active: true
        }];
        return {
            checkboxes: checkboxes,
            text: 'color',
            start: 0,
            end: 0,
            //url: 'http://www.youtube.com/watch?v=e-ORhEE9VVg',
            url: 'http://www.youtube.com/watch?v=fOdOw_Dsf54',
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
        var f = false;
        return (
            <div>
                {f == false ? null :
                    <div>
                        <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                                                            selectedClassId={this.props.params.classId} />
                    </div>
                }


            </div>
        );
    },

    getHeader: function(){
        var f = false;
        return (
            <div>
                {f == false ? null :
                    <div>
                        <TeacherHeader activeTab={'index'} onLogout={this.updateAuth}  />
                    </div>
                }


            </div>

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

    onUrlChange: function(evt){
        var val = evt.target.value;
        this.setState({
            url: val
        });
    },


    onPlay: function(evt){
        console.log('onPlay occured: ', evt);
    },

    onPause: function(evt){
        console.log('onPause occured: ', evt);
    },

    onBuffer: function(evt){
        console.log('onBuffer occured: ', evt);
    },

    onEnded: function(evt){
        console.log('onEnded occured: ', evt);
    },

    onProgress: function(evt){
        console.log('onProgress occured: ', evt);
    },

    onTextChange: function(evt){
        var text = evt.target.value;
        this.setState({
            text: evt.target.value
        });
    },

    onChange: function(newList){
        console.log('newList = ', newList);
        this.setState({
            checkboxes: newList
        });
    },

    getContent: function(){
        var userId = this.state.user.id;
        var messages = [];
        //var dialogId = 'HvKq4rvEud';
        //var dialogId = 'oL7bWXnet2';
        var dialogId = 'c0zx8Ip83A';
        var questionnaireId = 'lpN66i903P';

        var linkText = '[[material|WUtKUKWSb0|видео-материал]]';
        var linkText2 = '[[note|8i0KhqWv2n|заметка]]';

        return (
            <div style={{padding: 10}} >

                <SelfLoadingCoursesList

                    teacherId={userId}
                    userId={userId}
                    editMode={true}

                    />

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