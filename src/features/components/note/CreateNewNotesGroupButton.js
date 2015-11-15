/**
 * Created by sabir on 21.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var SelfLoadingGroupPanel = require('./SelfLoadingGroupPanel');
var Dialog = require('../dialog/Dialog');

var CreateNewNotesGroupButton = React.createClass({
    getDefaultProps: function () {
        return {

            buttonClassName: 'ui mini basic grey button',
            buttonName: 'новая категория',
            style: {

            },
            teacherId: undefined,
            onGroupCreated: function(note){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
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

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onGroupCreated: function(group){
        console.log('CreateNewNotesGroupButton: onGroupCreated occured');
        this.props.onGroupCreated(group);
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
                <SelfLoadingGroupPanel onGroupCreated={this.onGroupCreated} teacherId={this.props.teacherId} />
            </div>
        );
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            padding: 10,
            paddingTop: 30,
            width: 600
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        return (
            <div style={st}>
                <button className={this.props.buttonClassName} style={st} onClick={this.showDialog} >
                    <i className={'plus icon'}></i> {this.props.buttonName}
                </button>

                <Dialog dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.hideDialog} visible={this.state.dialogVisible} content={this.getDialogContent()} />

            </div>
        );
    }

});

module.exports = CreateNewNotesGroupButton;