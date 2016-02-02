/**
 * Created by sabir on 20.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingDialogsSearchList = require('./SelfLoadingDialogsSearchList');
var SellLoadingDialogsTotalSearchList = require('./SellLoadingDialogsTotalSearchList');

var DialogSearchButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            buttonName: 'Диалог',
            icon: 'icon users',
            buttonClassName: 'ui mini basic grey button',

            onSelect: function(dialog){

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
            width: 730,
            padding: 5
        }
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onShow: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onSelect: function(dialog){
        this.props.onSelect(dialog);
        this.onClose();
    },

    getDialogContent: function(){
        return (
            <SellLoadingDialogsTotalSearchList onSelect={this.onSelect} />
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.onShow} >
                    <i className={this.props.icon} ></i>
                    {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog level={100}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.onClose}
                        visible={true} content={this.getDialogContent()}
                        />
                }

            </div>
        );
    }

});

module.exports = DialogSearchButton;