/**
 * Created by sabir on 23.09.15.
 */
var React = require('react');
var Vimeo = require('react-vimeo');
var assign = require('object-assign');

var VimeoPlayer = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: '',
            style: {

            }
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onPlay: function(){
        console.log('onPlay occured');
    },

    onPause: function(){
        console.log('onPause occured');
    },

    onPlayProgress: function(p){
        console.log('onPlayProgress occured', p);
    },

    onReady: function(){
        console.log('onReady occured');
    },

    onSeek: function(){
        console.log('onSeek occured');
    },

    onFinish: function(){
        console.log('onFinish occured');
    },

    componentStyle: {
        placeholder: {
            width: 600,
            height: 350
        }
    },

    render: function () {
        var v = this.props.vimeoId;
        if (this.props.vimeoId != undefined){
            var matches = /(\d+)/.exec(v);
            if (matches != undefined && matches.length > 0){
                v = matches[0];
            }
        }
        console.log('rendering vimeo player: v = ' + v);
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st}>
                <Vimeo
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onPlayProgress={this.onPlayProgress}
                    onReady={this.onReady}
                    onSeek={this.onSeek}
                    onFinish={this.onFinish}
                    videoId={v} />
            </div>
        );
    }

});

module.exports = VimeoPlayer;