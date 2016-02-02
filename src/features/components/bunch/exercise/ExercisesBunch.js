/**
 * Created by sabir on 13.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExercisesPagedCardsList = require('../../card/ExercisesPagedCardsList');

var EditBunchDialog = require('../../dialog/bunch/EditBunchDialog');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var LoginMixin = require('../../../mixins/LoginMixin');

var ExercisesBunch = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            exercises: [],
            name: 'Unsorted',
            avatar: undefined,
            description: 'Упражнения вне категорий',
            noExercisesText: 'В этой категирии пока еще нет упражнений',
            userId: undefined,
            bunchId: undefined,
            editMode: true,
            onExerciseUpdate: function(ex){

            },
            onGroupUpdate: function(g){

            },

            onExerciseSelect: function(ex){

            },

            hoverMode: false
        }
    },

    getInitialState: function () {
        return {
            editDialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 900,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            pageSize: 12,
            position: 'relative'
        },

        infoPlaceholder: {
            paddingLeft: 15,
            paddingTop: 10,
            position: 'relative'
        },

        namePlaceholder: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: 7
        },

        descriptionPlaceholder: {
            fontSize: '13px'

        },

        exercisesPlaceholder: {

        },

        noExercisesPlaceholder: {
            textAlign: 'center',
            color: '#FC636B',
            fontSize: '14px',
            position: 'absolute',
            right: 65,
            top: 10,
            opacity: 0.5,
            fontStyle: 'italic'
        },

        editButtonPlaceholder: {
            position: 'absolute',
            top: 5,
            right: 5
        },

        editButton: {
            padding: 7,
            paddingRight: 6
        }
    },

    onExerciseUpdate: function(ex){
        this.props.onExerciseUpdate(ex);
    },

    onEditClick: function(){
        this.setState({
            editDialogVisible: true
        });
    },

    onModalClose: function(){
        this.setState({
            editDialogVisible: false
        });
    },

    onGroupUpdate: function(g){
        this.props.onGroupUpdate(g);
    },

    onExerciseSelect: function(ex){
        this.props.onExerciseSelect(ex);
    },

    render: function () {
        var noExercises = (this.props.exercises == undefined || this.props.exercises.length == 0);
        var user = LoginMixin.getCurrentUser();
        var currentUserId = (user == undefined) ? undefined : user.id;
        var editMode = (currentUserId == this.props.userId);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.infoPlaceholder}>

                    {this.props.name == undefined ? null :
                        <div style={this.componentStyle.namePlaceholder}>
                            {this.props.name}
                        </div>
                    }

                    {this.props.description == undefined ? null :
                        <div style={this.componentStyle.descriptionPlaceholder}>
                            {this.props.description}
                        </div>
                    }

                    {noExercises == false ? null :
                        <div style={this.componentStyle.noExercisesPlaceholder} >
                            {this.props.noExercisesText}
                        </div>
                    }

                </div>

                {(this.props.exercises == undefined) ?
                    null
                    :
                    <div style={this.componentStyle.exercisesPlaceholder}>
                        <ExercisesPagedCardsList onExerciseUpdate={this.onExerciseUpdate} onExerciseSelect={this.onExerciseSelect}
                                                 userId={this.props.userId} pageSize={this.props.pageSize}
                                                 hoverMode={this.props.hoverMode}
                                                 exercises={this.props.exercises} editMode={this.props.editMode} />
                    </div>
                }

                {editMode == false ? null :
                    <div style={this.componentStyle.editButtonPlaceholder}>
                        <button className={'ui basic grey button'} style={this.componentStyle.editButton} onClick={this.onEditClick} >
                            <i className={'pencil icon'} style={{marginRight: 0}} ></i>
                        </button>
                    </div>
                }

                {editMode == false ? null :
                    <EditBunchDialog groupId={this.props.bunchId}
                                     avatar={this.props.avatar}
                                     name={this.props.name} bunchId={this.props.bunchId}
                                     onGroupUpdate={this.onGroupUpdate} description={this.props.description}
                                     visible={this.state.editDialogVisible} onClose={this.onModalClose}
                    />
                }


            </div>
        );
    }

});

module.exports = ExercisesBunch;