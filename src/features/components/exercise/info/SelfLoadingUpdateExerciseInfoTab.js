/**
 * Created by sabir on 16.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var UpdateExerciseInfoTab = require('../info/UpdateExerciseInfoTab');
var ExerciseMixin = require('../../../mixins/ExerciseMixin');
var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var SelfLoadingUpdateExerciseInfoTab = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            //exerciseId: '5c4dk92L9Y',
            exerciseId: undefined,
            //teacherId: 'jnM2pCK62I',
            teacherId: undefined,
            onExerciseUpdate: function(ex){

            }
        }
    },

    getInitialState: function () {
        return {
            name: undefined,
            avatar: undefined,
            description: undefined,
            task: undefined,
            access: undefined,
            groups: [],
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        this.loadExercise(this.props.exerciseId, function(ex){
            console.log('exLoaded');
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        }
    },

    loadExercise: function(exerciseId, callback){
        if (exerciseId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ExerciseMixin.loadExerciseInfo(exerciseId, function(ex){
            this.setState({
                name: ex.name,
                avatar: ex.avatar,
                description: ex.description,
                access: ex.access,
                timestamp: ex.timestamp,
                task: ex.task,
                groups: ex.groups,
                loading: false
            });
        }.bind(this));
    },

    updateExercise: function(ex){

        console.log('--->> updateExercise occured: ex = ', ex);

        var teacherId = this.props.teacherId;
        var exerciseId = this.props.exerciseId;
        this.setState({
            loading: true
        });
        var self = this;
        ExerciseMixin.updateExercise(exerciseId, teacherId, ex.name, ex.description, ex.avatar, ex.task, ex.access, ex.groups, function(exer){
            self.props.onExerciseUpdate(exer);
            //self.getFlux().actions.loadExercise(exer.id);
            self.setState({
                loading: false
            });
            this.loadExercise(exerciseId, function(exer){
                console.log('exercise updated ', exer);
            });
        }.bind(this));
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        ExerciseMixin.deleteExercise(this.props.exerciseId, function(){
            this.setState({
                loading: false
            });
            this.props.onExerciseUpdate();
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <UpdateExerciseInfoTab name={this.state.name} access={this.state.access}
                                       description={this.state.description} groups={this.state.groups}
                                       teacherId={this.props.teacherId}
                                       timestamp={this.state.timestamp}
                                       avatar={this.state.avatar} exerciseId={this.props.exerciseId}
                                       task={this.state.task} onSave={this.updateExercise} onDelete={this.onDelete} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdateExerciseInfoTab;