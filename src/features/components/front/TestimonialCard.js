/**
 * Created by sabir on 31.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../dialog_exercise/card/DialogCard');

var TestimonialCard = React.createClass({
    getDefaultProps: function () {
        return {
            avatar: undefined,
            name: undefined,
            content: undefined,
            businessTitle: undefined
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
            with: 800
        },

        left: {
            width: 200,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            width: 595,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        avatarPlaceholder: {
            width: 150,
            height: 150
        },

        businessTitlePlaceholder: {
            textAlign: 'center',
            opacity: 0.6
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <DialogCard avatar={this.props.avatar} mode={'circle'} />
                    </div>

                    <div style={this.componentStyle.businessTitlePlaceholder}>
                        {this.props.businessTitle}
                    </div>

                </div>

                <div style={this.componentStyle.right}>
                    {this.props.content}
                </div>

            </div>
        );
    }

});

module.exports = TestimonialCard;