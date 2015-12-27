/**
 * Created by sabir on 27.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MosesTimeInput = React.createClass({
    getDefaultProps: function () {
        return {
            t: 0,
            dt: 0.05,
            onChange: function(t){

            }
        }
    },

    getInitialState: function () {
        return {
            t: this.props.t
        }
    },

    componentWillReceiveProps: function(nextProps) {
        var t = nextProps.t;
        console.log('MosesTimeInput: componentWillReceiveProps: t = ', t);
        if (t != this.props.t){
            this.setState({
                t: t,
            });
        }
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        inputPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        leftButtonPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        rightButtonPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        input: {
            width: 90,
            height: 26,
            textAlign: 'center',
            marginRight: 3
        }
    },

    onTimeChange: function(sign){
        if (sign == undefined){
            return;
        }
        var t = this.state.t;
        if (t == undefined){
            t = 0;
        }
        t = t + sign * this.props.dt;
        this.setState({
            t: t
        });
        this.props.onChange(t);
    },

    onChange: function(evt){
        var s = evt.target.value;
        s = s.trim();
        if (s == ''){
            s = '0';
        }
        if (isNaN(s) == true){
            return;
        }
        var t = parseFloat(s);
        this.setState({
            t: t
        });
        this.props.onChange(t);
    },

    render: function () {


        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.leftButtonPlaceholder}>
                    <button className={'ui button basic mini'}
                            style={{paddingLeft: 8, paddingRight: 4}}
                            onClick={this.onTimeChange.bind(this, -1)} >
                        <i className={'icon angle double left'} ></i>
                    </button>
                </div>

                <div style={this.componentStyle.inputPlaceholder}>
                    <div className={'ui form'} >
                        <input style={this.componentStyle.input} value={this.state.t} onChange={this.onChange}  />
                    </div>
                </div>

                <div style={this.componentStyle.rightButtonPlaceholder}>
                    <button className={'ui button basic mini'}
                            style={{paddingLeft: 4, paddingRight: 8}}
                            onClick={this.onTimeChange.bind(this, 1)} >
                        <i className={'icon angle double right'} ></i>
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = MosesTimeInput;