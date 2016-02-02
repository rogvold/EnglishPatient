/**
 * Created by sabir on 24.10.15.
 */
var React = require('react');
var assign = require('object-assign');

var MaterialsMixin = require('../../../mixins/MaterialsMixin');

var UpdateMaterialGroupPanel = require('./UpdateMaterialGroupPanel');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var SelfLoadingUpdateMaterialGroupPanel = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            groupId: undefined,
            teacherId: undefined,
            topicId: undefined,
            onGroupUpdated: function(data){

            },

            onGroupCreated: function(data){

            },

            onGroupDeleted: function(){

            }
        }
    },

    getInitialState: function(){
        return {
            loading: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.load(this.props.groupId, function(g){
            console.log('group loaded: ', g);
        });
    },

    componentStyle: {
        placeholder: {}
    },

    load: function(groupId, callback){
        if (groupId == undefined){
            return;
        }
        this.setState({
            loading: true
        });
        MaterialsMixin.loadGroup(groupId, function(g){
            this.setState({
                name: g.name,
                description: g.description,
                loading: false
            });
            callback(g);
        }.bind(this));
    },

    onUpdate: function(data){
        console.log('onUpdate: data = ', data);
        this.setState({
            loading: true
        });
        MaterialsMixin.updateGroup(this.props.groupId, this.props.teacherId, this.props.topicId,
            data.name, data.description, function(data){

            this.setState({
                loading: false
            });
            if (this.props.groupId == undefined){
                this.props.onGroupCreated(data);
                this.getFlux().actions.refreshMaterialGroup(data.id);
            }else{
                this.props.onGroupUpdated(data);
                this.getFlux().actions.refreshMaterialGroup(this.props.groupId);
            }
        }.bind(this));
    },

    onDelete: function(){
        this.setState({
            loading: true
        });
        MaterialsMixin.deleteGroup(this.props.groupId, function(){
            this.setState({
                loading: false
            });
            this.props.onGroupDeleted();
            this.getFlux().actions.deleteMaterialGroup(this.props.groupId);
        }.bind(this));
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder}>

                <UpdateMaterialGroupPanel name={this.state.name} description={this.state.description}
                                          onSave={this.onUpdate} onDelete={this.onDelete}
                    />

                <div className={'ui inverted dimmer ' + (this.state.loading ? ' active ' : '') }>
                    <div className="ui indeterminate text loader">{'Загрузка'}</div>
                </div>

            </div>
        );
    }

});

module.exports = SelfLoadingUpdateMaterialGroupPanel;