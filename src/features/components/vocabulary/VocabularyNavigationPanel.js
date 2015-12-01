/**
 * Created by sabir on 28.11.15.
 */

var React = require('react');
var assign = require('object-assign');


var VocabularyNavigationPanel = React.createClass({
    getDefaultProps: function () {
        return {
            idPattern: 'voc_letter_',
            letters: []
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
            margin: '0 auto',
            padding: 5,
            textAlign: 'center'
        },

        letterPlaceholder: {
            display: 'inline-block',
            marginRight: 7,
            marginLeft: 7,
            textAlign: 'center',
            minWidth: 15,
            borderBottom: '2px solid #FC636B',
            color: '#2E3C54',
            fontWeight: 'bold',
            cursor: 'pointer'
        }
    },

    onScrollClick: function(id){
        console.log('onScrollClick: id = ', id);
        var objControl = document.getElementById(id);
        //objControl.scrollTop = objControl.offsetTop;
        objControl.scrollIntoView();
    },

    render: function () {
        var list = this.props.letters;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(a, k){
                    var id = this.props.idPattern + a;
                    var key = 'l_e_' + id;
                    var letter = a.toUpperCase();
                    var onScrollClick = this.onScrollClick.bind(this, id);
                    return (
                        <div key={key} onClick={onScrollClick} style={this.componentStyle.letterPlaceholder}>
                            <span  style={{color: this.componentStyle.letterPlaceholder.color}} >{letter}</span>
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = VocabularyNavigationPanel;