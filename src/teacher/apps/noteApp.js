/**
 * Created by sabir on 10.09.15.
 */
var React = require('react');

var Note = require('../components/Note');

var NoteApp = React.createClass({
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




            </div>
        );
    }

});

React.render(
    <NoteApp />,
    document.getElementById('main')
);