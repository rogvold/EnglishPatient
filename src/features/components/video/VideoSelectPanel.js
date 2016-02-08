/**
 * Created by sabir on 03.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var CommonMixin = require('../../../react/mixins/commonMixins/CommonMixin');

var PatientPlayer = require('../player/PatientPlayer');

var YoutubeSearchButton = require('../search/youtube/YoutubeSearchButton');

var CoolPreloader = require('../preloader/CoolPreloader');

var VideoMixin = require('../../mixins/VideoMixin');

var MosesTimePanel = require('../moses/editor/adjust/MosesTimePanel');

var BackgroundImageContainer = require('../image/BackgroundImageContainer');

var VideoSelectPanel = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: undefined,
            youtubeId: undefined,
            start: undefined,
            end: undefined,
            avatar: undefined,
            duration: undefined,

            onChange: function(data){
                console.log('VideoSelectPanel: default: onChange: data = ', data);
            },

            onOk: function(data){

            },

            seekDelta: 0.5

        }
    },

    getInitialState: function () {
        return {
            vimeoId: this.props.vimeoId,
            youtubeId: this.props.youtubeId,
            seekTo: this.props.start,
            start: this.props.start,
            end: this.props.end,
            videoUrl: this.getVideoUrl(this.props.vimeoId, this.props.youtubeId),
            avatar: this.props.avatar,
            duration: this.props.duration,
            loading: false,
            currentProgress: 0
        }
    },

    componentDidMount: function () {
        var st = {};
        var url = this.getVideoUrl(this.props.vimeoId, this.props.youtubeId);
        if (url != undefined){
            this.setState({
                videoUrl: url,
                start: this.props.start,
                end: this.props.end
            });
        }
    },

    getData: function(){
        var start = this.state.start;
        var end = this.state.end;
        var duration = this.state.duration;
        duration = ((start != undefined && end != undefined)) ? (+end - +start) : duration;
        return {
            start: start,
            end: end,
            duration: duration,
            avatar: this.state.avatar,
            youtubeId: this.state.youtubeId,
            vimeoId: this.state.vimeoId
        }
    },

    onChange: function(){
        setTimeout(function(){
            var data = this.getData();
            this.props.onChange(data);
        }.bind(this), 100);
    },

    onOk: function(){
        setTimeout(function(){
            var data = this.getData();
            this.props.onOk(data);
        }.bind(this), 100);
    },

    getVideoUrl: function(vimeoId, youtubeId){
        if (vimeoId != undefined && vimeoId.trim() != ''){
            return 'https://vimeo.com/' + vimeoId;
        }
        if (youtubeId != undefined){
            return 'https://youtube.com/watch?v=' + youtubeId;
        }
        return undefined;
    },

    loadVideoInfo: function(youtubeId, vimeoId){
        if (this.videoChanged(youtubeId, vimeoId) == false){
            return;
        }
        var videoType = undefined;
        var vId = undefined;
        if (youtubeId != undefined){
            vId = youtubeId;
            videoType = 'youtube'
        }
        if (vimeoId != undefined){
            vId = vimeoId;
            videoType = 'vimeo';
        }
        if (videoType == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        VideoMixin.loadVideoInfo(vId, videoType, function(info){
            console.log('video info loaded: info = ', info);
            if (info == undefined){
                info = {};
            }
            var duration = info.duration;
            if (videoType == 'vimeo'){
                duration = duration * 1000.0;
            }
            self.setState({
                loading: false,
                avatar: info.avatar,
                duration: (1.0 * duration / 1000.0)
            });
            self.onChange();
        }, function(err){
            self.setState({
                loading: false,
                duration: undefined,
                avatar: undefined
            });
            self.onChange();
            console.log('error: err = ', err);
        });

    },

    videoChanged: function(vimeoId, youtubeId){
        if (vimeoId == undefined && youtubeId == undefined){
            return false;
        }
        if (youtubeId != undefined && youtubeId != this.state.youtubeId){
            return true;
        }
        if (vimeoId != undefined && vimeoId != this.state.vimeoId){
            return true;
        }
        return false;
    },

    componentWillReceiveProps: function (nextProps) {

    },


    componentStyle: {
        placeholder: {
            width: 500,
            margin: '0 auto',
            position: 'relative',
            backgroundColor: 'white',
            padding: 10
        },

        playerPlaceholder: {
            height: 350,
            position: 'relative'
        },

        currentTimePlaceholder: {
            padding: 5,
            top: 0,
            right: 0,
            minWidth: 80,
            textAlign: 'center',
            position: 'absolute',
            backgroundColor: 'white'
        },

        inputPlaceholder: {
            marginTop: 5
        },

        adjustPlaceholder: {
            marginTop: 10,
            textAlign: 'center'
        }

    },

    onVideoUrlChange: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            val = undefined;
        }
        if (val != undefined){
            val = val.trim();
        }
        var youtubeId = CommonMixin.extractYoutubeIdFromUrl(val);
        var vimeoId = CommonMixin.extractVimeoIdFromUrl(val);
        if (youtubeId != undefined && youtubeId.length != 11){
            youtubeId = undefined;
        }

        if (youtubeId != undefined || vimeoId != undefined){
            val = this.getVideoUrl(vimeoId, youtubeId);
        }

        this.loadVideoInfo(youtubeId, vimeoId);



        this.setState({
            videoUrl: val,
            youtubeId: youtubeId,
            vimeoId: vimeoId,
            start: undefined,
            duration: undefined,
            end: undefined
        });
        if (vimeoId != undefined && youtubeId != undefined){
            this.onChange();
        }
    },

    onYoutubeSubmit: function(data){
        var videoUrl = this.getVideoUrl(undefined, data.youtubeId);
        this.setState({
            vimeoId: undefined,
            youtubeId: data.youtubeId,
            videoUrl: videoUrl,
            start: data.start,
            end: data.end
        });
        this.onChange();
    },


    onTimeSpanChange: function(data){
        console.log('onTimeSpanChange: data = ', data);
        var start = +data.start;
        var end = +data.end;
        var oldStart = this.state.start;
        var oldEnd = this.state.end;
        var seekTo = 0;
        if (oldStart != start){
            seekTo = start;
        }
        if (oldEnd != end){
            if (end != undefined){
                seekTo = +end - this.props.seekDelta;
            }
        }

        this.setState({
            start: start,
            end: end,
            seekTo: seekTo
        });
    },


    onProgress: function(seconds){
        console.log('onProgress occured');
        this.setState({
            currentProgress: seconds
        });
    },

    render: function () {
        var playerIsVisible = (this.state.vimeoId != undefined || this.state.youtubeId != undefined);

        var start = this.state.start;
        var end = this.state.end;
        if (start == undefined){
            start = 0;
        }
        if (end == undefined){
            end = this.state.duration;
        }

        var t = (this.state.currentProgress == undefined) ? 0 : this.state.currentProgress;
        t = Math.floor(100.0 * t) / 100.0;

        return (
            <div style={this.componentStyle.placeholder}>

                {playerIsVisible == true ? null :
                    <div style={{textAlign: 'center', width: 400, height: 400, margin: '0 auto'}} >
                        <div style={{width: 320, height: 320, margin: '0 auto'}} >
                            <BackgroundImageContainer image={'http://www.englishpatient.org/assets/images/video_pre_player.png'} />
                        </div>

                        <div style={{marginBottom: 5, marginTop: 25, opacity: 0.6}} >
                            Введите ссылку на видео с сайта
                            <br/>
                            <b>youtube.com</b> или <b>vimeo.com</b>
                        </div>

                    </div>
                }

                {playerIsVisible == false ? null :
                    <div style={this.componentStyle.playerPlaceholder}>

                        <PatientPlayer
                            seekToValue={this.state.seekTo}
                            onProgress={this.onProgress}
                            start={this.state.start} end={this.state.end}
                            youtubeId={this.state.youtubeId} vimeoId={this.state.vimeoId} />

                        <div style={this.componentStyle.currentTimePlaceholder}>
                            {t}
                        </div>

                    </div>
                }

                <div style={this.componentStyle.inputPlaceholder}>

                    <div className={'ui form'} >
                        <input value={this.state.videoUrl}
                               onChange={this.onVideoUrlChange}
                               placeholder={'Ссылка на видео '} />
                    </div>

                    <div style={{marginTop: 5, textAlign: 'right', marginBottom: 5}} >
                        <span style={{marginLeft: 0}} >
                            <YoutubeSearchButton
                                style={{marginRight: 0}}
                                disabled={this.state.youtubeId != undefined}
                                onSubmit={this.onYoutubeSubmit} />
                        </span>
                    </div>

                </div>




                {(start == undefined || end == undefined) ? null :
                    <MosesTimePanel
                        start={start}
                        end={end}
                        onChange={this.onTimeSpanChange}
                        textEnabled={false}/>
                }


                {playerIsVisible == false ? null :
                    <div style={{padding: 10, textAlign: 'center'}} >
                        <button className={'ui button patientPrimary'} onClick={this.onOk}>
                            <i className={'icon check circle'} ></i> OK
                        </button>
                    </div>
                }


                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = VideoSelectPanel;