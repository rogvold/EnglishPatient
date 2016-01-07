/**
 * Created by sabir on 03.01.16.
 */


var React = require('react');
var assign = require('object-assign');

var DeleteButton = require('../../buttons/DeleteButton');

var FileUploadButton = require('../../file/FileUploadButton');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var UpdateLessonInfoPanel = React.createClass({
    getDefaultProps: function () {
        return {
            lessonId: undefined,

            name: undefined,
            description: undefined,
            duration: undefined,

            onSave: function(data){
                console.log('UpdateLessonInfoPanel: data = ', data);
            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        console.log('UpdateLessonInfoPanel: getInitialState this.props = ', this.props);
        return {
            name: this.props.name,
            avatar: this.props.avatar,
            description: this.props.description,
            duration: this.props.duration
        }
    },

    componentWillReceiveProps: function (p) {
        console.log('UpdateLessonInfoPanel: componentWillReceiveProps p = ', p);
        this.setState({
            name: p.name,
            description: p.description,
            avatar: p.avatar,
            duration: p.duration
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 812,
            margin: '0 auto'
        },

        bottomButtonsPlaceholder: {
            textAlign: 'right',
            padding: 5,
            paddingRight: 0,
            marginTop: 15
        },

        deleteButtonPlaceholder: {

        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 200,
            paddingRight: 5,
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 600,
            paddingLeft: 5
        }



    },

    getValFromEvt: function(evt){
        if (evt == undefined){
            return undefined;
        }
        var val = evt.target.value;
        if (val == undefined || val.trim() == ''){
            return undefined;
        }
        return val;
    },

    onNameChange: function(evt){
        var name = this.getValFromEvt(evt);
        this.setState({
            name: name
        });
    },

    onDescriptionChange: function(evt){
        var description = this.getValFromEvt(evt);
        this.setState({
            description: description
        });
    },

    onDurationChange: function(evt){
        var duration = this.getValFromEvt(evt);
        if (duration != undefined){
            duration = +duration;
        }
        this.setState({
            duration: duration
        });
    },

    onAvatarUploaded: function(url){
        this.setState({
            avatar: url
        });
    },

    onAvatarDelete: function(){
        this.setState({
            avatar: undefined
        });
    },

    getData: function(){
        return {
            name: this.state.name,
            description: this.state.description,
            duration: this.state.duration,
            avatar: this.state.avatar
        }
    },

    onSave: function(){
        var data = this.getData();
        this.props.onSave(data);
    },

    onDelete: function(){
        this.props.onDelete();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <div style={{width: '100%', height: 120}} >
                        <DialogCard avatar={this.state.avatar} name={this.state.name} />
                    </div>

                    <div style={{marginTop: 5}} >

                        {this.state.avatar == undefined ?
                            <div style={{textAlign: 'center'}} >
                                <FileUploadButton
                                    buttonName={'Загрузить аватар'}
                                    icon={'icon upload'}
                                    className={'ui basic fluid button'}
                                    onFileUploaded={this.onAvatarUploaded} />
                            </div>
                            :
                            <div className={'ui red message'} style={{padding: 6, cursor: 'pointer'}}
                                                                        onClick={this.onAvatarDelete} >
                                <i className={'icon remove'} ></i> Удалить аватар
                            </div>
                        }

                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <div className={'ui form'} style={{marginBottom: 5}} >
                        <input onChange={this.onNameChange} value={this.state.name}
                               placeholder={'Название урока'} />
                    </div>

                    <div className={'ui form'} style={{marginBottom: 5}} >
                    <textarea onChange={this.onDescriptionChange} value={this.state.description}
                              placeholder={'Описание урока'} ></textarea>
                    </div>

                    <div className={'ui form'} style={{marginBottom: 5}} >
                        <input onChange={this.onDurationChange} value={this.state.duration}
                               placeholder={'Продолжительность (в часах)'} />
                    </div>

                    <div style={this.componentStyle.bottomButtonsPlaceholder}>
                        <button className={'ui button primary'} onClick={this.onSave} >
                            <i className={'icon save'} ></i> Сохранить
                        </button>
                    </div>

                    {this.props.lessonId == undefined ? null :
                        <div style={this.componentStyle.deleteButtonPlaceholder}>
                            <DeleteButton onDelete={this.onDelete} />
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = UpdateLessonInfoPanel;