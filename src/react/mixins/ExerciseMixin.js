/**
 * Created by sabir on 26.08.15.
 */

var ExerciseMixin = {
    getMediaObjectFromCard: function(exerciseCard){
        var list = exerciseCard.get('materials');
        var x = {};
        for (var i in list){
            var m = list[i];
            if (m.materialType == 'video'){
                x.vimeoId = m.vimeoId
            }
            if (m.materialType == 'image'){
                x.imgSrc = m.imageUrl
            }
            if (m.materialType == 'text'){
                x.text = m.text
            }
            if (m.materialType == 'audio'){
                x.audioUrl = m.audioUrl
            }
        }
        return x;

    }
}

module.exports = ExerciseMixin;