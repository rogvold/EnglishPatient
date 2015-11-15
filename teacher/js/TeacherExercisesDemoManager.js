/**
 * Created by sabir on 14.04.15.
 */

var TeacherExerciseDemoManager = function(){
    var self = this;
    this.exerciseId = undefined;
    this.exerciseModalId = 'demoExerciseModal';
    this.demoExerciseIframePlaceholderDivId = 'demoExerciseIframePlaceholder';
    this.demoExerciseIframeId = 'demoExerciseIframe';

    this.showExercise = function(exId){
        self.exerciseId = exId;
        self.prepareModal();
    }

    this.prepareModal = function(){
        var s = '';
        var iframeSrc = 'http://beta.englishpatient.org/student/auditorExercise.html?id=' + self.exerciseId + '&guest=1';
        //$('#' + self.demoExerciseIframeId).attr('src', iframeSrc);
        $('#' + self.demoExerciseIframePlaceholderDivId).html('<iframe id="' + self.demoExerciseIframeId + '" src="' + iframeSrc + '" />');
        $('#' + self.exerciseModalId).modal();
    }



}