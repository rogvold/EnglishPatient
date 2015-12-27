/**
 * Created by sabir on 24.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var QuestionnaireMixin = require('../../../../mixins/QuestionnaireMixin');

var QuestionnaireSearchList = require('./QuestionnaireSearchList');

var SelfLoadingQuestionnaireSearchList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,

            onSelect: function(q){
                console.log('SelfLoadingQuestionnaireSearchList: q = ', q);
            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            questionnaires: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    load: function(){
        var teacherId = this.props.teacherId;
        if (teacherId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        QuestionnaireMixin.loadTeacherQuestionnaires(teacherId, function(questionnaires){
            this.setState({
                questionnaires: questionnaires,
                loading: false
            });
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        },

        list: {

        }
    },

    onSelect: function(q){
        this.props.onSelect(q);
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.list}>
                    <QuestionnaireSearchList userId={this.props.teacherId}
                                             onSelect={this.onSelect}
                                             questionnaires={this.state.questionnaires} />
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>


            </div>
        );
    }

});

module.exports = SelfLoadingQuestionnaireSearchList;