/**
 * Created by sabir on 23.09.15.
 */
var React = require('react');

var PatientExerciseInput = React.createClass({
    getDefaultProps: function () {
        return {
            buttonText: 'ответить',
            buttonIcon: 'ui lightning circular icon ',
            placeholder: 'Ваш ответ...',
            onSubmit: function(text){
                console.log('onSubmit: text = ' + text);
            },
            disabled: false,
            userAnswer: undefined,
            number: undefined
        }
    },

    getInitialState: function () {
        var ans = this.props.userAnswer;
        return {
            value: (ans == undefined) ? '' : ans
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var ans = nextProps.userAnswer;
        var num = nextProps.number;
        console.log('PatientExerciseInput: num, ans = ', num, ans);
        console.log('PatientExerciseInput: this.props.number, this.props.userAnswer = ', this.props.number, this.props.userAnswer);

        if (num == this.props.number && ans == this.props.userAnswer){
            return;
        } //!

        //if (ans != this.props.userAnswer){
        //    this.setState({
        //        value: (ans == undefined) ? '' : ans
        //    });
        //}

        if (ans != this.state.value){
            this.setState({
                value: (ans == undefined) ? '' : ans
            });
        }
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 600,
            //border: '1px solid lightgrey',
            height: 70,
            boxSizing: 'border-box'
        },
        textarea: {
            width: 475,
            border: 'none',
            fontSize: 20,
            padding: 2,
            height: 70,
            lineHeight: '22px',
            outline: 'none',
            resize: 'none'
        },
        button: {
            fontSize: 18,
            borderTopRightRadius: 0
        }
    },

    onChange: function(evt){
        var val = evt.target.value;
        this.setState({
            value: val
        });
    },

    onClick: function(){
        var val = this.state.value;
        if (val == undefined){
            return;
        }
        val = val.trim();
        if (val == ''){
            return;
        }
        this.props.onSubmit(this.state.value);
    },

    render: function () {
        var buttonDisabled = (this.state.value == undefined || this.state.value.trim() == '');

        if (this.props.disabled == true){
            buttonDisabled = true;
        }

        return (
            <div style={this.componentStyle.placeholder} className={'ui fluid action input'}>
                    <textarea disabled={this.props.disabled} placeholder={this.props.placeholder}
                              style={this.componentStyle.textarea} value={this.state.value}
                              onChange={this.onChange} ></textarea>

                    <button disabled={buttonDisabled} className={'ui primary button'} style={this.componentStyle.button} onClick={this.onClick} >
                        <i className={this.props.buttonIcon}></i>
                        {this.props.buttonText}
                    </button>
            </div>
        );
    }

});

module.exports = PatientExerciseInput;