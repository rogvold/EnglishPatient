/**
 * Created by sabir on 20.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var Dialog = require('../../dialog/Dialog');

var SelfLoadingDialogPanel = require('./SelfLoadingDialogPanel');

var DialogViewButton = React.createClass({
    getDefaultProps: function () {
        return {
            dialogId: undefined,
            userId: undefined,

            buttonStyle: {

            },

            buttonName: 'посмотреть',
            icon: 'icon unhide',
            buttonClassName: 'ui mini basic button'



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

    getDialogContent: function(){
        return (
            <div>

                <SelfLoadingDialogPanel userId={this.props.userId} dialogId={this.props.dialogId} />

            </div>
        );
    },

    componentStyle: {
        placeholder: {

        },

        dialogPanelStyle: {
            width: 620,
            padding: 5
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.onShow} >
                    <i className={this.props.icon} ></i>
                    {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog level={1000}
                        content={this.getDialogContent()}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={true} onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = DialogViewButton;