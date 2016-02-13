/**
 * Created by sabir on 19.11.15.
 */

//var React = require('react/addons');
var React = require('react');
var assign = require('object-assign');

var TranslateMixin = require('../../../mixins/TranslateMixin');

var Speech = require('react-speech');

var TranslatePanel = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined,
            lang: 'en',
            searchInputVisible: true,

            topBlockEnabled: true
        }
    },

    getInitialState: function () {
        return {
            text: this.props.text,
            html: ''
        }
        //if (this.props.text != undefined){
        //    this.translate(this.props.text, function(){
        //
        //    });
        //}
    },

    componentWillReceiveProps: function (nextProps) {
        var text = nextProps.text;
        if (text != this.props.text){
            //this.setState({
            //    html: '',
            //    text: text
            //});
            this.translate(text, function(){

            }.bind(this), this.props.topBlockEnabled);
        }
    },

    componentDidMount: function () {
        var text = this.props.text;
        if (text == undefined || text.trim() == ''){
            return;
        }
        this.translate(text, function(tr){
           console.log('translated! ', tr);
        }, this.props.topBlockEnabled, this.props.lang);
    },

    translate: function(text, callback){
        if (text == undefined || text.trim() == ''){
            return;
        }
        this.setState({
            loading: true,
            text: text,
            html: ''
        });
        TranslateMixin.translate(text, function(html){
            this.setState({
                html: html,
                loading: false
            });
            callback(html);
        }.bind(this), this.props.topBlockEnabled, this.props.lang);
    },

    onClick: function(){
        var text = this.state.text;
        this.translate(text, function(html){
           console.log('translated: ', html);
        }, this.props.topBlockEnabled);
    },

    onTextChange: function(evt){
        var text = evt.target.value;
        this.setState({
            text: text,
            html: ''
        });
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            fontWeight: 'normal',
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            padding: 7,
            borderRadius: 4,

            lineHeight: '20px',

            minWidth: 300,
            minHeight: 400,
            fontSize: '14px',
            margin: '0 auto',
            textAlign: 'left'
        },

        inputBlock: {
            //borderBottom: '1px solid #EFF0F1'
        },

        translationBlock: {

        },

        audioBlock: {
            padding: 10,
            textAlign: 'center'
        }
    },

    render: function () {
        var textEmpty = (this.state.text == undefined || this.state.text.trim() == '');
        var htmlEmpty = (this.state.html == undefined || this.state.html.trim() == '');

        var drawSound = (htmlEmpty == false && textEmpty == false);
        if (this.props.lang != 'en'){
            drawSound = false;
        }
        console.log('rendering TranslatePanel: this.props.lang = ', this.props.lang);

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.searchInputVisible == false ? null :
                    <div style={this.componentStyle.inputBlock} className={'ui form'} >
                        <div className="ui action input">
                            <input type="text" placeholder={'Слово для перевода...'}
                                   value={this.state.text} onChange={this.onTextChange}  />
                            <button className={'ui basic button'} style={{float: 'right'}} onClick={this.onClick} >
                                <i className={'icon search'} ></i> Перевести
                            </button>
                        </div>
                    </div>
                }


                {drawSound == false ? null :
                    <div style={this.componentStyle.audioBlock}>
                        <i className={'icon volume up'} ></i>
                        <Speech text={this.state.text} displayText={'GB'} textAsButton={true} />
                        <Speech text={this.state.text} displayText={'US'} textAsButton={true} lang={'en-US'} />
                    </div>
                }


                <div style={this.componentStyle.translationBlock}>

                    <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>

                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = TranslatePanel;