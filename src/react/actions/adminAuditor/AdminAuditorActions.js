/**
 * Created by sabir on 26.08.15.
 */

var constants = require('../../../js/Constants');


var AdminAuditorActions = {
    exerciseClick: function(exerciseId){
        this.dispatch(constants.ADMIN_AUDITOR_EXERCISE_CLICKED, {exerciseId: exerciseId});
    },
    loadAllExercises: function(userId){
        this.dispatch(constants.ADMIN_LOAD_ALL_AUDITOR_EXERCISES, {userId: userId});
    }
}

module.exports = AdminAuditorActions;