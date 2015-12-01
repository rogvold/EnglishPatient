/**
 * Created by sabir on 27.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopicDialog = require('../topics/dialog/TopicDialog');

var VocabularyItemsList = require('./VocabularyItemsList');

var VocabularyMixin = require('../../mixins/VocabularyMixin');

var TranslatePanel = require('../translate/panel/TranslatePanel');

var CardsList = require('../material/list/CardsList');

var VocabularyNavigationPanel = require('./VocabularyNavigationPanel');

var VocabularyPanel = React.createClass({
    getDefaultProps: function () {
        return {
            searchInputVisible: true
        }
    },

    getInitialState: function () {
        return {
            words: [],
            searchWords: [],
            loading: false,
            text: '',
            dialogVisible: false,
            selectedWord: undefined

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(function(words){
            console.log('words loaded: ', words);
        });
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            margin: '0 auto',
            width: 782,
            marginTop: 10,
            paddingTop: 10,
            borderRadius: 4
        },

        wordsPlaceholder: {

        },

        topWordPanel: {
            textAlign: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            paddingTop: 40,
            fontSize: 24,
            color: 'white',
            height: 120,
            backgroundImage: 'url("http://beta.englishpatient.org/img/pablo.jpg")'
        },

        wordContent: {
            width: 890,
            margin: '0 auto',
            marginTop: 10
        },

        wordLeftContent: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 440
        },

        wordRightContent: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 450,
            paddingLeft: 5
        },

        inputBlock: {
            paddingLeft: 10,
            paddingRight: 10
        },


        letterPlaceholder: {
            height: 50,
            lineHeight: '40px',
            fontSize: 40,
            padding: 10,
            color: '#2E3C54'
        },

        letterSection: {
            borderTop: '1px solid #EFF0F1'
        },

        navigationPlaceholder: {

        }

    },

    load: function(callback){
        this.setState({
            loading: true
        });
        VocabularyMixin.loadWords(function(words){
            //console.log('loaded words: ', words);
            //console.log('words.length = ', words.length);
            this.setState({
                loading: false,
                words: words,
                searchWords: words
            });
            if (callback != undefined){
                callback(words);
            }
        }.bind(this));
    },

    onItemClick: function(word){
        this.setState({
            selectedWord: word,
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    getSelectedMaterials: function(){
        var list = this.state.words;
        for (var i in list){
            if (list[i].name == this.state.selectedWord){
                return list[i].materials;
            }
        }
        return [];
    },

    search: function(text){
        if (text == undefined || text.trim() == ''){
            this.setState({
                searchWords: this.state.words,
                text: text
            });
            return;
        }
        var arr = [];
        var list = this.state.words;
        text = text.toLowerCase();
        for (var i in list){
            var w = list[i];
            if (w.name.toLowerCase().indexOf(text) > -1){
                arr.push(w);
            }
        }
        this.setState({
            searchWords: arr,
            text: text
        });
    },

    onTextChange: function(evt){
        var text = evt.target.value;
        if (text == undefined){
            text = '';
        }
        this.search(text);
    },

    getDialogContent: function(){
        var materials = this.getSelectedMaterials();

        return (
            <div>

                <div style={this.componentStyle.topWordPanel}>
                    {this.state.selectedWord}
                </div>

                <div style={this.componentStyle.wordContent}>

                   <div style={this.componentStyle.wordLeftContent}>
                        <TranslatePanel text={this.state.selectedWord} searchInputVisible={true} />
                   </div>

                    <div style={this.componentStyle.wordRightContent}>

                        <CardsList cards={materials} />

                    </div>

                </div>


            </div>
        );
    },

    render: function () {
        var wordsList = this.state.searchWords.map(function(w){ return w.name});

        var lettersList = VocabularyMixin.getAlphabetList(this.state.searchWords);
        var letters = lettersList.map(function(l){return l.letter;});

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.searchInputVisible == false ? null :
                    <div style={this.componentStyle.inputBlock}>
                        <div className={'ui form'} >
                            <div className="ui input">
                                <input type="text" placeholder={'Поиск ...'}
                                       value={this.state.text} onChange={this.onTextChange}  />
                            </div>
                        </div>
                    </div>
                }

                <div style={this.componentStyle.wordsPlaceholder}>

                    {wordsList.length == 0 ?

                        <div style={{padding: 10}} >
                            По запросу "<b>{this.state.text}</b>" ничего не найдено
                        </div>
                        :
                        <div>

                            <div style={this.componentStyle.navigationPlaceholder}>
                                <VocabularyNavigationPanel letters={letters} />
                            </div>

                            {lettersList.map(function(letter, k){
                                var wordsList = letter.words.map(function(w){return w.name});
                                var key = 'word_' + k + '_' + letter.letter;
                                var l = letter.letter.toUpperCase();
                                var sectionStyle = assign({}, this.componentStyle.letterSection);
                                if (k == 0){
                                    sectionStyle = assign(sectionStyle, {border: 'none'});
                                }
                                var letterId = 'voc_letter_' + letter.letter;
                                return (
                                    <div key={key} style={sectionStyle} >
                                        <div id={letterId} style={this.componentStyle.letterPlaceholder}>
                                            {l}
                                        </div>
                                        <div>
                                            <VocabularyItemsList onItemClick={this.onItemClick} words={wordsList} />
                                        </div>
                                    </div>
                                );
                            }, this)}
                        </div>


                    }


                </div>

                {this.state.dialogVisible == false ? null :
                    <div>
                        <TopicDialog onClose={this.onClose}
                            content={this.getDialogContent()} />
                    </div>
                }


                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>




            </div>
        );
    }

});

module.exports = VocabularyPanel;