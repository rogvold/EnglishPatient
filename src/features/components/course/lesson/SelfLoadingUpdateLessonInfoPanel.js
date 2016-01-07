/**
 * Created by sabir on 03.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var CourseMixin = require('../../../mixins/CourseMixin');

var UpdateLessonInfoPanel = require('./UpdateLessonInfoPanel');

var SelfLoadingUpdateLessonInfoPanel = React.createClass({
    getDefaultProps: function () {
        return {
            lessonId: undefined,

            onUpdated: function(lesson){

            },

            onCreated: function(lesson){

            },

            onDeleted: function(){
                console.log('SelfLoadingUpdateLessonInfoPanel: default: onDeleted occured');
            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            lesson: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {}
    },

    onSave: function(data){
        if (data == undefined){
            return;
        }
        var lessonId = this.props.lessonId;
        var courseId = this.props.courseId;
        this.setState({
            loading: true
        });
        if (lessonId == undefined){
            CourseMixin.createLesson(courseId, data, function(lesson){
                this.setState({
                    lesson: undefined,
                    loading: false
                });
                this.props.onCreated(lesson);
            }.bind(this));
        }else {
            CourseMixin.updateLesson(lessonId, data, function(lesson){
                this.setState({
                    lesson: lesson,
                    loading: false
                });
                this.props.onUpdated(lesson);
            }.bind(this));
        }
    },

    onDelete: function(){
        var lessonId = this.props.lessonId;
        if (lessonId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        CourseMixin.deleteLesson(lessonId, function(){
            this.props.onDeleted();
        }.bind(this));
    },

    load: function(){
        var lessonId = this.props.lessonId;
        if (lessonId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        CourseMixin.loadLesson(lessonId, function(lesson){
            console.log('lesson loaded: lesson = ', lesson);
            this.setState({
                loading: false,
                lesson: lesson
            });
        }.bind(this));
    },

    render: function () {
        var l = this.state.lesson;

        return (
            <div style={this.componentStyle.placeholder}>

                {l == undefined ?
                    <div>
                        <UpdateLessonInfoPanel lessonId={this.props.lessonId} onSave={this.onSave} />
                    </div> :
                    <div>
                        <UpdateLessonInfoPanel lessonId={this.props.lessonId}
                                               name={l.name} description={l.description}
                                               avatar={l.avatar}
                                               duration={l.duration}
                                               onDelete={this.onDelete}
                                               onSave={this.onSave} />
                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdateLessonInfoPanel;