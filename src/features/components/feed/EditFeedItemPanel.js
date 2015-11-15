/**
 * Created by sabir on 29.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var EditFeedItemPanel = React.createClass({
    getDefaultProps: function () {
        return {
            information: undefined,
            noteId: undefined,
            exerciseId: undefined,
            materialIds: []
        }
    },

    getInitialState: function () {
        return {
            information: this.props.information,
            noteId: this.props.noteId,
            exerciseId: this.props.exerciseId,
            materialIds: this.props.materialIds
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        editorPlaceholder: {

        },

        videosPlaceholder: {

        },

        notePlaceholder: {

        },

        exercisePlaceholder: {


        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.editorPlaceholder}>

                </div>




            </div>
        );
    }

});

module.exports = EditFeedItemPanel;