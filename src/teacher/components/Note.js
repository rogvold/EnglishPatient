/**
 * Created by sabir on 10.09.15.
 */
var React = require('react');
var NoteInsider = require('./NoteInsider');

var Note = React.createClass({
    getDefaultProps: function () {
        return {
            html: '',
            createdTimestamp: 0,
            userName: 'N/A',
            headerIsVisible: true
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

        },
        header: {

        },
        content: {

        },
        footer: {

        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={this.componentStyle.header}>

                </div>

                <div style={this.componentStyle.content}>
                    <NoteInsider html={this.props.html} />
                </div>

                <div style={this.componentStyle.footer}>

                </div>

            </div>
        );
    }

});

module.exports = Note;