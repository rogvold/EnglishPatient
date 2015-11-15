/**
 * Created by sabir on 15.08.15.
 */

var React = require('react');
var assign = require('object-assign');
var ReactModalOverlay = require('../modal/ReactModalOverlay');
var ParseFileUploadForm = require('../fileUploader/ParseFileUploadForm');


var FileUploadButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonName: 'Загрузить',
            buttonClassName: 'ui button',
            icon: 'ui upload icon',
            fileUploaded: function(url){

            },
            buttonStyle: {

            }
        }
    },

    getInitialState: function () {
        return {
            modalIsVisible: false,
            fileUploaded: false,
            url: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        uploadButton:{

        }



    },

    onClick: function(){
        this.setState({
            modalIsVisible: true
        });
    },

    onModalClose: function(){
        console.log('FileUploadButton: onModalClose occured');
          this.setState({
              modalIsVisible: false
          });
    },

    fileUploaded: function(url){
        console.log('uploaded file: url = ', url);
        this.setState({
            url: url,
            fileUploaded: true
        });
    },

    uploadedFileConfirmed: function(url){
        console.log('confirmed: ', url);
        this.props.fileUploaded(url);
        this.setState({
            fileUploaded: true,
            url: url,
            modalIsVisible: false
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder} >

                <div className={this.props.buttonClassName} style={assign({}, this.componentStyle.uploadButton, this.props.buttonStyle)} onClick={this.onClick} >
                    <i className={this.props.icon} ></i>
                    {this.props.buttonName}
                </div>

                <ReactModalOverlay onClose={this.onModalClose} isVisible={this.state.modalIsVisible} >
                    <ParseFileUploadForm fileUploaded={this.fileUploaded} fileConfirmed={this.uploadedFileConfirmed} >
                    </ParseFileUploadForm>
                </ReactModalOverlay>
            </div>
        );
    }
});


module.exports = FileUploadButton;