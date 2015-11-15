/**
 * Created by sabir on 17.09.15.
 */
var React = require('react');
var RecordStopButton = require('../components/buttons/RecordStopButton');
var PatientRecordComponent = require('../components/record/PatientRecordComponent');

var AuditorApp = React.createClass({
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
                <PatientRecordComponent />
            </div>
        );
    }

});

React.render(
    <AuditorApp />,
    document.getElementById('main')
);