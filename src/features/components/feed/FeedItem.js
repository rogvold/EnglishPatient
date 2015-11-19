/**
 * Created by sabir on 27.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var moment = require('moment');

var SelfLoadingVideosList = require('./video/SelfLoadingVideosList');

var SelfLoadingNote = require('../note/SelfLoadingNote');

var SelfLoadingCurrentUserExercise = require('../exercise/SelfLoadingCurrentUserExercise');
var SelfLoadingUserExercise = require('../exercise/SelfLoadingUserExercise');

var EditFeedItemButton = require('./button/EditFeedItemButton');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var NotificationMixin = require('../../mixins/NotificationMixin');

var FeedItem = React.createClass({
    getDefaultProps: function () {
        return {
            //materialIds: ['fCyF4AUc6v', 'yWcZNFqjrO', 'FDUQSus7Vf', 'FQ1V9cmg1I',
            //    'Y4R8pzoCk7', 'X5UXl8nqDn', 'DZZruWgdhz', 'Alr0SGruCx', 'fCyF4AUc6v', '5MTYTwVQ4g', 'NHzNN5cCcj', 'Y6LIzCjg0y'],
            materialIds: [],
            noteId: undefined,

            //noteId: '5gcVkoThTm',
            timestamp: undefined,
            exerciseId: undefined,
            //exerciseId: 's5Y1PZTBGe',
            //exerciseId: 's5Y1PZTBGe',
            //information: '<div><span style="font-family: sans-serif;">Все приведенные ниже цитаты имеют отношение к образованию в целом и к изучению языка, в частности.&nbsp;</span></div><div><br></div><div><span style="font-family: sans-serif; background-color: inherit;">“</span><b><span style="font-family: sans-serif;">It is a miracle that curiosity survives formal education.”</span></b></div><div><span style="color: rgb(136, 136, 136);"><span style="font-family: sans-serif;">A.Einstein</span></span></div><div><br></div><div><b><span style="font-family: sans-serif;">“The whole art of teaching is only the art of awakening the natural curiosity of the young mind for the purpose of satisfying it afterwards.”</span></b></div><div><span style="color: rgb(136, 136, 136);"><span style="font-family: sans-serif;">Anatole France</span></span></div><div><br></div><div><b><span style="font-family: sans-serif;">“Curiosity is as much the parent of attention, as attention is of memory.”</span></b></div><div><span style="color: rgb(136, 136, 136);"><span style="font-family: sans-serif;">Richard Whately </span></span></div><div><br></div><div><b><span style="font-family: sans-serif;">“The cure for boredom is curiosity. There is no cure for curiosity.”&nbsp;</span></b></div><div><span style="color: rgb(136, 136, 136);"><span style="font-family: sans-serif;">Ellen Parr </span></span></div><div><br></div><div><span style="font-family: sans-serif;">Первая цитата противоречат высказыванию Э.Парра, прямо указывая на наличие инструмента для умерщвления любопытства. Скорее всего, вы уже испытали его на себе, если учили английский в школе или вузе.</span></div>'
            information: undefined,


            userId: undefined,
            teacherId: undefined,
            feedItemId: undefined,

            classId: undefined,

            teacherMode: false,
            editMode: false,

            onFeedItemUpdated: function(item){

            },

            onFeedItemDeleted: function(itemId){

            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {
        //var eq = CommonMixin.arraysAreEqual(this.props.materialIds, nextProps.materialIds);
        var d = ((this.props.noteId == nextProps.noteId) &&
                    (this.props.exerciseId == nextProps.exerciseId) &&
                    (this.props.information == nextProps.information) &&
                    (this.props.userId == nextProps.userId) &&
                    (this.props.teacherId == nextProps.teacherId) &&
                    (this.props.timestamp == nextProps.timestamp) &&
                    (this.props.feedItemId == nextProps.feedItemId) &&
                    (this.props.editMode == nextProps.editMode)
        );

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            padding: 10,
            //width: 630,
            width: 652,
            position: 'relative',
            margin: '0 auto',
            marginBottom: 10
        },

        videosPlaceholder: {
            //borderTop: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            paddingTop: 10,
            paddingBottom: 5,
            position: 'relative'
        },

        exercisePlaceholder: {
            paddingTop: 10
        },

        infoPlaceholder: {
            borderBottom: '1px solid #EFF0F1'
        },

        notePlaceholder: {
            paddingTop: 10,
            paddingBottom: 10,
            //borderTop: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            position: 'relative'
        },

        dateBlock: {
            display: 'block',
            paddingBottom: 5,
            fontSize: '18px',
            lineHeight: '24px',
            color: 'grey',
            //fontWeight: 'bold',
            borderBottom: '1px solid #EFF0F1'
        },

        editBlock: {
            position: 'absolute',
            top: 7,
            right: 8
        }

    },

    onFeedItemUpdated: function(item){
        this.props.onFeedItemUpdated(item);
    },

    onFeedItemDeleted: function(itemId){
        this.props.onFeedItemDeleted(itemId);
    },

    onExerciseFinished: function(exerciseId, userId){
        var classId = this.props.classId;
        console.log('onExerciseFinished occured: classId, exerciseId, userId = ', classId, exerciseId, userId);
        if (classId == undefined || userId == undefined || exerciseId == undefined){
            return;
        }

        NotificationMixin.createStudentFinishedExerciseNotification(userId, exerciseId, classId, function(no){
            console.log('Notification sent: ', no);
        });
    },

    render: function () {
        var teacherMode = (this.props.teacherMode == true) && (this.props.teacherId != undefined);
        var dateString = moment(this.props.timestamp).format('DD.MM.YYYY');

        console.log('FeedItem: timestamp = ', this.props.timestamp);
        console.log('FeedItem: dateString = ', dateString);

        var editMode = this.props.editMode;


        console.log('rendering FeedItem: editMode = ', editMode);

        var information = (this.props.information == undefined ) ? '' : this.props.information;


        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.dateBlock}>
                    <b>{dateString}</b>
                </div>

                {editMode == false ? null :
                    <div style={this.componentStyle.editBlock}>
                        <EditFeedItemButton onFeedItemUpdated={this.onFeedItemUpdated} onFeedItemDeleted={this.onFeedItemDeleted}
                                            feedItemId={this.props.feedItemId} teacherId={this.props.teacherId} />
                    </div>
                }


                {information == '' ? null :
                    <div style={this.componentStyle.infoPlaceholder}
                         dangerouslySetInnerHTML={{__html: this.props.information}}
                        >
                    </div>
                }

                {this.props.noteId == undefined ? null :
                    <div style={this.componentStyle.notePlaceholder}>
                        <SelfLoadingNote noteId={this.props.noteId} />
                    </div>
                }

                {this.props.materialIds == undefined || this.props.materialIds.length == 0 ? null :
                    <div style={this.componentStyle.videosPlaceholder}>
                        <SelfLoadingVideosList  materialIds={this.props.materialIds}  />
                    </div>
                }

                {this.props.exerciseId == undefined ? null :
                    <div style={this.componentStyle.exercisePlaceholder} >
                        <SelfLoadingUserExercise
                            onExerciseFinished={this.onExerciseFinished}
                            userId={this.props.userId} teacherMode={teacherMode}
                            teacherId={this.props.teacherId} exerciseId={this.props.exerciseId} />
                    </div>
                }


            </div>
        );
    }

});

module.exports = FeedItem;