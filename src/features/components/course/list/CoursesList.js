/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var CourseItem = require('./CourseItem');

var TopicDialog = require('../../topics/dialog/TopicDialog');

var SelfLoadingCoursePanel = require('../SelfLoadingCoursePanel');


var CoursesList = React.createClass({
    getDefaultProps: function () {
        return {
            courses: [],

            userId: undefined,
            teacherId: undefined,
            editMode: true,

            onDeleted: function(){

            },

            onUpdated: function(course){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            selectedCourse: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        item: {
            marginBottom: 5
        }
    },

    onItemClick: function(course){
        this.setState({
            selectedCourse: course,
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onUpdated: function(course){
        this.props.onUpdated(course);
        this.onClose();
    },

    onDeleted: function(){
        this.props.onDeleted();
        this.onClose();
    },

    getDialogContent: function(){
        var course = this.state.selectedCourse;
        if (course == undefined){
            return null;
        }
        return (
            <div >
                <SelfLoadingCoursePanel
                                        userId={this.props.userId}
                                        teacherId={this.props.teacherId}
                                        editMode={this.props.editMode}
                                        courseId={course.id}

                                        onUpdated={this.onUpdated}
                                        onDeleted={this.onDeleted}
                    />
            </div>
        );
    },

    render: function () {
        var list = this.props.courses;
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(c, k){
                    var key = 'course_' + k;
                    var onClick = this.onItemClick.bind(this, c);
                    return (
                        <div key={key} style={this.componentStyle.item}>
                            <CourseItem name={c.name} description={c.description} avatar={c.avatar}
                                        onClick={onClick} />
                        </div>
                    );

                }, this)}

                {this.state.dialogVisible == false ? null :
                    <TopicDialog content={this.getDialogContent()}
                                 visible={true}
                                 dialogLevel={100}
                        onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = CoursesList;