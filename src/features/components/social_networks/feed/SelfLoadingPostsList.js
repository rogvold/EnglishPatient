/**
 * Created by sabir on 09.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var PostsList = require('./PostsList');

var SocialMixin = require('../../../mixins/SocialMixin');

var CreatePostButton = require('./CreatePostButton');

var LoginMixin = require('../../../mixins/LoginMixin');

var UserMixin = require('../../../mixins/UserMixin');

var SelfLoadingPostsList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            posts: [],
            loading: false,
            user: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            width: 500,
            //width: 520,
            margin: '0 auto'
        },

        listPlaceholder: {

        },

        createButtonPlaceholder: {
            padding: 7,
            //paddingBottom: 5,
            backgroundColor: 'white',
            //textAlign: 'right',
            border: '1px solid #EFF0F1',
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
        var self = this;
        SocialMixin.loadTeacherPosts(teacherId, function(posts){
            UserMixin.loadUser(teacherId, function(us){
                var arr = [];
                for (var i in posts){
                    arr.push(assign({}, posts[i], {user: us}));
                }
                self.setState({
                    loading: false,
                    posts: arr
                });
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
        var currentUser = LoginMixin.getCurrentUser();
        var currentUserId = (currentUser == undefined) ? undefined : currentUser.id;
        var canAddPost = (currentUserId == this.props.teacherId);

        return (
            <div style={this.componentStyle.placeholder}>

                {canAddPost == false ? null :
                    <div style={this.componentStyle.createButtonPlaceholder}>
                        <CreatePostButton
                            buttonClassName={'ui basic mini button'}
                            onCreated={this.onCreated} teacherId={this.props.teacherId} />
                    </div>
                }

                {posts.length == 0 ?
                    <div style={{textAlign: 'center', padding: 10, opacity: 0.8}} >
                        В этой ленте еще нет ни одной записи
                    </div> : null
                }

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