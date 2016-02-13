/**
 * Created by sabir on 10.10.15.
 */
var React = require('react');
var ClassApp = require('./ClassApp');
var IndexApp = require('./IndexApp');
var ExercisesApp = require('./ExercisesApp');
var NotesApp = require('./NotesApp');
var TopicsApp = require('./TopicsApp');
var MaterialsApp = require('./MaterialsApp');
var DevApp = require('./DevApp');
var SimpleDev = require('./SimpleDev');
var NotificationsApp = require('./NotificationsApp');
var ToolsApp = require('./ToolsApp');
var DictionaryApp = require('./DictionaryApp');
var ArticlesApp = require('./ArticlesApp');

var FluxApp = require('./FluxApp');

var ProfileApp = require('./ProfileApp');

var TrashApp = require('./TrashApp');

var SocialApp = require('./SocialApp');

var IdiomsApp = require('./IdiomsApp');
var GrammarApp = require('./GrammarApp');

var CoursesApp = require('./CoursesApp');

var NoMatchApp = require('./NoMatchApp');
var SharedClassApp = require('./shared/SharedClassApp');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var createHashHistory = require('history').createHashHistory;


var LoginApp = require('./LoginApp');

var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var LoginMixin = require('../../mixins/LoginMixin');

var StudentIndexApp = require('./student/StudentIndexApp');
var StudentClassApp = require('./student/StudentClassApp');
var StudentDictionaryApp = require('./student/StudentDictionaryApp');
var StudentIdiomsApp = require('./student/StudentIdiomsApp');

var SoundComponent = require('../../components/sound/SoundComponent');
var MailComponent = require('../../components/mail/MailComponent');
var AlertsComponent = require('../../components/alert/AlertsComponent');
var BootstrapComponent = require('../../components/bootstrap/BootstrapComponent');

//flux
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var MaterialsStore = require('../../flux/stores/MaterialsStore');
var SoundStore = require('../../flux/stores/SoundStore');
var AlertsStore = require('../../flux/stores/AlertsStore');
var UsersStore = require('../../flux/stores/UsersStore');
var ClassesStore = require('../../flux/stores/ClassesStore');
var CommentsStore = require('../../flux/stores/CommentsStore');
var DialogsStore = require('../../flux/stores/DialogsStore');
var MailStore = require('../../flux/stores/MailStore');
var ExercisesStore = require('../../flux/stores/ExercisesStore');
var TopicsStore = require('../../flux/stores/TopicsStore');
var MaterialsActions = require('../../flux/actions/MaterialsActions');
var TopicsActions = require('../../flux/actions/TopicsActions');
var UsersActions = require('../../flux/actions/UsersActions');
var ClassesActions = require('../../flux/actions/ClassesActions');
var MailActions = require('../../flux/actions/MailActions');
var DialogsActions = require('../../flux/actions/DialogsActions');
var CommentsActions = require('../../flux/actions/CommentsActions');
var AlertActions = require('../../flux/actions/AlertActions');
var SoundActions = require('../../flux/actions/SoundActions');
var ExercisesActions = require('../../flux/actions/ExercisesActions');
var stores = {MaterialsStore: new MaterialsStore(), SoundStore: new SoundStore(), TopicsStore: new TopicsStore(), UsersStore: new UsersStore(), ExercisesStore: new ExercisesStore(), DialogsStore: new DialogsStore(), ClassesStore: new ClassesStore(), AlertsStore: new AlertsStore(), MailStore: new MailStore(), CommentsStore: new CommentsStore()};
var actions = assign({}, MaterialsActions, SoundActions, TopicsActions, UsersActions, ExercisesActions, DialogsActions, ClassesActions, AlertActions, MailActions, CommentsActions);
var flux = new Fluxxor.Flux(stores, actions);

var SlaaskHelper = require('../../helpers/support/SlaaskHelper');

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});

var App = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        console.log('MAIN APP: componentDidMount: props = ', this.props);
        SlaaskHelper.init();
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

    componentStyle: {
        placeholder: {}
    },

    createFluxComponent: function(Component, props){
        return (
            <Component {...props} flux={flux} />
        );
    },

    getTeacherRouter: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={IndexApp} >
                    <IndexRoute component={IndexApp} />
                </Route>

                <Route path="/class/:classId" component={ClassApp}/>

                <Route path="/profile/:userId" component={ProfileApp}/>

                <Route path="/exercises" component={ExercisesApp}>
                    <IndexRoute component={ExercisesApp} />
                </Route>
                <Route path="/notes" component={NotesApp}>
                    <IndexRoute component={NotesApp} />
                </Route>
                <Route path="/topics" component={TopicsApp}>
                    <IndexRoute component={TopicsApp} />
                </Route>

                <Route path="/tools" component={ToolsApp}>
                    <IndexRoute component={ToolsApp} />
                </Route>

                <Route path="/notifications" component={NotificationsApp}>
                    <IndexRoute component={NotificationsApp} />
                </Route>
                <Route path="/materials" component={MaterialsApp}>
                    <IndexRoute component={MaterialsApp} />
                </Route>
                <Route path="/dictionary" component={DictionaryApp}>
                    <IndexRoute component={DictionaryApp} />
                </Route>

                <Route path="/courses" component={CoursesApp}>
                    <IndexRoute component={CoursesApp} />
                </Route>

                <Route path="/articles" component={ArticlesApp}>
                    <IndexRoute component={ArticlesApp} />
                </Route>

                <Route path="/grammar" component={GrammarApp}>
                    <IndexRoute component={GrammarApp} />
                </Route>

                <Route path="/idioms" component={IdiomsApp}>
                    <IndexRoute component={IdiomsApp} />
                </Route>

                <Route path="/social" component={SocialApp}>
                    <IndexRoute component={SocialApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

                <Route path="/dev2" component={SimpleDev}>
                    <IndexRoute component={SimpleDev} />
                </Route>

                <Route path="/trash" component={TrashApp}>
                    <IndexRoute component={TrashApp} />
                </Route>

                <Route path="/flux"  component={FluxApp}>
                    <IndexRoute  component={FluxApp} />
                </Route>

                <Route path="*" component={NoMatchApp}/>

            </Router>
        )
    },

    getStudentRouter: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={StudentIndexApp} >
                    <IndexRoute component={StudentIndexApp} />
                </Route>

                <Route useAutoKeys={false} path="/dictionary" component={StudentDictionaryApp} >
                    <IndexRoute component={StudentDictionaryApp} />
                </Route>

                <Route useAutoKeys={false} path="/idioms" component={StudentIdiomsApp} >
                    <IndexRoute component={StudentIdiomsApp} />
                </Route>


                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>
                <Route path="/class/:classId" component={StudentClassApp}/>

            </Router>
        );
    },

    getLoginContent: function(){
        return (
            <LoginApp />
        );
    },

    getNotLoggedInContent: function(){
        return (
        <Router history={createHashHistory({queryKey: false})}>
            <Route useAutoKeys={false} path="/" component={LoginApp} >
                <IndexRoute component={LoginApp} />
            </Route>
            <Route path="/class/:classId" component={SharedClassApp}/>
            <Route path="*" component={LoginApp}/>
        </Router>
        );
    },


    render: function () {

        var currentUser = LoginMixin.getCurrentUser();
        var role = (currentUser == undefined) ? undefined : currentUser.role;
        console.log('RENDERING APP: current user is ', currentUser);
        var content = null;
        var isLoggedIn = LoginMixin.isLoggedIn();
        if (isLoggedIn == false){
            content = this.getNotLoggedInContent();
        }else{
            if (role == 'student'){
                content = this.getStudentRouter();
            }else{
                content = this.getTeacherRouter();
            }
        }

        return (
            <div >
                <SoundComponent flux={flux} />
                <BootstrapComponent />
                <AlertsComponent />
                <MailComponent />

                {content}
            </div>
        );
    }

});

module.exports = App;


React.render((<App flux={flux} />

), document.getElementById('main'));