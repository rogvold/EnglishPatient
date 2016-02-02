/**
 * Created by sabir on 24.10.15.
 */

var React = require('react');
var assign = require('object-assign');
var PagedCardsList = require('../list/PagedCardsList');

var UpdateMaterialGroupButton = require('../groups/UpdateMaterialGroupButton');


var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var LoginMixin = require('../../../mixins/LoginMixin');


var MaterialsBunch = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            groupId: undefined,
            name: undefined,
            description: undefined,
            teacherId: undefined,
            materials: undefined,
            editMode: false,
            showDialogOnMaterialClick: true,

            allGroupsList: [],

            dialogLevel: 10,

            showEmptyGroup: true,

            onMaterialUpdated: function(data){

            },

            onGroupUpdated: function(data){

            },

            onGroupDeleted: function(){

            },

            onMaterialClick: function(card){

            },

            onSelect: function(card){

            },

            hoverMode: false,

            itemStyle: {

            },

            onMaterialDeleted: function(){

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

    onMaterialUpdated: function(data){
        console.log('MaterialsBunch: onMaterialUpdated: data = ', data);
        this.props.onMaterialUpdated(data);
    },

    onGroupUpdated: function(data){
        this.props.onGroupUpdated(data);
    },

    onGroupDeleted: function(){
        this.props.onGroupDeleted();
    },

    onMaterialDeleted: function(){
        this.props.onMaterialDeleted();
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1',
            padding: 5,
            minHeight: 48,
            position: 'relative'
        },

        infoPlaceholder: {

        },

        namePlaceholder: {
            fontWeight: 'bold',
            fontSize: '16px'
        },

        descriptionPlaceholder: {

        },

        cardsPlaceholder: {
            marginTop: 20
        },

        editPlaceholder: {
            position: 'absolute',
            right: 0,
            top: 5
        },

        updateButtonStyle: {
            padding: 5
        },

        topBlock:{

        }
    },

    onMaterialClick: function(card){
        this.props.onMaterialClick(card);
    },

    onSelect: function(card){
        this.props.onSelect(card);
    },

    render: function () {
        var name = (this.props.name == undefined) ? '' : this.props.name;
        var description = (this.props.description == undefined) ? '' : this.props.description;
        var cards = (this.props.materials == undefined) ? [] : this.props.materials;

        var st = assign({}, this.componentStyle.placeholder);

        var groupId = this.props.groupId;
        var group = this.getFlux().store('MaterialsStore').getGroupsMap()[groupId];
        var ownerId = (group == undefined) ? undefined : group.ownerId;
        var currentUser = LoginMixin.getCurrentUser();
        var currentUserId = (currentUser == undefined) ? undefined : currentUser.id;
        var editMode = (currentUserId == ownerId);


        return (
            <div style={st} className={'materials_bunch'} >


                    <div style={this.componentStyle.infoPlaceholder}>

                        <div style={this.componentStyle.namePlaceholder}>
                            {this.props.name}
                        </div>

                        <div style={this.componentStyle.descriptionPlaceholder}>
                            {this.props.description}
                        </div>

                    </div>


                    {(editMode == false || this.props.groupId == undefined) ? null :
                        <div style={this.componentStyle.editPlaceholder}>
                            <UpdateMaterialGroupButton style={this.componentStyle.updateButtonStyle}
                                                       buttonName={''} allGroupsList={this.props.allGroupsList}
                                                       onGroupUpdated={this.onGroupUpdated}
                                                       onGroupDeleted={this.onGroupDeleted}
                                                       groupId={this.props.groupId}
                                                       teacherId={this.props.teacherId}

                                />
                        </div>
                    }



                {cards.length == 0 ?
                    <div>
                        {this.props.showEmptyGroup == false ? null :
                            <div>
                                В этой группе еще нет материалов
                            </div>
                        }
                    </div>
                    :
                    <div style={this.componentStyle.cardsPlaceholder}>
                        <PagedCardsList cards={cards} editMode={this.props.editMode} pageSize={8} allGroupsList={this.props.allGroupsList}
                                        onMaterialUpdated={this.onMaterialUpdated} hoverMode={this.props.hoverMode}
                                        onMaterialDeleted={this.onMaterialDeleted}
                                        onSelect={this.onSelect}
                                        dialogLevel={this.props.dialogLevel}
                                        teacherId={this.props.teacherId} itemStyle={this.props.itemStyle}
                                        showDialogOnMaterialClick={this.props.showDialogOnMaterialClick} />
                    </div>
                }

            </div>
        );
    }

});

module.exports = MaterialsBunch;