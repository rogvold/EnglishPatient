/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../../../dialog_exercise/card/DialogCard');

var Dialog = require('../../../dialog/Dialog');

var QuestionnaireEditPanel = require('../QuestionnaireEditPanel');

var QuestionnaireEditViewDialog = require('../../QuestionnaireEditViewDialog');



var TeacherQuestionnairesList = React.createClass({
    getDefaultProps: function () {
        return {
            questionnaires: [],
            teacherId: undefined,

            editMode: true,

            onDeleted: function(){

            },

            onUpdated: function(q){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            selectedQuestionnaireId: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 850,
            margin: '0 auto'
        },

        dialogPanelStyle: {
            width: 850
        },

        itemStyle: {
            width: 200,
            height: 150,
            margin: 5,
            display: 'inline-block',
            cursor: 'pointer'
        },

        listPlaceholder: {

        }
    },


    onItemClick: function(questionnaireId){
        this.setState({
            selectedQuestionnaireId: questionnaireId,
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onDeleted: function(){
        this.props.onDeleted();
        this.onClose();
    },

    onUpdated: function(q){
        this.props.onUpdated(q);
    },

    render: function () {
        var list = this.props.questionnaires;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>
                    {list.map(function(q, k){
                        var key = 'qu_' + k;
                        var onClick = this.onItemClick.bind(this, q.id);

                        return (
                            <div onClick={onClick} style={this.componentStyle.itemStyle}>
                                <DialogCard avatar={q.avatar} name={q.name} />
                            </div>
                        );

                    }, this)}
                </div>

                {this.state.dialogVisible == false ? null :
                    <QuestionnaireEditViewDialog
                        teacherId={this.props.teacherId} onClose={this.onClose}
                        onDeleted={this.onDeleted}
                        onUpdated={this.onUpdated}
                        questionnaireId={this.state.selectedQuestionnaireId} />
                }

            </div>
        );
    }

});

module.exports = TeacherQuestionnairesList;