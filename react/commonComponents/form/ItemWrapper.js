/**
 * Created by sabir on 14.08.15.
 */

var React = require('react');
var assign = require('object-assign');

var ItemWrapper = React.createClass({
    getDefaultProps: function () {
        return {
            label: 'no label',
            description: 'no description'
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%'
        },
        labelPlaceholder: {
            color: 'gray',
            fontSize: 16,
            marginBottom: 5
        },
        inputPlaceholder: {

        },
        descriptionPlaceholder: {
            display: 'block',
            color: 'gray',
            fontSize: 12
        }
    },

    render: function () {
        var label = this.props.label;
        var description = this.props.description;
        return (
            <div className={'inputItemPlaceholder'} style={this.componentStyle.placeholder} >
                <div style={this.componentStyle.labelPlaceholder}>{label}</div>
                <div style={this.componentStyle.inputPlaceholder}>
                    {this.props.children}
                </div>
                <div style={assign({}, this.componentStyle.descriptionPlaceholder, {display: (description == '' || description == undefined ? ' none ' : this.componentStyle.descriptionPlaceholder.display )})} >{description}</div>
            </div>
        );
    }
});

module.exports = ItemWrapper;