/**
 * Created by sabir on 25.10.15.
 */


var React = require('react');
var assign = require('object-assign');

var WordsPanel = require('./words/WordsPanel');
var SoundsPanel = require('./sounds/SoundsPanel');

var CorrectorPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            mode: 'sounds'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    switchMode: function(mode){
        this.setState({
            mode: mode
        });
    },

    componentStyle: {
        placeholder: {
            padding: 5,
            margin: '0 auto',
            width: 650,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1'
        },

        topBlock: {
            //borderBottom: '1px solid #EFF0F1',
            textAlign: 'center'
        },

        linkItem: {
            padding: 5,
            display: 'inline-block',
            marginRight: 15,
            cursor: 'pointer'
        },

        contentPlaceholder: {
            
        },
        
        selected: {
            borderBottom: '3px solid #FC636B'
        },

        helpPlaceholder: {
            padding: 5,
            fontSize: '14px'
        }
    },

    render: function () {

        var wordsLinkStyle = assign({}, this.componentStyle.linkItem, (this.state.mode == 'words') ? this.componentStyle.selected: {});
        var soundsLinkStyle = assign({}, this.componentStyle.linkItem, (this.state.mode == 'sounds') ? this.componentStyle.selected: {});
        var helpLinkStyle = assign({}, this.componentStyle.linkItem, (this.state.mode == 'help') ? this.componentStyle.selected: {});

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topBlock}>
                    <div onClick={this.switchMode.bind(this, 'sounds')} style={soundsLinkStyle}>Звуки</div>
                    <div onClick={this.switchMode.bind(this, 'words')}  style={wordsLinkStyle}>Слова</div>
                    <div onClick={this.switchMode.bind(this, 'help')}  style={helpLinkStyle}>Помощь</div>
                </div>
                
                <div style={this.componentStyle.contentPlaceholder}>

                    {this.state.mode == 'words' ?
                        <WordsPanel />
                        :
                        null
                    }
                    {this.state.mode == 'sounds' ?
                        <SoundsPanel />
                        :
                        null
                    }

                    {this.state.mode == 'help' ?
                        <div style={this.componentStyle.helpPlaceholder}>

                            <h4>
                                В помощь проверяющему задания.
                            </h4>
                            <p>
                                Если слово произнесено полностью неправильно,
                                то вы отправляете ученика в словарь, где это слово произносится.
                                Если плохо произнесен отдельный звук, то ему рекомендуется посмотреть
                                видео из нашей коллекции. Видео акцентирует внимание на проблемный звук.
                                При этом вам не нужно писать писем ученику - только вбить "проблемное" слово и
                                кликнуть по соответствующей иконке.
                            </p>


                        </div>
                        :
                        null
                    }

                </div>
                

            </div>
        );
    }

});

module.exports = CorrectorPanel;