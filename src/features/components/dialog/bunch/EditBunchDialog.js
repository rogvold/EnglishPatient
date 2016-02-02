/**
 * Created by sabir on 19.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var ExerciseMixin = require('../../../mixins/ExerciseMixin');

var DeleteButton = require('../../buttons/DeleteButton');

var FileUploadButton = require('../../file/FileUploadButton');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var EditBunchDialog = React.createClass({
    getDefaultProps: function () {
        return {
            visible: false,
            teacherId: undefined,
            bunchId: undefined,
            groupId: undefined,
            name: undefined,
            description: undefined,
            avatar: undefined,
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
            avatar: this.props.avatar,
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
            avatar: np.avatar,
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
        },

        left: {
            width: 250,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        cardPlaceholder: {
            height: 160,
            width: '100%'
        },

        removeAvatarPlaceholder: {
            padding: 7,
            marginTop: 5,
            cursor: 'pointer'
        },

        right: {
            paddingLeft: 10,
            display: 'inline-block',
            verticalAlign: 'top',
            width: 650
        }
    },

    onAvatarUploaded: function(url){
        this.setState({
            avatar: url,
            needToSave: true
        });
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
        ExerciseMixin.updateExerciseGroup(groupId, this.props.teacherId, this.state.name, this.state.description, this.state.avatar, [],
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

                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.cardPlaceholder}>
                        <DialogCard avatar={this.state.avatar} name={this.state.name} />
                    </div>



                    {this.state.avatar == undefined ?
                        <div style={{marginTop: 5}} >
                            <FileUploadButton
                                icon={'icon cloud upload'}
                                buttonName={'загрузить аватар'}
                                className={'ui fluid basic button'}
                                onFileUploaded={this.onAvatarUploaded} />
                        </div>
                        :
                        <div className={'ui red message'} style={this.componentStyle.removeAvatarPlaceholder}>
                            <i className={'icon trash'} ></i> Удалить аватар
                        </div>
                    }

                </div>

                <div style={this.componentStyle.right}>
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
                </div>



                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    },



    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <Dialog content={this.getContent()}
                        dialogPanelStyle={{width: 922}}
                        onClose={this.props.onClose} visible={this.props.visible} />

            </div>
        );
    }

});

module.exports = EditBunchDialog;