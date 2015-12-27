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

var MaterialUpdatePanel = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: undefined,
            name: undefined,
            transcript: undefined,
            comment: undefined,
            tags: [],
            groups: [],
            allGroupsList: [],

            onSave: function(data){

            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            vimeoId: this.props.vimeoId,
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
        this.setState({
            vimeoId: np.vimeoId,
            name: np.name,
            transcript: np.transcript,
            comment: np.comment,
            defaultComment: np.comment,
            tags: np.tags,
            groups: np.groups,
            needToSave: false
        });
    },

    componentDidMount: function () {

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
            backgroundColor: '#EFF0F1',
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
            width: 780,
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

    onSave: function(){
        var data = {
            vimeoId: this.state.vimeoId,
            name: this.state.name,
            transcript: this.state.transcript,
            comment: this.state.comment,
            tags: this.state.tags,
            groups: this.state.groups
        };
        console.log('MaterialUpdatePanel: onSave occured: data = ', data);
        var vimeoId = this.state.vimeoId;
        if (vimeoId == undefined){
            return;
        }
        this.setState({
            loading: true
        });

        var self = this;
        MaterialsMixin.loadVimeoInfo(this.state.vimeoId, function(d){
            self.setState({
                loading: false
            });
            if (d != undefined){
                data.vimeoImgSrc = d.imgSrc;
                data.duration = d.duration;
            }
            self.props.onSave(data);
        }, function(){
            self.setState({
                loading: false
            });
        });
        //
        //this.props.onSave(data);
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

    render: function () {
        var vimeoId = (this.state.vimeoId == undefined) ? '' : this.state.vimeoId;
        var name = (this.state.name == undefined) ? '' : this.state.name;
        var transcript = (this.state.transcript == undefined) ? '' : this.state.transcript;
        var needToSave = this.state.needToSave;
        if (name == undefined || vimeoId == undefined || vimeoId == '' || name == ''){
            needToSave = false
        }

        return (
            <div style={this.componentStyle.placeholder}>
                <div className={'ui form'}>

                    <div className={' fields'}>

                        <div className={'six wide field'}>

                            <div style={this.componentStyle.leftPlaceholder} className={'MaterialLeftBlockBlock'}>

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

                                    <div className="field" style={{marginTop: 10}} >
                                        <label>Ссылка на видео<sup style={{color: '#FC636B'}}>*</sup></label>
                                        <input onChange={this.onVimeoIdChange} value={vimeoId} type="text"
                                               placeholder="ссылка на видео на сайте vimeo.com" />
                                    </div>

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
                                    <textarea style={{height: '5em', minHeight: '5em'}} onChange={this.onTranscriptChange} value={transcript} type="text"
                                            placeholder="Транксрипт" ></textarea>
                                </div>

                                <div className="field" style={this.componentStyle.field} >
                                    <label>Теги</label>
                                    <MaterialTags tags={this.state.tags} />
                                </div>

                                <GroupsSelect onSelect={this.onGroupsSelect} selectedGroups={this.state.groups} groups={this.props.allGroupsList} />

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