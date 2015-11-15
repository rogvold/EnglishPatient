/**
 * Created by sabir on 27.09.15.
 */
var React = require('react');
var Sound = require('react-sound');
var assign = require('object-assign');

var PatientAudio = React.createClass({
    getDefaultProps: function () {
        return {
            isVisible: true,
            onLoading: function(obj){
                console.log('PatientAudio: onLoading occured', obj);
            },
            onPlaying: function(obj){
                console.log('onPlaying occured', obj);
            },
            onFinishedPlaying: function(obj){
                console.log('onFinishedPlaying occured', obj);
            },
            autoplay: false,
            url: undefined,
            inline: false
        }
    },

    getInitialState: function () {
        return {
            //playStatus:
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            textAlign: 'center'
        }
    },

    render: function () {
        var style = assign({}, this.componentStyle.placeholder);
        if (this.props.inline == true){
            style = assign({}, style, {display: 'inline-block'});
        }

        return (

            <div style={style}>
                {this.props.url == undefined ? null
                : <audio controls={'1'} autoplay={this.props.autoplay} src={this.props.url} ></audio>
                }

            </div>
        );
    }

});

module.exports = PatientAudio;