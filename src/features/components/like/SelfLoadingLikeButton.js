/**
 * Created by sabir on 29.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var LikeMixin = require('../../mixins/LikeMixin');

var LikeButton = require('./LikeButton');

var SelfLoadingLikeButton = React.createClass({
    getDefaultProps: function () {
        return {

            objectClassName: undefined,
            userId: undefined,
            objectId: undefined

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            liked: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            display: 'inline-block'
        }
    },

    load: function(){
        var userId = this.props.userId;
        var className = this.props.objectClassName;
        var objectId = this.props.objectId;
        if (userId == undefined || className == undefined || objectId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        LikeMixin.loadUserLike(userId, objectId, className, function(m){
            var liked = (m != undefined);
            this.setState({
                liked: liked,
                loading: false
            });
        }.bind(this));
    },

    likeIt: function(f){
        console.log('likeIt occured: f = ', f);
        if (f == undefined){
            f = true;
        }
        var userId = this.props.userId;
        var className = this.props.objectClassName;
        var objectId = this.props.objectId;
        console.log('userId, className, objectId = ', userId, className, objectId);
        if (userId == undefined || className == undefined || objectId == undefined){
            console.log('userId == undefined || className == undefined || objectId == undefined');
            return;
        }
        this.setState({
            loading: true
        });
        if (f == true){
            LikeMixin.likeObject(userId, objectId, className, function(m){
                this.load();
            }.bind(this));
        }else {
            LikeMixin.unLikeObject(userId, objectId, className, function(m){
                this.load();
            }.bind(this));
        }
    },



    onLikeClick: function(){
        var f = !this.state.liked;
        this.likeIt(f);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <LikeButton liked={this.state.liked} loading={this.state.loading} onLikeClick={this.onLikeClick} />


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingLikeButton;