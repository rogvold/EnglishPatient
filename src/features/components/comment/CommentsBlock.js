/**
 * Created by sabir on 13.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../preloader/CoolPreloader');

var CreateCommentBlock = require('./CreateCommentBlock');
var CommentsList = require('./CommentsList');

var CommentsBlock = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CommentsStore')],

    getDefaultProps: function(){
        return {
            objectId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('CommentsStore');
        var relId = this.props.objectId;
        var comments = [];
        if (relId != undefined){
            comments = store.getObjectComments(relId);
        }

        return {
            loading: store.loading,
            comments: comments
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var relId = this.props.objectId;
        if (relId == undefined){
            return false;
        }
        var f = this.getFlux().store('CommentsStore').shouldLoadComments(relId);
        if (f == true){
            this.getFlux().actions.loadCommentsForObjects([relId]);
        }
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            minHeight: 70
        },

        listPlaceholder: {

        },

        createPlaceholder: {

        }
    },



    render: function(){
        var comments = this.state.comments;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>
                    <CommentsList comments={comments} objectId={this.props.objectId} />
                </div>

                <div style={this.componentStyle.createPlaceholder}>
                    <CreateCommentBlock objectId={this.props.objectId} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CommentsBlock;