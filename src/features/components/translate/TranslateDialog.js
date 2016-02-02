/**
 * Created by sabir on 19.11.15.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../dialog/Dialog');

var TranslatePanel = require('./panel/TranslatePanel');

var TranslateDialog = React.createClass({
    getDefaultProps: function () {
        return {
            text: undefined,
            onClose: function(){

            }
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

        },

        dialogPanelStyle: {
            backgroundColor: 'transparent',
            width: 600,
            paddingRight: 25,
            paddingLeft: 25,
            paddingTop: 25,
            color: '#1B2432'
        }
    },

    getDialogContent: function(){
        return (
            <div>
                <TranslatePanel text={this.props.text} />
            </div>

        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <Dialog visible={true} dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        level={500}
                        content={this.getDialogContent()} onClose={this.props.onClose} />

            </div>
        );
    }

});

module.exports = TranslateDialog;