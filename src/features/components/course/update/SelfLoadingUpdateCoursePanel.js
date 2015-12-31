/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var CourseMixin = require('../../../mixins/CourseMixin');

var UpdateCoursePanel = require('./UpdateCoursePanel');

var CreateCourseButton = require('./CreateCourseButton');

var SelfLoadingUpdateCoursePanel = React.createClass({
    getDefaultProps: function () {
        return {
            courseId: undefined,
            userId: undefined,

            onCourseUpdated: function(course){

            },

            onCourseCreated: function(course){

            },

            onCourseDeleted: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            course: undefined,
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            margin: '0 auto',
            width: 820
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
        CourseMixin.loadCourse(courseId, function(course){
            this.setState({
                loading: false,
                course: course
            });
        }.bind(this))
    },

    onSave: function(data){
        var courseId = this.props.courseId;
        var userId = this.props.userId;
        if (userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        if (courseId == undefined){
            CourseMixin.createCourse(userId, data, function(course){
                this.setState({
                    loading: false,
                    course: course
                });
                this.props.onCourseCreated(course);
            }.bind(this));
        }else {
            CourseMixin.updateCourse(courseId, data, function(course){
                this.setState({
                    loading: false,
                    course: course
                });
                this.props.onCourseUpdated(course);
            }.bind(this));
        }
    },

    onDelete: function(){
        var courseId = this.props.courseId;
        CourseMixin.deleteCourse(courseId, function(){
            this.setState({
                loading: false
            });
            this.props.onCourseDeleted();
        }.bind(this));
    },



    render: function () {
        var c = this.state.course;

        return (
            <div style={this.componentStyle.placeholder}>

                {c != undefined ?
                    <UpdateCoursePanel
                        courseId={this.props.courseId}
                        name={c.name} description={c.description}
                        avatar={c.avatar} duration={c.duration}
                        courseId={this.props.courseId}
                        onSave={this.onSave}
                        onDelete={this.onDelete}
                        /> :
                    <UpdateCoursePanel teacherId={this.props.userId}
                            onSave={this.onSave}
                        />
                }



                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdateCoursePanel;