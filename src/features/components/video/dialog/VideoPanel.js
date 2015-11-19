/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var VimeoPlayer = require('../../player/VimeoPlayer');

var VideoPanel = React.createClass({
    getDefaultProps: function () {
        return {
            videoType: 'vimeo',
            videoId: undefined,
            transcript: undefined,
            content: undefined
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        playerPlaceholder: {

        },

        transcriptPlaceholder: {
            padding: 10
        },

        contentPlaceholder: {
            padding: 10,
            fontSize: 18,
            lineHeight: '22px'
        }
    },

    getPlayer: function(){
        var videoType = this.props.videoType;
        var vimeoId = undefined;
        if (videoType == 'vimeo'){
            vimeoId = this.props.videoId;
            return (
                <VimeoPlayer
                    style={{width: 800, height: 450}}
                    vimeoId={vimeoId} />
            );
        }
        return null;
    },

    render: function () {
        var player = this.getPlayer();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.playerPlaceholder}>
                    {player}
                </div>


                {this.props.transcript == undefined ? null :
                    <div style={this.componentStyle.transcriptPlaceholder}>
                        {this.props.transcript}
                    </div>
                }

                {this.props.content == undefined ? null :
                    <div style={this.componentStyle.contentPlaceholder}>
                        <div dangerouslySetInnerHTML={{__html: this.props.content}} ></div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = VideoPanel;