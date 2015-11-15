/**
 * Created by sabir on 26.08.15.
 */
var React = require('react');
var MediaItem = require('./MediaItem');

var ExerciseCard = React.createClass({
    getDefaultProps: function () {
        return {

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
            textAlign: 'center',
            padding: 5
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <MediaItem imgSrc={this.props.imgSrc} text={this.props.text} vimeoId={this.props.vimeoId} />
            </div>
        );
    }

});

module.exports = ExerciseCard;