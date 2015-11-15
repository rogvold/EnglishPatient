/**
 * Created by sabir on 04.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../../dialog/Dialog');

var DeleteButton = require('../../../buttons/DeleteButton');

var ClassMixin = require('../../../../mixins/ClassMixin');


var LeaveClassButton = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            userId: undefined,
            buttonName: 'удалить класс',
            buttonClassName: 'ui button mini basic red',
            buttonIcon: 'icon remove',
            onClassLeft: function(classId){

            }
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            loading: false
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

        panelPlaceholder: {
            padding: 10
        },

        buttonPlaceholder: {
            marginTop: 10,
            textAlign: 'right'
        },

        dialogPanelStyle: {
            width: 630
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

    onLeave: function(){
        var userId = this.props.userId;
        var classId = this.props.classId;
        if (userId == undefined || classId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ClassMixin.deleteUserFromClass(userId, classId, function(){
            this.setState({
                loading: false,
                dialogVisible: false
            });
            this.props.onClassLeft(classId);
        }.bind(this));
    },

    getDialogContent: function(){
        var classId = this.props.classId;
        var userId = this.props.userId;
        if (userId == undefined || classId == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.panelPlaceholder}>

                <div style={{color: 'black', marginBottom: 10}} >
                    <h4>
                        Вы действительно хотите выйти из этого класса?
                    </h4>
                </div>


                <div style={this.componentStyle.buttonPlaceholder}>
                    <DeleteButton buttonText={'Выйти из класса'} onDelete={this.onLeave} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка...'}</div>
                </div>

            </div>
        );

    },


    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button onClick={this.showDialog} className={this.props.buttonClassName}>
                    <i className={this.props.buttonIcon}></i>
                    {this.props.buttonName}
                </button>

                <Dialog content={this.getDialogContent()} visible={this.state.dialogVisible}
                        dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        onClose={this.hideDialog} />


            </div>
        );
    }

});

module.exports = LeaveClassButton;