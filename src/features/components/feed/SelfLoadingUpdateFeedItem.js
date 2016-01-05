/**
 * Created by sabir on 30.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var FeedMixin = require('../../mixins/FeedMixin');

var PatientEditor = require('../editor/PatientEditor');

var MaterialSearchButton = require('../material/search/MaterialSearchButton');
var FeedItem = require('../feed/FeedItem');

var ExercisesSearchButton = require('../exercise/search/ExercisesSearchButton');
var moment = require('moment');

var SelfLoadingVideosList = require('./video/SelfLoadingVideosList');

var SelfLoadingNote = require('../note/SelfLoadingNote');

var SelfLoadingCurrentUserExercise = require('../exercise/SelfLoadingCurrentUserExercise');
var SelfLoadingUserExercise = require('../exercise/SelfLoadingUserExercise');

var DeleteButton = require('../buttons/DeleteButton');

var DialogsSearchButton = require('../dialog_exercise/list/DialogSearchButton');

var SelfLoadingDialogPanel = require('../dialog_exercise/view/SelfLoadingDialogPanel');

var QuestionnaireSearchButton = require('../questionnaire/panels/list/QuestionnaireSearchButton');

var SelfLoadingQuestionnairePanel = require('../questionnaire/panels/view/SelfLoadingQuestionnairePanel');

var SelfLoadingUpdateFeedItem = React.createClass({
    getDefaultProps: function () {
        return {
            feedItemId: undefined,
            teacherId: undefined,
            feedId: undefined,

            saveButtonName: 'Сохранить',

            onFeedItemUpdated: function(updatedItem){

            },

            onFeedItemCreated: function(createdFeedItem){

            },

            onFeedItemDeleted: function(itemId){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            information: undefined,
            defaultInformation: undefined,
            exerciseId: undefined,
            dialogId: undefined,
            noteId: undefined,
            materialIds: undefined,

            needToSave: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.load(nextProps.feedItemId, function(item){
            console.log('feed item loaded: ', item);
        });
    },

    componentDidMount: function () {
        this.load(this.props.feedItemId, function(item){
            console.log('feed item loaded: ', item);
        });
    },

    componentStyle: {
        placeholder: {
            width: 652,
            margin: '0 auto'
        },

        editBlock: {

        },

        editorBlock: {

        },

        additionalsPlaceholder: {
            padding: 5,
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            backgroundColor: 'white'
        },

        additionalLink: {
            marginLeft: 5,
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '14px'
        },

        previewPlaceholder: {
            marginTop: 10
        },



        videosPlaceholder: {
            //borderTop: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            paddingTop: 10,
            paddingBottom: 5,
            position: 'relative'
        },

        exercisePlaceholder: {
            paddingTop: 10
        },

        dialogPlaceholder: {
            paddingTop: 10
        },

        questionnairePlaceholder: {
            paddingTop: 10
        },

        infoPlaceholder: {
            borderBottom: '1px solid #EFF0F1'
        },

        notePlaceholder: {
            paddingTop: 10,
            paddingBottom: 10,
            //borderTop: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            position: 'relative'
        },

        dateBlock: {
            display: 'block',
            paddingBottom: 5,
            fontSize: '18px',
            lineHeight: '24px',
            color: 'grey',
            //fontWeight: 'bold',
            borderBottom: '1px solid #EFF0F1'
        },

        previewPlaceholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            padding: 10,
            //width: 630,
            width: 652,
            position: 'relative',
            margin: '0 auto',
            marginBottom: 10
        },

        headerPlaceholder: {
            paddingBottom: 10,
            marginTop: 10
            //fontWeight: 'bold'
        },

        buttonsPlaceholder: {
            position: 'relative',
            height: 60
        },

        deleteButtonPlaceholder: {
            position: 'absolute',
            left: 0,
            top: 0,
            paddingTop: 5
        },

        saveButtonPlaceholder: {
            position: 'absolute',
            right: 0,
            top: 0,
            textAlign: 'right',
            paddingTop: 5
        }

    },


    load: function(feedItemId, callback){
        if (feedItemId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        FeedMixin.loadFeedItem(feedItemId, function(item){
            this.setState({
                loading: false,
                information: item.information,
                defaultInformation: item.information,
                exerciseId: item.exerciseId,
                dialogId: item.dialogId,
                noteId: item.noteId,
                materialIds: item.materialIds
            });
        }.bind(this));
    },

    update: function(){
        var feedItemId = this.props.feedItemId;
        var self = this;
        this.setState({
            loading: true
        });
        if (feedItemId == undefined){
            // create feed item
            //alert('TODO: create feed item');

            if (this.props.feedId == undefined){
                alert('feedId is not defined');
                return;
            }
            //information, exerciseId, noteId, materialIds, callback
            var self = this;
            FeedMixin.createFeedItem(this.props.feedId, this.state.information,
                this.state.exerciseId, this.state.noteId, this.state.materialIds, this.state.dialogId,
                this.state.questionnaireId,
                function(item){
                    self.setState({
                        loading: false
                    });
                    self.props.onFeedItemCreated(item);
                });
            //this.props.onFeedItemCreated({});
            //feedId, information, exerciseId, noteId, materialIds, dialogId, questionnaireId
        }else{
            FeedMixin.updateFeedItem(feedItemId, this.state.information,
                this.state.exerciseId, this.state.noteId, this.state.materialIds, this.state.dialogId,
                this.state.questionnaireId,
                function(updatedItem){
                    self.setState({
                        loading: false
                    });
                    self.props.onFeedItemUpdated(updatedItem);
                }
            );
        }

        //updateFeedItem: function(feedItemId, information, exerciseId, noteId, materialIds, callback)

    },

    onMaterialsSelect: function(materialIds){
        console.log('onMaterialsSelect: materialIds = ', materialIds);
        this.setState({
            materialIds: materialIds,
            needToSave: true
        });
    },

    onInformationChange: function(val){
        this.setState({
            information: val,
            needToSave: true
        });
    },

    onAddExerciseClick: function(){
        alert('onAddExerciseClick occured');
    },

    onExerciseSelect: function(ex){
        //alert('onExerciseSelect occured');
        console.log(ex);
        this.setState({
            exerciseId: ex.id
        });
    },

    onDialogSelect: function(dialog){
        console.log('onDialogSelect: ', dialog);
        this.setState({
            dialogId: dialog.id
        });
    },

    onQuestionnaireSelect: function(questionnaire){
        console.log('onQuestionnaireSelect: ', questionnaire);
        this.setState({
            questionnaireId: questionnaire.id
        });
    },

    onDelete: function(){
        var self = this;
        this.setState({
            loading: true
        });
        FeedMixin.deleteFeedItem(this.props.feedItemId, function(){
            self.setState({
                loading: false
            });
            self.props.onFeedItemDeleted(self.props.feedItemId);
        });

        //onFeedItemDeleted

    },

    render: function () {
        console.log('rendering SelfLoadingUpdateFeedItem');
        var videoButtonName = 'Видео';
        var materialIds = (this.state.materialIds == undefined) ? [] : this.state.materialIds;
        if (materialIds.length > 0){
            videoButtonName += ' (выбрано ' + materialIds.length +')';
        }
        var saveDisabled = !this.state.needToSave;
        var dateString = moment(this.state.timestamp).format('DD.MM.YYYY');
        var information = (this.state.information == undefined ) ? '' : this.state.information;
        var exerciseButtonName = 'Упражнение';
        if (this.state.exerciseId != undefined){
            exerciseButtonName+= ' (выбрано)';
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.editBlock}>

                    <div style={this.componentStyle.headerPlaceholder}>
                        {this.props.feedItemId != undefined ? null :
                            <div>
                                <div style={{fontSize: '16px'}}>
                                    <b>Назначение нового задания</b>
                                </div>
                                <p style={{marginTop: 5}} >
                                    Чтобы создать новое задание в классе, введите описание задания в
                                    редакторе, добавьте упражнение для выполнения и видео материалы
                                    для ознакомления по необходимости.
                                </p>

                            </div>
                        }
                    </div>


                    <div style={this.componentStyle.editorBlock}>
                        <PatientEditor value={this.state.defaultInformation} onContentChange={this.onInformationChange} />
                    </div>

                    <div style={this.componentStyle.additionalsPlaceholder}>
                        <span style={{verticalAlign: 'middle'}} >
                            Добавить:
                        </span>

                        <span style={assign({}, this.componentStyle.additionalLink, {marginLeft: 15})}>
                            <ExercisesSearchButton teacherId={this.props.teacherId} buttonName={exerciseButtonName}
                                                   onSelect={this.onExerciseSelect} />
                        </span>

                        <span style={this.componentStyle.additionalLink} >
                            <MaterialSearchButton buttonIcon={'file video outline icon'} selectedMaterialIds={materialIds}
                                                  onSelect={this.onMaterialsSelect} teacherId={this.props.teacherId}
                                                  buttonClassName={'ui mini basic grey button'} buttonName={videoButtonName} />

                        </span>

                        <span style={this.componentStyle.additionalLink} >
                            <DialogsSearchButton userId={this.props.teacherId} onSelect={this.onDialogSelect} />
                        </span>


                        <span style={this.componentStyle.additionalLink} >
                            <QuestionnaireSearchButton teacherId={this.props.teacherId} onSelect={this.onQuestionnaireSelect} />
                        </span>

                    </div>

                    <div style={this.componentStyle.buttonsPlaceholder}>

                        {this.props.feedItemId == undefined ? null :
                            <div style={this.componentStyle.deleteButtonPlaceholder}>
                                <DeleteButton onDelete={this.onDelete} />
                            </div>
                        }

                        <div style={this.componentStyle.saveButtonPlaceholder}>
                            <button disabled={saveDisabled} className={'ui button primary '} onClick={this.update} >
                                <i className={'icon save'} ></i>
                                {this.props.saveButtonName}
                            </button>
                        </div>

                    </div>




                    <div style={{marginTop: 10}}>

                        <div style={{color: 'grey'}} >Превью</div>

                        <div style={this.componentStyle.previewPlaceholder} >


                            <div style={this.componentStyle.dateBlock}>
                                Задание <b>{dateString}</b>
                            </div>

                            {information == '' ? null :
                                <div style={this.componentStyle.infoPlaceholder}
                                     dangerouslySetInnerHTML={{__html: information}}
                                    >
                                </div>
                            }

                            {this.state.noteId == undefined ? null :
                                <div style={this.componentStyle.notePlaceholder}>
                                    <SelfLoadingNote noteId={this.state.noteId} />
                                </div>
                            }

                            {this.state.materialIds == undefined || this.state.materialIds.length == 0 ? null :
                                <div style={this.componentStyle.videosPlaceholder}>
                                    <SelfLoadingVideosList  materialIds={this.state.materialIds}  />
                                </div>
                            }

                            {this.state.exerciseId == undefined ? null :
                                <div style={this.componentStyle.exercisePlaceholder} >
                                    <SelfLoadingUserExercise userId={this.props.teacherId}
                                                             exerciseId={this.state.exerciseId} />
                                </div>
                            }

                            {this.state.dialogId == undefined ? null :
                                <div style={this.componentStyle.dialogPlaceholder}>

                                    <SelfLoadingDialogPanel
                                        userId={this.props.teacherId}
                                        dialogId={this.state.dialogId} />

                                </div>
                            }

                            {this.state.questionnaireId == undefined ? null :

                                <div style={this.componentStyle.questionnairePlaceholder}>
                                    <SelfLoadingQuestionnairePanel
                                        questionnaireId={this.state.questionnaireId}
                                        userId={this.props.teacherId} />
                                </div>
                            }


                        </div>


                    </div>


                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdateFeedItem;