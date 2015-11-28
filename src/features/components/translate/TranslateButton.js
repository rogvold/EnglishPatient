/**
 * Created by sabir on 19.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var TranslateDialog = require('./TranslateDialog');

var TranslateButton = React.createClass({
    getDefaultProps: function () {
        return {
            buttonName: 'Переводчик',
            buttonIcon: 'icon search',
            buttonClassName: 'ui basic button'
        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    onClick: function(){
        console.log('showing dialog');
        this.setState({
            dialogVisible: true
        });
    },

    onClose: function(){
        this.setState({
            dialogVisible: false
        });
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} onClick={this.onClick} >
                    <i className={this.props.buttonIcon} ></i>
                    {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <TranslateDialog onClose={this.onClose} />
                }

            </div>
        );
    }

});

module.exports = TranslateButton;