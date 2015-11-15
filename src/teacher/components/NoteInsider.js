/**
 * Created by sabir on 10.09.15.
 */
var React = require('react');

var NoteInsider = React.createClass({
    getDefaultProps: function () {
        return {
            html: ''
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
                <div dangerouslySetInnerHTML={{__html: this.props.html}} />
            </div>
        );
    }

});

module.exports = NoteInsider;