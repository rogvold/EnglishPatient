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
            start: undefined,
            end: undefined


        }
    },

    getInitialState: function () {
        return {
            loading: false,
            loaded: 0,
            played: 0,
            //playing: true,
            duration: 0,
            name: undefined,
            imgSrc: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(function(data){
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

    load: function(callback){
        if (callback == undefined) callback = function(){};
        if (this.props.vimeoId != undefined){
            this.setState({
                loading: true
            });
            VideoMixin.loadVimeoInfo(this.props.vimeoId, function(data){
                console.log(data);
                this.setState({
                    duration: data.duration * 1000,
                    imgSrc: data.imgSrc,
                    loading: false
                });
                callback(data);
            }.bind(this));
            return;
        }
        if (this.props.youtubeId != undefined){
            this.setState({
                loading: true
            });
            VideoMixin.loadYoutubeInfo(this.props.youtubeId, function(data){
                console.log(data);
                this.setState({
                    duration: data.duration,
                    imgSrc: data.imgSrc,
                    loading: false
                });
                VideoMixin.loadCaptions(this.props.youtubeId);
                callback(data);
            }.bind(this));
            return;
        }

        VideoMixin.loadYoutubeInfo(this.props.youtubeId, function(data){

        }.bind(this));
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

    },

    componentWillUnmount: function(){

    },

    render: function () {
        var url = this.getUrl();
        var start = (this.props.start == undefined) ? 0 : this.props.start;
        var end = (this.props.end == undefined) ? 0 : this.props.end;
        var youtubeConfig = {
            start: start,
            end: end
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