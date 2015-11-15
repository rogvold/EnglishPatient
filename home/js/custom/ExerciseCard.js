/**
 * Created by sabir on 04.11.14.
 */

var ExerciseCard = function(materials){
    var self = this;
    this.mediaMaterials = (materials == undefined) ? [] : materials;
    this.materials = [];

    this.init = function(materials){
        self.mediaMaterials = materials;
    }

    this.prepareHtml = function(){
        var list = self.mediaMaterials;
        for (var i in list){
            var m = list[i];
            m.prepareHtml();
        }
    }

    this.getAdminHtml = function(){
        var arr = [];
        for (var i in self.mediaMaterials){
            arr.push(self.extractMaterial(self.mediaMaterials[i]));
        }
        self.materials = arr;
        var s = '';
        for (var i in arr){
            s+=arr[i].getSimpleHtml();
        }

         return s;
    }

    this.extractMaterial = function(data){
        if (data == undefined){
            return undefined;
        }
        if (data.materialType == 'video'){
            return (new VideoMaterial(data.vimeoId));
        }
        if (data.materialType == 'audio'){
            return (new AudioMaterial(data.audioUrl));
        }
        if (data.materialType == 'image'){
            return (new ImageMaterial(data.imageUrl));
        }
        if (data.materialType == 'text'){
            return (new TextMaterial(data.text));
        }
        return undefined;
    }



}