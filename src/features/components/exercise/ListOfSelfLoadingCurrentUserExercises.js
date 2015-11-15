/**
 * Created by sabir on 03.10.15.
 */
var React = require('react');
var SelfLoadingCurrentUserExercise = require('./SelfLoadingCurrentUserExercise');

var ListOfSelfLoadingCurrentUserExercises = React.createClass({
    getDefaultProps: function () {
        return {
            exercisesIdsList: ['9enp2r58C4', 'n8aBTVBanf'],
            pageSize: 5
        }
    },

    getInitialState: function () {
        return {
            currentIndex: 0
        }
    },



    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {
        var list = this.props.exercisesIdsList;

        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(exId){
                    var key = 'self_' + exId;
                    return (
                        <SelfLoadingCurrentUserExercise key={key} exerciseId={exId} />
                    );

                }, this)}
            </div>
        );
    }

});

module.exports = ListOfSelfLoadingCurrentUserExercises;