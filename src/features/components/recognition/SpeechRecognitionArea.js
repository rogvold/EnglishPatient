/**
 * Created by sabir on 16.09.15.
 */
var React = require('react');

var SpeechRecognitionArea = React.createClass({
    getDefaultProps: function () {
        return {
            lang: 'en-US',
            userAnswer: undefined,
            onSubmit: function(text){
                console.log('onSubmit: text = ' + text);
            },
        }
    },

    recognition: undefined,

    getInitialState: function () {
        return {
            transcript: '',
            interimTranscript: '',
            isInitialized: false,
            isCompatible: true,
            recognizing: false,
            errorVisible: false,
            errorMessage: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var ans = nextProps.userAnswer;
        //if (ans != this.props.userAnswer){
        //    this.setState({
        //        transcript: (ans == undefined) ? '' : ans
        //    });
        //}
        if (ans != this.state.transcript){
            this.setState({
                transcript: (ans == undefined) ? '' : ans
            });
        }
    },

    componentDidMount: function () {
        this.init();
    },


    onStart: function(){
        this.setState({
            recognizing: true
        });
    },

    onError: function(event){
        var message = '';
        if (event.error == 'no-speech') {
            message = 'no speech!';
        }
        if (event.error == 'audio-capture') {
            message = 'ошибка микрофона';
        }
        if (event.error == 'not-allowed') {
            message = 'вы запретили доступ к микрофону'
        }
        this.setState({
            errorMessage: message,
            errorVisible: true
        });
    },

    onEnd: function(){
        this.setState({
            recognizing: false
        });
    },

    onResult: function(event){

        var interim_transcript = this.state.interimTranscript;
        var final_transcript = this.state.transcript;

        if (typeof(event.results) == 'undefined') {
            this.recognition.onend = null;
            this.recognition.stop();
            //upgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        this.setState({
            interimTranscript: interim_transcript,
            transcript: final_transcript
        });
    },

    init: function(){
        console.log('init occured');
        if (!('webkitSpeechRecognition' in window)) {
            this.setState({
                isCompatible: false,
                isInitialized: true
            });
            console.log('no webkitSpeechRecognition in window');
            return;
        }
        if (this.state.isInitialized == true){
            console.log('this.state.isInitialized == true - returning');
            return;
        }

        this.recognition = new webkitSpeechRecognition();
        this.recognition.lang = this.props.lang;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.onstart = this.onStart;
        this.recognition.onend = this.onEnd;
        this.recognition.onresult = this.onResult;
        this.setState({
            isInitialized: true,
            isCompatible: true
        });
    },

    startRecognition: function(){
        if (this.state.recognizing) {
            this.recognition.stop();
            return;
        }
        this.recognition.start();
    },

    componentStyle: {
        placeholder: {
            width: 600,
            //height: 160,
            minHeight: 170,
            border: '1px solid lightgrey',
            marginTop: 30,
            position: 'relative'
            //borderRadius: 5
        },
        textareaPlaceholder: {
            width: '100%',
            boxSizing: 'border-box'

        },
        controlsPlaceholder: {
            width: '100%',
            textAlign: 'center',
            minHeight: 70,
            marginBottom: 10
        },

        startButton: {
            marginTop: 10,
            display: 'inline-block'
        },

        textarea: {
            width: '100%',
            fontSize: 30,
            minHeight: 100
        },
        resultPlaceholder:{
            padding: 5,
            fontSize: 26,
            lineHeight: '30px',
            width: '100%',
            display: 'block',
            minHeight: 90,
            overflowY: 'auto',
            borderBottom: '1px solid lightgrey',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        },
        errorPlaceholder:{
            color: 'red',
            fontSize: 24
        },
        clearButton: {
            marginTop: 10,
            display: 'inline-block'
        }
    },

    clear: function(){
        this.setState({
            transcript: ''
        });
    },

    save: function(){
        var text = this.state.transcript;
        this.props.onSubmit(text);
    },

    render: function () {
        var clearButtonIsVisible = (this.state.transcript != undefined && this.state.transcript.trim() != '');
        var finishButtonIsVisible = (this.state.transcript != undefined && this.state.transcript.trim() != '');


        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.textareaPlaceholder}>

                    <div className="ui icon input" style={{width: '100%'}}>

                        <div style={this.componentStyle.resultPlaceholder}>
                            {this.state.transcript}
                        </div>

                        {this.state.recognizing ? null :
                           <i className="circular unmute link icon" style={{display: 'none'}} onClick={this.startRecognition} ></i>
                        }
                    </div>

                </div>

                <div style={this.componentStyle.controlsPlaceholder}>

                    {this.state.recognizing ?
                        <div>
                            Говорите в микрофон
                        </div>
                        :
                        <button className={'ui primary button'} style={this.componentStyle.startButton} onClick={this.startRecognition} >
                            <i className="circular unmute link icon" ></i>
                            начать распознавание
                        </button>
                    }

                    {clearButtonIsVisible == false ? null :
                            <button className={'ui grey button'} style={this.componentStyle.clearButton} onClick={this.clear} >
                                <i className="circular trash outline icon" ></i>
                                очистить текст
                            </button>
                    }
                    {finishButtonIsVisible == false ? null :
                        <button className={'ui green button'} style={this.componentStyle.saveButton} onClick={this.save} >
                            <i className="circular save icon" ></i>
                            ответить
                        </button>
                    }

                </div>

                {this.state.errorVisible ?
                    <div style={this.componentStyle.errorPlaceholder}>
                        {this.state.errorMessage}
                    </div>
                    :
                    null
                }

            </div>
        );
    }

});

module.exports = SpeechRecognitionArea;