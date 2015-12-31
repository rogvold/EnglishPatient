
var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../../mixins/LoginMixin');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var ClassMixin = require('../../../mixins/ClassMixin');

var LeftSidebarTemplate = require('../../../components/templates/LeftSidebarTemplate');
var StudentSelfLoadingLeftSidebarClassesList = require('../../../components/class/list/StudentSelfLoadingLeftSidebarClassesList');


var LoadingSegment = require('../../../components/segment/LoadingSegment');


//var TeacherHeader = require('../../../components/header/teacher/TeacherHeader');
var StudentHeader = require('../../../components/header/student/StudentHeader');

var AddClassButton = require('../../../components/class/buttons/student/AddClassButton');

var SidebarChatButton = require('../../../components/sidebar/SidebarChatButton');


var StudentIndexApp = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I'
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            users: [],
            classes:[],
            selectedTabName: 'users',
            loggedIn: false,
            user: undefined,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.loadClasses(function(classes){

        });
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
        document.title = 'Главная';
        console.log('Exercises App mounted');
        console.log(this.props.params);
        this.loadClasses(function(classes){
            console.log('classes: ', classes);
        });

    },

    componentStyle: {
        placeholder: {}
    },

    onLogout: function(){
        //window.location.reload();
        CommonMixin.forceTransitionTo('/#/');
    },

    loadClasses: function(callback){
        var userId = this.state.user.id;
        this.setState({
            classes: [],
            loading: true
        });
        ClassMixin.loadUserClasses(userId, function(classes){
            this.setState({
                loading: false,
                classes: classes
            });
            if (callback != undefined){
                callback(classes);
            }
        }.bind(this));
    },

    getSidebar: function(){
        var classId = (this.props.params == undefined) ? undefined : this.props.params.classId;
        return (
            <div>

                <SidebarChatButton />

                <StudentSelfLoadingLeftSidebarClassesList  userId={this.state.user.id}
                                                           addClassMode={true}
                                                           selectedClassId={classId} />

            </div>
        );
    },

    getHeader: function(){
        var userId = this.state.user.id;
        return (
            <StudentHeader userId={userId} activeTab={'index'} onLogout={this.onLogout}  />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    getContent: function(){
        var userId = this.state.user.id;
        var classes = (this.state.classes == undefined) ? [] : this.state.classes;
        return (
            <div style={{padding: 10, textAlign: 'center'}}>

                {classes.length == 0 ?
                    <div>
                        <h4>
                            Добро пожаловать в систему "Английский Пациент"!
                        </h4>

                        <p>
                            Для начала работы добавьтесь в класс к своему преподавателю.
                        </p>

                        <AddClassButton userId={userId} />
                    </div>
                    :
                    <div style={{fontSize: '18px'}} >

                        <p>
                            Здравствуйте!
                        </p>
                        <p>
                            Выберите класс из списка слева.
                        </p>

                        <p>
                            Или добавьтесь в новый класс.
                        </p>

                        <AddClassButton userId={userId} />

                    </div>
                }




                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>

        );
    },

    getFooter: function(){
        return null;
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                    <LeftSidebarTemplate sidebar={this.getSidebar()}
                                         header={this.getHeader()} footer={this.getFooter()}
                                         content={this.getContent()} />
            </div>
        );
    }

});

module.exports = StudentIndexApp;