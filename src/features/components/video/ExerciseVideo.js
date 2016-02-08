/**
 * Created by sabir on 26.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../mixins/MaterialsMixin');
var VimeoPlayer = require('../player/VimeoPlayer');

var PatientPlayer = require('../player/PatientPlayer');

var MosesPlayer = require('../moses/player/MosesPlayer');

var ExerciseVideo = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: undefined,

            youtubeId: undefined,
            start: undefined,
            end: undefined
        }
    },

    getInitialState: function () {
        return {
            durations: []
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var vimeoId = nextProps.vimeoId;
        var youtubeId = nextProps.youtubeId;
        var start = nextProps.start;
        var end = nextProps.end;


        if (vimeoId != this.props.vimeoId){
            this.load(vimeoId);
        }



    },

    componentDidMount: function () {
        var vimeoId = this.props.vimeoId;
        this.load(vimeoId);
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        }
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
        console.log('Rendering ExerciseVideo: this.props.vimeoId, this.props.youtubeId, this.props.start, this.props.end = ',
            this.props.vimeoId, this.props.youtubeId, this.props.start, this.props.end);


        return (
            <div style={this.componentStyle.placeholder}>

                {isMosesable == true ?
                    <div>
                        <MosesPlayer vimeoId={this.props.vimeoId} durations={this.state.durations} />
                    </div>
                    :
                    <div style={{width: '100%', height: '100%'}} >
                            <PatientPlayer vimeoId={this.props.vimeoId} youtubeId={this.props.youtubeId}
                                                                    start={this.props.start}
                                                                    end={this.props.end}
                            />
                    </div>

                }

            </div>
        );
    }

});

module.exports = ExerciseVideo;