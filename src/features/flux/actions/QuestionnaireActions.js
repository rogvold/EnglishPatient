/**
 * Created by sabir on 16.02.16.
 */

var constants = require('../constants');

var LoginMixin = require('../../mixins/LoginMixin');

var QuestionnaireMixin = require('../../mixins/QuestionnaireMixin');

var QuestionnaireActions = {

    loadQuestionnaire: function(qId){
        this.dispatch(constants.LOAD_QUESTIONNAIRE, {questionnaireId: qId});
        QuestionnaireMixin.loadQuestionnaire(qId, function(q){
            this.dispatch(constants.LOAD_QUESTIONNAIRE_SUCCESS, {questionnaire: q});
        }.bind(this));
    }

};

module.exports = QuestionnaireActions;