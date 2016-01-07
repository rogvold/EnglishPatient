/**
 * Created by sabir on 12.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var HeaderTemplate = require('../../templates/HeaderTemplate');
var HeaderLeftLinks = require('../../templates/HeaderLeftLinks');
var CurrentUserMenuItem = require('../../templates/CurrentUserMenuItem');

var LoginMixin = require('../../../mixins/LoginMixin');
var History = require('react-router').History;

var UserProfileButton = require('../../profile/UserProfileButton');

var TeacherHeader = React.createClass({
    mixins: [History],

    getDefaultProps: function () {
        return {
            userName: 'No User',
            userId: undefined,
            items: [
                {
                    displayName: 'Курсы',
                    name: 'courses',
                    icon: '',
                    onClick: function(){
                    },
                    url: '/courses'
                },

                {
                    displayName: 'Модули',
                    name: 'articles',
                    icon: '',
                    onClick: function(){
                    },
                    url: '/articles'
                },

                {
                displayName: 'Топики',
                name: 'topics',
                icon: '',
                onClick: function(){
                },
                url: '/topics'
            },

                {
                    displayName: 'Тексты',
                    name: 'notes',
                    icon: '',
                    onClick: function(){

                    },
                    url: '/notes'
                },


                {
                    name: 'exercises',
                    displayName: 'Упражнения',
                    icon: '',
                    onClick: function(){
                    },
                    url: '/exercises'
                },

                {
                    displayName: 'Грамматика',
                    name: 'grammar',
                    icon: '',
                    onClick: function(){
                    },
                    url: '/grammar'
                },
                {
                    displayName: 'Словарь',
                    name: 'dictionary',
                    icon: '',
                    onClick: function(){
                    },
                    url: '/dictionary'
                },
                {
                    displayName: 'Идиомы',
                    name: 'idioms',
                    icon: '',
                    onClick: function(){
                    },
                    url: '/idioms'
                },

                {
                    displayName: 'Видеотека',
                    name: 'materials',
                    icon: '',
                    onClick: function(){
                    },
                    url: '/materials'
                }


            ],
            activeTab: undefined,
            onLogout: function(){
                alert('logout occured');
            },
            onSettings: function(){
                alert('settings occured');
            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        active: {
            borderBottom: '3px solid #FC636B',
            color: '#1B2432',
            paddingBottom: 7
        }
    },


    onSettings: function(){
        this.props.onSettings();
    },

    onLogout: function(){
        var self = this;
        LoginMixin.logOut(function(){
            self.props.onLogout();
        });
    },

    onItemClicked: function(n){
        var url = this.props.items[n].url;
        if (url == undefined){
            this.props.items[n].onClick();
        }else{
            console.log('redirecting to ' + url);
            this.history.pushState(null, url);
        }
    },




    getRightBlock: function(){
        var dropdownItems = [
            {
                name: '',
                icon: 'icon user',
                onClick: function(){

                }.bind(this),
                content: <UserProfileButton userId={this.props.userId} />
            },
            {
                name: 'Выход',
                icon: 'icon sign out',
                onClick: function(){
                    this.onLogout();
                }.bind(this)
            }];
        var user = (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser();

        return (

            <div style={{display: 'inline-block'}} >

                <CurrentUserMenuItem dropdownItems={dropdownItems}
                                     userName={user.name} avatar={user.avatar} />
            </div>
        );
    },

    render: function () {
        var self = this;
        var rightBlock = this.getRightBlock();
        var leftBlock = <HeaderLeftLinks onItemClicked={this.onItemClicked}
                                         activeTab={this.props.activeTab} items={this.props.items} />;

        return (
            <HeaderTemplate leftBlock={leftBlock} rightBlock={rightBlock} />
        );
    }

});

module.exports = TeacherHeader;