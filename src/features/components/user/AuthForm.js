/**
 * Created by sabir on 02.10.15.
 */
var React = require('react');

var LoginForm = require('./LoginForm');
var SignupForm = require('./SignupForm');

var AuthForm = React.createClass({
    getDefaultProps: function () {
        return {
            topText: undefined,
            onLogin: function(){

            },

            roleSelectorEnabled: false,

            confirmPasswordMode: true,

            loginFirst: true

        }
    },

    getInitialState: function () {
        return {
            login: this.props.loginFirst
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 250,
            display: 'block',
            margin: '0 auto'
        },

        formPlaceholder:{

        },

        togglerPlaceholder: {
            paddingTop: 10,
            marginTop: 15,
            borderTop: '1px solid lightgrey',
            fontSize: '14px',
            //textAlign: 'right',
            textAlign: 'center',
            paddingRight: 8
        },

        toggler: {
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#45619D'
        },

        togglerButton: {
            marginTop: 10
        },

        togglerLabel: {
            opacity: 0.6
        }

    },

    toggle: function(){
        this.setState({
            login: !this.state.login
        });
    },

    onLogin: function(){
        this.props.onLogin();
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.formPlaceholder}>

                    {this.state.login ?
                        <LoginForm onLogin={this.onLogin} />
                        :
                        <SignupForm
                            confirmPasswordMode={this.props.confirmPasswordMode}
                            roleSelectorEnabled={this.props.roleSelectorEnabled} onSignUp={this.onLogin} />
                    }

                </div>

                <div style={this.componentStyle.togglerPlaceholder}>

                    <div>
                        {this.state.login
                            ?
                            <div>
                                <span style={this.componentStyle.togglerLabel}>
                                    Еще не зарегистрированы?
                                </span>

                                <br/>
                                <span onClick={this.toggle} style={this.componentStyle.toggler}>
                                    <button style={this.componentStyle.togglerButton} className={' ui blue basic button '} >
                                        Регистрация
                                    </button>
                                </span>
                            </div>
                            :
                            <div>
                                <span style={this.componentStyle.togglerLabel}>
                                    Уже зарегистрированы?
                                </span>

                                <br/>
                                <span onClick={this.toggle} style={this.componentStyle.toggler}>
                                    <button style={this.componentStyle.togglerButton}  className={' ui blue basic button '} >
                                        Вход
                                    </button>
                                </span>
                            </div>
                        }
                    </div>

                </div>

            </div>
        );

    }

});

module.exports = AuthForm;