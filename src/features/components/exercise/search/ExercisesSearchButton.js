/**
 * Created by sabir on 31.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExercisesSearchPanel = require('./ExercisesSearchPanel');
var ExerciseGlobalSearchPanel = require('./ExerciseGlobalSearchPanel');

var Dialog = require('../../dialog/Dialog');

var ExercisesSearchButton = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            buttonName: 'Упражнение',
            buttonClassName: 'button basic grey mini ui ',
            buttonIcon: 'icon tasks',

            onSelect: function(ex){

            }
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

    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },

    hideDialog: function(){
        this.setState({
            dialogVisible: false
        });
    },



    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            paddingTop: 10,
            width: 920
        }
    },

    onSelect: function(ex){
        this.props.onSelect(ex);
        this.hideDialog();
    },

    getDialogContent: function(){
        if (this.props.teacherId == undefined){
            return null;
        }
        return (
            <ExerciseGlobalSearchPanel
                teacherId={this.props.teacherId}
                onSelect={this.onSelect} />
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.showDialog} >
                    <i className={this.props.buttonIcon} ></i>
                    {this.props.buttonName}
                </button>

                <Dialog visible={this.state.dialogVisible} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.hideDialog} content={this.getDialogContent()} level={2}
                    />


            </div>
        );
    }

});

module.exports = ExercisesSearchButton;