/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var CreateCourseButton = require('../update/CreateCourseButton');

var CourseMixin = require('../../../mixins/CourseMixin');

var CoursesList = require('./CoursesList');

var CoolPreloader = require('../../preloader/CoolPreloader');

var UserContentPanelHeader = require('../../social_networks/headers/UserContentPanelHeader');

var LoginMixin = require('../../../mixins/LoginMixin');

var UserMixin = require('../../../mixins/UserMixin');

var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SelfLoadingCoursesList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CoursesStore')],

    getDefaultProps: function () {
        return {
            teacherId: undefined,
            userId: undefined,
            editMode: true
        }
    },

    getInitialState: function () {
        return {
            //loading: false,
            //courses: [],

        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('CoursesStore');
        var courses = store.getTeacherCourses(this.props.teacherId)

        return {
            loading: store.loading,
            courses: courses
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        //this.load();
    },

    componentStyle: {
        placeholder: {
            //width: 820,
            width: '100%',
            //height: '100%',
            overflowY: 'auto',
            margin: '0 auto',
            position: 'relative',
            backgroundColor: 'white',
            paddingBottom: 1,
            padding: 5,
            border: '1px solid #EFF0F1'
        },

        createCourseButtonPlaceholder: {
            padding: 5,
            textAlign: 'right',
            paddingRight: 0
        },

        listPlaceholder: {

        },

        headerPlaceholder: {
            padding: 5,
            height: 50
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
        var self = this;
        CourseMixin.loadTeacherCourses(teacherId, function(courses){
            UserMixin.loadUser(teacherId, function(user){
                self.setState({
                    loading: false,
                    courses: courses,
                    user: user
                });
            });
        }.bind(this))
    },

    onCourseCreated: function(course){
        //this.load();
    },

    onDeleted: function(){
        //this.load();
    },

    onUpdated: function(){
        //this.load();
    },

    render: function () {
        var currentUser = LoginMixin.getCurrentUser();
        var currentUserId = (currentUser == undefined) ? undefined : currentUser.id;
        var canCreate = (this.props.teacherId == currentUserId);
        var courses = this.state.courses;

        return (
            <div style={this.componentStyle.placeholder}>

                    <div style={this.componentStyle.headerPlaceholder}>
                        <div style={{display: 'inline-block', float: 'left'}} >
                            <UserCommunityHeaderPanel
                                userId={this.props.teacherId}
                                customInfoHtml={'количество курсов: ' + courses.length + ''}
                                />
                        </div>
                    </div>


                {canCreate == false ? null :
                    <div style={this.componentStyle.createCourseButtonPlaceholder}>
                        <CreateCourseButton
                            userId={this.props.teacherId}
                            onCourseCreated={this.onCourseCreated} />
                    </div>
                }

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

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = SelfLoadingCoursesList;