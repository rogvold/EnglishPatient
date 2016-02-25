/**
 * Created by sabir on 21.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoUploadPanel = require('./VimeoUploadPanel');
var Dialog = require('../../../dialog/Dialog');

var VimeoUploadButton = React.createClass({
    getDefaultProps: function () {
        return {

            buttonName: 'Загрузить видео',
            buttonClassName: 'ui basic button',
            buttonIcon: 'icon upload',

            onUpload: function(vimeoId, videoInfo){

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            isLoading: undefined,
            vimeoId: undefined,
            videoInfo: undefined
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
            width: 640,
            padding: 10
        },


        okButtonPlaceholder: {
            textAlign: 'right',
            paddingTop: 10,
            borderTop: '1px solid #EFF0F1'
        },

        buttonPlaceholder: {
            marginTop: 10
        }

    },

    onUploadingStarted: function(){
        this.setState({
            isLoading: true
        });
    },

    onUploadingFinished: function(vimeoId, videoInfo){
        this.setState({
            isLoading: false,
            vimeoId: vimeoId,
            videoInfo: videoInfo
        });
    },

    onClose: function(){
        var isLoading = this.state.isLoading;
        if (isLoading == true){
            if (confirm('Вы действительно хотите прервать загрузку?') == false){
                return;
            }
        }
        this.setState({
            dialogVisible: false
        });
    },

    onSubmit: function(){
        this.props.onUpload(this.state.vimeoId, this.state.videoInfo);
        this.setState({
            dialogVisible: false
        });
    },

    show: function(){
        this.setState({
            dialogVisible: true
        });
    },

    getDialogContent: function(){
        var buttonIsDisabled = (this.state.isLoading == true || this.state.isLoading == undefined);
        return (
            <div>
                <VimeoUploadPanel
                                    onUploadingStarted={this.onUploadingStarted}
                                    onUploadingFinished={this.onUploadingFinished}
                    />

                {this.state.isLoading == undefined ? null :
                    <div style={this.componentStyle.okButtonPlaceholder}>
                        <button className={'ui button patientPrimary'} disabled={buttonIsDisabled} onClick={this.onSubmit} >
                            <i className={'icon check circle outline'} ></i> OK
                        </button>
                    </div>
                }

            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.show} >
                    <i className={this.props.buttonIcon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true} level={100000000}
                            content={this.getDialogContent()}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                            onClose={this.onClose}
                        />
                }

            </div>
        );
    }

});

module.exports = VimeoUploadButton;