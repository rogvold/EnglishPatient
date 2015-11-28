/**
 * Created by sabir on 26.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var UserProfilePanel = require('./UserProfilePanel');

var UserProfileButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            icon: '',
            buttonName: 'Профиль'
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
            width: 900,
            backgroundColor: 'transparent'
        }
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    userUpdated: function(){
        window.location.reload();
    },

    getDialogContent: function(){
        return (
            <div>
                <UserProfilePanel userUpdated={this.userUpdated}
                    userId={this.props.userId} />
            </div>
        );
    },

    open: function(){
        this.setState({
            dialogVisible: true
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <span onClick={this.open}>
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </span>


                {this.state.dialogVisible == false ? null :
                    <Dialog
                        level={1000}
                        visible={true}
                        content={this.getDialogContent()}
                        onClose={this.onClose}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle} />
                }

            </div>
        );
    }

});

module.exports = UserProfileButton;