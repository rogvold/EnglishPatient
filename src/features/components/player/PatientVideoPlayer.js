/**
 * Created by sabir on 04.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var ReactPlayer = require('react-player');

var VideoMixin = require('../../mixins/VideoMixin');

var PatientVideoPlayer = React.createClass({
    getDefaultProps: function () {
        return {

            youtubeId: undefined,
            vimeoId: undefined

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            playing: false,
            loaded: 0,
            played: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        }
    },

    getUrl: function(){
        if (this.props.vimeoId != undefined){
            return ('https://vimeo.com/' + this.props.vimeoId)
        }
        if (this.props.youtubeId != undefined){
            return ('https://www.youtube.com/watch?v=' + this.props.youtubeId)
        }
    },


    onPause: function(){

    },

    onEnded: function(){

    },

    onProgress: function(){

    },

    render: function () {
        var url = this.getUrl();
        var vimeoId = this.props.vimeoId;

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.loading == true ? null :
                    <div>
                        <ReactPlayer url={url} />
                    </div>
                }

            </div>
        );
    }

});

module.exports = PatientVideoPlayer;