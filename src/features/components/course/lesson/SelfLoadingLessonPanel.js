/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingLessonPanel = React.createClass({
    getDefaultProps: function () {
        return {
            lessonId: undefined,

            editMode: true
        }
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

            </div>
        );
    }

});

module.exports = SelfLoadingLessonPanel;