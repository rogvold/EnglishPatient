/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');



var LessonCard = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            duration: undefined
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
            width: 200,
            height: 200,
            display: 'inline-block',
            position: 'relative',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1'
        },

        namePlaceholder: {
            textAlign: 'center',
            padding: 5,
            paddingTop: 40,
            fontSize: 16,
            fontWeight: 'bold'
        },

        durationPlaceholder: {
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 5,
            borderBottomLeft: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            backgroundColor: 'white'
        }

    },

    render: function () {
        var dur = this.props.duration;

        return (
            <div style={this.componentStyle.placeholder}>

                {dur == undefined ? null :
                    <div style={this.componentStyle.durationPlaceholder}>
                        <i className={'icon wait'} ></i> {dur}
                    </div>
                }

                <div style={this.componentStyle.namePlaceholder}>
                    {this.props.name}
                </div>

            </div>
        );
    }

});

module.exports = LessonCard;