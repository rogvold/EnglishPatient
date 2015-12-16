/**
 * Created by sabir on 16.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingChatMessagesPanel = require('./SelfLoadingChatMessagesPanel');

var Dialog = require('../dialog/Dialog');

var ChatPanel = require('../chat/ChatPanel');

var ChatButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            friendId: undefined,
            role: undefined,

            sidebarEnabled: true,
            buttonName: 'Открыть диалог',
            //icon: 'icon comments',
            icon: undefined,
            buttonClassName: 'ui basic grey button',
            style: {

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

    getDialogContent: function(){
        return (
            <ChatPanel userId={this.props.userId}
                       role={this.props.role}
                       friendId={this.props.friendId} />
        );
    },

    onShowClick: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {

        },

        dialogPanelStyle: {
            width: 860,
            padding: 5,
            backgroundColor: 'transparent'
        }
    },

    render: function () {

        var buttonSt = assign({}, this.componentStyle.buttonStyle, this.props.style);


        return (
            <div style={this.componentStyle.placeholder}>

                <span style={buttonSt} className={this.props.buttonClassName} onClick={this.onShowClick} >
                    {this.props.icon == undefined ? null :
                        <i className={this.props.icon} ></i>
                    }
                    {this.props.buttonName}
                </span>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            onClose={this.onClose} content={this.getDialogContent()} />
                }

            </div>
        );
    }

});

module.exports = ChatButton;