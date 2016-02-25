/**
 * Created by sabir on 22.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../../dialog_exercise/card/DialogCard');

var QuestionnaireMixin = require('../../../mixins/QuestionnaireMixin');

var SelfLoadingQuestionnairePanel = require('./view/SelfLoadingQuestionnairePanel');

var ShareButton = require('../../share/buttons/ShareButton');

var QuestionnaireViewPanel = React.createClass({
    getDefaultProps: function () {
        return {
            questionnaireId: undefined,
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            name: undefined,
            avatar: undefined,
            description: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            width: 850,
            padding: 5
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 240,
            borderRight: '1px solid #EFF0F1'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 590
        },

        cardPlaceholder: {
            width: '100%',
            height: 160
        },

        infoPlaceholder: {
            marginTop: 5
        }
    },

    load: function(){
        var id = this.props.questionnaireId;
        if (id == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        QuestionnaireMixin.loadQuestionnaire(id, function(q){
            this.setState({
                loading: false,
                name: q.name,
                avatar: q.avatar,
                description: q.description
            });
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>
                    <div style={this.componentStyle.cardPlaceholder}>
                        <DialogCard avatar={this.state.avatar} name={this.state.name} />
                    </div>

                    <div style={this.componentStyle.infoPlaceholder}>
                        {this.state.description}
                    </div>

                    <div style={{marginTop: 20, textAlign: 'center'}} >
                        <ShareButton name={'questionnaire'}
                                     buttonName={'Поделиться опросником'}
                                     buttonClassName={'ui button mini patientPrimary'}
                                     objectId={this.props.questionnaireId} />
                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <SelfLoadingQuestionnairePanel
                        userId={this.props.userId}
                        questionnaireId={this.props.questionnaireId} />


                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = QuestionnaireViewPanel;