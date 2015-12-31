/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingUpdateCoursePanel = require('./SelfLoadingUpdateCoursePanel');

var Dialog = require('../../dialog/Dialog');

var CreateCoursePanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,

            buttonName: 'Создать курс',
            icon: 'icon plus',
            buttonClassName: 'ui basic button',

            onCourseCreated: function(course){
                console.log('onCourseCreated : default: course = ', course);
            },

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

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {

        },

        dialogPanelStyle: {
            width: 820
        }
    },

    onCourseCreated: function(course){
        this.props.onCourseCreated(course);
        this.onClose();
    },

    getDialogContent: function(){
        return (
            <div>
                <SelfLoadingUpdateCoursePanel
                    userId={this.props.userId}
                    onCourseCreated={this.onCourseCreated} />
            </div>
        );
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

module.exports = CreateCoursePanel;