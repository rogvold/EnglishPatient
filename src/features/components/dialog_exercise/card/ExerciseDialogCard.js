/**
 * Created by sabir on 17.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploadButton = require('../../file/FileUploadButton');

var ExerciseDialogCard = React.createClass({
    getDefaultProps: function () {
        return {

            audioUrl: undefined,
            text: undefined,
            name: undefined,

            onChange: function(text, url){

            }
        }
    },

    getInitialState: function () {
        return {
            audioUrl: this.props.audioUrl,
            text: this.props.text
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var text = nextProps.text;
        var audioUrl = nextProps.audioUrl;
        this.setState({
            audioUrl: audioUrl,
            text: text
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 612,
            height: 80,
            padding: 5,
            borderRadius: 2,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 400,
            padding: 2,
            height: '100%'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 200,
            padding: 5
        },

        textarea: {
            width: '100%',
            minHeight: 0,
            height: '100%'
        },

        audioPlaceholder: {
            width: '100%',
            height: 27

        },

        uploaderPlaceholder: {
            marginTop: 3
        }
    },

    onTextChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        this.setState({
            text: val
        });
        this.onChange(val, this.state.audioUrl);
    },


    onAudioUploaded: function(url){
        this.setState({
            audioUrl: url
        });
        this.onChange(this.state.text, url);
    },

    deleteAudio: function(){
        this.setState({
            audioUrl: undefined
        });
        this.onChange(this.state.text, undefined);
    },

    onChange: function(text, audioUrl){
        this.props.onChange(text, audioUrl);
    },


    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.left}>

                    <div className={'ui form'} style={{height: '100%'}} >
                        <div class="field" style={{height: '100%'}} >
                            <textarea value={this.state.text}
                                      placeholder={'Текст речи персонажа'}
                                      onChange={this.onTextChange}
                                      row={2}
                                      style={this.componentStyle.textarea}></textarea>
                        </div>
                    </div>

                </div>

                <div style={this.componentStyle.right}>


                    <div style={this.componentStyle.audioPlaceholder}>

                        {this.state.audioUrl == undefined ?
                            <div style={{ opacity: 0.6, lineHeight: '13px', fontSize: 12, textAlign: 'center' }} >
                                загрузите аудио-файл реплики (.mp3)
                            </div>
                            :
                            <div style={{height: '100%', width: '100%'}} >
                                <audio style={{height: '100%', width: '100%'}} controls src={this.state.audioUrl} ></audio>
                            </div>
                        }

                    </div>


                    <div style={this.componentStyle.uploaderPlaceholder}>

                            <FileUploadButton className={'ui button tiny fluid basic grey'}
                                              icon={'upload icon'} buttonName={'загрузить аудио'}
                                              onFileUploaded={this.onAudioUploaded} />

                    </div>


                    <div style={{padding: 6, display: 'none', marginTop: 2, cursor: 'pointer', opacity: 0.8}}
                                className={'ui red message'} onClick={this.deleteAudio} >
                            <i className={'icon remove'} ></i> удалить аудио
                    </div>

                </div>


            </div>
        );
    }

});

module.exports = ExerciseDialogCard;