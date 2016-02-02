/**
 * Created by sabir on 02.02.16.
 */

var React = require('react');
var assign = require('object-assign');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var DialogsList = require('./DialogsList');

var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var DialogEditableViewPanel = require('../DialogEditableViewPanel');

var Dialog = require('../../dialog/Dialog');

var CommunityDialogsList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('DialogsStore')],
    getDefaultProps: function () {
        return {
            teacherId: undefined
        }
    },

    getInitialState: function () {
        return {

        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('DialogsStore');
        var teachersDialogsList = store.getCommunityTeachersDialogsList(this.props.teacherId);
        var loading = store.loading;
        return {
            loading: loading,
            teachersDialogsList: teachersDialogsList
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        selectedDialog: undefined
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 850,
            margin: '0 auto',
            minHeight: 100
        },

        listPlaceholder: {

        },

        itemPlaceholder: {
            marginTop: 5,
            backgroundColor: 'white'
        },

        dialogsList: {

        },

        headerPlaceholder: {
            padding: 5
        },

        dialogPanelStyle: {
            width: 900,
            textAlign: 'left'
        },

    },

    onItemClick: function(d){
        this.setState({
            selectedDialog: d
        });
    },

    onClose: function(){
        this.setState({
            selectedDialog: undefined
        });
    },

    getDialogContent: function(){
        var dialog = this.state.selectedDialog;
        return (
            <div>
                {dialog == undefined ? null :
                    <DialogEditableViewPanel userId={this.props.teacherId}
                                             dialog={dialog} />
                }
            </div>
        );
    },

    render: function () {
        var list = (this.state.teachersDialogsList == undefined) ? [] : this.state.teachersDialogsList;
        console.log('rendering CommunityDialogsList: list = ', list);
        console.log('loading = ', this.state.loading);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(g, k){
                        var key = 'com_d_' + k;
                        var userId = g.userId;
                        var dialogs = g.dialogs;
                        var customInfoHtml = 'Создано диалогов: <b>' + dialogs.length + '</b>';

                        return (
                            <div style={this.componentStyle.itemPlaceholder}>

                                <div style={this.componentStyle.headerPlaceholder}>
                                    <UserCommunityHeaderPanel
                                        customInfoHtml={customInfoHtml}
                                        userId={userId} />
                                </div>

                                <div style={this.componentStyle.dialogsList}>
                                    <DialogsList onItemClick={this.onItemClick} dialogs={dialogs} />
                                </div>

                            </div>
                        );

                    }, this)}

                </div>

                {this.state.selectedDialog == undefined ? null :
                    <Dialog visible={true}
                            content={this.getDialogContent()}
                            onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CommunityDialogsList;