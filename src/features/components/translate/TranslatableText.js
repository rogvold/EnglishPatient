/**
 * Created by sabir on 01.10.15.
 */
var React = require('react');

var TranslatableText = React.createClass({
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
        placeholder: {}
    },

    getWordsArray: function(){
        var text = this.props.text;
        if (text == undefined){
            return [];
        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

            </div>
        );
    }

});

module.exports = TranslatableText;