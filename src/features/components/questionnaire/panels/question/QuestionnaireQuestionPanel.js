/**
 * Created by sabir on 21.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionAnswerPanelsList = require('../answer/QuestionAnswerPanelsList');

var VimeoPlayer = require('../../../player/VimeoPlayer');

var DeleteButton = require('../../../buttons/DeleteButton');

var QuestionnaireQuestionPanel = React.createClass({
    getDefaultProps: function () {
        return {
            number: undefined,
            question: undefined,
            ruQuestion: undefined,
            vimeoId: undefined,
            answers: [],
            name: undefined,

            canDelete: false,

            onChange: function(data){
                console.log(data);
            },

            onSave: function(data){

            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            answers: this.props.answers,
            question: (this.props.question == undefined) ? '' : this.props.question,
            ruQuestion: (this.props.ruQuestion == undefined) ? '' : this.props.ruQuestion,
            vimeoId: this.props.vimeoId,
            name: this.props.name
        }
    },

    componentWillReceiveProps: function (nextProps) {
        console.log('QuestionnaireQuestionPanel: componentWillReceiveProps: ', nextProps);
        this.setState({
            answers: nextProps.answers,
            question: (nextProps.question == undefined) ? '' : nextProps.question,
            ruQuestion: (nextProps.ruQuestion == undefined) ? '' : nextProps.ruQuestion,
            vimeoId: nextProps.vimeoId,
            name: nextProps.name

        });
    },

    componentDidMount: function () {

    },

    getCurrentData: function(){
        return {
            answers: this.state.answers,
            question: this.state.question,
            ruQuestion: this.state.ruQuestion,
            vimeoId: this.state.vimeoId,
            name: this.state.name
        }
    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined;
        }
        return val;
    },

    onVimeoIdChange: function(evt){
        this.setState({
            vimeoId: this.getValFromEvt(evt)
        });
    },

    onNameChange: function(evt){
        this.setState({
            name: this.getValFromEvt(evt)
        });
    },

    onQuestionChange: function(evt){
        this.setState({
            question: this.getValFromEvt(evt)
        });
    },

    onRuQuestionChange: function(evt){
        this.setState({
            ruQuestion: this.getValFromEvt(evt)
        });
    },

    onAnswersChange: function(answers){
        this.setState({
            answers: answers
        });
    },



    addAnswer: function(){
        var answers = this.state.answers;
        answers.push({

        });
        this.setState({
            answers: answers
        });
    },

    removeLastAnswer: function(){
        var answers = this.state.answers;
        answers = answers.slice(0, answers.length - 1);
        this.setState({
            answers: answers
        });
    },

    canAddAnswer: function(){
        var answers = this.state.answers;
        if (answers.length == 0){
            return true;
        }
        var f = true;
        for (var i in answers){
            var a = answers[i];
            if (a.answer == undefined || a.answer.trim() == '' || a.audioUrl == undefined || a.audioUrl.trim() == ''){
                f = false;
            }
        }
        return f;
    },

    canRemoveAnswer: function(){
        var answers = this.state.answers;
        if (answers.length == 0){
            return false;
        }
        return true;
    },

    onListChange: function(answers){
        this.setState({
            answers: answers
        });
    },

    canSave: function(){
        var q = this.state;
        var f = true;
        if (q.question == undefined || q.question == ''
            || q.ruQuestion == undefined || q.ruQuestion == ''
            || q.vimeoId == undefined || q.vimeoId == ''){
            f = false;
        }
        return f;
    },

    onSave: function(){
        var data = this.getCurrentData();
        this.props.onSave(data);
    },

    onDelete: function(){
        this.props.onDelete();
    },

    componentStyle: {
        placeholder: {
            width: 850,
            backgroundColor: 'white',
            padding: 5
        },

        topPlaceholder: {
            minHeight: 180,
            borderBottom: '1px dotted #EFF0F1'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            borderRight: '1px solid #EFF0F1',
            height: '100%',
            width: 250
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 590,
            padding: 5
        },

        answersPlaceholder: {

        },

        textarea: {
            minHeight: 0,
            height: '6em'
        },

        videoBlockPlaceholder: {
            width: '100%',
            minHeight: 167,
            backgroundColor: '#EFF0F1',
            padding: 5,
            borderRadius: 3,
            marginTop: 5
        },

        style: {
            width: '100%',
            height: '100%'
        },

        videoPlaceholder: {
            width: '100%',
            height: 170,
            backgroundColor: '#EFF0F1'
        },

        bottomPlaceholder: {
            padding: 5,
            textAlign: 'center'
        },

        saveButtonPlaceholder: {
            padding: 5,
            textAlign: 'right'
        }

    },

    onDelete: function(){
        this.props.onDelete();
    },

    render: function () {
        var vimeoId = (this.state.vimeoId == undefined) ? '' : this.state.vimeoId;
        var canAddAnswer = this.canAddAnswer();
        var canRemoveAnswer = this.canRemoveAnswer();
        var canSave = this.canSave();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topPlaceholder}>

                    <div style={this.componentStyle.left}>
                        <div style={this.componentStyle.videoBlockPlaceholder}>

                            {this.state.vimeoId == undefined ?
                                <div style={{marginBottom: 15}}>
                                    Введите ссылку на видео (с сайта vimeo.com) в поле ниже
                                </div>
                                :
                                <div style={this.componentStyle.videoPlaceholder}>
                                    <VimeoPlayer style={this.componentStyle.style} vimeoId={this.state.vimeoId} />
                                </div>
                            }

                            <div className={'ui form'}>
                                <div className="field" style={{marginTop: 10}} >
                                    <label>Ссылка на видео<sup style={{color: '#FC636B'}}>*</sup></label>
                                    <input onChange={this.onVimeoIdChange}
                                           value={vimeoId} type="text"
                                           placeholder="ссылка на видео" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div style={this.componentStyle.right}>
                        <div className={'ui form'} >
                            <input value={this.state.name} onChange={this.onNameChange} placeholder={'Название темы вопросы'} />
                        </div>
                        <div className={'ui form'} style={{marginTop: 5}} >
                            <textarea onChange={this.onQuestionChange} placeholder={'Вопрос (по-английски)'}
                                      value={this.state.question} style={this.componentStyle.textarea} ></textarea>
                        </div>
                        <div className={'ui form'} style={{marginTop: 5}} >
                            <textarea onChange={this.onRuQuestionChange} placeholder={'Перевод вопроса (по-русски)'}
                                      value={this.state.ruQuestion} style={this.componentStyle.textarea} ></textarea>
                        </div>
                    </div>

                </div>

                <div style={this.componentStyle.answersPlaceholder}>
                    <QuestionAnswerPanelsList onChange={this.onListChange} answers={this.state.answers} />
                </div>

                <div style={this.componentStyle.bottomPlaceholder}>

                    {canRemoveAnswer == false ? null :
                        <span style={{marginLeft: 10, marginRight: 10}} >
                            <button className={'ui basic red button'} onClick={this.removeLastAnswer} >
                                <i className={'icon remove'} ></i> удалить последний ответ
                            </button>
                        </span>
                    }

                    {canAddAnswer == false ? null :
                        <span style={{marginLeft: 10, marginRight: 10}} >
                            <button className={'ui basic green button'} onClick={this.addAnswer} >
                                <i className={'icon plus'} ></i> добавить ответ
                            </button>
                        </span>
                    }

                </div>

                <div style={this.componentStyle.saveButtonPlaceholder}>
                    <button disabled={!canSave} onClick={this.onSave} className={'ui primary button'} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>

                    {this.props.canDelete == false ? null :
                        <div style={{marginTop: 5}}>
                            <DeleteButton onDelete={this.onDelete} />
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = QuestionnaireQuestionPanel;