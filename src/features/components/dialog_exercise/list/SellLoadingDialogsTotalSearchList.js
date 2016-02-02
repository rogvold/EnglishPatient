/**
 * Created by sabir on 02.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var SelectableDialogsList = require('./SelectableDialogsList');

var SelfLoadingDialogsTotalSearchList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('DialogsStore')],
    getDefaultProps: function(){
        return {
            onSelect: function(d){
                console.log('SellLoadingDialogsTotalSearchList: onSelect default: d = ', d);
            }
        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('DialogsStore');
        var loading = store.loading;
        var teachersDialogsList = store.getCommunityTeachersDialogsList();

        return {
            loading: loading,
            teachersDialogsList: teachersDialogsList
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

        headPlaceholder: {
            padding: 5
        },

        itemPlaceholder: {
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'white'
        },

        dialogsPlaceholder: {

        }

    },

    onSelect: function(d){
        this.props.onSelect(d);
    },

    render: function(){
        var list = this.state.teachersDialogsList;

        return (
            <div style={this.componentStyle.placeholder} >

                {list.map(function(g, k){
                    var key = 'sel_d_list_' + k;
                    var userId = g.userId;
                    var dialogs = g.dialogs;
                    var customInfoHtml = 'Найдено диалогов: <b>'+ dialogs.length +'</b>';

                    return (
                        <div style={this.componentStyle.itemPlaceholder}>

                            <div style={this.componentStyle.headPlaceholder}>
                                <UserCommunityHeaderPanel
                                    customInfoHtml={customInfoHtml}
                                    userId={userId} />
                            </div>

                            <div style={this.componentStyle.dialogsPlaceholder}>
                                <SelectableDialogsList dialogs={dialogs} onSelect={this.onSelect} />
                            </div>

                        </div>
                    );



                }, this)}

            </div>
        );
    }

});

module.exports = SelfLoadingDialogsTotalSearchList;