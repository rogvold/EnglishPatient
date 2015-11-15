/**
 * Created by sabir on 14.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploader = require('../../file/FileUploader');
var PatientAudio = require('../../audio/PatientAudio');
var VimeoPlayer = require('../../player/VimeoPlayer');

var CommonMixin = require('../../../../react/mixins/commonMixins/CommonMixin');

var PatientTask = require('../../task/PatientTask');
var ToggledText = require('../../text/ToggledText');
var CardTypeSelectButton = require('./CardTypeSelectButton');
var UserAnswerTypeDemo = require('./UserAnswerTypeDemo');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var MaterialSearchButton = require('../../material/search/MaterialSearchButton');

var EditableCardBlock = React.createClass({
    getDefaultProps: function () {
        return {
            items: [],
            //imageUrl: undefined,
            comment: undefined,
            correctAnswer: undefined,
            hint: undefined,
            transcript: undefined,
            teacherId: undefined,


            //audioUrl: undefined,
            //vimeoUrl: undefined,
            //text: undefined,
            deletable: false,
            answerTypeName: undefined,
            onSave: function(taskData){
                console.log('onSave: ', taskData);
            },
            onDelete: function(){

            }
        }
    },

    getMaterialByType: function(list, type){
        for (var i in list){
            if (list[i].type == type){
                return list[i];
            }
        }
        return undefined;
    },

    getVideo: function(items){
        return this.getMaterialByType(items, 'video');
    },

    getAudio: function(items){
        return this.getMaterialByType(items, 'audio');
    },

    getImage: function(items){
        return this.getMaterialByType(items, 'image');
    },

    getText: function(items){
        return this.getMaterialByType(items, 'text');
    },

    getInitialState: function () {
        var items = this.props.items;
        var imageUrl = (this.getImage(items) == undefined) ? undefined : this.getImage(items).url;
        var audioUrl = (this.getAudio(items) == undefined) ? undefined : this.getAudio(items).url;
        var text = (this.getText(items) == undefined) ? undefined : this.getText(items).text;
        var vimeoUrl = (this.getVideo(items) == undefined) ? undefined : this.getVideo(items).vimeoId;
        return {
            imageUrl: imageUrl,
            comment: this.props.comment,
            hint: this.props.hint,
            audioUrl: audioUrl,
            vimeoUrl: vimeoUrl,
            text: text,
            transcript: this.props.transcript,
            correctAnswer: this.props.correctAnswer,
            answerTypeName: this.props.answerTypeName,
            needToSave: false,
            loading: false
        }
    },

    componentWillReceiveProps: function (np) {
        var items = np.items;
        //todo: check difference
        var imageUrl = (this.getImage(items) == undefined) ? undefined : this.getImage(items).url;
        var audioUrl = (this.getAudio(items) == undefined) ? undefined : this.getAudio(items).url;
        var text = (this.getText(items) == undefined) ? undefined : this.getText(items).text;
        var vimeoUrl = (this.getVideo(items) == undefined) ? undefined : this.getVideo(items).vimeoId;

        //var vimeoUrl = (this.getVideo(items) == undefined) ? undefined : this.getVideo(items).vimeoId;

        console.log('EditableCardBlock: componentWillReceiveProps: nextProps = ', np);

        this.setState({
            imageUrl: imageUrl,
            comment: np.comment,
            transcript: np.transcript,
            correctAnswer: np.correctAnswer,
            hint: np.hint,
            audioUrl: audioUrl,
            vimeoUrl: vimeoUrl,
            text: text,
            answerTypeName: np.answerTypeName,
            needToSave: false,
            loading: false
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 931,
            backgroundColor: 'white',
            height: '100%',
            overflowY: 'hidden',
            margin: '0 auto',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1'
        },

        leftBlock: {
            width: 631,
            height: '100%',
            overflowY: 'auto',
            verticalAlign: 'top',
            borderRight: '1px solid #EFF0F1',
            boxSizing: 'border-box',
            display: 'inline-block'
        },

        rightBlock: {
            verticalAlign: 'top',
            overflowY: 'auto',
            padding: 5,
            paddingTop: 0,
            width: 298,
            height: '100%',
            boxSizing: 'border-box',
            display: 'inline-block',
            borderLeft: '1px solid #EFF0F1'
        },

        label: {
            fontWeight: 'bold',
            //color: '#2E3C54',
            color: '#A1A4AA',
            marginBottom: 3
        },

        leftImageBlock: {
            textAlign: 'center'
        },

        leftAudioBlock: {
            textAlign: 'center'
        },



        rightVideoBlock: {
            marginTop: 0,
            marginBottom: 7
        },

        rightImageBlock: {
            marginTop: 0,
            marginBottom: 7
        },

        vimeoRightBlock: {
            marginTop: 0,
            marginBottom: 1
        },


        deleteImageBlock: {
            cursor: 'pointer',
            marginTop: 0,
            padding: 10
        },

        deleteAudioBlock: {
            cursor: 'pointer',
            padding: 10,
            marginTop: 0
        },

        saveButtonPlaceholder: {
            //marginTop: 5,
            marginTop: 20,
            textAlign: 'right'
        },

        deleteButton: {

        },

        saveButton: {
            marginRight: 0
        }
    },

    onImageUploaded: function(url){
        console.log('onImageUploaded: url = ' + url);
        this.setState({
            imageUrl: url,
            needToSave: true
        });
    },

    onImageDeleted: function(){
        this.setState({
            imageUrl: undefined,
            needToSave: true
        });
    },

    onAudioUploaded: function(url){
        this.setState({
            audioUrl: url,
            needToSave: true
        });
    },

    onAudioDeleted: function(){
        this.setState({
            audioUrl: undefined,
            needToSave: true
        });
    },

    getValueFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined) {return undefined;}
        if (val.trim() == '') {
            return undefined;
        }
        return val;
    },

    onVimeoChange: function(evt){
        var val = evt.target.value;
        if (val == '') {
            val = undefined;
        }
        if (val != undefined){
            var matches = /(\d+)/.exec(val);
            if (matches != undefined && matches.length > 0){
                val = matches[0];
            }else{
                val = undefined;
            }
        }

        console.log('onVimeoChange occured! val = ' + val);
        this.setState({
            vimeoUrl: val,
            needToSave: true
        });


    },



    onTextChange: function(evt){
        var val = this.getValueFromEvt(evt);
        this.setState({
            text: val,
            needToSave: true
        });
    },

    onCommentChange: function(evt){
        var val = this.getValueFromEvt(evt);
        this.setState({
            comment: val,
            needToSave: true
        });
    },

    onCorrectAnswerChange: function(evt){
        var val = this.getValueFromEvt(evt);
        this.setState({
            correctAnswer: val,
            needToSave: true
        });
    },

    onTranscriptChange: function(evt){
        var val = this.getValueFromEvt(evt);
        this.setState({
            transcript: val,
            needToSave: true
        });
    },

    onHintChange: function(evt){
        var val = this.getValueFromEvt(evt);
        this.setState({
            hint: val,
            needToSave: true
        });
    },

    onTypeSelect: function(activeName){
        this.setState({
            answerTypeName: activeName,
            needToSave: true
        });
    },

    getPatientTaskItems: function(){
        console.log('getPatientTaskItems occured');
        var arr =[];
        if (this.state.vimeoUrl != undefined){
            arr.push({ type: 'video', vimeoId: CommonMixin.extractVimeoIdFromUrl(this.state.vimeoUrl) });
        }
        if (this.state.audioUrl != undefined){
            arr.push({ type: 'audio', url: this.state.audioUrl });
        }
        if (this.state.imageUrl != undefined){
            arr.push({ type: 'image', url: this.state.imageUrl });
        }
        if (this.state.text != undefined){
            arr.push({ type: 'text', text: this.state.text });
        }
        console.log('returning ', arr);
        return arr;
    },

    onSave: function(){
        if ((this.isNoData() == true) || (this.state.answerTypeName == undefined)){
            return;
        }
        var data = {
            items: this.getPatientTaskItems(),
            comment: this.state.comment,
            hint: this.state.hint,
            correctAnswer: this.state.correctAnswer,
            transcript: this.state.transcript,
            answerType: this.state.answerTypeName
        };
        this.props.onSave(data);
        this.setState({
            needToSave: false
        });
    },

    onDelete: function(){
        this.props.onDelete();
    },

    isNoData: function(){
        return (this.state.text == undefined && this.state.vimeoUrl == undefined
                && this.state.audioUrl == undefined && this.state.imageUrl == undefined);
    },

    onSearchMaterialSelect: function(m){
        console.log('onSearchMaterialSelect occured: m = ', m);
        this.setState({
            vimeoUrl: m[0].vimeoId,
            transcript: m[0].transcript
        });
    },

    render: function () {
        var noData = this.isNoData();
        var cannotSave = (noData || (this.state.answerTypeName == undefined));
        if (this.state.needToSave == false){
            cannotSave = true;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.leftBlock}>
                    <div className={'ui segment'} style={{height: '100%', border: 'none', borderRadius: 0}} >
                        {noData == true ?
                            <div >
                                <div style={{marginBottom: 20}}>
                                    <b>Создайте новое задание</b>
                                    <br/>

                                </div>
                                <div>
                                    <img style={{width: '100%'}} src={'http://beta.englishpatient.org/img/exCreateMan.gif'} />
                                </div>
                            </div>
                            :
                            <div>
                                <PatientTask items={this.getPatientTaskItems()} />

                                <div>
                                    {this.state.hint == undefined ? null :
                                        <div>
                                            <ToggledText text={this.state.hint} showText={'показать подсказку'} hideText={'скрыть подсказку'} />
                                        </div>
                                    }

                                    {this.state.comment == undefined ? null :
                                        <div>
                                            <ToggledText text={this.state.comment} showText={'показать комментарий'} hideText={'скрыть комментарий'} />
                                        </div>
                                    }
                                </div>
                                
                                {this.state.answerTypeName == undefined ? null :
                                    <UserAnswerTypeDemo type={this.state.answerTypeName} />
                                }
                            </div>
                        }

                    </div>
                </div>

                <div style={this.componentStyle.rightBlock} >

                    <div style={this.componentStyle.rightVideoBlock}>

                        <div className={'ui form'} style={this.componentStyle.vimeoRightBlock} >
                            <div style={this.componentStyle.label} >
                                Видео
                                <span style={{float: 'right'}}>
                                    <MaterialSearchButton teacherId={this.props.teacherId}
                                                          multipleSelect={false}
                                                          dialogLevel={40}
                                                          buttonClassName={'ui button basic mini'}
                                                          buttonStyle={{marginRight: 0, padding: 5}}

                                        onSelect={this.onSearchMaterialSelect}
                                        />
                                </span>
                            </div>
                            <div className="field">
                                <input type="text" value={this.state.vimeoUrl} onChange={this.onVimeoChange} placeholder={'Ссылка на видео с vimeo.com'}  />
                            </div>
                        </div>


                        <div style={this.componentStyle.label} >Картинка</div>
                        {this.state.imageUrl != undefined ?
                            <div style={this.componentStyle.deleteImageBlock} className={'ui red message'} onClick={this.onImageDeleted} >
                                Удалить картинку
                            </div>
                            :
                            <FileUploader containerClassName={'ui message'} onFileUploaded={this.onImageUploaded} />
                        }


                        <div style={this.componentStyle.label} >Аудио</div>
                        {this.state.audioUrl != undefined ?
                            <div style={this.componentStyle.deleteAudioBlock} className={'ui red message'} onClick={this.onAudioDeleted} >
                                Удалить аудио
                            </div>
                            :
                            <FileUploader containerClassName={'ui message'} iconFiletypes={['.mp3']} onFileUploaded={this.onAudioUploaded}  />
                        }

                        <div className={'ui form'} style={assign({}, {marginBottom: 5, paddingBottom: 5, borderBottom: '1px solid #EFF0F1'})} >
                            <div style={this.componentStyle.label} >Текст</div>
                            <div className="field">
                                <input type="text" value={this.state.text} onChange={this.onTextChange} placeholder={'Текст'}  />
                            </div>
                        </div>


                        {noData == true ? null :
                            <div style={{marginTop: 13}} >

                                <div>
                                    <div style={this.componentStyle.label} >Задание для ученика</div>
                                    <CardTypeSelectButton activeName={this.state.answerTypeName} onSelect={this.onTypeSelect} />
                                </div>

                                {this.state.answerTypeName == 'typing' ?
                                        <div className={'ui form'} style={this.componentStyle.vimeoRightBlock} >
                                            <div style={this.componentStyle.label} >Правильный ответ</div>
                                            <div className="field">
                                                <textarea style={{height: '8em'}}
                                                          value={this.state.correctAnswer}
                                                          onChange={this.onCorrectAnswerChange}
                                                          placeholder={'Правильный ответ'}  ></textarea>
                                            </div>
                                        </div>
                                    :
                                    null
                                }


                                <div className={'ui form'} style={assign(this.componentStyle.vimeoRightBlock, {marginTop: 0})} >
                                    <div style={this.componentStyle.label} >Комментарий</div>
                                    <div className="field">
                                        <input type="text" value={this.state.comment} onChange={this.onCommentChange} placeholder={'Комментарий'}  />
                                    </div>
                                </div>
                                <div className={'ui form'} style={this.componentStyle.vimeoRightBlock} >
                                    <div style={this.componentStyle.label} >Подсказка</div>
                                    <div className="field">
                                        <input type="text" value={this.state.hint} onChange={this.onHintChange} placeholder={'Подсказка'}  />
                                    </div>
                                </div>
                                <div className={'ui form'} style={this.componentStyle.vimeoRightBlock} >
                                    <div style={this.componentStyle.label} >Транскрипт</div>
                                    <div className="field">
                                        <textarea style={{height: '8em'}} value={this.state.transcript} onChange={this.onTranscriptChange} placeholder={'Транскрипт'}  ></textarea>
                                    </div>
                                </div>

                            </div>
                        }
                        <div style={this.componentStyle.saveButtonPlaceholder}>

                            {this.props.deletable == false ? null :
                                    <button style={this.componentStyle.deleteButton} className="ui negative button" onClick={this.onDelete} >
                                        <i className={'trash icon'} ></i>
                                        Удалить
                                    </button>
                            }

                            <button style={this.componentStyle.saveButton} disabled={cannotSave} className="ui primary button" onClick={this.onSave} >
                                <i className={'save icon'} ></i>
                                Сохранить
                            </button>
                        </div>

                        <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                            <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }

});

module.exports = EditableCardBlock;