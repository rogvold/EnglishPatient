/**
 * Created by sabir on 15.12.15.
 */

var React = require('react');
var assign = require('object-assign');
var ExerciseMixin = require('../../mixins/ExerciseMixin');

var ExercisesProgressChart = require('./ExercisesProgressChart');

var SelfLoadingUserProgressPanel = React.createClass({
    getDefaultProps: function () {
        return {
            userId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            answers: [],
            daysNumber: 30
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var userId = this.props.userId;
        this.load(userId, function(data){
            console.log('data loaded: ', data);
        });
    },

    load: function(userId, callback){
        if (userId == undefined){
            return;
        }
        this.setState({
            loading: true,
            answers: []
        });
        ExerciseMixin.loadAllUserAnswers(userId, function(answers){
            this.setState({
                loading: false,
                answers: answers
            });
            callback(answers);
        }.bind(this));
    },

    componentStyle: {
        placeholder: {
            width: 630,
            padding: 5,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            margin: '0 auto'
        },

        tabItem: {
            color: '#A1A4AA',
            padding: 5,
            cursor: 'pointer',
            display: 'inline-block',
            margin: 10,
            marginBottom: 0
        },

        tabItemsPanel: {
            textAlign: 'center',
            padding: 5
        },

        active: {
            fontWeight: 'bold',
            borderBottom: '3px solid #FC636B',
            color: '#1B2432'
        },

        chartPlaceholder: {

        }
    },

    switchDaysNumber: function(daysNumber){
        console.log('switchDaysNumber occured: ', daysNumber);
        this.setState({
            daysNumber: +daysNumber
        });
    },

    render: function () {
        var daysNumber = this.state.daysNumber;
        var activeSt = this.componentStyle.active;

        console.log('daysNumber = ' + daysNumber);
        var st7 = (daysNumber == 7) ? activeSt : {};
        var st30 = (daysNumber == 30) ? activeSt : {};
        var st100 = (daysNumber == 100) ? activeSt : {};

        st7 = assign({}, this.componentStyle.tabItem, st7);
        st30 = assign({}, this.componentStyle.tabItem, st30);
        st100 = assign({}, this.componentStyle.tabItem, st100);

        console.log('styles: ', st7, st30, st100);


        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.tabItemsPanel}>

                    <div onClick={this.switchDaysNumber.bind(this, 7)}
                         style={st7}>
                        7 дней
                    </div>

                    <div onClick={this.switchDaysNumber.bind(this, 30)}
                         style={st30}>
                        30 дней
                    </div>

                    <div onClick={this.switchDaysNumber.bind(this, 100)}
                         style={st100}>
                        100 дней
                    </div>

                </div>

                <div style={this.componentStyle.chartPlaceholder}>

                    <ExercisesProgressChart
                        daysNumber={this.state.daysNumber}
                        userAnswers={this.state.answers} />

                </div>



                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>
            </div>
        );
    }

});

module.exports = SelfLoadingUserProgressPanel;