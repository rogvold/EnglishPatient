/**
 * Created by sabir on 03.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var CourseMixin = require('../../../mixins/CourseMixin');

var LessonsCardsList = require('./LessonsCardsList');

var CreateLessonButton = require('./CreateLessonButton');

var SelfLoadingLessonsCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            courseId: undefined,

            userId: undefined,
            teacherId: undefined,
            editMode: true,

            courseName: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            lessons: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        createCourseButtonPlaceholder: {
            padding: 5,
            textAlign: 'right'
        }

    },

    load: function(){
        var courseId = this.props.courseId;
        if (courseId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        CourseMixin.loadCourseLessons(courseId, function(lessons){
            this.setState({
                loading: false,
                lessons: lessons
            });
        }.bind(this));
    },

    onCreated: function(){
        this.load();
    },

    onDeleted: function(){
        console.log('SelfLoadingLessonsCardsList: onDeleted');
        this.load();
    },

    onUpdated: function(){
        console.log('SelfLoadingLessonsCardsList: onUpdated');
        this.load();
    },

    render: function () {
        var lessons = this.state.lessons;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createCourseButtonPlaceholder}>
                    <CreateLessonButton
                        onCreated={this.onCreated}
                        courseId={this.props.courseId} />
                </div>

                <div style={this.componentStyle.listPlaceholder}>
                    <LessonsCardsList
                        userId={this.props.userId}
                        teacherId={this.props.teacherId}
                        editMode={this.props.editMode}

                        courseName={this.props.courseName}
                        onDeleted={this.onDeleted}
                        onUpdated={this.onUpdated}
                        lessons={lessons} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingLessonsCardsList;