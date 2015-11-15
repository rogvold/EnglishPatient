/**
 * Created by sabir on 17.09.15.
 */
var React = require('react');

var ExerciseMixin = require('../mixins/ExerciseMixin');

var SelfInitHeader = require('../components/header/SelfInitHeader');

var SelfLoadingUserExercise = require('../components/exercise/SelfLoadingUserExercise');
var SelfCurrentLoadingUserExercise = require('../components/exercise/SelfLoadingCurrentUserExercise');

var ListOfSelfLoadingCurrentUserExercises = require('../components/exercise/ListOfSelfLoadingCurrentUserExercises');
var AuthButton = require('../components/user/AuthButton');

var SelfLoadingExercisesTabs = require('../components/tabs/SelfLoadingExercisesTabs');

var HidableText = require('../components/text/HidableText');

var RandomMixin = require('../mixins/RandomMixin');
var DataFactory = require('../data/DataFactory');

var TopBrandContainer = require('../components/containers/TopBrandContainer');

var TestApp = React.createClass({
    getDefaultProps: function () {
        return {
            topTexts: [
                {
                    name: '',
                    text: 'Языковая школа "Английский Пациент" сотрудничает с ТГУ в важном деле подъема уровня знания английского языка его сотрудниками. Образовательная парадигма школы полностью совпадает с приоритетами ТГУ – его сотрудники  должны уметь общаться на английском языке, причем на первом месте – устное общение. Тесты разработаны нашей школой в сотрудничестве с Управлением международных связей ТГУ. Они предназначены для определения начального уровня владения языком. Результаты тестов используются при анализе эффективности обучения.'
                },
                {
                    name: '',
                    text: 'На все задания вам потребуется 1 час, в течение которого вы будете смотреть, слушать, говорить, немного писать. Смотреть вы будете только аутентичные видео фрагменты, длина которых не превышает 5-6 секунд. Они покажут, насколько вы способны воспринимать реальную английскую речь, а также знание грамматики и идиом. Вам также будет предложено повторить фразы, которые вы услышите (тексты предоставляются). И, наконец, вам придется доказать Google, что его программа распознавания голоса способна понять то, что вы прочтете. Все, что вы произносите и пишете, сохраняется в базе языковой школы «Английский Пациент». Администрация ТГУ также может воспользоваться этой базой.'
                }
            ],
            randomMode: true,
            randomNumber: RandomMixin.getRandomTestNumber(DataFactory.TGUexercisesTabs.length),
            exercisesTabs: [DataFactory.TGUexercisesTabs[RandomMixin.getRandomTestNumber(DataFactory.TGUexercisesTabs.length)]],
            //exercisesTabs: DataFactory.TGUexercisesTabs,
            hasTopName: false,
            backgroundTopImg: undefined

        }
    },

    getInitialState: function () {
        return {
        }
    },



    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        console.log('testApp mounted');
    },

    componentStyle: {
        placeholder: {

        },

        userInputPlaceholder: {
            border: '1px solid whitesmoke',
            padding: 5,
            marginTop: 5
        },

        contentTypesPlaceholder: {
            border: '1px solid whitesmoke',
            padding: 5,
            marginTop: 5
        },

        contentPlaceholder: {
            display: 'block',
            margin: '0 auto',
            width: 630
        },

        textBlock: {
            marginTop: 15
        },

        topTextPlaceholder: {
            marginTop: 30,
            paddingBottom: 15,
            borderBottom: '1px solid lightgrey'
        }

    },

    onNumberClick: function(n){
        console.log(n);
    },

    render: function () {
        var texts = this.props.topTexts == undefined ? [] : this.props.topTexts;

        return (
            <div style={this.componentStyle.placeholder}>

                <SelfInitHeader logo={'http://beta.englishpatient.org/img/tsu_logo.png'} logoText={'Tomsk State University'}  />

                <TopBrandContainer />

                <div style={this.componentStyle.contentPlaceholder}>

                    <div style={this.componentStyle.topTextPlaceholder}>
                        {texts.map(function(t, k){
                            var name = t.name;
                            var text = t.text;
                            var key = 'top_text_' + k;
                            return (
                                <div style={this.componentStyle.textBlock} key={key} >
                                    {name == undefined || name == '' ? null :
                                        <div>
                                            <h3>{name}</h3>
                                        </div>
                                    }
                                    <p>
                                        <HidableText number={1700} text={text} />
                                    </p>
                                </div>
                            );

                        }, this)}

                    </div>

                    <div style={{marginTop: 40}}>
                        <SelfLoadingExercisesTabs selectedTab={this.props.randomNumber}
                                                  exercisesTabs={this.props.exercisesTabs} defaultTab={this.props.randomNumber} />
                    </div>

                </div>

            </div>
        );
    }

});

React.render(
    <TestApp />,
    document.getElementById('main')
);

