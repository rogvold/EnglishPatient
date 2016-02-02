/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ArticlesList = require('./ArticlesList');

var ArticleMixin = require('../../mixins/ArticleMixin');

var LoginMixin = require('../../mixins/LoginMixin');
var UserMixin = require('../../mixins/UserMixin');

var UserContentPanelHeader = require('../social_networks/headers/UserContentPanelHeader');



var SelfLoadingArticlesList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            articles: [],
            loading: false,
            user: {}
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 2
        },

        listPlaceholder: {
            width: 840,
            margin: '0 auto'
        },

        headerPlaceholder: {
            paddingLeft: 5,
            paddingTop: 5,
            borderBottom: '1px solid #EFF0F1'
        }
    },

    load: function(){
        var teacherId = this.props.teacherId;
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        ArticleMixin.loadTeacherArticles(teacherId, function(articles){
            UserMixin.loadUser(teacherId, function(user){
                self.setState({
                    loading: false,
                    articles: articles,
                    user: user
                });
            });
        }.bind(this));
    },

    render: function () {
        var articles = this.state.articles;
        var currentUser = LoginMixin.getCurrentUser();
        var currentUserId = (currentUser == undefined) ? undefined : currentUser.id;
        var isMe = (currentUserId == this.props.teacherId);
        var user = this.state.user;
        var name = (isMe == true) ? 'Мои модули' : user.name;
        var articles = this.state.articles;
        var description = 'Количество модулей: ' + articles.length;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.headerPlaceholder}>
                    <UserContentPanelHeader
                        userId={this.props.teacherId}
                        name={name} avatar={user.avatar} description={description} />
                </div>

                <div style={this.componentStyle.listPlaceholder}>
                    <ArticlesList articles={articles} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingArticlesList;