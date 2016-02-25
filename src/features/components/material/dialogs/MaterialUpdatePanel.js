/**
 * Created by sabir on 22.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var VimeoPlayer = require('../../player/VimeoPlayer');

var MaterialTags = require('../../material/MaterialTags');

var PatientEditor = require('../../editor/PatientEditor');

var GroupsSelect = require('../groups/GroupsSelect');

var DeleteButton = require('../../buttons/DeleteButton');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var MosesEditorButton = require('../../moses/editor/MosesEditorButton');

var YoutubeSearchButton = require('../../search/youtube/YoutubeSearchButton');

var AddVideoButton = require('../../video/AddVideoButton');

var PatientPlayer = require('../../player/PatientPlayer');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var AccessSwitcher = require('../../exercise/info/AccessSwitcher');

var ShareButton = require('../../share/buttons/ShareButton');

var Textarea = require('react-textarea-autosize');

var MaterialUpdatePanel = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: undefined,
            youtubeId: undefined,
            start: undefined,
            end: undefined,

            avatar: undefined,
            duration: undefined,

            name: undefined,
            transcript: undefined,
            comment: undefined,
            tags: [],
            groups: [],
            allGroupsList: [],
            lang: undefined,
            access: undefined,

            onSave: function(data){

            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            vimeoId: this.props.vimeoId,
            youtubeId: this.props.youtubeId,
            start: this.props.start,
            end: this.props.end,

            avatar: this.props.avatar,
            duration: this.props.duration,
            lang: this.props.lang,
            access: this.props.access,

            name: this.props.name,
            transcript: this.props.transcript,
            comment: this.props.comment,
            defaultComment: this.props.comment,
            tags: this.props.tags,
            groups: this.props.groups,
            needToSave: false
        }
    },

    componentWillReceiveProps: function (np) {
        var state = this.state;
        var st = {};
        if (state.vimeoId == undefined){st = assign({}, st, {vimeoId: np.vimeoId})};
        if (state.youtubeId == undefined){st = assign({}, st, {youtubeId: np.youtubeId})};
        if (state.start == undefined){st = assign({}, st, {start: np.start})};
        if (state.end == undefined){st = assign({}, st, {end: np.end})};

        if (state.duration == undefined){st = assign({}, st, {duration: np.duration})};
        if (state.avatar == undefined){st = assign({}, st, {avatar: np.avatar})};
        if (state.lang == undefined){st = assign({}, st, {lang: np.lang})};
        if (state.access == undefined){st = assign({}, st, {access: np.access})};

        if (state.youtubeId == undefined){st = assign({}, st, {youtubeId: np.youtubeId})};
        if (state.name == undefined){st = assign({}, st, {name: np.name})};
        if (state.transcript == undefined){st = assign({}, st, {transcript: np.transcript})};
        if (state.comment == undefined){st = assign({}, st, {comment: np.comment})};
        if (state.defaultComment == undefined){st = assign({}, st, {defaultComment: np.comment})};
        if (state.tags == undefined){st = assign({}, st, {tags: np.tags})};
        if (state.groups == undefined || state.groups.length == 0){st = assign({}, st, {groups: np.groups})};
        this.setState(st);
        //this.setState({
        //    vimeoId: np.vimeoId,
        //    youtubeId: np.youtubeId,
        //    name: np.name,
        //    transcript: np.transcript,
        //    comment: np.comment,
        //    defaultComment: np.comment,
        //    tags: np.tags,
        //    groups: np.groups,
        //    needToSave: false
        //});
    },

    componentDidMount: function () {
        var np = this.props;
        this.setState({
            vimeoId: np.vimeoId,
            youtubeId: np.youtubeId,
            start: np.start,
            end: np.end,

            duration: np.duration,
            avatar: np.avatar,

            name: np.name,
            transcript: np.transcript,
            comment: np.comment,
            defaultComment: np.comment,
            tags: np.tags,
            lang: np.lang,
            access: np.access,
            groups: np.groups,
            needToSave: false
        });
    },

    componentStyle: {
        placeholder: {
            padding: 10,
            height: '100%'
        },

        leftPlaceholder: {
            height: '100%'
        },

        rightPlaceholder: {

        },

        style: {
            width: '100%',
            height: '100%'
        },

        videoBlockPlaceholder: {
            width: '100%',
            minHeight: 167,
            //backgroundColor: '#EFF0F1',
            padding: 5,
            borderRadius: 3
        },

        videoPlaceholder: {
            width: '100%',
            height: 170,
            backgroundColor: '#EFF0F1'
        },

        field: {
            marginBottom: 3
        },

        editorPlaceholder: {
            margin: '0 auto',
            //width: 780,
            //width: 780,
            marginTop: 10
        },

        saveBlock: {
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid #EFF0F1',
            textAlign: 'right'
        },

        deleteBlock: {
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid #EFF0F1'
        },

        mosesButtonBlock: {
            padding: 5
        }
    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            return undefined;
        }
        return val;
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
            vimeoId: val,
            needToSave: true
        });
        var self = this;
        //MaterialsMixin.loadVimeoInfo(val, function(data){
        //
        //    self.setState({
        //        loading: false,
        //        name: (data == undefined) ? this.state.name : data.name,
        //        duration: (data == undefined) ? this.state.duration : data.duration,
        //        vimeoImgSrc: (data == undefined) ? this.state.imgSrc : data.imgSrc
        //    });
        //}, function(){
        //    self.setState({
        //        loading: false
        //    });
        //});

    },

    onNameChange: function(evt){
        this.setState({
            name: this.getValFromEvt(evt),
            needToSave: true
        });
    },

    onTranscriptChange: function(evt){
        this.setState({
            transcript: this.getValFromEvt(evt),
            needToSave: true
        });
    },

    onTagsChange: function(tags){
        this.setState({
            tags: tags,
            needToSave: true
        });
    },

    onCommentChange: function(val){
        this.setState({
            comment: val,
            needToSave: true
        });
    },

    onLangChange: function(lang){
        this.setState({
            lang: lang,
            needToSave: true
        });
    },

    onAccessChange: function(access){
        this.setState({
            access: access,
            needToSave: true
        });
    },

    onSave: function(){
        var data = {
            vimeoId: this.state.vimeoId,
            youtubeId: this.state.youtubeId,
            start: this.state.start,
            end: this.state.end,
            name: this.state.name,
            transcript: this.state.transcript,
            comment: this.state.comment,
            tags: this.state.tags,
            groups: this.state.groups,
            vimeoImgSrc: this.state.avatar,
            avatar: this.state.avatar,
            lang: this.state.lang,
            access: this.state.access,
            duration: this.state.duration
        };
        console.log('MaterialUpdatePanel: onSave occured: data = ', data);
        var vimeoId = this.state.vimeoId;
        var youtubeId = this.state.youtubeId;
        if ( (vimeoId == undefined) && (youtubeId == undefined) ){
            return;
        }


        //this.setState({
        //    loading: true
        //});
        //
        //var self = this;
        //MaterialsMixin.loadVimeoInfo(this.state.vimeoId, function(d){
        //    self.setState({
        //        loading: false
        //    });
        //    if (d != undefined){
        //        data.vimeoImgSrc = d.imgSrc;
        //        data.duration = d.duration;
        //    }
        //    self.props.onSave(data);
        //}, function(){
        //    self.setState({
        //        loading: false
        //    });
        //});
        //

        this.props.onSave(data);
    },

    onDelete: function(){
        this.props.onDelete();
    },

    onGroupsSelect: function(groupsList){
        console.log('onGroupsSelect occured: ', groupsList);
        this.setState({
            groups: groupsList,
            needToSave: true
        });
    },

    onYoutubeSubmit: function(data){
        console.log(data);
    },

    onVideoChange: function(data){
        this.setState({
            vimeoId: data.vimeoId,
            youtubeId: data.youtubeId,
            start: data.start,
            end: data.end,
            avatar: data.avatar,
            duration: data.duration,
            needToSave: true
        });
    },

    render: function () {
        var vimeoId = (this.state.vimeoId == undefined) ? '' : this.state.vimeoId;
        var youtubeId = this.state.youtubeId;
        var name = (this.state.name == undefined) ? '' : this.state.name;
        var transcript = (this.state.transcript == undefined) ? '' : this.state.transcript;
        var needToSave = this.state.needToSave;
        var noVideoSpecified = ((vimeoId == undefined || vimeoId == '') && (youtubeId == undefined || youtubeId == ''));

        if (name == undefined || noVideoSpecified == true || name == ''){
            needToSave = false
        }

        var playerIsVisible = (this.state.vimeoId != undefined || this.state.youtubeId != undefined);

        var videoButtonName = (playerIsVisible == true) ? 'Изменить видео' : 'Добавить видео';


        console.log('rendering MaterialUpdatePanel: this.state.start, this.state.end = ', this.state.start, this.state.end);

        var langItems = [{name: 'en', displayName: 'Английский'}, {name: 'de', displayName: 'Немецкий'}];

        return (
            <div style={this.componentStyle.placeholder}>
                <div className={'ui form'}>

                    <div className={' fields'}>

                        <div className={'six wide field'}>

                            <div style={this.componentStyle.leftPlaceholder} className={'MaterialLeftBlockBlock'}>

                                <div style={this.componentStyle.videoBlockPlaceholder}>

                                    <div style={{display: 'none'}} >
                                        {this.state.vimeoId == undefined ?
                                            <div style={{marginBottom: 15}}>
                                                Введите ссылку на видео (с сайта vimeo.com) в поле ниже
                                            </div>
                                            :
                                            <div style={this.componentStyle.videoPlaceholder}>
                                                <VimeoPlayer style={this.componentStyle.style} vimeoId={this.state.vimeoId} />
                                            </div>
                                        }
                                    </div>

                                    {playerIsVisible == false ? null :
                                        <div>
                                            <PatientPlayer
                                                youtubeId={this.state.youtubeId}
                                                vimeoId={this.state.vimeoId}
                                                start={this.state.start}
                                                end={this.state.end}
                                                />

                                        </div>
                                    }

                                    <div className="field" style={{marginTop: 10, display: 'none'}} >
                                        <label>Ссылка на видео<sup style={{color: '#FC636B'}}>*</sup></label>
                                        <input onChange={this.onVimeoIdChange} value={vimeoId} type="text"
                                               placeholder="ссылка на видео на сайте vimeo.com" />
                                    </div>

                                    {playerIsVisible == true ? null :
                                        <div style={{textAlign: 'center'}}>
                                            <div style={{width: 180, height: 180, margin: '0 auto'}} >
                                                <BackgroundImageContainer
                                                    image={'http://www.englishpatient.org/assets/images/video_pre_player.png'} />
                                            </div>
                                            <div style={{padding: 8, opacity: 0.6}} >
                                                Добавьте видео
                                            </div>
                                        </div>
                                    }


                                    <div style={{padding: 5, borderRadius: 5, textAlign: 'center',
                                                    backgroundColor: 'white'}} >
                                        <AddVideoButton
                                            youtubeId={this.state.youtubeId}
                                            vimeoId={this.state.vimeoId}
                                            start={this.state.start}
                                            end={this.state.end}
                                            duration={this.state.duration}
                                            avatar={this.state.avatar}

                                            buttonClassName={'ui basic fluid button'}
                                            buttonName={videoButtonName}
                                            onChange={this.onVideoChange} />
                                    </div>


                                    {this.props.materialId == undefined ? null :
                                        <div style={{marginTop: 43, textAlign: 'center'}} >
                                            <ShareButton
                                                buttonName={'Поделиться материалом'} buttonClassName={'ui button patientPrimary'}
                                                name={'material'} objectId={this.props.materialId} />
                                        </div>
                                    }


                                </div>

                            </div>

                        </div>

                        <div className={'ten wide field'}>

                            <div style={this.componentStyle.rightPlaceholder} className={'MaterialRightBlockBlock'}>

                                <div className="field" style={this.componentStyle.field} >
                                    <label>Название</label>
                                    <input onChange={this.onNameChange} value={name} type="text"
                                           name="first-name" placeholder="Название видео" />
                                </div>

                                <div className="field" style={this.componentStyle.field} >
                                    <label>Транскрипт</label>
                                    <Textarea minRows={3} style={{height: '5em', minHeight: '5em'}} onChange={this.onTranscriptChange} value={transcript} type="text"
                                            placeholder="Транксрипт" ></Textarea>
                                </div>

                                <div className="field" style={assign({}, this.componentStyle.field, {display: 'none'})} >
                                    <label>Теги</label>
                                    <MaterialTags tags={this.state.tags} />
                                </div>

                                <label><b>Категория</b></label>
                                <div style={{marginTop: 5}} >
                                    <GroupsSelect onSelect={this.onGroupsSelect} selectedGroups={this.state.groups} groups={this.props.allGroupsList} />
                                </div>

                                <label><b>Язык</b></label>
                                <div style={{marginTop: 5}} >
                                    <AccessSwitcher items={langItems} activeName={this.state.lang} onAccessChange={this.onLangChange}
                                                    noAccessMessage={'Выберите язык материала'}
                                        />
                                </div>

                                <label><b>Доступ</b></label>
                                <div style={{marginTop: 5}} >
                                    <AccessSwitcher publicAccessMessage={'Этот материал доступен всем преподавателям в системе.'}
                                                    privateAccessMessage={'Этот материал доступен только Вам.'}
                                                    noAccessMessage={'Выберите режим доступа к этому материалу'}
                                        activeName={this.state.access} onAccessChange={this.onAccessChange} />
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className={'fields'} >
                        <div className={'sixteen wide field'}>
                            <label>Комментарий</label>
                            <div style={this.componentStyle.editorPlaceholder}>
                                <PatientEditor value={this.state.defaultComment} onContentChange={this.onCommentChange}  />
                            </div>
                        </div>
                    </div>

                    {this.props.materialId == undefined ? null :
                        <div style={this.componentStyle.mosesButtonBlock}>
                            <MosesEditorButton materialId={this.props.materialId} />
                        </div>
                    }

                    <div style={this.componentStyle.saveBlock}>
                        <button disabled={!needToSave} className={'ui primary button'} onClick={this.onSave} >
                            <i className={'save icon'} ></i>
                            Сохранить
                        </button>
                    </div>

                    {this.props.materialId == undefined ? null :
                        <div style={this.componentStyle.deleteBlock}>
                            <DeleteButton onDelete={this.onDelete} />
                        </div>
                    }

                    <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                        <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                    </div>


                </div>
            </div>
        );
    }

});

module.exports = MaterialUpdatePanel;