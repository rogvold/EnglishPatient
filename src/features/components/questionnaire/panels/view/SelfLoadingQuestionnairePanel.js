/**
 * Created by sabir on 23.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var QuestionnairePanel = require('./QuestionnairePanel');

var PreparePanel = require('./prepare/PreparePanel');

var QuestionnaireTestPanel = require('./test/QuestionnaireTestPanel');

var TeacherFeedbackCreationBlock =require('../../../teacher/TeacherFeedbackCreationBlock');

var SelfLoadingQuestionnairePanel = React.createClass({
    getDefaultProps: function () {
        return {
            questionnaireId: undefined,
            userId: undefined,

            teacherMode: false,
            teacherId: undefined,

            onQuestionnaireFinished: function(){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            questionnaire: {},
            questions: [],
            answersMap: {},
            score: undefined,
            mode: 'initial'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            border: '1px solid #EFF0F1',
            borderRadius: 4
        },

        content: {
            width: 620,
            margin: '0 auto'
        },

        isFinishedBlock: {
            marginTop: 10,
            marginBottom: 10
        },

        finishBlock: {
            padding: 10,
            textAlign: 'center'
        },

    },

    onBack: function(){
        console.log('onBack occured');
        var mode = this.state.mode;
        if (mode == 'prepare'){
            this.setState({
                mode: 'initial'
            });
        }
        if (mode == 'test'){
            this.setState({
                mode: 'prepare'
            });
        }
    },

    onForward: function(){
        var mode = this.state.mode;
        if (mode == 'initial'){
            this.setState({
                mode: 'prepare'
            });
        }
        if (mode == 'prepare'){
            this.setState({
                mode: 'test'
            });
        }
    },

    load: function(){
        var questionnaireId = this.props.questionnaireId;
        var userId = this.props.userId;
        this.setState({
            loading: true
        });
        var self = this;
        console.log('SelfLoadingQuestionnairePanel: load: userId, questionnaireId = ', userId, questionnaireId);
        QuestionnaireMixin.loadQuestionnaire(questionnaireId, function(questionnaire){
            QuestionnaireMixin.loadQuestionnaireQuestions(questionnaireId, function(questions){
                if (userId == undefined){
                    self.setState({
                        loading: false,
                        questionnaire: questionnaire,
                        questions: questions
                    });
                    return;
                }
                QuestionnaireMixin.loadUserQuestionnaireAnswersMap(userId, questions, function(answersMap){
                    //self.setState({
                    //    loading: false
                    //});
                    console.log('answersMap loaded: ', answersMap);
                    QuestionnaireMixin.loadUserQuestionnaireScore(userId, questionnaireId, function(score){
                        console.log('score loaded: ', score);
                        console.log('setting loading to false');
                        self.setState({
                            score: score,
                            loading: false,
                            answersMap: answersMap,
                            questionnaire: questionnaire,
                            questions: questions
                        });
                    });
                });
            });
        });
    },

    onAnswerSelect: function(questionId, answerNumber){
        var map = this.state.answersMap;
        map[questionId] = {questionId: questionId, variant: answerNumber}
        this.setState({
            answersMap: map
        });
    },

    switchMode: function(mode){
        this.setState({
            mode: mode
        });
    },

    onTestAnswer: function(a){
        console.log('onTestAnswer: a = ', a);
        if (a == undefined){
            return;
        }
        var map = this.state.answersMap;
        console.log('answers map = ', map);
        map[a.questionId] = a;
        this.setState({
            answersMap: map
        });
    },

    onFinishQuestionnaire: function(){
        var userId = this.props.userId;
        var questionnaireId = this.props.questionnaireId;
        this.setState({
            loading: true
        });
        QuestionnaireMixin.onFinishQuestionnaire(userId, questionnaireId, function(score){
            this.setState({
                loading: false,
                score: score
            });
            this.props.onQuestionnaireFinished(questionnaireId, userId);
        }.bind(this));
    },

    onComment: function(score){
        console.log('onComment occured');
        this.load();
    },

    canFinish: function(){
        console.log('canFinish occured:');
        var list = this.state.questions;
        console.log('questions = ', list);
        var map = this.state.answersMap;
        var f = true;
        for (var i in list){
            var q = list[i];
            var a = map[q.id];
            if (a == undefined){
                console.log('answer for the question is not defined: a = ', a);
                f = false;
                continue;
            }
            if (a.variant == -1){
                continue;
            }
            if (a.audioUrl == undefined){
                console.log('selected, but not answered: a = ', a);
                f = false
            }
        }
        return f;
    },

    render: function () {
        var score = this.state.score;
        var feedback = (score == undefined) ? undefined : score.feedback;
        var isFinished = (score == undefined) ? true : (score.status == 'finished');
        var canFinish = this.canFinish();

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.loading == true ? null :
                    <div style={this.componentStyle.content}>

                        {this.state.mode == 'initial' ?
                            <QuestionnairePanel questionnaire={this.state.questionnaire} questions={this.state.questions}
                                                answersMap={this.state.answersMap}
                                                userId={this.props.userId}
                                                onForward={this.onForward}
                                                onAnswerSelect={this.onAnswerSelect}
                                />
                            : null
                        }

                        {this.state.mode == 'prepare' ?
                            <div>
                                <PreparePanel answersMap={this.state.answersMap}
                                              onBack={this.onBack}
                                              onForward={this.onForward}
                                              questions={this.state.questions}  />
                            </div>
                            : null
                        }

                        {this.state.mode == 'test' ?
                            <div>
                                <QuestionnaireTestPanel userId={this.props.userId} onBack={this.onBack}
                                                        onAnswer={this.onTestAnswer}
                                    questions={this.state.questions} answersMap={this.state.answersMap} />
                            </div>
                            : null
                        }

                        {isFinished == true ?
                            <div style={this.componentStyle.isFinishedBlock}>
                                {feedback == undefined ?
                                    <div style={{textAlign: 'center'}} >
                                        {this.props.teacherMode == true ?
                                            <div>
                                                Пользователь завершил выполнение этого упражнения.
                                            </div> :
                                            <div>
                                                Вы завершили данное упражнение. Скоро преподаватель его проверит.
                                            </div>
                                        }

                                    </div> :
                                    <div>

                                        <h3 style={{textAlign: 'center'}} >
                                            Комментарий преподавателя
                                        </h3>

                                        <div dangerouslySetInnerHTML={{__html: feedback}}></div>
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                {canFinish == false ? null :
                                    <div style={this.componentStyle.finishBlock}>

                                        <button onClick={this.onFinishQuestionnaire}
                                                className={'ui inverted green button'}>завершить упражнение
                                        </button>

                                    </div>
                                }
                            </div>
                        }

                        {this.props.teacherMode == false ? null :

                            <div>
                                <h3 style={{textAlign: 'center'}} >
                                    Блок преподавателя
                                </h3>

                                {score == undefined ? null :
                                    <TeacherFeedbackCreationBlock feedback={feedback}
                                                                  userId={score.userId} teacherId={this.props.teacherId}
                                                                  mode={'questionnaire'}
                                                                  questionnaireId={score.questionnaireId} onComment={this.onComment} />
                                }


                            </div>

                        }

                    </div>
                }

                <div className={'SelfLoadingQuestionnairePanel ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingQuestionnairePanel;