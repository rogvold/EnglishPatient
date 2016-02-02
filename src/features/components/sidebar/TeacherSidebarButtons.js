/**
 * Created by sabir on 16.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var SidebarChatButton = require('./SidebarChatButton');
var SidebarNotificationsButton = require('./SidebarNotificationsButton');
var MyPageButton = require('./MyPageButton');

var TeacherSidebarButtons = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <MyPageButton />
                <SidebarChatButton />
                <SidebarNotificationsButton />

            </div>
        );
    }

});

module.exports = TeacherSidebarButtons;