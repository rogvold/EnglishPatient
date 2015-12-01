/**
 * Created by sabir on 26.11.15.
 */

var React = require('react/addons');
var assign = require('object-assign');

var ReactPlayer = require('react-player');

var VideoMixin = require('../../mixins/VideoMixin');

var PatientPlayer = React.createClass({
    getDefaultProps: function () {
        return {
            youtubeId: undefined,
            //youtubeId: '8SbUC-UaAxE',
            //vimeoId: '70260646',
            vimeoId: undefined,
            start: 0,
            end: 1000 * 100000,

            seekToValue: 0,
            paused: false,

            onProgress: function(seconds){

            }


        }
    },

    getInitialState: function () {
        return {
            loading: false,
            loaded: 0,
            played: 0,
            playing: true,
            duration: 0,
            name: undefined,
            imgSrc: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var vimeoId = nextProps.vimeoId;
        var youtubeId = nextProps.youtubeId;

        var seekToValue = nextProps.seekToValue;
        var paused = nextProps.paused;

        if (seekToValue != this.props.seekToValue){
            this.seekTo(seekToValue * 1000.0 / this.state.duration);
            //return;
        }

        if (paused != this.props.paused){
            console.log('paused changed');
            this.setState({
                playing: !paused
            });
        }

        if (vimeoId == this.props.vimeoId && youtubeId == this.props.youtubeId){
            return;
        }

        this.load(youtubeId, vimeoId, function(data){
            console.log(data);
        });
    },

    componentDidMount: function () {
        this.load(this.props.youtubeId, this.props.vimeoId, function(data){
            console.log('video loaded', data);
        });
    },

    getUrl: function(){
        if (this.props.vimeoId != undefined){
            return ('http://vimeo.com/' + this.props.vimeoId)
        }
        if (this.props.youtubeId != undefined){
            return ('https://www.youtube.com/watch?v=' + this.props.youtubeId)
        }
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        }
    },

    onProgress: function(data){
        var played = data.played;
        var loaded = data.loaded;
        console.log('onProgress: played/loaded = ', played, loaded);
        if (played != undefined){
            this.checkBounds(played);
        }
        this.setState({
            loaded: (loaded == undefined) ? this.state.loaded : loaded,
            played: (played == undefined) ? this.state.played : played
        });
    },

    onPlay: function(){
        console.log('onPlay occured');
    },

    onPause: function(){
        console.log('onPause occured');
    },

    seekTo: function(fraction){
        var player = this.refs.player;
        console.log('seekTo occured: fraction = ', fraction );
        console.log('player = ', player);
        this.refs.player.seekTo(fraction);
    },

    load: function(youtubeId, vimeoId, callback){
        if (callback == undefined) callback = function(){};
        if (vimeoId != undefined){
            this.setState({
                loading: true
            });
            VideoMixin.loadVimeoInfo(vimeoId, function(data){
                console.log(data);
                this.setState({
                    duration: data.duration * 1000,
                    imgSrc: data.imgSrc,
                    loading: false
                });
                this.checkBounds(0);
                callback(data);
            }.bind(this));
            return;
        }
        if (youtubeId != undefined){
            this.setState({
                loading: true
            });
            VideoMixin.loadYoutubeInfo(youtubeId, function(data){
                console.log(data);
                this.setState({
                    duration: data.duration,
                    imgSrc: data.imgSrc,
                    loading: false
                });
                //VideoMixin.loadCaptions(youtubeId);
                //this.refs.player.unloadModule("captions");
                //this.refs.player.unloadModule("cc");
                this.checkBounds(0);
                callback(data);
            }.bind(this));
            return;
        }

    },

    checkBounds: function(playedFraction){
        var start = (this.props.start == undefined) ? 0 : this.props.start * 1000;
        var end = (this.props.end == undefined) ? this.state.duration : this.props.end * 1000;
        var duration = this.state.duration;
        var pos = (playedFraction == undefined) ? 0 : (playedFraction * duration);
        console.log(pos);
        if (pos < start || pos > end ){
            this.seekTo( 1.0 * start / duration);
        }
        this.props.onProgress(pos / 1000.0);

    },

    componentWillUnmount: function(){

    },

    render: function () {
        var url = this.getUrl();
        var start = (this.props.start == undefined) ? 0 : this.props.start;
        var end = (this.props.end == undefined) ? 0 : this.props.end;
        var youtubeConfig = {
            start: start,
            end: end,
            captions: {

            }
        };
        var vimeoConfig = {
            badge: 0,
            byline: 0,
            portrait: 0,
            title: 0
        };

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.loading == true ? null :
                        <ReactPlayer url={url} ref="player"
                                     width="100%"
                                     height="100%"
                                     onProgress={this.onProgress}
                                     onPlay={this.onPlay}
                                     playing={this.state.playing}
                                     onPause={this.onPause}
                                     youtubeConfig={youtubeConfig}
                                     vimeoConfig={vimeoConfig}
                            />
                }



            </div>
        );
    }

});

module.exports = PatientPlayer;