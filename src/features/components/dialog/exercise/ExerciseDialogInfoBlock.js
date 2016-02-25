/**
 * Created by sabir on 16.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingUserExercise = require('../../exercise/SelfLoadingUserExercise');
var SelfLoadingExerciseInfoCard = require('../../exercise/info/SelfLoadingExerciseInfoCard');

var ShareButton = require('../../share/buttons/ShareButton');

var CommentsBlock = require('../../comment/CommentsBlock');

var ExerciseDialogInfoBlock = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,
            avatar: undefined,
            access: undefined,
            task: undefined,
            exerciseId: undefined,

            userId: undefined
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
        contentPlaceholder: {
            width: 1000,
            margin: '0 auto'
        },

        exerciseInfoPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 360,
            padding: 13,
            paddingTop: 10,

            height: '100%',
            overflowY: 'auto'

        },

        cardsPlaceholder: {
            width: 635,
            height: '100%',
            paddingTop: 10,
            display: 'inline-block',
            verticalAlign: 'top',
            overflowY: 'auto'
        },
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={this.componentStyle.contentPlaceholder}>
                    <div style={this.componentStyle.exerciseInfoPlaceholder}>
                        <SelfLoadingExerciseInfoCard userId={this.props.userId} exerciseId={this.props.exerciseId} />

                        <div style={{marginTop: 20, textAlign: 'center'}} >
                            <ShareButton name={'exercise'}
                                         buttonName={'Поделиться упражнением'}
                                         buttonClassName={'ui button patientPrimary'}
                                         objectId={this.props.exerciseId} />
                        </div>

                    </div>

                    <div style={this.componentStyle.cardsPlaceholder} >
                        <SelfLoadingUserExercise exerciseId={this.props.exerciseId} teacherId={this.props.userId} userId={this.props.userId} />

                        <div style={{marginTop: 20}} >
                            <div style={{textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 16}} >
                                Комментарии
                            </div>

                            <div>
                                <CommentsBlock objectId={this.props.exerciseId} />
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        );
    }

});

module.exports = ExerciseDialogInfoBlock;