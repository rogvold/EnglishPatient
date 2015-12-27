/**
 * Created by sabir on 26.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../mixins/MaterialsMixin');
var VimeoPlayer = require('../player/VimeoPlayer');

var MosesPlayer = require('../moses/player/MosesPlayer');

var ExerciseVideo = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: undefined
        }
    },

    getInitialState: function () {
        return {
            durations: []
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var vimeoId = nextProps.vimeoId;
        if (vimeoId != this.props.vimeoId){
            this.load(vimeoId);
        }
    },

    componentDidMount: function () {
        var vimeoId = this.props.vimeoId;
        this.load(vimeoId);
    },

    componentStyle: {
        placeholder: {}
    },

    load: function(vimeoId){
        console.log('ExerciseVideo: load: vimeoId = ' + vimeoId);
        if (this.state.durations != undefined && this.state.durations.length > 0){
            this.setState({
                durations: []
            });
        }
        MaterialsMixin.loadMaterialByVimeoId(vimeoId, function(m){
            console.log('video loaded: ', m);
            if (m == undefined){
                return;
            }
            var durations = m.mosesDurations;
            if (durations != undefined && durations.length > 0){
                this.setState({
                    durations: durations
                });
            }
        }.bind(this));
    },

    render: function () {
        var isMosesable = (this.state.durations != undefined && this.state.durations.length > 0);
        return (
            <div style={this.componentStyle.placeholder}>

                {isMosesable == true ?
                    <div>
                        <MosesPlayer vimeoId={this.props.vimeoId} durations={this.state.durations} />
                    </div>
                    :
                    <VimeoPlayer vimeoId={this.props.vimeoId} />
                }

            </div>
        );
    }

});

module.exports = ExerciseVideo;