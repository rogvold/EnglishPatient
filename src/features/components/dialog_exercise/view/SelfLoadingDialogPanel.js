/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogMixin = require('../../../mixins/DialogMixin');
var DialogReplicsPanel = require('./DialogReplicsPanel');

var DialogPreparePanel = require('./DialogPreparePanel');

var DialogTaskPanel = require('./DialogTaskPanel');

var TeacherFeedbackCreationBlock = require('../../teacher/TeacherFeedbackCreationBlock');


var SelfLoadingDialogPanel = React.createClass({
    getDefaultProps: function () {
        return {
            dialogId: undefined,
            userId: undefined,

            teacherId: undefined,

            teacherMode: false,

            onDialogFinished: function(dialogId, userId){

            }
        }
    },

    getInitialState: function () {
        return {
            cards: [],
            userId: undefined,
            dialog: {},
            score: undefined,
            loading: false,
            mode: 'prepare',
            roleNumber: 0,
            answersMap: {}

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            width: 610,
            margin: '0 auto'
        },

        finishBlock: {
            padding: 10,
            textAlign: 'center'
        },

        isFinishedBlock: {
            //textAlign: 'center',
            marginTop: 10,
            marginBottom: 10
        }
    },

    load: function(){
        var dialogId = this.props.dialogId;
        var userId = this.props.userId;
        if (dialogId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        var self = this;
        DialogMixin.loadDialog(dialogId, function(dialog){
            DialogMixin.loadAnswersMap(dialogId, userId, function(answersMap){
                DialogMixin.loadUserDialogScore(userId, dialogId, function(score){
                    self.setState({
                        answersMap: answersMap,
                        dialog: dialog,
                        cards: dialog.cards,
                        score: score,
                        loading: false
                    });
                });
            });

        }.bind(this));
    },

    switchMode: function(){
        var mode = 'exercise';
        if (this.state.mode == 'exercise'){
            mode = 'prepare';
        }
        this.setState({
            mode: mode
        });
    },

    onRoleSelect: function(number){
        this.setState({
            mode: 'exercise',
            roleNumber: number
        });
    },

    onGoBack: function(){
        this.setState({
            mode: 'prepare'
        });
    },

    onAnswer: function(cardId, url){
        this.setState({
            loading: true
        });
        var map = this.state.answersMap;
        DialogMixin.saveUserAnswer(cardId, url, function(a){
            map[a.cardId] = a;
            this.setState({
                answersMap: map,
                loading: false
            });
        }.bind(this));
    },

    isFinished: function(){
        var score = this.state.score;
        if (score == undefined){
            return false;
        }
        if (score.status == 'new'){
            return false;
        }
        return true;
    },

    canFinish: function(){
        console.log('canFinish() occured: ');
        var roleNumber = this.state.roleNumber;
        var isFinished = this.isFinished();
        if (isFinished == true){
            return false;
        }
        var map = this.state.answersMap;
        var cards = this.state.cards;
        var f1 = true;

        console.log('map = ', map);
        console.log('cards = ', cards);

        var dn = ((roleNumber + 1) % 2);
        for (var i = 0 + dn ; i < cards.length; i = i + 2){
            if (map[cards[i].id] == undefined){
                f1 = false;
            }
        }
        var f2 = true;
        dn = ((dn + 1) % 2);
        for (var i = 0 + dn ; i < cards.length; i = i + 2){
            if (map[cards[i].id] == undefined){
                f2 = false;
            }
        }
        var f = (f1 || f2)

        return f;
    },

    onFinishExercise: function(){
        var userId = this.props.userId;
        var dialogId = this.props.dialogId;
        this.setState({
            loading: true
        });
        DialogMixin.finishDialog(userId, dialogId, function(score){
            this.setState({
                score: score,
                loading: false
            });
            this.onDialogFinished(dialogId, userId);
        }.bind(this));
    },

    getFeedback: function(){
        var score = this.state.score;
        if (score == undefined){
            return undefined;
        }
        var feedback = score.feedback;
        if (feedback == undefined || feedback.trim() == ''){
            return undefined;
        }
        return feedback;
    },

    onComment: function(score){
        console.log('teacher commented student: score = ', score);
        this.load();
    },

    onDialogFinished: function(dialogId, userId){
        this.props.onDialogFinished(dialogId, userId);
    },

    render: function () {
        var dialog = (this.state.dialog == undefined) ? {} : this.state.dialog;
        var cards = this.state.cards;
        var canFinish = this.canFinish();
        var isFinished = this.isFinished();
        var feedback = this.getFeedback();
        var score = (this.state.score == undefined) ? {} : this.state.score;

        console.log('rednering SelfLoadingDialogPanel: canFinish = ', canFinish);

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.teacherMode == true ?
                    <div>
                        <DialogTaskPanel dialog={dialog}
                                         answersMap={this.state.answersMap}
                                         teacherMode={true}
                                         cards={cards} />
                    </div>
                    :
                    <div>
                        {this.state.mode == 'prepare' ?
                            <DialogPreparePanel
                                onRoleSelect={this.onRoleSelect}
                                dialog={dialog} cards={cards} />
                            :
                            <div>
                                <DialogTaskPanel dialog={dialog}
                                                 onGoBack={this.onGoBack}
                                                 onAnswer={this.onAnswer}
                                                 answersMap={this.state.answersMap}
                                                 teacherMode={false}
                                                 roleNumber={this.state.roleNumber} cards={cards} />
                            </div>
                        }
                    </div>
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

                                <button onClick={this.onFinishExercise}
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

                        <TeacherFeedbackCreationBlock feedback={feedback}
                                                      userId={score.userId} teacherId={this.props.teacherId}
                                                      mode={'dialog'}
                                                      dialogId={score.dialogId} onComment={this.onComment} />

                    </div>

                }



                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate loader"></div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingDialogPanel;