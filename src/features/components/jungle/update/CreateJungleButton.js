/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingJungleUpdatePanel = require('./SelfLoadingJungleUpdatePanel');

var Dialog = require('../../dialog/Dialog');

var CreateJungleButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonName: 'Добавить материал',
            icon: 'icon plus',
            buttonClassName: 'ui basic button',
            userId: undefined,
            onCreated: function(m){

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
            width: 900
        }
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onCreated: function(m){
        this.props.onCreated(m);
        this.onClose();
    },

    getDialogContent: function(){
        return (
            <div>
                <SelfLoadingJungleUpdatePanel
                    userId={this.props.userId}
                    onCreated={this.onCreated} />
            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={this.getDialogContent()}
                            dialogPanelStyle={this.dialogPanelStyle}
                            level={10} visible={true} onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = CreateJungleButton;