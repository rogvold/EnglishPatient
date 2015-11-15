/**
 * Created by sabir on 28.09.15.
 */
var React = require('react');
var assign = require('object-assign');

var PatientText = React.createClass({
    getDefaultProps: function () {
        return {
            text: '',
            fontSize: 20
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

        },

        textPlaceholder: {
            padding: 5,
            textAlign: 'center',
            fontSize: 20
        }
    },

    render: function () {
        var style = assign({}, this.componentStyle.textPlaceholder);
        if (this.props.fontSize != undefined){
            style = assign(style, {fontSize: this.props.fontSize});
        }

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={style}>
                    {this.props.text}
                </div>
            </div>
        );
    }

});

module.exports = PatientText;