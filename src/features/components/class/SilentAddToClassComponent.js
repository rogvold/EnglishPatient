/**
 * Created by sabir on 02.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var ClassMixin = require('../../mixins/ClassMixin');

var SilentAddToClassComponent = React.createClass({
    getDefaultProps: function () {
        return {
            classId: undefined,
            userId: undefined,
            onUserAddedToClass: function(){

            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.addToClass();
    },

    addToClass: function(){
        var classId = this.props.classId;
        var userId = this.props.userId;
        if (classId == undefined || userId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        ClassMixin.addUserToClass(classId, userId, function(patientClass){
            this.setState({
                loading: false
            });
            this.props.onUserAddedToClass(patientClass);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SilentAddToClassComponent;