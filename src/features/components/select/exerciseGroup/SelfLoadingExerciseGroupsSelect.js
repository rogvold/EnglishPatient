/**
 * Created by sabir on 17.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var ExerciseGroupSelect = require('./ExerciseGroupSelect');

var SelfLoadingExerciseGroupsSelect = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            exerciseGroups: [],      // list of ids,
            onSelect: function(exerciseGroups){
                console.log('exerciseGroups = ', exerciseGroups);
            }
        }
    },

    getInitialState: function () {
        return {
            allGroups: [],
            loading: false
        }

    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        console.log('loading groups of teacher ' + this.props.teacherId);
        this.loadTeacherGroups(this.props.teacherId, function(grs){
            console.log('groups loaded: ', grs);
        });
    },

    loadTeacherGroups: function(teacherId, callback){
        this.setState({
            loading: true
        });
        ExerciseMixin.loadTeacherExercisesGroups(teacherId, function(groups){
            this.setState({
                allGroups: groups,
                loading: false
            });
            callback(groups);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        },
        loadingPlaceholder: {
            minHeight: 40
        }
    },

    onSelect: function(list){
        console.log('SelfLoadingExerciseGroupSelect: onSelect occured: list = ', list);
        this.props.onSelect(list);
    },

    render: function () {
        var style = assign({}, this.componentStyle.placeholder, (this.state.loading == true) ? this.componentStyle.loadingPlaceholder : {});

        console.log('rendering SelfLoadingExerciseGroupSelect: selectedGroups = ', this.props.exerciseGroups, ' groups=  ', this.state.allGroups);

        return (
            <div style={style} className={'' + (this.state.loading == true ? 'ui segment' : '')} >
                <ExerciseGroupSelect onSelect={this.onSelect} selectedGroups={this.props.exerciseGroups} groups={this.state.allGroups} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate mini text loader">Загрузка...</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingExerciseGroupsSelect;