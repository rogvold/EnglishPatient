/**
 * Created by sabir on 04.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../../dialog/Dialog');
var ClassMixin = require('../../../../mixins/ClassMixin');

var CommonMixin = require('../../../../../react/mixins/commonMixins/CommonMixin');

var AddClassButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            buttonName: 'Добавить класс',
            buttonIcon: 'icon plus',
            buttonClassName: 'ui button basic',

            buttonStyle: {

            },

            iconStyle: {

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            loading: false,
            errorMessage: undefined
        }
    },


    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {

        },

        panelPlaceholder: {
            padding: 10
        },

        buttonPlaceholder: {
            marginTop: 10,
            textAlign: 'right'
        },


        dialogPanelStyle: {
            width: 600
        },

        iconStyle: {

        }
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

    getValFromEvt: function(evt){
        if (evt == undefined){
            return '';
        }
        var val = evt.target.value;
        if (val == undefined){
            return '';
        }
        return val;
    },

    onCodeChange: function(evt){
        var code = this.getValFromEvt(evt);
        code = code.trim();
        code = code.substr(0, 4);
        code = code.toUpperCase();
        this.setState({
            code: code,
            errorMessage: undefined
        });
    },

    onSaveClick: function(){
        var self = this;
        this.setState({
            loading: true
        });

        var code = this.state.code;
        if (code == undefined || code.trim().length != 4){
            return;
        }
        var userId = this.props.userId;

        ClassMixin.addUserToClassByInvitationCode(code, userId, function(pClass){
            if (pClass != undefined){
                this.setState({
                    dialogVisible: false,
                    loading: false
                });
                CommonMixin.forceTransitionTo('/#/class/' + pClass.id);
                return;
            }
            this.setState({
                loading: false,
                errorMessage: 'Класс с данным кодом не найден. Введите другой код и попробуйте еще раз.'
            });

        }.bind(this));
    },

    getDialogContent: function(){
        var userId = this.props.userId;
        if (userId == undefined){
            return null;
        }
        var code = (this.state.code == undefined) ? '' : this.state.code;
        var buttonEnabled = (code.length == 4);

        return (
            <div style={this.componentStyle.panelPlaceholder}>

                <div style={{color: 'black', marginBottom: 10}} >
                    <h4>
                        Введите код класса.
                        Вам должен его продиктовать Ваш преподаватель.
                    </h4>
                </div>

                <div className="ui form">
                    <div className="field">
                        <input type="text" value={this.state.code} placeholder="Код класса (4 символа)"
                               onChange={this.onCodeChange} />
                    </div>
                </div>

                {this.state.errorMessage == undefined ? null :
                    <div className={'ui negative message'} >
                        {this.state.errorMessage}
                    </div>
                }

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={'ui button primary'} disabled={!buttonEnabled}
                            onClick={this.onSaveClick} style={{marginRight: 0}} >
                        <i className={'icon check circle'} ></i> Добавить класс
                    </button>
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );

    },

    render: function () {
        var buttonStyle = assign({}, this.componentStyle.buttonStyle, this.props.buttonStyle);
        var iconStyle = assign({}, this.componentStyle.iconStyle, this.props.iconStyle);

        return (
            <div style={this.componentStyle.placeholder}>
                <button style={buttonStyle} onClick={this.showDialog}
                        className={this.props.buttonClassName}>
                    <i style={iconStyle} className={this.props.buttonIcon}></i> {this.props.buttonName}
                </button>

                <Dialog content={this.getDialogContent()} visible={this.state.dialogVisible}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.hideDialog} />


            </div>
        );
    }

});

module.exports = AddClassButton;