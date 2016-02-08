/**
 * Created by sabir on 17.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploader = require('../../file/FileUploader');

var FileUploadButton = require('../../file/FileUploadButton');

var DialogCard = require('../card/DialogCard');

var VimeoPlayer = require('../../player/VimeoPlayer');

var PatientEditor = require('../../editor/PatientEditor');

var ExerciseDialogCardsList = require('../card/ExerciseDialogCardsList');

var DialogMixin = require('../../../mixins/DialogMixin');

var DeleteButton = require('../../buttons/DeleteButton');

var YoutubeSearchButton = require('../../search/youtube/YoutubeSearchButton');

var DialogEditInfoButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,

            dialogId: undefined,

            avatar: undefined,
            name: undefined,
            description: undefined,

            firstRoleImg: undefined,
            secondRoleImg: undefined,

            task: undefined,

            cards: [],

            firstRoleName: undefined,
            secondRoleName: undefined,
            vimeoId: undefined,

            youtubeId: undefined,
            start: undefined,
            end: undefined,

            onUpdate: function(data){

            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            avatar: this.props.avatar,
            name: this.props.name,
            task: this.props.task,
            description: this.props.description,
            firstRoleImg: this.props.firstRoleImg,
            secondRoleImg: this.props.secondRoleImg,
            firstRoleName: this.props.firstRoleName,
            secondRoleName: this.props.secondRoleName,
            vimeoId: this.props.vimeoId,
            youtubeId: this.props.youtubeId,

            start: this.props.start,
            end: this.props.end,

            cards: this.props.cards,

            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 865,
            height: 600,
            textAlign: 'left',
            margin: '0 auto',
            backgroundColor: 'white'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 240,
            padding: 5,
            height: '100%',
            overflowY: 'auto',
            borderRight: '1px solid #EFF0F1'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            overflowY: 'auto',
            width: 625,
            padding: 5,
            height: '100%'
        },

        avatarPlaceholder: {
            height: 150,
            width: 230,
            marginBottom: 5
        },

        avasBlock: {
            textAlign: 'center',
            width: 390,
            margin: '0 auto'
        },

        avaPlaceholder: {
            margin: 7,
            marginTop: 0,
            width: 180,
            textAlign: 'center',
            display: 'inline-block'
        },

        roleAva: {
            width: 160,
            height: 160,
            margin: '0 auto',
            marginBottom: 5
        },

        roleAvaStyle: {
            borderRadius: 200,
            border: '3px solid #EFF0F1'
        },

        roleNameInput: {
            textAlign: 'center',
            padding: 6
        },

        nameInput: {
            padding: 6
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

        descriptionPlaceholder: {
            marginTop: 10
        },

        taskPlaceholder: {
            marginTop: 10
        },

        cardsPlaceholder: {
            margin: '0 auto',
            marginTop: 10,
            width: 613
        },

        bottomButtonsPlaceholder: {
            padding: 10,
            textAlign: 'center'
        },

        saveButtonPlaceholder: {
            padding: 5,
            paddingLeft: 0,
            position: 'absolute',
            zIndex: 10000,
            right: 5,
            bottom: 0
        }
    },

    onAvatarUploaded: function(url){
        this.setState({
            avatar: url
        });
    },

    deleteAvatar: function(){
        this.setState({
            avatar: undefined
        });
    },

    getValFromEvt: function(evt){
        if (evt.target.value == undefined){
            return '';
        }else{
            return evt.target.value;
        }
    },

    onNameChange: function(evt){
        this.setState({
            name: this.getValFromEvt(evt)
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: this.getValFromEvt(evt)
        });
    },

    onFirstRoleNameChange: function(evt){
        this.setState({
            firstRoleName: this.getValFromEvt(evt)
        });
    },

    onSecondRoleNameChange: function(evt){
        this.setState({
            secondRoleName: this.getValFromEvt(evt)
        });
    },

    onFirstRoleImgChange: function(url){
        this.setState({
            firstRoleImg: url
        });
    },

    onSecondRoleImgChange: function(url){
        this.setState({
            secondRoleImg: url
        });
    },

    onTaskChange: function(evt){
        this.setState({
            task: this.getValFromEvt(evt)
        });
    },

    onVimeoIdChange: function(evt){
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

        this.setState({
            vimeoId: val
        });
    },

    onCardsChange: function(cards){
        this.setState({
            cards: cards
        });
    },

    addCard: function(){
        var cards = this.state.cards;
        cards.push({
            dialogId: this.props.dialogId,
            number: cards.length
        });
        this.setState({
            cards: cards
        });
    },

    canAddCard: function(){
        var f = true;
        var list = this.state.cards;
        for (var i in list){
            var c = list[i];
            if ((c.text == undefined || c.text.trim() == '') || (c.audioUrl == undefined)){
                f = false;
                break;
            }
        }
        return f;
    },

    removeLastCard: function(){
        this.setState({
            cards: this.state.cards.slice(0, this.state.cards.length - 1)
        });
    },

    updateDialog: function(){
        var data = {
            name: this.state.name,
            avatar: this.state.avatar,
            task: this.state.task,
            description: this.state.description,
            firstRoleImg: this.state.firstRoleImg,
            secondRoleImg: this.state.secondRoleImg,
            cards: this.state.cards,
            firstRoleName: this.state.firstRoleName,
            secondRoleName: this.state.secondRoleName,
            vimeoId: this.state.vimeoId
        };
        this.props.onUpdate(data);
    },

    canSave: function(){
        if (this.canAddCard() == false){
            return false;
        }
        if (this.state.name == undefined ||
                                        this.state.firstRoleName == undefined ||
                                        this.state.vimeoId == undefined ||
                                        this.state.secondRoleName == undefined){
            return false;
        }
        return true;
    },

    onDelete: function(){
        this.props.onDelete();
    },



    render: function () {
        var vimeoId = (this.state.vimeoId == undefined) ? '' : this.state.vimeoId;
        var canAddCard = this.canAddCard();
        var canRemoveLastCard = (this.state.cards != undefined && this.state.cards.length > 0);
        var canSave = this.canSave();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <DialogCard avatar={this.state.avatar} name={this.state.name} />
                    </div>


                    <div style={{marginBottom: 5}} >
                        {this.state.avatar == undefined ?
                            <FileUploadButton  icon={'icon upload'} className={'ui fluid tiny basic grey button'}
                                               buttonName={'загрузить картинку'}  onFileUploaded={this.onAvatarUploaded} />
                            :
                            <div style={{padding: 7, cursor: 'pointer', opacity: 0.8}} className={'ui red message'} onClick={this.deleteAvatar} >
                                <i className={'icon remove'} ></i>удалить аватар
                            </div>
                        }
                    </div>

                    <div className={'ui form'}>
                        <label>Название диалога<sup style={{color: '#FC636B'}}>*</sup></label>
                        <input placeholder={'Название диалога'}
                               style={this.componentStyle.nameInput}
                               value={this.state.name}
                               onChange={this.onNameChange} />
                    </div>


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
                                       style={this.componentStyle.nameInput}
                                       value={vimeoId} type="text"
                                       placeholder="ссылка на видео" />
                            </div>
                        </div>



                    </div>

                    <div style={this.componentStyle.descriptionPlaceholder}>
                        <div className={'ui form'}>
                            <textarea value={this.state.description} style={{minHeight: 0, height: '6em'}}
                                  placeholder={'Краткое описание диалога'}
                                  onChange={this.onDescriptionChange}></textarea>
                        </div>
                    </div>

                    <div style={this.componentStyle.taskPlaceholder}>
                        <div className={'ui form'}>
                            <textarea value={this.state.task} style={{minHeight: 0, height: '6em'}}
                                      placeholder={'Описание задания для ученика'}
                                      onChange={this.onTaskChange}></textarea>
                        </div>
                    </div>

                    <div style={this.componentStyle.saveButtonPlaceholder}>

                        {this.props.dialogId == undefined ? null :
                            <div style={{display: 'inline-block'}}>
                                <DeleteButton onDelete={this.onDelete} />
                            </div>
                        }

                        <button disabled={!canSave} className={'ui patientPrimary button'} onClick={this.updateDialog} >
                            <i className={'icon save'} ></i> Сохранить
                        </button>



                    </div>

                </div>

                <div style={this.componentStyle.right}>


                    <div style={this.componentStyle.avasBlock}>

                        <div style={this.componentStyle.avaPlaceholder}>

                            <div style={this.componentStyle.roleAva}>
                                <DialogCard style={this.componentStyle.roleAvaStyle}
                                            opacity={0.3}
                                            avatar={this.state.firstRoleImg} />
                            </div>

                            <div style={{marginTop: 5, marginBottom: 5}} >
                                {this.state.firstRoleImg == undefined ?
                                    <FileUploadButton className={'ui fluid tiny basic grey button'} icon={'icon upload'} buttonName={'загрузить картинку'}  onFileUploaded={this.onFirstRoleImgChange} />
                                    :
                                    <div style={{padding: 6, cursor: 'pointer', opacity: 0.8}} className={'ui red message'} onClick={this.onFirstRoleImgChange.bind(this, undefined)} >
                                        <i className={'icon remove'} ></i>удалить аватар
                                    </div>
                                }
                            </div>

                            <div className={'ui form'}>
                                <input placeholder={'Имя первого персонажа'} value={this.state.firstRoleName}
                                       style={this.componentStyle.roleNameInput} onChange={this.onFirstRoleNameChange} />
                            </div>

                        </div>

                        <div style={this.componentStyle.avaPlaceholder}>

                            <div style={this.componentStyle.roleAva}>
                                <DialogCard style={this.componentStyle.roleAvaStyle}
                                            opacity={0.3}
                                            avatar={this.state.secondRoleImg} />
                            </div>

                            <div style={{marginTop: 5, marginBottom: 5}} >
                                {this.state.secondRoleImg == undefined ?
                                    <FileUploadButton className={'ui fluid tiny basic grey button'} icon={'icon upload'} buttonName={'загрузить картинку'} onFileUploaded={this.onSecondRoleImgChange} />
                                    :
                                    <div style={{padding: 6, cursor: 'pointer', opacity: 0.8}} className={'ui red message'} onClick={this.onSecondRoleImgChange.bind(this, undefined)} >
                                        <i className={'icon remove'} ></i>удалить аватар
                                    </div>
                                }
                            </div>

                            <div className={'ui form'}>
                                <input placeholder={'Имя второго персонажа'} value={this.state.secondRoleName}
                                       style={this.componentStyle.roleNameInput}
                                       onChange={this.onSecondRoleNameChange} />
                            </div>

                        </div>

                    </div>




                    <div style={this.componentStyle.cardsPlaceholder}>

                        <ExerciseDialogCardsList
                            firstRoleName={this.state.firstRoleName}
                            secondRoleName={this.state.secondRoleName}
                            cards={this.state.cards} onChange={this.onCardsChange} />

                    </div>


                        <div style={this.componentStyle.bottomButtonsPlaceholder}>

                            {canRemoveLastCard == false ? null :
                                <button style={{marginRight: 15}} className={'ui tiny button red basic'} onClick={this.removeLastCard} >
                                    <i className={'icon remove'} ></i>  удалить последнюю фразу
                                </button>
                            }

                            {canAddCard == false ? null :
                                <button className={'ui tiny button green basic'} onClick={this.addCard} >
                                    <i className={'icon plus'} ></i>  добавить фразу
                                </button>
                            }

                        </div>


                </div>


            </div>
        );
    }

});

module.exports = DialogEditInfoButton;