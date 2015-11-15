/**
 * Created by sabir on 12.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var DialogClickableArea = require('../DialogClickableArea');

var SelfLoadingUserExercise = require('../../exercise/SelfLoadingUserExercise');

var ExerciseDialogClickableArea = React.createClass({
    getDefaultProps: function () {
        return {
            exerciseId: undefined,
            userId: undefined
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

        },

        exercisePlaceholder: {
            width: 630,
            margin: '0 auto'
        },

        dialogPanel: {
            //width: 630,
            //marginTop: 0,
            //height: '100vh',
            //backgroundColor: 'transparent'
        }

    },

    getContent: function(){
            return (
                <div style={this.componentStyle.exercisePlaceholder} >
                    <SelfLoadingUserExercise exerciseId={this.props.exerciseId} userId={this.props.userId} />
                </div>
            );
    },



    render: function () {
        var content = this.getContent();
        var st = assign({}, this.componentStyle.placeholder, this.props.componentStyle);

        return (
            <div style={st}>
                <DialogClickableArea dialogPanelStyle={this.componentStyle.dialogPanel} content={content} componentStyle={st} >
                    {this.props.children}
                </DialogClickableArea>
            </div>
        );
    }

});

module.exports = ExerciseDialogClickableArea;