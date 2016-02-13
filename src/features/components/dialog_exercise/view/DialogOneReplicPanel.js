/**
 * Created by sabir on 18.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var DialogCard = require('../card/DialogCard');

var TranslatableText = require('../../text/translatable/TranslatableText');

var DialogOneReplicPanel = React.createClass({
    getDefaultProps: function () {
        return {
            orientation: 'left',
            name: 'Sabir',
            lang: 'en',
            avatar: undefined,
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

        cardStyle: {
            fontSize: 10
        },

        cardPlaceholder: {
            width: 50,
            height: 50
        },

        avaPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 2
        },

        contentPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            padding: 2,
            width: 500,
            fontSize: 14,
            lineHeight: '16px'
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                {this.props.orientation == 'left' ?
                    <div>
                        <div style={this.componentStyle.avaPlaceholder}>
                            <div style={this.componentStyle.cardPlaceholder}>
                                <DialogCard style={this.componentStyle.cardStyle}
                                            name={this.props.name}
                                            opacity={0.3} avatar={this.props.avatar} />
                            </div>
                        </div>

                        <div style={assign({}, this.componentStyle.contentPlaceholder, {textAlign: this.props.orientation})}>
                            <TranslatableText lang={this.props.lang} text={this.props.text}
                                              fontSize={this.componentStyle.contentPlaceholder.fontSize} />
                        </div>
                    </div>
                    :
                    <div>
                        <div style={assign({}, this.componentStyle.contentPlaceholder, {textAlign: this.props.orientation})}>
                            <TranslatableText lang={this.props.lang} text={this.props.text}
                                              fontSize={this.componentStyle.contentPlaceholder.fontSize} />
                        </div>

                        <div style={this.componentStyle.avaPlaceholder}>
                            <div style={this.componentStyle.cardPlaceholder}>
                                <DialogCard style={this.componentStyle.cardStyle}
                                            name={this.props.name}
                                            opacity={0.3} avatar={this.props.avatar} />
                            </div>
                        </div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = DialogOneReplicPanel;