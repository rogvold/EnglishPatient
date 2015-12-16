/**
 * Created by sabir on 12.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var LoginMixin = require('../../mixins/LoginMixin');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var ClassMixin = require('../../mixins/ClassMixin');

var LeftSidebarTemplate = require('../../components/templates/LeftSidebarTemplate');
var SelfLoadingLeftSidebarClassesList = require('../../components/class/list/SelfLoadingLeftSidebarClassesList');

var GifInstruction = require('../../components/help/GifInstruction');

var LoginApp = require('./LoginApp');

var TeacherHeader = require('../../components/header/teacher/TeacherHeader');

var DeleteButton = require('../../components/buttons/DeleteButton');

var SelfLoadingUpdateNotePanel = require('../../components/note/SelfLoadingUpdateNotePanel');

var NotesList = require('../../components/note/list/NotesList');

var NotesMixin = require('../../mixins/NotesMixin');

var SelfLoadingUpdatableNote = require('../../components/note/SelfLoadingUpdatableNote');

var CreateNewNoteButton = require('../../components/note/CreateNewNoteButton');
var CreateNewNotesGroupButton = require('../../components/note/CreateNewNotesGroupButton');
var UpdateGroupButton = require('../../components/note/UpdateGroupButton');

var NotesGroupsList = require('../../components/note/list/NotesGroupsList');

var NotesGroupSelect = require('../../components/note/select/NotesGroupSelect');

var SidebarChatButton = require('../../components/sidebar/SidebarChatButton');

var NotesApp = React.createClass({
    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            notes: [],
            groups: [],
            selectedGroupId: undefined,
            selectedNoteId: undefined,
            selectedTabName: 'users',
            loggedIn: false,
            user: (LoginMixin.getCurrentUser() == undefined ) ? {} : LoginMixin.getCurrentUser()
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            return false;
        }else{
            this.setState({
                loggedIn: true
            });
        }
        console.log('Exercises App mounted');
        console.log(this.props.params);
        //this.loadNotes(function(notes){
        //    console.log('notes loaed: ', notes);
        //});
        this.load(function(data){
            console.log('loaded: ', data);
        });
    },

    componentStyle: {
        placeholder: {

        },

        contentPlaceholder: {
            width: 1000,
            height: '100%',
            margin: '0 auto'
            //backgroundColor: 'white',

            //borderRight: '1px solid #EFF0F1'
        },

        leftBlock: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 450,
            backgroundColor: '#F7F7F7',
            height: '100%',
            overflowY: 'auto',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1'
        },

        groupsPlaceholder: {
            height: '100%',
            borderRight: '1px solid #EFF0F1',
            width: 220,
            //backgroundColor: 'green',
            display: 'inline-block',
            verticalAlign: 'top',
            position: 'relative',
            overflowY: 'auto'
        },

        notesPlaceholder: {
            display: 'inline-block',
            width: 228,
            height: '100%',
            verticalAlign: 'top',
            overflowY: 'auto'
        },

        rightBlock: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 550,
            height: '100%',
            overflowY: 'auto',
            padding: 4
        },

        notePlaceholder: {
            backgroundColor: 'white',
            borderRadius: 3,
            border: '1px solid #EFF0F1'
        },

        currentNotePlaceholder: {

        },

        notesListPlaceholder: {

        },

        topLeftBlock: {
            padding: 5,
            position: 'relative',
            height: 37,
            fontSize: '12px',
            paddingTop: 9,
            paddingLeft: 9,
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1'
        },

        newNotePlaceholder: {
            position: 'absolute',
            right: 5,
            top: 5
        },

        groupsTopBlock: {
            padding: 5,
            position: 'relative',
            height: 37,
            paddingTop: 9,
            fontSize: '12px',
            paddingLeft: 9,
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1'
        },

        bottomGroupsListPlaceholder: {
            position: 'absolute',
            bottom: 5,
            width: '100%',
            textAlign: 'center',
            borderTop: '1px solid #EFF0F1'
        }


    },

    updateAuth: function(){
        ParseMixin.initParse();
        if (LoginMixin.isLoggedIn() == false){
            this.setState({
                loggedIn: false
            });
        }else{
            this.setState({
                loggedIn: true
            });
        }
    },


    loadNotes: function(callback){
        var teacherId = (this.state.user == undefined ) ? undefined : this.state.user.id;
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        NotesMixin.loadNotes(teacherId, function(notes){
            this.setState({
                loading: false,
                notes: notes,
                selectedNoteId: (notes == undefined || notes.length == 0) ? undefined : notes[0].id
            });
            callback(notes);
        }.bind(this))

    },

    load: function(callback){
        var teacherId = (this.state.user == undefined ) ? undefined : this.state.user.id;
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        NotesMixin.loadGroupsAndNotes(teacherId, function(groups){
            console.log('loadGroupsAndNotes loaded: ', groups);
            var groupsList = groups.map(function(gr){
                return {
                    name: gr.group.name,
                    description: gr.group.description,
                    id: gr.group.id,
                    groupId: gr.group.id
                }
            });

            var notes = this.getNotesByGroupId(undefined, groups);
            var selectedNoteId = (notes == undefined || notes.length == 0) ? undefined: notes[0].id;
            this.setState({
                groups: groups,
                loading: false,
                notes: notes,
                selectedGroupId: undefined,
                selectedNoteId: selectedNoteId,
                groupsList: groupsList
            });
        }.bind(this));
    },

    getSidebar: function(){
        return (
            <div>

                <SidebarChatButton />

                <SelfLoadingLeftSidebarClassesList  teacherId={this.state.user.id}
                    selectedClassId={this.props.params.classId} />
            </div>
        );
    },

    getHeader: function(){
        var userId = this.state.user.id;
        return (
            <TeacherHeader userId={userId} activeTab={'notes'} onLogout={this.updateAuth}  />
        );
    },

    logChange: function(val, b){
        console.log(val, b);
        console.log(typeof val);
    },

    onTextChange: function(value) {
        this.setState({ text:value });
    },

    getEditorContents: function(){
        return this.state.text;
    },

    onNoteClick: function(id){
        console.log('NotesApp: onNoteClick: id = ' + id);
        this.setState({
            selectedNoteId: id
        });
    },

    getGroupIdByNoteId: function(noteId){
        var groups = this.state.groups;
        for (var i in groups){
            var group = groups[i].group;
            var notes = groups[i].notes;
            for (var j in notes){
                if (notes[j].id == noteId){
                    return group.id;
                }
            }
        }
        return undefined;
    },

    onNoteUpdate: function(note){
        this.load(function(data){
            console.log('loaded: ', data);

            var noteId = (note == undefined) ? undefined : note.id;
            var groupId = this.getGroupIdByNoteId(noteId);
            this.setState({
                selectedNotedId: noteId,
                selectedGroupId: groupId
            });

        }.bind(this));



        //this.setState({
        //    selectedNoteId: this.state.selectedNoteId
        //});
    },

    onNoteDelete: function(){
        this.load(function(data){
            console.log('loaded: ', data);
        });
    },

    onNoteCreate: function(note){
        this.load(function(data){
            console.log('loaded: ', data);
        });
    },

    onGroupCreated: function(group){
        this.load(function(data){
            console.log('loaded: ', data);
        });
    },

    onGroupUpdated: function(group){
        this.load(function(data){
            console.log('loaded: ', data);
        });
    },

    onGroupDeleted: function(){
        this.load(function(data){
            console.log('loaded: ', data);
        }.bind(this));
    },

    getNoDataBlock: function(){
        return (
            <div style={{paddingTop: 50}}>
                <GifInstruction text={'Добро пожаловать! У вас еще нет ни одной заметки'} url={'https://d3ki9tyy5l5ruj.cloudfront.net/obj/c06fded71d4261a939460e0f0e02d4385c2ffe1d/empty_inbox.svg'} />
                <div style={{marginTop: 40}}>
                    <div style={{margin: '0 auto', width: 262}}>
                        <CreateNewNoteButton buttonName={'Создать мою первую заметку'} buttonClassName={'ui button basic grey'} teacherId={this.state.user.id} onNoteCreate={this.onNoteCreate} />
                    </div>
                </div>
            </div>
        );
    },

    getNotesByGroupId: function(id, groups){
        var notes = [];
        var g = undefined;
        if (groups == undefined){
            var groups = this.state.groups;
        }
        for (var i in groups){
            if (groups[i].group.id == id){
                notes = groups[i].notes;
            }
        }
        return notes;
    },

    onGroupClick: function(id){
        var notes = this.getNotesByGroupId(id);
        var selectedNoteId = (notes == undefined || notes.length == 0) ? undefined : notes[0].id;
        this.setState({
            selectedGroupId: id,
            notes: notes,
            selectedNoteId: selectedNoteId
        });
    },

    getContent: function(){
        var teacherId = this.state.user.id;
        var notesEmpty = (this.state.notes == undefined || this.state.notes.length == 0);

        notesEmpty = false;

        return (
            <div style={this.componentStyle.contentPlaceholder}>

                {notesEmpty == true ?
                    <div>
                        {this.getNoDataBlock()}
                    </div>
                    :
                    <div style={{height: '100%'}}>
                        <div style={this.componentStyle.leftBlock}>


                            <div style={this.componentStyle.groupsPlaceholder}>
                                <div style={this.componentStyle.groupsTopBlock}>
                                    Категории ({this.state.groups.length})
                                </div>

                                <div>
                                    <NotesGroupsList onGroupClick={this.onGroupClick} selectedGroupId={this.state.selectedGroupId} groups={this.state.groupsList} />
                                </div>

                                <div style={this.componentStyle.bottomGroupsListPlaceholder}>
                                    <UpdateGroupButton onGroupDeleted={this.onGroupDeleted} teacherId={teacherId}
                                                       groupId={this.state.selectedGroupId}
                                                       onGroupUpdated={this.onGroupUpdated} />

                                    <CreateNewNotesGroupButton style={{padding: 6}} teacherId={teacherId} onGroupCreated={this.onGroupCreated} />

                                </div>

                            </div>

                            <div style={this.componentStyle.notesPlaceholder}>

                                {this.state.notes.length == 0 ?
                                    <div style={{padding: 10}} >
                                        В этой категории нет заметок.
                                        <div style={{marginTop: 15}}>
                                            <CreateNewNoteButton teacherId={teacherId} buttonName="Добавить заметку" groups={this.state.groupsList}
                                                                 onNoteCreate={this.onNoteCreate} />
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div style={this.componentStyle.topLeftBlock}>
                                            Заметки ({this.state.notes.length})
                                            <div style={this.componentStyle.newNotePlaceholder}>
                                                <CreateNewNoteButton teacherId={teacherId} groups={this.state.groupsList}
                                                                     onNoteCreate={this.onNoteCreate} />
                                            </div>
                                        </div>
                                        <div style={this.componentStyle.notesListPlaceholder}>
                                            <NotesList notes={this.state.notes} selectedId={this.state.selectedNoteId} onNoteClick={this.onNoteClick} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div style={this.componentStyle.rightBlock}>
                            {this.state.selectedNoteId == undefined ?
                                <div>

                                </div>
                                :
                                <div style={this.componentStyle.currentNotePlaceholder}>
                                    <div style={this.componentStyle.notePlaceholder}>
                                        <SelfLoadingUpdatableNote groupsList={this.state.groupsList} onNoteDelete={this.onNoteDelete} onNoteUpdate={this.onNoteUpdate} noteId={this.state.selectedNoteId} teacherId={teacherId} />
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                }
                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>
            </div>

        );
    },

    getFooter: function(){

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                {this.state.loggedIn == false ?
                    <div>
                        <LoginApp />
                    </div> :
                    <LeftSidebarTemplate sidebar={this.getSidebar()} header={this.getHeader()} footer={this.getFooter()} content={this.getContent()} />
                }
            </div>
        );
    }

});

module.exports = NotesApp;