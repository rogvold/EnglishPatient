/**
 * Created by sabir on 21.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoUploaderHelper = require('../../../../helpers/vimeo/VimeoUploaderHelper');

var BackgroundImageContainer = require('../../../image/BackgroundImageContainer');

var PatientPlayer = require('../../../player/PatientPlayer');

var VideoMixin = require('../../../../mixins/VideoMixin');

var CoolPreloader = require('../../../preloader/CoolPreloader');

var VimeoUploadPanel = React.createClass({
    getDefaultProps: function () {
        return {
            checkingInterval: 3000,
            onUploadingFinished: function(vimeoId, videoData){
                console.log('VimeoUploadPanel: default onUploadingFinished: ', vimeoId, videoData);
            },
            onUploadingStarted: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            progress: 0,
            uploading: false,
            finished: false,
            vimeoId: undefined,
            ready: false,
            checking: false,
            videoInfo: undefined,
            isDragOver: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            padding: 5,
            width: 620,
            position: 'relative',
            backgroundColor: 'white'
        },

        dropZone: {
            padding: 10,
            border: '2px dashed #bbb',
            borderRadius: 5,
            textAlign: 'center',
            color: '#bbb',
            fontSize: 20
        },

        left: {
            width: 300,
            minHeight: 150,
            marginRight: 5,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 300,
            minHeight: 150,
            position: 'relative',
            textAlign: 'center'
        }
    },

    onUploadingFinished: function(vimeoId, videoInfo){
        console.log('onUploadingFinished: vimeoId, videoInfo = ', vimeoId, videoInfo);
        this.props.onUploadingFinished(vimeoId, videoInfo);
        clearInterval(this.intervalId);
    },

    checkVideo: function(){
        console.log('check video occured: ');
        var vimeoId = this.state.vimeoId;
        var duration = (this.state.videoInfo == undefined) ? 0 : this.state.videoInfo.duration;
        var avatar = (this.state.videoInfo == undefined) ? 'default' : this.state.videoInfo.avatar;
        //var isReady = (duration > 0 );
        var isReady = (avatar.indexOf('default') == -1);
        console.log('isReady = ', isReady);

        if (isReady == true){
            setTimeout(function(){
                this.onUploadingFinished(vimeoId, this.state.videoInfo);
            }.bind(this), 200);
            this.setState({
                ready: true
            });
            return;
        }

        this.setState({
            checking: true,
            ready: isReady
        });
        var self = this;
        VideoMixin.loadVimeoInfo(vimeoId, function(data){
            console.log('loadVimeoInfo: success: ', data);
            self.setState({
                checking: false,
                videoInfo: data
            });
        }, function(error){
            console.log('loadVimeoInfo: error: ', error);
            self.setState({
                checking: false
            });
        });
    },


    initCheckingTimer: function(){
        console.log('initCheckingTimer occured!');
        this.intervalId = setInterval(function(){
            this.checkVideo();
        }.bind(this), this.props.checkingInterval);
    },

    handleDragOver: function(evt){
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
        this.setState({
            isDragOver: true
        });
    },

    updateProgress: function(p){
        console.log('progress: ' + p);
        var uploading = false;
        if (p != undefined && p > 0){
            uploading = true;
        }
        this.setState({
            progress: p,
            uploading: uploading
        });
    },

    onError: function(message){
        console.log('ERROR: ', message);
    },

    onSuccess: function(vimeoId){
        this.setState({
            finished: true,
            vimeoId: vimeoId,
            uploading: false
        });
        this.initCheckingTimer();
    },

    handleFileSelect: function(evt){
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files; // FileList object.
        var upgrade_to_1080 = true;

        // Rest the progress bar
        this.updateProgress(0);
        var self = this;
        this.props.onUploadingStarted();
        var uploader = new VimeoUploaderHelper({
            file: files[0],
            upgrade_to_1080: upgrade_to_1080,
            onError: function(data) {
                var errorResponse = JSON.parse(data);
                var message = errorResponse.error;
                self.onError(message);
            },
            onProgress: function(data) {
                self.updateProgress(data.loaded / data.total);
            },
            onComplete: function(videoId) {
                self.onSuccess(videoId);
            }
        });
        uploader.upload();
    },

    componentWillUnmount: function(){
        clearInterval(this.intervalId);
    },

    render: function () {
        var perc = ( this.state.progress * 100.0 ) + '%';
        var progressStyle = assign({}, {width: perc});
        var roundPerc = Math.floor(this.state.progress * 100.0) + '%';
        var duration = (this.state.videoInfo == undefined) ? 0 : this.state.videoInfo.duration;
        var avatar = (this.state.videoInfo == undefined) ? 'default' : this.state.videoInfo.avatar;
        //var isReady = (duration > 0 );
        var isReady = (avatar.indexOf('default') == -1);

        var leftStyle = assign({}, this.componentStyle.left);
        var rightStyle = assign({}, this.componentStyle.right);
        if (this.state.uploading == true){
            leftStyle = assign({}, leftStyle, {width: '100%'});
            rightStyle = assign({}, rightStyle, {display: 'none'});
        }
        var dropZoneSt = assign({}, this.componentStyle.dropZone);
        if (this.state.isDragOver == true){
            dropZoneSt = assign({}, dropZoneSt, {backgroundColor: 'lightgray'});
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={leftStyle}>

                    {this.state.finished == false ?
                        <div>


                            {this.state.uploading == false ? <div>
                                <div style={dropZoneSt}
                                     onDrop={this.handleFileSelect} onDragOver={this.handleDragOver} >
                                        <div style={{height: 85, width: 120, marginTop: 10, marginBottom: 10, display: 'inline-block'}} >
                                            <BackgroundImageContainer
                                                image={'http://www.englishpatient.org/app/assets/images/vimeo_upload_icon.png'} />
                                        </div>
                                        <br/>
                                        Drop file here
                                    </div>
                                </div> :
                                <div>
                                    <div style={{textAlign: 'center'}} >
                                        <div style={{width: 100, height: 100, marginTop: 5, display: 'inline-block'}} >
                                            <BackgroundImageContainer image={'https://www.englishpatient.org/app/assets/images/preloader_8.gif'} />
                                        </div>
                                    </div>
                                    <div className="ui active progress" style={{marginTop: 10}} >
                                        <div className="bar" style={progressStyle} >
                                            <div className="progress" >{roundPerc}</div>
                                        </div>
                                        <div className="label">Загружаем файл...</div>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div style={{marginBottom: 10}} >

                            {isReady == false ?
                                <div style={{textAlign: 'center'}} >
                                    <div style={{width: 100, height: 100, marginTop: 20, display: 'inline-block'}} >
                                        <BackgroundImageContainer image={'https://www.englishpatient.org/app/assets/images/leonardo.gif'} />
                                    </div>
                                </div>
                                :
                                <div style={{textAlign: 'center'}} >
                                    <div style={{width: 100, height: 100, marginTop: 5, marginBottom: 5, display: 'inline-block'}} >
                                        <BackgroundImageContainer image={'https://www.englishpatient.org/app/assets/images/emoji_2.gif'} />
                                    </div>
                                    <br/>
                                    Видео загружено!
                                    <br/>
                                    <a href={'https://vimeo.com/' + this.state.vimeoId} target={'_blank'} >
                                        https://vimeo.com/{this.state.vimeoId}
                                    </a>
                                    <br/>
                                </div>
                            }

                        </div>
                    }

                </div>

                <div style={rightStyle}>

                    {this.state.finished == false ?
                        <div>
                            {this.state.uploading == false ?
                                <div style={{textAlign: 'center'}} >
                                    <div style={{width: 185, height: 128, display: 'inline-block'}} >
                                        <BackgroundImageContainer image={'http://www.englishpatient.org/app/assets/images/drag_video.gif'} />
                                    </div>
                                    <br/>
                                    Перетащите видеофайл в панель слева
                                </div>
                                :
                                <div>
                                    Идет загрузка...
                                </div>
                            }
                        </div>
                        :
                        <div>

                            {isReady == false ?
                                <div>
                                    <CoolPreloader text={'Конвертируем видео... Это может занять до минуты...'} />
                                </div>
                                :
                                <div>
                                    <PatientPlayer vimeoId={this.state.vimeoId} />
                                </div>
                            }

                        </div>
                    }


                </div>

            </div>
        );
    }

});

module.exports = VimeoUploadPanel;