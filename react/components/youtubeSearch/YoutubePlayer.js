/**
 * Created by sabir on 22.07.15.
 */

var YoutubePlayer = React.createClass({displayName: "YoutubePlayer",

    getDefaultProps: function(){
        var self = this;
        return {
            totalDuration: 0,
            start: 0,
            duration: 0,
            currentPos: 0,
            currentStatus: undefined,
            youtubeId: 'YPdHRiIWpoM',
            player: undefined,
            autoplay: false,
            loaded: false,
            shouldPlay: false
        };
    },
    getInitialState: function(){
        return {
            player: undefined,
            loaded: false,
            position: 0
        };
    },

    componentDidMount: function(){
        console.log('componentDidMount occured');
        var self = this;
        var player = new YT.Player('videoPlayerId', {
            height: '270',
            width: '443',
            videoId: 'YPdHRiIWpoM',
            playerVars: {
                showinfo: 0,
                autoplay: 0,
                rel: 0,
                disablekb: 1,
                border: 0
            },
            events: {
                'onReady': self.onPlayerReady,
                'onStateChange': self.onPlayerStateChange
            }
        });
        if (this.state.player == undefined){
            this.state.player = player;
        }
        this.setState({player: player});
    },

    //componentDidUpdate: function(){
    //    //console.log('componentDidUpdate occured');
    //    //if (this.props.shouldPlay == false){
    //    //    return;
    //    //}
    //    //if (this.state.loaded == false){
    //    //    console.log('loaded = false');
    //    //    //return;
    //    //}
    //    //var youtubeId = this.props.youtubeId;
    //    //var start = this.props.start;
    //    //var end = +start + +this.props.duration;
    //    //this.state.player.loadVideoById({videoId: youtubeId, startSeconds: start, endSeconds: end});
    //    //console.log('start = ' + start + ';end=' + end);
    //    //this.state.player.playVideo();
    //},

    componentWillReceiveProps: function(nextProps) {
        console.log('componentWillReceiveProps occured');
        console.log('current youtubeId: ' + this.props.youtubeId + ' , new youtubeId: ' + nextProps.youtubeId);
        console.log('current start: ' + this.props.start + ' , new start: ' + nextProps.start);
        console.log('current end: ' + this.props.end + ' , new end: ' + nextProps.end);

        //if (this.props.shouldPlay == false){
        //    return;
        //}
        if (this.state.loaded == false){ // phunk
            console.log('loaded = false');
            //return;
        }
        var youtubeId = this.props.youtubeId;
        var start = this.props.start;
        var end = +this.props.end;

        if ((youtubeId != nextProps.youtubeId) || ((youtubeId == nextProps.youtubeId) && ( (start != nextProps.start) || (end != nextProps.end)   ))){
            console.log('loading video by id: youtubeId=' + nextProps.youtubeId + ' start = ' + nextProps.start + ' end = ' + nextProps.end);
            this.state.player.loadVideoById({videoId: nextProps.youtubeId, startSeconds: nextProps.start, endSeconds: nextProps.end});
            this.state.player.playVideo();
            console.log('launched playing');
        }

        console.log('start = ' + start + ';end=' + end);

    },

    replayVideo: function(){
        this.state.player.loadVideoById({videoId: this.props.youtubeId, startSeconds: this.props.start, endSeconds: this.props.end});
        this.state.player.playVideo();
    },

    onPlayerReady: function(evt){
        this.setState({
            loaded: true
        });
        //this.forceUpdate();
    },

    onPlayerStateChange: function(evt){
        console.log('state change: ' + evt.data);
    },

    render: function(){
        console.log('player render occured');
        return (
            React.createElement("div", {className: "panel panel-default "}, 

                React.createElement("div", {className: "panel-body playerPanel"}, 
                    React.createElement("div", {id: "playerDiv"}, 
                        React.createElement("div", {id: "videoPlayerId"})
                    ), 

                    React.createElement("div", {className: "clearfix"}), 

                    React.createElement("div", {className: '', style: {marginTop: 10}}, 
                        React.createElement("button", {className: 'ui mini labeled icon button', onClick: this.replayVideo}, 
                            React.createElement("i", {className: 'repeat icon'}), 
                            "Repeat"
                        )
                    )

                )
            )
        );
    }
});