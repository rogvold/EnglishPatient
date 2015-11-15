/**
 * Created by sabir on 19.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var DeleteButton = require('../../buttons/DeleteButton');

var EditBunchDialog = React.createClass({
    getDefaultProps: function () {
        return {
            visible: false,
            teacherId: undefined,
            bunchId: undefined,
            groupId: undefined,
            name: undefined,
            description: undefined,
            access: undefined,
            onClose: function(){

            },
            onGroupUpdate: function(g){

            }
        }
    },

    getInitialState: function () {
        return {
            bunchId: this.props.bunchId,
            name: this.props.name,
            description: this.props.description,
            access: this.props.access,
            needToSave: false
        }
    },

    componentWillReceiveProps: function (np) {
        this.setState({
            bunchId: np.bunchId,
            name: np.name,
            description: np.description,
            access: np.access,
            needToSave: false,
            loading: false
        });
    },

    componentDidMount: function () {

    },

    onEdit: function(){

    },

    componentStyle: {
        placeholder: {

        },

        contentPlaceholder: {
            padding: 10,
            paddingTop: 30
        },

        label: {
            color: '#2E3C54',
            fontSize: '14px',
            fontWeight: 'bold'
        },

        saveButtonPlaceholder: {
            marginTop: 30,
            paddingTop: 30,
            borderTop: '1px solid #EFF0F1',
            textAlign: 'right'
        },

        deleteButtonPlaceholder: {
            marginTop: 30,
            paddingTop: 30,
            borderTop: '1px solid #EFF0F1',
        }
    },

    getValueFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined) {return undefined;}
        if (val.trim() == '') {
            return undefined;
        }
        return val;
    },

    saveGroup: function(callback){
        console.log('save group occured');
        var groupId = this.props.bunchId;
        //if (groupId == undefined){
        //    console.log('groupId is undefined');
        //    // todo: create
        //    return;
        //}
        this.setState({
            loading: true
        });
        var self = this;
        ExerciseMixin.updateExerciseGroup(groupId, this.props.teacherId, this.state.name, this.state.description, undefined, [],
            function(g){
                self.setState({
                    loading: false,
                    needToSave: false,
                    name: g.name,
                    description: g.description,
                    avatar: g.avatar,
                    tags: g.tags
                });
                callback(g);
            }, function(err){}
        );
    },

    onNameChange: function(evt){
        this.setState({
            name: this.getValueFromEvt(evt),
            needToSave: true
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: this.getValueFromEvt(evt),
            needToSave: true
        });
    },

    onSave: function(){
        this.saveGroup(function(g){
            this.props.onGroupUpdate(g);
        }.bind(this));
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        ExerciseMixin.deleteExerciseGroup(this.props.groupId, function(){
            this.props.onGroupUpdate();
            this.setState({
                loading: false
            });
        }.bind(this));
    },

    getContent: function(){
        var name = (this.state.name == undefined) ? '' : this.state.name;
        var description = (this.state.description == undefined) ? '' : this.state.description;


        return (
            <div style={this.componentStyle.contentPlaceholder} className={'ui form'} >

                <div className="field">
                    <span style={this.componentStyle.label}>Название группы</span>
                    <input type="text" value={name} onChange={this.onNameChange}  placeholder="Название группы" />
                </div>

                <div className="field">
                    <span style={this.componentStyle.label} >Описание группы</span>
                    <textarea value={description} onChange={this.onDescriptionChange} placeholder="Описание группы" ></textarea>
                </div>

                <div style={this.componentStyle.saveButtonPlaceholder}>
                    <button disabled={!this.state.needToSave} className={'ui primary button'} onClick={this.onSave} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>
                </div>


                {this.props.groupId == undefined ? null :
                    <div style={this.componentStyle.deleteButtonPlaceholder}>
                        <DeleteButton onDelete={this.onDelete} />
                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    },



    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <Dialog content={this.getContent()} onClose={this.props.onClose} visible={this.props.visible} />

            </div>
        );
    }

});

module.exports = EditBunchDialog;