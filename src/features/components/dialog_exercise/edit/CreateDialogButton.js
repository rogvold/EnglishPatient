/**
 * Created by sabir on 19.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var DialogEditInfoPanel = require('./DialogEditInfoPanel');

var DialogMixin = require('../../../mixins/DialogMixin');

var CreateDialogButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonName: 'Создать диалог',
            buttonClassName: 'ui button basic ',
            icon: 'icon plus',

            onDialogCreated: function(dialog){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
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

        dialogPanelStyle: {
            width: 865,
            padding: 5,
            textAlign: 'left'
        }
    },

    onUpdate: function(data){
        console.log('onUpdate occured: data = ', data);
        this.setState({
            loading: true
        });
        DialogMixin.updateDialog(this.props.dialogId, data, function(dialog){
            this.setState({
                loading: false,
                dialogVisible: false
            });
            this.props.onDialogCreated(dialog);
        }.bind(this));
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },

    getDialogContent: function(){
        return (
            <div>
                <DialogEditInfoPanel onUpdate={this.onUpdate} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.showDialog} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={this.getDialogContent()} onClose={this.onClose}
                            visible={true}
                            dialogPanelStyle={this.componentStyle.dialogContentStyle} />
                }

            </div>
        );
    }

});

module.exports = CreateDialogButton;