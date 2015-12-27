/**
 * Created by sabir on 26.12.15.
 */

var React = require('react');
var assign = require('object-assign');


var DurationsBar = React.createClass({
    getDefaultProps: function () {
        return {
            durations: [
                {
                    start: 0,
                    end: 4.5
                },
                {
                    start: 5,
                    end: 8
                },
                {
                    start: 9,
                    end: 15
                }
            ],
            selectedNumber: undefined,
            onItemClick: function(item){
                console.log('onItemClick: item = ', item);
            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: '#D8DADE',
            height: 20
        },

        itemStyle: {
            display: 'inline-block',
            borderRadius: 2,
            height: 20,
            cursor: 'pointer',
            boxSizing: 'border-box',
            border: '1px solid #EFF0F1',
            backgroundColor: '#D8DADE',
            opacity: 0.9
        },

        selected: {
            backgroundColor: '#2E3C54',
            opacity: 1
        }
    },

    onItemClick: function(item){
        this.props.onItemClick(item);
    },

    getList: function(){
        var arr = [];
        var list = this.props.durations;
        var duration = 0;
        for (var i in list){
            var d = list[i];
            duration = duration + (d.end - d.start);
            arr.push(assign({}, d, {number: i, duration: d.end - d.start}));
        }
        list = arr;
        arr = [];
        for (var i in list){
            var widthPercent = 1.0 * list[i].duration / duration;
            widthPercent = Math.floor(widthPercent * 100);
            widthPercent = widthPercent + '%';
            arr.push(assign({}, list[i], {style: {
                width: widthPercent
            }}));
        }
        return arr;
    },

    render: function () {
        var list = this.getList();

        return (
            <div style={this.componentStyle.placeholder}>
                {list.map(function(d, k){
                    var key = 'moses_bar_' + k;
                    var st = assign({}, this.componentStyle.itemStyle, d.style);
                    if (d.number == this.props.selectedNumber){
                        st = assign({}, st, this.componentStyle.selected);
                    }
                    var onClick = this.onItemClick.bind(this, d);
                    return (
                        <div key={key} style={st} onClick={onClick} >
                        </div>
                    );

                }, this)}
            </div>
        );
    }

});

module.exports = DurationsBar;