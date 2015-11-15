/**
 * Created by sabir on 07.11.15.
 */

var React = require('react');
var assign = require('object-assign');
var AddClassButton = require('./AddClassButton');

var AddClassPlusButton = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
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
            display: 'inline-block'
        },

        plusButtonStyle: {
            width: 18,
            height: 18,
            padding: 0,
            opacity: 0.8,
            marginRight: 2
        },

        iconStyle: {
            marginRight: 0,
            position: 'absolute',
            top: 4,
            left: 6
        }



    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <AddClassButton
                    buttonClassName={'ui circular inverted white mini button'}
                    buttonStyle={this.componentStyle.plusButtonStyle}
                    iconStyle={this.componentStyle.iconStyle}
                    buttonName={''}
                    userId={this.props.userId}
                    />

            </div>
        );
    }

});

module.exports = AddClassPlusButton;