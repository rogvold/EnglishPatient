/**
 * Created by sabir on 05.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var RoleSelector = React.createClass({
    getDefaultProps: function () {
        return {
            onChange: function(role){
                console.log('onChange: ', role);
            }
        }
    },

    getInitialState: function () {
        return {
            value: 'student'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    checkClicked: function(val){
        this.setState({
            value: val
        });
        this.props.onChange(val);
    },

    componentStyle: {
        placeholder: {

        },

        checkbox: {
            display: 'inline-block',
            cursor: 'pointer',
            marginRight: 10
        }
    },

    render: function () {
        var val = this.state.value;
        var studentChecked = (val == 'student');
        var teacherChecked = (val == 'teacher');

        return (
            <div style={this.componentStyle.placeholder} className={'inline field '} >

                <div style={this.componentStyle.checkbox} onClick={this.checkClicked.bind(this, 'teacher')} >
                    <i className={(teacherChecked == true) ? 'icon checkmark box' : 'icon square outline'} ></i>
                    Преподаватель
                </div>

                <div style={this.componentStyle.checkbox} onClick={this.checkClicked.bind(this, 'student')} >
                    <i className={(studentChecked == true) ? 'icon checkmark box' : 'icon square outline'} ></i>
                    Студент
                </div>

            </div>
        );
    }

});

module.exports = RoleSelector;