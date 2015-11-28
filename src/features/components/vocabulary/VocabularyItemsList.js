/**
 * Created by sabir on 27.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var VocabuleryItem = require('./VocabularyItem');



var VocabularyItemsList = React.createClass({
    getDefaultProps: function () {
        return {
            words: [],
            onItemClick: function(word){
                console.log('default: onItemClick: word = ', word);
            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            //textAlign: 'center'
        }
    },

    onItemClick: function(word){
        this.props.onItemClick(word);
    },

    render: function () {
        var list = this.props.words;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(word, k){
                    var key = 'voc_' + k + '_' + word;
                    var onClick = this.onItemClick.bind(this, word);
                    return (
                        <VocabuleryItem onItemClick={onClick} word={word} key={key} />
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = VocabularyItemsList;