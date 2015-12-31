/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var SimpleTopicHeaderPanel = require('../topics/panels/SimpleTopicHeaderPanel');

var CoursePanel = React.createClass({
    getDefaultProps: function () {
        return {
            courseId: undefined,

            name: undefined,
            avatar: undefined,
            description: undefined
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

        content: {
            width: 910,
            padding: 5,
            margin: '0 auto',
            backgroundColor: 'white'
        }
    },

    getCustomHeaderContent: function(){
        return null;
    },

    render: function () {
        var customHeaderContent = this.getCustomHeaderContent();

        return (
            <div style={this.componentStyle.placeholder}>

                <SimpleTopicHeaderPanel name={this.props.name}
                                        avatar={this.props.name}
                                        customContent={customHeaderContent}
                                        description={this.props.description} />

                <div style={this.componentStyle.content}>

                    This is content

                </div>

            </div>
        );
    }

});

module.exports = CoursePanel;