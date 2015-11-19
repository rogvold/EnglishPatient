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

var NotificationsNumberSpan = require('../../notification/NotificationsNumberSpan');

var TeacherHeader = React.createClass({
    mixins: [History],

    getDefaultProps: function () {
        return {
            userName: 'No User',
            items: [{
                name: 'exercises',
                displayName: 'Упражнения',
                icon: '',
                onClick: function(){
                },
                url: '/exercises'
            },{
                displayName: 'Видео',
                name: 'materials',
                icon: '',
                onClick: function(){
                },
                url: '/materials'
            }, {
                displayName: 'Тексты',
                name: 'notes',
                icon: '',
                onClick: function(){

                },
                url: '/notes'
            }, {
                displayName: 'Топики',
                name: 'topics',
                icon: '',
                onClick: function(){
                },
                url: '/topics'
            }],
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

        notificationsItemPlaceholder: {
            height: '100%',
            boxSizing: 'borderBox',
            display: 'inline-block',
            marginRight: 25,
            color: '#A1A4AA',
            paddingTop: 10,
            cursor: 'pointer',
            verticalAlign: 'top'
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

    onNotificationsClick: function(){
        this.history.pushState(null, '/notifications');
    },


    getRightBlock: function(){
        var dropdownItems = [
            {
                name: 'Выход',
                icon: 'icon sign out',
                onClick: function(){
                    this.onLogout();
                }.bind(this)
            }];
        var user = (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser();
        var st = assign({}, this.componentStyle.notificationsItemPlaceholder);
        if (this.props.activeTab == 'notifications'){
            st = assign(st, this.componentStyle.active);
        }

        return (

            <div style={{display: 'inline-block'}} >
                <div style={st} onClick={this.onNotificationsClick} >
                    Уведомления
                    {this.props.activeTab == 'notifications' ? null :
                    <span>
                        <NotificationsNumberSpan spanStyle={{padding: '3px 5px', color: 'white',
                                                             backgroundColor: '#FC636B', marginLeft: 3}}
                            spanClassName={' ui label'}
                            userId={user.id} />
                    </span>
                    }
                </div>

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