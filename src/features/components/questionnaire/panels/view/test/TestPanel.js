/**
 * Created by sabir on 24.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientRecordComponent = require('../../../../record/PatientRecordComponent');

var VimeoPlayer = require('../../../../player/VimeoPlayer');

var TestPanel = React.createClass({
    getDefaultProps: function () {
        return {
            question: undefined,
            answer: undefined,

            onAnswer: function(url){

            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            paddingBottom: 5
        },

        content: {

        },

        topBlock: {

        },

        namePlaceholder: {
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            padding: 5,
            marginBottom: 8
        },

        playerPlaceholder: {
            width: 600,
            height: 350,
            margin: '0 auto',
            marginBottom: 10
        },

        recorderBlock: {
            width: 600,
            margin: '0 auto',
            marginBottom: 5
        }
    },

    getAnswerUrl: function(){
        var a = this.props.answer;
        if (a == undefined){
            return undefined;
        }
        return a.audioUrl;
    },

    onAnswer: function(url){
        this.props.onAnswer(url);
    },


    render: function () {
        var q = this.props.question;
        var userAudioUrl = this.getAnswerUrl();


        return (
            <div style={this.componentStyle.placeholder}>

                {q == undefined ? null :
                    <div style={this.componentStyle.content}>

                        <div style={this.componentStyle.topBlock}>

                            <div style={this.componentStyle.namePlaceholder}>
                                {q.name}
                            </div>

                            <div style={this.componentStyle.playerPlaceholder}>
                                <VimeoPlayer vimeoId={q.vimeoId} style={{width: '100%', height: '100%'}} />
                            </div>

                        </div>

                        <div style={this.componentStyle.recorderBlock}>
                            <PatientRecordComponent onSave={this.onAnswer} userAnswer={userAudioUrl} />
                        </div>

                    </div>
                }

            </div>
        );
    }

});

module.exports = TestPanel;