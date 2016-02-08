/**
 * Created by sabir on 27.12.15.
 */

var React = require('react');
var assign = require('object-assign');

var MosesTimeInput = require('./MosesTimeInput');

var MosesTimePanel = React.createClass({
    getDefaultProps: function () {
        return {
            start: 0,
            end: 0,
            text: undefined,
            dt: 0.05,

            active: false,

            textEnabled: true,

            onChange: function(data){

            }
        }
    },

    getInitialState: function () {
        return {
            start: this.props.start,
            end: this.props.end,
            text: this.props.text
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var start = nextProps.start;
        var end = nextProps.end;
        var text = nextProps.text;
        console.log('MosesTimePanel: componentWillReceiveProps: start, end, text = ', start, end, text);
        if (start != this.props.start || end != this.props.end || text != this.props.text){
            this.setState({
                start: start,
                end: end,
                text: text
            });
        }
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 700,
            padding: 5,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 3
        },

        startPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        endPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        inputPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: 15
        },

        dash: {
            width: 20,
            lineHeight: '26px',
            textAlign: 'center',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        input: {
            height: 26,
            width: 353
        },

        active: {
            backgroundColor: '#ADB2BB',
            color: 'white'
        }
    },

    onStartChange: function(t){
        var start = this.state.start == undefined ? 0 : +this.state.start;
        var end = this.state.end == undefined ? 0 : +this.state.end;
        if (+t > end || +t < 0){
            return;
        }
        this.setState({
            start: +t
        });
        this.onChange({start: +t});
    },

    onEndChange: function(t){
        var start = this.state.start == undefined ? 0 : +this.state.start;
        var end = this.state.end == undefined ? 0 : +this.state.end;
        if (+t < start || +t < 0){
            return;
        }
        this.setState({
            end: +t
        });
        this.onChange({end: +t});
    },

    onTextChange: function(evt){
        var text = evt.target.value;
        this.setState({
            text: text
        });
        this.onChange({text: text});
    },

    getData: function(){
        var data = {
            start: this.state.start,
            end: this.state.end,
            text: this.state.text
        };
        return data;
    },

    onChange: function(d){
        var data = this.getData();
        data = assign({}, data, d);
        console.log('onChange: data = ', data);
        this.props.onChange(data);
    },

    render: function () {
        var st = this.componentStyle.placeholder;
        if (this.props.active == true){
            st = assign({}, st, this.componentStyle.active);
        }

        var placeholderSt = assign({}, this.componentStyle.placeholder);
        if (this.props.textEnabled == false){
            placeholderSt = assign({}, placeholderSt, {width: 'auto', textAlign: 'center'});
        }

        placeholderSt = assign({}, st, placeholderSt);

        return (
            <div style={placeholderSt}>

                <div style={this.componentStyle.startPlaceholder}>
                    <MosesTimeInput placeholder={'Start'}
                                    dt={this.props.dt} t={this.state.start} onChange={this.onStartChange} />
                </div>

                <div style={this.componentStyle.dash}>
                    -
                </div>

                <div style={this.componentStyle.endPlaceholder}>
                    <MosesTimeInput placeholder={'End'}
                        dt={this.props.dt} t={this.state.end} onChange={this.onEndChange} />
                </div>

                {this.props.textEnabled == false ? null :
                    <div style={this.componentStyle.inputPlaceholder}>
                        <div className={'ui form'} >
                            <input value={this.state.text} placeholder={'Text'}
                                   style={this.componentStyle.input}
                                   onChange={this.onTextChange} />
                        </div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = MosesTimePanel;