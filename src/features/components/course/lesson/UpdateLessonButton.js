/**
 * Created by sabir on 03.01.16.
 */


var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingUpdateLessonInfoPanel = require('./SelfLoadingUpdateLessonInfoPanel');

var UpdateLessonButton = React.createClass({
    getDefaultProps: function () {
        return {
            lessonId: undefined,

            buttonName: 'Редактировать блок',
            icon: 'icon pencil',
            buttonClassName: 'ui basic button',
            level: 103,

            onUpdated: function(data){

            },

            onDeleted: function(){
                console.log('UpdateLessonButton: default onDelete occured');
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
            textAlign: 'left',
            width: 840,
            padding: 10
        }
    },

    onUpdated: function(data){
        this.onClose();
        this.props.onUpdated(data);
    },

    onDeleted: function(){
        console.log('UpdateLessonButton: onDelete occured');
        this.onClose();
        this.props.onDeleted();
    },

    getDialogContent: function(){
        var lessonId = this.props.lessonId;
        if (lessonId == undefined){
            return null;
        }
        return (
            <div style={{color: 'rgba(0, 0, 0, 0.870588)'}} >

                <h3 style={{textAlign: 'center'}} >
                    Обновление урока
                </h3>

                <SelfLoadingUpdateLessonInfoPanel
                    lessonId={this.props.lessonId}
                    onDeleted={this.onDeleted}
                    onUpdated={this.onUpdated} />

            </div>
        );
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

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>


                {this.state.dialogVisible == false ? null :
                    <Dialog
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={true}
                        level={this.props.level}
                        onClose={this.onClose}
                        content={this.getDialogContent()}
                        />
                }

            </div>
        );
    }

});

module.exports = UpdateLessonButton;