/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var DialogCard = require('../../../dialog_exercise/card/DialogCard');
var FileUploadButton = require('../../../file/FileUploadButton');

var DeleteButton = require('../../../buttons/DeleteButton');

var SelfLoadingQuestionnaireEditInfoPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            questionnaireId: undefined,

            onUpdated: function(q){

            },

            onLoaded: function(q){

            },

            onDeleted: function(){
                console.log('SelfLoadingQuestionnaireEditInfoPanel: default onDeleted occured ');
            }
        }
    },

    getInitialState: function () {
        return {
            name: undefined,
            task: undefined,
            avatar: undefined,
            description: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(function(q){
            this.props.onLoaded(q);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            width: 830,
            padding: 5
        },

        top: {
            width: '100%',
            //height: 200,
            borderBottom: '1px dotted #EFF0F1'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            margin: 5,
            marginRight: '1px solid #EFF0F1',
            width: 200,
            height: '100%'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 600,
            margin: 5
        },

        bottom: {
            padding: 5,
            textAlign: 'right'
        },

        avatarPlaceholder: {
            width: '100%',
            height: 142,
            marginBottom: 5
        },

        textarea: {
            minHeight: 0,
            height: '7em'
        }
    },

    load: function(callback){
        var id = this.props.questionnaireId;
        if (id == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        QuestionnaireMixin.loadQuestionnaire(id, function(q){
            this.setState({
                loading: false,
                name: q.name,
                description: q.description,
                task: q.task,
                avatar: q.avatar
            });
            if (callback != undefined){
                callback(q);
            }
        }.bind(this));
    },

    onSave: function(){
        var questionnaireId = this.props.questionnaireId;
        var teacherId = this.props.teacherId;
        var name = this.state.name;
        var description = this.state.description;
        var avatar = this.state.avatar;
        var task = this.state.task;


        if (questionnaireId == undefined){
            if (teacherId == undefined){ return; }
            this.setState({loading: true});
            QuestionnaireMixin.createQuestionnaire(teacherId, name, description, avatar, task, function(uQ){
                this.setState({
                    loading: false
                });
                this.props.onUpdated(uQ);
            }.bind(this));
            return;
        }
        this.setState({loading: true});
        QuestionnaireMixin.updateQuestionnaire(questionnaireId, name, description, avatar, task, function(uQ){
            this.setState({
                loading: false
            });
            this.props.onUpdated(uQ);
        }.bind(this));
    },

    onAvatarChange: function(url){
        this.setState({
            avatar: url
        });
    },

    getValFromEvt: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined;
        }
        return val;
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

    onTaskChange: function(evt){
        this.setState({
            task: this.getValFromEvt(evt)
        });
    },

    canSave: function(){
        if (this.state.name == undefined || this.state.name == ''){
            return false;
        }
        return true;
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        QuestionnaireMixin.deleteQuestionnaire(this.props.questionnaireId, function(){
            this.setState({
                loading: false
            });
            this.props.onDeleted();
        }.bind(this));
    },

    render: function () {

        var canSave = this.canSave();

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.top}>

                    <div style={this.componentStyle.left}>

                        <div style={this.componentStyle.avatarPlaceholder}>

                            <div style={this.componentStyle.avatarPlaceholder}>
                                <DialogCard avatar={this.state.avatar} name={this.state.name} />
                            </div>

                            {this.state.avatar == undefined ?
                                <div>
                                    <FileUploadButton className={'ui basic fluid button'}
                                                      buttonName={'Загрузить аватар'}
                                                      icon={'icon upload'}
                                                      onFileUploaded={this.onAvatarChange} />
                                </div>
                                :
                                <div>
                                    <div style={{cursor: 'pointer', padding: 7}} className={'ui red message'}
                                         onClick={this.onAvatarChange.bind(this, undefined)} >
                                        <i className={'icon remove'} ></i> Удалить аватар
                                    </div>
                                </div>
                            }

                        </div>

                    </div>

                    <div style={this.componentStyle.right}>

                        <div className={'ui form'} style={{marginBottom: 5}} >
                            <input value={this.state.name} onChange={this.onNameChange} placeholder={'Название опросника'} />
                        </div>

                        <div className={'ui form'} style={{marginBottom: 5}}  >
                            <textarea value={this.state.description} placeholder={'Описание опросника'}
                                      onChange={this.onDescriptionChange} style={this.componentStyle.textarea} ></textarea>
                        </div>

                        <div className={'ui form'} >
                            <textarea value={this.state.task} placeholder={'Задание ученику'}
                                      onChange={this.onTaskChange} style={this.componentStyle.textarea} ></textarea>
                        </div>


                    </div>

                </div>


                <div style={this.componentStyle.bottom}>

                    <div>
                        <button disabled={!canSave} className={'ui primary button'} onClick={this.onSave} >
                            <i className={'icon save'} ></i> Сохранить
                        </button>
                    </div>

                    {this.props.questionnaireId == undefined ? null :
                        <div style={{marginTop: 10}} >
                            <DeleteButton onDelete={this.onDelete} />
                        </div>
                    }



                </div>


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );


    }

});

module.exports = SelfLoadingQuestionnaireEditInfoPanel;