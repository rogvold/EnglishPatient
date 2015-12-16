/**
 * Created by sabir on 02.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var ClassMixin = require('../../../mixins/ClassMixin');

var AddToClassButton = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            user: undefined,


            onUserAddedToClass: function(patientClass){

            },

            buttonName: 'Добавиться в класс',
            icon: 'icon plus',
            buttonClassName: 'ui button basic grey'
        }
    },

    getInitialState: function () {
        return {
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        buttonPlaceholder: {

        }
    },

    addToClass: function(){
        var classId = this.props.classId;
        var userId = (this.props.user == undefined) ? undefined : this.props.user.id;
        if (classId == undefined || userId == undefined){
            return;
        }
        this.setState({
            loading: false
        });
        ClassMixin.addUserToClass(classId, userId, function(patientClass){
            this.setState({
                loading: false
            });
            this.props.onUserAddedToClass(patientClass);
        }.bind(this));
    },

    onClick: function(){
        this.addToClass();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.user == undefined ?
                    <div>
                        Пожалуйста, авторизуйтесь
                    </div>
                    :
                    <div style={this.componentStyle.buttonPlaceholder}>
                        <button className={this.props.buttonClassName} onClick={this.onClick} >
                            <i className={this.props.icon} ></i> {this.props.buttonName}
                        </button>
                    </div>
                }

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = AddToClassButton;