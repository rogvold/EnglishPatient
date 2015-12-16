/**
 * Created by sabir on 03.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingTopicsList = require('../topics/SelfLoadingTopicsList');

var GrammarPanel = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined
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
            margin: '0 auto',
            marginTop: 10
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <SelfLoadingTopicsList teacherId={this.props.teacherId} topicType={'grammar'}  />

            </div>
        );
    }

});

module.exports = GrammarPanel;