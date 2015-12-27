/**
 * Created by sabir on 21.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploadButton = require('../../../file/FileUploadButton');

var QuestionAnswerPanel = React.createClass({
    getDefaultProps: function () {
        return {
            answer: undefined,
            ruAnswer: undefined,
            audioUrl: undefined,
            number: undefined,

            onChange: function(number, answer, ruAnswer, audioUrl){

            }

        }
    },

    getInitialState: function () {
        return {
            ruAnswer: this.props.ruAnswer,
            answer: this.props.answer,
            audioUrl: this.props.audioUrl
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var answer = nextProps.answer;
        var ruAnswer = nextProps.ruAnswer;
        var audioUrl = nextProps.audioUrl;
        this.setState({
            answer: answer,
            ruAnswer: ruAnswer,
            audioUrl: audioUrl
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            padding: 5,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            width: 822,
            borderRadius: 4
        },

        answerPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 5,
            width: 300
        },

        ruAnswerPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 5,
            width: 300
        },

        audioPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 200
        },

        audio: {
            width: '100%'
        },

        uploadButtonPlaceholder: {

        },

        textarea: {
            minHeight: 0,
            height: '5em'
        }

    },

    onChange: function(){
        var number = this.props.number;
        var answer = this.state.answer;
        var ruAnswer = this.state.ruAnswer;
        var audioUrl = this.state.audioUrl;
        this.props.onChange(number, answer, ruAnswer, audioUrl);
    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined;
        }
        return val;
    },

    onAnswerChange: function(evt){
        this.setState({
            answer: this.getValFromEvt(evt)
        });
        this.props.onChange(this.props.number, this.getValFromEvt(evt), this.state.ruAnswer, this.state.audioUrl);
    },

    onRuAnswerChange: function(evt){
        this.setState({
            ruAnswer: this.getValFromEvt(evt)
        });
        this.props.onChange(this.props.number, this.state.answer, this.getValFromEvt(evt), this.state.audioUrl);
    },

    onFileUploaded: function(url){
        this.setState({
            audioUrl: url
        });
        this.props.onChange(this.props.number, this.state.answer, this.state.ruAnswer, url);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.answerPlaceholder}>
                    <div className={'ui form'} >
                        <textarea value={this.state.answer} placeholder={'Вариант ответа (по-английски)'}
                                  style={this.componentStyle.textarea}
                                  onChange={this.onAnswerChange} ></textarea>
                    </div>
                </div>

                <div style={this.componentStyle.ruAnswerPlaceholder}>
                    <div className={'ui form'} >
                        <textarea style={this.componentStyle.textarea} placeholder={'Перевод ответа'}
                                  value={this.state.ruAnswer}
                                  onChange={this.onRuAnswerChange} ></textarea>
                    </div>
                </div>

                <div style={this.componentStyle.audioPlaceholder}>

                    {this.state.audioUrl == undefined ? null :
                        <audio style={this.componentStyle.audio} src={this.state.audioUrl} controls ></audio>
                    }

                    <div style={this.componentStyle.uploadButtonPlaceholder}>
                        <FileUploadButton
                            buttonName={'загрузить аудио'} icon={'icon upload'}
                            className={'ui basic fluid button'} onFileUploaded={this.onFileUploaded} />
                    </div>


                </div>


            </div>
        );
    }

});

module.exports = QuestionAnswerPanel;