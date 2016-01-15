/**
 * Created by sabir on 14.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var CreateClassAreaWrapper = require('./CreateClassAreaWrapper');

var ClassMixin = require('../../../mixins/ClassMixin');

var CoolPreloader = require('../../preloader/CoolPreloader');

var LoginMixin = require('../../../mixins/LoginMixin');

var YouHaveNoClassesPanel = React.createClass({
    getDefaultProps: function () {
        return {

        }
    },

    getInitialState: function () {
        return {
            loading: false,
            visible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load();
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: '100%',
            //width: 850,
            borderRadius: 2,
            padding: 10,
            //minWidth: 900,
            margin: '0 auto',
            border: '1px solid #EFF0F1',
            backgroundColor: 'white',
            minHeight: 85,
            height: 85
        },

        left: {
            width: 90,
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        middle: {
            height: '100%',
            paddingLeft: 10,
            width: 500,
            display: 'inline-block',
            verticalAlign: 'top'
        },

        contentPlaceholder:{
            width: 600
        },

        firstLine: {
            fontSize: 18,
            //fontWeight: 'bold',
            marginBottom: 5
        },

        secondLine: {
            fontSize: 14
        },

        buttonPlaceholder: {
            padding: 12,
            paddingLeft: 20,
            paddingRight: 0,
            textAlign: 'center'
        }

    },


    load: function(){
        var userId = LoginMixin.getCurrentUser().id;
        this.setState({
            loading: false
        });
        ClassMixin.loadTeacherClasses(userId, function(list){
            if (list == undefined){
                list = [];
            }
            var visible = (list.length == 0);
            this.setState({
                loading: false,
                visible: visible
            });
        }.bind(this));
    },


    render: function () {
        var st = assign({}, this.componentStyle.placeholder);
        if (this.state.visible == false){
            st = assign({}, st, {display: 'none'});
        }
        return (
            <div style={st}>

                <div style={this.componentStyle.left}>
                    <BackgroundImageContainer
                        image={'http://www.englishpatient.org/app/assets/images/smile_pc2.png'} />
                </div>

                <div style={this.componentStyle.middle}>
                    <div style={this.componentStyle.firstLine}>
                        Создайте класс
                    </div>

                    <div style={this.componentStyle.secondLine}>
                        Каждый ученик должен состоять в каком-то классе
                        (даже, если он там будет единственным).
                        У Вас еще нет ни одного класса. Создайте его.
                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.buttonPlaceholder}>
                        <CreateClassAreaWrapper >
                            <button className={'ui patientPrimary button'} >
                                СОЗДАТЬ КЛАСС <i className={'icon arrow right'} ></i>
                            </button>
                        </CreateClassAreaWrapper>
                    </div>

                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = YouHaveNoClassesPanel;