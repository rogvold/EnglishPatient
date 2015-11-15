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
            description: undefined,
            code: undefined
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
            padding: 10
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
            width: 630
        },

        deleteButtonPlaceholder: {

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
                description: cl.description,
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
        var status = this.state.status;

        //createClass: function(teacherId, name, description, callback)
        ClassMixin.updateClass(classId, name, description, status, function(updatedClass){
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


    getDialogContent: function(){
        var classId = this.props.classId;
        if (classId == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.panelPlaceholder}>

                <div style={{color: 'black', marginBottom: 10}} >
                    <h4>
                        Редактирование класса
                    </h4>
                    <p>
                        Отредактируйте информацию о классе и нажмите на кнопку "Сохранить"
                    </p>
                </div>

                <div className="ui form">
                    <div className="field">
                        <input type="text" value={this.state.name} placeholder="Название класса"
                               onChange={this.onNameChange} />
                    </div>

                    <div className="field">
                        <textarea type="text" value={this.state.description} placeholder="Название класса"
                                  onChange={this.onDescriptionChange} ></textarea>
                    </div>
                </div>

                <div className={'ui message'} >
                    <ArchiveClassButton onStatusChange={this.onStatusChange} status={this.state.status} />
                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={'ui button primary'} onClick={this.onSaveClick} style={{marginRight: 0}} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>
                </div>

                <div style={this.componentStyle.deleteButtonPlaceholder}>
                    <DeleteButton onDelete={this.onDelete} />
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