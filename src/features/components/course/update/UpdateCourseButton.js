/**
 * Created by sabir on 05.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var SelfLoadingUpdateCoursePanel = require('./SelfLoadingUpdateCoursePanel');

var UpdateCourseButton = React.createClass({
    getDefaultProps: function () {
        return {

            courseId: undefined,
            userId: undefined,

            buttonName: 'Редактировать курс',
            icon: 'icon edit',
            buttonClassName: 'ui basic button',

            style: {

            },

            onUpdated: function(course){

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
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 830,
            padding: 5
        },

        buttonStyle: {

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

    onUpdated: function(course){
        this.props.onUpdated(course);
        this.onClose();
    },

    onDeleted: function(){
        this.props.onDeleted(course);
        this.onClose();
    },

    getDialogContent: function(){
        return (
            <SelfLoadingUpdateCoursePanel
                userId={this.props.userId}

                onCourseDeleted={this.onDeleted}
                onCourseUpdated={this.onUpdated}

                courseId={this.props.courseId} />
        );
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} style={st} onClick={this.show} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            content={this.getDialogContent()} onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = UpdateCourseButton;