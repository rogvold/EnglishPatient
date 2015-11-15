/**
 * Created by sabir on 12.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseCard = require('./ExerciseCard');

var ExercisesCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            className: 'ui three cards',
            exercises: [],
            userId: undefined,
            onExerciseUpdate: function(ex){

            },
            onExerciseSelect: function(ex){

            },
            hoverMode: false,

            editMode: true
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            //width: '100%'
            height: '100%',
            overflowY: 'auto',
            maxWidth: 900,
            margin: '0 auto'
            //marginTop: 15
        }
    },

    onExerciseUpdate: function(ex){
        console.log('ExercisesCardsList: onExerciseUpdate: ex = ', ex);
        this.props.onExerciseUpdate(ex);
    },

    onExerciseSelect: function(ex){
        console.log('onExerciseSelect occured: exerciseId = ', ex);
        this.props.onExerciseSelect(ex);
    },

    render: function () {
        var list = this.props.exercises;
        //console.log('rendering cards: ', list);
        return (
            <div style={this.componentStyle.placeholder} className={this.props.className} >
                {list.map(function(ex, n){
                    var key = 'ex-card-' + ex.id + '-' + n;
                    var onExerciseSelect = this.onExerciseSelect.bind(this, ex);

                    return (
                        <ExerciseCard key={key} onSelect={onExerciseSelect}
                                      userId={this.props.userId} exerciseId={ex.id} name={ex.name}
                                      image={ex.image} description={ex.description}
                                      onExerciseUpdate={this.onExerciseUpdate}
                                      hoverMode={this.props.hoverMode}
                                      editMode={this.props.editMode}
                            />
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = ExercisesCardsList;