/**
 * Created by sabir on 21.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var NotesMixin = require('../../mixins/NotesMixin');

var DeleteButton = require('../../components/buttons/DeleteButton');

var SelfLoadingGroupPanel = React.createClass({
    getDefaultProps: function () {
        return {
            groupId: undefined,
            teacherId: undefined,
            onGroupUpdated: function(note){
                console.log('onGroupUpdated: note = ', note);
            },
            onGroupCreated: function(note){
                console.log('onGroupUpdated');
            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            name: undefined,
            needToSave: false
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function () {
        //this.loadNote({});
        if (this.props.groupId == undefined){
            return;
        }

        this.loadGroup(this.props.groupId, function(group){
            console.log('SelfLoadingGroupPanel: group loaded: ', group);
        });

    },

    loadGroup: function(groupId, callback){
        this.setState({
            loading: true
        });

        var self = this;
        NotesMixin.loadNoteGroup(groupId, function(group){
            self.setState({
                loading: false,
                name: group.name
            });
            callback(group);
        });
    },

    componentStyle: {
        placeholder: {

        },

        bottomButtonPlaceholder: {
            paddingTop: 10,
            marginTop: 10,
            borderTop: '1px solid #EFF0F1'
        },

        deleteButtonPlaceholder: {
            paddingTop: 10,
            marginTop: 10,
            borderTop: '1px solid #EFF0F1'
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

    onSave: function(){
        var name = this.state.name;
        var self = this;
        if (this.props.teacherId == undefined){
            alert('teacher id is not defined !');
            return;
        }
        NotesMixin.updateNoteGroup(this.props.groupId, this.props.teacherId, name, undefined, function(note){
            if (self.props.groupId == undefined){
                self.props.onGroupCreated(note);
            }else{
                self.props.onGroupUpdated(note);
            }
        }.bind(this));
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        var self = this;
        NotesMixin.deleteGroup(this.props.groupId, function(){
            self.props.onGroupDeleted();
        })
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                <div className="ui form">
                    <div className="field">
                        <label>Название категории</label>
                        <input type="text" placeholder={'Название категории'} onChange={this.onNameChange} value={this.state.name} />
                    </div>
                </div>

                <div style={this.componentStyle.bottomButtonPlaceholder}>
                    <button className={'ui primary button'} onClick={this.onSave}>
                        <i className={'icon save'} ></i>
                        Сохранить
                    </button>
                </div>

                <div style={this.componentStyle.deleteButtonPlaceholder} >
                    <DeleteButton onDelete={this.onDelete} />
                </div>


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingGroupPanel;