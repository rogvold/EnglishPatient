/**
 * Created by sabir on 29.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var FeedItem = require('./FeedItem');
var FeedMixin = require('../../mixins/FeedMixin');

var SelfLoadingFeedItem = React.createClass({
    getDefaultProps: function () {
        return {
            //feedItemId: undefined
            feedItemId: 'zPYkSpjPHv',

            teacherId: undefined,
            userId: undefined,
            editMode: false
        }
    },

    getInitialState: function () {
        return {
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.load(nextProps.feedItemId, function(item){
            console.log('feed item loaded: ', item);
        });
    },

    componentDidMount: function () {
        this.load(this.props.feedItemId, function(item){
            console.log('feed item loaded: ', item);
        });
    },

    componentStyle: {
        placeholder: {

        },

        contentPlaceholder: {

        }
    },

    load: function(feedItemId, callback){
        if (feedItemId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        FeedMixin.loadFeedItem(feedItemId, function(item){
            this.setState({
                loading: false,
                information: item.information,
                exerciseId: item.exerciseId,
                noteId: item.noteId,
                questionnaireId: item.questionnaireId,
                dialogId: item.dialogId,
                materialIds: item.materialIds
            });
        }.bind(this));
    },


    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.contentPlaceholder}>
                    <FeedItem information={this.state.information} feedItemId={this.props.feedItemId}
                              exerciseId={this.state.exerciseId} noteId={this.state.noteId}
                              questionnaireId={this.state.questionnaireId} dialogId={this.state.questionnaireId}
                              materialIds={this.state.materialIds} userId={this.props.userId}
                              teacherId={this.props.teacherId} editMode={this.props.editMode} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingFeedItem;