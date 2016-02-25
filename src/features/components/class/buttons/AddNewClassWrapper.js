/**
 * Created by sabir on 14.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');
var ClassMixin = require('../../../mixins/ClassMixin');

var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var AddNewClassWrapper = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            onClassCreated: function(cl){
                CommonMixin.forceTransitionTo('/#/class/' + cl.id);
            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            loading: false,
            name: undefined,
            description: undefined
        }
    },


    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

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

        },

        iconStyle: {
            marginRight: 0,
            position: 'absolute',
            top: 4,
            left: 6
        },

        dialogPanelStyle: {
            width: 630
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

    onSaveClick: function(){
        var self = this;
        this.setState({
            loading: true
        });
        var teacherId = this.props.teacherId;
        var name = this.state.name;
        var description = this.state.description;


        //createClass: function(teacherId, name, description, callback)
        ClassMixin.createClass(teacherId, name, description, undefined, function(createdClass){
            self.setState({
                loading: false
            });
            self.props.onClassCreated(createdClass);
            self.hideDialog();
        });
        //alert('creating class');
    },

    canSaveClass: function(){
        var name = (this.state.name == undefined) ? '' : this.state.name;
        var description = (this.state.description == undefined) ? '' : this.state.description;
        if (name.trim() == '' ){
            return false;
        }
        return true;
    },

    getDialogContent: function(){
        var teacherId = this.props.teacherId;
        if (teacherId == undefined){
            return null;
        }
        var canSave = this.canSaveClass();

        return (
            <div style={this.componentStyle.panelPlaceholder}>

                <div style={{color: 'black', marginBottom: 10}} >
                    <h4>
                        Создание класса
                    </h4>
                    <p>
                        Введите название класса и нажмите на кнопку "Сохранить"
                    </p>
                </div>

                <div className="ui form">
                    <div className="field">
                        <input type="text"
                               autoFocus={true}
                               value={this.state.name} placeholder="Название класса"
                               onChange={this.onNameChange} />
                    </div>

                    <div className="field">
                        <textarea type="text" value={this.state.description} placeholder="Описание класса"
                                  onChange={this.onDescriptionChange} ></textarea>
                    </div>
                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={'ui button patientPrimary'} disabled={!canSave}
                            onClick={this.onSaveClick} style={{marginRight: 0}} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>
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

                <div onClick={this.showDialog}
                     className={this.props.buttonClassName}>

                    {this.props.children}

                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={this.getDialogContent()} visible={true}
                            level={1000}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            onClose={this.hideDialog} dialogPanelStyle={this.componentStyle.dialogPanelStyle} />
                }

            </div>
        );
    }

});

module.exports = AddNewClassWrapper;