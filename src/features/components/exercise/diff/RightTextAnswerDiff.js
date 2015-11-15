/**
 * Created by sabir on 09.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var Diff = require('react-diff');


var RightTextAnswerDiff = React.createClass({
    getDefaultProps: function () {
        return {
            correctAnswer: undefined,
            userAnswer: undefined,
            diffType: 'words',
            rightTextLabel: 'Правильный ответ',
            userTextLabel: 'Ответ пользователя',
            diffTextLabel: 'Различие'
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
            fontSize: '16px',
            textAlign: 'center'
        },


        label: {
            opacity: 0.5,
            fontSize: '14px'
        }

    },

    render: function () {
        var rightAnswer = (this.props.correctAnswer == undefined) ? '' : this.props.correctAnswer;
        var userAnswer = (this.props.userAnswer == undefined) ? '' : this.props.userAnswer;

        return (
            <div style={this.componentStyle.placeholder}>

                <div >

                    <div style={this.componentStyle.label}>
                        {this.props.rightTextLabel}
                    </div>

                    <div >
                        {rightAnswer}
                    </div>

                </div>

                <div style={{marginTop: 15}}>

                    <div style={this.componentStyle.label}>
                        {this.props.userTextLabel}
                    </div>

                    <div >
                        {userAnswer}
                    </div>

                </div>

                <div style={{marginTop: 15}}>
                    <div style={this.componentStyle.label}>
                        {this.props.diffTextLabel}
                    </div>
                    <div style={{marginTop: -10, textAlign: 'center'}}>
                        <Diff inputA={rightAnswer} inputB={userAnswer} type={this.props.diffType} />
                    </div>
                </div>




            </div>
        );
    }

});

module.exports = RightTextAnswerDiff;