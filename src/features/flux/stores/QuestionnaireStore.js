/**
 * Created by sabir on 16.02.16.
 */


var Fluxxor = require('fluxxor');
var constants = require('../constants');

var QuestionnaireStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.questionnairesMap = {};

        this.bindActions(
            constants.LOAD_QUESTIONNAIRE, this.loadQuestionnaire,
            constants.LOAD_QUESTIONNAIRE_SUCCESS, this.loadedQuestionnaire
        );
    },

    consumeQuestionnaires: function(questionnaires){
        var list = questionnaires;
        if (list == undefined || list.length == 0){
            return;
        }
        var map = this.questionnairesMap;
        for (var i in list){
            map[list[i].id] = list[i];
        }
        this.questionnairesMap = map;
    },

    loadQuestionnaire: function(){
        this.loading = true;
        this.emit('change');
    },

    loadedQuestionnaire: function(payload){
        var questionnaire = payload.questionnaire;
        this.loading = false;
        if (questionnaire == undefined){
            this.emit('change');
            return;
        }
        this.consumeQuestionnaires([questionnaire]);
        this.emit('change');
    },

    getQuestionnaire: function(id){
        return this.questionnairesMap[id];
    }


});

module.exports = QuestionnaireStore;