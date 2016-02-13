/**
 * Created by sabir on 11.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ComposeEmailPanel = require('./ComposeEmailPanel');
var Dialog = require('../dialog/Dialog');

var MailComponent = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MailStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('MailStore');
        return {
            dialogVisible: store.dialogVisible
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        dialogPanelStyle: {
            width: 650
        }
    },

    onClose: function(){
        this.getFlux().actions.closeSendMailDialog();
    },

    getDialogContent: function(){
        return (
            <div>
                <ComposeEmailPanel />
            </div>
        );
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={true}
                            content={this.getDialogContent()}
                            onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = MailComponent;