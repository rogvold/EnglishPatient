/**
 * Created by sabir on 13.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsBunchDialog = React.createClass({
    getDefaultProps: function () {
        return {
            materialsIds: [],
            currentMaterialId: undefined
        }
    },

    getInitialState: function () {
        return {
            currentMaterialId: this.props.currentMaterialId,
            loading: false
        }
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

module.exports = MaterialsBunchDialog;