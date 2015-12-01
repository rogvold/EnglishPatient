/**
 * Created by sabir on 19.11.15.
 */
var React = require('react');
var assign = require('object-assign');

var WordItem = require('./WordItem');

var WordsList = React.createClass({
    getDefaultProps: function () {
        return {
            words: [],
            onWordClick: function(word){
                console.log('default: onWordClick occured: ', word);
            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    onWordClick: function(word){
        this.props.onWordClick(word);
    },

    render: function () {
        var list = this.props.words;
        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(item, k){
                    var key = 'word_' + k + 'item';
                    var word = item;
                    return (
                        <WordItem key={key} onWordClick={this.onWordClick} word={word} />
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = WordsList;