/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireViewPanel = require('./panels/QuestionnaireViewPanel');
var QuestionnaireEditPanel = require('./panels/QuestionnaireEditPanel');

var Dialog = require('../dialog/Dialog');

var QuestionnaireEditViewDialog = React.createClass({
    getDefaultProps: function () {
        return {
            questionnaireId: undefined,
            teacherId: undefined,
            editMode: true,
            onClose: function(){

            },
            onDeleted: function(){

            },

            onUpdated: function(d){

            }
        }
    },

    getInitialState: function () {
        return {
            mode: 'info'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    switchMode: function(mode){
        this.setState({
            mode: mode
        });
    },


    componentStyle: {
        placeholder: {

        },

        dialogPanelStyle: {
            width: 870
        },

        footerStyle: {
            minHeight: 47
        }
    },

    onClose: function(){
        this.props.onClose();
    },

    getFooter: function(){
        return (
            <div style={{padding: 5}} >
                {this.state.mode == 'info' ?
                    <button className={'ui primary button'} onClick={this.switchMode.bind(this, 'edit')}>
                        <i className={'icon pencil'} ></i> Редактировать
                    </button>
                    :
                    <button className={'ui primary button'} onClick={this.switchMode.bind(this, 'info')}>
                        <i className={'icon unhide'} ></i> Просмотр
                    </button>
                }
            </div>
        );
    },

    onDeleted: function(){
        this.props.onDeleted();
    },

    onUpdated: function(d){
        this.props.onUpdated(d);
    },

    getContent: function(){
        return (
            <div style={this.componentStyle.content}>

                {this.state.mode == 'info' ?
                    <div>
                        <QuestionnaireViewPanel
                            userId={this.props.teacherId}
                            questionnaireId={this.props.questionnaireId} />
                    </div>
                    :
                    <div style={{height: '100%', overflowY: 'auto' }} >
                        <QuestionnaireEditPanel teacherId={this.props.teacherId} editMode={this.props.editMode}
                                                questionnaireId={this.props.questionnaireId}
                                                onDeleted={this.onDeleted} onUpdated={this.onUpdated}
                            />
                    </div>
                }

            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <Dialog visible={true} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        footerStyle={this.componentStyle.footerStyle} onClose={this.onClose}
                    content={this.getContent()} footer={this.getFooter()}
                    />

            </div>
        );
    }

});

module.exports = QuestionnaireEditViewDialog;