/**
 * Created by sabir on 03.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingUpdateLessonInfoPanel = require('./SelfLoadingUpdateLessonInfoPanel');

var CreateLessonButton = React.createClass({
    getDefaultProps: function () {
        return {
            courseId: undefined,

            buttonName: 'Добавить блок',
            icon: 'icon plus',
            buttonClassName: 'ui button basic',

            level: 10,

            onCreated: function(){

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

    getDialogContent: function(){
        return (
            <div>

                <h3 style={{textAlign: 'center'}} >
                    Создание нового блока
                </h3>

                <SelfLoadingUpdateLessonInfoPanel
                                                    courseId={this.props.courseId}
                                                    onCreated={this.onCreated} />

            </div>
        );
    },

    onCreated: function(data){
        this.onClose();
        this.props.onCreated();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={this.getDialogContent()}
                            visible={true}
                            leve={this.props.level}
                            onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle} />
                }

            </div>
        );
    }

});

module.exports = CreateLessonButton;