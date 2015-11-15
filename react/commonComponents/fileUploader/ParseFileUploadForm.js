/**
 * Created by sabir on 15.08.15.
 */
var React = require('react');
var assign = require('object-assign');
var ParseMixin = require('../../../mixins/common/ParseMixin');

var ParseFileUploadForm = React.createClass({
    mixins: [ParseMixin],
    getDefaultProps: function () {
        return {
            name: 'Загрузка файла',
            uploadButtonName: 'Загрузить',
            uploadButtonIcon: 'ui upload icon',
            okButtonName: 'ОК, использовать этот файл',
            okButtonIcon: 'check circle outline icon',
            fileUploaded: function(url){
                console.log(url);
            },
            fileConfirmed: function(url){
                console.log('file confirmed: url = ', url);
            },
            showLink: true
        }
    },
    getInitialState: function () {
        return {
            fileSelected: false,
            isUploading: false,
            fileUploaded: false,
            url: undefined
        }
    },

    file: undefined,

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onFileChange: function(e){
        console.log('onFileChange occured');
        var files = e.target.files || e.dataTransfer.files;
        this.file = files[0];
        console.log(this.file);
        this.setState({
            fileSelected: true
        });
    },

    fileConfirmed: function(){
        console.log('conf occured');
        this.props.fileConfirmed(this.state.url);
        this.resetForm();
    },

    resetForm: function(){
        this.file = undefined;
        this.setState(this.getInitialState());
    },

    onUploadButtonClicked: function(){
        console.log('onUploadButtonClicked');
        if (this.file == undefined){
            this.setState({
                fileSelected: false
            });
            return;
        }
        var self = this;
        self.setState({
            isUploading: true
        });
        this.uploadFileOnParse(this.file, function(url){
            self.setState({
                isUploading: false,
                fileUploaded: true,
                url: url,
                fileSelected: false
            });
            console.log('file uploaded: ', url);
            self.props.fileUploaded(url);
        });
    },

    componentStyle:{
        placeholder: {

        },
        name: {

        },
        form:{

        },
        uploadButtonPlaceholder: {
            display: 'block',
            marginTop: 10
        },
        uploadButton: {

        },
        uploadedLinkPlaceholder: {
            display: 'block',
            marginTop: 15
        },

        okButtonPlaceholder: {
            display: 'block',
            marginTop: 15,
            textAlign: 'right'
        },

        okButton: {

        },

        childrenPlaceholder: {

        }
    },



    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <h3 style={this.componentStyle.name} >{this.props.name}</h3>
                <form style={this.componentStyle.form}>
                    <input type="file" name="fileselect" onChange={this.onFileChange} ></input>
                </form>
                <div style={assign({}, this.componentStyle.uploadButtonPlaceholder, {display: (this.state.fileSelected == true ? this.componentStyle.uploadButtonPlaceholder.display : ' none '  )})}>
                    <button disabled={this.state.isUploading} className={'ui primary button'} onClick={this.onUploadButtonClicked} >
                        <i className={this.props.uploadButtonIcon}></i> {this.state.isUploading == true ? 'идет загрузка...' : this.props.uploadButtonName}
                    </button>
                </div>
                <div style={assign({}, this.componentStyle.uploadedLinkPlaceholder, {display: (this.state.fileUploaded == true ? this.componentStyle.uploadedLinkPlaceholder.display : ' none ' )})}>
                    {this.props.showLink ? (
                        <div>
                            <b>Файл загружен</b> <br/>
                            ссылка на файл: <a href={this.state.url} target="_blank" >{this.state.url}</a>
                        </div>) : (<div></div>) }
                    <div style={this.componentStyle.childrenPlaceholder}>
                        {this.props.children}
                    </div>

                    <div style={assign({}, this.componentStyle.okButtonPlaceholder)}>
                        <button className={'ui teal button'} onClick={this.fileConfirmed} style={this.componentStyle.okButton} >
                            <i className={this.props.okButtonIcon}></i> {this.props.okButtonName}
                        </button>
                    </div>
                </div>


            </div>
        );
    }

});

module.exports = ParseFileUploadForm;