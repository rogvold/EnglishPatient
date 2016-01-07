/**
 * Created by sabir on 06.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var VideoEmbedButton = React.createClass({
    getDefaultProps: function () {
        return {

            buttonIcon: 'icon file video outline',
            buttonName: '',
            buttonClassName: '',

            style: {

            },

            onSubmit: function(embedHtml){
                console.log('VideoEmbedButton: default: onSubmit: embedHtml = ', embedHtml);
            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            url: ''
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
            display: 'inline-block',
            cursor: 'pointer'
        },

        dialogPanelStyle: {
            width: 600,
            padding: 30,
            backgroundColor: 'transparent'
        }
    },

    onSave: function(){
        var url = this.state.url;
        var iframeHtml = '';
        if (url.indexOf('youtube') > -1){
            var youtubeId = CommonMixin.extractYoutubeIdFromUrl(url);
            iframeHtml = '<iframe class="patientArticleYoutubeIframe"  ' +
                'src="https://www.youtube.com/embed/' + youtubeId + '?rel=0&controls=0&showinfo=0"' +
                ' frameborder="0" allowfullscreen></iframe>';
        }

        if (url.indexOf('vimeo') > -1){
            var vimeoId = CommonMixin.extractVimeoIdFromUrl(url);
            iframeHtml = '<iframe src="https://player.vimeo.com/video/' + vimeoId + '?title=0&byline=0&portrait=0"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        }

        if (iframeHtml == ''){
            return;
        }
        this.onClose();
        this.props.onSubmit(iframeHtml);
    },

    onUrlChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        this.setState({
            url: val
        });
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



    getDialogContent: function(){
        return (
            <div style={{marginTop: 20, padding: 5, borderRadius: 4,
                            border: '1px solid #EFF0F1', backgroundColor: 'white'}} >

                <div className={'ui form'} >
                    <input value={this.state.url} onChange={this.onUrlChange} placeholder={'Ссылка на видео на youtube или vimeo'} />
                </div>

                <div style={{marginTop: 50, textAlign: 'right'}} >
                    <button className={'ui primary button'} onClick={this.onSave} >
                        ОК
                    </button>
                </div>

            </div>
        );
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={st} onClick={this.show} >
                    <i className={this.props.buttonIcon} ></i>
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.onClose}
                        content={this.getDialogContent()}
                        visible={true}
                        />
                }

            </div>
        );
    }

});

module.exports = VideoEmbedButton;