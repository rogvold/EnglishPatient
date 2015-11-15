/**
 * Created by sabir on 07.07.15.
 */

var TeacherDialogManager = function(){
    var self = this;
    this.dialog = undefined;
    this.currentUserManager = new CurrentUserManager();
    this.cards = [];

    this.init = function(){
        initParse();
        enablePreloader();
        self.currentUserManager.init(function(){
            self.loadCurrentDialog(function(){
                self.prepareDialog();
                self.loadCards(function(){
                    disablePreloader();
                    self.initUpdateButton();
                    self.initCreationBlock();
                    self.initCardsNumbers();
                });
            });
        });
    }

    this.loadCurrentDialog = function(callback){
        var q = new Parse.Query(Parse.Object.extend('PatientDialog'));
        var id = gup('id');
        q.get(id, {
            success: function(d){
                self.dialog = d;
                callback();
            },
            error: function(e){
                toastr.error(e.message);
            }
        });
    }

    this.prepareDialog = function(){
        var d = self.dialog;
        $('#dialogName').html(d.get('name'));

    }

    this.loadCards = function(callback){
        var q = new Parse.Query(Parse.Object.extend('ExerciseCard'));
        q.equalTo('dialogId', self.dialog.id);
        q.addAscending('number');
        q.limit(1000);
        q.find(function(cards){
            self.cards = cards;
            callback();
        });
    }

    this.prepareCardItems = function(){
        var list = self.cards;
        var s = '';
        for (var i in list){
            var c = list[i];
        }
    }

    this.initCardsNumbers = function(){
        var s = '';
        var list = self.cards;
        for (var i in list){
            s+='<li class="cardNumber" data-id="' + list[i].id + '" >' +
                '<a href="javascript: void(0);">' + (+i + 1) + '</a>' +
                '</li>';
        }
        $('#exercisesNumbersBlock').html(s);
        $('.cardNumber').bind('click', function(){
            $('.cardNumber').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            self.selectedCard = self.getCardById(id);
            console.log('selectedCard = ');
            console.log(self.selectedCard);
            $('.mediaMaterial').hide();
            self.prepareSelectedCard();
        });
        $('#deleteButton').bind('click', function(){
            self.selectedCard.destroy({
                success: function(){
                    window.location.href = window.location.href;
                }
            });
        });
        $('.cardNumber:first').click();
    }

    this.prepareSelectedCard = function(){
        console.log('prepareSelectedCard occured, selected card = ', self.selectedCard);
        $('#deleteButton').addClass('hide');
        var s = '';
        $('#commentText').html(self.selectedCard.get('comment'));
        $('#transcriptText').html(self.selectedCard.get('transcript'));
        var materials = self.selectedCard.get('materials');
        materials = materials.map(function(m){return self.extractMaterial(m)});
        console.log('materials = ', materials);
        for (var i in materials){
            var m = materials[i];
            m.prepareHtml();
        }
        if (self.selectedCard.id == $('.cardNumber:last').attr('data-id')){
            $('#deleteButton').removeClass('hide');
        }
        $('#updateBlock').removeClass('hide');
        self.clearUpdateForm();
        self.prepareUpdatingBlockByMaterials(materials);
    }

    this.prepareUpdatingBlockByMaterials = function(materials){
        console.log('prepareUpdatingBlockByMaterials occured: materials = ', materials);
        for (var i in materials){
            var m = materials[i];
            if (m.materialType == 'audio'){
                $('#editAudioUrl').val(m.audioUrl);
            }

            if (m.materialType == 'image'){
                $('#editImg').val(m.imageUrl);
            }
        }
        $('#editTranscript').val(self.selectedCard.get('transcript'));
        $('#editHint').val(self.selectedCard.get('hint'));
    }

    this.initCreationBlock = function(){
        $('#createButton').bind('click', function(){
            var materials = self.getMaterialsByCreationForm();

            var Card = Parse.Object.extend('ExerciseCard');
            var card = new Card();
            card.set('dialogId', self.dialog.id);
            card.set('number', self.cards.length);
            card.set('materials', materials);
            card.set('transcript', $('#transcript').val().trim());
            card.set('hint', $('#hint').val().trim());

            //card.set('comment', comment);
            //card.set('transcript', transcript);

            enablePreloader();
            card.save().then(function(){
                window.location.href = window.location.href;
            });
        });
    }

    this.getMaterialsByCreationForm = function(){
        var materials = [];

        var imageUrl = $('#imageUrl').val().trim();
        if (imageUrl != undefined && imageUrl != ''){
            materials.push({
                materialType: 'image',
                imageUrl: imageUrl
            });
        }

        var audioUrl = $('#audioUrl').val().trim();
        if (audioUrl != undefined && audioUrl != ''){
            materials.push({
                materialType: 'audio',
                audioUrl: audioUrl
            });
        }

        console.log('materials = ');
        console.log(materials);
        return materials;
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

    this.clearUpdateForm = function(){
        $('#editImg').val('');
        $('#editAudioUrl').val('');
    }

    this.getCardById = function(id){
        var list = self.cards;
        if (id == undefined){
            return undefined;
        }
        for (var i in list){
            if (list[i].id == id){
                return list[i];
            }
        }
        return undefined;
    }

    this.initUpdateButton = function(){
        $('#updateButton').bind('click', function(){
            console.log('selectedCard = ', self.selectedCard);
            var materials = self.selectedCard.get('materials');
            for (var i in materials){
                var m = materials[i];
                if (m.materialType == 'audio'){
                    m.audioUrl = $('#editAudioUrl').val();
                }
                if (m.materialType == 'image'){
                    m.imageUrl = $('#editImg').val();
                }
                materials[i] = m;
            }
            self.selectedCard.set('materials', materials);
            self.selectedCard.set('transcript', $('#editTranscript').val());
            self.selectedCard.set('hint', $('#editHint').val());
            enablePreloader();
            self.selectedCard.save().then(function(){
                //console.log();
                disablePreloader();
                alert('card saved');
                //toastr.info('updated!');
                $('#editModal').modal('hide');
                window.location.href = window.location.href;
            });
        });
    }

}