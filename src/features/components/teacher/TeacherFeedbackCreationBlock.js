/**
 * Created by sabir on 06.10.15.
 */
var React = require('react');
var ExerciseMixin = require('../../mixins/ExerciseMixin');

var DialogMixin = require('../../mixins/DialogMixin');

var PatientEditor = require('../../components/editor/PatientEditor');

var CorrectorHelpButton = require('../corrector/CorrectorHelpButton');

var QuestionnaireMixin = require('../../mixins/QuestionnaireMixin');

var TeacherFeedbackCreationBlock = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            exerciseId: undefined,
            feedback: undefined,
            onComment: function(score){
                console.log(score);
            },
            placeholder: 'Leave your feedback here',

            mode: 'exercise',
            dialogId: undefined,
            questionnaireId: undefined
        }
    },

    getInitialState: function () {
        return {
            value: this.props.feedback,
            defaultValue: this.props.feedback,
            loading: false,
            needToSave: false

        }
    },

    componentWillReceiveProps: function (nextProps) {
        var feedback = nextProps.feedback;
        console.log('TeacherFeedbackCreationBlock: componentWillReceiveProps occured');
        console.log('feedback = ', feedback);

        if (feedback != this.props.feedback){
            this.setState({
                value: feedback,
                defaultValue: feedback
            });
        }
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid lightgrey'
        },
        textareaPlaceholder: {
            position: 'relative'
        },
        textarea: {

        },
        buttonPlaceholder: {
            textAlign: 'center',
            padding: 5
        },

        correctorButtonPlaceholder: {
            position: 'absolute',
            top: 0,
            right: 0
        },

        correctorButton: {

        }
    },

    onChange: function(evt){
        var val = evt.target.value;
        if (val == ''){
            val = undefined
        }
        this.setState({
            value: val,
            needToSave: true
        });
    },

    onComment: function(){
        var userId = this.props.userId;
        var exerciseId = this.props.exerciseId;
        var dialogId = this.props.dialogId;
        var questionnaireId = this.props.questionnaireId;

        console.log('TeacherFeedbackCreationBlock: onComment: exerciseId, dialogId, questionnaireId = ', exerciseId, dialogId, questionnaireId);

        //if (userId == undefined || exerciseId == undefined){
        //    return;
        //}
        if (userId == undefined){
            return;
        }
        if ((exerciseId == undefined) && (dialogId == undefined) && (questionnaireId == undefined)){
            return;
        }

        this.setState({
            loading: true
        });
        var comment = this.state.value;
        if (comment == undefined || comment == '' || comment.trim() == ''){
            comment = undefined;
        }

        console.log('mode = ', this.props.mode);

        if (this.props.mode == 'exercise'){
            ExerciseMixin.commentUserExercise(userId, exerciseId, comment, function(score){
                this.setState({
                    loading: false,
                    needToSave: false
                });
                this.props.onComment(score);
            }.bind(this));
        }

        if (this.props.mode == 'dialog'){
            DialogMixin.commentUserDialog(userId, dialogId, comment, function(score){
                this.setState({
                    loading: false,
                    needToSave: false
                });
                this.props.onComment(score);
            }.bind(this));
        }

        if (this.props.mode == 'questionnaire'){
            console.log('commenting');
            QuestionnaireMixin.commentUserQuestionnaire(userId, questionnaireId, comment, function(score){
                this.setState({
                    loading: false,
                    needToSave: false
                });
                this.props.onComment(score);
            }.bind(this))
        }

    },

    onContentChange: function(content){
        this.setState({
            value: content
        });
    },

    render: function () {
        var val = (this.state.value == undefined) ? '' : this.state.value;
        var defaultValue = (this.state.defaultValue == undefined) ? '' : this.state.defaultValue;

        return (
            <div style={this.componentStyle.placeholder} className={'ui form'} >

                <div style={this.componentStyle.textareaPlaceholder} className={'field'}>
                    <label>Комментарий преподавателя {this.state.needToSave == false ? null : <span style={{float: 'right', color: '#FBBD08'}} > <i className={'ui warning sign icon'} ></i>   not saved... </span>}</label>

                    <div style={this.componentStyle.correctorButtonPlaceholder}>
                        <CorrectorHelpButton buttonStyle={{padding: '6px', marginRight: 0}} buttonClassName={'ui basic grey mini button'} />
                    </div>

                    <PatientEditor value={defaultValue} fileMode={true}
                                   onContentChange={this.onContentChange}  />

                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button dasabled={this.state.loading ? '1' : false} className="ui inverted green button " onClick={this.onComment} >
                        <i className={'ui icon ' + (this.state.loading ? ' spinner ' : ' comment ')}></i>
                        {this.state.loading ? <span>Saving</span> : <span>Leave feedback
                        </span> }
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = TeacherFeedbackCreationBlock;