/**
 * Created by sabir on 17.10.15.
 */


var React = require('react');
var assign = require('object-assign');

var ExerciseDialogViewer = require('../../../dialog/exercise/ExerciseDialogViewer');

var CreateNewExerciseButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonName: 'Новое упражнение',
            buttonClassName: 'ui button primary',

            teacherId: undefined,
            onExerciseCreate: function(ex){
                console.log('creatrd nex exercise: ', ex);
            },
            buttonIcon: 'icon plus',
            style: {}
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onDialogClose: function(){

    },

    onExerciseUpdate: function(ex){
        console.log('CreateNewExerciseButton: onExerciseUpdate: ex = ', ex);
        this.props.onExerciseCreate(ex);
        this.setState({
            dialogVisible: false
        });
    },

    componentStyle: {
        placeholder: {}
    },

    onButtonClick: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onDialogClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    render: function () {

        var st = assign(this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st}>

                <button className={this.props.buttonClassName} onClick={this.onButtonClick} >
                    <i className={this.props.buttonIcon} ></i> {this.props.buttonName}
                </button>

                <ExerciseDialogViewer
                    onClose={this.onDialogClose} visible={this.state.dialogVisible}
                    userId={this.props.userId} exerciseId={this.props.exerciseId} teacherId={this.props.teacherId}
                    onExerciseUpdate={this.onExerciseUpdate} />

            </div>
        );
    }

});

module.exports = CreateNewExerciseButton;