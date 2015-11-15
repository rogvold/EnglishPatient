/**
 * Created by sabir on 09.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var ClassMixin = require('../../../../mixins/ClassMixin');
var CommonMixin = require('../../../../../react/mixins/commonMixins/CommonMixin');

var AddToClassButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            classId: undefined,
            buttonClassName: 'ui button basic grey',
            buttonIcon: 'icon plus',
            buttonName: ''
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
            display: 'inline-block'
        },

        button: {

        }
    },

    onAdded: function(){
        var classId = this.props.classId;
        var url = 'http://app.englishpatient.org/#/class/' + classId;
        CommonMixin.forceTransitionTo(url);
    },

    addToClass: function(callback){
        var userId = this.props.userId;
        var classId = this.props.classId;
        if (userId == undefined || classId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ClassMixin.addUserToClass(classId, userId, function(){
            this.setState({
                loading: false
            });
        }.bind(this));
    },

    onClick: function(){

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <button style={this.componentStyle.button} onClick={this.onClick}
                        className={this.props.buttonClassName} >

                    <i className={this.props.buttonIcon} ></i>
                    {this.props.buttonName}

                </button>

            </div>
        );
    }

});

module.exports = AddToClassButton;