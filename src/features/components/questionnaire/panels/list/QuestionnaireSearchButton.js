/**
 * Created by sabir on 24.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../../dialog/Dialog');

var SelfLoadingQuestionnaireSearchList = require('./SelfLoadingQuestionnaireSearchList');

var QuestionnaireSearchButton = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            buttonName: 'Опросник',
            buttonClassName: 'ui basic mini button',
            icon: 'icon newspaper',

            style: {

            },

            onSelect: function(q){
                console.log('QuestionnaireSearchButton: default onSelect: q = ', q);
            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onSelect: function(q){
        this.props.onSelect(q);
        this.onClose();
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {

        },

        dialogPanelStyle: {
            width: 690,
            paddingTop: 10
        }
    },

    getDialogContent: function(){
        return (
            <div>

                <h3 style={{textAlign: 'center'}} >
                    Выберите опросник
                </h3>

                <SelfLoadingQuestionnaireSearchList
                    onSelect={this.onSelect}
                    teacherId={this.props.teacherId} />
            </div>
        );
    },


    render: function () {
        var bSt = assign({}, this.componentStyle.buttonStyle, this.props.style);
        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} style={bSt} onClick={this.showDialog} >
                    <i className={this.props.icon} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={this.getDialogContent()} onClose={this.onClose} level={100}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle} visible={true} />
                }

            </div>
        );
    }

});

module.exports = QuestionnaireSearchButton;