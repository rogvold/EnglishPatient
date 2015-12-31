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
            teacherId: undefined
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
            margin: '0 auto'
        },

        createCourseButtonPlaceholder: {
            padding: 5,
            textAlign: 'right'
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

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createCourseButtonPlaceholder}>
                    <CreateCourseButton
                        userId={this.props.teacherId}
                        onCourseCreated={this.onCourseCreated} />
                </div>

                <div style={this.componentStyle.listPlaceholder}>
                    <CoursesList courses={this.state.courses} />
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingCoursesList;