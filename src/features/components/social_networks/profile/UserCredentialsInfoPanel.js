/**
 * Created by sabir on 16.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var DialogMixin = require('../../../mixins/DialogMixin');

var QuestionnaireMixin = require('../../../mixins/QuestionnaireMixin');

var CourseMixin = require('../../../mixins/CourseMixin');

var CoolPreloader = require('../../preloader/CoolPreloader');

var ArticleMixin = require('../../../mixins/ArticleMixin');

var ClassMixin = require('../../../mixins/ClassMixin');



var UserInfoCredentialsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            exercisesCount: 0,
            dialogsCount: 0,
            questionnairesCount: 0,
            coursesCount: 0,
            articlesCount: 0,
            classesCount: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            padding: 10,
            position: 'relative',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            minHeight: 80
        },

        exercisesBlock: {
            marginTop: 5,
            marginBottom: 5
        },

        coursesBlock: {
            marginTop: 5,
            marginBottom: 5
        },

        articlesBlock: {
            marginTop: 6,
            marginBottom: 5
        },

        classesBlock: {
            marginTop: 6,
            marginBottom: 5
        }
    },

    loadExercisesCount: function(callback){
        var self = this;
        var userId = this.props.teacherId;
        QuestionnaireMixin.loadTeacherQuestionnairesCount(userId, function(n1){
            ExerciseMixin.loadTeacherExercisesCount(userId, function(n2){
                DialogMixin.loadTeacherDialogsCount(userId, function(n3){
                    self.setState({
                        exercisesCount: n2,
                        dialogsCount: n3,
                        questionnairesCount: n1
                    });
                    callback();
                });
            });
        });
    },

    loadCourses: function(callback){
        var self = this;
        var userId = this.props.teacherId;
        CourseMixin.loadTeacherCoursesCount(userId, function(n){
            self.setState({
                coursesCount: n
            });
            callback();
        })
    },

    loadArticles: function(callback){
        var userId = this.props.teacherId;
        ArticleMixin.loadTeacherArticlesCount(userId, function(n){
            this.setState({
                articlesCount: n
            });
            callback();
        }.bind(this));
    },


    loadClasses: function(callback){
        var userId = this.props.teacherId;
        ClassMixin.loadTeacherClassesCount(userId, function(n){
            this.setState({
                classesCount: n
            });
            callback();
        }.bind(this));
    },

    load: function(){
        var userId = this.props.teacherId;
        if (userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        this.loadExercisesCount(function(){
           self.loadCourses(function(){
               self.loadArticles(function(){
                   self.loadClasses(function(){
                       self.setState({
                           loading: false
                       });
                   });

               });
           });
        });
    },

    render: function () {
        var exNum = this.state.exercisesCount + this.state.dialogsCount + this.state.questionnairesCount;



        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.exercisesBlock}>
                    <i className={'icon tasks'} ></i> Создано упражнений: {exNum}
                </div>

                <div style={this.componentStyle.coursesBlock}>
                    <i className={'icon newspaper'} ></i> Создано курсов: {this.state.coursesCount}
                </div>

                <div style={this.componentStyle.articlesBlock}>
                    <i className={'icon file text outline'} ></i> Создано модулей: {this.state.articlesCount}
                </div>

                <div style={this.componentStyle.classesBlock}>
                    <i className={'icon users'} ></i> Создано классов: {this.state.classesCount}
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>

        );
    }

});

module.exports = UserInfoCredentialsPanel;