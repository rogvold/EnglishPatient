/**
 * Created by sabir on 10.10.15.
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

var SelfLoadingClassFeed = require('../../components/feed/SelfLoadingClassFeed');

var TaskPanel = require('../../components/class/tasks/TaskPanel');

var EditClassButton = require('../../components/class/buttons/EditClassButton');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;

var TeacherSidebarButtons = require('../../components/sidebar/TeacherSidebarButtons');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var ClassApp = React.createClass({
    mixins: [Router.Navigation, FluxMixin],

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
            user: undefined,
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

    fireLoadingMaterials: function(){
        var flux = this.getFlux();
        if (flux == undefined){
            console.log('ClassApp: fireLoadingMaterials: flux is undefined ');
            return;
        }
        console.log('ClassApp: fireLoadingMaterials: flux.actions.loadMaterialsAndGroups() occured');
        //flux.actions.loadMaterialsAndGroups();
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



    componentDidMount: function () {
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            return false;
        }else{
            this.setState({
                loggedIn: true
            });
        }
        console.log('ClassApp mounted');
        document.title = 'Класс';
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
        this.fireLoadingMaterials();
        this.setState({
            loading: true,
            patientClass: undefined,
            users: []
        });
        ClassMixin.loadPatientClass(classId, function(result){
            this.setState({
                patientClass: result.patientClass,
                users: result.users,
                loading: false
            });
            if (result.patientClass != undefined){ if (result.patientClass.name != undefined) document.title = result.patientClass.name}
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
        }

    },

    onClassCreated: function(createdClass){
        this.setState({
            lastUpdated: (new Date()).getTime()
        });
        //this.forceUpdate();

        //alert('onClassCreated');
        //
        //this.loadClass(createdClass.id, function(result){
        //    console.log('class loaded');
        //});


    },

    onClassUpdated: function(cl){
        this.setState({
            lastUpdated: (new Date()).getTime()
        });
        this.loadClass(cl.id, function(uCl){

        });
        //alert('onClassUpdated');
    },

    onClassDeleted: function(classId){
        console.log();

        this.setState({
            lastUpdated: (new Date()).getTime()
        });

        //alert('onClassDeleted: ' + classId);

        ClassMixin.loadTeacherClasses(this.state.user.id, function(list){
            var arr = [];
            for (var i in list){
                if (list[i].id == classId){
                    continue;
                }
                arr.push(list[i]);
            }
            if (arr.length == 0){
                //alert('no more classes: redirecting to index');
                CommonMixin.forceTransitionTo('/#/');
                return;
            }else{
                CommonMixin.forceTransitionTo('/#/class/' + arr[0].id);
                return;
            }
        });


    },



    getSidebar: function(){
        return (
            <div>

                <TeacherSidebarButtons />

                <SelfLoadingLeftSidebarClassesList addClassMode={true} teacherId={this.state.user.id}
                                                   selectedClassId={this.props.params.classId}
                                                   onClassCreated={this.onClassCreated}
                                                   lastUpdated={this.state.lastUpdated}
                />
            </div>
        );
    },

    onLogout: function(){
        CommonMixin.forceTransitionTo('/#/');
    },

    getHeader: function(){
        return (
            <TeacherHeader onLogout={this.onLogout}  />
        );
    },

    onTabClick: function(n, name){
        this.setState({
            selectedTabName: name
        });
    },

    onUserDelete: function(userId){
        //alert('on user delete: ' + userId);
        this.setState({
            loading: true
        });
        ClassMixin.deleteUserFromClass(userId, this.props.params.classId, function(){
            this.setState({
                loading: false
            });
            this.loadClass(this.props.params.classId, function(result){
                console.log('class loaded: ', result);
            });
        }.bind(this));
    },

    getCurrentClassTab: function(){
        var page = this.state.selectedTabName;
        var usersTabStyle = assign({}, this.componentStyle.tabStyle, this.componentStyle.usersTab);
        var noUsers = (this.state.users == undefined || this.state.users.length == 0);
        var code = (this.state.patientClass == undefined) ? undefined : this.state.patientClass.code;
        var feedId = (this.state.patientClass == undefined) ? undefined : this.state.patientClass.feedId;


        var classId = this.props.params.classId;

        if (page == 'users'){
            return (
                <ClassTab style={usersTabStyle} >
                    {noUsers == true && this.state.loading == false ?
                        <div style={{width: 400, margin: '0 auto', marginTop: 40, textAlign: 'center'}}>
                            <GifInstruction text={'Ура! Вы создали класс, но в нем пока еще нет учеников.'} url={'https://d3ki9tyy5l5ruj.cloudfront.net/obj/c06fded71d4261a939460e0f0e02d4385c2ffe1d/empty_inbox.svg'}  />
                            <p style={{marginTop: 30}}>
                                Код для добавления учеников:
                                <br/>
                                <b>{code}</b>
                            </p>

                        </div>
                        :
                        <div>
                            {this.state.loading == true ? null :
                                <div style={this.componentStyle.classInfoPlaceholder}>
                                    Количество учеников в классе: <b>{this.state.users.length}</b>.
                                    Чтобы добавить нового ученика в класс, продиктуйте ему код <b>{code}</b>
                                </div>
                            }

                            <div style={this.componentStyle.usersCardsListPlaceholder} >
                                <UsersCardsList users={this.state.users} stasiMode={true} onUserDelete={this.onUserDelete} />
                            </div>
                        </div>
                    }

                </ClassTab>
            );
        }
        if (page == 'tasks'){
            return (
                <ClassTab>
                    <TaskPanel teacherId={this.state.user.id} feedId={feedId}
                               classId={this.props.params.classId} />
                </ClassTab>
            );
        }



        if (page == 'check'){
            return (
                <ClassTab>
                    {noUsers == true && this.state.loading == false ?
                        <div style={this.componentStyle.noUsersBlock}>
                            <IconMessage name={'В этой группе еще нет пользователей'} description={'Код для добавления в группу - ' + code } icon={'warning circle icon'} />
                        </div>
                        :
                        <div>
                            <CheckUsersListDashboard teacherId={this.state.user.id} classId={classId}
                                                     users={this.state.users} />
                        </div>
                    }

                </ClassTab>
            );
        }

    },

    getContent: function(){
        var currentTab = this.getCurrentClassTab();
        var patientClass = this.state.patientClass;
        var noUsers = (this.state.users == undefined || this.state.users.length == 0);
        var code = (this.state.patientClass == undefined) ? undefined : this.state.patientClass.code;
        console.log('code = ', code);
        var classId = (this.props.params == undefined) ? undefined : this.props.params.classId;

        return (
                <LoadingSegment segmentClassName={''} segmentStyle={{height: '100%', backgroundColor: 'transparent'}} loading={this.state.loading} >
                    <div className={'loadingLoaderContent'} style={{position: 'relative'}} >

                        <div style={{position: 'absolute', top: 5, right: 5}} >
                            <EditClassButton classId={classId} onClassDeleted={this.onClassDeleted}
                                             onClassUpdated={this.onClassUpdated}
                                             buttonName={'редактировать класс'}
                                />
                        </div>

                        {patientClass == undefined ? null :
                            <ClassHeader text={patientClass.name} />
                        }
                        <ClassTabsNamePanel onTabClick={this.onTabClick} selectedTabName={this.state.selectedTabName} />
                        {currentTab}
                    </div>
                </LoadingSegment>
        );
    },

    getFooter: function(){

    },

    render: function () {

        //console.log('router = ', Router);

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

module.exports = ClassApp;
