/**
 * Created by sabir on 17.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');
var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');

var ExerciseInfoCard = require('./ExerciseInfoCard');

var SelfLoadingExerciseInfoCard = React.createClass({
    getDefaultProps: function () {
        return {
            exerciseId: undefined
        }
    },

    getInitialState: function () {
        return {
            name: undefined,
            avatar: undefined,
            description: undefined,
            task: undefined,
            access: undefined,
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
                task: ex.task,
                loading: false
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <ExerciseInfoCard name={this.state.name} description={this.state.name}
                                  avatar={this.state.avatar} task={this.state.task} access={this.state.access} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingExerciseInfoCard;