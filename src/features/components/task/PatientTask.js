/**
 * Created by sabir on 29.09.15.
 */
var React = require('react');

var VimeoPlayer = require('../player/VimeoPlayer');
var PatientImg = require('../image/PatientImg');
var PatientText = require('../text/PatientText');
var PatientAudio = require('../audio/PatientAudio');

var TranslatableText = require('../text/translatable/TranslatableText');

var PatientTask = React.createClass({
    getDefaultProps: function () {
        return {
            items: [
                {
                    type: 'video',
                    vimeoId: undefined
                },
                {
                    type: 'text',
                    text: undefined
                },
                {
                    type: 'audio',
                    url: undefined
                },
                {
                    type: 'image',
                    url: undefined
                }
            ]
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    getMaterialByType: function(list, type){
        for (var i in list){
            if (list[i].type == type){
                return list[i];
            }
        }
        return undefined;
    },

    getVideo: function(){
        return this.getMaterialByType(this.props.items, 'video');
    },

    getAudio: function(){
        return this.getMaterialByType(this.props.items, 'audio');
    },

    getImage: function(){
        return this.getMaterialByType(this.props.items, 'image');
    },

    getText: function(){
        return this.getMaterialByType(this.props.items, 'text');
    },


    componentStyle: {
        placeholder: {

        },

        videoPlaceholder: {

        },

        textPlaceholder: {

        },

        imagePlaceholder: {

        },

        audioPlaceholder: {

        }

    },

    render: function () {
        var audio = this.getAudio();
        var video = this.getVideo();
        var text = this.getText();
        var image = this.getImage();

        return (
            <div style={this.componentStyle.placeholder}>

                {((video == undefined) || (video.vimeoId == undefined)) ? null :
                    <div style={this.componentStyle.videoPlaceholder}>
                        <VimeoPlayer vimeoId={video.vimeoId} />
                    </div>
                }

                {((image == undefined) || (image.url == undefined)) ? null :
                    <div style={this.componentStyle.imagePlaceholder}>
                        <PatientImg url={image.url} />
                    </div>
                }

                {((audio == undefined) || (audio.url == undefined)) ? null :
                    <div style={this.componentStyle.audioPlaceholder}>
                        <PatientAudio url={audio.url} />
                    </div>
                }

                {((text == undefined) || (text.text == undefined)) ? null :
                    <div style={this.componentStyle.textPlaceholder}>
                        <PatientText fontSize={20} text={text.text} />



                    </div>
                }

            </div>
        );
    }

});

module.exports = PatientTask;