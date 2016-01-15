/**
 * Created by sabir on 07.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploadButton = require('../../file/FileUploadButton');

var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var SocialFeedItem = require('./SocialFeedItem');

var UpdateFeedItemPanel = React.createClass({
    getDefaultProps: function () {
        return {

            imageUrl: undefined,
            text: undefined,
            vimeoId: undefined,

            previewMode: false,

            onChange: function(data){

            },

            onUpdate: function(data){

            }
        }
    },

    getInitialState: function () {
        return {
            imageUrl: this.props.imageUrl,
            text: this.props.text,
            vimeoId: this.props.vimeoId
        }
    },

    componentWillReceiveProps: function (n) {
        this.setState({
            imageUrl: n.imageUrl,
            text: n.text,
            vimeoId: n.vimeoId
        });
    },

    componentDidMount: function () {

    },

    getData: function(){
        return {
            text: this.state.text,
            vimeoId: this.state.vimeoId,
            imageUrl: this.state.imageUrl
        }
    },

    fileUploaded: function(url){
        this.setState({
            imageUrl: url
        });
        this.onChangeAdditional({imageUrl: url});
    },

    deleteImage: function(){
        this.setState({
            imageUrl: undefined
        });
        this.onChangeAdditional({imageUrl: undefined});
    },

    onChangeAdditional: function(d){
        var data = this.getData();
        data = assign({}, data, d);
        this.props.onChange(data);
    },

    componentStyle: {
        placeholder: {
            width: 502,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 4
        },

        textInputPlaceholder: {
            marginBottom: 10
        },

        vimeoInputPlaceholder: {
            marginBottom: 10
        },

        imageInputPlaceholder: {
            marginBottom: 10,
            padding: 5
        },

        submitButtonPlaceholder: {
            borderTop: '1px solid #EFF0F1',
            padding: 5,
            paddingTop: 15
        },

        previewPlaceholder: {

        },

        block: {
            padding: 5
        }
    },

    onVimeoUrlChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        var vimeoId = CommonMixin.extractVimeoIdFromUrl(val);
        //if (vimeoId == undefined){
        //    vimeoId = '';
        //}
        if (vimeoId == ''){
            vimeoId = undefined;
        }
        this.setState({
            vimeoId: vimeoId
        });
        this.onChangeAdditional({vimeoId: vimeoId});
    },

    onSubmit: function(){
        var data = this.getData();
        console.log('data = ', data);
        this.props.onUpdate(data);
    },

    onTextChange: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined;
        }
        this.setState({
            text: val
        });
        this.onChangeAdditional({text: val});
    },

    render: function () {
        var vimeoUrl = (this.state.vimeoId == undefined) ? '' : this.state.vimeoId;
        if (isNaN(vimeoUrl) == false){
            vimeoUrl = 'https://vimeo.com/' + vimeoUrl;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.previewMode == false ? null :
                    <div style={this.componentStyle.previewPlaceholder}>
                        <SocialFeedItem text={this.state.text}
                                        vimeoId={this.state.vimeoId}
                                        imageUrl={this.state.imageUrl} />
                    </div>
                }

                <div style={this.componentStyle.textInputPlaceholder}>
                    <div className={'ui form'} style={this.componentStyle.block} >
                        <textarea placeholder={'Текст'}
                                  value={this.state.text}
                                  style={{padding: 5, height: '8em'}}
                                  onChange={this.onTextChange} ></textarea>
                    </div>
                </div>

                <div style={this.componentStyle.vimeoInputPlaceholder}>
                    <div className={'ui form'} style={this.componentStyle.block} >
                        <label><b>Ссылка на видео на vimeo.com</b></label>
                        <input placeholder={'Ссылка на видео (vimeo)'}
                               value={vimeoUrl}
                               onChange={this.onVimeoUrlChange} />
                    </div>
                </div>

                <div style={this.componentStyle.imageInputPlaceholder}>
                    <label><b>Картинка</b></label>

                    {this.state.imageUrl == undefined ? null :
                        <div className={'ui red message'} onClick={this.deleteImage} style={{padding: 10, cursor: 'pointer'}} >
                            <i className={'icon remove'} ></i> удалить картинку
                        </div>
                    }

                    <FileUploadButton
                        className={'ui fluid button basic'} icon={'icon upload'}
                        buttonName={'загрузить картинку'}
                        onFileUploaded={this.fileUploaded} />

                </div>

                <div style={this.componentStyle.submitButtonPlaceholder} >
                    <button className={'ui patientPrimary fluid button'} onClick={this.onSubmit} >
                        <i className={'icon check'} ></i> ОТПРАВИТЬ
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = UpdateFeedItemPanel;