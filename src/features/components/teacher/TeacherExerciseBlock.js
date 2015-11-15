/**
 * Created by sabir on 06.10.15.
 */
var React = require('react');

var TeacherFeedbackCreationBlock = require('./TeacherFeedbackCreationBlock');

var TeacherExerciseBlock = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            score: undefined,
            onComment: function(score){
                console.log('onComment occured');
            }
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
            padding: 5,
            paddingTop: 15
        },

        feedbackBlockPlaceholder: {

        }
    },

    onComment: function(score){
        this.props.onComment(score);
    },

    render: function () {
        var score = this.props.score;
        console.log('rendering teacher exercise block: score = ', score);
        if (score != undefined){
            console.log('feedback = ', score.teacherFeedback);
        }

        return (
            <div style={this.componentStyle.placeholder}>

                {score == undefined ? null :
                    <div>
                        <h3 style={{textAlign: 'center'}}>Блок преподавателя</h3>
                        <div style={this.componentStyle.feedbackBlockPlaceholder}>
                            <TeacherFeedbackCreationBlock feedback={score.teacherFeedback}
                                                          userId={score.userId} teacherId={this.props.teacherId}
                                                          exerciseId={score.exerciseId} onComment={this.onComment} />
                        </div>
                    </div>
                }


            </div>
        );
    }

});

module.exports = TeacherExerciseBlock;