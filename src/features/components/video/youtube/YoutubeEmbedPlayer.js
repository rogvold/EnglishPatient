/**
 * Created by sabir on 17.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var YoutubeEmbedPlayer = React.createClass({
    getDefaultProps: function () {
        return {
            youtubeId: undefined,
            start: undefined,
            end: undefined,
            width: 640,
            height: 360,
            autoplay: false
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
        placeholder: {}
    },

    render: function () {
        var visible = (this.props.youtubeId != undefined);
        var youtubeId = this.props.youtubeId;
        var start = this.props.start;
        var end = this.props.end;
        var autoplay = (this.props.autoplay == undefined || this.props.autoplay == 0) ? '0' : '1';

        var embedCode = '<iframe width="' + this.props.width + '" height="' + this.props.height + '" ' +
            'src="http://www.youtube.com/embed/' + this.props.youtubeId + '?rel=0&autoplay=' + autoplay +
            '' + (start == undefined ? '' : ('&start=' + start)) + '' +
            '' + (end == undefined ? '' : ('&end=' + end)) + '"' +
            'frameborder="0" allowfullscreen></iframe>';

        console.log('rendering YoutubeEmbedPlayer: code = ' + embedCode);

        return (
            <div style={this.componentStyle.placeholder}>
                {visible == false ? null :
                    <div dangerouslySetInnerHTML={{__html: embedCode}} ></div>
                }
            </div>
        );
    }

});

module.exports = YoutubeEmbedPlayer;