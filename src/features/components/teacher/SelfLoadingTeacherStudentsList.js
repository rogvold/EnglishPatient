/**
 * Created by sabir on 05.10.15.
 */
var React = require('react');

var UsersList = require('./UsersList');
var ClassMixin = require('../../mixins/ClassMixin');
var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');

var SelfLoadingTeacherStudentsList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: 'jnM2pCK62I',
            onLoad: function(){

            },
            onUserSelect: function(userId){
                console.log('SelfLoadingTeacherStudentsList: onUserSelect: ', userId);
            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            users: [],
            selectedUserId: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        var teacherId = this.props.teacherId;
        console.log('loading list');
        this.loadList(teacherId, function(users){
            this.props.onLoad(users);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            width: '240px',
            borderLeft: '1px solid lightgrey',
            borderRight: '1px solid lightgrey',
            maxHeight: '100%',
            overflowY: 'auto'
        }
    },

    onUserSelect: function(userId){
        this.props.onUserSelect(userId);
        this.setState({
            selectedUserId: userId
        });
    },

    loadList: function(teacherId, callback){
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ClassMixin.loadTeacherStudents(teacherId, function(users){
            this.setState({
                loading:false,
                users: users
            });
            callback(users);
        }.bind(this))
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}  >

                <UsersList selectedUserId={this.state.selectedUserId} onUserSelect={this.onUserSelect} users={this.state.users} />

            </div>
        );
    }

});


module.exports = SelfLoadingTeacherStudentsList;