/**
 * Created by sabir on 13.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicDialog = require('./TopicDialog');

var TopicsMixin = require('../../../mixins/TopicsMixin');

var TopicHeaderPanel = require('../panels/TopicHeaderPanel');
var SimpleTopicHeaderPanel = require('../panels/SimpleTopicHeaderPanel');

var TopicItem = require('../TopicItem');

var AccessSwitcher = require('../../exercise/info/AccessSwitcher');

var FileUploader = require('../../file/FileUploader');

var DeleteButton = require('../../buttons/DeleteButton');

var UpdateTopicDialog = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            topicId: undefined,
            dialogLevel: 10,
            topicType: 'basic',

            onTopicUpdated: function(topic){

            },

            onTopicDeleted: function(){
                console.log('UpdateTopicDialog: onTopicDeleted default occured');
            },

            onTopicCreated: function(topic){

            },

            onClose: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            access: 'private',
            topicType: this.props.topicType
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var teacherId = this.props.teacherId;
        var topicId = this.props.topicId;
        this.load(teacherId, topicId, function(topic){
            console.log('topic loaded: ', topic);
        });
    },

    componentStyle: {
        placeholder: {

        },

        contentPlaceholder: {
            width: 740,
            margin: '0 auto'
        },

        leftBlock: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 200
        },

        rightBlock: {
            width: 740,
            display: 'inline-block',
            verticalAlign: 'top',
            margin: '0 auto'
        },

        description: {
            height: 120
        },

        headerPlaceholder: {
            color: 'rgba(0,0,0,0.87)',
            height: 120,
            paddingTop: 40,
            textAlign: 'center',
            fontSize: 34
        }
    },


    load: function(teacherId, topicId, callback){
        if (topicId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        console.log('loading topic with id = ' + topicId);
        TopicsMixin.loadTopic(topicId, function(topic){
            console.log('topic loaded: ', topic);
            this.setState({
                loading: false,
                name: topic.name,
                access: topic.access,
                description: topic.description,
                avatar: topic.avatar
            });
        }.bind(this));
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
        var val = this.getValueFromEvt(evt);
        this.setState({
            name: val
        });
    },

    onDescriptionChange: function(evt){
        var val = this.getValueFromEvt(evt);
        this.setState({
            description: val
        });
    },

    onAccessChange: function(newAccess){
        this.setState({
            access: newAccess
        });
    },

    onSave: function(){
        var name = this.state.name;
        var description = this.state.description;
        var avatar = this.state.avatar;
        var access = this.state.access;
        var topicType = this.state.topicType;

        var topicId = this.props.topicId;

        var teacherId = this.props.teacherId;

        this.setState({
            loading: true
        });

        if (topicId == undefined){
            TopicsMixin.createTopic(teacherId, name, description, avatar, access, topicType, function(topic){
                this.setState({
                    loading: false
                });
                this.props.onTopicCreated(topic);
            }.bind(this));
            return;
        }

        TopicsMixin.updateTopic(topicId, name, description, avatar, access, function(topic){
            this.setState({
                loading: false
            });
            this.props.onTopicUpdated(topic);
        }.bind(this));

    },

    onFileUploaded: function(url){
        this.setState({
            avatar: url
        });
    },

    onAvatarRemove: function(){
        this.setState({
            avatar: undefined
        });
    },

    onDelete: function(){
        console.log('delete topic occured');
        console.log('trying to delete topic');
        TopicsMixin.deleteTopic(this.props.topicId, function(){
            this.props.onTopicDeleted();
        }.bind(this));
    },

    getDialogContent: function(){
        var canSave = ( ((this.state.name != undefined) && (this.state.name.trim() != ''))
                        && ((this.state.name != undefined) && (this.state.name.trim() != ''))
                        && ((this.state.name != undefined) && (this.state.name.trim() != '')));

        var rightStyle = assign({}, this.componentStyle.rightBlock, {width: (canSave == false ? 740 : 540)});


        return (
            <div>

                {this.props.topicId == undefined ?
                    <div style={this.componentStyle.headerPlaceholder} >
                        Создание нового топика
                    </div>
                    :
                    <div>
                        <SimpleTopicHeaderPanel name={this.state.name}
                                          dialogLevel={this.props.dialogLevel + 11}
                                          description={this.state.description}
                                          avatar={this.state.avatar}
                                          editMode={false}
                            />
                    </div>

                }




                <div style={this.componentStyle.contentPlaceholder}>

                    {canSave == false ? null :
                        <div style={this.componentStyle.leftBlock}>
                            <div>
                                <label style={{color: 'black'}} >Превью</label>
                            </div>
                            <TopicItem name={this.state.name}
                                       description={this.state.description}
                                       avatar={this.state.avatar} />
                        </div>
                    }

                    <div style={rightStyle} className={'ui form'} >

                        <div className="field">
                            <label>Название топика</label>
                            <input type="text" placeholder="Введите название топика" value={this.state.name} onChange={this.onNameChange} />
                        </div>

                        <div className="field">
                            <label>Описание топика</label>
                            <textarea type="text" placeholder="Введите описание топика" style={this.componentStyle.description}
                                      value={this.state.description} onChange={this.onDescriptionChange} ></textarea>
                        </div>

                        <div className={'field'} >
                            <label>Аватарка топика</label>


                            {this.state.avatar == undefined ?
                                <div>
                                    <FileUploader onFileUploaded={this.onFileUploaded} />
                                </div> :
                                <div className={'ui negative message'} style={{textAlign: 'center', cursor: 'pointer' }}
                                                                    onClick={this.onAvatarRemove} >
                                        удалить аватар
                                </div>
                            }

                        </div>

                        <div>

                            <AccessSwitcher activeName={this.state.access}
                                            publicAccessMessage={'Этот топик доступен всем учителям'}
                                            privateAccessMessage={'Этот топик доступен только Вам'}
                                            noAccessMessage={'Выберите режим доступа к данному топику'}
                                            onAccessChange={this.onAccessChange} />
                        </div>

                    </div>


                    <div style={{textAlign: 'right', marginTop: 15}} >
                        <button className={'ui button primary '} disabled={!canSave} onClick={this.onSave} >
                            <i className={'icon save'} ></i>
                            Сохранить
                        </button>
                    </div>

                    {this.props.topicId == undefined ? null :
                        <div style={{marginTop: 5, marginBottom: 15}}>
                            <DeleteButton onDelete={this.onDelete} />
                        </div>
                    }


                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <TopicDialog
                                onClose={this.props.onClose}
                                dialogLevel={this.props.dialogLevel}
                                content={this.getDialogContent()


                                }
                />


            </div>
        );
    }

});

module.exports = UpdateTopicDialog;