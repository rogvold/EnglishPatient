/**
 * Created by sabir on 08.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var UpdateFeedItemPanel = require('./UpdateFeedItemPanel');

var SocialMixin = require('../../../mixins/SocialMixin');

var SocialFeedItem = require('./SocialFeedItem');

var DeleteButton = require('../../buttons/DeleteButton');

var SelfLoadingUpdatablePost = React.createClass({
    getDefaultProps: function () {
        return {
            postId: undefined,
            teacherId: undefined,

            onCreated: function(post){

            },

            onUpdated: function(post){

            },

            onDeleted: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            vimeoId: undefined,
            imageUrl: undefined,
            text: undefined,

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
            width: 1025
        },

        left: {
            verticalAlign: 'top',
            display: 'inline-block',
            width: '50%'
        },

        right: {
            verticalAlign: 'top',
            display: 'inline-block',
            width: '50%'
        },

        previewPostPlaceholder: {
            border: '1px solid #EFF0F1',
            padding: 5
        },

        deleteButtonPlaceholder: {
            padding: 5,
            borderTop: '1px solid #EFF0F1'
        }
    },

    onChange: function(data){
        if (data == undefined){
            return;
        }
        this.setState({
            text: data.text,
            vimeoId: data.vimeoId,
            imageUrl: data.imageUrl
        });
    },

    load: function(){
        var postId = this.props.postId;
        if (postId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        SocialMixin.loadPost(postId, function(p){
            this.setState({
                loading: false,
                vimeoId: p.vimeoId,
                imageUrl: p.imageUrl,
                text: p.text
            });
        }.bind(this));
    },

    onUpdate: function(data){
        if (data == undefined){
            return;
        }
        var postId = this.props.postId;
        var teacherId = this.props.teacherId;
        if (postId == undefined && teacherId == undefined){
            console.log('!!--> postId == undefined && teacherId == undefined');
            return;
        }
        this.setState({
            loading: true
        });
        if (postId == undefined){
            SocialMixin.createPost(teacherId, data, function(post){
                this.setState({
                    loading: false,
                    vimeoId: post.vimeoId,
                    imageUrl: post.imageUrl,
                    text: post.text
                });
                this.props.onCreated(post);
            }.bind(this));
        }else {
            SocialMixin.updatePost(postId, data, function(post){
                this.setState({
                    loading: false,
                    vimeoId: post.vimeoId,
                    imageUrl: post.imageUrl,
                    text: post.text
                });
                this.props.onUpdated(post);
            }.bind(this));
        }
    },

    onDelete: function(){
        var postId = this.props.postId;
        this.setState({
            loading: true
        });
        SocialMixin.deletePost(postId, function(){
            this.setState({
                loading: false
            });
            this.props.onDeleted();
        }.bind(this))
    },

    render: function () {
        //https://www.englishpatient.org/app/assets/images/write_smth.png
        var text = (this.state.text == undefined) ? '' : this.state.text;
        var vimeoId = (this.state.vimeoId == undefined) ? '' : this.state.vimeoId;
        var imageUrl = (this.state.imageUrl == undefined) ? '' : this.state.imageUrl;
        var allIsEmpty = (imageUrl.trim() == '' && text.trim() == '' && vimeoId.trim() == '');

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>
                    <UpdateFeedItemPanel
                        onUpdate={this.onUpdate}

                        text={this.state.text}
                        vimeoId={this.state.vimeoId}
                        imageUrl={this.state.imageUrl}

                        previewMode={false}
                        onChange={this.onChange} />
                </div>

                <div style={this.componentStyle.right}>
                    <div style={{textAlign: 'center'}} >
                        <b>Превью</b>
                    </div>
                    {allIsEmpty == true ?
                        <div style={{textAlign: 'center', paddingTop: 30}} >
                            <img style={{width: 300, display: 'block', margin: '0 auto', marginTop: 20}}
                                 src="https://www.englishpatient.org/app/assets/images/write_smth.png" />

                            <span style={{color: '#424F64', fontSize: 16, display: 'block', marginTop: 30}} >
                                Write something awesome
                            </span>

                        </div>
                        :
                        <SocialFeedItem text={this.state.text}
                                        vimeoId={this.state.vimeoId}
                                        imageUrl={this.state.imageUrl} />
                    }

                </div>

                {this.props.postId == undefined ? null :
                    <div style={this.componentStyle.deleteButtonPlaceholder}>
                        <DeleteButton onDelete={this.onDelete} />
                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : ' ') }>
                    <div className="ui text loader">Загрузка...</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdatablePost;