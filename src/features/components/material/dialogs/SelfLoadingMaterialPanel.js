/**
 * Created by sabir on 23.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialPanel = require('./MaterialPanel');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');
var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var SelfLoadingMaterialPanel = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            name: undefined,
            transcript: undefined,
            comment: undefined,
            tags: undefined,
            lang: 'en',
            access: 'private'
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.materialId != undefined){
            if (nextProps.materialId == this.props.materialId){
                return;
            }
            this.load(nextProps.materialId, function(m){
                console.log('SelfLoadingMaterialPanel: material loaded: ', m);
            });
        }
    },

    componentDidMount: function () {
        var materialId = this.props.materialId;
        if (materialId == undefined){
            return;
        }
        this.load(materialId, function(m){
            console.log('SelfLoadingMaterialPanel: material loaded: ', m);
        });
    },

    load: function(materialId, callback){
        this.setState({
            loading: true
        });
        MaterialsMixin.loadMaterial(materialId, function(m){
            this.setState({
                loading: false,
                name: m.name,
                vimeoId: m.vimeoId,
                youtubeId: m.youtubeId,
                start: m.start,
                end: m.end,
                comment: m.comment,
                transcript: m.transcript,
                avatar: m.avatar,
                tags: m.tags,
                groups: m.groups,
                lang: m.lang,
                access: m.access
            });
            callback(m);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {

        }
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.loading == true ? null :
                    <MaterialPanel vimeoId={this.state.vimeoId} name={this.state.name}
                                   youtubeId={this.state.youtubeId} start={this.state.start}
                                   end={this.state.end}
                                   tags={this.state.tags} comment={this.state.comment}
                                   lang={this.state.lang}
                                   access={this.state.access}
                                   transcript={this.state.transcript}
                        />
                }



                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingMaterialPanel;