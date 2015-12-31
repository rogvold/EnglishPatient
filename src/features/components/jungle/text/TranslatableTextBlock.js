/**
 * Created by sabir on 28.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var TranslatableText = require('../../text/translatable/TranslatableText');

var TranslatableTextBlock = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined
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

        },

        blankLine: {
            height: 20
        },

        textStyle: {
            lineHeight: '30px'
        }
    },

    getComponentsList: function(){
        var text = this.props.text;
        if (text == undefined){
            text = '';
        }
        var list = text.split('\n');
        var arr = [];
        for (var i in list){
            var s = list[i];
            s = s.trim();
            if (s == ''){
                arr.push(
                    <div style={this.componentStyle.blankLine}></div>
                );
                continue;
            }
            arr.push(
                <TranslatableText stlyle={this.componentStyle.textStyle} text={s} />
            );
        }
        return arr;
    },

    render: function () {
        var list = this.getComponentsList();

        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(a, k){
                    var key = 'text_' + k;
                    return (
                        <div key={key} style={{lineHeight: '30px'}} >
                            {a}
                        </div>
                    );
                })}
            </div>
        );
    }

});

module.exports = TranslatableTextBlock;