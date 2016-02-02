/**
 * Created by sabir on 08.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var SocialFeedItem = require('./SocialFeedItem');

var SocialMixin = require('../../../mixins/SocialMixin');

var UpdatePostButton = require('./UpdatePostButton');

var SelfLoadingSocialFeedItem = React.createClass({
    getDefaultProps: function () {
        return {
            postId: undefined,
            user: undefined,

            onDeleted: function(postId){

            },

            onUpdated: function(postId, data){

            }
        }
    },

    getInitialState: function () {
        return {
            text: undefined,
            imageUrl: undefined,
            vimeoId: undefined,

            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function(){
        this.load();
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 502,
            minHeight: 80,
            borderRadius: 3
        },

        content: {

        },

        bottomPanel: {
            backgroundColor: 'white',
            borderTop: '1px solid #EFF0F1',
            padding: 5
        }
    },

    load: function(){
        var postId = this.props.postId;
        if (postId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        SocialMixin.loadPost(postId, function(post){
            this.setState({
                loading: false,
                vimeoId: post.vimeoId,
                timestamp: post.timestamp,
                text: post.text,
                imageUrl: post.imageUrl
            });
        }.bind(this));
    },

    onUpdated: function(data){
        this.load();
        this.props.onUpdated(this.props.postId, data);
    },

    onDeleted: function(){
        this.props.onDeleted(this.props.postId);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.content}>
                    <SocialFeedItem
                                    user={this.props.user}
                                    timestamp={this.state.timestamp}
                                    text={this.state.text}
                                    vimeoId={this.state.vimeoId}
                                    imageUrl={this.state.imageUrl} />
                </div>

                <div style={this.componentStyle.bottomPanel}>
                    <UpdatePostButton buttonClassName={'ui mini button basic'}
                                      buttonName={'редактировать'}
                                      postId={this.props.postId}
                                      onDeleted={this.onDeleted}
                                      onUpdated={this.onUpdated} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : ' ') }>
                    <div className="ui text loader">Загрузка...</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingSocialFeedItem;