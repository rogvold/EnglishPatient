/**
 * Created by sabir on 18.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TopBlock = require('../../../components/front/TopBlock');
var TextMediaPanel = require('../../../components/front/TextMediaPanel');

var TextImagePanel = require('../../../components/front/TextImagePanel');

var Sausage = require('../../../components/sausage/Sausage');

var TestimonialsPanel = require('../../../components/front/TestimonialsPanel');

var App = React.createClass({
    getDefaultProps: function () {
        return {}
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

        top: {

        },

        main: {
            color: 'rgb(85, 85, 85)'
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
        }

    },

    render: function () {
        var chesterton = 'https://englishpatient.org/app/assets/images/chesterton.jpg';
        var chSt = assign({}, this.componentStyle.cover, {backgroundImage: 'url(\'' + chesterton + '\')'});

        var aud = 'https://www.englishpatient.org/app/assets/images/front/aud.jpg';
        var gra = 'https://www.englishpatient.org/app/assets/images/front/gra.jpg';
        var lec = 'https://www.englishpatient.org/app/assets/images/front/lec.jpg';
        var spe = 'https://www.englishpatient.org/app/assets/images/front/spe.jpg';
        var gal = 'https://www.englishpatient.org/app/assets/images/front/gal.jpg';

        var galSt = assign({}, this.componentStyle.cover,
            this.componentStyle.galStyle,
            {backgroundImage: 'url(\'' + gal + '\')'});

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.top}>
                    <TopBlock />
                </div>

                <div style={this.componentStyle.main}>


                    <TextMediaPanel />


                    <div style={assign({}, chSt, {height: 450})}>

                        <div style={{width: 900, margin: '0 auto', color: 'white', padding: 10, textAlign: 'right'}} >
                            <div style={{display: 'inline-block', width: 400,
                                            fontSize: 22, lineHeight: '36px', marginTop: 50}} >

                                «Язык - это факт не научный, а художественный.
                                <br/><br/>
                                Его изобрели воины и охотники, и он гораздо древнее науки.»

                                <br/><br/>
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

                    <div style={{textAlign: 'center', fontSize: 50, padding: 20}} >
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

                    <div style={{marginTop: 20}} >

                        <TestimonialsPanel />

                    </div>




                </div>


            </div>
        );
    }

});

module.exports = App;

React.render((<App />

), document.getElementById('main'));