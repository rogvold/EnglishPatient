/**
 * Created by sabir on 01.10.15.
 */
var React = require('react');
var ReactTooltip = require("react-tooltip")

var TranslateHover = React.createClass({
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

module.exports = TranslateHover;