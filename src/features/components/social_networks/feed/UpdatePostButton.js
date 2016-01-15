/**
 * Created by sabir on 09.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingUpdatablePost = require('./SelfLoadingUpdatablePost');

var UpdatePostButton = React.createClass({
    getDefaultProps: function () {
        return {
            postId: undefined,
            teacherId: undefined,

            buttonName: '',
            icon: 'icon pencil',
            buttonClassName: 'ui basic button',

            style: {

            },

            onUpdated: function(data){

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

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        dialogPanelStyle: {
            width: 1045,
            padding: 10
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

    onUpdated: function(post){
        this.props.onUpdated(post);
        this.onClose();
    },


    onDeleted: function(){
        this.props.onDeleted();
        this.onClose();
    },

    getDialogContent: function(){
        return (
            <SelfLoadingUpdatablePost
                onDeleted={this.onDeleted}
                onUpdated={this.onUpdated} postId={this.props.postId} />
        );
    },

    render: function () {
        var st = assign({}, this.props.style);
        return (
            <div style={this.componentStyle.placeholder}>

                <button style={st} className={this.props.buttonClassName} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.onClose}
                        content={this.getDialogContent()}
                        visible={true}  />
                }


            </div>
        );
    }

});

module.exports = UpdatePostButton;