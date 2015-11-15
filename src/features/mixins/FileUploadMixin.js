/**
 * Created by sabir on 20.09.15.
 */

var FileUploadMixin = {

    uploadAudio: function(url, formData, uploadedCallback, onLoadStartCallback, onProgressCallback){
        var request = new XMLHttpRequest();
        request.uploadedCallback = function() {
            if (request.readyState == 4 && request.status == 200) {
                uploadedCallback(request.responseText);
            }
        };

        request.upload.onloadstart = function() {
            onLoadStartCallback();
        };

        request.upload.onprogress = function(event) {
            onProgressCallback(Math.round(event.loaded / event.total * 100), event.loaded, event.total)
        };

        request.upload.onload = function() {
            uploadedCallback();
        };

        request.open('POST', url);
        request.send(formData);
    },

    uploadFile: function(url, formData, uploadedCallback, onLoadStartCallback, onProgressCallback){

    }

}

module.exports = FileUploadMixin;