/**
 * Created by sabir on 19.01.16.
 */

var React = require('react');
var assign = require('object-assign');
var CourseMixin = require('../../../mixins/CourseMixin');

var CoolPreloader = require('../../preloader/CoolPreloader');

var UsersCoursesList = require('./UsersCoursesList');

var CommunityCoursesList = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            usersIds: [],
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var userId = this.props.userId;
        this.setState({
            loading: true
        });
        CourseMixin.loadOtherCourseCreators(userId, function(ids){
            this.setState({
                loading: false,
                usersIds: ids
            });
        }.bind(this))
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <UsersCoursesList usersIds={this.state.usersIds} />

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CommunityCoursesList;