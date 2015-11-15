/**
 * Created by sabir on 14.08.15.
 */
var React = require('react');
var ReactModalOverlay = require('./ReactModalOverlay');

var TestModal = React.createClass({
    getDefaultProps: function () {
        return {
            isVisible: false
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

        }
    },

    render: function () {

        return (
            <div>
                <ReactModalOverlay isVisible={this.props.isVisible}>
                    {this.props.children}
                </ReactModalOverlay>
            </div>
        );
    }

});

module.exports = TestModal;