/**
 * Created by sabir on 13.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var SignUpNowBlock = React.createClass({
    getDefaultProps: function () {
        return {
            buttonName: 'Регистрация',
            buttonIcon: 'ui button inverted green circular',
            url: 'https://englishpatient.org/app',

            style: {

            },

            joinUsText: 'Зарегистрируйтесь сейчас!'
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
            marginTop: 70,
            marginBottom: 70
        },

        link: {
            fontSize: 18
        },

        innerPlaceholder: {
            textAlign: 'center',
            fontSize: 24,
            marginBottom: 10,
            marginTop: 20
        },

        joinUsPlaceholder: {
            fontSize: 24,
            fontWeight: 'bold',
            padding: 10,
            textAlign: 'center'
        }

    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st}>

                <div style={this.componentStyle.joinUsPlaceholder} >
                    {this.props.joinUsText}
                </div>

                <div style={this.componentStyle.innerPlaceholder}>
                    <a href={this.props.url} style={this.componentStyle.link}
                       className={this.props.buttonIcon} >
                        {this.props.buttonName}
                    </a>
                </div>

            </div>
        );

    }

});

module.exports = SignUpNowBlock;