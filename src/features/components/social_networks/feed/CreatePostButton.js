/**
 * Created by sabir on 09.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingUpdatablePost = require('./SelfLoadingUpdatablePost');

var CreatePostButton = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            buttonName: 'Создать пост',
            icon: 'icon plus',
            buttonClassName: 'ui basic button',

            style: {

            },

            onCreated: function(post){

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

    onCreated: function(post){
        this.props.onCreated(post);
        this.onClose();
    },

    getDialogContent: function(){
        return (
            <SelfLoadingUpdatablePost onCreated={this.onCreated} teacherId={this.props.teacherId} />
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

module.exports = CreatePostButton;