/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var LessonCard = require('./LessonCard');

var TopicDialog = require('../../topics/dialog/TopicDialog');

var SelfLoadingLessonPanel = require('./SelfLoadingLessonPanel');

var LessonsCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            lessons: [],
            courseName: undefined,

            userId: undefined,
            teacherId: undefined,
            editMode: true,

            onDeleted: function(){

            },

            onUpdated: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            selectedLesson: undefined,
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        lessonItem: {
            display: 'inline-block',
            margin: 5
        },

        listPlaceholder: {

        },

        dialogPanelStyle: {
            width: 840
        }
    },

    onItemClick: function(item){
        this.setState({
            selectedLesson: item,
            dialogVisible: true
        });
    },

    getDialogContent: function(){
        var lesson = this.state.selectedLesson;
        if (lesson == undefined){
            return null;
        }
        return (
            <div>
                <SelfLoadingLessonPanel
                    onDeleted={this.onDeleted}
                    onUpdated={this.onUpdated}
                    courseName={this.props.courseName}
                    lessonId={lesson.id}

                    editMode={this.props.editMode}
                    userId={this.props.userId}
                    teacherId={this.props.teacherId}

                    />
            </div>
        );
    },

    onClose: function(){
        this.setState({
            dialogVisible: false,
            selectedLesson: undefined
        });
    },

    onDeleted: function(){
        console.log('LessonsCardsList: onDeleted occured ');
        this.onClose();
        this.props.onDeleted();
    },

    onUpdated: function(){
        console.log('LessonsCardsList: onUpdated occured ');
        this.onClose();
        this.props.onUpdated();
    },


    render: function () {
        var list = this.props.lessons;
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(lesson, k){
                        var key = 'lesson_' + k;
                        var onClick = this.onItemClick.bind(this, lesson);

                        return (
                            <div key={key} style={this.componentStyle.lessonItem} onClick={onClick} >
                                <LessonCard duration={lesson.duration}
                                            avatar={lesson.avatar}
                                    name={lesson.name} description={lesson.description}
                                    />
                            </div>
                        );

                    }, this)}

                </div>

                {this.state.dialogVisible == false ? null :
                    <TopicDialog onClose={this.onClose}
                        visible={true}
                                 dialogLevel={101}
                        content={this.getDialogContent()}
                        />
                }

            </div>
        );
    }

});

module.exports = LessonsCardsList;