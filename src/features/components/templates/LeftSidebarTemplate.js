/**
 * Created by sabir on 09.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var Link = require('react-router').Link;

var LeftSidebarTemplate = React.createClass({
    getDefaultProps: function () {
        return {
            logo: 'http://beta.englishpatient.org/home/img/logo_mini.png',
            logoText: 'English Patient',
            sidebar: undefined,
            header: undefined,
            footer: undefined
        }
    },

    getInitialState: function () {
        return {
            sidebarIsVisible: true,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    handleResize: function(){
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    },

    componentStyle: {
        placeholder: {
            width: '100vw',
            height: '100vh'
        },

        sidebarPlaceholder: {
            borderRight: '1px solid #EFF0F1',
            width: 250,
            backgroundColor: '#2E3C54',
            display: 'inline-block',
            height: '100%',
            color: 'white',
            padding: '2px'
        },

        sidebarTopBlock: {
            height: 50,
            width: '100%',
            position: 'relative',
            padding: 5
        },

        sidebarLogoPlaceholder: {
            width: 200
        },

        sidebarCloseButtonPlaceholder: {
            position: 'absolute',
            right: '5px',
            top: '8px',
            width: '30px',
            height: '30px',
            textAlign: 'center',
            fontSize: '17px'
        },

        sidebarCloseButton: {
            display: 'inline-block',
            color: 'white',
            cursor: 'pointer',
            opacity: 0.9
        },

        sidebarLogoPlaceholder: {
            height: 40,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        sidebarLogo: {
            height: '30px',
            marginRight: 5
        },

        sidebarLogoText: {
            display: 'inline-block',
            verticalAlign: 'middle',
            fontSize: '16px',
            paddingTop: 4
        },



        centerPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            height: '100%',
            position: 'relative'
        },

        headerPlaceholder: {
            height: 40,
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1'
        },

        contentPlaceholder: {
            overflowY: 'auto'
        },

        footerPlaceholder: {
            height: 40,
            borderTop: '1px solid #EFF0F1',
            position: 'absolute',
            bottom: '0px',
            width: '100%',
            backgroundColor: 'white'
        },

        customHeaderPlaceholder: {
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'top'
        },

        sidebarTogglerPlaceholder: {
            display: 'inline-block',
            height: '100%',
            width: 50,
            textAlign: 'center',
            padding: 5,
            opacity: 0.75,
            verticalAlign: 'top',
            borderRight: '1px solid #EFF0F1',
            cursor: 'pointer'
        },

        sidebarToggler: {
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#A1A4AA'
        },

        customSidebarBlock: {
            width: '100%',
            height: window.innerHeight - 55,
            overflowY: 'auto'
        }

    },

    onSidebarTogglerClick: function(){
        this.setState({
            sidebarIsVisible: true
        });
    },

    onSidebarClose: function(){
        this.setState({
            sidebarIsVisible: false
        });
    },

    render: function () {
        var centerWidth = window.innerWidth;
        if (this.state.sidebarIsVisible == true){
            centerWidth = centerWidth - this.componentStyle.sidebarPlaceholder.width;
        }
        var centerStyle = assign({}, this.componentStyle.centerPlaceholder, {width: centerWidth});
        var customHeaderPlaceholderStyle = assign({}, this.componentStyle.customHeaderPlaceholder);
        var nW;
        if (this.state.sidebarIsVisible == true){
            nW = window.innerWidth - this.componentStyle.sidebarPlaceholder.width;
        }else{
            nW = window.innerWidth - this.componentStyle.sidebarTogglerPlaceholder.width;
        }
        customHeaderPlaceholderStyle = assign(customHeaderPlaceholderStyle, {width: nW});

        var contentPlaceholderStyle = assign({}, this.componentStyle.contentPlaceholder);
        if (this.props.footer == undefined){
            contentPlaceholderStyle = assign(contentPlaceholderStyle, {height: window.innerHeight - this.componentStyle.headerPlaceholder.height});
        }else{
            contentPlaceholderStyle = assign(contentPlaceholderStyle, {height: window.innerHeight - this.componentStyle.headerPlaceholder.height - this.componentStyle.footerPlaceholder.height });
        }

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.sidebarIsVisible == false ? null :
                    <div style={this.componentStyle.sidebarPlaceholder}>

                        <div style={this.componentStyle.sidebarTopBlock}>

                            <Link style={{color: 'white'}} to={'/'} >

                                <div style={this.componentStyle.sidebarLogoPlaceholder}>
                                    <img style={this.componentStyle.sidebarLogo} src={this.props.logo} />
                                </div>

                                {this.props.logoText == undefined ? null :
                                    <div style={this.componentStyle.sidebarLogoText}>
                                        {this.props.logoText}
                                    </div>
                                }

                            </Link>

                            <div style={this.componentStyle.sidebarCloseButtonPlaceholder}>
                                <i style={this.componentStyle.sidebarCloseButton} className={'icon remove'} onClick={this.onSidebarClose} ></i>
                            </div>

                        </div>

                        {this.props.sidebar == undefined ? null :
                            <div style={this.componentStyle.customSidebarBlock} >
                                {this.props.sidebar}
                            </div>
                        }

                    </div>
                }

                <div style={centerStyle}>

                    <div style={this.componentStyle.headerPlaceholder}>

                        {this.state.sidebarIsVisible == true ? null :
                            <div onClick={this.onSidebarTogglerClick} style={this.componentStyle.sidebarTogglerPlaceholder}>
                                <i style={this.componentStyle.sidebarToggler} className={'icon sidebar'} ></i>
                            </div>
                        }

                        {this.props.header == undefined ? null :
                            <div className={'customHeaderPlaceholder'} style={customHeaderPlaceholderStyle}>
                                {this.props.header}
                            </div>
                        }

                    </div>

                    {this.props.content == undefined ? null :
                        <div style={contentPlaceholderStyle}>
                            {this.props.content}
                        </div>
                    }


                    {this.props.footer == undefined ? null :
                        <div style={this.componentStyle.footerPlaceholder}>
                            {this.props.footer}
                        </div>
                    }


                </div>

            </div>
        );
    }

});

module.exports = LeftSidebarTemplate;