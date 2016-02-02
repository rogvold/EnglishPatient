/**
 * Created by sabir on 26.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Sound = require('react-sound');

var SoundComponent = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SoundStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        if (flux == undefined){
            return;
        }
        var store = flux.store('SoundStore');
        return store.getState();
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    onFinishedPlaying: function(){
        var flux = this.getFlux();
        if (flux == undefined){
            return;
        }
        flux.actions.soundFinished();
    },

    componentStyle: {
        placeholder: {
            display: 'none'
        }
    },

    render: function(){
        var playing = this.state.playing;
        var url = this.state.url;

        console.log('SoundComponent: render: playing, url = ', playing, url);

        var status = (playing == true) ? Sound.status.PLAYING : Sound.status.STOPPED;

        return (
            <div style={this.componentStyle.placeholder} >
                {url == undefined ? null :
                    <Sound
                        onFinishedPlaying={this.onFinishedPlaying}
                        playStatus={status} url={url} />
                }
            </div>
        );
    }

});

module.exports = SoundComponent;