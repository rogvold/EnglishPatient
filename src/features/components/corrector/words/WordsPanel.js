/**
 * Created by sabir on 25.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var PatientEditor = require('../../editor/PatientEditor');

var WordsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            template: 'Вы неправильно произносите слово <b>[word]</b>. Посмотрите как правильно: [url] '
        }
    },

    getInitialState: function () {
        return {
            word: ''
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },


    onWordChange: function(evt){
        var val = evt.target.value;
        if (val == undefined){
            val = '';
        }
        val = val.trim();
        this.setState({
            word: val
        });
    },


    componentStyle: {
        placeholder: {
            width: 630,
            margin: '0 auto',
            backgroundColor: 'white',
            padding: 5,
            paddingTop: 0,
            border: '1px solid #EFF0F1',
            paddingTop: 20

        },

        wordPlaceholder:{

        },

        bottomPlaceholder: {
            paddingTop: 10
        },

        editorPlaceholder: {
            textAlign: 'left'
        },

    },

    generatePhrase: function(){
        var template = this.props.template;
        var word = this.state.word;
        var url = 'http://dictionary.cambridge.org/pronunciation/english/' + word.trim();
        var s = template
            .replace('[word]', '<b>' + word + '</b>')
            .replace('[url]', '<a target="_blank" href="' + url + '" >' + url + '</a>');
        return s;
    },

    render: function () {

        var word = this.state.word;
        var textareaVisible = (word.trim() != '');

        var phrase = this.generatePhrase();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.wordPlaceholder} className={'ui form'}>
                    <label>Введите слово, которое неправильно произнесено</label>
                    <div className="field">
                        <input type="text" value={this.state.word} onChange={this.onWordChange}
                               placeholder={'Слово'} />
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

module.exports = WordsPanel;