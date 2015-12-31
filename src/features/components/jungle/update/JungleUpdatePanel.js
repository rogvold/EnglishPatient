/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientPlayer = require('../../player/PatientPlayer');

var JungleUpdatePanel = React.createClass({
    getDefaultProps: function () {
        return {
            audioUrl: undefined,
            vimeoId: undefined,
            text: undefined,
            youtubeId: undefined,
            name: undefined,

            onChange: function(data){

            },

            onSave: function(data){
                console.log('JungleUpdatePanel: default: onSave: data = ', data);
            }
        }
    },

    getInitialState: function () {
        return {
            audioUrl: this.props.audioUrl,
            text: this.props.text,
            vimeoId: this.props.vimeoId,
            youtubeId: this.props.youtubeId,
            name: this.props.name,
            description: this.props.description
        }
    },

    getData: function(){
        return {
            name: this.state.name,
            text: this.state.text,
            vimeoId: this.state.vimeoId,
            youtubeId: this.state.youtubeId,
            description: this.state.description
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            audioUrl: nextProps.audioUrl,
            text: nextProps.text,
            vimeoId: nextProps.vimeoId,
            youtubeId: nextProps.youtubeId,
            name: nextProps.name,
            description: nextProps.description
        });
    },

    componentDidMount: function () {

    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            return undefined;
        }
        return val;
    },

    onTextChange: function(evt){
        var text = this.getValFromEvt(evt);
        this.setState({
            text: text
        });
        this.onChange({text: text});
    },

    onVimeoIdChange: function(evt){
        var vimeoId = this.getValFromEvt(evt);
        if (vimeoId != undefined){
            if (vimeoId.indexOf('vimeo') > -1){
                var arr = vimeoId.split('/');
                vimeoId = arr[arr.length - 1];
            }
        }
        this.setState({
            vimeoId: vimeoId,
            youtubeId: undefined
        });
        this.onChange({vimeoId: vimeoId});
    },

    onYoutubeIdChange: function(evt){
        var youtubeId = this.getValFromEvt(evt);
        if (youtubeId != undefined){
            if (youtubeId.indexOf('youtube') > -1){
                var video_id = youtubeId.split('v=')[1];
                var ampersandPosition = video_id.indexOf('&');
                if(ampersandPosition != -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                }
                youtubeId = video_id;
            }
        }
        this.setState({
            youtubeId: youtubeId,
            vimeoId: undefined
        });
        this.onChange({youtubeId: youtubeId});
    },

    onNameChange: function(evt){
        var name = this.getValFromEvt(evt);
        this.setState({
            name: name
        });
        this.onChange({name: name});
    },

    onDescriptionChange: function(evt){
        var description = this.getValFromEvt(evt);
        this.setState({
            description: description
        });
        this.onChange({description: description});
    },

    onChange: function(aData){
        var data = this.getData();
        data = assign({}, data, aData);
        this.props.onChange(data);
    },

    componentStyle: {
        placeholder: {
            width: 900,
            padding: 5,
            margin: '0 auto'
        },

        left: {
            width: 300,
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 5,
            paddingLeft: 0,
            height: '100%',
            borderRight: '1px solid #EFF0F1'
        },

        right: {
            width: 580,
            padding: 5,
            display: 'inline-block',
            verticalAlign: 'top',
            height: '100%',
            overflowY: 'auto'
        },

        descriptionInput: {
            minHeight: 0,
            height: '5em'
        },

        textInput: {
            minHeight: '20em'
        },

        saveButtonPlaceholder: {
            padding: 5,
            textAlign: 'right'
        }

    },

    canSave: function(){
        var data = this.getData();
        if (data.youtubeId == undefined && data.vimeoId == undefined){
            return false;
        }
        if (data.name == undefined){
            return false;
        }
        return true;
    },

    save: function(){
        var data = this.getData();
        this.props.onSave(data);
    },

    render: function () {
        var vimeoId = this.state.vimeoId;
        var youtubeId = this.state.youtubeId;
        var videoExists = (vimeoId != undefined || youtubeId != undefined);
        var canSave = this.canSave();


        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>


                    {videoExists == false ? null
                        :
                        <div style={this.componentStyle.videoPlaceholder}>
                            {vimeoId == undefined ?
                                <PatientPlayer youtubeId={youtubeId}/>
                                : null }
                            {youtubeId == undefined ?
                                <PatientPlayer vimeoId={vimeoId}/>
                                : null
                            }
                        </div>
                    }

                    <div style={{}}>
                        <div className={'ui form'} style={{marginBottom: 5}} >
                            <input value={vimeoId} onChange={this.onVimeoIdChange} placeholder={'Ссылка на Вимео'} />
                        </div>

                        <div className={'ui form'} style={{marginBottom: 5}} >
                            <input value={youtubeId} onChange={this.onYoutubeIdChange} placeholder={'Ссылка на Youtube'} />
                        </div>
                    </div>


                </div>


                <div style={this.componentStyle.right}>

                    <div className={'ui form'} style={{marginBottom: 5}}  >
                        <input value={this.state.name} placeholder={'Название'} onChange={this.onNameChange} />
                    </div>

                    <div className={'ui form'} style={{marginBottom: 5}}  >
                        <textarea style={this.componentStyle.descriptionInput}
                                  placeholder={'Описание'}
                            value={this.state.description} onChange={this.onDescriptionChange} ></textarea>
                    </div>
                    
                    <div className={'ui form'} style={{marginBottom: 5}} >
                        <textarea placeholder={'Транскрипт видео'}
                            style={this.componentStyle.textInput}
                            onChange={this.onTextChange} value={this.state.text}
                            ></textarea>
                    </div>

                </div>

                <div style={this.componentStyle.saveButtonPlaceholder}>

                    <button className={'ui primary button'} disabled={!canSave} onClick={this.save} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>

                </div>


            </div>
        );
    }

});

module.exports = JungleUpdatePanel;