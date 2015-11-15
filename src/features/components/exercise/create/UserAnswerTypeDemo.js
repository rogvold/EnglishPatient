/**
 * Created by sabir on 14.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var UserAnswerTypeDemo = React.createClass({
    getDefaultProps: function () {
        return {
            type: undefined
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

        img: {
            width: '100%'
        }
    },

    render: function () {
        var map = {
            typing: 'http://beta.englishpatient.org/img/typing.gif',
            speaking: 'http://beta.englishpatient.org/img/speaking.gif',
            recognition: 'http://beta.englishpatient.org/img/recognition.gif'
        };
        var src = map[this.props.type];

        return (
            <div style={this.componentStyle.placeholder}>
                <img src={src} style={this.componentStyle.img} />
            </div>
        );
    }

});

module.exports = UserAnswerTypeDemo;