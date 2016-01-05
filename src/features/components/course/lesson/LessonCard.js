/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var LessonCard = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            duration: undefined,
            avatar: undefined
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
            cursor: 'pointer',
            borderRadius: 4,
            width: 180,
            //height: 180,
            height: 120,
            display: 'inline-block',
            position: 'relative',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1'
        },

        namePlaceholder: {
            textAlign: 'center',
            padding: 5,
            paddingTop: 60,
            fontSize: 16,
            fontWeight: 'bold'
        },

        durationPlaceholder: {
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 5,
            borderLeft: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            borderBottomLeftRadius: 4,
            opacity: 0.7,
            backgroundColor: 'white'
        }

    },

    render: function () {
        var dur = this.props.duration;

        return (
            <div style={this.componentStyle.placeholder}>

                {dur == undefined ? null :
                    <div style={this.componentStyle.durationPlaceholder}>
                        <i className={'icon wait'} ></i> {dur} ч.
                    </div>
                }

                <div style={{width: '100%', height: '100%'}} >
                    <DialogCard name={this.props.name} avatar={this.props.avatar} />
                </div>



            </div>
        );
    }

});

module.exports = LessonCard;