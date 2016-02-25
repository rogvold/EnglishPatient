/**
 * Created by sabir on 02.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');
var ClassMixin = require('../../../mixins/ClassMixin');

var DeleteButton = require('../../buttons/DeleteButton');
var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var ArchiveClassButton = require('./ArchiveClassButton');

var PatientEditor = require('../../editor/PatientEditor');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var FileUploadButton = require('../../file/FileUploadButton');

var EditClassButton = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            buttonClassName: 'ui mini basic button',
            buttonIcon: 'icon pencil',
            buttonName: 'редактировать',
            onClassUpdated: function(cl){

            },
            onClassDeleted: function(classId){

            }
        }
    },


    getInitialState: function () {
        return {
            dialogVisible: false,
            loading: false,
            status: 'active',
            name: undefined,
            avatar: undefined,
            description: undefined,
            code: undefined,
            extendedDescription: undefined,
            defaultExtendedDescription: undefined
        }
    },


    componentWillReceiveProps: function (nextProps) {
        var classId = nextProps.classId;
        if (classId == undefined){
            return;
        }
        this.load(classId, function(cl){
            console.log('class loaded: ', cl);
            if (cl == undefined){
                //CommonMixin.forceTransitionTo('/#/');
            }
        });
    },

    componentDidMount: function () {
        var classId = this.props.classId;
        this.load(classId, function(cl){
            console.log('class loaded: ', cl);
            if (cl == undefined){
                //CommonMixin.forceTransitionTo('/#/');
                return;
            }
        });
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        panelPlaceholder: {
            padding: 10,
            position: 'relative'
        },

        panel: {

        },

        buttonPlaceholder: {
            marginTop: 10,
            textAlign: 'right'
        },

        plusButtonStyle: {
            width: 18,
            height: 18,
            padding: 0,
            opacity: 0.8,
            marginRight: 2
        },

        iconStyle: {
            marginRight: 0,
            position: 'absolute',
            top: 4,
            left: 6
        },

        dialogPanelStyle: {
            width: 930
        },

        deleteButtonPlaceholder: {

        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 290,
            padding: 5,
            paddingTop: 0
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 620
        }
    },


    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
        this.load(this.props.classId, function(cl){
            console.log('cl: ', cl);
        });
    },

    hideDialog: function(){
        this.setState({
            dialogVisible: false
        });
    },

    getValFromEvt: function(evt){
        if (evt == undefined){
            return '';
        }
        var val = evt.target.value;
        if (val == undefined){
            return '';
        }
        return val;
    },

    onNameChange: function(evt){
        this.setState({
            name: this.getValFromEvt(evt)
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: this.getValFromEvt(evt)
        });
    },

    onStatusChange: function(status){
        console.log('EditClassButton: status changed: ' + status);
        this.setState({
            status: status
        });
    },

    load: function(classId, callback){
        console.log('loading class: ', classId);
        if (classId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ClassMixin.loadClass(classId, function(cl){
            console.log('Patient Class loaded: ', cl);
            if (cl == undefined){
                this.setState({
                    loading: false
                });
                callback(cl);
                return;
            }
            this.setState({
                loading: false,
                name: cl.name,
                status: cl.status,
                avatar: cl.avatar,
                description: cl.description,
                extendedDescription: cl.extendedDescription,
                defaultExtendedDescription: cl.extendedDescription,
                code: cl.code
            });
            callback(cl);
        }.bind(this));
    },

    onSaveClick: function(){
        var self = this;
        this.setState({
            loading: true
        });
        var classId = this.props.classId;
        var name = this.state.name;
        var description = this.state.description;
        var extendedDescription = this.state.extendedDescription;
        var status = this.state.status;
        var avatar = this.state.avatar;

        //createClass: function(teacherId, name, description, callback)
        ClassMixin.updateClass(classId, name, description, status, extendedDescription, avatar, function(updatedClass){
            self.setState({
                loading: false
            });
            self.props.onClassUpdated(updatedClass);
            self.hideDialog();
        });
        //alert('creating class');
    },

    onDelete: function(){
        var self = this;
        this.setState({
            loading: true
        });
        var classId = this.props.classId;
        ClassMixin.deleteClass(classId, function(){
            self.setState({
                loading: false
            });
            self.props.onClassDeleted(classId);
        });
    },

    onContentChange: function(val){
        this.setState({
            extendedDescription: val
        });
    },

    onAvatarChange: function(url){
        this.setState({
            avatar: url
        });
    },

    getDialogContent: function(){
        var classId = this.props.classId;
        if (classId == undefined){
            return null;
        }
        var ava = (this.state.avatar == undefined) ? 'http://www.bhmpics.com/wallpapers/andromeda_galaxy_space-1920x1080.jpg' : this.state.avatar;

        return (
            <div style={this.componentStyle.panelPlaceholder}>

                <div style={{color: 'black', marginBottom: 25, textAlign: 'center'}} >
                    <h4>
                        Редактирование класса
                    </h4>
                    <p style={{opacity: 0.8}} >
                        Отредактируйте информацию о классе и нажмите на кнопку "Сохранить"
                    </p>
                </div>

                <div style={this.componentStyle.panel}>

                    <div style={this.componentStyle.left}>
                        <div style={{marginBottom: 10}} >
                            <div style={{width: '100%', height: 160}} >
                                <BackgroundImageContainer image={ava} />
                            </div>
                            {this.state.avatar != undefined ?
                                <div className={'ui red message'} style={{padding: 6, cursor: 'pointer'}}
                                     onClick={this.onAvatarChange.bind(this, undefined)} >
                                    <i className={'trash icon'} ></i> удалить аватар
                                </div> :
                                <div style={{paddingTop: 5, textAlign: 'center'}} >
                                    <FileUploadButton icon={'icon upload '} className={'ui button basic'} buttonName={'Загрузить аватар класса'}
                                                      onFileUploaded={this.onAvatarChange} />
                                </div>
                            }
                        </div>

                        <div className={'ui message'} style={{padding: 6}} >
                            <ArchiveClassButton onStatusChange={this.onStatusChange} status={this.state.status} />
                        </div>

                    </div>




                    <div style={this.componentStyle.right}>

                        <div className="ui form">
                            <div className="field">
                                <input type="text" value={this.state.name} placeholder="Название класса"
                                       onChange={this.onNameChange} />
                            </div>

                            <div className="field">
                        <textarea type="text" value={this.state.description} placeholder="Описание класса"
                                  onChange={this.onDescriptionChange} ></textarea>
                            </div>


                            <div className={'field'}>
                                <label>Расширенное описание класса</label>
                                <PatientEditor value={this.state.defaultExtendedDescription}
                                               onContentChange={this.onContentChange} />
                            </div>


                        </div>

                        <div style={this.componentStyle.buttonPlaceholder}>
                            <button className={'ui button primary'} onClick={this.onSaveClick} style={{marginRight: 0}} >
                                <i className={'icon save'} ></i> Сохранить
                            </button>
                        </div>

                        <div style={this.componentStyle.deleteButtonPlaceholder}>
                            <DeleteButton onDelete={this.onDelete} />
                        </div>


                    </div>

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

                <button onClick={this.showDialog}
                        className={this.props.buttonClassName} style={{padding: 7}} >
                    <i className={this.props.buttonIcon} style={{marginRight: 0}} ></i>

                    {this.props.buttonName}

                </button>

                <Dialog content={this.getDialogContent()} visible={this.state.dialogVisible}
                        onClose={this.hideDialog} dialogPanelStyle={this.componentStyle.dialogPanelStyle} />

            </div>
        );
    }

});

module.exports = EditClassButton;