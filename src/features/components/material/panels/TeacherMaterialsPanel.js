/**
 * Created by sabir on 14.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserCommunityHeaderPanel = require('../../user_interface/UserCommunityHeaderPanel');

var CoolPreloader = require('../../preloader/CoolPreloader');

var MaterialsBunch = require('../list/MaterialsBunch');

var LoginMixin = require('../../../mixins/LoginMixin');

var MaterialsManagementPanel = require('./MaterialsManagementPanel');

var TeacherMaterialsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MaterialsStore')],
    getDefaultProps: function(){
        return {
            teacherId: undefined,

            searchQuery: undefined,
            searchLang: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('MaterialsStore');
        var loading = (store.materialsLoading || store.groupsLoading);
        return {
            loading: loading
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
            position: 'relative',
            minHeight: 70,
            padding: 5,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            margin: '0 auto',
            width: 882
        },

        headerPlaceholder: {
            padding: 10,
            backgroundColor: 'white'
        },

        panelPlaceholder: {

        },

        item: {

        }
    },

    onMaterialClick: function(){

    },

    getGroupsFactoryList: function(){
        var currentUser = this.getFlux().store('UsersStore').getCurrentUser();
        var currentUserId = (currentUser == undefined) ? undefined : currentUser.id;
        if (currentUserId == undefined){
            return [];
        }
        var fac = [];
        var store = this.getFlux().store('MaterialsStore');
        var showEmpty = (currentUser == this.props.teacherId && (this.props.searchQuery == undefined || this.props.searchQuery.trim() == '' ) );


        if (this.props.teacherId != currentUserId){
            fac = store.getTeacherPublicGroupsFactoryList(this.props.teacherId);
        }else {
            fac = store.getTopicGroupsFactoryList(undefined, currentUserId, showEmpty)
        }
        fac = store.filterGroupsFactoryListWithSearch(fac, this.props.searchQuery, this.props.searchLang);
        return fac;
    },

    getMaterialsNumber: function(fac){
        var map = {};
        for (var i in fac){
            var materials = fac[i].materials;
            for (var j in materials){
                map[materials[j].id] = 1;
            }
        }
        var n = 0;
        for (var key in map){
            n++;
        }
        return n;
    },

    isCurrentUser: function(){
        var currentUserId = LoginMixin.getCurrentUserId();
        return (this.props.teacherId == currentUserId);
    },

    getAllGroupsList: function(){
        var store = this.getFlux().store('MaterialsStore');
        var groups = store.getTopicGroups(undefined);
        return groups;
    },

    render: function(){
        var list = this.getGroupsFactoryList();
        var n = this.getMaterialsNumber(list);
        var customInfoHtml = 'Количество материалов: <b>' + n + '</b>';
        var isCurrentUser = this.isCurrentUser();
        var showEmptyGroup = (isCurrentUser == true && (this.props.searchQuery == undefined || this.props.searchQuery.trim() == ''));

        return (
            <div style={this.componentStyle.placeholder} >

                {isCurrentUser == false ? null :
                    <MaterialsManagementPanel />
                }

                <div style={this.componentStyle.headerPlaceholder}>
                    <UserCommunityHeaderPanel
                        customInfoHtml={customInfoHtml}
                        userId={this.props.teacherId} />
                </div>

                <div style={this.componentStyle.panelPlaceholder}>
                    {list.map(function(item, k){
                        var group = item.group;
                        var materials = item.materials;
                        var groupId = (group == undefined) ? 'u' : group.id;
                        var key = 'bunch_' + groupId + '_' + k;
                        return (
                            <div key={key} style={this.componentStyle.item}>
                                <MaterialsBunch materials={materials} showEmptyGroup={showEmptyGroup}
                                                allGroupsList={this.getAllGroupsList()}
                                                teacherId={this.props.teacherId} name={group.name}
                                                description={group.description}
                                                groupId={groupId} onMaterialClick={this.onMaterialClick} />
                            </div>
                        );
                    }, this)}

                    {this.state.loading == false ? null :
                        <CoolPreloader />
                    }

                </div>

            </div>
        );
    }

});

module.exports = TeacherMaterialsPanel;