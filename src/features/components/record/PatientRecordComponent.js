/**
 * Created by sabir on 17.09.15.
 */

var React = require('react');
navigator = window.navigator;
var RecordRTC = require('recordrtc');
var RecordStopButton = require('../buttons/RecordStopButton');
var FileUploadMixin = require('../../mixins/FileUploadMixin');
var assign = require('object-assign');


var PatientRecordComponent = React.createClass({
    mixins: [FileUploadMixin],
    getDefaultProps: function () {
        return {
            onSave: function(url){
                console.log('onSave occured: saved file url = ' + url);
            },
            onBeforeSave: function(){
                console.log('beforeSave occured');
            },
            onRecording: function(seconds){

            },
            onStop: function(){

            },
            onSavingStart: function(){
                console.log('onSavingStart occured');
            },
            onSaving: function(percents){
                console.log(percents);
            },
            onInit: function(){

            },
            dt: 100,
            //serverBaseUrl: 'http://beta.englishpatient.org/audio/',
            serverBaseUrl: 'https://www.englishpatientdrive.pw/audio/',
            //maxRecordTime: 10,

            //maxRecordTime: 30,
            maxRecordTime: 300,


            userAnswer: undefined,
            number: undefined
        }
    },

    webRTCisSupported: function(){
        var f = window.webRTCSupported;
        if (f == undefined){
            return true;
        }
        return f;
    },

    getInitialState: function () {
        return {
            recording: false,
            saving: false,
            initialized: false,
            compatible: true,
            initializing: false,
            time: 0,
            audioSrc: undefined,
            //audioSrc: this.props.userAnswer,
            savingProgress: 0,
            needToSave: false,
            stopped: false,
            saved: false
        }
    },

    componentDidMount: function () {
        console.log('PatientRecordComponent: componentDidMount occured');
        this.init();

        //added 19 dec
        if (this.props.userAnswer != undefined){
            this.setState({
                stopped: true,
                audioSrc: this.props.userAnswer,
                needToSave: false,
                saved: true
            });
        }
        // -- end
    },

    componentWillReceiveProps: function (nextProps) {
        var ans = nextProps.userAnswer;
        var num = nextProps.number;
        console.log('PatientRecordComponent: num, ans = ', num, ans);
        console.log('PatientRecordComponent: this.props.number, this.props.userAnswer = ', this.props.number, this.props.userAnswer);
        //if (num == this.props.number && ans == this.props.userAnswer){
        //    return;
        //}

        if (ans == undefined){
            this.setState({
                recording: false,
                saving: false,
                time: 0,
                audioSrc: undefined,
                savingProgress: 0,
                needToSave: false,
                stopped: false,
                saved: false
            });
        }else{
            this.setState({
                audioSrc: ans,
                stopped: true,
                needToSave: false,
                saved: true
            });
        }
    },

    hasGetUserMedia: function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
    },

    initTimer: function(){
        if (this.intervalId == undefined){
            this.intervalId = setInterval(function(){
                if (this.state.recording == false || this.state.initialized == false){
                    return;
                }
                var t = this.state.time + this.props.dt;
                if (t > this.props.maxRecordTime * 1000){
                    this.setState({
                        time: 0,
                        recording: false
                    });
                    this.stopRecording();
                    return;
                }
                this.setState({
                    time: t
                });
            }.bind(this), this.props.dt);
        }
    },



    initWebRTC: function(callback){
        //if (this.hasGetUserMedia() == false){
        //    this.setState({
        //        compatible: false
        //    });
        //    return;
        //}
        var supported = this.webRTCisSupported();
        if (supported == false){
            this.setState({
                compatible: false
            });
            return;
        }


        console.log('initWebRTC occured');

        this.setState({
            initializing: true
        });

        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        console.log('!!! navigator = ', navigator);
        getUserMedia.call(navigator, {audio: true, video: false},function(stream){
            this.mediaStream = stream;
            this.recordRTC = RecordRTC(this.mediaStream, {type: 'audio'});
            this.props.onInit();
            this.setState({
                initializing: false
            });
            callback();
        }.bind(this), function(error){
            console.log('getUserMedia: error occured: ', error);
            this.setState({
                initializing: false
            });
            this.props.onInit();
            callback();
        }.bind(this));
    },

    init: function(){
        if (this.state.initialized == true){
            return;
        }
        this.mediaStream = undefined;
        this.recordRTC = undefined;
        this.initTimer();
        this.props.onInit();
    },



    startRecording: function(){
        console.log('startRecording occured');
        console.log('stream = ', this.mediaStream);
        this.setState({
            saved: false
        });
        if (this.state.initialized == false){
            this.initWebRTC(function(){
                this.setState({
                    initialized: true,
                    time: 0,
                    recording: true,
                    stopped: false,
                    needToSave: false,
                    saved: false
                });
                this.recordRTC = RecordRTC(this.mediaStream, {type: 'audio'});
                this.recordRTC.startRecording();

            }.bind(this));
        }else{
            this.recordRTC.clearRecordedData();
            this.recordRTC = RecordRTC(this.mediaStream, {type: 'audio'});
            this.recordRTC.startRecording();
            this.setState({
                recording: true,
                stopped: false,
                needToSave: false,
                time: 0
            });
        }
    },

    stopRecording: function(){
        console.log('stopRecording occured');
        console.log('stream = ', this.mediaStream);
        this.setState({
            recording: false,
            stopped: true,
            t: 0
        });
        this.recordRTC.stopRecording(function(audioURL) {
            console.log('stopRecording callback: audioUrl = ', audioURL);
            var recordedBlob = this.recordRTC.getBlob();
            this.recordRTC.getDataURL(function(dataURL) {
                console.log('dataURL = ', dataURL);
                this.setState({
                    audioSrc: dataURL,
                    needToSave: true,
                    recording: false,
                    stopped: true,
                    t: 0,
                    saved: false
                });
            }.bind(this));
        }.bind(this));
    },

    pauseRecording: function(){

    },

    clearRecording: function(){
        this.recordRTC.clearRecordedData();
    },

    saveRecording: function(){
        if (this.state.recording == true){
            console.log('trying to save not recorded stream');
            return;
        }
        if (this.state.saving == true){
            console.log('it is saving! ');
            return;
        }
        var url = this.props.serverBaseUrl + 'save.php';
        var fileName = (new Date().getTime()) + '' + Math.round(Math.random() * 9999) + 9999 + '.wav';
        var blob = this.recordRTC.getBlob();
        var formData = new FormData();
        formData.append('audio-filename', fileName);
        formData.append('audio-blob', blob);
        this.props.onBeforeSave();
        this.uploadAudio(url, formData, function(){
            //uploaded callback
            var uploadedUrl = this.props.serverBaseUrl + 'uploads/' + fileName;
            this.props.onSave(uploadedUrl);
            this.setState({
                saving: false,
                needToSave: false,
                saved: true
            });
        }.bind(this), function(){
            //onLoadStartCallback
            this.props.onSavingStart();
            this.setState({
                saving: true
            });
        }.bind(this), function(progress, uploaded, total){
            //onProgressCallback
            this.setState({
                savingProgress: progress
            });
            this.props.onSaving(progress);
        }.bind(this));
    },





    componentWillUnmount: function(){
        if (this.intervalId == undefined){
            return;
        }
        clearInterval(this.intervalId);
    },

    componentStyle: {
        placeholder: {
            border: '1px solid #EFF0F1',
            padding: 10,
            borderRadius: 4,
            position: 'relative',
            width: 600,
            margin: '0 auto'
        },

        buttonsPlaceholder: {
            display: 'inline-block',
            width: 320
        },

        audioPlayerPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'middle',
            height: 33
        },

        audioPlayer: {
            width: 250
        },

        disabled: {
            opacity: 0.5
        }
    },

    render: function () {
        var recordButtonDisabled = this.state.saving || this.state.initializing;
        //console.log('PatientRecordComponent: recordButtonDisabled = ', recordButtonDisabled);
        //console.log('this.state.initializing = ', this.state.initializing);
        var t = Math.floor(this.state.time / 100.0) / 10.0;
        //console.log('t = ', t);

        var buttonMode = this.state.recording ? 'stop' : 'record';

        var supported = this.webRTCisSupported();
        console.log('WEB SUPPORTED = ' + supported);

        console.log('rendering PatientRecordComponent: this.state.audioSrc = ', this.state.audioSrc);

        return (
            <div style={this.componentStyle.placeholder}>

                {supported == false ?
                    <div style={{padding: 5}} >
                        Ваш браузер не поддерживает запись звука.
                        Пожалуйста, скачайте
                        <a style={{marginLeft: 5}} target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html">
                            Google Chrome
                        </a>.
                    </div>
                    :
                    <div style={this.componentStyle.buttonsPlaceholder}>
                        <RecordStopButton mode={buttonMode} disabled={recordButtonDisabled} recordButtonName={'record'} stopButtonName={'stop'} recordClicked={this.startRecording} stopClicked={this.stopRecording} />

                        {this.state.recording ?
                            <span>
                        <i className={'ui wait icon'}></i> {t} s
                        </span>
                            : null}

                        {this.state.needToSave ?
                            <div className="ui basic blue button" style={assign({}, this.state.saving ? this.componentStyle.disabled : {})} onClick={this.saveRecording} >
                                {this.state.saving ?
                                    <span><i className={'ui cloud upload icon'}></i> saving... ({this.state.savingProgress} %)</span>
                                    :
                                    <span><i className={'ui save icon'}></i> save</span>
                                }
                            </div>

                            : null }

                        {this.state.saved ?
                            <span> <i className={'ui checkmark icon'} ></i> saved</span>
                            : null }

                    </div>
                }


                {this.state.stopped ?
                    <div style={this.componentStyle.audioPlayerPlaceholder}>
                        <audio controls="1" style={this.componentStyle.audioPlayer} src={this.state.audioSrc} ></audio>
                    </div>
                    : null }


            </div>
        );
    }

});

module.exports = PatientRecordComponent;