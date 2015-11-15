/**
 * Created by sabir on 27.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotesMixin = require('../../mixins/NotesMixin');

var SelfLoadingNote = React.createClass({
    getDefaultProps: function () {
        return {
            noteId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            name: undefined,
            content: undefined
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

        });
    },

    loadNote: function(noteId, callback){
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
            minHeight: 50
        },

        notePlaceholder: {

        },

        noteName: {
            fontSize: '16px',
            //padding: 5,
            width: '100%',
            paddingRight: 40,
            paddingBottom: 5,
            fontWeight: 'bold',
            //borderBottom: '1px solid #EFF0F1'
            borderBottom: '1px dotted #EFF0F1'
        },

        noteContent: {
            //padding: 10
        },
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

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingNote;
