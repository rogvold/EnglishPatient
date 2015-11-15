/**
 * Created by sabir on 10.08.15.
 */
var React = require('react');
var assign = require('object-assign');
var HeaderLinkItem = require('./HeaderLinkItem');
var CurrentUserPanel = require('./CurrentUserPanel');
var CurrentUserHeaderDropdown = require('./CurrentUserHeaderDropdown');


var HeaderPanel = React.createClass({
    getDefaultProps: function () {
        return {
            logo: 'http://beta.englishpatient.org/home/img/logo_mini.png',
            logoText: 'English Patient',

            extraLogo: undefined,
            extraLogoText: undefined,

            backgroundColor: '#45619D',
            links: [{
                name: 'defaultLink',
                url: 'javascript: void(0);',
                icon : ''
            }],
            dropdownLinks: [
                {
                    name: 'N/A',
                    onClick: function(){
                        alert('n/a clicked');
                    }
                }
            ],
            logoClicked: function(){
                console.log('logo clicked');
            },
            isLoggedIn: false,
            user: undefined,
            //user: {
            //    name: 'sabir',
            //    avatar: 'http://2i.tusur.ru/media/images/Lirmak_1.jpg'
            //},
            customHeaderComponent: undefined,
            loginLinkName: 'Вход',
            loginLinkVisible: true,

            onLoginClick: function(){
                console.log('onLoginClick occured');
            },
            onDropdownLinkClick: function(num){
                console.log('HeaderPanel: onDropdownLinkClick: num = ', num);
            },
            customLoginButtonComponent: undefined
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        headerPlaceholder: {
            width: '100%',
            top: 0,
            height: 50
        },

        header: {
            //width: 900,
            maxWidth: 851,
            paddingLeft: 5,
            margin: '0 auto',
            height: 50,
            position: 'relative'
        },

        logoPlaceholder: {
            //width: 180,
            cursor: 'pointer',
            display: 'inline-block'
        },

        logoTextPlaceholder: {
            color: 'white',
            display: 'inline-block',
            marginLeft: 10,
            fontSize: 18,
            verticalAlign: 'top',
            marginTop: 15

        },

        logoImg: {
            height: 30,
            verticalAlign: 'bottom',
            marginTop: 10,
            display: 'inline-block'
        },

        linksPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: 15,
            marginLeft: 30,
            zIndex: 10
        },

        currentUserPlaceholder: {
            display: 'inline-block',
            position: 'absolute',
            //top: 15,
            right: 15,
            zIndex: 10
        },

        customHeaderComponentPlaceholder: {
            display: 'inline-block',
            marginLeft: 15
        },

        customHeaderComponentPlaceholder: {
            display: 'inline-block',
            padding: 10
        },

        loginLink: {
            marginTop: 10,
            marginRight: -10
        }

    },

    onLoginClick: function(){
        this.props.onLoginClick();
    },

    componentDidMount: function () {

    },

    onDropdownLinkClick: function(num){
        console.log('onDropdownLinkClick occured');
        this.props.onDropdownLinkClick(num);
    },

    logoClicked: function(){
        this.props.logoClicked();
    },

    render: function () {
        console.log('HeaderPanel render: this.props.user = ', this.props.user, 'isLoggedIn = ', this.props.isLoggedIn);
        return (
            <div style={assign({}, this.componentStyle.headerPlaceholder, {backgroundColor: this.props.backgroundColor})}>
                <div style={this.componentStyle.header}>

                    <div style={this.componentStyle.logoPlaceholder} onClick={this.logoClicked} >
                        <img src={this.props.logo} style={this.componentStyle.logoImg} />
                        <div style={this.componentStyle.logoTextPlaceholder}>
                            {this.props.logoText}
                        </div>

                        {this.props.extraLogo == undefined ? null :
                            <div style={{marginLeft: 20, display: 'inline-block'}}>
                                <img src={this.props.extraLogo} style={this.componentStyle.logoImg} />
                                <div style={this.componentStyle.logoTextPlaceholder}>
                                    {this.props.extraLogoText == undefined ? null : this.props.extraLogoText}
                                </div>
                            </div>
                        }



                    </div>

                    <div style={assign({}, this.componentStyle.customHeaderComponentPlaceholder, {display: (this.props.customHeaderComponent == undefined ? ' none ' : this.componentStyle.customHeaderComponentPlaceholder.display ) })} >
                        {this.props.customHeaderComponent}
                    </div>

                    <div style={assign({}, this.componentStyle.linksPlaceholder, {display: (this.props.links.length == 0 ? ' none ' : this.componentStyle.linksPlaceholder.display) })}>
                        {this.props.links.map(function(link, i){
                            var key = 'link_' + i;
                            return <HeaderLinkItem icon={link.icon} name={link.name} url={link.url} />
                        })}
                    </div>

                    <div style={assign({}, this.componentStyle.currentUserPlaceholder)}>
                        {this.props.isLoggedIn == false ?
                            (
                                <div style={this.componentStyle.loginLink} >
                                    {this.props.customLoginButtonComponent == undefined ?
                                        <a className={'ui inverted compact button'} href="javascript: void(0);" onClick={this.onLoginClick}  >
                                            <i className={'ui sign in icon'}></i> {this.props.loginLinkName}
                                        </a>
                                            :
                                        this.props.customLoginButtonComponent
                                    }
                                </div>
                                ) :
                            (<CurrentUserHeaderDropdown onLinkClick={this.onDropdownLinkClick} links={this.props.dropdownLinks} user={this.props.user} />)
                        }
                    </div>

                </div>
            </div>
        );
    }

});

module.exports = HeaderPanel;