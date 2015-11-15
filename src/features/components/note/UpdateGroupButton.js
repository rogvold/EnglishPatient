/**
 * Created by sabir on 22.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingGroupPanel = require('./SelfLoadingGroupPanel');
var Dialog = require('../dialog/Dialog');

var UpdateGroupButton = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            groupId: undefined,
            onGroupUpdated: function(note){

            },

            onGroupDeleted: function(){

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


    onGroupUpdated: function(group){
        console.log('CreateNewNotesGroupButton: onGroupCreated occured');
        this.props.onGroupCreated(group);
        this.setState({
            dialogVisible: false
        });
    },

    onGroupDeleted: function(group){
        console.log('CreateNewNotesGroupButton: onGroupDeleted occured');
        this.props.onGroupDeleted(group);
        this.setState({
            dialogVisible: false
        });
    },

    getDialogContent: function(){
        if (this.state.dialogVisible == false){
            return null;
        }
        return (
            <div style={{paddingTop: 20, paddingBottom: 20}}>
                <SelfLoadingGroupPanel onGroupDeleted={this.onGroupDeleted}
                                       onGroupUpdated={this.onGroupUpdated}
                                       teacherId={this.props.teacherId} groupId={this.props.groupId} />
            </div>
        );
    },



    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        button: {
            padding: 6
        },

        dialogPanelStyle: {
            padding: 10,
            paddingTop: 30,
            width: 600,
            textAlign: 'left'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <button onClick={this.showDialog} style={this.componentStyle.button} className={'ui basic grey button mini'} >
                    <i className={'pencil icon'} ></i> изменить
                </button>

                <Dialog dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.hideDialog} visible={this.state.dialogVisible} content={this.getDialogContent()} />

            </div>
        );
    }

});

module.exports = UpdateGroupButton;