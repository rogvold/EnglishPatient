/**
 * Created by sabir on 24.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var VideoBackground = React.createClass({
    getDefaultProps: function () {
        return {
            backgroundColor: 'black',
            opacity: 0.5,
            height: 500,
            logo: 'http://abali.ru/wp-content/uploads/2013/03/emblema_mfti.png',
            videoSrc: 'https://englishpatient.org/app/assets/img/video.mp4'
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
            width: '100%',
            position: 'relative'
        },

        overlayPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            color: 'white'
        },

        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            padding: 10
        },

        overlaySubPanel: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 0,
            overflowY: 'auto'
        },

        video: {
            width: '100%'

        },

        headerBlock: {
            textAlign: 'center',
            paddingTop: 95,
            width: 920,
            margin: '0 auto'
        },

        leftBlock: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 500,
            textAlign: 'left'
        },

        rightBlock: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 400
        },



        logoPanel: {
            width: 920,
            paddingTop: 10,
            margin: '0 auto',
            height: 45
        },

        logoPlaceholder: {

        },


        headerText: {
            fontSize: 30,
            marginTop: 15,
            lineHeight: '40px',

            color: 'white'
        },

        bottomText: {
            marginTop: 20,
            fontSize: 24,
            lineHeight: '40px',
            color: 'white'
        },

        logoImg: {
            height: 40,
            display: 'inline-block',
            verticalAlign: 'top'
        }



    },

    render: function () {

        var st = assign({}, this.componentStyle.placeholder, {height: this.props.height});


        var overlayStyle = assign({}, this.componentStyle.overlay,
            {opacity: this.props.opacity, backgroundColor: this.props.backgroundColor});

        return (
            <div style={st}>

                <div style={overlayStyle}></div>

                <div style={this.componentStyle.overlaySubPanel}>
                    <video style={this.componentStyle.video} autoPlay={true} >
                        <source src={this.props.videoSrc} ></source>
                    </video>
                </div>

                <div style={this.componentStyle.overlayPanel}>

                    <div style={this.componentStyle.logoPanel}>

                        <div style={this.componentStyle.logoPlaceholder}>
                            <img src={this.props.logo} style={this.componentStyle.logoImg} />
                        </div>

                    </div>

                    <div style={this.componentStyle.headerBlock}>

                        <div style={this.componentStyle.leftBlock}>
                            <div style={this.componentStyle.headerText}>
                                Добро пожаловать на сайт дистанционного образования МФТИ.
                            </div>

                            <div style={this.componentStyle.bottomText}>
                                Здесы вы найдете десятки курсов от профессионалов
                            </div>
                        </div>

                        <div style={this.componentStyle.rightBlock}>

                            <iframe width="420" height="300" src="https://www.youtube.com/embed/YR5ApYxkU-U?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allowFullscreen="1"></iframe>

                        </div>



                    </div>

                </div>

            </div>
        );
    }

});

module.exports = VideoBackground;