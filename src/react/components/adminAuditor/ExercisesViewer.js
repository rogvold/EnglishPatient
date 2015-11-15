/**
 * Created by sabir on 26.08.15.
 */

var React = require('react');
var ExercisesList = require('./ExercisesList');
var ExerciseCardsList = require('./ExerciseCardsList');

var ExercisesViewer = React.createClass({
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
            onExerciseItemClicked: function(exerciseId){

            },
            cards: [],
            selectedExercise: undefined
        }
    },

    getInitialState: function () {
        return {
            activeExerciseId: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 1000,
            height: 550,
            margin: '0 auto',
            border: '1px solid lightgrey'
        },
        leftPlaceholder: {
            width: '30%',
            display: 'inline-block',
            borderRight: '1px solid lightgrey',
            maxHeight: '100%',
            overflowY: 'auto',
            verticalAlign: 'top'
        },
        rightPlaceholder: {
            width: '69%',
            display: 'inline-block',
            maxHeight: '100%',
            overflowY: 'auto',
            padding: 5,
            verticalAlign: 'top'
        },
        exerciseInfoPlaceholder: {
            borderBottom: '1px solid lightgrey',
            height: '20%',
            padding: 5,
            textAlign: 'center',
            backgroundColor: 'lightgreen'
        },
        cardsPlaceholder: {

        }

    },

    onExerciseItemClicked: function(exerciseId){
        console.log('ExerciseViewer: onExerciseItemClicked exId = ', exerciseId);
        this.props.onExerciseItemClicked(exerciseId);
        this.setState({
            activeExerciseId: exerciseId
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} className={'ui piled segment'} >
                <div style={this.componentStyle.leftPlaceholder}>
                    <ExercisesList activeExerciseId={this.state.activeExerciseId} onExerciseItemClick={this.onExerciseItemClicked}  exercises={this.props.exercises} />
                </div>
                <div style={this.componentStyle.rightPlaceholder} className={'ui '}>
                    {this.props.selectedExercise != undefined ?
                        (
                            <div style={this.componentStyle.exerciseInfoPlaceholder} className={'ui header'} >
                                <h3>
                                    {this.props.selectedExercise.name}
                                </h3>

                                <p>
                                    {this.props.selectedExercise.description}
                                </p>

                            </div>
                        ):
                        (<div></div>)
                    }

                    <div style={this.componentStyle.cardsPlaceholder}>
                        <ExerciseCardsList cards={this.props.cards} />
                    </div>

                </div>
            </div>
        );
    }

});

module.exports = ExercisesViewer;