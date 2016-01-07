/**
 * Created by sabir on 18.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var SimpleVideoDialog = require('../dialog/SimpleVideoDialog');

var TopBlock = React.createClass({
    getDefaultProps: function () {
        return {
            logo: 'http://www.englishpatient.org/img/logo.png',
            //cover: 'http://www.englishpatient.org/img/pavlova.jpg',
            cover: 'https://www.englishpatient.org/app/assets/images/back_g.jpg',
            miniCover: 'https://www.englishpatient.org/app/assets/images/back_g_mini.jpg',
            miniMiniCover: 'https://www.englishpatient.org/app/assets/images/back_g_mini_mini.jpg',

            opacity: 0.8,
            //height: 330,
            height: 590,
            //overlayColor: '#563d7c',
            overlayColor: '#422700',
            logoText: 'English Patient',

            rightLinksEnabled: true
        }
    },

    getInitialState: function () {
        return {
            mainVideoVisible: false
        }
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
            marginTop: 30
            //marginTop: 10
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
            //marginTop: 10
            //marginTop: 60
            marginTop: 45
            //marginTop: 120
        },

        firstLine: {
            //fontSize: '60px',
            fontSize: '56px',
            fontWeight: 'bold',
            //fontSize: '40px',
            lineHeight: '80px'
        },

        secondLine: {
            //fontSize: '30px',
            fontSize: '35px',
            lineHeight: '40px',
            marginTop: 50
        },

        loginBlock: {
            display: 'inline-block'
        }
    },

    showVideo: function(){
        this.setState({
            mainVideoVisible: true
        });
    },

    closeVideo: function(){
        this.setState({
            mainVideoVisible: false
        });
    },

    render: function () {
        var overlay = assign({}, this.componentStyle.overlay, {opacity: this.props.opacity, backgroundColor: this.props.overlayColor});
        overlay = assign({}, overlay, { backgroundImage: 'linear-gradient(to bottom right,rgba(35, 33, 32, 0.85),rgb(81, 47, 27));' });


        var overlayPanel = assign({}, this.componentStyle.overlayPanel);
        var st = assign({}, this.componentStyle.placeholder,
            {backgroundImage: 'url(\'' + this.props.cover + '\'), url(\'' + this.props.miniCover + '\'), url(\'' + this.props.miniMiniCover + '\')',
                height: this.props.height});


        return (
            <div style={st}>

                {this.state.mainVideoVisible == false ? null :
                    <SimpleVideoDialog onClose={this.closeVideo} />
                }


                <div style={overlay}></div>


                <div style={overlayPanel}>

                    <div style={this.componentStyle.header}>

                        <div style={this.componentStyle.logoPlaceholder}>

                            <img src={this.props.logo} style={this.componentStyle.logo} />


                            <div style={this.componentStyle.logoText}>
                                {this.props.logoText}
                            </div>


                        </div>

                        <div style={{display: 'inline-block', textAlign: 'right', width: 625}} >
                            <a href="#about" style={{marginRight: 35, color: 'white', fontSize: 16}}  >
                                О ресурсе
                            </a>

                            <a href="/app" style={{marginRight: 20, color: 'white', fontSize: 16}}  >
                                Регистрация
                            </a>

                        </div>

                        {this.props.rightLinksEnabled == false ? null :
                            <div style={this.componentStyle.rightLinksPlaceholder}>

                                <div style={this.componentStyle.loginBlock}>

                                    <a href="http://www.englishpatient.org/app"  >
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
                            Материалы и инструменты для изучения английского языка
                        </div>

                        <div style={this.componentStyle.secondLine}>

                            Учить лучше, тратить меньше

                        </div>

                        <div style={{marginTop: 60, textAlign: 'center'}} >

                            <span style={{margin: 15}} >
                                <button className={'ui inverted circular button'} onClick={this.showVideo} style={{fontSize: 18}} >
                                    <i className={'icon play video outline'} ></i> видео
                                </button>
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

});

module.exports = TopBlock;