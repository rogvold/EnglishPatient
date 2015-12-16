/**
 * Created by sabir on 14.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var LineChart = require("react-chartjs").Line;
var moment = require('moment');

var ExercisesProgressChart = React.createClass({
    getDefaultProps: function () {
        return {
            userAnswers: [],
            daysNumber: 7,
            ticksNumber: 7
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
            height: '100%'

        },

        noDataPanel: {
            color: '#A1A4AA',
            textAlign: 'center',
            paddingTop: 150,
            paddingBottom: 150,
            fontSize: 26
        }
    },



    getDaysArray: function(){
        var arr = [];
        var list = this.props.userAnswers;
        var daysMap = {};
        var minStart = +moment().startOf('day').format('x');
        var maxStart = 0;
        for (var i in list){
            var t = list[i].timestamp;
            var start = +moment(t).startOf('day').format('x');
            if (start < minStart){
                minStart = start;
            }
            if (start > maxStart){
                maxStart = start;
            }
            if (daysMap[start] == undefined){
                daysMap[start] = {
                    answers: []
                }
            }
            daysMap[start].answers.push(list[i]);
        }
        if (maxStart == 0){
            return [];
        }
        maxStart = +moment().startOf('day').format('x');
        var dayT = 24 * 60 * 60 * 1000;
        var t = minStart - 1000 * dayT ;
        while (t <= maxStart){
            if (daysMap[t] == undefined){
                daysMap[t] = {
                    answers: []
                }
            }
            t+=dayT;
        }

        for (var key in daysMap){
            arr.push({
                timestamp: key,
                number: daysMap[key].answers.length
            });
        }
        arr.sort(function(a, b){
            return a.timestamp - b.timestamp;
        });
        return arr;
    },

    getDataForLastNDays: function(n){
        var list = this.getDaysArray();
        var arr = [];
        var start = +moment().subtract(n, 'days').startOf('day').format('x');
        for (var i in list){
            if (list[i].timestamp >= start){
                arr.push(list[i]);
            }
        }
        return arr;
    },

    getChartData: function(){
        var chartData = {};
        var daysArray = this.getDaysArray();
        var n = daysArray.length;
        var ticksNumber = this.props.ticksNumber;
        var step = 1;

        n = this.props.daysNumber;

        step = Math.floor(n / ticksNumber);
        daysArray = this.getDataForLastNDays(n);

        var chartData = {
            //labels: daysArray.map(function(d){return d.timestamp}),
            labels: daysArray.map(function(d, k){
                if (k % step == 0) {
                    return moment(+d.timestamp).format('D MMM')
                }
                if (k % Math.floor(step / 2.0) == 0){
                    return moment(+d.timestamp).format('D')
                }
                return '';
            }),
            pointDot : false,
            pointDotRadius: 1,
            datasets: [{
                //fillColor: "rgba(151,187,205,0.2)",
                fillColor: "rgba(46, 60, 84, 0.2)",
                //strokeColor: "rgba(151,187,205,1)",
                //pointColor: "rgba(151,187,205,1)",

                strokeColor: "rgba(46, 60, 84, 0.6)",
                //pointColor: "rgba(46, 60, 84, 0.6)",

                //pointStrokeColor: "#fff",
                //pointHighlightFill: "#fff",
                //pointHighlightStroke: "rgba(151,187,205,1)",
                pointHighlightStroke: "#FC636B",
                pointDotRadius: 1,
                pointDot: false,
                data: daysArray.map(function(d){return d.number})
            }]
        };
        return chartData;
    },

    chartIsEmpty: function(chartData){
        var list = chartData.datasets[0].data;
        var n = 0;
        for (var i in list){
            n+= list[i];
        }
        if (n == 0){
            return true;
        }
        return false;
    },

    render: function () {


        var chartOptions = {
            pointDotRadius: 1
        };

        var chartData = this.getChartData();

        //var hasData = (chartData.datasets[0].data.length > 0);
        var hasData = !this.chartIsEmpty(chartData);

        return (
            <div style={this.componentStyle.placeholder}>

                {(hasData == false) ?
                    <div style={this.componentStyle.noDataPanel}>
                        No data...
                    </div>
                    :
                    <LineChart width={600} height={300} data={chartData} redraw options={chartOptions}/>
                }

            </div>
        );
    }

});

module.exports = ExercisesProgressChart;