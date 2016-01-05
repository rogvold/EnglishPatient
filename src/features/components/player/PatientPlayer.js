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

            playerId: undefined,

            abMode: false,

            abPauseDuration: 500,

            onProgress: function(seconds){

            }


        }
    },

    getInitialState: function () {
        return {
            loading: false,
            loaded: 0,
            played: 0,
            //playing: true,
            playing: false,
            duration: 0,
            name: undefined,
            imgSrc: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        console.log('PatientPlayer: componentWillReceiveProps occured: nextProps = ', nextProps);
        var vimeoId = nextProps.vimeoId;
        var youtubeId = nextProps.youtubeId;

        var seekToValue = nextProps.seekToValue;
        var paused = nextProps.paused;

        if (seekToValue != this.props.seekToValue){
            this.seekTo(seekToValue * 1000.0 / this.state.duration);
            //return;
        }

        var start = nextProps.start;
        var end = nextProps.end;

        if (paused != this.props.paused){
            console.log('paused changed');
            this.setState({
                playing: !paused
            });
        }

        if (start != this.props.start || end != this.props.end){
            console.log('-->>> !!! >>> PatientPlayer: new start or end: start, end = ', start, end);

            console.log('start != this.props.start || end != this.props.end');
            if (this.props.abMode == true){
                this.abPlayPause();
            }
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
            return ('https://vimeo.com/' + this.props.vimeoId)
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
        var ref = this.getPlayerRef();
        console.log('onProgress: played/loaded = ', played, loaded, ', ref = ' + ref);
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

    getPlayerRef: function(){
        var refer = (this.props.playerId == undefined) ? 'player' : ('player_' + this.props.playerId);
        return refer;
    },

    seekTo: function(fraction){
        //var player = this.refs.player; !!! it's working
        var refer = this.getPlayerRef();
        var player = this.refs[refer];
        console.log('seekTo occured: fraction = ', fraction );
        console.log('player = ', player);
        //this.refs.player.seekTo(fraction); // it's working
        player.seekTo(fraction);
    },

    onEnded: function(){
        console.log('onEnded occured');
        if (this.props.abMode == true){
            this.abPlayPause();
        }
    },

    play: function(){
        console.log('play occured');
        var refer = this.getPlayerRef();
        var player = this.refs[refer];
        //this.refs.player.play();
        //console.log('this.refs.player = ', this.refs.player); // it's working
        console.log('player = ', player);
        //this.forceUpdate();
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
        if (this.props.abMode == true){
            if (pos >= end){
                //this.seekTo( 1.0 * start / duration);
                //setTimeout(function(){
                //    this.play();
                //}.bind(this), 1000);
                this.abPlayPause();
            }
        }
        this.props.onProgress(pos / 1000.0);

    },

    componentWillUnmount: function(){

    },

    abPlayPause: function(){
        console.log('abPlayPause occured');
        this.setState({
            playing: false
        });
        //var fraction =
        var start = (this.props.start == undefined) ? 0 : this.props.start * 1000;
        var duration = this.state.duration;
        this.seekTo( 1.0 * start / duration);

        setTimeout(function(){
            this.setState({
                playing: true
            });
        }.bind(this), this.props.abPauseDuration);
    },

    render: function () {
        var refer = this.getPlayerRef();
        var vimeoId = this.props.vimeoId;
        console.log('PatientPlayer: render occured: playing = ', this.state.playing);
        console.log('ref = ' + refer);
        console.log('vimeoId = ' + vimeoId);

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
            //autoplay: !this.props.paused
            //autoplay: false
        };

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.loading == true ? null :
                        <ReactPlayer url={url} ref={refer}
                                     width="100%"
                                     height="100%"
                                     onProgress={this.onProgress}
                                     onPlay={this.onPlay}
                                     playing={this.state.playing}
                                     onPause={this.onPause}
                                     onEnded={this.onEnded}
                                     youtubeConfig={youtubeConfig}
                                     vimeoConfig={vimeoConfig}
                        />
                }



            </div>
        );
    }

});

module.exports = PatientPlayer;