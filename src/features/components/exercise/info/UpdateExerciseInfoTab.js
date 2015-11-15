/**
 * Created by sabir on 16.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var ExerciseInfoCard = require('../info/ExerciseInfoCard');

var FileUploader = require('../../file/FileUploader');

var AccessSwitcher = require('./AccessSwitcher');

var SelfLoadingExerciseGroupsSelect = require('../../select/exerciseGroup/SelfLoadingExerciseGroupsSelect');

var DeleteButton = require('../../buttons/DeleteButton');

var UpdateExerciseInfoTab = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            name: undefined,
            avatar: undefined,
            description: undefined,
            task: undefined,
            groups: [],
            access: 'private',
            taskBlockEnabled: true,
            onSave: function(ex){
                console.log('saving ', ex);
            },
            onDelete: function(){
                alert('onDelete occured');
            }
        }
    },

    getInitialState: function () {
        return {
            name: this.props.name,
            avatar: this.props.avatar,
            description: this.props.description,
            task: this.props.task,
            access: this.props.access,
            groups: this.props.groups,
            needToSave: false
        }
    },

    componentWillReceiveProps: function (np) {
        this.setState({
            name: np.name,
            avatar: np.avatar,
            description: np.description,
            task: np.task,
            access: np.access,
            groups: np.groups,
            needToSave: false
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 950,
            //height: '100%',
            //minHeight: 600,
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            backgroundColor: 'white',
            margin: '0 auto'
        },

        deleteImageBlock: {
            cursor: 'pointer',
            marginTop: 0,
            padding: 10
        },

        leftBlock: {
            width: 328,
            padding: 10,
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
            paddingTop: 15
        },

        rightBlock: {
            width: 620,
            display: 'inline-block',
            padding: 10,
            verticalAlign: 'top'
        },

        label: {
            color: '#2E3C54',
            fontWeight: 'bold',
            fontSize: '14px'
        },

        inputPlaceholer: {

        },

        textarea: {
            height: '5em',
            minHeight: '5em'
        },

        avatarUploader: {
            marginBottom: 10
        },

        inputBlockPlaceholder: {
            marginBottom: 10
        },

        submitButtonPlaceholder: {
            paddingTop: 20,
            marginTop: 20,
            borderTop: '1px solid #EFF0F1',
            textAlign: 'right'
        },

        deleteButtonPlaceholder: {
            paddingTop: 20,
            marginTop: 20,
            borderTop: '1px solid #EFF0F1'
        }
    },

    getValueFromEvt: function(evt){
        var val = evt.target.value;
        if (val == undefined) {return undefined;}
        if (val.trim() == '') {
            return undefined;
        }
        return val;
    },

    onNameChange: function(evt){
        this.setState({
            name: this.getValueFromEvt(evt),
            needToSave: true
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: this.getValueFromEvt(evt),
            needToSave: true
        });
    },

    onTaskChange: function(evt){
        this.setState({
            task: this.getValueFromEvt(evt),
            needToSave: true
        });
    },

    onAvatarAdded: function(url){
        console.log('onAvatarAdded occured');
        this.setState({
            avatar: url,
            needToSave: true
        });
    },

    onAvatarDeleted: function(){
        this.setState({
            avatar: undefined,
            needToSave: true
        });
    },

    onAccessChange: function(access){
        console.log('new access is ', access);
        this.setState({
            access: access,
            needToSave: true
        });
    },

    onGroupsSelect: function(newGroups){
        console.log('onGroupsSelect occured: ', newGroups);
        this.setState({
            groups: newGroups,
            needToSave: true
        });
    },


    onSave: function(){
        this.props.onSave({
            name: this.state.name,
            description: this.state.description,
            avatar: this.state.avatar,
            task: this.state.task,
            groups: (this.state.groups == undefined ? [] : this.state.groups),
            access: this.state.access
        });
        this.setState({
            needToSave: false
        });
    },

    onDelete: function(){
        this.props.onDelete();
    },

    render: function () {
        var ex = this.props.exercise;
        console.log('rendering UpdateExerciseInfoTab: needToSave = ', this.state.needToSave);
        var cannotSave = (this.state.name == undefined);
        if (this.state.needToSave == false){
            cannotSave = true;
        }
        console.log('cannotSave = ', cannotSave);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.leftBlock}>

                    <ExerciseInfoCard name={this.state.name} description={this.state.description}
                                      task={this.state.task} avatar={this.state.avatar} access={this.state.access} />

                </div>

                <div style={this.componentStyle.rightBlock}>

                    <div className={'ui form'} style={this.componentStyle.inputBlockPlaceholder} >
                        <div style={this.componentStyle.label} >Название упражнения <sup style={{color: '#FC636B'}} ></sup> </div>
                        <div className="field">
                            <input type="text" value={this.state.name} onChange={this.onNameChange} placeholder={'Введите название упражнения'}  />
                        </div>
                    </div>

                    <div style={this.componentStyle.avatarUploader}>
                        <div style={this.componentStyle.label} >Аватарка упражнения</div>
                        {this.state.avatar != undefined ?
                            <div style={this.componentStyle.deleteImageBlock} className={'ui red message'} onClick={this.onAvatarDeleted} >
                                Удалить картинку
                            </div>
                            :
                            <FileUploader containerClassName={'ui message'} onFileUploaded={this.onAvatarAdded} />
                        }

                    </div>

                    <div className={'ui form'} style={this.componentStyle.inputBlockPlaceholder}  >
                        <div style={this.componentStyle.label} >Описание упражнения</div>
                        <div className="field">
                            <textarea style={this.componentStyle.textarea} value={this.state.description}
                                      onChange={this.onDescriptionChange} placeholder={'Введите описание упражнения'} ></textarea>
                        </div>
                    </div>

                    {this.props.taskBlockEnabled == false ? null :
                        <div className={'ui form'} style={this.componentStyle.inputBlockPlaceholder}  >
                            <div style={this.componentStyle.label} >Задание для ученика</div>
                            <div className="field">
                            <textarea style={this.componentStyle.textarea} value={this.state.task}
                                      onChange={this.onTaskChange} placeholder={'Введите задание для ученика'} ></textarea>
                            </div>
                        </div>
                    }


                    <div className={'ui form'} style={this.componentStyle.inputBlockPlaceholder}  >
                        <div style={this.componentStyle.label} >Доступ</div>
                        <div className="field">
                            <AccessSwitcher onAccessChange={this.onAccessChange} activeName={this.state.access} />
                        </div>
                    </div>

                    {this.props.teacherId == undefined ? null :
                        <div>
                            <div style={this.componentStyle.label} >Категория</div>
                            <SelfLoadingExerciseGroupsSelect onSelect={this.onGroupsSelect} exerciseGroups={this.state.groups} teacherId={this.props.teacherId} />
                        </div>

                    }


                    <div style={this.componentStyle.submitButtonPlaceholder}>
                        <button disabled={cannotSave} className={'ui primary button  '} onClick={this.onSave} >
                            <i className={'save icon'} ></i> Сохранить
                        </button>
                    </div>

                    {this.props.exerciseId == undefined ? null :
                        <div style={this.componentStyle.deleteButtonPlaceholder}>
                            <DeleteButton onDelete={this.onDelete} />
                        </div>
                    }



                </div>

            </div>
        );
    }

});

module.exports = UpdateExerciseInfoTab;