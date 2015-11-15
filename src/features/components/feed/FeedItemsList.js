/**
 * Created by sabir on 27.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var FeedItem = require('./FeedItem');

var FeedItemsList = React.createClass({
    getDefaultProps: function () {
        return {
            items: [],
            teacherId: undefined,
            userId: undefined,

            editMode: false,
            teacherMode: true,

            onFeedItemUpdated: function(){

            },

            onFeedItemDeleted: function(itemId){

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
        placeholder: {

        },

        listPlaceholder: {

        }
    },

    onFeedItemUpdated: function(item){
        this.props.onFeedItemUpdated(item);
    },

    onFeedItemDeleted: function(itemId){
        this.props.onFeedItemDeleted(itemId);
    },

    render: function () {
        var list = this.props.items;
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>


                    {list.map(function(item, n){
                        var key = 'feedItem_' + n + '_' + item.id;

                        return (
                            <FeedItem key={key} exerciseId={item.exerciseId} information={item.information}
                                      onFeedItemUpdated={this.onFeedItemUpdated} onFeedItemDeleted={this.onFeedItemDeleted}
                                      teacherMode={this.props.teacherMode} timestamp={item.timestamp}
                                      materialIds={item.materialIds} noteId={item.materialId} feedItemId={item.id}
                                      userId={this.props.userId} teacherId={this.props.teacherId} editMode={this.props.editMode}
                                />
                        );

                    }, this)}

                </div>


            </div>
        );
    }

});

module.exports = FeedItemsList;