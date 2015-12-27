/**
 * Created by sabir on 01.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var ParseMixin = require('../../../react/mixins/commonMixins/ParseMixin');
var ExerciseMixin = require('../../mixins/ExerciseMixin');


var PatientExercise = require('../exercise/PatientExercise');
var PatientPreloader = require('../preloader/PatientPreloader');

var AuthButton = require('../user/AuthButton')

var TeacherExerciseBlock = require('../teacher/TeacherExerciseBlock');

var SelfLoadingUserExercise = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined,
            exerciseId: undefined,
            teacherMode: false,
            onLoaded: function(){
                console.log('onLoaded occured');
            },

            onExerciseFinished: function(exerciseId, userId){

            },

            teacherId: undefined,
            autoNext: true,
            noShadow: true
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            saving: false,
            exercise: undefined,
            cards: undefined,
            score: undefined,
            answers: undefined
        }
    },

    load: function(userId, exerciseId, callback){
        ExerciseMixin.loadExercise(exerciseId, function(loadedEx){
            this.setState({
                exercise: loadedEx.exercise,
                cards: loadedEx.cards
            });
            console.log(loadedEx);
            ExerciseMixin.loadUserExerciseAnswer(userId, exerciseId, function(o){
                console.log(o);
                this.setState({
                    exercise: loadedEx.exercise,
                    cards: loadedEx.cards,
                    score: (o == undefined) ? undefined : o.score,
                    answers: (o == undefined) ? []: o.answers,
                    loading: false
                });
                callback();
            }.bind(this));
        }.bind(this));
    },

    componentWillReceiveProps: function (nextProps) {
        var userId = nextProps.userId;
        var exerciseId = nextProps.exerciseId;

        if (userId != this.props.userId || exerciseId != this.props.exerciseId){
            this.prepareExercise(userId, exerciseId);
        }

    },

    componentDidMount: function () {
        ParseMixin.initParse();
        this.prepareExercise(this.props.userId, this.props.exerciseId);
    },

    prepareExercise: function(userId, exerciseId){
        console.log('SelfLoadingUserExercise: prepareExercise: userId, exerciseId = ', userId, exerciseId);
        if (exerciseId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        this.load(userId, exerciseId, function(){
            console.log('loaded');
        }.bind(this));
    },


    onAnswer: function(cardId, type, ans){
        if (ans == undefined || ans == ''){
            return;
        }
        this.setState({
            saving: true
        });
        ExerciseMixin.saveUserAnswer(cardId, this.props.userId, this.props.exerciseId, type, ans, function(answer){
            var list = this.state.answers;
            var f = false;
            for (var i in list){
                if (list[i].cardId == answer.cardId){
                    list[i] = answer;
                    f = true;
                }
            }
            if (f == false){
                list.push(answer);
            }
            this.setState({
                saving: false,
                answers: list
            });
        }.bind(this));
    },


    componentStyle: {
        placeholder: {
            width: 630,
            marginBottom: 10,
            marginRight: 0
        },
        exercisePlaceholder: {

        },

        preloaderPlaceholder: {

        },

        customBottomBlock: {
            paddingTop: 10,
            marginTop: 10,
            borderTop: '1px solid lightgrey',
            textAlign: 'center'
        },

        feedbackBlock: {
            //borderTop: '1px solid lightgrey',
            textAlign: 'justify'
        },

        waitingForFeedbackBlock: {
            borderTop: '1px solid lightgrey',
            opacity: 0.9,
            textAlign: 'center',
            marginTop: 10,
            paddingTop: 10
        },

        finishButtonBlock: {
            textAlign: 'center',
            paddingBottom: 10,
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid lightgrey'
        },

        teacherBlockPlaceholder: {

        }
    },

    getCustomBottomBlock: function(){
        if (this.props.userId != undefined){
            return undefined;
        }
        return (
            <div style={this.componentStyle.customBottomBlock}>
                <span style={{opacity: 0.6}}>
                    Войдите в систему, чтобы выполнить это упражнение.
                </span>
                <div style={{textAlign: 'center', marginTop: 10, marginBottom: 5}}>
                    <AuthButton buttonClassName={'ui blue basic button'} />
                </div>

            </div>

        );
    },

    onFinishExercise: function(){
        this.setState({
            loading: true
        });
        ExerciseMixin.finishExercise(this.props.userId, this.props.exerciseId, function(sc){
            this.setState({
                score: sc,
                loading: false
            });
            this.props.onExerciseFinished(this.props.exerciseId, this.props.userId);
        }.bind(this));
    },

    onTeacherUpdate: function(score){
          this.setState({
              score: score
          });
    },

    render: function () {
        var score = this.state.score;
        var status = (score== undefined) ? 'new' : score.status;
        var preloaderText = (this.state.loading == true) ? 'Loading...' : '';
        preloaderText = (this.state.saving == true) ? 'Saving...' : preloaderText;
        var preloaderVisible = (this.state.saving || this.state.loading)
        var st = assign({}, this.componentStyle.placeholder);
        if (preloaderVisible == true){
            st = assign({}, st, {minHeight: 160});
        }
        if (this.props.noShadow == true){
            st = assign(st, {boxShadow: 'none'});
        }
        var customBottomBlock = this.getCustomBottomBlock();
        var showAnswerBlock = (this.props.userId != undefined);

        var allAnswered = (this.state.answers != undefined && this.state.cards != undefined && this.state.answers.length == this.state.cards.length );
        var notStarted = (this.state.answers != undefined && this.state.answers.length == 0 && this.state.cards.length > 0);
        var started = (this.state.answers != undefined && this.state.cards != undefined && this.state.answers.length > 0 && this.state.answers.length < this.state.cards.length );
        var percents = (started == true) ? Math.floor(100.0 * this.state.answers.length / this.state.cards.length) : 0.0 ;
        if (allAnswered == true) {percents = 100.0;}

        var waitingForFeedback = (score != undefined && score.status == 'finished' && score.teacherFeedback == undefined);
        var feedback = (score != undefined && score.status == 'finished') ? score.teacherFeedback : undefined;
        var readyToFinish = allAnswered == true && score != undefined && score.status == 'new';

        readyToFinish = readyToFinish && (this.state.cards != undefined) && (this.state.cards.length > 0);

        console.log('rendering exercise: teacherMode = ', this.props.teacherMode);


        return (
            <div style={st} className={'ui segment '} >

                {allAnswered || started ?
                    <div className={'ui top attached progress ' + (started == true ? ' yellow ' : '  ') + (allAnswered == true ? ' green ' : ' ') } >
                        <div className="bar" style={{width: percents + '%'}}></div>
                    </div>
                    : null}

                <div style={this.componentStyle.exercisePlaceholder}>
                    <PatientExercise  onAnswer={this.onAnswer} userAnswers={this.state.answers}
                                      exercise={this.state.exercise} cards={this.state.cards}
                                      customBottomBlock={customBottomBlock} showAnswerBlock={showAnswerBlock}
                                      userId={this.props.userId} teacherMode={this.props.teacherMode}
                                      autoNext={this.props.autoNext} canAnswer={!waitingForFeedback}
                    />
                </div>

                {status == 'finished' && (feedback == undefined || feedback == '') ? null :
                    <div style={this.componentStyle.feedbackBlock} dangerouslySetInnerHTML={{__html: feedback}} ></div>
                }

                {waitingForFeedback ?
                    <div style={this.componentStyle.waitingForFeedbackBlock}>
                        Вы выполнили упражнение. Преподаватель скоро его проверит и напишет свой коментарий.
                    </div>
                    : null}

                {readyToFinish ?
                    <div style={this.componentStyle.finishButtonBlock}>
                        <div style={{marginBottom: 10}}>Проверьте свои ответы и нажмите на кнопку</div>
                        <button onClick={this.onFinishExercise}
                                className={'ui inverted green button'}>завершить упражнение</button>
                    </div>
                    : null
                }

                {this.props.teacherMode == false ? null :
                    <div style={this.componentStyle.teacherBlockPlaceholder}>
                        <TeacherExerciseBlock onComment={this.onTeacherUpdate}
                                              teacherId={this.props.teacherId} score={this.state.score} />
                    </div>
                }


                <div className={'ui inverted dimmer ' + (preloaderVisible ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{preloaderText}</div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingUserExercise;