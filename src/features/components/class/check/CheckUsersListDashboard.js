/**
 * Created by sabir on 11.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var ListOfSelfLoadingUserExercises = require('../../exercise/ListOfSelfLoadingUserExercises');
var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var VerticalUsersList = require('./VerticalUsersList');

var GifInstruction = require('../../help/GifInstruction');

var SelfLoadingClassFeed = require('../../feed/SelfLoadingClassFeed');

var CheckUsersListDashboard = React.createClass({
    getDefaultProps: function () {
        return {
            users: [],
            classId: undefined,
            teacherId: undefined,
            loadingText: 'Загрузка...'
        }
    },

    getInitialState: function () {
        return {
            selectedUserId: undefined,
            loading: false,
            scores: [],
            users: []
        }
    },

    getSelectedUser: function(){
        var userId = this.state.selectedUserId;
        if (userId == undefined){
            return undefined;
        }
        var list = this.props.users;
        for (var i in list){
            if (list[i].id == userId){
                return list[i];
            }
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

    componentWillReceiveProps: function (nextProps) {
        var newUsers = nextProps.users == undefined ? [] : nextProps.users;
        var oldUsers = this.props.users == undefined ? [] : this.props.users;
        if (CommonMixin.arraysAreEqual(newUsers, oldUsers, function(u1, u2) {
                return (u1.id == u2.id);
            }) == false){
            this.setState({
                users: newUsers,
                selectedUserId: undefined
            });
        }
    },

    componentDidMount: function () {
        this.setState({
            users: this.props.users
        });
    },

    componentStyle: {
        placeholder: {
            //minWidth: 883,
            //width: 883,
            width: 906,
            //width: '100%',
            overflowX: 'auto',
            height: window.innerHeight - 100,
            margin: '0 auto',
            backgroundColor: 'white',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1'
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
            padding: 5,
            minWidth: 640
        }
    },

    render: function () {
        var selectedUser = this.getSelectedUser();
        var exercisesIdsList = this.state.scores.map(function(s){return s.exerciseId});

        var users = this.props.users;

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.usersListPlaceholder}>
                    <VerticalUsersList selectedUserId={this.state.selectedUserId} users={users} onUserSelect={this.onUserSelect} teacherId={this.props.teacherId} />
                </div>

                <div style={this.componentStyle.exercisesPlaceholder}>
                    {this.state.selectedUserId == undefined ?
                        <div style={{marginTop: 50}}>
                            <GifInstruction url={'http://zippy.gfycat.com/FabulousFlawedBeauceron.gif'} text={'Выберите пользователя из списка слева'} />
                        </div>
                        :
                        <div>

                            <SelfLoadingClassFeed classId={this.props.classId} userId={this.state.selectedUserId}
                                                  teacherId={this.props.teacherId} teacherMode={true} editMode={false} />

                        </div>
                    }
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading == true ? ' active ' : '' )}>
                    <div className="ui medium text loader">{this.props.loadingText}</div>
                </div>


            </div>
        );
    }

});

module.exports = CheckUsersListDashboard;