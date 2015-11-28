/**
 * Created by sabir on 19.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TranslateMixin = require('../../../mixins/TranslateMixin');

var WordItem = React.createClass({
    getDefaultProps: function () {
        return {
            word: 'test',
            onWordClick: function(word){

            }
        }
    },

    getInitialState: function () {
        return {
            hover: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    clearWord: function(w){
        var word = w;
        if (word == undefined){
            return undefined;
        }
        word = word.replace(/[0-9]/g, '');
        word = word.replace(/[;\\.\\!\\?]/g, '');
        //word = word.replace(/,/g, '');
        return word;
    },

    isWord: function(w){
        var word = this.clearWord(w);
        if (word == undefined || word.trim() == ''){
            return false;
        }
        if (TranslateMixin.isEnglish(w) == false){
            return false;
        }
        return true;
    },

    onMouseOver: function(){
        var word = this.props.word;
        word = this.clearWord(word);
        if (this.isWord(word) == false){
            return;
        }

        if (this.state.hover == true){
            return;
        }

        this.setState({
            hover: true
        });
    },

    onMouseLeave: function(){
        this.setState({
            hover: false
        });
    },


    componentStyle: {
        placeholder: {
            display: 'inline-block',
            marginLeft: 5
        },

        hover: {
            //backgroundColor: 'yellow'
            backgroundColor: '#FDA9AD'
            //border: '1px solid #EFF0F1'
            //paddingLeft: 3,
            //paddingRight: 3
        }
    },

    onWordClick: function(){
        var word = this.props.word;

        word = this.clearWord(word);
        if (this.isWord(word) == false){
            return;
        }
        this.props.onWordClick(word);
    },

    render: function () {
        var isWord = this.isWord(this.props.word);
        var st = assign({}, this.componentStyle.placeholder);

        if (this.state.hover == true){
            st = assign(st, this.componentStyle.hover);
        }
        if (isWord == true){
            st = assign(st, {cursor: 'pointer'});
        }

        return (
            <div style={st}
                 onClick={this.onWordClick}
                 onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} >
                {this.props.word}
            </div>
        );
    }

});

module.exports = WordItem;