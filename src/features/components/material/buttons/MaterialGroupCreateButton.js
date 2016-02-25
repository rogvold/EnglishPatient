/**
 * Created by sabir on 25.10.15.
 */

var React = require('react');
var assign = require('object-assign');

var SelfLoadingUpdateMaterialGroupPanel = require('../groups/SelfLoadingUpdateMaterialGroupPanel');

var Dialog = require('../../dialog/Dialog');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var MaterialGroupCreateButton = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            teacherId: undefined,
            topicId: undefined,
            buttonClassName: 'ui basic grey button',
            iconClassName: 'plus icon',
            buttonName: 'Новая категория',

            style: {

            },

            onGroupUpdated: function(data){
                console.log('onGroupUpdated - default func');
            },

            onGroupDeleted: function(){

            },

            onGroupCreated: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },


    showDialog: function(){
        this.setState({
            dialogVisible: true
        });
    },

    hideDialog: function(){
        this.setState({
            dialogVisible: false
        });
    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        dialogContent: {
            padding: 5
        },

        iStyle: {
            marginRight: 0
        }
    },

    onGroupUpdated: function(data){
        console.log('UpdateMaterialGroupButton: onGroupUpdated: data = ', data);
        this.props.onGroupUpdated(data);
        this.hideDialog();
    },

    onGroupDeleted: function(){
        this.props.onGroupDeleted();
        this.hideDialog();
    },

    onGroupCreated: function(data){
        console.log('MaterialGroupCreateButton: onGroupCreated: data = ', data);
        this.props.onGroupCreated(data);
        this.hideDialog();
        this.getFlux().actions.refreshMaterialGroup(data.id);
    },

    getDialogContent: function(){
        if (this.state.dialogVisible == false){
            return null;
        }

        return (
            <div style={this.componentStyle.dialogContent}>

                <SelfLoadingUpdateMaterialGroupPanel onGroupDeleted={this.onGroupDeleted}
                                                     onGroupUpdated={this.onGroupUpdated}
                                                     onGroupCreated={this.onGroupCreated}
                                                     groupId={this.props.groupId}
                                                     teacherId={this.props.teacherId}
                                                     topicId={this.props.topicId}
                                                     allGroupsList={this.props.allGroupsList}
                    />

            </div>

        );

    },

    render: function () {
        var st = assign({}, this.props.style);

        return (
            <div style={this.componentStyle.placeholder}>

                <button className={this.props.buttonClassName} style={st} onClick={this.showDialog} >
                    <i style={this.componentStyle.iStyle} className={this.props.iconClassName} ></i> {this.props.buttonName}
                </button>

                {this.state.dialogVisible == false ? null :
                    <Dialog visible={this.state.dialogVisible} content={this.getDialogContent()} onClose={this.hideDialog} />
                }

            </div>
        );
    }

});

module.exports = MaterialGroupCreateButton;