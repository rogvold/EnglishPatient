/**
 * Created by sabir on 06.10.15.
 */
var React = require('react');

var SelfLoadingTeacherStudentsList = require('./SelfLoadingTeacherStudentsList');
var PatientPreloader = require('../preloader/PatientPreloader');

var ExerciseMixin = require('../../mixins/ExerciseMixin');
var ClassMixin = require('../../mixins/ClassMixin');

var ListOfSelfLoadingUserExercises = require('../exercise/ListOfSelfLoadingUserExercises');

var SelfLoadingClassesList = require('./SelfLoadingClassesList');
var UsersList = require('./UsersList');

var TeacherExercisesCheckingDashboard = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I'
        }
    },

    getInitialState: function () {
        return {
            selectedUserId: undefined,
            classId: undefined,
            loading: true,
            scores: [],
            users: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 1123,
            height: window.innerHeight - 50,
            margin: '0 auto',
            backgroundColor: 'white',
            borderRight: '1px solid lightgrey',
            borderLeft: '1px solid lightgrey'
        },

        classesListPlaceholder: {
            height: '100%',
            overflowY: 'auto',
            display: 'inline-block',
            backgroundColor: 'white',
            borderRight: '1px solid lightgrey',
            verticalAlign: 'top',
            width: 240
        },

        usersListPlaceholder: {
            height: '100%',
            overflowY: 'auto',
            display: 'inline-block',
            backgroundColor: 'white',
            verticalAlign: 'top',
            borderRight: '1px solid lightgrey',
            width: 240
        },

        exercisesPlaceholder: {
            height: '100%',
            overflowY: 'auto',
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 5
        }
    },

    onUserSelect: function(userId){
        console.log('onUserSelect occured: userId = ', userId);
        this.setState({
            selectedUserId: userId,
            loading: true
        });
        ExerciseMixin.loadAllUserExercisesScores(userId, function(scores){
            this.setState({
                scores: scores,
                loading: false
            });
        }.bind(this));
    },


    onClassesListLoad: function(classes){
        this.setState({
            classes: classes,
            loading: false
        });
    },

    getSelectedUser: function(){
        var userId = this.state.selectedUserId;
        if (userId == undefined){
            return undefined;
        }
        var list = this.state.users;
        for (var i in list){
            if (list[i].id == userId){
                return list[i];
            }
        }
    },

    onClassSelect: function(classId){
        console.log('onClassSelect occured');
        this.setState({
            loading: true,
            users: [],
            scores: [],
            classId: undefined,
            selectedUserId: undefined
        });
        ClassMixin.loadUsersFromClass(classId, function(users){
            console.log('users loaded: ', users);
            this.setState({
                users: users,
                loading: false,
                classId: classId,
                selectedUserId: undefined
            });
        }.bind(this));
    },

    render: function () {
        var exercisesIdsList = this.state.scores.map(function(s){return s.exerciseId});
        var selectedUser = this.getSelectedUser();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.classesListPlaceholder}>
                    <SelfLoadingClassesList onClassSelect={this.onClassSelect} onLoad={this.onClassesListLoad} teacherId={this.props.teacherId} />
                </div>

                {this.state.classId == undefined ?
                    <div style={{display: 'inline-block', padding: 10}}>
                        <h3>Это интерфейс проверки заданий</h3>
                        <p>Выберите класс из списка слева</p>
                    </div>
                    :
                    <div style={this.componentStyle.usersListPlaceholder}>
                        <UsersList selectedUserId={this.state.selectedUserId} users={this.state.users} onUserSelect={this.onUserSelect} teacherId={this.props.teacherId} />
                    </div>
                }


                <div style={this.componentStyle.exercisesPlaceholder}>

                    {this.state.selectedUserId == undefined && this.state.classId != undefined ?
                        <div>
                            <h3>Это интерфейс проверки заданий</h3>
                            <p>Выберите пользователя из списка слева</p>
                        </div>
                        :
                        <div>

                            {selectedUser == undefined ? null :
                                <div>
                                    Проверка пользователя <b>{selectedUser.name}</b>
                                    <hr/>
                                </div>
                            }

                            <ListOfSelfLoadingUserExercises teacherId={this.props.teacherId} teacherMode={true}
                                                            userId={this.state.selectedUserId} exercisesIdsList={exercisesIdsList} />

                        </div>
                    }


                </div>




                <PatientPreloader isVisible={this.state.loading} />

            </div>
        );
    }

});

module.exports = TeacherExercisesCheckingDashboard;