/**
 * Created by sabir on 03.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var CourseMixin = require('../../mixins/CourseMixin');

var SimpleTopicHeaderPanel = require('../topics/panels/SimpleTopicHeaderPanel');

var SelfLoadingLessonsCardsList = require('./lesson/SelfLoadingLessonsCardsList');

var UpdateCourseButton = require('./update/UpdateCourseButton');

var SelfLoadingCoursePanel = React.createClass({
    getDefaultProps: function () {
        return {
            courseId: undefined,

            userId: undefined,
            teacherId: undefined,
            editMode: undefined,

            onUpdated: function(course){

            },

            onDeleted: function(){

            }

        }
    },

    getInitialState: function () {
        return {

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

        coursePlaceholder: {

        },

        content: {
            //width: 900,
            width: 760,
            margin: '0 auto',
            marginTop: 15
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
        }.bind(this));
    },

    onUpdated: function(course){
        this.props.onUpdated(course);
    },

    onDeleted: function(){
        this.props.onDeleted();
    },

    render: function () {
        var c = this.state.course;

        return (
            <div style={this.componentStyle.placeholder}>

                {c == undefined ? null :
                    <div style={this.componentStyle.coursePlaceholder}>

                        {this.props.editMode == false ?
                            <SimpleTopicHeaderPanel name={c.name} description={c.description}
                                                    avatar={c.avatar} />
                            :
                            <SimpleTopicHeaderPanel name={c.name}
                                               description={c.description} avatar={c.avatar}
                                                customContent={
                                                    <div style={{textAlign: 'right', marginTop: 15}} >
                                                        <UpdateCourseButton
                                                             buttonClassName={'ui inverted button'}
                                                             courseId={this.props.courseId}
                                                             userId={this.props.userId}
                                                             onUpdated={this.onUpdated}
                                                             onDeleted={this.onDeleted}
                                                     />
                                                    </div>
                                                }
                                />
                        }

                        <div style={this.componentStyle.content}>
                            <SelfLoadingLessonsCardsList
                                userId={this.props.userId}
                                teacherId={this.props.teacherId}
                                editMode={this.props.editMode}

                                courseName={c.name}
                                courseId={this.props.courseId} />
                        </div>

                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingCoursePanel;