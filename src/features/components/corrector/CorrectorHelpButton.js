/**
 * Created by sabir on 25.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var Dialog = require('../../components/dialog/Dialog');

var CorrectorPanel = require('./CorrectorPanel');

var CorrectorHelpButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonClassName: 'ui basic grey button',
            buttonName: 'Конструктор коментария',
            iconClassName: 'icon wizard',
            buttonStyle: {

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
            width: 650,
            background: 'none ',
            height: '90vh',
            marginTop: '9vh'
        }
    },

    getDialogContent: function(){

        return (
            <div>
                <CorrectorPanel />
            </div>
        );

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


    render: function () {

        var bStyle = assign({}, this.props.buttonStyle);

        return (
            <div style={this.componentStyle.placeholder}>

                <button style={bStyle} className={this.props.buttonClassName} onClick={this.showDialog} >
                    <i className={this.props.iconClassName}  ></i> {this.props.buttonName}
                </button>

                <Dialog dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={this.state.dialogVisible} onClose={this.hideDialog} content={this.getDialogContent()} />


            </div>
        );
    }

});

module.exports = CorrectorHelpButton;