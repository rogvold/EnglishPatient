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

            classId: undefined,

            dateEnabled: true,

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
        console.log('rendering FeedItemsList: classId = ', this.props.classId);
        var list = this.props.items;
        var userId = this.props.userId;
        if (userId == undefined){
            userId = 'userId_' + Math.floor((10000 * Math.random()));
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>


                    {list.map(function(item, n){
                        var key = 'feedItem_' + n + '_' + item.id + '_userId_' + userId;

                        return (
                            <FeedItem key={key} exerciseId={item.exerciseId}
                                                dialogId={item.dialogId}
                                                questionnaireId={item.questionnaireId}
                                                number={n}
                                      information={item.information}
                                      onFeedItemUpdated={this.onFeedItemUpdated} onFeedItemDeleted={this.onFeedItemDeleted}
                                      teacherMode={this.props.teacherMode} timestamp={item.timestamp}
                                      classId={this.props.classId}
                                      materialIds={item.materialIds} noteId={item.materialId} feedItemId={item.id}
                                      userId={this.props.userId} teacherId={this.props.teacherId}
                                      editMode={this.props.editMode}

                                      dateEnabled={this.props.dateEnabled}

                                />
                        );

                    }, this)}

                </div>


            </div>
        );
    }

});

module.exports = FeedItemsList;