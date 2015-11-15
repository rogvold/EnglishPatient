/**
 * Created by sabir on 15.11.14.
 * dependencies: https://www.webrtc-experiment.com/RecordRTC.js
 *
 */

var RecordManager = function(){
    var self = this;
    this.serverBaseUrl = 'http://beta.englishpatient.org/audio/';
    this.formData = undefined;
    this.sampleRate = 30000;
    this.stream = undefined;

    this.fileType = 'audio';
    this.saveButton = undefined;
    this.saveButtonId = 'saveButtonId';
    this.blob = undefined;
    this.fileName = undefined;
    this.audio = undefined;
    this.audioId = 'audioId';
    this.recordButton = undefined;
    this.recordButtonId = 'recordButtonId';
    this.stopButton = undefined;
    this.stopButtonId = 'stopButtonId';

    this.recordAndStopButtonId = 'recordAndStopButtonId';
    this.recordAndStopButton = undefined;

    this.progress = undefined;
    this.progressId = 'progressId';
    this.recordAudio = undefined;
    this.blob = undefined;
    this.savedRecordCallback = function(fName){console.log('--> recording finished', fName);}
    this.startedRecordCallback = function(){console.log('--> startedRecordCallback...');}
    this.stoppedRecordCallback = function(){console.log('--> stoppedRecordCallback...');}
    this.startingSavingCallback = function(){console.log('--> startingSavingCallback...');}
    this.startingLoadingCallback = function(){console.log('--> startingLoadingCallback... ');}
    this.finishedLoadingCallback = function(){console.log('--> finishedLoadingCallback... ');}
    this.onProgressCallback = function(percentage, value, total){ console.log(percentage, value, total);}

    this.init = function(){
        console.log('Record Manager init occured');
        self.initRecorder();
    }

    this.initRecorder = function(){
        self.audio = document.getElementById(self.audioId);
        self.recordButton = document.getElementById(self.recordButtonId);
        self.stopButton = document.getElementById(self.stopButtonId);
        self.stopButton.disabled = true;
        self.saveButton = document.getElementById(self.saveButtonId);
        self.saveButton.disabled = true;
        self.progress = document.getElementById(self.progressId);
        self.initRecordButton();
        self.initStopButton();
        self.initSaveButton();
        self.initRecordAndStopButton();

    }

    this.initSaveButton = function(){
        self.saveButton.onclick = function(){
            self.saveRecording();
        };
    }

    this.saveRecording = function(){
        self.stopButton.disabled = true;
        self.recordButton.disabled = true;
        self.saveButton.disabled = true;

        //self.stopButton.style.display = 'none';
        //self.recordButton.style.display = 'none';

        self.formData = new FormData();
        self.formData.append(self.fileType + '-filename', self.fileName);
        self.formData.append(self.fileType + '-blob', self.blob);
        self.startingSavingCallback();
        self.xhr(self.serverBaseUrl + 'save.php', self.formData, function (fName) {
            self.recordButton.disabled = false;
            self.savedRecordCallback(self.serverBaseUrl + '' + fName);
        });
    }

    this.xhr = function(url, data, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.responseText);
            }
        };

        request.upload.onloadstart = function() {
            self.startingLoadingCallback();
        };

        request.upload.onprogress = function(event) {
            self.progress.style.display = 'block';
            self.progress.max = event.total;
            self.progress.value = event.loaded;
            self.onProgressCallback(Math.round(event.loaded / event.total * 100), event.loaded, event.total)
        };

        request.upload.onload = function() {
            self.progress.style.display = 'none';
            self.finishedLoadingCallback();
        };

        request.open('POST', url);
        request.send(data);
    }


    this.initRecordButton = function(){
        self.recordButton.onclick = function(){
            self.startRecording();
        }
    }

    this.startRecording = function(){
        console.log('start recording occured');
        self.recordButton.disabled = true;
        self.saveButton.disabled = true;
        console.log('record button disabled and save button disabled');

        if (self.stream == undefined){
            console.log('stream is undefined');
            window.navigator.getUserMedia({
                audio: true,
                video: false
            }, function(stream) {
                self.stream = stream;
                self.recordAudio = RecordRTC(stream, {
                    onAudioProcessStarted: function() {
                        self.startedRecordCallback();
                    }
                });
                self.recordAudio.startRecording();
                self.stopButton.disabled = false;
            }, function(error) {
                alert( JSON.stringify (error, null, '\t') );
            });
        }else{
            self.recordAudio.startRecording();
            self.stopButton.disabled = false;
        }
    }

    this.initStopButton = function(){
        self.stopButton.onclick = function(){
            console.log('stopButton: onclick fired');
            self.stopRecording();
        }
    }

    this.stopRecording = function(){
        console.log('stopRecording occured');
        self.recordButton.disabled = false;
        self.stopButton.disabled = true;
        console.log('stop button disabled');
        self.fileName = (new Date().getTime()) + '' + Math.round(Math.random() * 9999) + 9999 + '.wav';

        //$('#recordAndStopButtonId').html('Record');

        self.recordAudio.stopRecording(function(url) {
            console.log('stopRecording callback fired: url = ', url);
            self.blob = self.recordAudio.getBlob();
            self.saveButton.disabled = false;
            self.audio.src = url;
            self.stoppedRecordCallback();
            $('#' + self.recordAndStopButtonId).html('record');
        });
    }


    this.initRecordAndStopButton = function(){
        $('#' + self.recordAndStopButtonId).bind('click', function(){
            console.log('RECORD_AND_STOP_BUTTON_CLICKED');
            var canRecord = $('#' + self.stopButtonId).is(':disabled');
            console.log('stop button: ', $('#' + self.stopButtonId));
            console.log('can record = ' + canRecord);
            if (canRecord == true){
                $('#' + self.recordButtonId).click();
                console.log('clicked on record button');
                $('#' + self.recordAndStopButtonId).html('stop');
            }else{
                $('#' + self.stopButtonId).click();
                console.log('clicked on stop button');
                $('#' + self.recordAndStopButtonId).html('record');
            }
        });
    }




}