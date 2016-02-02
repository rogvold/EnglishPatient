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

var MaterialsMixin = require('../../mixins/MaterialsMixin');

var UserMixin = require('../../mixins/UserMixin');

var MigratePanel = require('../../components/articles/migrate/MigratePanel');

var SelfLoadingExercisesRegistryPanel = require('../../components/exercise/SelfLoadingExercisesRegistryPanel');

var UpdateFeedItemPanel = require('../../components/social_networks/feed/UpdateFeedItemPanel');

var YoutubeSearchPanel = require('../../components/search/youtube/YoutubeSearchPanel');

var SelfLoadingPostsList = require('../../components/social_networks/feed/SelfLoadingPostsList');

var PricingPanel = require('../../components/pricing/PricingPanel');

var SausageCard = require('../../components/sausage/new/SausageCard');

//var Tooltip = require('react-si');

var YouHaveNoClassesPanel = require('../../components/interface_manuals/classes/YouHaveNoClassesPanel');

var ButtonCard = require('../../components/interface_manuals/index/ButtonCard');

var IndexPanel = require('../../components/interface_manuals/index/IndexPanel');

var MediumEditor = require('../../components/editor/MediumEditor');

var UserProfilePanel = require('../../components/social_networks/profile/UserProfilePanel');

var Parse = require('parse').Parse;

var UpdatingPanel = require('../../components/panel/UpdatingPanel');

var SelfLoadingMiracleKaraokePanel = require('../../components/karaoke/miracle/SelfLoadingMiracleKaraokePanel');

var RecTextPanel = require('../../components/rectext/RecTextPanel');

var RecoverPasswordButton = require('../../components/user/RecoverPasswordButton');

var TestComponent = require('../../components/test/TestComponent');

var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);

var SoundComponent = require('../../components/sound/SoundComponent');

var UserCommunityHeaderPanel = require('../../components/user_interface/UserCommunityHeaderPanel');

var ExerciseSearchRegistryPanel = require('../../components/exercise/ExerciseSearchRegistryPanel');

var MailAPI = require('../../api/MailAPI');

var PatientEditor = require('../../components/editor/PatientEditor');

var ExerciseGlobalSearchPanel = require('../../components/exercise/search/ExerciseGlobalSearchPanel');

var CommunityDialogsList = require('../../components/dialog_exercise/list/CommunityDialogsList');

var SellLoadingDialogsTotalSearchList = require('../../components/dialog_exercise/list/SellLoadingDialogsTotalSearchList');

var DevApp = React.createClass({
    mixins: [FluxMixin],

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

    migrateArticles: function(){

    },

    onTextChange: function(evt){
        var val = evt.target.value;


    },

    sendMail: function(){
        var html = 'this is <b>test</b> message';
        MailAPI.sendEmail('sha-sabir@yandex.ru', undefined, 'test', html,  function(m){
            console.log(m);
        }, function(err){

        })
    },

    onContentChange: function(content){
        console.log('content = ', content);
    },

    getContent: function(){
        var userId = this.state.user.id;
        var messages = [];
        //var dialogId = 'HvKq4rvEud';
        //var dialogId = 'oL7bWXnet2';
        var dialogId = 'c0zx8Ip83A';
        var questionnaireId = 'lpN66i903P';

        var karaokeMaterialId = 'VC40ApYkk9';

        var linkText = '[[material|WUtKUKWSb0|видео-материал]]';
        var linkText2 = '[[note|8i0KhqWv2n|заметка]]';

        var articleId = 'ljVkawu3Zx';



        return (
            <div>

                <button onClick={this.sendMail} >
                    send
                </button>

                <SellLoadingDialogsTotalSearchList />

            </div>

        );
    },

    getFooter: function(){

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} >
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