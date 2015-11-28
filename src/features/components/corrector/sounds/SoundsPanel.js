/**
 * Created by sabir on 25.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SoundsList = require('./SoundsList');
var PatientEditor = require('../../editor/PatientEditor');


var SoundsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            sounds: [
                {name: 'as', descriptiption: '', id: 1,
                    template: 'Слово <b>[word]</b>.' +
                    'Обратите внимание на то, как произносится второй звук в слове <b>[sound]</b>: [url]', url: 'https://vimeo.com/143525304'},

                {name: 'd', descriptiption: '', id: 2,
                    template: 'Слово <b>[word]</b>.  Более отчетливо произносите звук ‘ <b>[sound]</b> ’ в конце этого слова (это не ‘t’!). Посмотрите как правильно: [url]',
                    url: 'https://vimeo.com/143525344'},

                {name: 'h', descriptiption: '', id: 3,
                    template: 'Слово <b>[word]</b>. Звук <b>[sound]</b> произносится с придыханием (не так, как «Х» в русском). Постарайтесь это делать так, как в этом видео [url] . ', url: 'https://vimeo.com/143525303'},

                {name: 'k', descriptiption: '', id: 4,
                    template: 'Слово <b>[word]</b>. Постарайтесь произносить звук  <b>[sound]</b>  так же, как в этих видео. В него нужно вкладывать энергию. [url]', url: 'https://vimeo.com/143525350'},

                {name: 'ŋ', descriptiption: '', id: 5,
                    template: 'Слово <b>[word]</b>. Главное – не произносить заук <b>[sound]</b>, как русское «нк». Придет время, и вы научитесь его произносить правильно. ' +
                    'Смотрите внимательно видео, вслушивайтесь в звуки. [url]', url: 'https://vimeo.com/143525349'},

                {name: 'əv', descriptiption: '', id: 6,
                    template: 'Слово <b>[word]</b>. Не читайте ‘of’, как ‘off’. Это разные слова. ' +
                    'Посмотрите внимательно видео, обращая внимание на ‘of’. [url]', url: 'https://vimeo.com/143525351'},

                {name: 'p', descriptiption: '', id: 7,
                    template: 'Слово <b>[word]</b>. Вы не пытаетесь произнести звук ‘<b>[sound]</b>’ так, как это делают носители языка. ' +
                    'Они вкладывают в него много энергии, поэтому этот звук называют ‘explosive’ (взрывной). ' +
                    'Если вы произносите этот звук правильно, то сможете с помощью него погасить свечку. Посмотрите как правильно: [url]', url: 'https://vimeo.com/145123764'},


                {name: 'ð', descriptiption: '', id: 8,
                    template: 'Слово <b>[word]</b>. У вас не получается произнести звонкий межзубный звук <b>[sound]</b> (ЗЗЗ). ' +
                    'Посмотрите, как это делают носители языка в этом видео. [url]', url: 'https://vimeo.com/143525358'},

                {name: 'θ', descriptiption: '', id: 9,
                    template: 'Слово <b>[word]</b>. У вас не получается произнести глухой ' +
                    'межзубный звук  <b>[sound]</b>  (ЗЗЗ). Посмотрите, как это делают носители ' +
                    'языка в этом видео. [url]',url: 'https://vimeo.com/143525355'},

                {name: 'the', descriptiption: '', id: 10,
                    template: '<b>[word]</b>. ' +
                    'Артикль <b>[sound]</b> произносится как ‘thee’, если за ним следует слово, начинающееся с гласной буквы. ' +
                    'Примеры в этом видео. [url]',
                    url: 'https://vimeo.com/143525352'},

                {name: 'r', descriptiption: '', id: 11,
                    template: 'Cлово <b>[word]</b>. Посмотрите видео и постарайтесь произносить звук ‘<b>[sound]</b>’ так же. [url]', url: 'https://vimeo.com/143525357'},

                {name: 'æ', descriptiption: '', id: 12,
                    template: 'Слово <b>[word]</b>. Здесь звук ‘<b>[sound]</b>’ не похож ни на русское ‘a’, ни на ‘э’. Посмотрите видео. Постарайтесь произносить так же. [url]', url: 'https://vimeo.com/143525342'},
            ]
        }
    },

    getInitialState: function () {
        return {
            content: '',
            selectedSoundId: undefined,
            word: ''

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 630,
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: 'white',
            padding: 5,
            paddingTop: 0,
            border: '1px solid #EFF0F1'
        },

        listPlaceholder: {

        },

        bottomPlaceholder: {
            paddingTop: 10
        },

        editorPlaceholder: {
            textAlign: 'left'
        },

        wordPlaceholder: {

        }
    },

    onSoundClick: function(item){
        console.log(item);
        this.setState({
            selectedSoundId: item.id
        });
    },

    getSelectedSound: function(){
        var id = this.state.selectedSoundId;
        console.log('getSelectedSound occured: id = ', id);
        if (id == undefined){
            return undefined;
        }
        var list = this.props.sounds;
        for (var i in list){
            if (id == list[i].id){
                return list[i];
            }
        }
    },

    onWordChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        //val = val.trim();
        this.setState({
            word: val
        });
    },

    generatePhrase: function(){
        if (this.state.selectedSoundId == undefined){
            return '';
        }
        var sound = this.getSelectedSound();
        var soundS = sound.name;
        console.log('soundS = ' + soundS);
        var word = this.state.word;
        if (word == ''){
            return '';
        }

        var template = sound.template;
        var s = template.replace('[word]', word)
            .replace('[sound]', soundS)
            .replace('[url]', '<a target="_blank" href="' + sound.url + '" >' + sound.url + '</a>');
        s = '<div style="font-size: 14px;">' + s + '</div>';
        return s;
    },

    render: function () {

        var phrase = this.generatePhrase();
        var selectedSound = this.getSelectedSound();
        var inputPlaceholder = 'Введите проблемное слово';
        if (selectedSound != undefined){
            inputPlaceholder = 'Введите проблемное слово со звуком ' + selectedSound.name;
        }
        var word = this.state.word;

        var textareaVisible = ( (selectedSound !=undefined) && (word.trim() != ''));

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>
                    <SoundsList sounds={this.props.sounds} selectedId={this.state.selectedSoundId}
                                onItemClick={this.onSoundClick} />
                </div>

                {this.state.selectedSoundId != undefined ? null :
                    <div style={{textAlign: 'center', margin: 10, marginBottom: 15}}>
                        Выберите звук из списка выше
                    </div>
                }

                <div style={this.componentStyle.wordPlaceholder} className={'ui form'}>
                    <div className="field">
                        <input type="text" value={this.state.word} onChange={this.onWordChange}
                               placeholder={inputPlaceholder} />
                    </div>
                </div>

                {textareaVisible == false ? null :
                    <div style={this.componentStyle.bottomPlaceholder}>
                        <div style={this.componentStyle.editorPlaceholder}>
                            <PatientEditor value={phrase} />
                        </div>
                    </div>
                }


            </div>
        );
    }

});

module.exports = SoundsPanel;