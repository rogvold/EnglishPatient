/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var JungleMaterial = require('./JungleMaterial');

var JungleMixin = require('../../mixins/JungleMixin');

var SelfLoadingJungleMaterial = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            material: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            width: 900,
            margin: '0 auto'
        }
    },

    load: function(){
        var materialId = this.props.materialId;
        if (materialId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        JungleMixin.loadJungleMaterial(materialId, function(m){
            this.setState({
                loading: false,
                material: m
            });
        }.bind(this));
    },

    getContent: function(){
        var m = this.state.material;
        if (m == undefined){
            return undefined;
        }
        var contentType = undefined;
        var content = {};
        if (m.youtubeId != undefined){
            content.contentType = 'youtube';
            content.youtubeId = m.youtubeId;
        }
        if (m.vimdeoId != undefined){
            content.contentType = 'vimeo';
            content.vimeoId = m.vimeoId;
        }
        if (m.audioUrl != undefined){
            content.contentType = 'audio';
            content.audioUrl = m.audioUrl;
        }
        return content;
    },

    render: function () {
        var m = this.state.material;
        var content = this.getContent();

        return (
            <div style={this.componentStyle.placeholder}>

                {m == undefined ? null :
                    <JungleMaterial
                        creatorId={m.creatorId}
                        userId={this.props.userId}
                        timestamp={m.timestamp}
                        materialId={m.id} name={m.name} content={content} transcriptText={m.text} />
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingJungleMaterial;