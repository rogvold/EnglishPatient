/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientPlayer = require('../player/PatientPlayer');

var MainSubtitlesBlock = require('./subtitles/MainSubtitlesBlock');

var SubtitlesList = require('./subtitles/SubtitlesList');

var KaraokeMixin = require('../../mixins/KaraokeMixin');

var KaraokePlayerPanel = React.createClass({
    getDefaultProps: function () {
        return {
            subtitles: [],
            youtubeId: undefined
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
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            width: 900,
            margin: '0 auto'
        },

        topBlock: {
            height: 350
        },

        bottomBlock: {
            borderTop: '1px solid #EFF0F1'

        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 490
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 408,
            height: '100%'

        },

        playerPlaceholder: {
            height: 350
        }

    },

    onItemClick: function(item){
        if (item == undefined){
            return;
        }
        this.setState({
            time: item.start,
            seekToValue: item.start
        });
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

        //console.log('rendering KaraokePlayerPanel: youtubeId = ', this.props.youtubeId);

        var currentSubtitle = KaraokeMixin.getCurrentSubtitles(this.props.subtitles, this.state.time);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topBlock}>


                    {this.props.youtubeId == undefined ? null :
                        <div style={this.componentStyle.left}>
                            <div style={this.componentStyle.playerPlaceholder}>
                                <PatientPlayer seekToValue={this.state.seekToValue} paused={this.state.paused}
                                               youtubeId={this.props.youtubeId} onProgress={this.onProgress} />
                            </div>
                        </div>
                    }


                    <div style={this.componentStyle.right}>
                        <SubtitlesList onItemClick={this.onItemClick} subtitles={this.props.subtitles}
                                       time={this.state.time} />
                    </div>

                </div>

                <div style={this.componentStyle.bottomBlock}
                     onMouseOver={this.onBottomPanelMouseOver}
                     onMouseLeave={this.onBottomPanelMouseLeave} >

                    <MainSubtitlesBlock currentSubtitle={currentSubtitle} />

                </div>

            </div>
        );
    }

});

module.exports = KaraokePlayerPanel;