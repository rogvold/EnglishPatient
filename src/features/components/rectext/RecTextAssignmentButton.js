/**
 * Created by sabir on 22.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var RecTextAssignmentPanel = require('./RecTextAssignmentPanel');

var RecTextAssignmentButton = React.createClass({
    getDefaultProps: function () {
        return {
            feedItemId: undefined,

            buttonName: 'REC-TEXT',
            buttonClassName: 'ui button mini basic',
            icon: 'icon selected radio',

            onSaved: function(recTextTask){

            },

            onDeleted: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onSaved: function(recTextTask){
        this.onClose();
        this.props.onSaved(recTextTask);
    },

    onDeleted: function(){
        this.onClose();
        this.props.onDeleted();
    },

    getDialogContent: function(){
        return (
            <div>
                <RecTextAssignmentPanel
                    feedItemId={this.props.feedItemId}
                    onSaved={this.onSaved} />
            </div>
        );
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 700,
            padding: 10
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.show} >
                    {this.props.icon == undefined ? null :
                        <span>
                            <i className={this.props.icon} ></i>
                        </span>
                    }
                    {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        level={100}
                        content={this.getDialogContent()}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={true} onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = RecTextAssignmentButton;