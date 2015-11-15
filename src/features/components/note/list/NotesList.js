/**
 * Created by sabir on 20.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var NoteListItem = require('./NoteListItem');

var NotesList = React.createClass({
    getDefaultProps: function () {
        return {
            notes: [],
            selectedId: undefined,
            onNoteClick: function(noteId){

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

    onNoteClick: function(id){
        console.log('NoteList: onNoteCLick: id = ' + id);
        this.props.onNoteClick(id);
    },

    componentStyle: {
        placeholder: {
            height: '100%',
            width: '100%'
            //borderRight: '1px solid #EFF0F1'
        }
    },

    render: function () {
        var list = this.props.notes;
        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(note, n){
                    var key = 'note_item_' + note.id + '_' + n;
                    var selected = (note.id == this.props.selectedId);
                    var boundClick = this.onNoteClick.bind(this, note.id);
                    return (
                        <NoteListItem key={key} name={note.name} timestamp={note.timestamp} onNoteClick={boundClick}
                                      content={note.content} selected={selected} />
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = NotesList;