/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingJunglesList = require('./list/SelfLoadingJunglesList');

var JunglesPanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
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
        placeholder: {
            width: 820,
            margin: '0 auto'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <SelfLoadingJunglesList userId={this.props.userId} />
            </div>
        );
    }

});

module.exports = JunglesPanel;