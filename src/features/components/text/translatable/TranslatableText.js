/**
 * Created by sabir on 19.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var WordsList = require('./WordsList');

var TranslateMixin = require('../../../mixins/TranslateMixin');

var TranslateDialog = require('../../translate/TranslateDialog');

var TranslatableText = React.createClass({
    getDefaultProps: function () {
        return {
            text: '',
            fontSize: '18px'
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false,
            selectedWord: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    extractWords: function(text){
        var text = this.props.text;
        if (text == undefined){
            return [];
        }
        return TranslateMixin.extractWords(text);
    },

    onWordClick: function(word){
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

    render: function () {
        var words = this.extractWords();
        console.log('extracted words: ', words);
        var st = assign({}, this.componentStyle.placeholder, {fontSize: this.props.fontSize});

        return (
            <div style={st}>

                <WordsList words={words} onWordClick={this.onWordClick} />

                {this.state.dialogVisible == false ? null :
                    <TranslateDialog text={this.state.selectedWord} onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = TranslatableText;