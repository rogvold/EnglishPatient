/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var CreateCourseButton = require('../update/CreateCourseButton');

var CourseMixin = require('../../../mixins/CourseMixin');

var CoursesList = require('./CoursesList');

var SelfLoadingCoursesList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            userId: undefined,

            editMode: true
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            width: 820,
            height: '100%',
            overflowY: 'auto',
            margin: '0 auto',
            backgroundColor: 'white',
            paddingBottom: 1
        },

        createCourseButtonPlaceholder: {
            padding: 5,
            textAlign: 'right',
            paddingRight: 0
        },

        listPlaceholder: {

        }
    },

    load: function(){
        var teacherId = this.props.teacherId;
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        CourseMixin.loadTeacherCourses(teacherId, function(courses){
            this.setState({
                loading: false,
                courses: courses
            });
        }.bind(this))
    },

    onCourseCreated: function(course){
        this.load();
    },

    onDeleted: function(){
        this.load();
    },

    onUpdated: function(){
        this.load();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createCourseButtonPlaceholder}>
                    <CreateCourseButton
                        userId={this.props.teacherId}
                        onCourseCreated={this.onCourseCreated} />
                </div>

                <div style={this.componentStyle.listPlaceholder}>
                    <CoursesList
                        userId={this.props.userId}
                        teacherId={this.props.teacherId}
                        editMode={this.props.editMode}
                        courses={this.state.courses}

                        onUpdated={this.onUpdated}
                        onDeleted={this.onDeleted}

                        />
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingCoursesList;