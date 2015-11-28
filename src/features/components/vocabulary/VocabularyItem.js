/**
 * Created by sabir on 27.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var VocabularyItem = React.createClass({
    getDefaultProps: function () {
        return {
            word: undefined,
            backgroundColor: 'grey',
            style: {
                backgroundImage: 'url("http://beta.englishpatient.org/img/pablo.jpg")',
                width: 140,
                minHeight: 140,

                marginRight: 8,
                marginBottom: 8,
                marginTop: 8,
                marginLeft: 8,
                wordBreak: 'break-all'
            },

            onItemClick: function(){

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
        placeholder: {
            borderRadius: 4,
            display: 'inline-block',
            padding: 5,
            color: 'white',
            fontSize: 18,
            backgroundColor: 'grey',
            textAlign: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            cursor: 'pointer',
            boxSizing: 'border-box',
            verticalAlign: 'bottom'
        },

        inner: {
            verticalAlign: 'center',
            paddingTop: 40
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        return (
            <div style={st} onClick={this.props.onItemClick} >
                <div style={this.componentStyle.inner}>
                    {this.props.word}
                </div>
            </div>
        );
    }

});

module.exports = VocabularyItem;