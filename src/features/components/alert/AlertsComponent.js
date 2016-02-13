/**
 * Created by sabir on 10.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Notifications = require('react-notifications');

var AlertsComponent = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('AlertsStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('AlertsStore');
        var notifications = store.notifications;
        return {
            notifications: notifications
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

    onRequestHide: function(notification){
        this.getFlux().actions.hideAlertNotification(notification.id);
    },

    componentStyle: {
        placeholder: {

        }
    },

    render: function(){
        var notifications = this.state.notifications;
        var leaveTimeout = this.getFlux().store('AlertsStore').timeout;

        return (
            <div style={this.componentStyle.placeholder} >
                <Notifications notifications={notifications} leaveTimeout={leaveTimeout}
                               onRequestHide={this.onRequestHide} />
            </div>
        );
    }

});

module.exports = AlertsComponent;