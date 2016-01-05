/**
 * Created by sabir on 01.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var PatientCarousel = React.createClass({
    getDefaultProps: function () {
        return {
            innerChildren: [],
            sliderDuration: 7000
        }
    },

    getInitialState: function () {
        return {
            activeNumber: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.initTimer();
    },

    componentStyle: {
        placeholder: {
            width: 900,
            margin: '0 auto',
            marginTop: 30
        },

        leftButtonPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 40,
            fontSize: 25,
            padding: 10,
            paddingTop: 115,
            cursor: 'pointer'
        },

        contentPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 820,
            minHeight: 400
        },

        rightButtonPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 40,
            fontSize: 25,
            padding: 10,
            paddingTop: 115,
            cursor: 'pointer'
        }

    },

    initTimer: function(){
        this.intervalId = setInterval(function(){
            this.next();
        }.bind(this), this.props.sliderDuration);
    },

    destroyTimer: function(){
        if (this.intervalId != undefined){
            clearInterval(this.intervalId );
        }
    },

    componentWillUnmount: function(){
        this.destroyTimer();
    },

    getActiveSlide: function(){
        var list = (this.props.innerChildren == undefined) ? [] : this.props.innerChildren;
        var n = this.state.activeNumber;
        if (n == undefined){
            n = 0;
        }
        if (list.length == 0){
            return undefined;
        }
        console.log('getting active slide: n = ' + n);
        var res = list[n];
        return res;
    },

    next: function(mode){
        console.log('next occured');
        var list = this.props.innerChildren;
        var n = this.state.activeNumber;
        if (n == undefined){
            n = 0;
        }
        n = (n + 1) % list.length;
        console.log('new n = ', n);
        if (mode == 'click'){
            this.destroyTimer();
        }
        this.setState({
            activeNumber: n
        });
    },

    prev: function(mode){
        console.log('prev occured');
        var list = (this.props.innerChildren == undefined) ? [] : this.props.innerChildren;
        var n = this.state.activeNumber;
        if (n == undefined){
            n = 0;
        }
        n = (n + list.length - 1) % list.length;
        console.log('new n = ', n);
        if (mode == 'click'){
            this.destroyTimer();
        }
        this.setState({
            activeNumber: n
        });
    },

    render: function () {
        var list = this.props.innerChildren;
        var slide = this.getActiveSlide();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.leftButtonPlaceholder}  onClick={this.prev.bind(this, 'click')} >
                    <i className={'icon chevron circle left'} ></i>
                </div>

                <div style={this.componentStyle.contentPlaceholder}>
                    {slide}
                </div>

                <div style={this.componentStyle.rightButtonPlaceholder} onClick={this.next.bind(this, 'click')} >
                    <i className={'icon chevron circle right'}  ></i>
                </div>


            </div>
        );
    }

});

module.exports = PatientCarousel;