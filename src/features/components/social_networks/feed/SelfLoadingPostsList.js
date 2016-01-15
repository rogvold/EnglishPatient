/**
 * Created by sabir on 09.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var PostsList = require('./PostsList');

var SocialMixin = require('../../../mixins/SocialMixin');

var CreatePostButton = require('./CreatePostButton');

var SelfLoadingPostsList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            posts: [],
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
            width: 520,
            margin: '0 auto'
        },

        listPlaceholder: {

        },

        createButtonPlaceholder: {
            padding: 5,
            textAlign: 'right',
            borderBottom: '1px solid #EFF0F1',
            marginBottom: 10
        }
    },

    onCreated: function(post){
        this.load();
    },

    load: function(){
        var teacherId = this.props.teacherId;
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        SocialMixin.loadTeacherPosts(teacherId, function(posts){
            this.setState({
                loading: false,
                posts: posts
            });
        }.bind(this))
    },

    onDeleted: function(p){
        var list = this.state.posts;
        var arr = [];
        for (var i in list){
            if (list[i].id == p.id){
                continue;
            }
            arr.push(list[i]);
        }
        this.setState({
            posts: arr
        });
    },

    render: function () {
        var posts = this.state.posts;
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createButtonPlaceholder}>
                    <CreatePostButton onCreated={this.onCreated} teacherId={this.props.teacherId} />
                </div>

                <div style={this.componentStyle.listPlaceholder}>
                    <PostsList
                        onDeleted={this.onDeleted}
                        posts={posts} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : ' ') }>
                    <div className="ui text loader">Загрузка...</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingPostsList;