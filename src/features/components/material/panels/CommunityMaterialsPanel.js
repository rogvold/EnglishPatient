/**
 * Created by sabir on 14.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TeacherMaterialsPanel = require('./TeacherMaterialsPanel');

var CommunityMaterialsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MaterialsStore')],
    getDefaultProps: function(){
        return {

            searchQuery: undefined,
            searchLang: undefined

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('MaterialsStore');
        var loading = (store.materialsLoading || store.groupsLoading);

        var communityUsersIds = store.getCommunityUsersIds();

        return {
            loading: loading,
            communityUsersIds: communityUsersIds
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
            width: 882,
            margin: '0 auto'
        },

        listPlaceholder: {

        },

        item: {
            marginBottom: 10
        }
    },
    
    render: function(){
        var list = this.state.communityUsersIds;

        return (
            <div style={this.componentStyle.placeholder} >
                {list.map(function(userId, k){
                    var key = 'com_' + userId + '_' + k;
                    return (
                        <div style={this.componentStyle.item} key={key} >
                            <TeacherMaterialsPanel
                                searchQuery={this.props.searchQuery}
                                searchLang={this.props.searchLang}
                                teacherId={userId} />
                        </div>
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = CommunityMaterialsPanel;