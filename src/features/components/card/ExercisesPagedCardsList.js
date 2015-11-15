/**
 * Created by sabir on 13.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExercisesCardsList = require('./ExercisesCardsList');
var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var ExercisesPagedCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            exercises: [],
            pageSize: 12,
            buttonClassName: 'ui grey basic  button',
            showButton: true,
            showLoadedInfoBlock: true,
            userId: undefined,
            hoverMode: false,

            editMode: true,

            onExerciseUpdate: function(ex){

            },

            onExerciseSelect: function(ex){
                console.log('onExerciseSelect: ex = ', ex);
            }
        }
    },

    getInitialState: function () {
        var list = (this.props.exercises == undefined) ? [] : this.props.exercises;
        return {
            visibleExercises: list.slice(0, this.props.pageSize)
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var newList = nextProps.exercises == undefined ? [] : nextProps.exercises;
        var oldList = this.props.exercises == undefined ? [] : this.props.exercises;
        if (CommonMixin.arraysAreEqual(newList, oldList, function(ex1, ex2){
                return (ex1.id == ex2.id);
            }) == false){

            this.setState({
                visibleExercises: newList.slice(0, this.props.pageSize)
            });
        }
    },

    onNextPage: function(){
        var k = this.state.visibleExercises.length;
        k = k + this.props.pageSize;
        this.setState({
            visibleExercises: this.props.exercises.slice(0, k)
        });
    },

    showAll: function(){
        this.setState({
            visibleExercises: this.props.exercises.slice(0, this.props.exercises.length)
        });
    },

    nextButtonVisible: function(){
        var k = this.state.visibleExercises.length;
        var n = this.props.exercises.length;
        return (k < n);
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            maxWidth: 900,
            margin: '0 auto'
        },

        nextPageButton: {
            cursor: 'pointer'
        },

        nextPageButtonPlaceholder: {
            textAlign: 'center',
            marginTop: 5,
            marginBottom: 5,
            position: 'relative'
        },

        loadedText: {
            position: 'absolute',
            right: 15,
            top: 5,
            opacity: 0.6
        },

        showAllText: {
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: 10
        },

        cardsListPlaceholder: {

        }
    },

    onExerciseUpdate: function(ex){
        this.props.onExerciseUpdate(ex);
    },

    onExerciseSelect: function(ex){
        this.props.onExerciseSelect(ex);
    },

    render: function () {
        var buttonVisible = this.nextButtonVisible();
        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.cardsListPlaceholder} >
                    <ExercisesCardsList onExerciseUpdate={this.onExerciseUpdate} onExerciseSelect={this.onExerciseSelect}
                                        userId={this.props.userId} hoverMode={this.props.hoverMode}
                                        exercises={this.state.visibleExercises}
                                        editMode={this.props.editMode}
                        />
                </div>

                {buttonVisible == false ? null :
                    <div style={this.componentStyle.nextPageButtonPlaceholder}>

                        {this.props.showButton == false ? null :
                            <button className={this.props.buttonClassName} onClick={this.onNextPage} >
                                показать еще {this.props.pageSize}
                            </button>
                        }

                        {this.props.showLoadedInfoBlock == false ? null :
                            <div style={this.componentStyle.loadedText}>
                                Показано <b>{this.state.visibleExercises.length}</b> из <b>{this.props.exercises.length}</b>.
                                <span style={this.componentStyle.showAllText} onClick={this.showAll} >Показать все</span>
                            </div>
                        }

                    </div>
                }


            </div>
        );
    }

});

module.exports = ExercisesPagedCardsList;