/**
 * Created by sabir on 30.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var FileUploadButton = require('../../file/FileUploadButton');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var DeleteButton = require('../../buttons/DeleteButton');

var UpdateCoursePanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            courseId: undefined,

            name: undefined,
            description: undefined,
            avatar: undefined,
            duration: undefined,

            onSave: function(data){
                console.log('UpdateCoursePanel: onSave default: data =  ', data);
            },

            onDelete: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            name: this.props.name,
            description: this.props.description,
            avatar: this.props.avatar,
            duration: this.props.duration
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            name: nextProps.name,
            description: nextProps.description,
            avatar: nextProps.avatar,
            duration: nextProps.duration
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 820,
            textAlign: 'left',
            padding: 10
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 5,
            width: 250
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 5,
            width: 550
        },

        avatarPlaceholder: {
            width: '100%',
            height: 160
        },


        uploadPlaceholder: {

        },

        saveButtonPlaceholder: {
            textAlign: 'right',
            paddig: 5
        },

        deleteButtonPlaceholder: {
            textAlign: 'left',
            padding: 5,
            marginTop: 5
        }
    },

    getValFromEvt: function(evt){
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

    onAvatarChange: function(url){
        this.setState({
            avatar: url
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

    deleteAvatar: function(){
        this.setState({
            avatar: undefined
        });
    },

    getData: function(){
        return {
            name: this.state.name,
            description: this.state.description,
            avatar: this.state.avatar,
            duration: this.state.duration
        }
    },

    onSave: function(){
        var data = this.getData();
        this.props.onSave(data);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <DialogCard
                            name={this.state.name}
                            avatar={this.state.avatar} style={{width: '100%', height: '100%'}} />
                    </div>

                    <div style={this.componentStyle.uploadPlaceholder}>

                        {this.state.avatar == undefined ?
                            <div>
                                <FileUploadButton buttonName={'Загрузить аватар курса'}
                                                  className={'ui basic fluid button'}
                                    icon={'icon cloud upload'}
                                    style={{width: '100%', marginTop: 5}}
                                    onFileUploaded={this.onAvatarChange} />
                            </div>
                            :
                            <div className={'ui red message'} style={{padding: 10, marginTop: 5,
                                                                        cursor: 'pointer'}}
                                 onClick={this.deleteAvatar} >
                                <i className={'icon close'} ></i> Удалить аватар
                            </div>
                        }

                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <div className={'ui form'} style={{marginBottom: 5}} >
                        <input value={this.state.name} placeholder={'Название курса'} onChange={this.onNameChange} />
                    </div>

                    <div className={'ui form'} style={{marginBottom: 5}} >
                        <textarea value={this.state.description}
                                  placeholder={'Описание курса'}
                                  onChange={this.onDescriptionChange} ></textarea>
                    </div>

                    <div className={'ui form'} style={{marginBottom: 5}} >
                        <input value={this.state.duration}
                               onChange={this.onDurationChange} placeholder={'Длительность курса (в часах)'} />
                    </div>


                    <div style={this.componentStyle.saveButtonPlaceholder}>
                        <button className={'ui primary button'} onClick={this.onSave} >
                            <i className={'icon save'} ></i> Сохранить
                        </button>
                    </div>

                </div>

                {this.props.courseId == undefined ? null :
                    <div style={this.componentStyle.deleteButtonPlaceholder}>
                        <DeleteButton onDelete={this.props.onDelete} />
                    </div>
                }


            </div>
        );
    }

});

module.exports = UpdateCoursePanel;