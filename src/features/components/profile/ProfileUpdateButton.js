/**
 * Created by sabir on 26.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');
var SelfLoadingProfilePanel = require('./SelfLoadingProfilePanel');

var DeleteButton = require('../buttons/DeleteButton');

var moment = require('moment');

var ProfileUpdateButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            style: {

            },
            buttonStyle: {

            },
            buttonName: 'информация',
            timestamp: undefined,
            buttonClassName: 'ui basic grey button',
            buttonIcon: 'icon info circle',
            email: undefined,

            onUserDelete: function(){

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

    hideDialog: function(){
        this.setState({
            dialogVisible: false
        });
    },

    onSave: function(data){
        this.hideDialog();
    },

    onDelete: function(){
        this.props.onUserDelete();
    },

    getDialogContent: function(){
        var userId = this.props.userId;
        if (userId == undefined){
            return null;
        }

        var sDate = moment(this.props.timestamp).format('DD MMM YYYY HH:mm');

        return (

            <div>

                {this.props.email == undefined ? null :
                    <div style={{padding: 10}} >

                        {this.props.name == undefined ? null :
                            <div>
                                <i className={'icon user'} ></i> {this.props.name}
                            </div>
                        }

                        <div>
                            <i className={'icon mail outline'} ></i>
                            {this.props.email}
                        </div>

                        {this.props.timestamp == undefined ? null :
                            <div>
                                <i className={'icon calendar'} ></i>
                                Дата добавления:
                                {sDate}
                            </div>
                        }

                    </div>
                }

                <SelfLoadingProfilePanel dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                                         onSave={this.onSave} userId={userId} />

                <div style={{padding: 10}}>
                    <DeleteButton buttonClassName={'ui button red inverted'}
                                  buttonText={'Удалить пользователя из класса'} onDelete={this.onDelete} />
                </div>

            </div>

        );
    },


    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogPanelStyle: {

        },

        buttonStyle: {
            fontSize: '12px',
            padding: '5px',
            paddingLeft: '7px'
        }

    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        var buttonStyle = assign({}, this.componentStyle.buttonStyle, this.props.buttonStyle);


        return (
            <div style={st}>

                <button className={this.props.buttonClassName} style={buttonStyle} onClick={this.showDialog} >
                    <i className={this.props.buttonIcon} ></i>
                    {this.props.buttonName}
                </button>

                <Dialog dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        visible={this.state.dialogVisible} onClose={this.hideDialog}
                        content={this.getDialogContent()}
                />

            </div>
        );
    }

});

module.exports = ProfileUpdateButton;