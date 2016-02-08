/**
 * Created by sabir on 08.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var YoutubeSubtitlesHelper = require('../../../helpers/subtitles/YoutubeSubtitlesHelper');

var CoolPreloader = require('../../preloader/CoolPreloader');

var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var SubtitlesExtractorPanel = React.createClass({
    getDefaultProps: function () {
        return {
            lang: 'de'
        }
    },

    getInitialState: function () {
        return {
            text: undefined,
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            minHeight: 200,
            backgroundColor: 'white',
            padding: 10,
            border: '1px solid lightgrey'
        }
    },

    onTextChange: function(evt){
        var val = evt.target.value;
        this.setState({
            text: val
        });
    },

    extract: function(){
        var youtubeId = this.state.text;
        if (youtubeId == undefined || youtubeId.trim().length != 11){
            youtubeId = CommonMixin.extractYoutubeIdFromUrl(youtubeId);
        }
        if (youtubeId == undefined || youtubeId.trim().length != 11){
            return;
        }

        youtubeId = youtubeId.trim();
        this.setState({
            loading: true
        });
        YoutubeSubtitlesHelper.processVideo(youtubeId, function(payload){
            console.log(payload);
            this.setState({
                loading: false
            });
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui form'} >
                    <input value={this.state.text} onChange={this.onTextChange} placeholder={'youtubeId'} />
                </div>

                <button className={'ui button patientPrimary'} onClick={this.extract} >
                    do it!
                </button>

            </div>
        );
    }

});

module.exports = SubtitlesExtractorPanel;