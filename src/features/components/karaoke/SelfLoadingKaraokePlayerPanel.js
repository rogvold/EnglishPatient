/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var KaraokePlayerPanel = require('./KaraokePlayerPanel');

var KaraokeMixin = require('../../mixins/KaraokeMixin');

var SelfLoadingKaraokePlayerPanel = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            youtubeId: undefined,
            subtitles: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var materialId = nextProps.materialId;
        if (materialId == this.props.materialId){
            return;
        }
        this.load(materialId, function(data){
            console.log('data loaded: ', data);
        });
    },

    componentDidMount: function () {
        var materialId = this.props.materialId;
        this.load(materialId, function(data){
            console.log('material loaded: ', data);
        });
    },

    componentStyle: {
        placeholder: {}
    },

    load: function(materialId, callback){
        if (materialId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        KaraokeMixin.loadKaraoke(materialId, function(data){
            this.setState({
                loading: false,
                youtubeId: data.youtubeId,
                subtitles: data.subtitles
            });
            callback(data);
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>


                <KaraokePlayerPanel youtubeId={this.state.youtubeId} subtitles={this.state.subtitles} />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingKaraokePlayerPanel;