/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ArticlesList = require('./ArticlesList');

var ArticleMixin = require('../../mixins/ArticleMixin');

var SelfLoadingArticlesList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            articles: [],
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {
            width: 900,
            margin: '0 auto',
            marginTop: 10
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
        ArticleMixin.loadTeacherArticles(teacherId, function(articles){
            this.setState({
                loading: false,
                articles: articles
            });
        }.bind(this));
    },

    render: function () {
        var articles = this.state.articles;

        return (
            <div style={this.componentStyle.placeholder}>


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