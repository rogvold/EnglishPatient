/**
 * Created by sabir on 18.11.15.
 */

var React = require('react');
var assign = require('object-assign');


var TopBlock = React.createClass({
    getDefaultProps: function () {
        return {
            logo: 'http://www.englishpatient.org/img/logo.png',
            cover: 'http://www.englishpatient.org/img/pavlova.jpg',
            opacity: 0.8,
            height: 560,
            overlayColor: '#563d7c',
            logoText: 'English Patient',

            rightLinksEnabled: true
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
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            position: 'relative',
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
        },

        overlay: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 2,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },

        overlayPanel: {
            position: 'absolute',
            zIndex: 2,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            color: 'white'
        },

        header: {
            height: 90,
            width: 912,
            margin: '0 auto',
            marginTop: 10
        },

        logoPlaceholder: {
            display: 'inline-block'
        },

        logo: {
            height: 40,
            width: 40,
            verticalAlign: 'middle',
            display: 'inline-block'
        },

        logoText: {
            display: 'inline-block',
            verticalAlign: 'middle',
            fontSize: '22px'
        },

        rightLinksPlaceholder: {
            display: 'inline-block',
            float: 'right',
            verticalAlign: 'middle'
        },

        content: {
            textAlign: 'center',
            margin: '0 auto',
            width: 912,
            marginTop: 120
        },

        firstLine: {
            fontSize: '40px'
        },

        secondLine: {
            fontSize: '30px',
            lineHeight: '40px',
            marginTop: 50
        },

        loginBlock: {
            display: 'inline-block'
        }
    },

    render: function () {
        var overlay = assign({}, this.componentStyle.overlay, {opacity: this.props.opacity, backgroundColor: this.props.overlayColor});
        var overlayPanel = assign({}, this.componentStyle.overlayPanel);
        var st = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url(\'' + this.props.cover + '\')', height: this.props.height});


        return (
            <div style={st}>



                <div style={overlay}></div>


                <div style={overlayPanel}>

                    <div style={this.componentStyle.header}>

                        <div style={this.componentStyle.logoPlaceholder}>

                            <img src={this.props.logo} style={this.componentStyle.logo} />


                            <div style={this.componentStyle.logoText}>
                                {this.props.logoText}
                            </div>


                        </div>

                        {this.props.rightLinksEnabled == false ? null :
                            <div style={this.componentStyle.rightLinksPlaceholder}>

                                <div style={this.componentStyle.loginBlock}>

                                    <a href="http://app.englishpatient.org"  >
                                        <button className={'ui button inverted white'} >
                                            Вход
                                        </button>
                                    </a>

                                </div>

                            </div>
                        }


                    </div>

                    <div style={this.componentStyle.content}>

                        <div style={this.componentStyle.firstLine}>
                            Уважаемые преподаватели английского языка!
                        </div>

                        <div style={this.componentStyle.secondLine}>
                            Предлагаем материалы и удобные инструменты для развития всех видов речевой деятельности.
                            <br/>
                            Создавайте свои уроки.
                        </div>

                    </div>

                </div>

            </div>
        );
    }

});

module.exports = TopBlock;