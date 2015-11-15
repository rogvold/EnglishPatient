/**
 * Created by sabir on 17.09.15.
 */
var React = require('react');
var assign = require('object-assign');

var RecordStopButton = React.createClass({
    getDefaultProps: function () {
        return {
            recordClicked: function(){

            },
            stopClicked: function(){

            },
            disabled: false,
            recordButtonName: 'record',
            stopButtonName: 'stop',
            disabled: false,
            mode: 'record'

        }
    },

    getInitialState: function () {
        return {
            mode: 'record'
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.mode != undefined){
            if (nextProps.mode != this.props.mode){
                this.setState({
                    mode: nextProps.mode
                });
            }
        }
    },

    componentDidMount: function () {

    },

    onRecord: function(){
        this.setState({
            mode: 'stop'
        });
        this.props.recordClicked();
    },

    onStop: function(){
        this.setState({
            mode: 'record'
        });
        this.props.stopClicked();
    },

    _onClick: function(){
        if (this.state.mode == 'record'){
            this.onRecord();
        }
        if (this.state.mode == 'stop'){
            this.onStop();
        }
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },
        button: {
            display: 'inline-block',
            textAlign: 'center'
        },
        disabled: {
            opacity: 0.5
        }
    },

    render: function () {
        var style = assign({}, this.componentStyle.placeholder);
        if (this.props.disabled == true){
            style = assign({}, this.componentStyle.disabled);
        }
        return (
            <div style={style} onClick={this._onClick} className={'ui basic blue button'}>
                <div disabled={this.props.disabled}  style={this.componentStyle.button}  >
                    {this.state.mode == 'record' ?
                        <span>
                            <i className={'ui icon unmute'}></i> {this.props.recordButtonName}
                        </span>
                        :
                        <span>
                            <i className={'ui icon stop'}></i> {this.props.stopButtonName}
                        </span>
                    }
                </div>
            </div>
        );
    }

});

module.exports = RecordStopButton;