/**
 * Created by sabir on 21.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var KaraokeMixin = require('../../../mixins/KaraokeMixin');

var CoolPreloader = require('../../preloader/CoolPreloader');

var MiracleKaraokePanel = require('./MiracleKaraokePanel');

var SelfLoadingMiracleKaraokePanel = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined
        }
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

    getInitialState: function () {
        return {}
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
        placeholder: {
            positin: 'relative'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <MiracleKaraokePanel youtubeId={this.state.youtubeId} subtitles={this.state.subtitles} />

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = SelfLoadingMiracleKaraokePanel;