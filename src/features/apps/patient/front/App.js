/**
 * Created by sabir on 18.11.15.
 */

var React = require('react/addons');
var assign = require('object-assign');

var TopBlock = require('../../../components/front/TopBlock');
var TextMediaPanel = require('../../../components/front/TextMediaPanel');

var TextImagePanel = require('../../../components/front/TextImagePanel');

var Sausage = require('../../../components/sausage/Sausage');

var TestimonialsPanel = require('../../../components/front/TestimonialsPanel');

var AuthForm = require('../../../components/user/AuthForm');

var SignupForm = require('../../../components/user/SignupForm');

var MaterialLink = require('../../../components/link/MaterialLink');

var ParseMixin = require('../../../../react/mixins/commonMixins/ParseMixin');



var App = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        ParseMixin.initParse();
    },

    componentStyle: {
        placeholder: {
            fontFamily: "'Calibri Light', Calibri, Arial, sans-serif",
            //backgroundColor: '#F0F0F0'
            backgroundColor: 'white'
        },

        top: {

        },

        main: {
            color: 'rgb(85, 85, 85)',
            width: 920,
            padding: 10,
            margin: '0 auto',
            backgroundColor: 'white'

        },

        cover: {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        },

        image: {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: 300,
            height: 200
        },

        galStyle: {
            width: 900,
            height: 500,
            margin: '0 auto',
            marginTop: 30
        },

        logosPlaceholder: {
            width: '100%',
            height: 500
        }

    },

    onSignUp: function(u){
        window.location.href = 'https://www.englishpatient.org/app/'
    },

    render: function () {
        var chesterton = 'https://englishpatient.org/app/assets/images/chesterton.jpg';
        var chSt = assign({}, this.componentStyle.cover, {backgroundImage: 'url(\'' + chesterton + '\')'});

        var aud = 'https://www.englishpatient.org/app/assets/images/front/aud.jpg';
        var gra = 'https://www.englishpatient.org/app/assets/images/front/gra.jpg';
        var lec = 'https://www.englishpatient.org/app/assets/images/front/lec.jpg';
        var spe = 'https://www.englishpatient.org/app/assets/images/front/spe.jpg';
        var gal = 'https://www.englishpatient.org/app/assets/images/front/gal.jpg';
        var trusted = 'https://www.englishpatient.org/assets/images/front/logos.jpg';

        var galSt = assign({}, this.componentStyle.cover,
            this.componentStyle.galStyle,
            {backgroundImage: 'url(\'' + gal + '\')'});

        var logosSt = assign({}, this.componentStyle.logosPlaceholder,
            this.componentStyle.cover,
            {backgroundImage: 'url(\'' + trusted + '\')'});

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.top}>
                    <TopBlock  />
                </div>

                <div style={this.componentStyle.main}>


                    <div style={{textAlign: 'center', fontSize: '50px',
                                    padding: 10, marginTop: 30, marginBottom: 30 }}>
                        Уважаемые преподаватели!
                    </div>

                    <TextMediaPanel />


                    <div style={assign({}, chSt, {height: 270})}>

                        <div style={{width: 900, margin: '0 auto', color: 'white', padding: 10, textAlign: 'right'}} >
                            <div style={{display: 'inline-block', width: 400,
                                            fontSize: 22, lineHeight: '36px', marginTop: 10,
                                            paddingRight: 50
                                            }} >

                                «Язык - это факт не научный, <br/> а художественный.
                                <br/>
                                Его изобрели воины и охотники,  <br/> и он гораздо древнее науки.»

                                <br/><br/>
                                Г.К. Честертон

                            </div>
                        </div>
                    </div>

                    <div style={{width: 700, margin: '0 auto', fontSize: 32, textAlign: 'center',
                                 paddingTop: 40, paddingBottom: 40,
                                    lineHeight: '34px'}} >

                        Учим английский по заветам Честертона - через
                        «художественные факты» : песни, фильмы, новости  и т.д.

                    </div>

                    <div id="about" style={{textAlign: 'center', fontSize: 50, padding: 20}} >
                        Мы предлагаем
                    </div>


                    <div style={{width: 900, paddingTop: 40, margin: '0 auto'}} >

                        <TextImagePanel
                            imageText={'Аудирование'}
                            text={'Набор инструментов и видео материалов для обучения пониманию реальной речи.'}
                            textAlign={'right'} image={aud} />

                        <TextImagePanel
                            imageText={'Говорение'}
                            text={'Тренажеры для выработки навыков говорения на основе аутентичных видео материалов.'}
                            image={spe} />

                        <TextImagePanel
                            imageText={'Грамматика'}
                            text={'Набор аутентичных видео фрагментов с грамматическими комментариями'}
                            textAlign={'right'}
                            image={gra} />

                        <TextImagePanel
                            imageText={'Лексика'}
                            text={'Коллекция коротких видео с комментариями для запоминания слов, пословиц и идиом.'}
                            image={lec} />

                    </div>

                    <div style={{textAlign: 'center', fontSize: 50, padding: 20, marginTop: 50}} >
                        Ресурс в работе
                    </div>

                    <div style={galSt} >
                    </div>

                    <div style={{marginTop: 40}} >

                        <div style={{textAlign: 'center', fontSize: 50, padding: 20}} >
                            Отзывы о платформе
                        </div>

                        <TestimonialsPanel />

                    </div>

                    <div style={{marginTop: 80}} >
                        <div style={{textAlign: 'center', marginBottom: 50, fontSize: 50, padding: 20}} >
                            Trusted by
                        </div>

                        <div style={logosSt} >
                        </div>

                    </div>

                    <div style={{margin: '0 auto', marginTop: 80, marginBottom: 80, width: 700}} >

                        <div style={{textAlign: 'center', marginBottom: 50, fontSize: 50, padding: 20}} >
                            Зарегистрируйтесь сейчас
                        </div>

                        <div>

                            <div style={{display: 'inline-block', paddingTop: 40,
                                fontSize: 25, lineHeight: '40px',
                             verticalAlign: 'top', width: '60%'}} >
                                В толкучке, хаосе и шуме, <br/>
                                В хитросплетеньи отношений <br/>
                                Любая длительность раздумий <br/>
                                Чревата глупостью решений
                            </div>

                            <div id="register" style={{display: 'inline-block', verticalAlign: 'top', width: '40%'}} >

                                <div style={{width: 270, padding: 10, display: 'inline-block', float: 'right',
                                            borderRadius: 4, border: '1px solid #EFF0F1'}} >
                                    <SignupForm onLogin={this.onSignUp} userRole={'teacher'} loginMode={true}
                                        nameFormStyle={{fontSize: 25}} confirmPasswordMode={false} />
                                </div>


                            </div>

                        </div>

                    </div>


                </div>


            </div>
        );
    }

});

module.exports = App;

React.render((<App />

), document.getElementById('main'));