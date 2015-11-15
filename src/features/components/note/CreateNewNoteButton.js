/**
 * Created by sabir on 20.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingUpdateNotePanel = require('./SelfLoadingUpdateNotePanel');
var Dialog = require('../dialog/Dialog');

var CreateNewNoteButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonClassName: 'ui mini basic grey button',
            buttonName: 'новая заметка',
            style: {

            },
            groups: [],
            teacherId: undefined,
            onNoteCreate: function(note){

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

        dialogContentStyle: {
            width: 700
        },
    },

    getDialogContent: function(){
        if (this.state.dialogVisible == false){
            return null;
        }
        return (
            <div style={{paddingTop: 20, paddingBottom: 20}}>
                <SelfLoadingUpdateNotePanel groupsList={this.props.groups}
                    onNoteCreate={this.onNoteCreate} teacherId={this.props.teacherId} />
            </div>
        );
    },

    onNoteCreate: function(note){
        console.log('CreateNewNoteButton  onNoteCreate occured: note = ', note);
        if (note == undefined){
            return;
        }
        this.setState({
            dialogVisible: false
        });
        console.log('CreateNewNoteButton: this.props.onNoteCreate(note), note = ', note);
        this.props.onNoteCreate(note);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <button className={this.props.buttonClassName} onClick={this.showDialog} >
                    <i className={'plus icon'}></i> {this.props.buttonName}
                </button>

                <Dialog dialogPanelStyle={this.componentStyle.dialogContentStyle}
                        onClose={this.hideDialog} visible={this.state.dialogVisible} content={this.getDialogContent()} />
            </div>
        );
    }

});

module.exports = CreateNewNoteButton;