/**
 * Created by sabir on 03.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var VideoSelectPanel = require('./VideoSelectPanel');

var Dialog = require('../dialog/Dialog');

var AddVideoButton = React.createClass({
    getDefaultProps: function () {
        return {

            buttonName: 'Добавить видео',
            icon: 'icon video',
            buttonClassName: 'ui button basic',

            vimeoId: undefined,
            youtubeId: undefined,
            start: undefined,
            end: undefined,
            avatar: undefined,
            duration: undefined,

            style: {

            },

            onChange: function(data){

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

    onClose: function(){
        this.setState({
                dialogVisible: false
            }
        );
    },

    show: function(){
        this.setState({
                dialogVisible: true
            }
        );
    },


    onOk: function(data){
        this.onClose();
        this.props.onChange(data);
    },

    componentStyle: {
        placeholder: {
            //display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 520,
            padding: 10
        },

        buttonStyle: {
            display: 'inline-block'
        }
    },

    getDialogContent: function(){
        return (
            <div>
                <VideoSelectPanel
                    youtubeId={this.props.youtubeId}
                    vimeoId={this.props.vimeoId}
                    start={this.props.start}
                    end={this.props.end}
                    duration={this.props.duration}
                    avatar={this.props.avatar}

                    onOk={this.onOk}
                    />
            </div>
        );
    },

    render: function () {

        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);


        return (
            <div style={this.componentStyle.placeholder}>


                <button style={st} className={this.props.buttonClassName} onClick={this.show} >
                    <i className={this.props.icon} ></i>
                    {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={true}
                        level={300}
                        content={this.getDialogContent()}
                        onClose={this.onClose}
                        />
                }

            </div>
        );
    }

});

module.exports = AddVideoButton;