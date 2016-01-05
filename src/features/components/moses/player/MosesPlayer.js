/**
 * Created by sabir on 26.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DurationsBar = require('./DurationsBar');
var PatientPlayer = require('../../player/PatientPlayer');

var MosesPlayer = React.createClass({
    getDefaultProps: function () {
        return {
            durations: [],
            vimeoId: undefined,

            onProgress: function(seconds){

            }
        }
    },

    getInitialState: function () {
        return {
            selectedItem: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 600,
            margin: '0 auto'
        },

        playerPlaceholder: {
            width: 600,
            height: 350
        },

        durationsPlaceholder: {
            width: '100%'
        }
    },

    getCurrentDuration: function(){
        var n = this.state.selectedNumber;
        var list = this.props.durations;
        if (n == undefined || list == undefined || list.length == 0){
            return undefined;
        }
        return list[n];
    },

    onItemClick: function(item){
        console.log('onItemClick occured: item = ', item);
        var number = item.number;
        if (number == this.state.selectedNumber){
            this.setState({
                selectedNumber: undefined
            });
        }else {
            this.setState({
                selectedNumber: number
            });
        }
    },

    render: function () {
        var dur = this.getCurrentDuration();
        if (dur == undefined){
            dur = {};
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.playerPlaceholder}>
                    <PatientPlayer vimeoId={this.props.vimeoId}
                                   playerId={this.props.vimeoId}
                                   end={dur.end}
                                   start={dur.start}
                                   abMode={true}
                                   onProgress={this.props.onProgress}
                        />
                </div>

                <div style={this.componentStyle.durationsPlaceholder}>
                    <DurationsBar onItemClick={this.onItemClick} selectedNumber={this.state.selectedNumber}
                        durations={this.props.durations} />
                </div>

            </div>
        );
    }

});

module.exports = MosesPlayer;