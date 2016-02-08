/**
 * Created by sabir on 06.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SimpleTopicHeaderPanel = require('./SimpleTopicHeaderPanel');
var VerySimpleTopicHeaderPanel = require('./VerySimpleTopicHeaderPanel');

var TopicItem = require('../TopicItem');

var FileUploader = require('../../file/FileUploader');

var DeleteButton = require('../../buttons/DeleteButton');

var AccessSwitcher = require('../../exercise/info/AccessSwitcher');

var TopicsMixin = require('../../../mixins/TopicsMixin');

var UpdateTopicPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TopicsStore')],
    getDefaultProps: function(){
        return {
            topicId: undefined,

            onClose: function(){

            },

            onTopicDeleted: function(){
                console.log('UpdateTopicDialog: onTopicDeleted default occured');
            },

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('TopicsStore');
        var topicId = this.props.topicId;
        var topic = store.getTopic(topicId);
        if (topic == undefined){
            topic = {};
        }
        return {
            loading: store.loading,
            name: topic.name,
            access: (topic.access == undefined) ? 'public' : topic.access,
            description: topic.description,
            avatar: topic.avatar,
            topicType: topic.topicType
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

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

    onDelete: function(){
        this.getFlux().actions.deleteTopic(this.props.topicId);
        setTimeout(function(){
            this.props.onTopicDeleted();
            this.props.onClose();
        }.bind(this), 100);
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
        //var name = this.state.name;
        //var description = this.state.description;
        //var avatar = this.state.avatar;
        //var access = this.state.access;
        //var topicType = this.state.topicType;

        var topicId = this.props.topicId;
        var teacherId = this.props.teacherId;

        var data = {
            name: this.state.name,
            description: this.state.description,
            avatar: this.state.avatar,
            access: this.state.access,
            topicType: this.state.topicType
        };

        if (topicId != undefined){
            this.getFlux().actions.updateTopic(topicId, data);
            setTimeout(function(){
                this.props.onClose();
            }.bind(this), 100);
        }else {
            this.getFlux().actions.createTopic(data);
            setTimeout(function(){
                this.props.onClose();
            }.bind(this), 100);
        }

        //this.setState({
        //    loading: true
        //});
        //
        //if (topicId == undefined){
        //    TopicsMixin.createTopic(teacherId, name, description, avatar, access, topicType, function(topic){
        //        this.setState({
        //            loading: false
        //        });
        //        this.props.onTopicCreated(topic);
        //    }.bind(this));
        //    return;
        //}
        //
        //TopicsMixin.updateTopic(topicId, name, description, avatar, access, function(topic){
        //    this.setState({
        //        loading: false
        //    });
        //    this.props.onTopicUpdated(topic);
        //}.bind(this));

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

    //onDelete: function(){
    //    console.log('delete topic occured');
    //    console.log('trying to delete topic');
    //    TopicsMixin.deleteTopic(this.props.topicId, function(){
    //        this.props.onTopicDeleted();
    //    }.bind(this));
    //},

    render: function(){
        var canSave = ( ((this.state.name != undefined) && (this.state.name.trim() != ''))
        && ((this.state.name != undefined) && (this.state.name.trim() != ''))
        && ((this.state.name != undefined) && (this.state.name.trim() != '')));

        var rightStyle = assign({}, this.componentStyle.rightBlock, {width: (canSave == false ? 740 : 540)});
        var dialogLevel = this.props.dialogLevel == undefined ? 0 : this.props.dialogLevel;
        dialogLevel = dialogLevel + 11;

        return (
            <div style={this.componentStyle.placeholder} >

                {this.props.topicId == undefined ?
                    <div style={this.componentStyle.headerPlaceholder} >
                        Создание нового топика
                    </div>
                    :
                    <div>
                        <VerySimpleTopicHeaderPanel name={this.state.name}
                                                description={this.state.description}
                                                avatar={this.state.avatar}
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
    }

});

module.exports = UpdateTopicPanel;