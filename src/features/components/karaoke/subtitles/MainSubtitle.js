/**
 * Created by sabir on 01.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var TranslatableText = require('../../text/translatable/TranslatableText');

var MainSubtitle = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined,

            style: {

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
            fontSize: 20
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        return (
            <div style={st}>

                <TranslatableText style={st} text={this.props.text} />

            </div>
        );
    }

});

module.exports = MainSubtitle;