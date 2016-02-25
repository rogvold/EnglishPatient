/**
 * Created by sabir on 16.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');
var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var ExerciseInlineInfo = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ExercisesStore')],
    getDefaultProps: function(){
        return {
            exerciseId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ExercisesStore');
        var exercise = store.exercisesMap[this.props.exerciseId];
        return {
            loading: store.loading,
            exercise: exercise
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var exerciseId = this.props.exerciseId;
        var exercise = this.getFlux().store('ExercisesStore').exercisesMap[exerciseId];
        if (exercise == undefined){
            this.getFlux().actions.loadExercise(exerciseId);
        }
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        userHeaderPlaceholder: {

        },

        exerciseInfoPlaceholder: {
            paddingTop: 5,
            paddingBottom: 5,
            opacity: 0.8
        }

    },

    render: function(){
        var exercise = this.state.exercise;
        var userId = (exercise == undefined) ? undefined : exercise.creatorId;
        var name = (exercise == undefined) ? undefined : exercise.name;

        return (
            <div style={this.componentStyle.placeholder} >


                {userId == undefined ? null :
                    <div style={this.componentStyle.userHeaderPlaceholder}>
                        <UserCommunityHeaderPanel
                            profileLinkEnabled={true}
                            style={{minWidth: 250}}
                            infoStyle={{opacity: 0.95, fontSize: 14}}
                            customInfoHtml={name}
                            userId={userId}/>
                    </div>
                }

                {exercise == undefined ? null :
                    <div style={this.componentStyle.exerciseInfoPlaceholder}>

                        {(exercise.description == undefined || exercise.description.trim() == '' ) ? null :
                            <div>
                                {exercise.description}
                            </div>
                        }

                        {(exercise.task == undefined || exercise.task.trim() == '' ) ? null :
                            <div>
                                <i>Задание: </i>
                                {exercise.task}
                            </div>
                        }

                    </div>
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }
            </div>
        );
    }

});

module.exports = ExerciseInlineInfo;