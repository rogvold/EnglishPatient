/**
 * Created by sabir on 20.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingUpdateNotePanel = require('./SelfLoadingUpdateNotePanel');
var Dialog = require('../../components/dialog/Dialog');
var NotesMixin = require('../../mixins/NotesMixin');

var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var SelfLoadingUpdatableNote = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            noteId: undefined,
            groupsList: [],
            onNoteUpdate: function(note){

            },

            onNoteDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            dialogVisible: false,
            name: undefined,
            content: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.noteId != this.props.noteId){
            this.loadNote(nextProps.noteId, function(n){
                console.log(n);
            });
        }
    },

    componentDidMount: function () {
        this.loadNote(this.props.noteId, function(note){
            console.log('note loaded', note);
        });
    },

    loadNote: function(noteId, callback){
        //var noteId = this.props.noteId;
        if (noteId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        NotesMixin.loadNote(noteId, function(note){
            this.setState({
                name: note.name,
                content: note.content,
                timestamp: note.timestamp,
                loading: false
            });
            callback(note);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        notePlaceholder: {

        },

        editNoteButtonPlaceholder: {
            borderTop: '1px solid #EFF0F1',
            marginTop: 10,
            paddingTop: 10
        },

        noteName: {
            fontSize: '16px',
            padding: 5,
            width: '100%',
            paddingRight: 70,
            //paddingBottom: 15,
            paddingBottom: 5,
            fontWeight: 'bold',
            borderBottom: '1px solid #EFF0F1'
        },

        noteContent: {
            padding: 10
            //border: '1px solid #EFF0F1'
        },

        dialogContentStyle: {
            width: 700
        },

        editNoteButtonPlaceholder: {
            position: 'absolute',
            top: 2,
            right: 0
        },

        editButton: {
            padding: 5,
            paddingLeft: 10,
            paddingRight: 0
        }

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

    getDialogContent: function(){
        if (this.state.dialogVisible == false){
            return null;
        }
        return (
            <div style={{paddingTop: 20, paddingBottom: 20}}>
                <SelfLoadingUpdateNotePanel groupsList={this.props.groupsList} onNoteDelete={this.onNoteDelete} onNoteUpdate={this.onNoteUpdate}
                                            teacherId={this.props.teacherId} noteId={this.props.noteId} />
            </div>

        );
    },


    onNoteUpdate: function(note){
        console.log('SelfLoadingUpdatableNote occured: note = ', note);
        if (note == undefined){
            return;
        }
        this.setState({
            name: note.name,
            content: note.content,
            dialogVisible: false
        });
        console.log('SelfLoadingUpdatableNote: this.props.onNoteUpdate(note), note = ', note);
        this.props.onNoteUpdate(note);
    },

    onNoteDelete: function(){
        this.setState({
            name: 'заметка удалена',
            content: undefined,
            dialogVisible: false
        });
        this.props.onNoteDelete();
    },

    print: function(){
        var data = '';
        data = data + '<h3>' + this.state.name + '</h3>';
        data = data + (this.state.content == undefined ? '' : this.state.content);
        CommonMixin.printHtml(data);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.notePlaceholder} className={'PatientNote'} >

                    <div style={this.componentStyle.noteName}>
                        {this.state.name}
                    </div>

                    <div style={this.componentStyle.noteContent}>
                        <div dangerouslySetInnerHTML={{__html:this.state.content}} ></div>
                    </div>

                </div>

                <div style={this.componentStyle.editNoteButtonPlaceholder}>
                    <button style={this.componentStyle.editButton} className={'ui basic grey button'} onClick={this.showDialog} >
                        <i className={'pencil icon'} ></i>
                    </button>

                    <button style={this.componentStyle.editButton} className={'ui basic grey button'} onClick={this.print} >
                        <i className={'print icon'} ></i>
                    </button>

                </div>

                <Dialog dialogPanelStyle={this.componentStyle.dialogContentStyle}
                        onClose={this.hideDialog} visible={this.state.dialogVisible} content={this.getDialogContent()} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdatableNote;