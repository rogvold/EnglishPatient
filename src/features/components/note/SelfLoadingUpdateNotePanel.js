/**
 * Created by sabir on 20.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientEditor = require('../editor/PatientEditor');
var NotesMixin = require('../../mixins/NotesMixin');
var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var DeleteButton = require('../../components/buttons/DeleteButton');

var NotesGroupSelect = require('../../components/note/select/NotesGroupSelect');

var SelfLoadingUpdateNotePanel = React.createClass({
    getDefaultProps: function () {
        return {
            noteId: undefined,
            teacherId: undefined,
            groupsList: [],
            categoryMode: true,
            onNoteUpdate: function(note){

            },
            onNoteCreate: function(note){

            },
            onNoteDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            content: undefined,
            name: undefined,
            groupId: undefined,
            defaultContent: 'Начните редактировать эту заметку',
            loading: false,
            needToSave: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var noteId = this.props.noteId;
        if (noteId == undefined){
            return;
        }
        this.loadNote(noteId, function(note){
            console.log('note loaded: ', note);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            height: '100%',
            width: 640,
            margin: '0 auto'
        },

        contentPlaceholder: {
            width: 640,
            margin: '0 auto'
        },

        namePlaceholder: {
            marginBottom: 15
        },

        saveButtonPlaceholder: {
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid #EFF0F1',
            textAlign: 'right'
        },

        saveButton: {
            marginRight: 0
        },

        deleteBlock: {
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid #EFF0F1'
        },

        notesGroupSelectPlaceholder: {
            paddingTop: 10,
            marginTop: 10,
            borderTop: '1px solid #EFF0F1',
            marginBottom: 40
        }

    },


    onNameChange: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            val = undefined;
        }
        this.setState({
            name: val,
            needToSave: true
        });
    },

    onContentChange: function(content){
        this.setState({
            content: content,
            needToSave: true
        });
    },

    loadNote: function(noteId, callback){
        console.log('SelfLoadingUpdateNotePanel: loadNote occured: noteId = ', noteId);
        ParseMixin.initParse();
        if (noteId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        NotesMixin.loadNote(noteId, function(note){
            console.log('note loaded: ', note);
            this.setState({
                defaultContent: note.content,
                content: note.content,
                groupId: note.groupId,
                name: note.name,
                loading: false
            });
            callback(note);
        }.bind(this));
    },

    onSelect: function(list){
        var newId = (list == undefined || list.length == 0 ) ? undefined : list[0];
        this.setState({
            groupId: newId,
            needToSave: true
        });
    },

    onSave: function(){
        var name = this.state.name;
        var content = this.state.content;
        var groupId = this.state.groupId;
        console.log(name, content);
        this.setState({
            loading: true
        });
        NotesMixin.updateNote(this.props.noteId, this.props.teacherId, name, content, groupId, function(note){
            if (this.props.noteId == undefined){
                this.props.onNoteCreate(note);
            }else{
                this.props.onNoteUpdate(note);
            }
            this.setState({
                loading: false
            });
        }.bind(this));
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        NotesMixin.deleteNote(this.props.noteId, function(){
            this.setState({
                loading: false
            });
            this.props.onNoteDelete();
        }.bind(this));
    },


    render: function () {
        var name = (this.state.name == undefined) ? '' : this.state.name;
        var content = this.state.content;
        var saveDisabled = !this.state.needToSave;
        if (this.state.name == undefined){
            saveDisabled = true;
        }

        return (
            <div style={this.componentStyle.placeholder}>


                    <div>
                        <div style={this.componentStyle.namePlaceholder} className={'ui form'}>
                            <div className="field">
                                <label>Название заметки <sup style={{color: '#FC636B'}} >*</sup></label>
                                <input type="text" placeholder={'Название заметки'} value={name} onChange={this.onNameChange} />
                            </div>
                        </div>

                        <div style={this.componentStyle.contentPlaceholder}>
                            <PatientEditor value={this.state.defaultContent}
                                           onContentChange={this.onContentChange} />
                        </div>

                        {this.props.categoryMode == false ? null :
                            <div style={this.componentStyle.notesGroupSelectPlaceholder}>
                                <div>
                                    Категория заметки:
                                </div>
                                <NotesGroupSelect onSelect={this.onSelect} selectedGroups={[this.state.groupId]} groups={this.props.groupsList} />
                            </div>
                        }

                        <div style={this.componentStyle.saveButtonPlaceholder}>
                            <button style={this.componentStyle.saveButton} disabled={saveDisabled} className={'ui primary button'} onClick={this.onSave} >
                                <i className={'save icon'} ></i> Сохранить
                            </button>
                        </div>

                        {this.props.noteId == undefined ? null :
                            <div style={this.componentStyle.deleteBlock}>
                                <DeleteButton onDelete={this.onDelete} />
                            </div>
                        }
                    </div>


                    <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                        <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                    </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdateNotePanel;