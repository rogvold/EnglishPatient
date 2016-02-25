/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var CourseMixin = require('../../../mixins/CourseMixin');

var TopicHeaderPanel = require('../../topics/panels/TopicHeaderPanel');
var SimpleTopicHeaderPanel = require('../../topics/panels/SimpleTopicHeaderPanel');

var UpdateLessonButton = require('./UpdateLessonButton');

var SelfLoadingUpdatableFeed = require('../../feed/SelfLoadingUpdatableFeed');

var SelfLoadingLessonPanel = React.createClass({
    getDefaultProps: function () {
        return {
            lessonId: undefined,

            editMode: true,
            courseName: undefined,

            userId: undefined,
            teacherId: undefined,

            onUpdated: function(lesson){

            },

            onDeleted: function(){

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
        placeholder: {

        },

        content: {

        },

        feedPlaceholder: {
            width: 630,
            margin: '0 auto'
        }
    },

    load: function(){
        var lessonId = this.props.lessonId;
        if (lessonId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        CourseMixin.loadLesson(lessonId, function(l){
            console.log('lesson loaded: ', l);
            this.setState({
                loading: false,
                lesson: l
            });
        }.bind(this));
    },

    onLessonUpdated: function(){
        this.props.onUpdated();
    },

    onDeleted: function(){
        this.props.onDeleted();
    },

    render: function () {
        var l = this.state.lesson;
        var courseName = (this.props.courseName == undefined) ? '' : ( this.props.courseName + ' - ');
        var lessonPanelName = (l == undefined) ? undefined : (courseName + l.name);

        console.log('SelfLoadingLessonPanel: this.props.  userId,  teacherId, editMode = ',
            this.props.userId, this.props.teacherId, this.props.editMode);

        var editMode = true;

        var updateButtonComponent = (this.props.editMode == false) ? null :
            (   <div>
                    {l == undefined ? null :
                    <div style={{textAlign: 'right'}}>
                        <UpdateLessonButton
                            onUpdated={this.onLessonUpdated}
                            onDeleted={this.onDeleted}
                            buttonClassName={'ui button inverted'}
                            lessonId={l.id} />
                    </div>
                    }
                </div>
            );

        return (
            <div style={this.componentStyle.placeholder}>

                {l == undefined ? null :
                    <div>
                        <SimpleTopicHeaderPanel
                                          editMode={false} avatar={l.avatar}
                                          name={lessonPanelName} description={l.description}
                                          customContent={
                                                updateButtonComponent
                                          }
                            />


                        <div style={this.componentStyle.content}>

                            <div style={this.componentStyle.feedPlaceholder}>
                                {editMode == false ? null :
                                    <SelfLoadingUpdatableFeed
                                                                dateEnabled={false}
                                                                teacherMode={false}
                                                                feedId={l.feedId}
                                                                editMode={this.props.editMode}
                                                                userId={this.props.userId}
                                                                teacherId={this.props.teacherId} />
                                }
                            </div>

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

module.exports = SelfLoadingLessonPanel;