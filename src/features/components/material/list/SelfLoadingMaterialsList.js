/**
 * Created by sabir on 24.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var TopicsMixin = require('../../../mixins/TopicsMixin');

var PagedCardsList = require('./PagedCardsList');

var MaterialsBunch = require('./MaterialsBunch');

var MaterialCreateButton = require('../buttons/MaterialCreateButton');

var MaterialGroupCreateButton = require('../buttons/MaterialGroupCreateButton');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var LoginMixin = require('../../../mixins/LoginMixin');

var SelfLoadingMaterialsList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MaterialsStore', 'UsersStore', 'TopicsStore')],

    getDefaultProps: function(){
        return {
            teacherId: undefined,
            topicId: undefined,

            editMode: true,

            searchMode: false,

            showUnsorted: true,

            onMaterialUpdated: function(data){

            }
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        if (flux == undefined){
            console.log('!!!---!!!--- SelfLoadingMaterialsList: getStateFromFlux: flux is undefined');
            return;
        }
        var usersStore = flux.store('UsersStore');
        var topicsStore = flux.store('TopicsStore');
        var usersLoading = usersStore.loading;
        var store = flux.store('MaterialsStore');
        var state = flux.store('MaterialsStore').getState();
        var topicId = this.props.topicId;
        var loading = (store.groupsLoading || store.materialsLoading || usersLoading || topicsStore.loading);
        return {
            fluxGroupsFactoryList: store.getTopicGroupsFactoryList(topicId, this.props.teacherId),
            //groupsLoading: store.groupsLoading,
            //materialsLoading: store.materialsLoading,
            loading: loading
        }
    },

    getInitialState: function () {
        return {
            //loading: false,
            materials: [],
            groupsFactoryList: [],
            query: '',
            searchGroupsFactoryList: []
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var teacherId = nextProps.teacherId;
        var topicId = nextProps.topicId;

        if (teacherId == this.props.teacherId && topicId == this.props.topicId){
            return;
        }

        //this.load(teacherId, topicId, function(materials){
        //    console.log('materials loaded: ', materials);
        //});
        this.resetSearch();
    },

    componentDidMount: function () {
        //this.load(this.props.teacherId, this.props.topicId, function(arr){
        //    console.log('data loaded: ', arr);
        //}.bind(this));
        this.resetSearch();
    },

    load: function(teacherId, topicId, callback){
        this.setState({
            loading: true
        });
        var self = this;
        if (topicId != undefined){
            TopicsMixin.loadTopicGroupsAndMaterials(topicId, function(arr){
                self.setState({
                    loading: false,
                    query: '',
                    groupsFactoryList: arr,
                    searchGroupsFactoryList: arr,
                });
                callback(arr);
            });
        }else {
            MaterialsMixin.loadGroupsAndMaterials(teacherId, topicId, function(arr){
                self.setState({
                    loading: false,
                    query: '',
                    groupsFactoryList: arr,
                    searchGroupsFactoryList: arr,
                });
                callback(arr);
            });
        }

    },

    resetSearch: function(){
        setTimeout(function(){
            this.setState({
                query: '',
                searchGroupsFactoryList: this.state.fluxGroupsFactoryList
            });
        }.bind(this), 300);
    },

    getSearchNumber: function(){
        var map = {};
        var gList = this.state.searchGroupsFactoryList;
        for (var i in gList){
            var materials = gList[i].materials;
            for (var j in materials){
                map[materials[j].id] = 1;
            }
        }
        var k = 0;
        for (var key in map){
            k++;
        }
        return k;
    },

    search: function(q){
        if (q == undefined || q.trim() == ''){
            this.setState({
                //searchGroupsFactoryList: this.state.groupsFactoryList,
                searchGroupsFactoryList: this.state.fluxGroupsFactoryList, //!!!
                query: q
            });
            return;
        }

        var qq = q.trim().toLowerCase();
        console.log('[SEARCH]: ', qq);
        var showEmptyGroups = (qq == undefined || qq == '');
        //var l = MaterialsMixin.searchInGroupsFactoryList(this.state.groupsFactoryList, qq);
        var l = MaterialsMixin.searchInGroupsFactoryList(this.state.fluxGroupsFactoryList, qq, showEmptyGroups); //!!!
        this.setState({
            searchGroupsFactoryList: l,
            query: q
        });
    },

    onMaterialUpdated: function(data){
        //var arr = MaterialsMixin.updateGroupsFactoryListWithMaterial(this.state.groupsFactoryList, data);
        var arr = MaterialsMixin.updateGroupsFactoryListWithMaterial(this.state.fluxGroupsFactoryList, data); //!!!
        var l = MaterialsMixin.searchInGroupsFactoryList(arr, this.state.query);
        this.setState({
            groupsFactoryList: arr,
            searchGroupsFactoryList: l
        });
    },

    onMaterialDeleted: function(){
        //this.load(this.props.teacherId, this.props.topicId, function(data){
        //    console.log('loaded: ', data);
        //});
        this.resetSearch();
    },

    onMaterialCreated: function(data){
        this.onMaterialUpdated(data);
    },

    onGroupUpdated: function(data){
        console.log('SelfLoadingMaterialsList: onGroupUpdated: data = ', data);
        //var list = this.state.groupsFactoryList;
        var list = this.state.searchGroupsFactoryList;
        var arr = [];
        for (var i in list){
            var group = list[i].group;
            if (group.id == data.id){
                arr.push({
                    group: data,
                    materials: list[i].materials
                });
                continue;
            }
            arr.push(list[i]);
        }
        this.setState({
            groupsFactoryList: arr
        });
    },


    onGroupCreated: function(){
        this.onGroupDeleted();
    },

    onGroupDeleted: function(groupId){
        this.resetSearch();
        //this.load(this.props.teacherId, this.props.topicId, function(data){
        //    console.log('loaded: ', data);
        //});

        //window.location.reload();
    },

    getAllGroupsList: function(){
        //var list = this.state.groupsFactoryList;
        var list = this.state.fluxGroupsFactoryList;
        var arr = list.map(function(item){return item.group});
        console.log('all groups: ', arr);
        return arr;
    },

    onQueryChange: function(evt){
        var val = evt.target.value;
        console.log('searching: ', val);
        this.search(val);
    },

    getBunchesContent: function(){
        //var list = this.state.groupsFactoryList;
        var list = this.state.searchGroupsFactoryList;
        var query = this.state.query;
        var showEmptyGroup = (query == undefined || query.trim() == '');
        console.log('SelfLoadingMaterialsList: getBunchesContent occured: groupsFactoryList = ', list);
        var c = list.map(function(g, k){
            var key = 'bunch_' + k + '_' + g.group.id;
            var group = g.group;
            //var onMaterialUpdated = this.onMaterialUpdated.bind(this);
            //var onGroupUpdated = this.onGroupUpdated.bind(this);
            var onGroupDeleted = this.onGroupDeleted.bind(this, g.group.id);
            var allGroupsList = this.getAllGroupsList();
            if ((this.props.showUnsorted == false) && (group.id == undefined)){
                return null;
            }

            if ((g.materials == undefined) || ((g.materials.length == 0))){
                if (showEmptyGroup == false){
                    return null;
                }
            }

            return (
                <MaterialsBunch allGroupsList={allGroupsList} key={key}
                                onGroupUpdated={this.onGroupUpdated} onGroupDeleted={this.onGroupDeleted}
                                onMaterialUpdated={this.onMaterialUpdated} onMaterialDeleted={this.onMaterialDeleted}
                                materials={g.materials}
                                showEmptyGroup={showEmptyGroup}
                                groupId={group.id} teacherId={this.props.teacherId} name={group.name}
                                description={group.description} editMode={this.props.editMode} />
            );
        }, this);

        return (
            <div>{c}</div>
        );
    },

    componentStyle: {
        placeholder: {
            //width: 865,
            width: 870,
            position: 'relative',
            //paddingLeft: 8,
            margin: '0 auto',
            backgroundColor: 'white'
        },

        contentPlaceholder: {

        },

        createNewBlock: {
            padding: 5,
            height: 47,
            position: 'relative',
            borderBottom: '1px solid #EFF0F1'
        },

        buttonsPlaceholder: {
            position: 'absolute',
            right: 0,
            top: 5
        },

        searchPlaceholder: {

        }
    },

    componentWillUpdate: function(nextProps, nextState){
        var oldLoading = this.state.loading;
        var newLoading = nextState.loading;
        if (newLoading == false && oldLoading == true){
            this.resetSearch();
        }
    },


    render: function () {
        var bunches = this.getBunchesContent();
        console.log('rendering SelfLoadingMaterialsList: topicId = ', this.props.topicId);
        var editMode = false;
        var user = LoginMixin.getCurrentUser();
        var currentUserId = (user == undefined) ? undefined : user.id;
        if (currentUserId == this.props.teacherId){
            editMode = true;
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createNewBlock}>

                    {editMode == false ? null :
                        <div style={this.componentStyle.buttonsPlaceholder}>

                            <MaterialCreateButton onMaterialCreated={this.onMaterialCreated}
                                                  teacherId={this.props.teacherId}
                                                  topicId={this.props.topicId}
                                                  allGroupsList={this.getAllGroupsList()}
                                />

                            <MaterialGroupCreateButton teacherId={this.props.teacherId}
                                                       topicId={this.props.topicId}
                                                       onGroupCreated={this.onGroupCreated}
                                />

                        </div>
                    }

                    {this.props.searchMode == false ? null :
                        <div style={this.componentStyle.searchPlaceholder}>
                            <div className={'ui form'} style={{width: 350}} >
                                <div className="ui left icon input">
                                    <i className="search icon"></i>
                                    <input type="text" value={this.state.query}
                                           onChange={this.onQueryChange} placeholder="Введите поисковый запрос..." />
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div>
                    {bunches}
                </div>

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingMaterialsList;