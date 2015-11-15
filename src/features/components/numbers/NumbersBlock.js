/**
 * Created by sabir on 30.09.15.
 */
var React = require('react');
var NumberItem = require('./NumberItem');
var assign = require('object-assign');


var NumbersBlock = React.createClass({
    getDefaultProps: function () {
        return {
            amount: 0,
            selectedNumber: undefined,
            passedNumbers: [],
            onItemClick: function(n){
                console.log('onItemClick: n = ' + n);
            },
            style: {

            }
        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function() {

    },

    isPassed: function(n){
        var list = this.props.passedNumbers;
        for (var i in list){
            if (list[i] == n){
                return true;
            }
        }
        return false;
    },

    isSelected: function(n){
        return (n == this.props.selectedNumber);
    },

    onItemClick: function(n){
        this.props.onItemClick(n);
    },

    componentStyle: {
        placeholder: {
            textAlign: 'center',
            maxWidth: 600,
            display: 'block',
            margin: '0 auto'
        }
    },

    render: function () {
        var list = [];
        for (var i=0; i < this.props.amount; i++){
            list.push(i);
        }
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        return (
            <div style={st}>
                {list.map(function(i){
                    var key = 'number_' + i;
                    var text = (i + 1) + '';
                    var boundClick = this.onItemClick.bind(this, i);
                    var passed = this.isPassed(i);
                    var selected = this.isSelected(i);
                    return (
                        <NumberItem passed={passed} selected={selected} key={key} onClick={boundClick} text={text} />
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = NumbersBlock;