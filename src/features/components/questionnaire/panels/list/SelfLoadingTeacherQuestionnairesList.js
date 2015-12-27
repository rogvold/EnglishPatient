/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var TeacherQuestionnairesList = require('./TeacherQuestionnairesList');

var Dialog = require('../../../dialog/Dialog');

var QuestionnaireEditPanel = require('../QuestionnaireEditPanel');

var SelfLoadingTeacherQuestionnairesList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {
            questionnaires: [],
            loading: false,
            createDialogVisible: false

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var teacherId = this.props.teacherId;
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        QuestionnaireMixin.loadTeacherQuestionnaires(teacherId, function(questionnaires){
            this.setState({
                questionnaires: questionnaires,
                loading: false
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            width: 870,
            margin: '0 auto',
            //padding: 5,
            //paddingTop: 5,
            paddingBottom: 10,
            backgroundColor: 'white'
        },

        listPlaceholder: {

        },

        createButtonPlaceholder: {
            textAlign: 'right',
            padding: 5,
            paddingRight: 0
        },

        dialogPanelStyle: {
            width: 870
        }
    },

    onCreated: function(){
        this.load();
        setTimeout(function(){
            this.onClose();
        }.bind(this), 200);
    },

    onDeleted: function(){
        this.onClose();
        setTimeout(function(){
            this.load();
        }.bind(this), 200);
    },

    onUpdated: function(q){
        this.load();
        setTimeout(function(){
            this.onClose();
        }.bind(this), 200);

    },

    getDialogContent: function(){
        return (
            <div>
                <QuestionnaireEditPanel onUpdated={this.onCreated}
                                        onDeleted={this.onDeleted}
                                        teacherId={this.props.teacherId} />
            </div>
        );
    },

    onClose: function(){
        this.setState({
            createDialogVisible: false
        });
    },

    onShowDialog: function(){
        this.setState({
            createDialogVisible: true
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createButtonPlaceholder}>
                    <button className={'ui basic button'} onClick={this.onShowDialog} onClick={this.onShowDialog} >
                        <i className={'icon plus'} ></i> Создать новый опросник
                    </button>
                </div>

                <div style={this.componentStyle.listPlaceholder}>
                    <TeacherQuestionnairesList teacherId={this.props.teacherId}
                                               onDeleted={this.onDeleted} onUpdated={this.onUpdated}
                        questionnaires={this.state.questionnaires} />
                </div>

                {this.state.createDialogVisible == false ? null :
                    <Dialog
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        content={this.getDialogContent()} onClose={this.onClose}
                        visible={true} />
                }


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingTeacherQuestionnairesList;