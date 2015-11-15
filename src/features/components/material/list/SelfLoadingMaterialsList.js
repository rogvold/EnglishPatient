/**
 * Created by sabir on 24.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var PagedCardsList = require('./PagedCardsList');

var MaterialsBunch = require('./MaterialsBunch');

var MaterialCreateButton = require('../buttons/MaterialCreateButton');

var MaterialGroupCreateButton = require('../buttons/MaterialGroupCreateButton');

var SelfLoadingMaterialsList = React.createClass({
    getDefaultProps: function () {
        return {
            teacherId: undefined,
            topicId: undefined,
            editMode: true,
            onMaterialUpdated: function(data){

            }
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            materials: [],
            groupsFactoryList: []
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var teacherId = nextProps.teacherId;
        var topicId = nextProps.topicId;

        if (teacherId == this.props.teacherId && topicId == this.props.topicId){
            return;
        }

        this.load(teacherId, topicId, function(materials){
            console.log('materials loaded: ', materials);
        });
    },

    componentDidMount: function () {
        this.load(this.props.teacherId, this.props.topicId, function(arr){
            console.log('data loaded: ', arr);
        }.bind(this));
    },

    load: function(teacherId, topicId, callback){
        this.setState({
            loading: true
        });
        var self = this;
        MaterialsMixin.loadGroupsAndMaterials(teacherId, topicId, function(arr){
            self.setState({
                loading: false,
                groupsFactoryList: arr
            });
            callback(arr);
        });
    },


    onMaterialUpdated: function(data){
        var arr = MaterialsMixin.updateGroupsFactoryListWithMaterial(this.state.groupsFactoryList, data);
        this.setState({
            groupsFactoryList: arr
        });
    },

    onMaterialDeleted: function(){
        this.load(this.props.teacherId, this.props.topicId, function(data){
            console.log('loaded: ', data);
        });
    },

    onMaterialCreated: function(data){
        this.onMaterialUpdated(data);
    },

    onGroupUpdated: function(data){
        console.log('SelfLoadingMaterialsList: onGroupUpdated: data = ', data);
        var list = this.state.groupsFactoryList;
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
        this.load(this.props.teacherId, this.props.topicId, function(data){
            console.log('loaded: ', data);
        });
        //window.location.reload();
    },

    getAllGroupsList: function(){
        var list = this.state.groupsFactoryList;
        var arr = list.map(function(item){return item.group});
        return arr;
    },

    getBunchesContent: function(){
        var list = this.state.groupsFactoryList;
        var c = list.map(function(g, k){
            var key = 'bunch_' + k + '_' + g.group.id;
            var group = g.group;
            var onMaterialUpdated = this.onMaterialUpdated.bind(this);
            var onGroupUpdated = this.onGroupUpdated.bind(this);
            var onGroupDeleted = this.onGroupDeleted.bind(this, g.group.id);
            var allGroupsList = this.getAllGroupsList();
            return (
                <MaterialsBunch allGroupsList={allGroupsList} key={key} onGroupUpdated={onGroupUpdated} onGroupDeleted={this.onGroupDeleted}
                                onMaterialUpdated={onMaterialUpdated} onMaterialDeleted={this.onMaterialDeleted}
                                materials={g.materials}
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
        }
    },


    render: function () {
        var bunches = this.getBunchesContent();
        console.log('rendering SelfLoadingMaterialsList: topicId = ', this.props.topicId);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.createNewBlock}>
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