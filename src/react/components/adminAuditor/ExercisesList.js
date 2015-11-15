/**
 * Created by sabir on 26.08.15.
 */

var React = require('react');
var ExerciseItem = require('./ExerciseItem');

var ExercisesList = React.createClass({
    getDefaultProps: function () {
        return {
            exercises: [{
                name: 'name1',
                description: 'lorem ipsum1',
                imgSrc: 'https://randomuser.me/api/portraits/med/men/36.jpg'
            },
                {
                    name: 'name2',
                    description: 'lorem ipsum2',
                    imgSrc: 'https://randomuser.me/api/portraits/med/men/3.jpg'
                },
                {
                    name: 'name3',
                    description: 'lorem ipsum3',
                    imgSrc: 'https://randomuser.me/api/portraits/med/men/4.jpg'
                }

            ],
            onExerciseItemClick: function(exerciseId){
                console.log('onExerciseClick: number = ', number);
            }
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

        }
    },

    onExerciseItemClick: function(key){
        var exId = key;
        this.props.onExerciseItemClick(exId);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                {this.props.exercises.map(function(ex, i){
                    var key = ex.id;
                    var active = (ex.id == this.props.activeExerciseId);
                    var boundClick = this.onExerciseItemClick.bind(this, key);
                    return (
                        <ExerciseItem isActive={active} onClick={boundClick} key={key} name={ex.name} description={ex.description} imgSrc={ex.imgSrc} />
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = ExercisesList;