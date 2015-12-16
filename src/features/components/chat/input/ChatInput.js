/**
 * Created by sabir on 15.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploader = require('../../file/FileUploader');
var FileUploadButton = require('../../file/FileUploadButton');

var ChatInput = React.createClass({
    getDefaultProps: function () {
        return {
            sending: false,
            onSubmit: function(message){
                console.log(message);
            }

        }
    },

    getInitialState: function () {
        return {
            val: '',
            attachment: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            backgroundColor: '#F6F6F7'
        },

        attachButton: {
            cursor: 'pointer'
        },

        attachmentPlaceholder: {

        },

        attachmentLink: {
            color: '#818997',
            textDecoration: 'underline',
            cursor: 'pointer'
        },

        removeAttachmentButton: {

        },

        bottomBlock: {

        }
    },

    getFileIcon: function(){
        var url = this.state.attachment;
        if (url == undefined){
            return '';
        }
        if (url.indexOf('.jpg') > -1 || url.indexOf('.png') > -1 || url.indexOf('.gif') > -1){
            return 'icon file image outline';
        }
        return 'icon file outline';
    },

    onChange: function(evt){
        var val = evt.target.value;
        this.setState({
            val: val
        });
    },

    canSubmit: function(val){
        if (val == undefined){
            val = '';
        }
        if (val == '' && this.state.attachment == undefined){
            return false;
        }
        return true;
    },

    submit: function(val){
        if (this.canSubmit(val) == false){
            return;
        }
        var m = {
            content: val,
            attachments: (this.state.attachment == undefined) ? [] : [this.state.attachment]
        };
        this.setState({
            attachment: undefined,
            val: ''
        });
        this.props.onSubmit(m);
    },

    onKeyUp: function(event){
        if(event.keyCode == 13){
            var val = event.target.value;
            this.submit(val);
        }
    },

    onFileUploaded: function(url){
        this.setState({
            attachment: url
        });
    },

    removeAttachment: function(){
        this.setState({
            attachment: undefined
        });
    },



    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                    <div className={'ui left action input'} style={{width: '100%'}} >



                        <FileUploadButton
                            onFileUploaded={this.onFileUploaded}
                            icon={'icon attach'} className={'ui icon button'}  />


                        <input type="text" onChange={this.onChange}
                               onKeyUp={this.onKeyUp}
                               value={this.state.val}
                               placeholder="Type your message and press Enter..." />

                    </div>

                    <div style={this.componentStyle.bottomBlock}>

                        {this.state.attachment == undefined ? null :
                            <div style={this.componentStyle.attachmentPlaceholder}>
                                <a href={this.state.attachment} target="_blank"  >
                                    <i className={this.getFileIcon()} ></i> {this.state.attachment.substring(this.state.attachment.lastIndexOf('/') + 1)}</a>

                                <i style={{cursor: 'pointer', color: '#FC636B'}}
                                   className={'icon remove'} onClick={this.removeAttachment} ></i>

                            </div>
                        }

                    </div>

                <div className={'ui inverted dimmer ' + (this.props.sending ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>


            </div>
        );
    }

});

module.exports = ChatInput;