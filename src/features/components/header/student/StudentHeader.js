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

var StudentHeader = React.createClass({
    mixins: [History],

    getDefaultProps: function () {
        return {
            userName: 'No User',
            items: [
            //    {
            //    name: 'exercises',
            //    displayName: 'Упражнения',
            //    icon: '',
            //    onClick: function(){
            //        console.log('First Link clicked');
            //        //this.history.pushState(null, '/exercises');
            //    },
            //    url: '/exercises'
            //}, {
            //    displayName: 'Видео',
            //    name: 'materials',
            //    icon: '',
            //    onClick: function(){
            //        console.log('Third Link clicked');
            //        //this.history.pushState(null, '/notes');
            //    },
            //    url: '/materials'
            //}, {
            //    displayName: 'Тексты',
            //    name: 'notes',
            //    icon: '',
            //    onClick: function(){
            //        console.log('Second Link clicked');
            //        //this.history.pushState(null, '/notes');
            //    },
            //    url: '/notes'
            //}

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
        placeholder: {}
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

    render: function () {
        var self = this;
        var dropdownItems = [{
                name: 'Выход',
                icon: 'icon sign out',
                onClick: function(){
                    this.onLogout();
                }.bind(this)
            }];

        var user = (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser();

        var rightBlock = <CurrentUserMenuItem dropdownItems={dropdownItems} userName={user.name} avatar={user.avatar} />;
        var leftBlock = <HeaderLeftLinks onItemClicked={this.onItemClicked} activeTab={this.props.activeTab} items={this.props.items} />;

        return (
            <HeaderTemplate leftBlock={leftBlock} rightBlock={rightBlock} />
        );
    }

});

module.exports = StudentHeader;