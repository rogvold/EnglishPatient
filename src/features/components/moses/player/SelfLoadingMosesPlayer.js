/**
 * Created by sabir on 26.12.15.
 */

// this player will not be used

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var MosesPlayer = require('./MosesPlayer');

var SelfLoadingMosesPlayer = React.createClass({
    getDefaultProps: function () {
        return {
            materialId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            vimeoId: undefined,
            durations: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        playerPlaceholder: {

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
        MaterialsMixin.loadMaterial(materialId, function(m){
            this.setState({
                vimeoId: m.vimeoId,
                durations: m.mosesDurations,
                loading: false
            });
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.loading == true ? null :
                    <div style={this.componentStyle.playerPlaceholder}>
                        <MosesPlayer vimeoId={this.state.vimeoId} durations={this.state.durations} />
                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingMosesPlayer;