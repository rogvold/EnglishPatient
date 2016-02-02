/**
 * Created by sabir on 21.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var PatientPlayer = require('../../player/PatientPlayer');

var KaraokeMixin = require('../../../mixins/KaraokeMixin');

var TranslatableText = require('../../text/translatable/TranslatableText');

var MiracleKaraokePanel = React.createClass({
    getDefaultProps: function () {
        return {
            youtubeId: undefined,
            subtitles: []
        }
    },

    getInitialState: function () {
        return {
            time: 0,
            seekToValue: 0,
            paused: false,
            hover: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 640,
            height: 420
        },

        playerPlaceholder: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute'
        },

        subtitlesPlaceholder: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 20,
            textAlign: 'center',
            fontSize: 20,
            lineHeight: '24px',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'rgba(46, 60, 84, 0.7)',
            zIndex: 2
        }
    },

    onProgress: function(t){
        this.setState({
            time: t
        });
    },

    onBottomPanelMouseOver: function(){
        console.log('MOUSE OVER!!!');
        if (this.state.hover == true){
            return;
        }

        this.setState({
            hover: true,
            paused: true
        });
    },

    onBottomPanelMouseLeave: function(){
        console.log('MOUSE OUT')
        this.setState({
            hover: false,
            paused: false
        });
    },

    render: function () {
        var currentSubtitle = KaraokeMixin.getCurrentSubtitles(this.props.subtitles, this.state.time);
        var cur = currentSubtitle.current;
        var text = (cur == undefined) ? undefined : cur.text;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.playerPlaceholder}>
                    <PatientPlayer
                                   style={{width: '100%', height: '100%'}}
                                   seekToValue={this.state.seekToValue} paused={this.state.paused}
                                   youtubeId={this.props.youtubeId} onProgress={this.onProgress} />
                </div>

                <div style={this.componentStyle.subtitlesPlaceholder}
                     onMouseOver={this.onBottomPanelMouseOver}
                     onMouseLeave={this.onBottomPanelMouseLeave} >

                        <TranslatableText style={{fontSize: 22}} text={text} />

                </div>



            </div>
        );
    }

});

module.exports = MiracleKaraokePanel;