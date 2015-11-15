/**
 * Created by sabir on 22.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var Dialog = require('../../dialog/Dialog');

var SelfLoadingMaterialUpdatePanel = require('../dialogs/SelfLoadingMaterialUpdatePanel');

var MaterialCreateButton = React.createClass({
    getDefaultProps: function () {
        return {
            iconClassName: 'plus icon',
            buttonName: 'Новое видео',
            onMaterialCreated: function(m){
                console.log('onMaterialCreated: default func ', m);
            },
            allGroupsList: []
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps){

    },

    componentDidMount: function () {

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

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },


        dialogPanelStyle: {
            width: 800
        }
    },

    onMaterialCreated: function(m){
        this.props.onMaterialCreated(m);
        this.hideDialog();
    },

    getDialogContent: function(){
        if (this.state.dialogVisible == false){
            return null;
        }
        return (
            <div style={{padding: 10}}>
                <SelfLoadingMaterialUpdatePanel
                    onMaterialCreated={this.onMaterialCreated}
                    teacherId={this.props.teacherId}
                    allGroupsList={this.props.allGroupsList} />
            </div>
        );
    },


    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={'ui basic grey button'} onClick={this.showDialog} >
                    <i className={this.props.iconClassName} ></i>
                    {this.props.buttonName}
                </button>

                <Dialog dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={this.state.dialogVisible} onClose={this.hideDialog} content={this.getDialogContent()} />

            </div>
        );
    }

});

module.exports = MaterialCreateButton;