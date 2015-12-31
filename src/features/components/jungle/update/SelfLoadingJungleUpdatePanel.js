/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var JungleUpdatePanel = require('./JungleUpdatePanel');

var JungleMixin = require('../../../mixins/JungleMixin');

var SelfLoadingJungleUpdatePanel = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined,
            userId: undefined,

            onUpdated: function(m){

            },

            onCreated: function(m){

            },

            onDeleted: function(){

            }
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
        placeholder: {}
    },

    onSave: function(data){
        if (data == undefined){
            return;
        }
        var materialId = this.props.materialId;
        var userId = this.props.userId;
        this.setState({
            loading: true
        });
        if (materialId == undefined){
            JungleMixin.createJungleMaterial(userId, data, function(m){
                this.setState({
                    loading: false,
                    material: m
                });
                this.props.onCreated(m);
            }.bind(this))
        }else{
            JungleMixin.updateJungleMaterial(materialId, data, function(m){
                this.setState({
                    loading: false,
                    material: m
                });
                this.props.onUpdated(m);
            }.bind(this))
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

    render: function () {
        var m = this.state.material;
        if (m == undefined){
            m = {};
        }

        return (
            <div style={this.componentStyle.placeholder}>


                <JungleUpdatePanel
                        name={m.name}
                        description={m.description}
                        text={m.text}
                        audioUrl={m.audioUrl}
                        vimeoId={m.vimeoId}
                        youtubeId={m.youtubeId}
                        onSave={this.onSave}
                        />


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingJungleUpdatePanel;