/**
 * Created by sabir on 25.02.16.
 */

var React = require('react');
var assign = require('object-assign');
var PatientRecordComponent = require('./PatientRecordComponent');

var CountdownRecordComponent = React.createClass({
    getDefaultProps: function () {
        return {
            maxRecordTime: 30,
            onSave: function(url){

            },
            userAnswer: undefined
        }
    },

    getInitialState: function () {
        return {
            time: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        playerPlaceholder: {

        },

        progressPlaceholder: {

        }
    },

    // t is in milliseconds
    onTick: function(t){
        this.setState({
            time: t
        });
    },

    onStartRecording: function(){
        this.setState({
            time: 0
        });
    },

    onSavingStart: function(){

    },

    render: function () {
        var t = this.state.time == undefined ? 0 : this.state.time;
        var dur = this.props.maxRecordTime * 1000;
        var perc = Math.floor(100.0 * t / dur);
        var progressWidth = (Math.floor(100.0 * perc) / 100.0) + '%';
        var progressStyle = {width: progressWidth};

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.progressPlaceholder}>
                    <div className="ui tiny progress">
                        <div className="bar" style={progressStyle} ></div>
                    </div>
                </div>

                <div style={this.componentStyle.playerPlaceholder}>
                    <PatientRecordComponent
                        onStartRecording={this.onStartRecording}
                        onSavingStart={this.onSavingStart}
                        maxRecordTime={this.props.maxRecordTime}
                        userAnswer={this.props.userAnswer} onSave={this.props.onSave}
                        timerEnabled={true} onTick={this.onTick} />
                </div>

            </div>
        );
    }

});

module.exports = CountdownRecordComponent;